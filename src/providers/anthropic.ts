import type { Anthropic } from '@anthropic-ai/sdk'

import type { ModelConfig, ResolvedPrompt } from '../config'
import type { Provider, RunResult } from '../types'
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
            // Cumulative, so the last one we see is the real total. stop_reason is not
            // recorded: a max_tokens truncation is indistinguishable from a clean stop.
            result.outputTokens = event.usage.output_tokens
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

function computeCostUsd(
  pricing: ModelConfig['pricing'],
  inputTokens: number | null,
  outputTokens: number | null,
): number | null {
  // config.ts already requires pricing on every direct provider; this is a type guard.
  if (!pricing || inputTokens === null || outputTokens === null) return null

  return (inputTokens / 1e6) * pricing.inputPerM + (outputTokens / 1e6) * pricing.outputPerM
}
