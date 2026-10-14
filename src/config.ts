import { parse } from 'yaml'
import { z } from 'zod'

const ROOT = `${import.meta.dir}/..`

//#region Schemas
const ProviderNamesSchema = z.enum(['openrouter', 'anthropic'])

const PricingSchema = z.object({
  inputPerM: z.number().positive(),
  outputPerM: z.number().positive(),
})

const ModelConfigSchema = z
  .object({
    provider: ProviderNamesSchema,
    id: z.string(),
    label: z.string(),
    dev: z.boolean().optional().describe('Whether or not to run this model in dev mode.'),
    pricing: PricingSchema.optional(),
    family: z.string().optional().describe('Models sharing a family are compared in the report.'),
    supportsTemperature: z
      .boolean()
      .optional()
      .describe(
        'Set false for models that reject the temperature parameter. Defaults to sending it.',
      ),
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

const ModelsFileSchema = z.object({
  models: z.array(ModelConfigSchema),
})

const PromptIdentitySchema = z.object({
  id: z.string(),
  kind: z.string(),
})

const PromptsDefaultSchema = z.object({
  maxTokens: z.number().int().positive(),
  temperature: z.number().min(0).max(1),
})

const PromptSchema = PromptIdentitySchema.extend({
  text: z.string().optional(), // Must be present if Instruction & File aren't.
  instruction: z.string().optional(), // Must be present with File if Text isn't.
  file: z.string().optional(), // Must be present with Instruction if Text isn't.
})
  .extend(PromptsDefaultSchema.partial().shape)
  .check(ctx => {
    // Make sure file is present if instruction is.
    if (ctx.value.instruction && !ctx.value.file) {
      ctx.issues.push({
        code: 'custom',
        message: 'File must be present when instruction is present.',
        input: ctx.value,
      })
    }

    // Make sure instruction is present if file is.
    if (ctx.value.file && !ctx.value.instruction) {
      ctx.issues.push({
        code: 'custom',
        message: 'Instruction must be present when file is.',
        input: ctx.value,
      })
    }

    // Verify text and instruction aren't both present.
    if (!ctx.value.text && !ctx.value.instruction) {
      ctx.issues.push({
        code: 'custom',
        message: 'Either text or instruction must be present.',
        input: ctx.value,
      })
    }

    // Verify file and text aren't both present.
    if (ctx.value.text && ctx.value.file) {
      ctx.issues.push({
        code: 'custom',
        message: 'File and text cannot both be present.',
        input: ctx.value,
      })
    }
  })

const PromptsFileSchema = z.object({
  defaults: PromptsDefaultSchema,
  prompts: z.array(PromptSchema).min(1, { message: 'At least one prompt must be defined.' }),
})

const ResolvedPromptSchema = PromptsDefaultSchema.extend(PromptIdentitySchema.shape).extend({
  text: z.string().min(1),
})
//#endregion Schemas

//#region Inferred Types
export type ProviderNames = z.infer<typeof ProviderNamesSchema>
export type ModelConfig = z.infer<typeof ModelConfigSchema>
export type PromptConfig = z.infer<typeof PromptSchema>
export type ResolvedPrompt = z.infer<typeof ResolvedPromptSchema>
//#endregion Inferred Types

//#region Helper Functions
function parseOrThrow<T>(label: string, schema: z.ZodType<T>, raw: unknown): T {
  const result = schema.safeParse(raw)
  if (!result.success) throw new Error(`${label} is invalid:\n${z.prettifyError(result.error)}`)

  return result.data
}

async function readYaml(filePath: string) {
  const file = Bun.file(filePath)

  if (!(await file.exists())) throw new Error(`File not found: ${filePath}`)

  try {
    return parse(await file.text())
  } catch (error) {
    throw new Error(`Failed to read YAML file: ${filePath}. Error: ${error}`, { cause: error })
  }
}
//#endregion Helper Functions

export async function loadConfig() {
  const modelsPath = 'config/models.yaml'
  const promptsPath = 'config/prompts.yaml'

  const [modelsYaml, promptsYaml] = await Promise.all([
    readYaml(`${ROOT}/${modelsPath}`),
    readYaml(`${ROOT}/${promptsPath}`),
  ])

  const { models } = parseOrThrow(modelsPath, ModelsFileSchema, modelsYaml)
  const { defaults, prompts } = parseOrThrow(promptsPath, PromptsFileSchema, promptsYaml)

  const resolvedPrompts = await Promise.all(
    prompts.map(async ({ maxTokens, temperature, text, file, instruction, ...rest }) => {
      const body = file ? await Bun.file(`${ROOT}/${file}`).text() : text

      return parseOrThrow(`prompt ${rest.id}`, ResolvedPromptSchema, {
        ...rest,
        maxTokens: maxTokens ?? defaults.maxTokens,
        temperature: temperature ?? defaults.temperature,
        text: instruction ? `${body}\n\n${instruction}` : body,
      })
    }),
  )

  return { models, prompts: resolvedPrompts }
}
