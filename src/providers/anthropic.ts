import type { Anthropic } from '@anthropic-ai/sdk'

import type { ModelConfig, ResolvedPrompt } from '../config'
import type { Provider, RunResult, StopReason } from '../types'
import { toRequestError } from './request-error'

export class AnthropicProvider implements Provider {
  constructor(private readonly client: Anthropic) {}

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
      provider: 'anthropic',
      rawStopReason: null,
      stopReason: null,
      text: '',
      totalMs: 0,
      ttftMs: null,
    }

    try {
      const stream = await this.client.messages.create(
        {
          model: model.id,
          messages: [{ role: 'user', content: prompt.text }],
          max_tokens: prompt.maxTokens,
          // models.yaml sets supportsTemperature: false on models that reject this
          // parameter. Sending it anyway is a 400, not a silently ignored field.
          ...(model.supportsTemperature === false ? {} : { temperature: prompt.temperature }),
          stream: true,
        },
        { signal },
      )

      for await (const event of stream) {
        switch (event.type) {
          case 'message_start':
            result.inputTokens = event.message.usage.input_tokens
            break

          case 'content_block_delta':
            // Thinking and tool deltas are not visible text, so they do not mark TTFT.
            if (event.delta.type !== 'text_delta') break

            if (result.ttftMs === null) result.ttftMs = Math.round(performance.now() - started)
            result.text += event.delta.text
            break

          case 'message_delta':
            // Cumulative, so the last one we see is the real total. The stop reason arrives
            // here too: message_start always carries null, so this event is the only place
            // it is reported.
            result.outputTokens = event.usage.output_tokens

            if (event.delta.stop_reason) {
              result.rawStopReason = event.delta.stop_reason
              result.stopReason = toStopReason(event.delta.stop_reason)
            }
            break
        }
      }
    } catch (error) {
      throw toRequestError(error, result)
    } finally {
      result.totalMs = Math.round(performance.now() - started)
      result.costUsd = computeCostUsd(model.pricing, result.inputTokens, result.outputTokens)
    }

    return result
  }
}

// Typed as string so a stop_reason the SDK adds later lands in 'other' instead of
// failing the build.
function toStopReason(reason: string): StopReason {
  switch (reason) {
    case 'end_turn':
    case 'stop_sequence':
      return 'complete'
    case 'max_tokens':
    case 'model_context_window_exceeded':
      return 'length'
    case 'tool_use':
      return 'tool_use'
    case 'refusal':
      return 'refusal'
    default:
      return 'other'
  }
}

function computeCostUsd(
  pricing: ModelConfig['pricing'],
  inputTokens: number | null,
  outputTokens: number | null,
): number | null {
  // config.ts already requires pricing on every direct provider; this is a type guard.
  if (!pricing || inputTokens === null || outputTokens === null) return null

  return (inputTokens / 1e6) * pricing.inputPerM + (outputTokens / 1e6) * pricing.outputPerM
}
