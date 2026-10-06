import type { Lang } from '../i18n/ui';

type Localized = Record<Lang, string>;

export interface Service {
  icon: 'web' | 'dashboard' | 'chat' | 'ai';
  title: Localized;
  description: Localized;
  /** A real project that shows the service, in one line. */
  example: Localized;
}

// Written for clients, not developers: what you get, in everyday words.
export const services: readonly Service[] = [
  {
    icon: 'web',
    title: { es: 'Páginas y plataformas web', en: 'Websites and web platforms' },
    description: {
      es: 'Sitios rápidos, que se ven bien en el celular y que tú mismo puedes actualizar. Para mostrar tu negocio, vender o enseñar.',
      en: 'Fast websites that look great on phones and that you can update yourself. To present your business, sell or teach.',
    },
    example: {
      es: 'Plataforma de práctica para un curso de programación',
      en: 'Practice platform for a programming course',
    },
  },
  {
    icon: 'dashboard',
    title: { es: 'Sistemas para tu empresa', en: 'Systems for your business' },
    description: {
      es: 'Herramientas a la medida para dejar atrás las hojas de cálculo: inventarios, solicitudes, evaluaciones y reportes automáticos.',
      en: 'Custom tools to leave spreadsheets behind: inventories, requests, reviews and automatic reports.',
    },
    example: {
      es: 'Evaluación de desempeño con reportes en Excel',
      en: 'Performance reviews with Excel reports',
    },
  },
  {
    icon: 'chat',
    title: { es: 'Atención al cliente en vivo', en: 'Live customer support' },
    description: {
      es: 'Chats entre tu página web y tu equipo, con avisos al instante y un registro de cada conversación.',
      en: 'Chats between your website and your team, with instant alerts and a record of every conversation.',
    },
    example: {
      es: 'Chat web con asesores y copia por correo',
      en: 'Website chat with advisors and email transcripts',
    },
  },
  {
    icon: 'ai',
    title: { es: 'Asistentes con inteligencia artificial', en: 'AI assistants' },
    description: {
      es: 'Asistentes que responden las preguntas de tu equipo usando tus propios documentos y te dicen de dónde sacaron cada respuesta.',
      en: "Assistants that answer your team's questions using your own documents and tell you where every answer came from.",
    },
    example: {
      es: 'Consultas sobre la norma de calidad ISO 9001',
      en: 'Questions about the ISO 9001 quality standard',
    },
  },
];

export const process: ReadonlyArray<{ title: Localized; description: Localized }> = [
  {
    title: { es: 'Conversamos', en: 'We talk' },
    description: {
      es: 'Me cuentas tu idea o el problema que quieres resolver. Sin tecnicismos.',
      en: 'You tell me your idea or the problem you want to solve. No jargon.',
    },
  },
  {
    title: { es: 'Te envío una propuesta', en: 'You get a proposal' },
    description: {
      es: 'Qué voy a construir, en cuánto tiempo y cuánto cuesta, por escrito y claro.',
      en: "What I'll build, how long it takes and what it costs, clearly in writing.",
    },
  },
  {
    title: { es: 'Construyo por etapas', en: 'I build in stages' },
    description: {
      es: 'Ves y pruebas avances reales cada semana, y podemos ajustar sobre la marcha.',
      en: 'You see and try real progress every week, and we adjust along the way.',
    },
  },
  {
    title: { es: 'Lanzamos y te acompaño', en: 'We launch and I stay around' },
    description: {
      es: 'Publico el proyecto, te enseño a usarlo y sigo disponible para soporte.',
      en: 'I publish the project, show you how to use it and stay available for support.',
    },
  },
];
