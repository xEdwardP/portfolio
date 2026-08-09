import * as z from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(20).max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const fields = ['name', 'email', 'subject', 'message'] as const;

export type FieldName = (typeof fields)[number];

export type ValidationResult =
  { ok: true; data: ContactInput } | { ok: false; invalid: FieldName[] };

export function validate(input: unknown): ValidationResult {
  const parsed = contactSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };

  const fieldErrors = z.flattenError(parsed.error).fieldErrors;
  return { ok: false, invalid: fields.filter((field) => fieldErrors[field]?.length) };
}
