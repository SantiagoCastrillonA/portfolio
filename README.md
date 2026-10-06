# Portafolio · Santiago Castrillón

Portafolio de servicios de **Santiago Castrillón Arbeláez**, desarrollador full-stack (Laravel, PHP, JavaScript, React, Node). Es un sitio de una sola página, bilingüe (español/inglés), con estética de terminal, pensado para conseguir proyectos freelance y oportunidades laborales.

**Regla de contenido:** quien lo visita casi nunca es desarrollador. Los textos explican qué es cada cosa y para qué sirve en palabras simples; la estética de terminal es decoración, no el mensaje.

- **Producción:** https://portfolio.scastrillon.workers.dev (provisional, hasta tener dominio propio)
- **Diseño base:** mockup "Portfolio Santiago Castrillón" (escritorio 1280 px y móvil 390 px)
- **Contacto:** santiago.castrillon.ar@gmail.com · [LinkedIn](https://www.linkedin.com/in/santiago-castrillón-arbelaez-0b0906430) · [GitHub](https://github.com/SantiagoCastrillonA)

## Qué incluye

- **Inicio:** quién es, qué hace en una frase, disponibilidad y dónde trabaja hoy. Logo `</>` de partículas animado.
- **01 Servicios:** qué puede hacer por un cliente, con un ejemplo real por servicio, y cómo es el proceso de trabajo en 4 pasos.
- **02 Proyectos:** para quién, qué es, qué logró y con qué se hizo. Filtros por tipo (páginas web, para empresas, inteligencia artificial) que quedan en la URL (`?tag=business`).
- **03 Experiencia:** línea de tiempo simple (trabajo, mentoría, estudios).
- **04 Herramientas:** tecnologías agrupadas por uso, para los curiosos.
- Formulario de contacto real: validación, antispam con Cloudflare Turnstile, límite de envíos por IP y correo vía Resend.
- Español en `/` e inglés en `/en/`, con `hreflang`, sitemap, Open Graph y datos estructurados (`Person`).
- Movimiento fluido inspirado en Apple: feedback al presionar, parallax con resortes, menú y filtros con transiciones continuas, cambio de idioma con View Transitions.
- Accesible (teclado, foco visible, textos en `rem`, `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`) y verificado con axe en cada CI.

## Stack

| Área | Tecnología |
|---|---|
| Framework | [Astro 7](https://astro.build) + TypeScript estricto |
| Estilos | Tailwind CSS 4 con tokens del mockup (`src/styles/global.css`) |
| Fuentes | IBM Plex Sans y JetBrains Mono auto-hospedadas (Fontsource) |
| Contenido | Content Collections con esquemas Zod (`src/content/`) |
| Backend | Una sola ruta de servidor: `POST /api/contact` |
| Hosting | Cloudflare Workers (assets estáticos + Worker) |
| Calidad | Biome, `astro check`, Vitest, Playwright + axe |
| CI | GitHub Actions; despliegue con Cloudflare Workers Builds |

Todas las páginas se pre-renderizan como HTML estático; solo el formulario ejecuta código en el Worker.

## Requisitos

- Node.js 24 o superior
- npm

## Puesta en marcha

```bash
npm install
cp .dev.vars.example .dev.vars   # claves de prueba de Turnstile
npm run dev                      # http://localhost:4321
```

Sin `RESEND_API_KEY`, el formulario no envía correos: imprime el mensaje en la consola del servidor.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve el build con el runtime de Cloudflare (workerd) |
| `npm run check` | `astro check` + Biome |
| `npm run format` | Formatea y aplica arreglos seguros de Biome |
| `npm test` | Pruebas unitarias (Vitest) |
| `npm run test:e2e` | Pruebas end-to-end y de accesibilidad (Playwright) |
| `npm run og` | Regenera `public/og.png` |
| `npm run deploy` | Build + `wrangler deploy` manual |

## Estructura

```
src/
  content/            Proyectos y experiencia en Markdown, una carpeta por idioma (es/, en/)
  content.config.ts   Esquemas Zod del contenido
  data/profile.ts     Datos personales y stack
  i18n/               Textos de la interfaz (ui.ts) y utilidades de idioma
  lib/                Lógica pura: partículas, esquema del formulario, constantes
  components/         Secciones de la página y previews de proyectos
  layouts/            <head>, SEO y datos estructurados
  pages/              index.astro (es), en/index.astro, api/contact.ts
tests/unit/           Vitest
tests/e2e/            Playwright + axe
```

## Cómo actualizar el contenido

- **Nuevo proyecto:** crea `src/content/projects/es/<slug>.md` y `src/content/projects/en/<slug>.md` con el mismo frontmatter (copia uno existente). Si un campo falta o es inválido, el build falla y dice cuál.
- **Nueva experiencia:** igual, en `src/content/experience/{es,en}/`.
- **Servicios y proceso de trabajo:** `src/data/services.ts`.
- **Herramientas y redes:** `src/data/profile.ts`.
- **Textos de la interfaz:** `src/i18n/ui.ts` (TypeScript obliga a traducir cada clave a los dos idiomas).
- **Color de acento:** `--color-accent` en `src/styles/global.css`.
- **CV:** coloca `public/cv/santiago-castrillon-es.pdf` y `public/cv/santiago-castrillon-en.pdf`.

## Despliegue (Cloudflare)

1. Crear cuenta en Cloudflare y en Resend.
2. Turnstile: el widget `portfolio` ya existe (dominios `portfolio.scastrillon.workers.dev` y `localhost`). Su Site key pública está en `src/components/Contact.astro`.
3. En Cloudflare → Workers → *Create* → *Import a repository*, conectar este repo:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
4. Secretos del Worker:
   ```bash
   npx wrangler secret put TURNSTILE_SECRET_KEY
   npx wrangler secret put RESEND_API_KEY
   ```
5. Cada push a `main` despliega a producción; cada PR obtiene una URL de preview. GitHub Actions corre lint, tipos y pruebas.

### Cuando haya dominio propio

1. Comprarlo en Cloudflare Registrar y agregarlo como *Custom domain* del Worker.
2. Cambiar `SITE_URL` (o el valor por defecto en `astro.config.mjs`) y la URL de `public/robots.txt`.
3. Verificar el dominio en Resend y cambiar `CONTACT_FROM` en `wrangler.jsonc` (p. ej. `hola@tudominio.dev`).
4. Añadir el dominio al widget de Turnstile.
