/**
 * Core Metcalfe's Law and Network Effects calculations
 * V(N) = N² — the fundamental insight that network value scales quadratically
 */

/** Metcalfe's Law: network value grows as N² */
export function metcalfeValue(n: number): number {
  return n * n
}

/** Number of unique bidirectional connections in a network of N nodes */
export function networkConnections(n: number): number {
  if (n <= 1) return 0
  return (n * (n - 1)) / 2
}

/** Reed's Law: value from group-forming networks = 2^N */
export function reedValue(n: number): number {
  return Math.pow(2, n)
}

/** Sarnoff's Law (broadcast): value proportional to N */
export function sarnoffValue(n: number): number {
  return n
}

/**
 * Combined Network Connection Effect score
 * Weights: connections × engagement rate × monetization factor
 */
export function nceScore(
  n: number,
  engagementRate: number,
  monetizationFactor: number
): number {
  const connections = networkConnections(n)
  return connections * engagementRate * monetizationFactor
}

/**
 * Logistic (S-curve) growth model
 * @param t  time step
 * @param L  carrying capacity (max users)
 * @param k  growth rate
 * @param t0 inflection point (time of fastest growth)
 */
export function logisticGrowth(
  t: number,
  L: number,
  k: number,
  t0: number
): number {
  return L / (1 + Math.exp(-k * (t - t0)))
}

/**
 * Three-year quarterly adoption model for a product
 * Returns 12 quarters of projected user counts (millions)
 */
export function adoptionModel(
  maxUsers: number,
  growthRate: number,
  inflectionQuarter: number
): { quarter: string; users: number; connections: number; value: number }[] {
  const quarters: string[] = []
  for (let y = 1; y <= 3; y++) {
    for (let q = 1; q <= 4; q++) {
      quarters.push(`Y${y}Q${q}`)
    }
  }

  return quarters.map((quarter, i) => {
    const users = logisticGrowth(i + 1, maxUsers, growthRate, inflectionQuarter)
    const usersM = Math.round(users * 10) / 10
    return {
      quarter,
      users: usersM,
      connections: Math.round(networkConnections(usersM * 1_000_000) / 1_000_000_000), // billions
      value: Math.round(metcalfeValue(usersM) / 10) * 10,
    }
  })
}

/**
 * Synergy multiplier between two product concepts
 * Returns a 0–1 score based on shared user behaviors
 */
export function synergyScore(productA: number, productB: number, matrix: number[][]): number {
  if (productA === productB) return 1
  return matrix[productA][productB]
}

/**
 * Flywheel velocity: how quickly the reinforcing loop accelerates
 * Higher engagement → more content → more users → more engagement
 */
export function flywheelVelocity(
  users: number,
  contentHours: number,
  socialActions: number
): number {
  const contentDensity = contentHours / Math.max(users, 1)
  const socialDensity = socialActions / Math.max(users, 1)
  return Math.sqrt(users * contentDensity * socialDensity)
}

/**
 * Network penetration ratio: active social nodes / total subscribers
 */
export function networkPenetration(activeNodes: number, totalSubscribers: number): number {
  return Math.min(activeNodes / Math.max(totalSubscribers, 1), 1)
}

/** Format large numbers for display */
export function formatMillions(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}B`
  if (n >= 1) return `${n.toFixed(1)}M`
  return `${(n * 1000).toFixed(0)}K`
}

export function formatBillions(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}T`
  return `${n.toFixed(1)}B`
}
