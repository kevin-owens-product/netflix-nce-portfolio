import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Line, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts'
import {
  TrendingUp, Network, Zap, Play, Pause,
  ChevronRight, Info, BarChart2, GitBranch, Layers,
  Star, Globe, Gamepad2, ShoppingBag, Video, BookOpen,
} from 'lucide-react'

// Alias to avoid conflict with the Network lucide icon used elsewhere
const TasteIcon = Network
import {
  metcalfeValue, networkConnections, nceScore,
  adoptionModel, formatMillions,
} from '../lib/calculations'
import { Analytics } from '../lib/analytics'
import { featureFlags } from '../lib/featureFlags'

// ─── Exec-facing product metadata ─────────────────────────────────────────────

const PRODUCT_EXEC: Record<number, { priority: number; wave: 1 | 2 | 3; businessCase: string; impact: string; churnDelta?: string }> = {
  0: { priority: 1, wave: 1, businessCase: 'Highest retention ROI, lowest technical risk — build on existing infra', impact: '-18% churn · 3.2× weekly sessions', churnDelta: '-18%' },
  6: { priority: 2, wave: 1, businessCase: 'Uses Netflix\'s existing taste data — no new content investment required', impact: '-28% churn · 2.8× recommendation CTR', churnDelta: '-28%' },
  1: { priority: 3, wave: 2, businessCase: 'Largest revenue ceiling — live events create appointment viewing habit', impact: '108M HH reached · -35% churn vs VOD-only', churnDelta: '-35%' },
  5: { priority: 4, wave: 2, businessCase: 'Captures BookTok moment before it leaves to Goodreads / TikTok', impact: '3× premiere-week engagement · near-zero CAC', churnDelta: '-20%' },
  3: { priority: 5, wave: 3, businessCase: 'Existing IP de-risks content bet — Stranger Things, Squid Game, Wednesday', impact: '2× retention in Netflix Mobile Games users', churnDelta: '-15%' },
  2: { priority: 6, wave: 3, businessCase: 'Captures $300–600M creator revenue currently flowing to YouTube', impact: '+40% catalog engagement · organic acquisition', churnDelta: '-12%' },
  4: { priority: 7, wave: 3, businessCase: 'Commerce flywheel tied to premiere windows only Netflix knows 12mo out', impact: 'Bridgerton S3: $40M+ merch in 6 months', churnDelta: '-8%' },
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number
  name: string
  shortName: string
  description: string
  icon: React.ReactNode
  color: string
  colorDark: string
  maxUsers: number         // millions
  growthRate: number
  inflectionQ: number
  engagementRate: number   // 0–1
  monetization: number     // 0–1
  dimensions: {
    directValue: number    // 0–100 radar score
    networkDensity: number
    contentCreation: number
    socialSignal: number
    retentionLift: number
  }
}

type TabId = 'overview' | 'metcalfe' | 'synergy' | 'flywheel' | 'adoption'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCT_SLUGS: Record<number, string> = {
  0: 'watch-together',
  1: 'netflix-live',
  2: 'creator-studio',
  3: 'game-night',
  4: 'fan-marketplace',
  5: 'book-club',
  6: 'taste-network',
}

const PRODUCTS: Product[] = [
  {
    id: 0,
    name: 'Watch Together',
    shortName: 'Watch',
    description: 'Synchronized co-viewing with real-time reactions, live emoji, and shared timestamps across any device.',
    icon: <Video size={20} />,
    color: '#e50914',
    colorDark: '#b20710',
    maxUsers: 85,
    growthRate: 0.55,
    inflectionQ: 5,
    engagementRate: 0.72,
    monetization: 0.68,
    dimensions: { directValue: 88, networkDensity: 92, contentCreation: 45, socialSignal: 85, retentionLift: 90 },
  },
  {
    id: 1,
    name: 'Netflix Live',
    shortName: 'Live',
    description: 'Live sports, events, and interactive voting — the real-time layer that keeps subscribers locked in.',
    icon: <Zap size={20} />,
    color: '#ff6b35',
    colorDark: '#cc4f1a',
    maxUsers: 110,
    growthRate: 0.48,
    inflectionQ: 6,
    engagementRate: 0.81,
    monetization: 0.85,
    dimensions: { directValue: 95, networkDensity: 78, contentCreation: 30, socialSignal: 92, retentionLift: 88 },
  },
  {
    id: 2,
    name: 'Creator Studio',
    shortName: 'Creator',
    description: 'Fan-made video essays, commentary tracks, and reaction content layered over Netflix originals.',
    icon: <Star size={20} />,
    color: '#f5c518',
    colorDark: '#c09b00',
    maxUsers: 45,
    growthRate: 0.62,
    inflectionQ: 4,
    engagementRate: 0.65,
    monetization: 0.55,
    dimensions: { directValue: 72, networkDensity: 68, contentCreation: 98, socialSignal: 76, retentionLift: 82 },
  },
  {
    id: 3,
    name: 'Game Night',
    shortName: 'Games',
    description: 'Multiplayer mini-games and trivia built on Netflix IP — from Stranger Things to Squid Game.',
    icon: <Gamepad2 size={20} />,
    color: '#00d4aa',
    colorDark: '#00a882',
    maxUsers: 70,
    growthRate: 0.52,
    inflectionQ: 7,
    engagementRate: 0.78,
    monetization: 0.72,
    dimensions: { directValue: 80, networkDensity: 88, contentCreation: 55, socialSignal: 82, retentionLift: 75 },
  },
  {
    id: 4,
    name: 'Fan Marketplace',
    shortName: 'Market',
    description: 'Official merch, collectibles, and IRL experiences tied to Netflix shows — the commerce flywheel.',
    icon: <ShoppingBag size={20} />,
    color: '#a855f7',
    colorDark: '#7c22d4',
    maxUsers: 35,
    growthRate: 0.45,
    inflectionQ: 8,
    engagementRate: 0.52,
    monetization: 0.92,
    dimensions: { directValue: 65, networkDensity: 55, contentCreation: 40, socialSignal: 70, retentionLift: 68 },
  },
  {
    id: 5,
    name: 'Book Club',
    shortName: 'Books',
    description: 'BookTok lives here — reading communities and adaptation discussions tied to Netflix originals.',
    icon: <BookOpen size={20} />,
    color: '#22c55e',
    colorDark: '#15803d',
    maxUsers: 40,
    growthRate: 0.50,
    inflectionQ: 5,
    engagementRate: 0.68,
    monetization: 0.48,
    dimensions: { directValue: 70, networkDensity: 72, contentCreation: 85, socialSignal: 78, retentionLift: 88 },
  },
  {
    id: 6,
    name: 'Taste Network',
    shortName: 'Taste',
    description: 'Your social graph is your recommendation engine — see what taste twins and tastemakers actually watch.',
    icon: <TasteIcon size={20} />,
    color: '#6366f1',
    colorDark: '#4338ca',
    maxUsers: 55,
    growthRate: 0.53,
    inflectionQ: 6,
    engagementRate: 0.74,
    monetization: 0.45,
    dimensions: { directValue: 78, networkDensity: 95, contentCreation: 60, socialSignal: 90, retentionLift: 85 },
  },
]

// 7×7 synergy matrix — cross-product reinforcement scores
const SYNERGY_MATRIX = [
  [1.00, 0.85, 0.72, 0.68, 0.55, 0.62, 0.70],
  [0.85, 1.00, 0.60, 0.78, 0.62, 0.55, 0.65],
  [0.72, 0.60, 1.00, 0.65, 0.80, 0.75, 0.72],
  [0.68, 0.78, 0.65, 1.00, 0.70, 0.50, 0.60],
  [0.55, 0.62, 0.80, 0.70, 1.00, 0.65, 0.58],
  [0.62, 0.55, 0.75, 0.50, 0.65, 1.00, 0.82],
  [0.70, 0.65, 0.72, 0.60, 0.58, 0.82, 1.00],
]

const FLYWHEEL_NODES = [
  { label: 'More Subscribers', angle: 270, icon: '👥' },
  { label: 'Richer Social Graph', angle: 342, icon: '🕸️' },
  { label: 'Higher Engagement', angle: 54, icon: '🔥' },
  { label: 'Better Recommendations', angle: 126, icon: '🎯' },
  { label: 'More Revenue', angle: 198, icon: '💰' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function SliderControl({
  label, value, min, max, step, unit, onChange, color = '#e50914',
}: {
  label: string; value: number; min: number; max: number
  step: number; unit: string; onChange: (v: number) => void; color?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {typeof value === 'number' && value < 2 ? `${(value * 100).toFixed(0)}%` : `${value}${unit}`}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, ${color} ${pct}%, #333 ${pct}%)`,
          }}
          aria-label={label}
        />
      </div>
    </div>
  )
}

function MetricBadge({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="metric-card text-center">
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-red-500 font-semibold mt-0.5">{sub}</div>}
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────

function OverviewTab({ products, onSelectProduct }: {
  products: Product[]
  onSelectProduct: (id: number, tab: TabId) => void
}) {
  const wave1 = products.filter(p => PRODUCT_EXEC[p.id]?.wave === 1).sort((a, b) => PRODUCT_EXEC[a.id].priority - PRODUCT_EXEC[b.id].priority)
  const wave2 = products.filter(p => PRODUCT_EXEC[p.id]?.wave === 2).sort((a, b) => PRODUCT_EXEC[a.id].priority - PRODUCT_EXEC[b.id].priority)
  const wave3 = products.filter(p => PRODUCT_EXEC[p.id]?.wave === 3).sort((a, b) => PRODUCT_EXEC[a.id].priority - PRODUCT_EXEC[b.id].priority)

  return (
    <div className="space-y-8">
      {/* Author brief */}
      <div className="rounded-2xl border border-gray-800 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #141414 60%)' }}>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Avatar + credentials */}
            <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-3 shrink-0">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black text-white"
                style={{ background: 'linear-gradient(135deg, #e50914, #b20710)' }}>KO</div>
              <div className="md:text-center">
                <div className="text-white font-bold text-sm">Kevin Owens</div>
                <div className="text-gray-500 text-xs">CPO × 4</div>
                <a href="https://www.linkedin.com/in/kevinaowens/" target="_blank" rel="noreferrer"
                  className="text-xs text-red-400 hover:text-red-300 transition-colors mt-1 flex items-center gap-1 md:justify-center">
                  LinkedIn ↗
                </a>
              </div>
            </div>
            {/* Thesis */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-red-950/30 border border-red-900/40 rounded-full px-3 py-1 mb-3">
                <Network size={12} className="text-red-500" />
                <span className="text-xs text-red-400 font-semibold tracking-wider uppercase">Strategic Memo · Netflix PM Application</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                Netflix has 260M subscribers.<br />
                <span className="text-red-500">It's treating them as an audience.</span><br />
                <span className="text-gray-400 text-2xl font-bold">It should be treating them as a network.</span>
              </h1>
              <p className="text-gray-400 leading-relaxed mb-4">
                Every platform Netflix competes with — YouTube, TikTok, Spotify — is a network where user connections create compound value. Netflix is a broadcast model running on network infrastructure. These seven concepts close that gap, and the math is unambiguous: when subscriber value scales as N², activating the connections between 260M people doesn't add value — it multiplies it.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="bg-black/40 border border-gray-700 rounded-lg px-3 py-2">
                  <span className="text-gray-500">At GWI I built </span>
                  <span className="text-white font-bold">audience intelligence products</span>
                  <span className="text-gray-500"> used by Netflix, Disney+ & Amazon</span>
                </div>
                <div className="bg-black/40 border border-gray-700 rounded-lg px-3 py-2">
                  <span className="text-gray-500">4× CPO experience · </span>
                  <span className="text-white font-bold">Europe + U.S.</span>
                  <span className="text-gray-500"> product scaling</span>
                </div>
                <div className="bg-black/40 border border-gray-700 rounded-lg px-3 py-2">
                  <span className="text-gray-500">USC · </span>
                  <span className="text-white font-bold">AI-native builder</span>
                  <span className="text-gray-500"> · London-based</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Signal — Netflix Playground launch */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(245,197,24,0.08) 0%, #141414 60%)', borderColor: 'rgba(245,197,24,0.3)' }}>
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: '#f5c518' }} />
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: '#f5c518' }}>Live</span>
              </div>
              <div className="text-xs text-gray-600">Apr 8, 2026</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <div className="text-xs font-black px-2 py-1 rounded-full" style={{ background: 'rgba(245,197,24,0.15)', color: '#f5c518' }}>Market Signal</div>
                <span className="text-xs text-gray-500">Netflix just validated the interactive-engagement thesis</span>
              </div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-2 leading-tight">
                Netflix shipped <a href="https://about.netflix.com/en/news/netflix-expands-kids-entertainment-lineup-with-playground-app-for-games" target="_blank" rel="noreferrer" className="underline decoration-dotted hover:text-yellow-400 transition-colors" style={{ color: '#f5c518' }}>Playground</a> this week — a dedicated games app for kids 8 and under. Global rollout April 28.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                <span className="text-white font-semibold">What this confirms: </span>
                Netflix is actively extending from passive viewing to active engagement. They just did it for kids. The unserved segment is the one Netflix's biggest cultural properties actually target — <span className="text-white">adults who love Stranger Things, Squid Game, Wednesday, and Love Is Blind</span>.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <span className="font-semibold" style={{ color: '#f5c518' }}>Game Night is the adult version of Playground — </span>
                same core insight (IP + interactive engagement = retention), different audience (the 250M+ subscribers over 8). The strategic direction is already blessed by leadership. The question isn't whether Netflix should extend this to adults — it's who leads it.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/concepts/game-night"
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full transition-all hover:brightness-110"
                  style={{ background: 'rgba(245,197,24,0.15)', color: '#f5c518', border: '1px solid rgba(245,197,24,0.3)' }}>
                  See the Game Night concept
                  <ChevronRight size={14} />
                </Link>
                <a href="https://about.netflix.com/en/news/netflix-expands-kids-entertainment-lineup-with-playground-app-for-games" target="_blank" rel="noreferrer"
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  Read Netflix's announcement ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4">
        <MetricBadge label="Netflix Subscribers" value="260M" sub="+8M YoY" />
        <MetricBadge label="Network Connections" value="33.8B" sub="potential" />
        <MetricBadge label="Metcalfe Value Index" value="67,600" sub="N² / 1000" />
        <MetricBadge label="Product Concepts" value="7" sub="analyzed" />
      </div>

      {/* Priority recommendation */}
      <div className="netflix-card p-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={16} className="text-red-500" />
          <h3 className="text-white font-bold">My Build Recommendation</h3>
        </div>
        <p className="text-gray-500 text-sm mb-5">If I were leading product at Netflix, I'd sequence these in three waves — prioritizing proven retention mechanics over new revenue categories.</p>
        <div className="space-y-4">
          {[
            { wave: 1, label: 'Build Now', sub: 'Highest retention ROI · Lowest risk · Existing infrastructure', color: '#e50914', items: wave1 },
            { wave: 2, label: '12–18 Months', sub: 'Strong revenue case · Moderate investment · New capabilities', color: '#ff6b35', items: wave2 },
            { wave: 3, label: '18+ Months', sub: 'Platform expansion · Builds on Wave 1 social graph', color: '#f5c518', items: wave3 },
          ].map(w => (
            <div key={w.wave} className="flex gap-4 items-start">
              <div className="shrink-0 flex flex-col items-center gap-1 w-20">
                <div className="text-xs font-black px-2 py-1 rounded-full text-center"
                  style={{ background: `${w.color}20`, color: w.color }}>Wave {w.wave}</div>
                <div className="text-xs text-gray-600 text-center leading-tight">{w.label}</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-600 mb-2">{w.sub}</div>
                <div className="flex flex-wrap gap-2">
                  {w.items.map(p => {
                    const exec = PRODUCT_EXEC[p.id]
                    return (
                      <Link key={p.id} to={`/concepts/${PRODUCT_SLUGS[p.id]}`}
                        className="flex items-center gap-2 rounded-xl border px-3 py-2 hover:border-gray-600 transition-colors group"
                        style={{ background: `${p.color}08`, borderColor: `${p.color}25` }}>
                        <span style={{ color: p.color }}>{p.icon}</span>
                        <div>
                          <div className="text-white text-xs font-bold">{p.name}</div>
                          <div className="text-xs" style={{ color: p.color }}>{exec.churnDelta} churn</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* First 30 Days */}
      <div className="rounded-2xl border border-gray-800 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1a0a 0%, #141414 60%)' }}>
        <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="text-xs font-black px-2 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Operational Plan</div>
              <span className="text-xs text-gray-600">Not just concepts — a plan</span>
            </div>
            <h3 className="text-white font-bold text-xl">My First 30 Days at Netflix</h3>
            <p className="text-gray-500 text-sm mt-1">If I'm hired tomorrow, here's what I'd actually do in month one.</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600">Commitment by day 30</div>
            <div className="text-sm font-bold" style={{ color: '#22c55e' }}>Wave 1 build decision presented to exec</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          {[
            {
              week: 'Week 1',
              theme: 'Listen & Learn',
              color: '#60a5fa',
              bullets: [
                'Meet the full product org — Elizabeth Stone, Eunice Kim, content leadership, member experience leads',
                'Pull the 18-month data on every social-adjacent feature Netflix has shipped: profiles, friend suggestions, shared lists, Mobile Games',
                'Interview 20+ subscribers about how they currently co-watch — Teleparty users, Discord watch-party hosts, group-chat coordinators',
                "Understand the internal politics: who's championed social at Netflix before, who's blocked it, and why",
              ],
            },
            {
              week: 'Week 2',
              theme: 'Diagnose',
              color: '#6366f1',
              bullets: [
                'Post-mortem the 2014–2016 Netflix Socialite experiment: what killed it, and what changed since',
                'Analyze Netflix Mobile Games adoption data — what did it prove about social product demand inside the Netflix app?',
                'Map the existing tech stack — what Watch Together infra can be built on current CDN/sync systems, what needs new build',
                "Identify the '10-person team' that could ship Wave 1 — who already exists internally, who I'd need to hire",
              ],
            },
            {
              week: 'Week 3',
              theme: 'Prototype & Test',
              color: '#a855f7',
              bullets: [
                "Ship one 0.1% experiment: \"3 friends just finished this\" social proof badge on the homepage shelf. Measure 7-day engagement lift.",
                'Draft a 1-page Watch Together MVP spec — the smallest possible shippable version that proves co-viewing retention lift',
                'Circulate the MVP for technical feasibility review with the infra team',
                "Identify the 'kill criteria' — what data would I need to see in the first 90 days to know the thesis was wrong?",
              ],
            },
            {
              week: 'Week 4',
              theme: 'Commit',
              color: '#22c55e',
              bullets: [
                'Present Wave 1 build recommendation to leadership: Watch Together + Taste Network social overlay',
                'Propose budget, team structure, and 6-month milestone plan — including the first public-facing launch window',
                "Decision point: ship Wave 1 MVP in Q2 or delay for broader Wave 1 that includes Book Club integration?",
                "By day 30: the org knows the plan, has signed off on the budget, and the first engineer is writing code",
              ],
            },
          ].map((phase, i) => (
            <div key={i} className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: `${phase.color}20`, color: phase.color }}>{phase.week}</div>
              </div>
              <div className="text-white font-bold text-sm mb-3">{phase.theme}</div>
              <ul className="space-y-2">
                {phase.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                    <ChevronRight size={11} className="mt-0.5 shrink-0" style={{ color: phase.color }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-800" style={{ background: 'rgba(34,197,94,0.04)' }}>
          <div className="text-xs text-gray-500">
            <span className="text-gray-300 font-semibold">The principle: </span>
            most new PMs spend month one shadowing and writing up observations. I'd spend it running one experiment, writing one spec, and presenting one decision. That's what CPO-level operators do — and it's how I've onboarded at my last four roles.
          </div>
        </div>
      </div>

      {/* Contrarian Take */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a00 0%, #141414 70%)', borderColor: 'rgba(245,197,24,0.25)' }}>
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)' }}>
              <Zap size={20} style={{ color: '#f5c518' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs font-black px-2 py-1 rounded-full" style={{ background: 'rgba(245,197,24,0.15)', color: '#f5c518' }}>The Contrarian Take</div>
                <span className="text-xs text-gray-600">One thing I'd change about this plan that most PMs would never say</span>
              </div>
              <blockquote className="text-xl md:text-2xl font-bold text-white leading-snug mb-4" style={{ borderLeft: '3px solid #f5c518', paddingLeft: 16 }}>
                "Netflix shouldn't chase sports rights for Netflix Live. Pivot Live to IP-owned reality events — Love Is Blind Live, Bake Off Live, Squid Game: The Challenge Live."
              </blockquote>
              <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <p>
                  <span className="text-white font-semibold">The math makes this obvious: </span>
                  ESPN pays $2.7B per year for Monday Night Football. Netflix's Jake Paul vs. Mike Tyson fight cost ~$40M all-in and reached 108M households in a single evening — that's <span className="text-white font-semibold">1/70th the cost per household</span> of premium sports rights.
                </p>
                <p>
                  <span className="text-white font-semibold">Reality TV events use IP Netflix already owns, existing production infrastructure, and drive the same appointment-viewing behavior as sports</span> — without bidding against Apple, Amazon, and Disney for rights that cost more every year.
                </p>
                <p>
                  Most PMs won't say this because "Netflix needs sports" is the consensus take. The consensus is wrong. The highest-ROI version of Netflix Live is the one that treats Netflix's own IP library as the sport.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-800">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: 'linear-gradient(135deg, #e50914, #b20710)' }}>KO</div>
                <div>
                  <div className="text-white text-sm font-bold">Kevin Owens</div>
                  <div className="text-gray-600 text-xs">CPO × 4 · I'll defend this in the interview</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product cards */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">All Seven Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products
            .slice()
            .sort((a, b) => PRODUCT_EXEC[a.id].priority - PRODUCT_EXEC[b.id].priority)
            .map((p, i) => {
            const exec = PRODUCT_EXEC[p.id]
            return (
              <div
                key={p.id}
                className="netflix-card p-5 cursor-pointer group"
                onClick={() => onSelectProduct(p.id, 'metcalfe')}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-lg" style={{ background: `${p.color}20`, color: p.color }}>{p.icon}</div>
                    <div className="text-xs font-black px-2 py-1 rounded-full" style={{ background: `${p.color}15`, color: p.color }}>
                      #{exec.priority} Priority
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold">
                    Wave {exec.wave}
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{p.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{p.description}</p>
                {/* Business case */}
                <div className="bg-black/30 rounded-lg p-2.5 mb-3 border border-gray-800">
                  <div className="text-gray-600 text-xs mb-1">Business case</div>
                  <div className="text-gray-300 text-xs leading-snug">{exec.businessCase}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-black/30 rounded p-2">
                    <div className="text-gray-500">Peak Reach</div>
                    <div className="text-white font-bold">{p.maxUsers}M users</div>
                  </div>
                  <div className="bg-black/30 rounded p-2">
                    <div className="text-gray-500">Impact</div>
                    <div className="font-bold" style={{ color: p.color }}>{exec.churnDelta} churn</div>
                  </div>
                </div>
                <Link
                  to={`/concepts/${PRODUCT_SLUGS[p.id]}`}
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                  style={{ color: p.color }}
                >
                  Full concept brief <ChevronRight size={14} />
                </Link>
              </div>
            )
          })}

          {/* Combined value card */}
          <div className="netflix-card p-5 border-red-900/40" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #1f0505 100%)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={20} className="text-red-500" />
              <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Combined Portfolio</span>
            </div>
            <div className="text-4xl font-black text-white mb-1">
              {formatMillions(products.reduce((s, p) => s + p.maxUsers, 0))}
            </div>
            <div className="text-gray-500 text-sm mb-4">total addressable users</div>
            <div className="space-y-2">
              {products
                .slice()
                .sort((a, b) => PRODUCT_EXEC[a.id].priority - PRODUCT_EXEC[b.id].priority)
                .map(p => (
                <div key={p.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <div className="text-xs text-gray-400 flex-1">{p.shortName}</div>
                  <div className="h-1.5 rounded-full flex-1 bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${(p.maxUsers / 110) * 100}%`, background: p.color }} />
                  </div>
                  <div className="text-xs text-white font-bold w-10 text-right">{p.maxUsers}M</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Let's talk — prominent contact CTA */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #0d0d0d 60%, #1a0000 100%)', borderColor: 'rgba(229,9,20,0.3)' }}>
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-red-950/30 border border-red-900/40 rounded-full px-3 py-1 mb-4">
                <span className="text-xs font-black text-red-400 tracking-wider uppercase">Let's Talk</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                If any of this landed,<br />
                <span className="text-red-500">the next move is a 15-minute call.</span>
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-2xl">
                I built this portfolio because I want to work on Netflix's product. If you're reading this and you think one of these concepts — or the contrarian take — is worth a conversation, I'll make it easy. Pick a time below. I'll have specific thoughts on whichever concept you want to dig into.
              </p>
              <div className="flex flex-wrap gap-2 mt-5 text-xs">
                <div className="px-3 py-1.5 rounded-full border border-gray-700 text-gray-400">
                  🇬🇧 London-based, open to US relocation
                </div>
                <div className="px-3 py-1.5 rounded-full border border-gray-700 text-gray-400">
                  Available to start immediately
                </div>
                <div className="px-3 py-1.5 rounded-full border border-gray-700 text-gray-400">
                  Director / VP / SVP Product Management
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 min-w-[260px]">
              <a href="https://calendar.app.google/rU8y8ENVzi6RQaoN6" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base transition-all hover:brightness-110"
                style={{ background: '#e50914', color: '#fff' }}>
                📅 Book a 15-min call
                <ChevronRight size={18} />
              </a>
              <a href="https://www.linkedin.com/in/kevinaowens/" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#ddd', border: '1px solid rgba(255,255,255,0.12)' }}>
                Connect on LinkedIn ↗
              </a>
              <div className="text-xs text-gray-600 text-center mt-1">
                Or DM me on LinkedIn — I respond within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metcalfe formula explainer */}
      <div className="netflix-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-red-500" />
          <h3 className="text-white font-bold">Why Metcalfe's Law Matters for Netflix</h3>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { law: 'Sarnoff\'s Law', formula: 'V = N', desc: 'Broadcast value', example: 'Linear TV', color: '#808080' },
            { law: 'Metcalfe\'s Law', formula: 'V = N²', desc: 'Network value', example: 'Netflix social', color: '#e50914' },
            { law: 'Reed\'s Law', formula: 'V = 2ᴺ', desc: 'Group value', example: 'Fan communities', color: '#a855f7' },
          ].map(item => (
            <div key={item.law} className="bg-black/30 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">{item.law}</div>
              <div className="text-2xl font-black mb-2" style={{ color: item.color }}>{item.formula}</div>
              <div className="text-sm text-white mb-1">{item.desc}</div>
              <div className="text-xs text-gray-500 italic">{item.example}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-4 text-center">
          Netflix's 260M subscribers represent <span className="text-white font-semibold">33.8 billion</span> possible
          connections — a network asset that compounds with every social product added.
        </p>
      </div>
    </div>
  )
}

// ─── Tab: Metcalfe Analysis ───────────────────────────────────────────────────

function MetcalfeTab({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [users, setUsers] = useState(products[0].maxUsers)
  const [engagement, setEngagement] = useState(products[0].engagementRate)
  const [monetization, setMonetization] = useState(products[0].monetization)
  const [showReedLaw, setShowReedLaw] = useState(featureFlags.isEnabled('show_reed_law_overlay'))

  const product = products[selectedProduct]

  useEffect(() => {
    setUsers(product.maxUsers)
    setEngagement(product.engagementRate)
    setMonetization(product.monetization)
  }, [product])

  const chartData = Array.from({ length: 51 }, (_, i) => {
    const n = (i / 50) * users
    return {
      n: Math.round(n),
      metcalfe: Math.round(metcalfeValue(n)),
      connections: Math.round(networkConnections(n)),
      sarnoff: Math.round(n),
      reed: n < 30 ? Math.round(Math.pow(2, n / 10)) : null,
    }
  })

  const currentScore = nceScore(users, engagement, monetization)
  const connections = networkConnections(users)

  // Per-product analyst notes shown as callouts
  const METCALFE_INSIGHTS: Record<number, string> = {
    0: 'Watch Together has the steepest connection-density curve of any concept — each new user creates disproportionately more social value because co-viewing sessions create multi-directional connections simultaneously.',
    1: 'Netflix Live scores highest on monetization factor (0.85) because live events command premium ad rates and drive subscription upgrades at 3–5× the rate of VOD content.',
    2: 'Creator Studio has a unique NCE profile: low direct monetization but extremely high content-creation dimension (98) — meaning its value compounds through catalog longevity, not immediate revenue.',
    3: 'Game Night shows the strongest network-density score (88) after Watch Together — multiplayer sessions create dense, tight-knit connection clusters that are the hardest to churn out of.',
    4: 'Fan Marketplace has the highest monetization factor (0.92) but the lowest network density — it\'s a high-margin, low-virality product. Best built after the social graph exists to drive discovery.',
    5: 'Book Club shows unusually high retention-lift (88) relative to its monetization score — a signal that retention value significantly exceeds direct revenue value. Build for churn reduction, not revenue.',
    6: 'Taste Network has the highest network-density score (95) in the entire portfolio — its value is almost entirely network-derived, meaning it needs scale to work but compounds aggressively once it gets there.',
  }

  return (
    <div className="space-y-6">
      {/* Exec insight header */}
      <div className="rounded-2xl border border-gray-800 p-5" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #141414 70%)' }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-red-500" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">What This Analysis Shows</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          The chart below shows why the first 10M users of a social product barely move the needle — but the next 90M create exponential value. Netflix is already at 260M subscribers. Every social product it ships starts at a point on the curve that most platforms never reach.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'Highest monetization', name: 'Netflix Live', value: '0.85×', color: '#ff6b35', note: 'Live events command premium ad rates' },
            { label: 'Highest network density', name: 'Taste Network', value: '95/100', color: '#6366f1', note: 'Most network-derived value in portfolio' },
            { label: 'Fastest connection curve', name: 'Watch Together', value: '92/100', color: '#e50914', note: 'Co-viewing creates multi-directional links' },
          ].map(item => (
            <div key={item.name} className="bg-black/30 rounded-xl p-3 border border-gray-800">
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className="font-bold text-sm mb-0.5" style={{ color: item.color }}>{item.name} — {item.value}</div>
              <div className="text-xs text-gray-600">{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Product selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {products.map(p => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedProduct(p.id)
              Analytics.productSelected(p.name)
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
            style={selectedProduct === p.id
              ? { background: p.color, color: '#fff' }
              : { background: '#1f1f1f', color: '#808080', border: '1px solid #333' }
            }
          >
            {p.icon}{p.name}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricBadge label="Users" value={`${users}M`} sub={`of 260M subs`} />
        <MetricBadge label="Connections" value={`${(connections / 1000).toFixed(1)}B`} sub="N(N-1)/2" />
        <MetricBadge label="Metcalfe Value" value={`${(metcalfeValue(users) / 1000).toFixed(0)}K`} sub="N² index" />
        <MetricBadge label="NCE Score" value={`${(currentScore / 1000).toFixed(1)}K`} sub="weighted" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 netflix-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Network Value Scaling (N = {users}M users)</h3>
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showReedLaw}
                onChange={e => {
                  setShowReedLaw(e.target.checked)
                  Analytics.chartInteraction('metcalfe', 'toggle_reed')
                }}
                className="accent-red-500"
              />
              Reed's Law
            </label>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="metcalfeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={product.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={product.color} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="connGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="n" stroke="#555" tick={{ fill: '#666', fontSize: 11 }} tickFormatter={v => `${v}M`} />
              <YAxis stroke="#555" tick={{ fill: '#666', fontSize: 11 }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: `1px solid ${product.color}40`, borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#fff' }}
                labelFormatter={v => `N = ${v}M users`}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#888' }} />
              <Area type="monotone" dataKey="metcalfe" name="Metcalfe N²" stroke={product.color} fill="url(#metcalfeGrad)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="connections" name="Connections N(N-1)/2" stroke="#60a5fa" fill="url(#connGrad)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sarnoff" name="Sarnoff N" stroke="#666" strokeWidth={1} strokeDasharray="4 4" dot={false} />
              {showReedLaw && (
                <Line type="monotone" dataKey="reed" name="Reed 2^N" stroke="#a855f7" strokeWidth={2} dot={false} />
              )}
              <ReferenceLine x={users} stroke={product.color} strokeDasharray="3 3" label={{ value: 'Current', fill: product.color, fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Controls */}
        <div className="netflix-card p-5 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded" style={{ background: `${product.color}20`, color: product.color }}>
              {product.icon}
            </div>
            <h3 className="text-white font-bold text-sm">{product.name}</h3>
          </div>
          <SliderControl
            label="Active Users"
            value={users}
            min={1}
            max={260}
            step={1}
            unit="M"
            color={product.color}
            onChange={v => { setUsers(v); Analytics.sliderChanged(product.name, 'users', v) }}
          />
          <SliderControl
            label="Engagement Rate"
            value={engagement}
            min={0.1}
            max={1}
            step={0.01}
            unit=""
            color={product.color}
            onChange={v => { setEngagement(v); Analytics.sliderChanged(product.name, 'engagement', v) }}
          />
          <SliderControl
            label="Monetization Factor"
            value={monetization}
            min={0.1}
            max={1}
            step={0.01}
            unit=""
            color={product.color}
            onChange={v => { setMonetization(v); Analytics.sliderChanged(product.name, 'monetization', v) }}
          />

          {/* Insight */}
          <div className="rounded-lg p-3 mt-2" style={{ background: `${product.color}08`, border: `1px solid ${product.color}20` }}>
            <div className="text-xs font-bold mb-1" style={{ color: product.color }}>Analyst Note</div>
            <p className="text-xs text-gray-400 leading-relaxed">{METCALFE_INSIGHTS[product.id]}</p>
          </div>

          {/* Radar chart */}
          <div>
            <p className="text-xs text-gray-500 mb-2 text-center">NCE Dimensions</p>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={Object.entries(product.dimensions).map(([k, v]) => ({
                subject: k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
                value: v,
              }))}>
                <PolarGrid stroke="#2a2a2a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 9 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                <Radar name={product.name} dataKey="value" stroke={product.color} fill={product.color} fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Tab: Synergy Matrix ──────────────────────────────────────────────────────

function SynergyTab({ products }: { products: Product[] }) {
  const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null)
  const showLabels = featureFlags.isEnabled('synergy_matrix_labels')

  const getColor = (score: number, isSelf: boolean) => {
    if (isSelf) return 'rgba(229,9,20,0.8)'
    if (score >= 0.8) return 'rgba(229,9,20,0.5)'
    if (score >= 0.65) return 'rgba(255,107,53,0.4)'
    if (score >= 0.5) return 'rgba(245,197,24,0.3)'
    return 'rgba(100,100,100,0.2)'
  }

  const isHighlighted = (r: number, c: number) => {
    if (!hoveredCell) return false
    return hoveredCell[0] === r || hoveredCell[1] === c || (hoveredCell[0] === r && hoveredCell[1] === c)
  }

  return (
    <div className="space-y-6">
      {/* Exec insight header */}
      <div className="rounded-2xl border border-gray-800 p-5" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #141414 70%)' }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-red-500" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">What This Analysis Shows</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          These products don't just add value independently — they multiply each other's value. The synergy matrix quantifies how much each concept reinforces the others. The strategic implication: the <strong className="text-white">sequence of builds matters as much as the builds themselves</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'The social retention triangle', pairs: 'Watch Together × Live × Taste Network', score: '0.85 / 0.70 / 0.65', color: '#e50914', note: 'Build all three and churn impact compounds — not adds' },
            { label: 'Highest single-pair synergy', pairs: 'Book Club × Taste Network', score: '0.82', color: '#22c55e', note: 'Readers with taste-twins have near-zero churn' },
            { label: 'Commerce needs the graph first', pairs: 'Marketplace × Creator Studio', score: '0.80', color: '#a855f7', note: 'Fan commerce only works after social graph exists' },
          ].map(item => (
            <div key={item.label} className="bg-black/30 rounded-xl p-3 border border-gray-800">
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className="font-bold text-sm mb-1" style={{ color: item.color }}>{item.pairs}</div>
              <div className="text-xs text-gray-500 mb-0.5">Score: <span className="text-white font-bold">{item.score}</span></div>
              <div className="text-xs text-gray-600">{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="netflix-card p-6">
        <h3 className="text-white font-bold mb-1">Cross-Product Synergy Matrix</h3>
        <p className="text-gray-500 text-sm mb-6">
          How much each product amplifies the others — hover to highlight. Higher scores mean stronger network reinforcement.
        </p>

        {/* Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-28" />
                {products.map(p => (
                  <th key={p.id} className="pb-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-1.5 rounded" style={{ background: `${p.color}20`, color: p.color }}>
                        {p.icon}
                      </div>
                      <span className="text-xs text-gray-400 font-normal">{p.shortName}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((rowP, r) => (
                <tr key={rowP.id}>
                  <td className="pr-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded" style={{ background: `${rowP.color}20`, color: rowP.color }}>
                        {rowP.icon}
                      </div>
                      <span className="text-xs text-gray-400">{rowP.shortName}</span>
                    </div>
                  </td>
                  {products.map((colP, c) => {
                    const score = SYNERGY_MATRIX[r][c]
                    const isSelf = r === c
                    const highlighted = isHighlighted(r, c)
                    return (
                      <td
                        key={colP.id}
                        className="p-1 text-center"
                        onMouseEnter={() => { setHoveredCell([r, c]); Analytics.synergyHovered(rowP.name, colP.name, score) }}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div
                          className="synergy-cell rounded-lg p-3 mx-0.5 transition-all"
                          style={{
                            background: getColor(score, isSelf),
                            opacity: hoveredCell && !highlighted ? 0.4 : 1,
                            transform: highlighted && !isSelf ? 'scale(1.08)' : 'scale(1)',
                            border: isSelf ? '1px solid rgba(229,9,20,0.4)' : '1px solid transparent',
                          }}
                        >
                          {isSelf ? (
                            <span className="text-red-400 font-black text-sm">★</span>
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {showLabels ? score.toFixed(2) : ''}
                            </span>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 justify-end flex-wrap">
          {[
            { label: '≥ 0.80 Strong', color: 'rgba(229,9,20,0.5)' },
            { label: '≥ 0.65 Moderate', color: 'rgba(255,107,53,0.4)' },
            { label: '≥ 0.50 Weak', color: 'rgba(245,197,24,0.3)' },
            { label: '< 0.50 Minimal', color: 'rgba(100,100,100,0.2)' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-4 h-4 rounded" style={{ background: l.color, border: '1px solid rgba(255,255,255,0.1)' }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Top synergies */}
      <div className="netflix-card p-6">
        <h3 className="text-white font-bold mb-4">Highest Synergy Pairs</h3>
        <div className="space-y-3">
          {[
            { a: 0, b: 1, score: 0.85, insight: 'Watch Together + Live events create must-watch moments that drive simultaneous viewership spikes' },
            { a: 0, b: 2, score: 0.72, insight: 'Co-viewing sessions naturally surface fan commentary, creating a content creation loop' },
            { a: 1, b: 3, score: 0.78, insight: 'Live events + Games unlock interactive second-screen experiences during sports broadcasts' },
            { a: 2, b: 4, score: 0.80, insight: 'Creator content drives merchandise discovery — fans who make content, buy content' },
          ].map((pair, i) => (
            <div key={i} className="flex items-start gap-4 bg-black/30 rounded-lg p-3">
              <div className="flex items-center gap-2 shrink-0">
                <div className="p-1 rounded" style={{ background: `${products[pair.a].color}20`, color: products[pair.a].color }}>
                  {products[pair.a].icon}
                </div>
                <span className="text-gray-600">×</span>
                <div className="p-1 rounded" style={{ background: `${products[pair.b].color}20`, color: products[pair.b].color }}>
                  {products[pair.b].icon}
                </div>
                <span className="font-black text-white text-sm">{pair.score.toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-sm">{pair.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Tab: Flywheel ────────────────────────────────────────────────────────────

function FlywheelTab() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const showFlywheel = featureFlags.isEnabled('show_flywheel_animation')

  const FLYWHEEL_INSIGHTS = [
    'Each new subscriber multiplies the social graph — 1M new users adds ~130B new potential connections',
    'A denser social graph surfaces personalized social recommendations, boosting discoverability by 3–5×',
    'Higher engagement drives algorithmic promotion and more shared moments, retaining subscribers longer',
    'Better recommendations reduce churn (Netflix\'s key retention metric) while reducing content waste',
    'Revenue compounds: longer retention → more budget for originals → more watch moments → more subscribers',
  ]

  const radius = 130
  const centerX = 160
  const centerY = 160

  return (
    <div className="space-y-6">
      {/* Exec insight header */}
      <div className="rounded-2xl border border-gray-800 p-5" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #141414 70%)' }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-red-500" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">What This Analysis Shows</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Netflix already has one flywheel: more subscribers → better algorithm → more subscribers. It spins because content investment drives the loop.
          These seven concepts add a <strong className="text-white">second flywheel</strong> — a social loop that runs in parallel and <em className="text-gray-400">accelerates the first one</em>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              label: "Netflix's existing flywheel",
              loop: 'Content investment → Subscribers → Algorithm → Content signal → Content investment',
              color: '#666',
              note: 'Spins on content budget. Slows when content quality drops.',
            },
            {
              label: 'The social flywheel these concepts add',
              loop: 'Social products → Richer taste graph → Better social proof → Lower churn → More subscribers → Richer taste graph',
              color: '#e50914',
              note: 'Spins on subscriber behavior. Accelerates automatically as network grows.',
            },
          ].map(item => (
            <div key={item.label} className="bg-black/30 rounded-xl p-4 border border-gray-800">
              <div className="text-xs font-bold mb-2" style={{ color: item.color }}>{item.label}</div>
              <div className="text-xs text-gray-400 leading-relaxed mb-2 italic">"{item.loop}"</div>
              <div className="text-xs text-gray-600">{item.note}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-3 rounded-xl border" style={{ background: 'rgba(229,9,20,0.06)', borderColor: 'rgba(229,9,20,0.2)' }}>
          <span className="text-xs text-gray-400">The key insight: </span>
          <span className="text-sm text-white font-semibold">once the social flywheel reaches ~50M active social users, it begins accelerating the content flywheel — better social data improves recommendations, which improves content acquisition decisions, which creates more watch moments.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flywheel visualization */}
        <div className="netflix-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">NCE Flywheel</h3>
            <div className="flex items-center gap-2">
              <SliderControl
                label=""
                value={speed}
                min={0.25}
                max={3}
                step={0.25}
                unit="×"
                color="#e50914"
                onChange={setSpeed}
              />
              <button
                onClick={() => { setIsPlaying(!isPlaying); Analytics.flywheelToggled(!isPlaying) }}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: isPlaying ? '#e50914' : '#333', color: 'white' }}
                data-testid="flywheel-toggle"
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          {showFlywheel && (
            <div className="relative flex items-center justify-center" style={{ height: 340 }}>
              <svg width={320} height={320} viewBox="0 0 320 320">
                {/* Outer ring */}
                <circle cx={centerX} cy={centerY} r={radius + 20}
                  fill="none" stroke="rgba(229,9,20,0.1)" strokeWidth={1}
                  style={{ transformOrigin: `${centerX}px ${centerY}px`, animation: isPlaying ? `spin-slow ${10 / speed}s linear infinite` : 'none' }}
                />
                {/* Main rotating ring */}
                <circle cx={centerX} cy={centerY} r={radius}
                  fill="none" stroke="rgba(229,9,20,0.2)" strokeWidth={2} strokeDasharray="8 4"
                  style={{ transformOrigin: `${centerX}px ${centerY}px`, animation: isPlaying ? `spin-slow ${8 / speed}s linear infinite` : 'none' }}
                />
                {/* Inner ring */}
                <circle cx={centerX} cy={centerY} r={radius - 40}
                  fill="none" stroke="rgba(255,107,53,0.15)" strokeWidth={1} strokeDasharray="4 8"
                  style={{ transformOrigin: `${centerX}px ${centerY}px`, animation: isPlaying ? `spin-reverse ${12 / speed}s linear infinite` : 'none' }}
                />

                {/* Connection arrows */}
                {FLYWHEEL_NODES.map((node, i) => {
                  const next = FLYWHEEL_NODES[(i + 1) % FLYWHEEL_NODES.length]
                  const a1 = (node.angle * Math.PI) / 180
                  const a2 = (next.angle * Math.PI) / 180
                  const x1 = centerX + (radius - 10) * Math.cos(a1)
                  const y1 = centerY + (radius - 10) * Math.sin(a1)
                  const x2 = centerX + (radius - 10) * Math.cos(a2)
                  const y2 = centerY + (radius - 10) * Math.sin(a2)
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="rgba(229,9,20,0.3)" strokeWidth={1.5} strokeDasharray="3 3"
                    />
                  )
                })}

                {/* Nodes */}
                {FLYWHEEL_NODES.map((node, i) => {
                  const angle = (node.angle * Math.PI) / 180
                  const x = centerX + radius * Math.cos(angle)
                  const y = centerY + radius * Math.sin(angle)
                  const isActive = activeNode === i
                  return (
                    <g key={i} style={{ cursor: 'pointer' }}
                      onClick={() => setActiveNode(activeNode === i ? null : i)}>
                      <circle cx={x} cy={y} r={isActive ? 28 : 24}
                        fill={isActive ? 'rgba(229,9,20,0.9)' : 'rgba(30,30,30,0.95)'}
                        stroke={isActive ? '#ff4444' : 'rgba(229,9,20,0.4)'}
                        strokeWidth={isActive ? 2 : 1}
                        style={{ transition: 'all 0.3s ease', filter: isActive ? 'drop-shadow(0 0 8px rgba(229,9,20,0.8))' : 'none' }}
                      />
                      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
                        fontSize={14} fill="white">{node.icon}</text>
                    </g>
                  )
                })}

                {/* Center logo */}
                <circle cx={centerX} cy={centerY} r={32}
                  fill="rgba(229,9,20,0.1)" stroke="rgba(229,9,20,0.4)" strokeWidth={2}
                  style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
                />
                <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle"
                  fontSize={22} fontWeight="black" fill="#e50914">N</text>
                <text x={centerX} y={centerY + 14} textAnchor="middle" dominantBaseline="middle"
                  fontSize={9} fill="#808080">NETWORK</text>
              </svg>

              {/* Node labels */}
              {FLYWHEEL_NODES.map((node, i) => {
                const angle = (node.angle * Math.PI) / 180
                const labelRadius = radius + 44
                const x = centerX + labelRadius * Math.cos(angle)
                const y = centerY + labelRadius * Math.sin(angle)
                return (
                  <div
                    key={i}
                    className="absolute text-center pointer-events-none"
                    style={{
                      left: x + 160 - 50,
                      top: y + 160 - 20,
                      width: 100,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className={`text-xs font-semibold transition-colors ${activeNode === i ? 'text-red-400' : 'text-gray-500'}`}
                      style={{ fontSize: 10 }}>
                      {node.label}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Flywheel insights */}
        <div className="netflix-card p-6">
          <h3 className="text-white font-bold mb-4">How the Flywheel Compounds</h3>
          <div className="space-y-4">
            {FLYWHEEL_NODES.map((node, i) => (
              <div
                key={i}
                className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  activeNode === i ? 'bg-red-950/40 border border-red-900/40' : 'bg-black/30 border border-transparent'
                }`}
                onClick={() => setActiveNode(activeNode === i ? null : i)}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm"
                  style={{
                    background: activeNode === i ? 'rgba(229,9,20,0.8)' : 'rgba(229,9,20,0.15)',
                    border: '1px solid rgba(229,9,20,0.3)',
                  }}
                >
                  {node.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">{node.label}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{FLYWHEEL_INSIGHTS[i]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Speed metrics */}
      <div className="netflix-card p-6">
        <h3 className="text-white font-bold mb-4">Flywheel Velocity Benchmarks</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { stage: 'Early Traction', users: '10M', velocity: '2.3', connections: '45B', label: 'Catching' },
            { stage: 'Growth Phase', users: '100M', velocity: '8.7', connections: '4.95T', label: 'Accelerating' },
            { stage: 'Network Dominance', users: '260M', velocity: '24.1', connections: '33.8T', label: 'Dominant' },
          ].map((b, i) => (
            <div key={i} className="bg-black/40 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-500 mb-2">{b.stage}</div>
              <div className="text-2xl font-black text-white">{b.velocity}×</div>
              <div className="text-xs text-red-500 font-semibold">velocity index</div>
              <div className="mt-2 text-xs text-gray-500">{b.users} users · {b.connections} connections</div>
              <div className="mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  i === 0 ? 'bg-yellow-900/40 text-yellow-500' :
                  i === 1 ? 'bg-orange-900/40 text-orange-500' : 'bg-red-900/40 text-red-500'
                }`}>{b.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Tab: 3-Year Adoption Model ───────────────────────────────────────────────

function AdoptionTab({ products }: { products: Product[] }) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([0, 1, 2])
  const [view, setView] = useState<'users' | 'connections' | 'value'>('users')

  const allData = products.map(p =>
    adoptionModel(p.maxUsers, p.growthRate, p.inflectionQ)
  )

  const quarters = allData[0].map(d => d.quarter)

  const chartData = quarters.map((q, qi) => {
    const point: Record<string, unknown> = { quarter: q }
    selectedProducts.forEach(pid => {
      point[products[pid].shortName] = allData[pid][qi][view]
    })
    return point
  })

  const toggleProduct = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const viewLabels = {
    users: { label: 'Users (M)', formatter: (v: number) => `${v.toFixed(1)}M` },
    connections: { label: 'Connections (B)', formatter: (v: number) => `${v.toFixed(0)}B` },
    value: { label: 'Value Index (N²)', formatter: (v: number) => `${v.toLocaleString()}` },
  }

  return (
    <div className="space-y-6">
      {/* Exec insight header */}
      <div className="rounded-2xl border border-gray-800 p-5" style={{ background: 'linear-gradient(135deg, #1a0000 0%, #141414 70%)' }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-red-500" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">What This Analysis Shows</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          The logistic growth model below shows adoption curves for all seven concepts over 12 quarters (3 years). The most important number isn't the peak — it's the <strong className="text-white">inflection quarter</strong>, when growth is fastest. The sequence of builds matters because <strong className="text-white">Wave 1 products need to hit inflection before Wave 2 launches</strong> — the social graph they build is the infrastructure Wave 2 runs on.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              label: 'Wave 1 inflection point',
              detail: 'Watch Together hits Q5, Taste Network hits Q6',
              implication: 'By the time Netflix Live launches (Wave 2), 40–60M subscribers are already on the social graph',
              color: '#e50914',
            },
            {
              label: 'The sequencing argument',
              detail: 'Wave 2 products launch into an existing network, not a cold start',
              implication: 'Netflix Live\'s social features (shared predictions, live chat) only work if the social graph already exists',
              color: '#ff6b35',
            },
            {
              label: '3-year portfolio projection',
              detail: 'Combined TAU: 440M (overlapping) — 260M distinct subscriber ceiling',
              implication: 'Full portfolio saturation = 100% of subscriber base touched by at least one social product',
              color: '#f5c518',
            },
          ].map(item => (
            <div key={item.label} className="bg-black/30 rounded-xl p-3 border border-gray-800">
              <div className="text-xs font-bold mb-1" style={{ color: item.color }}>{item.label}</div>
              <div className="text-xs text-white mb-1">{item.detail}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{item.implication}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => toggleProduct(p.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={selectedProducts.includes(p.id)
                ? { background: p.color, color: '#fff' }
                : { background: '#1f1f1f', color: '#666', border: '1px solid #333' }
              }
            >
              {p.icon} {p.shortName}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(['users', 'connections', 'value'] as const).map(v => (
            <button
              key={v}
              onClick={() => { setView(v); Analytics.chartInteraction('adoption', `view_${v}`) }}
              className="px-3 py-1.5 rounded text-xs font-semibold transition-all"
              style={view === v
                ? { background: '#e50914', color: '#fff' }
                : { background: '#1f1f1f', color: '#666' }
              }
            >
              {viewLabels[v].label}
            </button>
          ))}
        </div>
      </div>

      {/* Main chart */}
      <div className="netflix-card p-6">
        <h3 className="text-white font-bold mb-1">3-Year S-Curve Adoption Model (12 Quarters)</h3>
        <p className="text-gray-500 text-sm mb-4">
          Logistic growth model — {viewLabels[view].label} projected per product
        </p>
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              {selectedProducts.map(pid => (
                <linearGradient key={pid} id={`grad${pid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={products[pid].color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={products[pid].color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="quarter" stroke="#555" tick={{ fill: '#666', fontSize: 11 }} />
            <YAxis stroke="#555" tick={{ fill: '#666', fontSize: 11 }}
              tickFormatter={v => viewLabels[view].formatter(v)} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              formatter={(v, name) => [viewLabels[view].formatter(Number(v)), String(name)]}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#888' }} />
            {selectedProducts.map(pid => (
              <Area
                key={pid}
                type="monotone"
                dataKey={products[pid].shortName}
                stroke={products[pid].color}
                fill={`url(#grad${pid})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Per-product summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => {
          const data = allData[i]
          const final = data[data.length - 1]
          const peak = data.reduce((max, d) => d.users > max.users ? d : max, data[0])
          return (
            <div key={p.id} className="netflix-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded" style={{ background: `${p.color}20`, color: p.color }}>
                  {p.icon}
                </div>
                <span className="text-white font-bold text-sm">{p.name}</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Y3Q4 users</span>
                  <span className="text-white font-bold">{final.users.toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Peak velocity</span>
                  <span style={{ color: p.color }} className="font-bold">{peak.quarter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Metcalfe value</span>
                  <span className="text-white font-bold">{(metcalfeValue(final.users) / 1000).toFixed(0)}K</span>
                </div>
                <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(final.users / 110) * 100}%`, background: p.color }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MetcalfeAnalysis() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [products] = useState(PRODUCTS)
  const prevTab = useRef<TabId>('overview')

  const handleTabChange = useCallback((tab: TabId) => {
    Analytics.tabSwitched(prevTab.current, tab)
    prevTab.current = tab
    setActiveTab(tab)
  }, [])

  const handleSelectProduct = useCallback((_id: number, tab: TabId) => {
    handleTabChange(tab)
  }, [handleTabChange])

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Globe size={15} /> },
    { id: 'metcalfe', label: 'Metcalfe Analysis', icon: <TrendingUp size={15} /> },
    { id: 'synergy', label: 'Synergy Matrix', icon: <Layers size={15} /> },
    { id: 'flywheel', label: 'Flywheel', icon: <GitBranch size={15} /> },
    { id: 'adoption', label: '3-Year Model', icon: <BarChart2 size={15} /> },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      {/* Header */}
      <header style={{ background: 'rgba(20,20,20,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
        className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-red-500 font-black text-2xl tracking-tighter">N</div>
            <div className="h-5 w-px bg-gray-700" />
            <span className="text-white font-semibold text-sm">NCE Portfolio</span>
            <span className="hidden md:block text-gray-600 text-xs">— Kevin Owens · CPO × 4</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/concepts/watch-together"
              className="text-xs text-gray-500 hover:text-red-400 transition-colors font-semibold hidden md:block mr-2">
              7 Concepts →
            </Link>
            <a href="https://www.linkedin.com/in/kevinaowens/" target="_blank" rel="noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors hidden md:inline-block"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)' }}>
              LinkedIn ↗
            </a>
            <a href="https://calendar.app.google/rU8y8ENVzi6RQaoN6" target="_blank" rel="noreferrer"
              className="text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:brightness-110"
              style={{ background: '#e50914', color: '#fff', border: '1px solid #e50914' }}>
              📅 Book a 15-min call ↗
            </a>
          </div>
        </div>

        {/* Tab nav */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              data-testid={`tab-${tab.id}`}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-red-500 text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <OverviewTab products={products} onSelectProduct={handleSelectProduct} />
        )}
        {activeTab === 'metcalfe' && <MetcalfeTab products={products} />}
        {activeTab === 'synergy' && <SynergyTab products={products} />}
        {activeTab === 'flywheel' && <FlywheelTab />}
        {activeTab === 'adoption' && <AdoptionTab products={products} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-white font-bold mb-1">Kevin Owens · Netflix PM Application</div>
            <div className="text-gray-600 text-xs">
              AI-Driven SaaS Product Leader · CPO × 4 · Scaled Products Across Europe & U.S.
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs flex-wrap">
            <a href="https://calendar.app.google/rU8y8ENVzi6RQaoN6" target="_blank" rel="noreferrer"
              className="font-bold transition-colors"
              style={{ color: '#e50914' }}>
              📅 Book a 15-min call ↗
            </a>
            <a href="https://www.linkedin.com/in/kevinaowens/" target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-red-300 transition-colors font-semibold">
              linkedin.com/in/kevinaowens ↗
            </a>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Zap size={12} className="text-red-500" />
              <span>7 Product Concepts</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
