import { type OpenAI } from 'openai'
import { z } from 'zod'
import type { ModelConfig, ResolvedPrompt } from '../config'
import { type Provider, RequestError, type RunResult, type StopReason } from '../types'
import { toRequestError } from './request-error'

const UsageSchema = z.object({
  prompt_tokens: z.number().nullish(),
  completion_tokens: z.number().nullish(),
  cost: z.number().nullish(),
})

const ChunkSchema = z.object({
  choices: z
    .array(
      z.object({
        delta: z
          .object({
            content: z.string().nullish(),
            reasoning: z.string().nullish(),
          })
          .nullish(),
        finish_reason: z.string().nullish(),
        native_finish_reason: z.string().nullish(),
      }),
    )
    .nullish(),
  usage: UsageSchema.nullish(),
  error: z.object({ code: z.number().nullish(), message: z.string() }).nullish(),
})

export class OpenRouterProvider implements Provider {
  constructor(private readonly client: OpenAI) {}

  async run(model: ModelConfig, prompt: ResolvedPrompt, signal: AbortSignal): Promise<RunResult> {
    const started = performance.now()

    const result: RunResult = {
      attempts: 1,
      costUsd: null,
      error: undefined,
      inputTokens: null,
      label: model.label,
      model: model.id,
      outputTokens: null,
      promptId: prompt.id,
      provider: 'openrouter',
      rawStopReason: null,
      stopReason: null,
      text: '',
      totalMs: 0,
      ttftMs: null,
    }

    try {
      const stream = await this.client.chat.completions.create(
        {
          model: model.id,
          messages: [{ role: 'user', content: prompt.text }],
          max_completion_tokens: prompt.maxTokens,
          // Mirrors the direct route: models.yaml decides, so a model compared across
          // both routes is measured under identical sampling settings.
          ...(model.supportsTemperature === false ? {} : { temperature: prompt.temperature }),
          stream: true,
          stream_options: { include_usage: true },
        },
        { signal },
      )

      for await (const raw of stream) {
        const parsed = ChunkSchema.safeParse(raw)
        if (!parsed.success) continue

        const { choices, error, usage } = parsed.data
        const choice = choices?.[0]

        // Record usage even if there was a failure.
        if (usage) {
          result.inputTokens = usage.prompt_tokens ?? null
          result.outputTokens = usage.completion_tokens ?? null
          result.costUsd = usage.cost ?? null
        }

        // Same for the stop reason, so an error's partial result still says why it ended.
        // OpenRouter reports the underlying provider's own reason in native_finish_reason;
        // keep it, and keep the last non-null value a stream reports.
        if (choice?.finish_reason) {
          result.stopReason = toStopReason(choice.finish_reason)
          result.rawStopReason = choice.native_finish_reason ?? choice.finish_reason
        }

        if (error) {
          throw new RequestError(error.message, 'stream', {
            streamed: result.text.length > 0,
            partial: result,
          })
        }

        // Extra check in case only the finish reason comes through a chunk without a full error object.
        if (choice?.finish_reason === 'error') {
          throw new RequestError('Stream ended with finish_reason: error', 'stream', {
            streamed: result.text.length > 0,
            partial: result,
          })
        }

        const text = choice?.delta?.content
        if (!text) continue

        if (result.ttftMs === null) result.ttftMs = Math.round(performance.now() - started)
        result.text += text
      }
    } catch (error) {
      throw toRequestError(error, result)
    } finally {
      result.totalMs = Math.round(performance.now() - started)
    }

    return result
  }
}

// OpenRouter's finish_reason, which is normalized in OpenAI terms but may also carry a
// provider-specific reason that only native_finish_reason spells out.
function toStopReason(reason: string): StopReason {
  switch (reason) {
    case 'stop':
      return 'complete'
    case 'length':
      return 'length'
    case 'tool_calls':
      return 'tool_use'
    case 'content_filter':
      return 'refusal'
    case 'error':
      return 'error'
    default:
      return 'other'
  }
}
