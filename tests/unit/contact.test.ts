import { describe, expect, it } from 'vitest';
import { contactSchema, formatEmail } from '../../src/lib/contact';

const valid = { name: 'Ana Gómez', email: 'ana@example.com', message: 'Necesito un panel administrativo.', lang: 'es' };

describe('contactSchema', () => {
  it('accepts a valid message', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('trims and defaults the language', () => {
    const parsed = contactSchema.parse({ ...valid, name: '  Ana  ', lang: undefined });
    expect(parsed.name).toBe('Ana');
    expect(parsed.lang).toBe('es');
  });

  it.each([
    ['name', { name: 'A' }],
    ['email', { email: 'not-an-email' }],
    ['message', { message: 'corto' }],
    ['lang', { lang: 'fr' }],
  ])('rejects an invalid %s', (field, patch) => {
    const result = contactSchema.safeParse({ ...valid, ...patch });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe(field);
  });

  it('rejects null fields from an empty FormData', () => {
    expect(contactSchema.safeParse({ name: null, email: null, message: null }).success).toBe(false);
  });
});

describe('formatEmail', () => {
  it('includes the sender data and the message', () => {
    const { subject, text } = formatEmail(contactSchema.parse(valid));
    expect(subject).toContain('Ana Gómez');
    expect(text).toContain('ana@example.com');
    expect(text).toContain('Necesito un panel administrativo.');
  });
});
