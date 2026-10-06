import type { Lang } from '../i18n/ui';

export const profile = {
  name: 'Santiago Castrillón',
  fullName: 'Santiago Castrillón Arbeláez',
  email: 'santiago.castrillon.ar@gmail.com',
  linkedin: {
    url: 'https://www.linkedin.com/in/santiago-castrillón-arbelaez-0b0906430',
    handle: '/santiago-castrillón-arbelaez',
  },
  github: {
    url: 'https://github.com/SantiagoCastrillonA',
    handle: '/SantiagoCastrillonA',
  },
  location: { locality: 'Quindío', country: 'CO' },
} as const;

/** Technologies grouped by what they are used for, with plain-language group names. */
export const tools: ReadonlyArray<{ group: Record<Lang, string>; items: readonly string[] }> = [
  {
    group: { es: 'Lo que ves en pantalla', en: 'What you see on screen' },
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Blade', 'Bootstrap', 'WordPress'],
  },
  {
    group: { es: 'Servidor y bases de datos', en: 'Servers and databases' },
    items: ['PHP', 'Laravel', 'Node.js', 'Express', 'Python', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    group: { es: 'Comunicación en tiempo real', en: 'Real-time communication' },
    items: ['Laravel Reverb', 'WebSockets'],
  },
  {
    group: { es: 'Publicación e inteligencia artificial', en: 'Hosting and AI' },
    items: ['Git', 'GitHub', 'AWS (EC2, S3, Lambda)', 'Cloudflare', 'Nginx', 'CI/CD', 'Claude Code', 'Copilot'],
  },
];
