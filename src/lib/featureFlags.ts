/**
 * Feature Flag System — simple A/B experiment infrastructure
 * Supports: boolean flags, multivariate experiments, user-segment targeting
 */

export type FlagValue = boolean | string | number

export interface FeatureFlag {
  key: string
  description: string
  defaultValue: FlagValue
  variants?: Record<string, FlagValue>
  rolloutPercent?: number // 0–100
}

export interface ExperimentResult {
  flagKey: string
  variant: string
  value: FlagValue
  userId: string
}

// Registry of all feature flags
const FLAG_REGISTRY: FeatureFlag[] = [
  {
    key: 'show_flywheel_animation',
    description: 'Enable animated flywheel visualization',
    defaultValue: true,
    rolloutPercent: 100,
  },
  {
    key: 'radar_chart_variant',
    description: 'Which radar chart color scheme to use',
    defaultValue: 'red',
    variants: { control: 'red', treatment: 'gradient' },
    rolloutPercent: 50,
  },
  {
    key: 'show_reed_law_overlay',
    description: 'Show Reed\'s Law comparison overlay on network chart',
    defaultValue: false,
    variants: { control: false, treatment: true },
    rolloutPercent: 30,
  },
  {
    key: 'synergy_matrix_labels',
    description: 'Show numeric labels in synergy matrix cells',
    defaultValue: true,
    rolloutPercent: 100,
  },
  {
    key: 'adoption_model_quarters',
    description: 'Number of quarters to show in adoption model',
    defaultValue: 12,
    variants: { compact: 8, standard: 12, extended: 16 },
    rolloutPercent: 100,
  },
]

class FeatureFlagService {
  private flags: Map<string, FeatureFlag>
  private overrides: Map<string, FlagValue>
  private userId: string

  constructor() {
    this.flags = new Map(FLAG_REGISTRY.map(f => [f.key, f]))
    this.overrides = new Map()
    this.userId = this.getOrCreateUserId()
  }

  private getOrCreateUserId(): string {
    const stored = localStorage.getItem('nce_user_id')
    if (stored) return stored
    const id = `user_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem('nce_user_id', id)
    return id
  }

  /** Deterministic bucket assignment based on user ID + flag key */
  private getBucket(flagKey: string): number {
    const str = `${this.userId}:${flagKey}`
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
    }
    return Math.abs(hash) % 100
  }

  isEnabled(flagKey: string): boolean {
    const value = this.getValue(flagKey)
    return value === true || value === 'treatment'
  }

  getValue(flagKey: string): FlagValue {
    // Override takes priority
    if (this.overrides.has(flagKey)) {
      return this.overrides.get(flagKey)!
    }

    const flag = this.flags.get(flagKey)
    if (!flag) return false

    const bucket = this.getBucket(flagKey)
    const rollout = flag.rolloutPercent ?? 100

    // Not in rollout
    if (bucket >= rollout) return flag.defaultValue

    // Multivariate experiment
    if (flag.variants && flag.rolloutPercent !== 100) {
      const keys = Object.keys(flag.variants)
      const variantIdx = bucket % keys.length
      return flag.variants[keys[variantIdx]]
    }

    return flag.defaultValue
  }

  /** Override a flag for testing/debugging */
  override(flagKey: string, value: FlagValue): void {
    this.overrides.set(flagKey, value)
  }

  /** Reset all overrides */
  resetOverrides(): void {
    this.overrides.clear()
  }

  getAllFlags(): { key: string; value: FlagValue; description: string }[] {
    return FLAG_REGISTRY.map(f => ({
      key: f.key,
      value: this.getValue(f.key),
      description: f.description,
    }))
  }

  getUserId(): string {
    return this.userId
  }
}

// Singleton
export const featureFlags = new FeatureFlagService()

// React hook usage helper
export function useFlag(flagKey: string): FlagValue {
  return featureFlags.getValue(flagKey)
}
