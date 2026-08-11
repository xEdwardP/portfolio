export const limits = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 2000 },
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const fields = ['name', 'email', 'subject', 'message'] as const;

export type FieldName = (typeof fields)[number];

export type ContactInput = Record<FieldName, string>;

export type ValidationResult =
  { ok: true; data: ContactInput } | { ok: false; invalid: FieldName[] };

function isValid(field: FieldName, value: string): boolean {
  if (field === 'email') return value.length <= limits.email.max && EMAIL.test(value);

  const { min, max } = limits[field];
  return value.length >= min && value.length <= max;
}

export function validate(input: unknown): ValidationResult {
  const source = (input ?? {}) as Partial<Record<FieldName, unknown>>;

  const data = Object.fromEntries(
    fields.map((field) => [field, String(source[field] ?? '').trim()])
  ) as ContactInput;

  const invalid = fields.filter((field) => !isValid(field, data[field]));

  return invalid.length > 0 ? { ok: false, invalid } : { ok: true, data };
}
