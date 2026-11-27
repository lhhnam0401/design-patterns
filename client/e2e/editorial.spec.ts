import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const routes = ['/', '/category/creational', '/pattern/singleton', '/missing']

/** Every pattern has a Đông Hồ plate with pins, a step player and a legend. */
const plateSlugs = [
  'factory-method', 'abstract-factory', 'builder', 'prototype', 'singleton',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator', 'memento',
  'observer', 'state', 'strategy', 'template-method', 'visitor',
]

/** Plates whose look is pinned by screenshots: the three pilots and the six that had screenshots before the redesign. */
const screenshotSlugs = ['observer', 'abstract-factory', 'decorator', 'adapter', 'iterator', 'flyweight', 'state', 'memento', 'interpreter']

const reviewWidths = ['mobile-360', 'desktop-1280']

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

/** The home page loads its sections lazily; wait until the hero plate and the collections have rendered. */
async function openSettledHome(page: Page) {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page.locator('[data-scene-variant="feature"]')).toBeVisible()
  await expect(page.locator('#collections-title')).toBeVisible()
}

test('home page English visual baseline', async ({ page }) => {
  await openSettledHome(page)
  await expect(page).toHaveScreenshot('home-en.png', { animations: 'disabled' })
})

test('home page Vietnamese visual baseline', async ({ page }) => {
  await openSettledHome(page)
  await page.getByRole('button', { name: /switch language/i }).click()
  await expect(page).toHaveScreenshot('home-vi.png', { animations: 'disabled' })
})

async function seriousViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze()
  return results.violations
    .filter(violation => violation.impact === 'serious' || violation.impact === 'critical')
    .map(violation => ({ id: violation.id, nodes: violation.nodes.length }))
}

test('primary routes have no serious automated accessibility violations', async ({ page }, testInfo) => {
  test.skip(!reviewWidths.includes(testInfo.project.name), 'mobile and desktop accessibility audit')
  for (const route of routes.slice(0, 3)) {
    await page.goto(route)
    expect(await seriousViolations(page), `${route} accessibility violations`).toEqual([])
  }
})

test('pattern prose uses semantic blocks in both languages', async ({ page }, testInfo) => {
  test.skip(!reviewWidths.includes(testInfo.project.name), 'mobile and desktop prose checks')
  await page.goto('/pattern/factory-method')

  const applicability = page.locator('#applicability')
  await expect(applicability.locator('p')).toContainText('Use Factory Method when:')
  await expect(applicability.locator('li')).toHaveCount(3)

  await page.getByRole('button', { name: /switch language/i }).click()
  await expect(applicability.locator('p')).toContainText('Dùng Factory Method khi:')
  await expect(applicability.locator('li')).toHaveCount(3)

  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)
  expect(fits, 'no horizontal scroll').toBe(true)
  expect(await seriousViolations(page), 'Vietnamese prose accessibility violations').toEqual([])
})

const stepControls = (page: Page) => page.locator('[data-scene-steps] [role="group"]')

for (const slug of plateSlugs) {
  test(`${slug} plate works end to end and passes the accessibility audit`, async ({ page }, testInfo) => {
    test.skip(!reviewWidths.includes(testInfo.project.name), 'mobile and desktop plate checks')
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })

    await page.goto(`/pattern/${slug}`)
    const explorer = page.locator(`[data-scene-explorer="${slug}"]`)
    await expect(explorer).toBeVisible()

    const pins = await explorer.locator('[data-pin]').count()
    expect(pins).toBeGreaterThan(0)
    await expect(explorer.locator('[data-legend-row]')).toHaveCount(pins)

    const status = explorer.locator('[data-step-status]')
    const next = stepControls(page).getByRole('button', { name: 'Next' })
    await stepControls(page).getByRole('button', { name: 'Start' }).click()
    const total = Number((await status.textContent())?.match(/Step 1 of (\d+)/)?.[1])
    expect(total).toBeGreaterThanOrEqual(2)
    for (let step = 2; step <= total; step++) {
      await next.click()
      await expect(status).toContainText(`Step ${step} of ${total}`)
    }
    await expect(next).toHaveAttribute('aria-disabled', 'true')
    await expect(explorer.locator(`[data-step-badge="${total}"]`)).toHaveAttribute('data-active', 'true')

    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)
    expect(fits, 'no horizontal scroll').toBe(true)
    expect(errors, 'console and page errors').toEqual([])
    expect(await seriousViolations(page), `${slug} accessibility violations`).toEqual([])
  })
}

for (const slug of screenshotSlugs) {
  test(`${slug} plate holds together in overview and mid-walkthrough`, async ({ page }, testInfo) => {
    test.skip(!reviewWidths.includes(testInfo.project.name), 'representative plate review widths')
    await page.goto(`/pattern/${slug}`)
    const plate = page.locator('[data-scene-explorer] > div').first()
    await expect(plate).toHaveScreenshot(`plate-${slug}.png`, { animations: 'disabled' })

    await stepControls(page).getByRole('button', { name: 'Start' }).click()
    await stepControls(page).getByRole('button', { name: 'Next' }).click()
    await expect(page.locator('[data-step-status]')).toContainText('Step 2 of')
    await expect(plate).toHaveScreenshot(`plate-${slug}-step2.png`, { animations: 'disabled' })
  })
}

test('the plate legend reads well on a phone', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-360', 'mobile legend layout')
  await page.goto('/pattern/observer')
  await expect(page.locator('[data-scene-legend]')).toHaveScreenshot('plate-observer-legend.png', { animations: 'disabled' })
})

const cards = [
  { slug: 'observer', category: 'behavioral' },
  { slug: 'factory-method', category: 'creational' },
]

for (const { slug, category } of cards) {
  test(`${slug} card crops its plate to the key objects`, async ({ page }, testInfo) => {
    test.skip(!reviewWidths.includes(testInfo.project.name), 'representative card widths')
    await page.goto(`/category/${category}`)
    const card = page.locator(`a[href="/pattern/${slug}"] [data-scene-variant="thumbnail"]`)
    await expect(card).toHaveScreenshot(`plate-${slug}-card.png`, { animations: 'disabled' })
  })
}

test('plate pins and legend rows light the same object', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1280', 'desktop pointer check')
  await page.goto('/pattern/observer')
  await page.locator('[data-legend-row="F"]').hover()
  await expect(page.locator('[data-part="o3"]')).toHaveAttribute('data-lit', 'true')
  await expect(page.locator('[data-part="pub"]')).toHaveAttribute('data-dimmed', 'true')
  await expect(page.locator('[data-pin="F"]')).toHaveAttribute('data-lit', 'true')
})
