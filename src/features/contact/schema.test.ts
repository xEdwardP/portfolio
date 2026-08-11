import { describe, expect, it } from 'vitest';
import { fields, limits, validate } from './schema';

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Collaboration',
  message: 'I would like to talk about a project you published on the portfolio.',
};

describe('contact schema', () => {
  it('accepts a complete message', () => {
    const result = validate(valid);
    expect(result.ok).toBe(true);
  });

  it('trims surrounding whitespace before validating', () => {
    const result = validate({ ...valid, name: '  Ada Lovelace  ' });
    expect(result).toMatchObject({ ok: true, data: { name: 'Ada Lovelace' } });
  });

  it('rejects a name made only of whitespace', () => {
    const result = validate({ ...valid, name: '     ' });
    expect(result).toMatchObject({ ok: false, invalid: ['name'] });
  });

  it.each(['ada', 'ada@', '@example.com', 'ada example.com'])(
    'rejects %s as an email',
    (email) => {
      expect(validate({ ...valid, email })).toMatchObject({
        ok: false,
        invalid: ['email'],
      });
    }
  );

  it('rejects a message shorter than 20 characters', () => {
    expect(validate({ ...valid, message: 'too short' })).toMatchObject({
      ok: false,
      invalid: ['message'],
    });
  });

  it('rejects a message longer than 2000 characters', () => {
    expect(validate({ ...valid, message: 'a'.repeat(2001) })).toMatchObject({
      ok: false,
      invalid: ['message'],
    });
  });

  it('reports every invalid field, in form order', () => {
    const result = validate({ name: '', email: 'nope', subject: '', message: '' });
    expect(result).toMatchObject({ ok: false, invalid: fields });
  });

  it('rejects a payload that is not an object', () => {
    expect(validate(null).ok).toBe(false);
  });

  it.each(['name', 'subject', 'message'] as const)(
    'rejects a %s longer than its limit',
    (field) => {
      const value = 'a'.repeat(limits[field].max + 1);
      expect(validate({ ...valid, [field]: value })).toMatchObject({
        ok: false,
        invalid: [field],
      });
    }
  );

  it.each(['name', 'subject', 'message'] as const)(
    'accepts a %s exactly at its limit',
    (field) => {
      const value = 'a'.repeat(limits[field].max);
      expect(validate({ ...valid, [field]: value }).ok).toBe(true);
    }
  );

  it('rejects an email longer than its limit', () => {
    const local = 'a'.repeat(limits.email.max);
    expect(validate({ ...valid, email: `${local}@example.com` })).toMatchObject({
      ok: false,
      invalid: ['email'],
    });
  });
});
