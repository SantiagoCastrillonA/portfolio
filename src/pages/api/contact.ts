import { env } from 'cloudflare:workers';
import type { APIRoute } from 'astro';
import { type ContactInput, type ContactResult, contactSchema, formatEmail } from '../../lib/contact';

// The only server-rendered route; every page is prerendered.
export const prerender = false;

const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_API = 'https://api.resend.com/emails';

const json = (body: ContactResult, status = 200) => Response.json(body, { status });

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET_KEY);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch(TURNSTILE_VERIFY, { method: 'POST', body });
  const outcome = (await res.json()) as { success: boolean };
  return outcome.success;
}

async function sendEmail(input: ContactInput): Promise<boolean> {
  const { subject, text } = formatEmail(input);

  if (!env.RESEND_API_KEY) {
    // Local development without a Resend key: log instead of sending.
    console.info('[contact] RESEND_API_KEY not set, email not sent:\n', subject, '\n', text);
    return true;
  }

  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: input.email,
      subject,
      text,
    }),
  });
  if (!res.ok) console.error('[contact] Resend error', res.status, await res.text());
  return res.ok;
}

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('CF-Connecting-IP');

  const { success: allowed } = await env.CONTACT_LIMITER.limit({ key: ip ?? 'unknown' });
  if (!allowed) return json({ ok: false, code: 'limited' }, 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, code: 'invalid', fields: [] }, 400);
  }

  // Honeypot: bots fill every field. Pretend it worked.
  if (form.get('website')) return json({ ok: true });

  const parsed = contactSchema.safeParse({
    name: form.get('name'),
    email: form.get('email'),
    message: form.get('message'),
    lang: form.get('lang') ?? undefined,
  });
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => issue.path[0] as keyof ContactInput))];
    return json({ ok: false, code: 'invalid', fields }, 400);
  }

  const token = form.get('cf-turnstile-response');
  if (typeof token !== 'string' || !(await verifyTurnstile(token, ip))) {
    return json({ ok: false, code: 'captcha' }, 400);
  }

  const sent = await sendEmail(parsed.data);
  return sent ? json({ ok: true }) : json({ ok: false, code: 'error' }, 502);
};
