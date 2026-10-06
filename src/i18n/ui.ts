export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

// Copy rule: visitors are often not developers. Say what things are and why they
// matter in everyday words; the terminal look is decoration, never the message.
const es = {
  'meta.title': 'Santiago Castrillón · Desarrollador web',
  'meta.description':
    'Desarrollo páginas web, sistemas a la medida para empresas y asistentes con inteligencia artificial. Disponible para proyectos freelance en Colombia y remoto.',
  'brand.role': 'Desarrollador web',
  skip: 'Saltar al contenido',

  'nav.label': 'Principal',
  'nav.services': 'Servicios',
  'nav.projects': 'Proyectos',
  'nav.experience': 'Experiencia',
  'nav.contact': 'Contacto',
  'nav.cv': 'Descargar CV',
  'nav.open': 'Abrir menú',
  'nav.close': 'Cerrar menú',
  'nav.lang': 'Cambiar idioma',

  'hero.available': 'Disponible para nuevos proyectos',
  'hero.hello': 'Hola, soy Santiago.',
  'hero.tagline': ' Creo software que la gente usa.',
  'hero.lead':
    'Soy desarrollador web. Construyo páginas web, sistemas a la medida para empresas y asistentes con inteligencia artificial, desde la idea hasta que están funcionando.',
  'hero.ctaContact': 'Cuéntame tu idea',
  'hero.ctaProjects': 'Ver proyectos',
  'hero.now': 'Hoy',
  'hero.nowWork': 'Desarrollador de software en Berhlan de Colombia',
  'hero.nowMentor': 'Mentor en Jóvenes creaTIvos (Sofka)',

  'services.eyebrow': '01 · Servicios',
  'services.title': '¿En qué te puedo ayudar?',
  'services.lead':
    'Si tienes una idea o un proceso que hoy haces a mano, puedo convertirlo en una herramienta que funcione.',
  'services.example': 'Ejemplo real',
  'process.title': 'Cómo trabajamos',

  'projects.eyebrow': '02 · Proyectos',
  'projects.title': 'Trabajos reales',
  'projects.lead': 'Lo que construí, para quién y qué se logró.',
  'projects.filter': 'Filtrar proyectos por tipo',
  'projects.cat.all': 'Todos',
  'projects.cat.web': 'Páginas web',
  'projects.cat.business': 'Para empresas',
  'projects.cat.ai': 'Inteligencia artificial',
  'projects.featured': 'destacado',
  'projects.for': 'Para',
  'projects.live': 'En uso',
  'projects.wip': 'En desarrollo',
  'projects.builtWith': 'Hecho con',
  'projects.demo': 'Ver en vivo',
  'projects.code': 'Ver código',
  'projects.empty': 'No hay proyectos en esta categoría todavía.',
  'projects.ctaTitle': '¿Tu proyecto podría ser el siguiente?',
  'projects.ctaText': 'Cuéntame qué necesitas y te respondo con una propuesta clara.',
  'projects.ctaButton': 'Hablemos',

  'experience.eyebrow': '03 · Experiencia',
  'experience.title': 'Dónde he trabajado',
  'experience.current': 'Actual',
  'experience.kind.work': 'Trabajo',
  'experience.kind.mentoring': 'Mentoría',
  'experience.kind.education': 'Estudios',

  'tools.eyebrow': '04 · Herramientas',
  'tools.title': 'Con qué construyo',
  'tools.lead': 'Para los curiosos: las tecnologías que uso a diario.',

  'contact.eyebrow': '05 · Contacto',
  'contact.title': '¿Tienes un proyecto',
  'contact.titleMuted': ' en mente?',
  'contact.lead':
    'Escríbeme y te respondo en menos de 48 horas con los siguientes pasos. También estoy abierto a ofertas de trabajo como desarrollador.',
  'contact.channels': 'También puedes encontrarme en',
  'contact.mail': 'Correo',
  'contact.window': 'nuevo-mensaje',
  'contact.name': 'Nombre',
  'contact.namePh': 'Tu nombre o el de tu empresa',
  'contact.email': 'Correo',
  'contact.emailPh': 'tu@correo.com',
  'contact.message': '¿Qué necesitas?',
  'contact.messagePh': 'Por ejemplo: una página para mi negocio, un sistema de inventario…',
  'contact.submit': 'Enviar mensaje',
  'contact.sending': 'Enviando…',
  'contact.ok': '✓ Mensaje enviado. Te respondo pronto.',
  'contact.error': '✗ No se pudo enviar. Escríbeme directo a mi correo.',
  'contact.invalid': '✗ Revisa los campos marcados.',
  'contact.limited': '✗ Demasiados intentos. Espera un minuto.',
  'contact.captcha': '✗ No pudimos verificar que eres humano. Intenta de nuevo.',

  'footer.location': 'Quindío, Colombia',
  'footer.exit': 'process exited with code',
} as const;

export type UIKey = keyof typeof es;

const en: Record<UIKey, string> = {
  'meta.title': 'Santiago Castrillón · Web developer',
  'meta.description':
    'I build websites, custom business systems and AI assistants. Available for freelance projects, remote or in Colombia.',
  'brand.role': 'Web developer',
  skip: 'Skip to content',

  'nav.label': 'Main',
  'nav.services': 'Services',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',
  'nav.cv': 'Download CV',
  'nav.open': 'Open menu',
  'nav.close': 'Close menu',
  'nav.lang': 'Change language',

  'hero.available': 'Available for new projects',
  'hero.hello': "Hi, I'm Santiago.",
  'hero.tagline': ' I build software people use.',
  'hero.lead':
    "I'm a web developer. I build websites, custom business systems and AI assistants, from the first idea until they are up and running.",
  'hero.ctaContact': 'Tell me your idea',
  'hero.ctaProjects': 'See projects',
  'hero.now': 'Now',
  'hero.nowWork': 'Software developer at Berhlan de Colombia',
  'hero.nowMentor': 'Mentor at Jóvenes creaTIvos (Sofka)',

  'services.eyebrow': '01 · Services',
  'services.title': 'How can I help you?',
  'services.lead': 'If you have an idea, or a process you still do by hand, I can turn it into a tool that works.',
  'services.example': 'Real example',
  'process.title': 'How we work together',

  'projects.eyebrow': '02 · Projects',
  'projects.title': 'Real work',
  'projects.lead': 'What I built, who it was for and what it achieved.',
  'projects.filter': 'Filter projects by type',
  'projects.cat.all': 'All',
  'projects.cat.web': 'Websites',
  'projects.cat.business': 'For businesses',
  'projects.cat.ai': 'Artificial intelligence',
  'projects.featured': 'featured',
  'projects.for': 'For',
  'projects.live': 'In use',
  'projects.wip': 'In progress',
  'projects.builtWith': 'Built with',
  'projects.demo': 'See it live',
  'projects.code': 'View code',
  'projects.empty': 'No projects in this category yet.',
  'projects.ctaTitle': 'Could your project be next?',
  'projects.ctaText': "Tell me what you need and I'll get back to you with a clear proposal.",
  'projects.ctaButton': "Let's talk",

  'experience.eyebrow': '03 · Experience',
  'experience.title': "Where I've worked",
  'experience.current': 'Current',
  'experience.kind.work': 'Work',
  'experience.kind.mentoring': 'Mentoring',
  'experience.kind.education': 'Education',

  'tools.eyebrow': '04 · Tools',
  'tools.title': 'What I build with',
  'tools.lead': 'For the curious: the technologies I use every day.',

  'contact.eyebrow': '05 · Contact',
  'contact.title': 'Have a project',
  'contact.titleMuted': ' in mind?',
  'contact.lead':
    "Write to me and I'll reply within 48 hours with the next steps. I'm also open to full-time developer roles.",
  'contact.channels': 'You can also find me on',
  'contact.mail': 'Email',
  'contact.window': 'new-message',
  'contact.name': 'Name',
  'contact.namePh': 'Your name or company',
  'contact.email': 'Email',
  'contact.emailPh': 'you@email.com',
  'contact.message': 'What do you need?',
  'contact.messagePh': 'For example: a website for my business, an inventory system…',
  'contact.submit': 'Send message',
  'contact.sending': 'Sending…',
  'contact.ok': "✓ Message sent. I'll get back to you soon.",
  'contact.error': "✗ Couldn't send it. Email me directly instead.",
  'contact.invalid': '✗ Check the highlighted fields.',
  'contact.limited': '✗ Too many attempts. Wait a minute.',
  'contact.captcha': "✗ We couldn't verify you're human. Try again.",

  'footer.location': 'Quindío, Colombia',
  'footer.exit': 'process exited with code',
};

export const ui: Record<Lang, Record<UIKey, string>> = { es, en };
