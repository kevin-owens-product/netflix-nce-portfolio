import { describe, it, expect } from 'vitest'
import {
  metcalfeValue,
  networkConnections,
  reedValue,
  sarnoffValue,
  nceScore,
  logisticGrowth,
  adoptionModel,
  networkPenetration,
  flywheelVelocity,
  formatMillions,
  formatBillions,
} from '../../src/lib/calculations'

describe('metcalfeValue', () => {
  it('returns 0 for n=0', () => {
    expect(metcalfeValue(0)).toBe(0)
  })
  it('returns 1 for n=1', () => {
    expect(metcalfeValue(1)).toBe(1)
  })
  it('returns 100 for n=10', () => {
    expect(metcalfeValue(10)).toBe(100)
  })
  it('scales quadratically: doubling N quadruples value', () => {
    expect(metcalfeValue(20)).toBe(4 * metcalfeValue(10))
  })
  it('handles large values (260M Netflix subscribers)', () => {
    expect(metcalfeValue(260)).toBe(67600)
  })
})

describe('networkConnections', () => {
  it('returns 0 for n=0', () => {
    expect(networkConnections(0)).toBe(0)
  })
  it('returns 0 for n=1 (no connections with one node)', () => {
    expect(networkConnections(1)).toBe(0)
  })
  it('returns 1 for n=2', () => {
    expect(networkConnections(2)).toBe(1)
  })
  it('returns 3 for n=3', () => {
    expect(networkConnections(3)).toBe(3)
  })
  it('returns 10 for n=5', () => {
    expect(networkConnections(5)).toBe(10)
  })
  it('is always less than metcalfeValue for n > 2', () => {
    for (const n of [3, 5, 10, 100]) {
      expect(networkConnections(n)).toBeLessThan(metcalfeValue(n))
    }
  })
  it('approximates N²/2 for large N (within 0.1%)', () => {
    const n = 1000
    const result = networkConnections(n)
    const approx = (n * n) / 2
    // N(N-1)/2 ≈ N²/2 for large N; exact value is 499500
    expect(result).toBeGreaterThanOrEqual(approx * 0.999)
    expect(result).toBeLessThan(approx * 1.001)
  })
})

describe('reedValue', () => {
  it('returns 1 for n=0 (2^0)', () => {
    expect(reedValue(0)).toBe(1)
  })
  it('returns 2 for n=1', () => {
    expect(reedValue(1)).toBe(2)
  })
  it('doubles with each additional user for small N', () => {
    expect(reedValue(4)).toBe(2 * reedValue(3))
  })
  it('grows faster than Metcalfe for large N', () => {
    const n = 20
    expect(reedValue(n)).toBeGreaterThan(metcalfeValue(n))
  })
})

describe('sarnoffValue', () => {
  it('equals N (linear broadcast value)', () => {
    expect(sarnoffValue(0)).toBe(0)
    expect(sarnoffValue(50)).toBe(50)
    expect(sarnoffValue(260)).toBe(260)
  })
  it('is always less than metcalfeValue for n > 1', () => {
    for (const n of [2, 10, 100, 260]) {
      expect(sarnoffValue(n)).toBeLessThan(metcalfeValue(n))
    }
  })
})

describe('nceScore', () => {
  it('returns 0 when N=0', () => {
    expect(nceScore(0, 0.7, 0.8)).toBe(0)
  })
  it('returns 0 when engagement=0', () => {
    expect(nceScore(100, 0, 0.8)).toBe(0)
  })
  it('returns 0 when monetization=0', () => {
    expect(nceScore(100, 0.7, 0)).toBe(0)
  })
  it('scales with all three factors', () => {
    const base = nceScore(10, 0.5, 0.5)
    expect(nceScore(10, 1.0, 0.5)).toBeGreaterThan(base)
    expect(nceScore(10, 0.5, 1.0)).toBeGreaterThan(base)
    expect(nceScore(20, 0.5, 0.5)).toBeGreaterThan(base)
  })
  it('computes correctly for known values', () => {
    // connections(4) = 6, engagement=0.5, monetization=0.5 → 6*0.5*0.5 = 1.5
    expect(nceScore(4, 0.5, 0.5)).toBe(1.5)
  })
})

describe('logisticGrowth', () => {
  it('approaches 0 at t << t0', () => {
    expect(logisticGrowth(-100, 100, 0.5, 6)).toBeLessThan(1)
  })
  it('equals L/2 at inflection point t0', () => {
    expect(logisticGrowth(6, 100, 0.5, 6)).toBeCloseTo(50, 0)
  })
  it('approaches L for t >> t0', () => {
    expect(logisticGrowth(100, 100, 0.5, 6)).toBeCloseTo(100, 0)
  })
  it('never exceeds carrying capacity L', () => {
    for (const t of [0, 5, 10, 20, 50, 100]) {
      expect(logisticGrowth(t, 85, 0.55, 5)).toBeLessThanOrEqual(85 + 0.01)
    }
  })
  it('is monotonically increasing', () => {
    const values = [1, 2, 4, 6, 8, 10, 12].map(t => logisticGrowth(t, 100, 0.5, 6))
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1])
    }
  })
})

describe('adoptionModel', () => {
  it('returns exactly 12 data points', () => {
    const data = adoptionModel(100, 0.5, 6)
    expect(data).toHaveLength(12)
  })
  it('labels quarters correctly', () => {
    const data = adoptionModel(100, 0.5, 6)
    expect(data[0].quarter).toBe('Y1Q1')
    expect(data[3].quarter).toBe('Y1Q4')
    expect(data[4].quarter).toBe('Y2Q1')
    expect(data[11].quarter).toBe('Y3Q4')
  })
  it('all values are non-negative', () => {
    const data = adoptionModel(85, 0.55, 5)
    for (const d of data) {
      expect(d.users).toBeGreaterThanOrEqual(0)
      expect(d.connections).toBeGreaterThanOrEqual(0)
      expect(d.value).toBeGreaterThanOrEqual(0)
    }
  })
  it('final users do not exceed maxUsers', () => {
    const data = adoptionModel(85, 0.55, 5)
    for (const d of data) {
      expect(d.users).toBeLessThanOrEqual(86) // allow small floating point
    }
  })
  it('is monotonically increasing for standard parameters', () => {
    const data = adoptionModel(100, 0.5, 6)
    for (let i = 1; i < data.length; i++) {
      expect(data[i].users).toBeGreaterThanOrEqual(data[i - 1].users)
    }
  })
})

describe('networkPenetration', () => {
  it('returns 0 when no active nodes', () => {
    expect(networkPenetration(0, 260)).toBe(0)
  })
  it('returns 1 when all are active', () => {
    expect(networkPenetration(100, 100)).toBe(1)
  })
  it('caps at 1 even when active > total', () => {
    expect(networkPenetration(200, 100)).toBe(1)
  })
  it('does not divide by zero', () => {
    expect(networkPenetration(0, 0)).toBe(0)
  })
  it('calculates correct ratio', () => {
    expect(networkPenetration(50, 200)).toBeCloseTo(0.25, 5)
  })
})

describe('flywheelVelocity', () => {
  it('returns 0 for 0 users', () => {
    expect(flywheelVelocity(0, 100, 50)).toBe(0)
  })
  it('is positive for positive inputs', () => {
    expect(flywheelVelocity(100, 50, 30)).toBeGreaterThan(0)
  })
  it('increases with more social actions', () => {
    const low = flywheelVelocity(100, 50, 10)
    const high = flywheelVelocity(100, 50, 100)
    expect(high).toBeGreaterThan(low)
  })
})

describe('formatMillions', () => {
  it('formats thousands correctly', () => {
    expect(formatMillions(0.5)).toBe('500K')
  })
  it('formats millions with one decimal', () => {
    expect(formatMillions(85)).toBe('85.0M')
  })
  it('formats billions for values over 1000M', () => {
    expect(formatMillions(1500)).toBe('1.5B')
  })
})

describe('formatBillions', () => {
  it('formats billions', () => {
    expect(formatBillions(33.8)).toBe('33.8B')
  })
  it('formats trillions for values over 1000B', () => {
    expect(formatBillions(2000)).toBe('2.0T')
  })
})
