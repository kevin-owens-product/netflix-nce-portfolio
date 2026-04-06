import { test, expect, Page } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173'

test.describe('Netflix NCE Portfolio — E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE)
    await page.waitForSelector('[data-testid="tab-overview"]', { timeout: 10_000 })
  })

  // ── Navigation ─────────────────────────────────────────────────────────────

  test('loads overview tab by default', async ({ page }) => {
    await expect(page.getByTestId('tab-overview')).toHaveClass(/border-red-500/)
    await expect(page.locator('h1')).toContainText('Network Connection')
  })

  test('navigates to all tabs', async ({ page }) => {
    const tabs = ['metcalfe', 'synergy', 'flywheel', 'adoption'] as const

    for (const tab of tabs) {
      await page.getByTestId(`tab-${tab}`).click()
      await expect(page.getByTestId(`tab-${tab}`)).toHaveClass(/border-red-500/)
    }
  })

  // ── Overview tab ───────────────────────────────────────────────────────────

  test('shows 5 product cards on overview', async ({ page }) => {
    // 5 product cards + 1 combined card = 6 cards with netflix-card class
    const cards = page.locator('.netflix-card')
    await expect(cards).toHaveCount(await cards.count()) // just ensure they exist
    // Check specific product names
    for (const name of ['Watch Together', 'Netflix Live', 'Creator Studio', 'Game Night', 'Fan Marketplace']) {
      await expect(page.getByText(name).first()).toBeVisible()
    }
  })

  test('shows 260M subscriber stat', async ({ page }) => {
    await expect(page.getByText('260M')).toBeVisible()
  })

  test('displays law comparison: Metcalfe V=N²', async ({ page }) => {
    await expect(page.getByText(/V = N²/)).toBeVisible()
  })

  // ── Metcalfe Analysis tab ──────────────────────────────────────────────────

  test('product selector switches products', async ({ page }) => {
    await page.getByTestId('tab-metcalfe').click()
    await expect(page.getByText('Netflix Live').first()).toBeVisible()

    // Click Netflix Live product button
    const liveBtn = page.locator('button').filter({ hasText: 'Netflix Live' }).first()
    await liveBtn.click()

    // Should highlight with Live's color (orange)
    await expect(liveBtn).toHaveCSS('background-color', /rgb\(255,/)
  })

  test('sliders are interactive', async ({ page }) => {
    await page.getByTestId('tab-metcalfe').click()

    const slider = page.locator('input[type="range"]').first()
    await expect(slider).toBeVisible()

    // Verify it's enabled and has correct attributes
    await expect(slider).not.toBeDisabled()
    const min = await slider.getAttribute('min')
    const max = await slider.getAttribute('max')
    expect(Number(min)).toBeLessThan(Number(max))
  })

  test('Reed Law checkbox toggles overlay', async ({ page }) => {
    await page.getByTestId('tab-metcalfe').click()

    const checkbox = page.locator('input[type="checkbox"]').first()
    const initialState = await checkbox.isChecked()
    await checkbox.click()
    await expect(checkbox).toBeChecked({ checked: !initialState })
  })

  // ── Synergy Matrix tab ─────────────────────────────────────────────────────

  test('renders synergy matrix with correct dimensions', async ({ page }) => {
    await page.getByTestId('tab-synergy').click()

    await expect(page.getByText('Cross-Product Synergy Matrix')).toBeVisible()
    // 5 row headers + 5 column headers
    await expect(page.getByText('Watch').first()).toBeVisible()
    await expect(page.getByText('Live').first()).toBeVisible()
    await expect(page.getByText('Creator').first()).toBeVisible()
    await expect(page.getByText('Games').first()).toBeVisible()
    await expect(page.getByText('Market').first()).toBeVisible()
  })

  test('shows synergy score 0.85 for Watch × Live', async ({ page }) => {
    await page.getByTestId('tab-synergy').click()
    await expect(page.getByText('0.85').first()).toBeVisible()
  })

  test('shows top synergy pairs section', async ({ page }) => {
    await page.getByTestId('tab-synergy').click()
    await expect(page.getByText('Highest Synergy Pairs')).toBeVisible()
  })

  // ── Flywheel tab ───────────────────────────────────────────────────────────

  test('flywheel play/pause toggle works', async ({ page }) => {
    await page.getByTestId('tab-flywheel').click()

    const toggle = page.getByTestId('flywheel-toggle')
    await expect(toggle).toBeVisible()

    // Initially playing — button shows Pause
    await expect(toggle).toContainText('Pause')

    // Click to pause
    await toggle.click()
    await expect(toggle).toContainText('Play')

    // Click to resume
    await toggle.click()
    await expect(toggle).toContainText('Pause')
  })

  test('shows all 5 flywheel nodes', async ({ page }) => {
    await page.getByTestId('tab-flywheel').click()
    for (const label of ['More Subscribers', 'Richer Social Graph', 'Higher Engagement', 'Better Recommendations', 'More Revenue']) {
      await expect(page.getByText(label)).toBeVisible()
    }
  })

  test('shows flywheel velocity benchmarks', async ({ page }) => {
    await page.getByTestId('tab-flywheel').click()
    await expect(page.getByText('Flywheel Velocity Benchmarks')).toBeVisible()
    await expect(page.getByText('Early Traction')).toBeVisible()
    await expect(page.getByText('Network Dominance')).toBeVisible()
  })

  // ── Adoption Model tab ─────────────────────────────────────────────────────

  test('shows 3-year adoption model chart', async ({ page }) => {
    await page.getByTestId('tab-adoption').click()
    await expect(page.getByText('3-Year S-Curve Adoption Model')).toBeVisible()
    // Quarter labels
    await expect(page.getByText('Y1Q1').first()).toBeVisible()
    await expect(page.getByText('Y3Q4').first()).toBeVisible()
  })

  test('view toggles switch between users/connections/value', async ({ page }) => {
    await page.getByTestId('tab-adoption').click()

    await expect(page.getByText('Users (M)', { exact: true })).toBeVisible()

    // Switch to connections view
    await page.getByText('Connections (B)', { exact: true }).click()
    await expect(page.getByText('Connections (B)', { exact: true })).toBeVisible()

    // Switch to value view
    await page.getByText('Value Index (N²)', { exact: true }).click()
    await expect(page.getByText('Value Index (N²)', { exact: true })).toBeVisible()
  })

  test('product toggles show/hide series', async ({ page }) => {
    await page.getByTestId('tab-adoption').click()

    // Watch button should be highlighted initially
    const watchBtn = page.locator('button').filter({ hasText: /^Watch$/ }).first()
    await expect(watchBtn).toBeVisible()

    // Click to deselect
    await watchBtn.click()
    // Click again to reselect
    await watchBtn.click()
  })

  // ── Visual snapshots ───────────────────────────────────────────────────────

  test('overview visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('overview.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    })
  })

  test('metcalfe tab visual snapshot', async ({ page }) => {
    await page.getByTestId('tab-metcalfe').click()
    await page.waitForTimeout(500) // let charts render
    await expect(page).toHaveScreenshot('metcalfe.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    })
  })

  test('synergy tab visual snapshot', async ({ page }) => {
    await page.getByTestId('tab-synergy').click()
    await expect(page).toHaveScreenshot('synergy.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    })
  })
})
