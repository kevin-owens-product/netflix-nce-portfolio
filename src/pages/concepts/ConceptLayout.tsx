import { type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Network, TrendingUp, Users, Zap, Target, BarChart2, ChevronRight, Monitor, Lightbulb } from 'lucide-react'

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface Feature {
  icon: ReactNode
  title: string
  description: string
  techNote?: string
}

export interface Metric {
  label: string
  value: string
  target: string
  timeframe: string
  color: string
}

export interface JourneyStep {
  step: number
  actor: 'user' | 'netflix' | 'system'
  action: string
  outcome: string
}

export interface NetworkEffect {
  trigger: string
  mechanism: string
  compounding: string
}

export interface ExecSummary {
  why: string      // Strategic rationale — why this concept, why now
  impact: string   // Business impact — churn, revenue, engagement numbers
  edge: string     // Netflix's unique advantage — why only Netflix can build this
}

export interface ConceptData {
  id: string
  name: string
  tagline: string
  description: string
  color: string
  colorDark: string
  icon: ReactNode
  problemStatement: string
  insightQuote: string
  insightSource: string
  targetUser: string
  targetUserDetail: string
  features: Feature[]
  userJourney: JourneyStep[]
  metrics: Metric[]
  networkEffects: NetworkEffect[]
  goToMarket: string[]
  risks: { risk: string; mitigation: string }[]
  nceScore: number
  maxUsers: number
  revenueModel: string
  timeline: { phase: string; months: string; milestones: string[] }[]
  mockup?: ReactNode
  execSummary?: ExecSummary
  kevinsTake?: string
}

// ─── Phone mockup shell ────────────────────────────────────────────────────────

export function PhoneMockup({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: 240, height: 480 }}>
        {/* Outer frame */}
        <div
          className="absolute inset-0 rounded-[36px] overflow-hidden shadow-2xl"
          style={{ border: '7px solid #2a2a2a', background: '#141414', boxShadow: '0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)' }}
        >
          {/* Notch */}
          <div className="flex justify-center pt-0">
            <div style={{ width: 80, height: 22, background: '#2a2a2a', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }} />
          </div>
          {/* Status bar */}
          <div className="flex justify-between items-center px-4 pb-1 text-white" style={{ fontSize: 9, fontWeight: 700, marginTop: -4 }}>
            <span>9:41</span>
            <span style={{ letterSpacing: 1 }}>●●● 100%</span>
          </div>
          {/* Screen content */}
          <div style={{ height: 'calc(100% - 44px)', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
            {children}
          </div>
          {/* Home bar */}
          <div className="absolute bottom-2 left-1/2" style={{ transform: 'translateX(-50%)', width: 80, height: 4, background: '#555', borderRadius: 2 }} />
        </div>
        {/* Shine */}
        <div className="absolute inset-0 rounded-[36px] pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 45%)' }} />
        {/* Side buttons */}
        <div className="absolute" style={{ left: -9, top: 80, width: 4, height: 28, background: '#333', borderRadius: 2 }} />
        <div className="absolute" style={{ left: -9, top: 116, width: 4, height: 44, background: '#333', borderRadius: 2 }} />
        <div className="absolute" style={{ left: -9, top: 168, width: 4, height: 44, background: '#333', borderRadius: 2 }} />
        <div className="absolute" style={{ right: -9, top: 120, width: 4, height: 60, background: '#333', borderRadius: 2 }} />
      </div>
      {label && (
        <div className="text-xs text-center max-w-[200px] leading-relaxed" style={{ color: '#666' }}>{label}</div>
      )}
    </div>
  )
}

// Netflix chrome helpers used inside mockup screens
export function NetflixTopBar({ title, back }: { title?: string; back?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-2" style={{ background: 'rgba(20,20,20,0.95)' }}>
      <div className="flex items-center gap-2">
        {back && <span style={{ color: '#fff', fontSize: 12 }}>‹</span>}
        <span style={{ color: '#e50914', fontWeight: 900, fontSize: 14, letterSpacing: -0.5 }}>N</span>
        {title && <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>{title}</span>}
      </div>
      <div className="flex items-center gap-2">
        <div style={{ width: 22, height: 22, borderRadius: 4, background: '#e50914', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>KO</span>
        </div>
      </div>
    </div>
  )
}

export function NetflixBottomNav({ active }: { active?: string }) {
  const items = [
    { icon: '⌂', label: 'Home' },
    { icon: '◎', label: 'Search' },
    { icon: '▶', label: 'New & Hot' },
    { icon: '↓', label: 'Downloads' },
  ]
  return (
    <div className="flex justify-around items-center px-2 pt-1 pb-3" style={{ background: 'rgba(20,20,20,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {items.map(item => (
        <div key={item.label} className="flex flex-col items-center gap-0.5" style={{ opacity: item.label === active ? 1 : 0.4 }}>
          <span style={{ fontSize: 14, color: item.label === active ? '#e50914' : '#fff' }}>{item.icon}</span>
          <span style={{ fontSize: 7, color: item.label === active ? '#e50914' : '#fff', fontWeight: 600 }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Reusable section components ──────────────────────────────────────────────

export function Section({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="text-red-500">{icon}</div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex-1 h-px bg-gray-800 ml-2" />
      </div>
      {children}
    </section>
  )
}

export function FeatureCard({ feature, color }: { feature: Feature; color: string }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg shrink-0" style={{ background: `${color}20`, color }}>
          {feature.icon}
        </div>
        <div>
          <h4 className="text-white font-bold mb-1">{feature.title}</h4>
          <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          {feature.techNote && (
            <div className="mt-2 text-xs text-gray-600 bg-black/30 rounded px-2 py-1 inline-block">
              Tech: {feature.techNote}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
      <div className="text-2xl font-black mb-1" style={{ color: metric.color }}>{metric.value}</div>
      <div className="text-white font-semibold text-sm mb-1">{metric.label}</div>
      <div className="text-xs text-gray-500">Target: <span className="text-gray-300">{metric.target}</span></div>
      <div className="text-xs text-gray-600 mt-0.5">{metric.timeframe}</div>
    </div>
  )
}

// ─── Journey visualization ─────────────────────────────────────────────────────

function actorColor(actor: JourneyStep['actor']) {
  return actor === 'user' ? '#60a5fa' : actor === 'netflix' ? '#e50914' : '#a855f7'
}
function actorLabel(actor: JourneyStep['actor']) {
  return actor === 'user' ? 'User' : actor === 'netflix' ? 'Netflix' : 'System'
}

export function JourneyMap({ steps }: { steps: JourneyStep[] }) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-800" />
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4 items-start pl-12 relative">
            <div
              className="absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-black"
              style={{
                background: `${actorColor(step.actor)}15`,
                borderColor: actorColor(step.actor),
                color: actorColor(step.actor),
              }}
            >
              {step.step}
            </div>
            <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${actorColor(step.actor)}20`, color: actorColor(step.actor) }}
                >
                  {actorLabel(step.actor)}
                </span>
                <span className="text-white font-semibold text-sm">{step.action}</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{step.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Network effect chain ──────────────────────────────────────────────────────

export function NetworkEffectChain({ effects, color }: { effects: NetworkEffect[]; color: string }) {
  return (
    <div className="space-y-3">
      {effects.map((e, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
              style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}>
              {i + 1}
            </div>
            {i < effects.length - 1 && <div className="w-px h-6 mt-1" style={{ background: `${color}30` }} />}
          </div>
          <div className="flex-1 bg-gray-900/50 rounded-xl p-4 border border-gray-800">
            <div className="font-bold text-white text-sm mb-1">{e.trigger}</div>
            <div className="text-gray-400 text-xs mb-1.5">{e.mechanism}</div>
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color }}>
              <TrendingUp size={11} />
              {e.compounding}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Timeline ──────────────────────────────────────────────────────────────────

export function Timeline({ phases, color }: { phases: ConceptData['timeline']; color: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {phases.map((phase, i) => (
        <div key={i} className="relative">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-xs font-black px-2 py-1 rounded-full"
                style={{ background: `${color}20`, color }}>
                Phase {i + 1}
              </div>
              <span className="text-xs text-gray-500">{phase.months}</span>
            </div>
            <div className="text-white font-bold mb-3">{phase.phase}</div>
            <ul className="space-y-2">
              {phase.milestones.map((m, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                  <ChevronRight size={12} className="mt-0.5 shrink-0" style={{ color }} />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          {i < phases.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-2 z-10">
              <ChevronRight size={16} className="text-gray-600" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main layout ───────────────────────────────────────────────────────────────

export default function ConceptLayout({ concept, siblings }: { concept: ConceptData; siblings: { id: string; name: string; color: string; icon: ReactNode }[] }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: '#0d0d0d' }}>
      {/* Top nav */}
      <header style={{ background: 'rgba(13,13,13,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
        className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm">
              <ArrowLeft size={15} />
              NCE Analysis
            </button>
            <span className="text-gray-700">/</span>
            <span className="text-gray-500 text-sm">Product Concepts</span>
            <span className="text-gray-700">/</span>
            <span className="text-white text-sm font-semibold">{concept.name}</span>
          </div>
          <Link to="/" className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors">
            <Network size={12} className="text-red-500" />
            View NCE Analysis
            <ExternalLink size={11} />
          </Link>
        </div>

        {/* Sibling nav */}
        <div className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto pb-0.5">
          {siblings.map(s => (
            <Link
              key={s.id}
              to={`/concepts/${s.id}`}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-all"
              style={s.id === concept.id
                ? { borderColor: concept.color, color: '#fff' }
                : { borderColor: 'transparent', color: '#666' }
              }
            >
              <span style={{ color: s.id === concept.id ? concept.color : '#555' }}>{s.icon}</span>
              {s.name}
            </Link>
          ))}
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${concept.colorDark}30 0%, #0d0d0d 60%)`, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-2xl shrink-0" style={{ background: `${concept.color}20`, border: `1px solid ${concept.color}40` }}>
              <div style={{ color: concept.color, width: 36, height: 36 }}>{concept.icon}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase"
                  style={{ background: `${concept.color}20`, color: concept.color }}>
                  Product Concept
                </span>
                <span className="text-xs text-gray-600">NCE Score: {concept.nceScore.toLocaleString()}K · {concept.maxUsers}M peak users</span>
              </div>
              <h1 className="text-5xl font-black text-white mb-2 leading-tight">{concept.name}</h1>
              <p className="text-xl font-medium mb-4" style={{ color: concept.color }}>{concept.tagline}</p>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">{concept.description}</p>
            </div>
          </div>

          {/* Insight quote */}
          <div className="mt-8 max-w-2xl border-l-2 pl-4" style={{ borderColor: concept.color }}>
            <p className="text-gray-300 italic text-sm leading-relaxed">"{concept.insightQuote}"</p>
            <p className="text-gray-600 text-xs mt-2">— {concept.insightSource}</p>
          </div>
        </div>
      </div>

      {/* Product mockup section */}
      {concept.mockup && (
        <div style={{ background: `linear-gradient(180deg, ${concept.colorDark}18 0%, #0d0d0d 100%)`, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center gap-2 mb-8">
              <Monitor size={16} style={{ color: concept.color }} />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Product Preview</h2>
              <div className="flex-1 h-px bg-gray-800 ml-2" />
              <span className="text-xs text-gray-600">UI concept screens</span>
            </div>
            {concept.mockup}
          </div>
        </div>
      )}

      {/* Body */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Executive Summary */}
        {concept.execSummary && (
          <div className="mb-10 rounded-2xl border overflow-hidden" style={{ borderColor: `${concept.color}30`, background: `linear-gradient(135deg, ${concept.colorDark}15 0%, #0d0d0d 70%)` }}>
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: `${concept.color}20` }}>
              <div className="flex items-center gap-2">
                <Target size={14} style={{ color: concept.color }} />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Executive Summary</span>
              </div>
              <span className="text-xs text-gray-600">30-second brief</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
              {[
                { label: 'Why This', icon: '💡', text: concept.execSummary.why },
                { label: 'Business Impact', icon: '📈', text: concept.execSummary.impact },
                { label: "Netflix's Edge", icon: '🔐', text: concept.execSummary.edge },
              ].map((item, i) => (
                <div key={i} className="px-6 py-5" style={{ borderColor: `${concept.color}15` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontSize: 14 }}>{item.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: concept.color }}>{item.label}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problem + Target user */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-red-500" />
              <h3 className="text-white font-bold">Problem Statement</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{concept.problemStatement}</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-blue-500" />
              <h3 className="text-white font-bold">Primary User</h3>
            </div>
            <div className="text-white font-semibold mb-2">{concept.targetUser}</div>
            <p className="text-gray-400 text-sm leading-relaxed">{concept.targetUserDetail}</p>
          </div>
        </div>

        {/* Features */}
        <Section title="Core Features" icon={<Zap size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.features.map((f, i) => (
              <FeatureCard key={i} feature={f} color={concept.color} />
            ))}
          </div>
        </Section>

        {/* User journey */}
        <Section title="User Journey" icon={<Users size={18} />}>
          <JourneyMap steps={concept.userJourney} />
        </Section>

        {/* Network effects */}
        <Section title="Network Effect Chain" icon={<Network size={18} />}>
          <NetworkEffectChain effects={concept.networkEffects} color={concept.color} />
        </Section>

        {/* Kevin's Take */}
        {concept.kevinsTake && (
          <div className="mb-12 rounded-2xl border p-6" style={{ borderColor: `${concept.color}25`, background: `${concept.color}06` }}>
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #e50914, #b20710)' }}>KO</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={14} style={{ color: concept.color }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: concept.color }}>Kevin's Take</span>
                  <span className="text-gray-600 text-xs">· CPO × 4 · GWI · USC</span>
                </div>
                <p className="text-gray-200 leading-relaxed italic">"{concept.kevinsTake}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Success metrics */}
        <Section title="Success Metrics & KPIs" icon={<BarChart2 size={18} />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {concept.metrics.map((m, i) => (
              <MetricCard key={i} metric={m} />
            ))}
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-sm font-bold text-white mb-2">Revenue Model</div>
            <p className="text-gray-400 text-sm leading-relaxed">{concept.revenueModel}</p>
          </div>
        </Section>

        {/* Go to market */}
        <Section title="Go-to-Market Strategy" icon={<TrendingUp size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {concept.goToMarket.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: `${concept.color}25`, color: concept.color }}>
                  {i + 1}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Roadmap */}
        <Section title="Delivery Roadmap" icon={<ChevronRight size={18} />}>
          <Timeline phases={concept.timeline} color={concept.color} />
        </Section>

        {/* Risks */}
        <Section title="Risks & Mitigations" icon={<Target size={18} />}>
          <div className="space-y-3">
            {concept.risks.map((r, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div>
                  <div className="text-xs text-red-500 font-bold mb-1 uppercase tracking-wider">Risk</div>
                  <p className="text-gray-300 text-sm">{r.risk}</p>
                </div>
                <div>
                  <div className="text-xs font-bold mb-1 uppercase tracking-wider" style={{ color: concept.color }}>Mitigation</div>
                  <p className="text-gray-400 text-sm">{r.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Author CTA */}
        <div className="mb-8 rounded-2xl border border-gray-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, #1a0000 0%, #141414 70%)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #e50914, #b20710)' }}>KO</div>
            <div>
              <div className="text-white font-bold">Kevin Owens</div>
              <div className="text-gray-500 text-sm">AI-Driven SaaS Product Leader · CPO × 4 · London</div>
              <div className="text-gray-600 text-xs mt-0.5">Built audience intelligence products at GWI used by Netflix, Disney+ & Amazon</div>
            </div>
          </div>
          <a href="https://www.linkedin.com/in/kevinaowens/" target="_blank" rel="noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors text-center"
            style={{ background: 'rgba(229,9,20,0.15)', color: '#e50914', border: '1px solid rgba(229,9,20,0.3)' }}>
            Connect on LinkedIn ↗
          </a>
        </div>

        {/* Next concept */}
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
            <ArrowLeft size={14} />
            Back to NCE Analysis
          </Link>
          {siblings.find((s, i) => s.id === concept.id && i < siblings.length - 1) !== undefined && (() => {
            const idx = siblings.findIndex(s => s.id === concept.id)
            const next = siblings[idx + 1]
            return next ? (
              <Link to={`/concepts/${next.id}`}
                className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: next.color }}>
                Next: {next.name}
                <ChevronRight size={14} />
              </Link>
            ) : null
          })()}
        </div>
      </main>
    </div>
  )
}
