import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Line, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts'
import {
  Users, TrendingUp, Network, Zap, Play, Pause,
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
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 bg-red-950/30 border border-red-900/40 rounded-full px-4 py-1.5 mb-4">
          <Network size={14} className="text-red-500" />
          <span className="text-xs text-red-400 font-semibold tracking-wider uppercase">
            Metcalfe's Law Portfolio
          </span>
        </div>
        <h1 className="text-5xl font-black text-white mb-3 leading-tight">
          Network Connection<br />
          <span className="text-red-500">Effects Analysis</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Five product concepts that leverage Netflix's 260M subscriber base as a
          network asset — where value scales as <strong className="text-white">N²</strong>.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4">
        <MetricBadge label="Netflix Subscribers" value="260M" sub="+8M YoY" />
        <MetricBadge label="Network Connections" value="33.8B" sub="potential" />
        <MetricBadge label="Metcalfe Value Index" value="67,600" sub="N² / 1000" />
        <MetricBadge label="Product Concepts" value="7" sub="analyzed" />
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="netflix-card p-5 cursor-pointer group"
            onClick={() => onSelectProduct(p.id, 'metcalfe')}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="p-2.5 rounded-lg"
                style={{ background: `${p.color}20`, color: p.color }}
              >
                {p.icon}
              </div>
              <div
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{ background: `${p.color}20`, color: p.color }}
              >
                NCE Score: {(nceScore(p.maxUsers, p.engagementRate, p.monetization) / 1000).toFixed(0)}K
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">{p.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/30 rounded p-2">
                <div className="text-gray-500">Peak Reach</div>
                <div className="text-white font-bold">{p.maxUsers}M users</div>
              </div>
              <div className="bg-black/30 rounded p-2">
                <div className="text-gray-500">Engagement</div>
                <div className="text-white font-bold">{(p.engagementRate * 100).toFixed(0)}%</div>
              </div>
            </div>
            <Link
              to={`/concepts/${PRODUCT_SLUGS[p.id]}`}
              onClick={e => e.stopPropagation()}
              className="mt-3 flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
              style={{ color: p.color }}
            >
              View Concept <ChevronRight size={14} />
            </Link>
          </div>
        ))}

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
            {products.map(p => (
              <div key={p.id} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                <div className="text-xs text-gray-400 flex-1">{p.shortName}</div>
                <div className="h-1.5 rounded-full flex-1 bg-gray-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(p.maxUsers / 110) * 100}%`,
                      background: p.color,
                    }}
                  />
                </div>
                <div className="text-xs text-white font-bold w-10 text-right">{p.maxUsers}M</div>
              </div>
            ))}
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

  return (
    <div className="space-y-6">
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
          <div className="bg-black/40 rounded-lg p-3 mt-2">
            <p className="text-xs text-gray-500 leading-relaxed">
              At <span className="text-white font-bold">{users}M users</span>, {product.name} creates{' '}
              <span style={{ color: product.color }} className="font-bold">
                {(networkConnections(users * 1000) / 1_000_000_000).toFixed(1)}B
              </span>{' '}
              unique connections — a <span className="text-white font-bold">
                {(networkConnections(users * 1000) / (users * 1000) / 1000).toFixed(1)}M×
              </span> network leverage multiplier.
            </p>
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
      <div className="netflix-card p-6">
        <h3 className="text-white font-bold mb-1">Cross-Product Synergy Matrix</h3>
        <p className="text-gray-500 text-sm mb-6">
          How much each product amplifies the others — higher scores mean stronger network reinforcement.
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
            <span className="hidden md:block text-gray-600 text-xs">— Kevin Owens · Netflix PM Application</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/concepts/watch-together"
              className="text-xs text-gray-500 hover:text-red-400 transition-colors font-semibold">
              Product Concepts →
            </Link>
            <div className="flex items-center gap-2">
              <Network size={14} className="text-red-500" />
              <span className="text-xs text-gray-500">
                260M subscribers · <span className="text-red-500 font-bold">33.8B</span> connections
              </span>
            </div>
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
            <div className="text-white font-bold mb-1">Netflix NCE Portfolio</div>
            <div className="text-gray-600 text-xs">
              Kevin Owens · Senior PM Application · Network Connection Effects Analysis
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Users size={12} className="text-red-500" />
              <span>Metcalfe's Law: V = N²</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={12} className="text-red-500" />
              <span>5 Product Concepts</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
