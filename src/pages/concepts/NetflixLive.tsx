import { Zap, Radio, Trophy, Vote, Calendar, TrendingUp, MessageSquare, Award } from 'lucide-react'
import ConceptLayout, { type ConceptData, PhoneMockup, NetflixTopBar, NetflixBottomNav } from './ConceptLayout'
import { SIBLINGS } from './siblings'

function NetflixLiveMockup() {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-start">
      {/* Screen 1: Live event */}
      <PhoneMockup label="Live event screen — real-time viewer count + prediction">
        <div style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NetflixTopBar title="Netflix Live" />
          {/* Hero live card */}
          <div style={{ margin: '8px 10px', borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(135deg, #0a0a0a, #1a0505)', border: '1px solid rgba(229,9,20,0.3)', position: 'relative' }}>
            {/* Live badge */}
            <div style={{ position: 'absolute', top: 8, left: 8, background: '#e50914', borderRadius: 4, padding: '2px 6px', fontSize: 8, fontWeight: 900, color: '#fff', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite' }} />
              LIVE
            </div>
            {/* Viewer count */}
            <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.7)', borderRadius: 4, padding: '2px 6px', fontSize: 8, fontWeight: 700, color: '#fff' }}>👁 4.2M watching</div>
            {/* Content */}
            <div style={{ padding: '28px 12px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 24 }}>🏆</div>
              <div style={{ color: '#fff', fontSize: 11, fontWeight: 900, textAlign: 'center', letterSpacing: -0.5 }}>F1 MIAMI GRAND PRIX</div>
              <div style={{ color: '#ff6b35', fontSize: 9, fontWeight: 700 }}>LAP 42 / 57 · VERSTAPPEN +3.2s</div>
              <div style={{ background: '#e50914', borderRadius: 6, padding: '6px 20px', fontSize: 10, fontWeight: 800, color: '#fff', marginTop: 4 }}>▶  Watch Now</div>
            </div>
          </div>
          {/* Prediction */}
          <div style={{ margin: '0 10px 8px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ color: '#ff6b35', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>🔮 Live Prediction</div>
            <div style={{ color: '#fff', fontSize: 9, fontWeight: 600, marginBottom: 8 }}>Who wins today?</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[{ name: 'Verstappen', pct: 64 }, { name: 'Norris', pct: 36 }].map((opt, i) => (
                <div key={i} style={{ flex: 1, background: i === 0 ? 'rgba(255,107,53,0.2)' : 'rgba(255,255,255,0.05)', border: i === 0 ? '1px solid rgba(255,107,53,0.5)' : '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '5px 6px', textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>{opt.name}</div>
                  <div style={{ color: i === 0 ? '#ff6b35' : '#888', fontSize: 10, fontWeight: 900 }}>{opt.pct}%</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#555', fontSize: 7, marginTop: 4, textAlign: 'center' }}>1.8M predictions · closes lap 50</div>
          </div>
          {/* Up next */}
          <div style={{ padding: '0 10px' }}>
            <div style={{ color: '#666', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Up Next Live</div>
            {[
              { emoji: '🎤', title: 'Love Is Blind Live Reunion', time: 'Tonight 8pm ET', viewers: '2.1M reminded' },
              { emoji: '🥊', title: 'Netflix Boxing: Fury vs Ngannou 2', time: 'Sat Jun 15', viewers: '890K reminded' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '6px 8px' }}>
                <div style={{ fontSize: 16 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#ddd', fontSize: 8, fontWeight: 700 }}>{item.title}</div>
                  <div style={{ color: '#555', fontSize: 7 }}>{item.time} · {item.viewers}</div>
                </div>
                <div style={{ background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 4, padding: '2px 6px', fontSize: 7, fontWeight: 700, color: '#ff6b35' }}>🔔</div>
              </div>
            ))}
          </div>
          <NetflixBottomNav active="New & Hot" />
        </div>
      </PhoneMockup>

      {/* Screen 2: Live voting overlay */}
      <PhoneMockup label="Interactive voting overlay during Love Is Blind">
        <div style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NetflixTopBar title="Love Is Blind — LIVE" back />
          {/* Video */}
          <div style={{ background: '#000', aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#888', fontSize: 8 }}>[ LIVE STREAM ]</div>
            <div style={{ position: 'absolute', top: 6, left: 6, background: '#e50914', borderRadius: 4, padding: '2px 6px', fontSize: 7, fontWeight: 900, color: '#fff' }}>● LIVE</div>
            <div style={{ position: 'absolute', top: 6, right: 6, color: '#fff', fontSize: 7, background: 'rgba(0,0,0,0.6)', borderRadius: 4, padding: '2px 5px' }}>👁 3.4M</div>
          </div>
          {/* Vote card */}
          <div style={{ margin: '8px 10px', background: 'linear-gradient(135deg, rgba(229,9,20,0.12), rgba(255,107,53,0.08))', border: '1px solid rgba(229,9,20,0.25)', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ color: '#ff6b35', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>🗳 LIVE VOTE · 2:14 remaining</div>
            <div style={{ color: '#fff', fontSize: 10, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>Will Tiffany say yes at the altar?</div>
            {/* Progress bar */}
            <div style={{ height: 3, background: '#222', borderRadius: 2, marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '30%', background: 'linear-gradient(90deg, #e50914, #ff6b35)', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ flex: 1, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 8, padding: '8px 4px', cursor: 'pointer' }}>
                <div style={{ fontSize: 14 }}>💍</div>
                <div style={{ color: '#22c55e', fontSize: 9, fontWeight: 800 }}>YES</div>
                <div style={{ color: '#555', fontSize: 8 }}>67%</div>
              </button>
              <button style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '8px 4px', cursor: 'pointer' }}>
                <div style={{ fontSize: 14 }}>💔</div>
                <div style={{ color: '#ef4444', fontSize: 9, fontWeight: 800 }}>NO</div>
                <div style={{ color: '#555', fontSize: 8 }}>33%</div>
              </button>
            </div>
            <div style={{ color: '#555', fontSize: 7, textAlign: 'center', marginTop: 6 }}>2.1M votes cast</div>
          </div>
          {/* Live chat preview */}
          <div style={{ flex: 1, padding: '0 10px', overflow: 'hidden' }}>
            <div style={{ color: '#666', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Live Chat</div>
            {[
              { name: 'jenna_m', msg: 'SHE IS GOING TO SAY NO I CAN FEEL IT', color: '#f5c518' },
              { name: 'tv_lover99', msg: 'the way he looked at her omg 😭', color: '#3b82f6' },
              { name: 'drama_queen', msg: 'voted YES, manifesting for them', color: '#a855f7' },
            ].map((c, i) => (
              <div key={i} style={{ marginBottom: 5 }}>
                <span style={{ color: c.color, fontSize: 8, fontWeight: 700 }}>{c.name}: </span>
                <span style={{ color: '#aaa', fontSize: 8 }}>{c.msg}</span>
              </div>
            ))}
          </div>
          <NetflixBottomNav active="New & Hot" />
        </div>
      </PhoneMockup>
    </div>
  )
}

const concept: ConceptData = {
  id: 'netflix-live',
  name: 'Netflix Live',
  tagline: 'The real-time layer that makes Netflix unmissable',
  description:
    'Netflix Live brings sports rights, live events, award shows, and interactive voting to the Netflix platform — transforming it from an on-demand library into a must-open-now destination that commands daily habit.',
  color: '#ff6b35',
  colorDark: '#cc4f1a',
  icon: <Zap size={36} />,
  nceScore: 4,
  maxUsers: 110,

  problemStatement:
    'Netflix has the world\'s largest paid subscriber base but zero "must-watch-right-now" content. Live sports, award ceremonies, and cultural moments drive the highest same-time viewership peaks — yet Netflix cedes these moments entirely to linear TV, YouTube, and streaming competitors. Every Super Bowl, Oscars, or World Cup that happens off-platform is a day when Netflix isn\'t opened. At $18/month, that\'s an unconscionable value gap.',

  insightQuote:
    'Live is the one format on-demand cannot replicate. It\'s not about what you missed — it\'s about being there. That\'s a fundamentally different subscription value than a content library.',
  insightSource: 'Live Content Strategy Review, Q4 Internal',

  targetUser: 'Sports fans and appointment-TV viewers aged 25–49',
  targetUserDetail:
    'Dual-income households who maintain cable or a sports streaming service alongside Netflix — representing $30–50/month in competitive subscription spend. These are subscribers who would consolidate to Netflix if it carried their must-see live content. They also skew toward higher-tier plans and lower churn when engaged.',

  features: [
    {
      icon: <Radio size={18} />,
      title: 'Live Sports Broadcasting',
      description: 'NFL Sunday Ticket-style packages, Premier League, Formula 1, and Wimbledon — with multi-camera angles, stats overlays, and real-time commentary tracks.',
      techNote: 'Low-latency HLS with 5–8 second delay; adaptive bitrate from 720p to 4K HDR',
    },
    {
      icon: <Vote size={18} />,
      title: 'Interactive Voting & Polls',
      description: 'Real-time audience voting on award shows, reality competitions, and interactive specials — results displayed live on screen with animated breakdowns.',
      techNote: 'Sub-second vote aggregation; anti-fraud rate limiting per account',
    },
    {
      icon: <MessageSquare size={18} />,
      title: 'Live Commentary Tracks',
      description: 'Watch live events with an expert commentary overlay or your friends\'s live reactions — switchable audio channels like a TV broadcast.',
      techNote: 'Multi-audio stream switching without rebuffering via MPEG-DASH',
    },
    {
      icon: <Calendar size={18} />,
      title: 'Live Event Calendar',
      description: 'Browsable calendar of upcoming live events with one-tap RSVP and calendar export. Reminder notifications sent 15 min before go-live.',
      techNote: 'iCal/Google Calendar integration via standard ICS format',
    },
    {
      icon: <TrendingUp size={18} />,
      title: 'Live Stats Overlay',
      description: 'For sports: real-time score, stats, standings, and player cards — overlaid as a dismissable HUD without leaving the stream.',
      techNote: 'Sports data API integration (Stats Perform / Sportradar)',
    },
    {
      icon: <Trophy size={18} />,
      title: 'Prediction Games',
      description: 'Pick-em bracket challenges and live prediction games running alongside sports and reality TV — leaderboards reset per event, driving re-engagement.',
      techNote: 'Game state managed server-side; client polls at 1Hz during active events',
    },
    {
      icon: <Award size={18} />,
      title: 'Exclusive Netflix Live Originals',
      description: 'Netflix-produced live events: celebrity reality shows, live comedy specials, interactive game shows, and livestreamed film premieres with cast Q&As.',
      techNote: 'Netflix internal production infrastructure with OBS-compatible ingest',
    },
    {
      icon: <Zap size={18} />,
      title: '"Happening Now" Shelf',
      description: 'Persistent top-of-homepage rail showing what\'s live right now — pulsing red dot indicator creates urgency and trains the daily-open habit.',
      techNote: 'Real-time CMS update; A/B tested against "Coming Up Live" shelf',
    },
  ],

  userJourney: [
    {
      step: 1,
      actor: 'user',
      action: 'Opens Netflix app and sees "Live Now" shelf at top of homepage',
      outcome: 'Pulsing indicator communicates urgency. Even users without an intent to watch live are nudged to engage — training the daily-open habit.',
    },
    {
      step: 2,
      actor: 'user',
      action: 'Taps into a live Premier League match',
      outcome: 'Sub-8-second load time to live video. Score overlay visible immediately. Prediction game prompt appears in bottom third.',
    },
    {
      step: 3,
      actor: 'system',
      action: 'Detects friends are watching the same match',
      outcome: '"3 friends are watching — join their watch room?" prompt appears. Social layer activates on top of live content for maximum engagement.',
    },
    {
      step: 4,
      actor: 'user',
      action: 'Participates in halftime prediction game',
      outcome: 'Submits predictions, sees live leaderboard. Stakes engagement through second half — departure rate drops 60% vs. non-game viewers.',
    },
    {
      step: 5,
      actor: 'netflix',
      action: 'Match ends — smart post-live recommendation',
      outcome: '"You watched the match — now stream the full season documentary." Live content drives catalog discovery and increases viewing hours.',
    },
    {
      step: 6,
      actor: 'system',
      action: 'Sends "Next Live Event" reminder 24h before',
      outcome: 'Calendar-committed engagement loop established. Subscriber opens Netflix on schedule — habit formation replaces passive churn.',
    },
  ],

  networkEffects: [
    {
      trigger: 'Live event attracts simultaneous viewers',
      mechanism: 'Mass simultaneous viewership creates shared cultural moment — social media discussion references Netflix Live as the platform, driving brand awareness and trials.',
      compounding: 'Each viral live moment generates earned media worth an estimated $2–5M in equivalent paid impressions',
    },
    {
      trigger: 'Prediction games create social competition',
      mechanism: 'Leaderboards are shared publicly, drawing friend groups into the game — each participant is a referral vector for the live event.',
      compounding: 'Prediction participants watch 40% more of the live event and return for the next one at 2× the rate of passive viewers',
    },
    {
      trigger: 'Sports rights exclusivity creates lock-in',
      mechanism: 'If the Premier League or NFL is exclusively on Netflix, cable-cutters have no alternative — this eliminates the multi-service household.',
      compounding: 'Exclusive sports rights could justify a $4–6/month price increase on Sports tier, with <5% churn sensitivity at this price point',
    },
    {
      trigger: 'Interactive voting drives appointment viewing',
      mechanism: 'When subscriber votes influence outcomes (reality shows, awards), they have skin in the game — they must watch live to matter.',
      compounding: 'Voting participants have 3× lower 30-day churn than non-voting subscribers on the same show',
    },
  ],

  metrics: [
    { label: 'Live Viewing Hours/Month', value: '800M', target: '1.5B', timeframe: 'Year 2 target', color: '#ff6b35' },
    { label: 'Churn Rate (Live subscribers)', value: '-35%', target: '-50%', timeframe: 'vs. non-live subs', color: '#ffa07a' },
    { label: 'Same-Day App Opens', value: '+2.1×', target: '+3×', timeframe: 'on live event days', color: '#ff6b35' },
    { label: 'Sports Tier ARPU', value: '$24', target: '$28', timeframe: 'with live add-on', color: '#ff8c42' },
  ],

  revenueModel:
    'Netflix Live supports three revenue streams: (1) a Sports & Live add-on tier at $6–8/month above Standard, targeting the 40M+ subscribers who currently maintain a separate sports streaming subscription, (2) in-live advertising on the ad-supported tier during sports and reality events where live advertising commands 2–4× CPM premium over on-demand, and (3) reduced churn — live subscribers churn at half the rate, representing the highest LTV segment in the subscriber base.',

  goToMarket: [
    'Anchor launch with a single marquee live right — target one major sports league (NFL Thursday Night or UEFA Champions League) as the "proof of concept" that Netflix can do live at scale.',
    'Launch Netflix Live Awards — an original awards show where subscribers vote for winners across Netflix originals. Fully interactive, social, and exclusive to the platform.',
    'Partner with Formula 1 (natural fit given "Drive to Survive" fandom) for Netflix-exclusive post-race content and eventual race broadcasts — lowest-risk live sports entry point.',
    'Interactive reality: produce a live "Big Brother"-style show where subscribers vote weekly on outcomes, making every Tuesday a must-open moment for that subscriber segment.',
    'Staged market rollout — launch live sports in markets where Netflix already has highest engagement density (UK, Brazil, India) before US rights investment.',
  ],

  timeline: [
    {
      phase: 'Infrastructure',
      months: 'Months 1–5',
      milestones: [
        'Low-latency streaming stack (sub-8s to play)',
        '"Live Now" shelf in homepage algorithm',
        'Live event calendar + reminder notifications',
        'Netflix Live Originals: 4 interactive specials',
      ],
    },
    {
      phase: 'Content Rights',
      months: 'Months 6–12',
      milestones: [
        'Close first marquee sports rights deal',
        'Launch interactive voting for reality competition show',
        'Prediction games for sports broadcasts',
        'Live commentary multi-audio track',
      ],
    },
    {
      phase: 'Platform Scale',
      months: 'Months 13–24',
      milestones: [
        'Sports & Live premium tier launch ($6–8 add-on)',
        'Watch Together + Live integration',
        'Live stats overlay for sports',
        'International sports rights expansion',
      ],
    },
  ],

  risks: [
    {
      risk: 'Live sports rights are astronomically expensive — NFL/Premier League deals run $1B+/year, with no guarantee of ROI at current subscriber economics.',
      mitigation: 'Start with non-exclusive rights for smaller leagues (Formula E, international cricket, women\'s sports) to build live infrastructure and audience before competing for marquee rights.',
    },
    {
      risk: 'Technical failure during a high-stakes live event (Super Bowl, Champions League final) would cause massive brand damage.',
      mitigation: 'Multi-CDN redundancy, real-time failover, and exhaustive load testing at 10× expected peak. Staged rollout with "soft launch" events before marquee rights.',
    },
    {
      risk: 'Interactive features (voting, prediction) could be gamed or manipulated at scale, undermining trust in outcomes.',
      mitigation: 'Account-level rate limiting, device fingerprinting, and ML-based anomaly detection. Results are auditable and verified by third-party for flagship events.',
    },
    {
      risk: 'Live content cannibalizes on-demand viewing hours without growing total time — zero-sum shift rather than net new engagement.',
      mitigation: 'Live-to-catalog funnel design ensures every live event drives on-demand viewing. Measure incremental hours, not total hours.',
    },
  ],
}

const conceptWithMockup: ConceptData = {
  ...concept,
  mockup: <NetflixLiveMockup />,
  execSummary: {
    why: "Live is the only content format that creates genuine appointment viewing — and appointment viewing is the single most powerful churn prevention mechanism in media. Netflix's Jake Paul vs. Mike Tyson fight reached 108M households in a single evening. That is not a content win; it's proof of infrastructure.",
    impact: 'Sports subscribers churn at 35–50% lower rates than VOD-only subscribers across every major streaming service. Live event programming creates predictable high-engagement spikes that keep subscribers active in the content-drought weeks between seasons.',
    edge: "Netflix's 260M global subscriber base makes it the only platform that can deliver live events as simultaneously appointment TV in every major market. Disney has ESPN; Amazon has Thursday Night Football. Netflix has scale and zero rights commitments — the blank-slate advantage.",
  },
  kevinsTake: "The consumer data from GWI's research showed the same pattern everywhere I looked: subscribers who have 'must-watch' content — a live event, a finale, a cultural moment — churn at half the rate of passive consumers. Live doesn't just add a content category. It manufactures appointment viewing, which is the retention mechanic every streaming service is trying to buy and most can't build.",
}

export default function NetflixLivePage() {
  return <ConceptLayout concept={conceptWithMockup} siblings={SIBLINGS} />
}
