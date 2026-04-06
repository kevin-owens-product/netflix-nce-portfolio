/**
 * Analytics stubs — drop-in wrappers for any analytics provider
 * Structured for easy swap to: Amplitude, Mixpanel, Segment, or custom
 */

export type EventProperties = Record<string, string | number | boolean | null>

export interface AnalyticsEvent {
  name: string
  properties: EventProperties
  timestamp: number
  sessionId: string
}

// In-memory event queue (swap for real SDK calls in production)
const eventQueue: AnalyticsEvent[] = []

let sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

function createEvent(name: string, properties: EventProperties = {}): AnalyticsEvent {
  return {
    name,
    properties: {
      ...properties,
      path: typeof window !== 'undefined' ? window.location.pathname : '/',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 60) : '',
    },
    timestamp: Date.now(),
    sessionId,
  }
}

/** Track a user action or page event */
export function track(name: string, properties: EventProperties = {}): void {
  const event = createEvent(name, properties)
  eventQueue.push(event)

  if (import.meta.env.DEV) {
    console.groupCollapsed(`[Analytics] ${name}`)
    console.table(properties)
    console.groupEnd()
  }

  // TODO: replace with real provider call
  // amplitude.track(name, properties)
  // mixpanel.track(name, properties)
  // analytics.track({ event: name, properties })
}

/** Identify the current user */
export function identify(userId: string, traits: EventProperties = {}): void {
  if (import.meta.env.DEV) {
    console.log(`[Analytics] identify: ${userId}`, traits)
  }
  // amplitude.setUserId(userId)
  // mixpanel.identify(userId)
}

/** Track a page view */
export function page(pageName: string, properties: EventProperties = {}): void {
  track('page_viewed', { page: pageName, ...properties })
}

/** Reset session (on logout or new session start) */
export function reset(): void {
  sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  eventQueue.length = 0
}

/** Retrieve buffered events (useful for debugging) */
export function getEventQueue(): AnalyticsEvent[] {
  return [...eventQueue]
}

// Pre-defined typed events for this app
export const Analytics = {
  sliderChanged: (product: string, param: string, value: number) =>
    track('slider_changed', { product, param, value }),

  tabSwitched: (from: string, to: string) =>
    track('tab_switched', { from, to }),

  productSelected: (productName: string) =>
    track('product_selected', { product: productName }),

  synergyHovered: (productA: string, productB: string, score: number) =>
    track('synergy_hovered', { product_a: productA, product_b: productB, score }),

  flywheelToggled: (isPlaying: boolean) =>
    track('flywheel_toggled', { is_playing: isPlaying }),

  chartInteraction: (chartType: string, action: string) =>
    track('chart_interaction', { chart_type: chartType, action }),

  exportClicked: (format: string) =>
    track('export_clicked', { format }),
}
