// Kept apart from content.config.ts so components can import them without
// pulling the content loaders into the rendered bundle.

/**
 * Plain-language categories behind the project filter. Labels live in
 * src/i18n/ui.ts as `projects.cat.<category>`.
 */
export const PROJECT_CATEGORIES = ['web', 'business', 'ai'] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/** Visual mini-previews rendered at the top of each card (see components/previews). */
export const PROJECT_PREVIEWS = ['quiz', 'chat', 'bars', 'agent', 'migrate'] as const;
