import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = ['/', '/category/creational', '/pattern/singleton', '/missing']

for (const route of routes) {
  test(`${route} has a coherent responsive shell`, async ({ page }) => {
    await page.goto(route)
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll')
    const width = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)
    expect(width).toBe(true)
  })
}

test('mobile navigation and Vietnamese labels work', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-360', 'mobile-only navigation check')
  await page.goto('/')
  await page.getByRole('button', { name: /open navigation/i }).click()
  const mobileMenu = page.locator('#mobile-navigation')
  await expect(mobileMenu).toBeVisible()
  await page.getByRole('button', { name: /switch language/i }).click()
  await expect(mobileMenu.getByRole('link', { name: /Khởi tạo/ })).toBeVisible()
})

test('home page English visual baseline', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('home-en.png', { animations: 'disabled' })
})

test('home page Vietnamese visual baseline', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /switch language/i }).click()
  await expect(page).toHaveScreenshot('home-vi.png', { animations: 'disabled' })
})

test('primary routes have no serious automated accessibility violations', async ({ page }, testInfo) => {
  test.skip(!['mobile-360', 'desktop-1280'].includes(testInfo.project.name), 'mobile and desktop accessibility audit')
  for (const route of routes.slice(0, 3)) {
    await page.goto(route)
    const results = await new AxeBuilder({ page }).analyze()
    const serious = results.violations
      .filter(violation => violation.impact === 'serious' || violation.impact === 'critical')
      .map(violation => ({ id: violation.id, nodes: violation.nodes.length }))
    expect(serious, `${route} accessibility violations`).toEqual([])
  }
})

const sceneCases = ['adapter', 'iterator', 'flyweight', 'state']

test('archival illustrations hold together in card and detail contexts', async ({ page }, testInfo) => {
  test.skip(!['mobile-360', 'desktop-1280'].includes(testInfo.project.name), 'representative scene review widths')

  await page.goto('/category/creational')
  await expect(page.locator('[data-scene-variant="thumbnail"]').first()).toHaveScreenshot('scene-thumbnail.png', { animations: 'disabled' })

  for (const slug of sceneCases) {
    await page.goto(`/pattern/${slug}`)
    await expect(page.locator('#example figure')).toHaveScreenshot(`scene-detail-${slug}.png`, { animations: 'disabled' })
  }

  if (testInfo.project.name === 'mobile-360') {
    await page.goto('/pattern/adapter')
    await expect(page.locator('#example [aria-label="Technical annotations"]')).toHaveScreenshot('scene-mobile-legend.png', { animations: 'disabled' })
  }
})
