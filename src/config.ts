import { parse } from 'yaml'
import { z } from 'zod'

const ROOT = `${import.meta.dir}/..`

//#region Schemas
const PricingSchema = z.object({
  inputPerM: z.number().int().positive(),
  outputPerM: z.number().int().positive(),
})

const ModelConfigSchema = z
  .object({
    provider: z.string(),
    id: z.string(),
    label: z.string(),
    dev: z.boolean().optional().describe('Whether or not to run this model in dev mode.'),
    pricing: PricingSchema.optional(),
  })
  .check(ctx => {
    if (ctx.value.provider !== 'openrouter' && !ctx.value.pricing) {
      ctx.issues.push({
        code: 'custom',
        message: `Pricing is required for non-OpenRouter models. Found provider: ${ctx.value.provider}`,
        path: ['pricing'],
        input: ctx.value,
      })
    }
  })

const PromptSchema = z
  .object({
    id: z.string(),
    kind: z.string(),
    text: z.string().optional(), // Must be present if Instruction & File aren't.
    maxTokens: z.number().int().positive().optional(),
    instruction: z.string().optional(), // Must be present with File if Text isn't.
    file: z.string().optional(), // Must be present with Instruction if Text isn't.
  })
  .check(ctx => {
    if (ctx.value.instruction && !ctx.value.file) {
      ctx.issues.push({
        code: 'custom',
        message: 'File must be present when instruction is present.',
        input: ctx.value,
      })
    }
    if (!ctx.value.text && !ctx.value.instruction) {
      ctx.issues.push({
        code: 'custom',
        message: 'Either text or instruction must be present.',
        input: ctx.value,
      })
    }
  })

const ModelsFileSchema = z.object({
  models: z.array(ModelConfigSchema),
})

const PromptsFileSchema = z.object({
  defaults: z.object({
    maxTokens: z.number().int().positive(),
    temperature: z.number().min(0).max(1),
  }),
  prompts: z.array(PromptSchema).min(1, { message: 'At least one prompt must be defined.' }),
})
//#endregion Schemas

async function readYaml(filePath: string) {
  const file = Bun.file(filePath)

  if (!file.exists()) throw new Error(`File not found: ${filePath}`)

  try {
    return parse(await file.text())
  } catch (error) {
    throw new Error(`Failed to read YAML file: ${filePath}. Error: ${error}`)
  }
}

export async function loadConfig() {
  const [modelsYaml, promptsYaml] = await Promise.all([
    readYaml(`${ROOT}/config/models.yaml`),
    readYaml(`${ROOT}/config/prompts.yaml`),
  ])

  const modelConfig = ModelsFileSchema.parse(modelsYaml)
  const promptConfig = PromptsFileSchema.parse(promptsYaml)

  return { modelConfig, promptConfig }
}
