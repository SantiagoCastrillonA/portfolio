# AGENTS.md

Guía para agentes de IA (Claude Code, Copilot, Codex, Cursor…) que trabajen en este repositorio.

## Sobre el autor

- **Santiago Castrillón Arbeláez**, desarrollador full-stack en Quindío, Colombia. Tecnólogo en Análisis y Desarrollo de Software (SENA, oct. 2026).
- Trabaja a diario con **Laravel / PHP / Eloquent / Blade**, **JavaScript / TypeScript**, **React + Vite**, **Node + Express**, **MySQL** y **MongoDB / Mongoose**, **Bootstrap 5 + DataTables**, **Laravel Reverb / WebSockets**, **nginx**, **AWS (EC2) + GitHub Actions**, y agentes de IA (Copilot, diseño de prompts).
- Entorno: **Windows 11**, PowerShell y Git Bash, VS Code, Node 24, npm, Git + GitHub (`SantiagoCastrillonA`).
- Idioma de trabajo: **español**. Responde en español; el código, los identificadores y los comentarios van en inglés; los textos visibles del sitio existen en español e inglés.

## Proyecto

Portafolio de servicios bilingüe de una sola página, basado en un mockup de estética de terminal. Ver `README.md` para la descripción completa.

- Astro 7 + TypeScript estricto, Tailwind CSS 4, Content Collections (Zod).
- Desplegado en Cloudflare Workers (`@astrojs/cloudflare`). Todo se pre-renderiza; la única ruta de servidor es `src/pages/api/contact.ts`.
- Sin framework de UI en el cliente: la interactividad son `<script>` TypeScript pequeños dentro de los componentes `.astro`. No agregues React/Preact salvo que se pida.

## Comandos

```bash
npm run dev          # servidor de desarrollo (localhost:4321)
npm run check        # astro check + biome
npm run format       # biome con arreglos
npm test             # vitest
npm run test:e2e     # playwright + axe (compila y sirve en :4322)
npm run build        # build de producción
```

Antes de dar por terminado un cambio: `npm run check`, `npm test` y, si tocaste UI, `npm run test:e2e`.

## Convenciones

- **Escribe para el cliente, no para desarrolladores.** Cada texto visible debe entenderlo alguien que no programa: qué es, para quién y qué logra. Nada de jerga (comandos, hashes, JSON) como contenido; la estética de terminal es solo decoración (barras de ventana, tipografía mono, cursor). Nombres de tecnologías solo en `stack` / herramientas.
- **Orden de la página:** Inicio → Servicios → Proyectos → Experiencia → Herramientas → Contacto. Cada sección usa `SectionHeading` (número, título, una línea de explicación).

- **Contenido, no código:** proyectos y experiencia viven en `src/content/{projects,experience}/{es,en}/*.md`. Cada entrada existe en los dos idiomas con el mismo nombre de archivo. Los esquemas están en `src/content.config.ts`.
- **Textos de UI:** solo en `src/i18n/ui.ts`. El tipo de `en` obliga a tener las mismas claves que `es`. Usa `useTranslations(getLang(Astro.currentLocale))`.
- **Datos personales y herramientas:** `src/data/profile.ts`. **Servicios y proceso:** `src/data/services.ts`.
- **Estilos:** utilidades de Tailwind con los tokens de `@theme` en `src/styles/global.css` (`bg-bg`, `bg-surface`, `border-line`, `text-fg-2`, `text-muted`, `text-accent`…). No uses colores hex sueltos en componentes. Utilidades compartidas (`btn-primary`, `btn-ghost`, `card`, `field`, `prompt`, `section-title`) se definen con `@utility`.
- **Componentes:** `TerminalWindow.astro` para cualquier tarjeta con barra de ventana. Las previews de proyectos están en `components/previews/` y se registran en `ProjectPreview.astro` y en `PROJECT_PREVIEWS` (`src/lib/projects.ts`).
- **No importes `src/content.config.ts` desde componentes**: arrastra el loader `glob` al bundle y rompe el prerender en workerd. Las constantes compartidas van en `src/lib/`.
- **Lógica pura** (sin Astro ni DOM) en `src/lib/` y con prueba en `tests/unit/`.
- **Accesibilidad:** objetivos táctiles de al menos 44 px, `aria-*` correctos, foco visible, respetar `prefers-reduced-motion`. El test de axe debe quedar en cero violaciones.
- **Movimiento** (principios de Apple, *Designing Fluid Interfaces*): feedback en el press (utilidad `pressable`), animaciones que siguen el puntero con resortes (`src/lib/spring.ts`, amortiguamiento 1 por defecto) en vez de transiciones CSS, entrada y salida por el mismo camino y anclada al disparador, cambios de layout con View Transitions. Todo debe degradar con `prefers-reduced-motion`; anima solo `transform` y `opacity`.
- **Tamaños de texto en `rem`**, nunca en px, para respetar el tamaño de letra del usuario.
- **Formato:** Biome (2 espacios, comillas simples, 120 columnas). Biome no procesa `.astro`; mantén el mismo estilo a mano.
- **Commits:** mensajes cortos en inglés, estilo Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

## Formulario y secretos

- `POST /api/contact`: rate limit por IP (`CONTACT_LIMITER`), honeypot `website`, validación con `contactSchema` (`src/lib/contact.ts`), verificación de Turnstile y envío por la API de Resend.
- Secretos: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY` (en `.dev.vars` local y `wrangler secret put` en producción). Variable pública de build: `PUBLIC_TURNSTILE_SITE_KEY`. Nunca subas `.dev.vars` ni claves reales.
- Tras cambiar `wrangler.jsonc`, ejecuta `npm run generate-types` para actualizar `worker-configuration.d.ts`.

## Documentación de referencia

- Astro: https://docs.astro.build (rutas, content collections, i18n, adaptador de Cloudflare)
- Tailwind CSS 4: https://tailwindcss.com/docs
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Turnstile: https://developers.cloudflare.com/turnstile/
- Resend: https://resend.com/docs
