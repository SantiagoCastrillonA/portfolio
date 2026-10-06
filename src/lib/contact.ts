import { z } from 'astro/zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  message: z.string().trim().min(10).max(5000),
  lang: z.enum(['es', 'en']).default('es'),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Outcome codes shared by the API route and the form script. */
export type ContactResult =
  | { ok: true }
  | { ok: false; code: 'invalid'; fields: Array<keyof ContactInput> }
  | { ok: false; code: 'captcha' | 'limited' | 'error' };

export function formatEmail(input: ContactInput): { subject: string; text: string } {
  return {
    subject: `Portafolio · nuevo mensaje de ${input.name}`,
    text: [`Nombre: ${input.name}`, `Correo: ${input.email}`, `Idioma: ${input.lang}`, '', input.message].join('\n'),
  };
}
