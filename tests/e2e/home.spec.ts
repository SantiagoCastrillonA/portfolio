import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('home', () => {
  for (const path of ['/', '/en/']) {
    test(`has no accessibility violations on ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).exclude('.cf-turnstile').analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('serves both languages with hreflang', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Hola, soy Santiago.');
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);

    await page.goto('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Santiago.");
  });

  test('filters projects by tag and keeps it in the URL', async ({ page }) => {
    await page.goto('/');
    const projects = page.locator('#proyectos [data-tags]');
    await expect(projects).toHaveCount(5);

    await page.getByRole('button', { name: 'Inteligencia artificial' }).click();
    await expect(page.getByRole('button', { name: 'Inteligencia artificial' })).toHaveAttribute('aria-pressed', 'true');
    await expect(projects.locator('visible=true')).toHaveCount(1);
    await expect(page).toHaveURL(/\?tag=ai/);

    await page.goto('/?tag=business');
    await expect(projects.locator('visible=true')).toHaveCount(3);

    await page.getByRole('button', { name: 'Todos' }).click();
    await expect(projects.locator('visible=true')).toHaveCount(5);
  });

  test('validates the contact form before sending', async ({ page }) => {
    await page.goto('/#contacto');
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.locator('[data-status]')).toContainText('Revisa los campos');
    await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');
  });
});

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile only');

  test('opens, navigates and closes', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Abrir menú' });
    await toggle.click();
    await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');

    await page.getByRole('navigation').getByRole('link', { name: 'Proyectos' }).click();
    await expect(page.locator('#nav-menu')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });
});
