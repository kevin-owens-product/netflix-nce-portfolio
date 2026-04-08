import { Star, Film, Mic2, BookOpen, TrendingUp, Award, Users, DollarSign } from 'lucide-react'
import ConceptLayout, { type ConceptData, PhoneMockup, NetflixTopBar, NetflixBottomNav } from './ConceptLayout'
import { SIBLINGS } from './siblings'

function CreatorStudioMockup() {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-start">
      {/* Screen 1: Creator discovery shelf */}
      <PhoneMockup label="Creator content shelf on show detail page">
        <div style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NetflixTopBar title="Stranger Things" back />
          {/* Show hero */}
          <div style={{ margin: '0 0 0 0', background: 'linear-gradient(180deg, #1a0a1a 0%, #141414 100%)', padding: '10px 12px 8px' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 64, borderRadius: 6, background: 'linear-gradient(135deg, #2a0a2a, #0a0a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🎭</div>
              <div>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 900 }}>Stranger Things</div>
                <div style={{ color: '#888', fontSize: 8, marginTop: 2 }}>Sci-Fi · Horror · 4 Seasons</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <div style={{ background: '#e50914', borderRadius: 4, padding: '3px 8px', fontSize: 8, fontWeight: 800, color: '#fff' }}>▶ Play</div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, padding: '3px 8px', fontSize: 8, fontWeight: 600, color: '#fff' }}>+ List</div>
                </div>
              </div>
            </div>
          </div>
          {/* Creator Essays shelf */}
          <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ color: '#f5c518', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>★ Creator Studio</div>
                <div style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>Fan Essays & Analysis</div>
              </div>
              <div style={{ color: '#888', fontSize: 8 }}>See all 47 →</div>
            </div>
            {/* Creator cards */}
            {[
              { title: 'The Upside Down Explained', creator: 'FilmTheoryHub', views: '1.2M', type: '🎬 Video Essay', badge: 'Top Creator' },
              { title: 'Every Hidden Clue in S4', creator: 'StrangerDeep', views: '890K', type: '🎙 Commentary', badge: null },
            ].map((card, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '7px 8px', alignItems: 'center' }}>
                <div style={{ width: 42, height: 42, borderRadius: 6, background: 'linear-gradient(135deg, #1a1a2e, #16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🎬</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#fff', fontSize: 8, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.title}</div>
                  <div style={{ color: '#888', fontSize: 7, marginTop: 1 }}>{card.creator} · {card.views} views</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 3, alignItems: 'center' }}>
                    <span style={{ color: '#f5c518', fontSize: 7 }}>{card.type}</span>
                    {card.badge && <span style={{ background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)', borderRadius: 3, padding: '1px 4px', fontSize: 6, fontWeight: 700, color: '#f5c518' }}>{card.badge}</span>}
                  </div>
                </div>
                <div style={{ color: '#e50914', fontSize: 16, flexShrink: 0 }}>▶</div>
              </div>
            ))}
          </div>
          <NetflixBottomNav active="Home" />
        </div>
      </PhoneMockup>

      {/* Screen 2: Creator dashboard */}
      <PhoneMockup label="Creator dashboard — earnings, views, subscriber growth">
        <div style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NetflixTopBar title="Creator Studio" />
          {/* Creator header */}
          <div style={{ padding: '8px 12px', background: 'rgba(245,197,24,0.06)', borderBottom: '1px solid rgba(245,197,24,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #f5c518, #e5a800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#000' }}>FT</div>
            <div>
              <div style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>FilmTheoryHub</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ background: 'rgba(245,197,24,0.2)', border: '1px solid rgba(245,197,24,0.4)', borderRadius: 3, padding: '1px 5px', fontSize: 6, fontWeight: 800, color: '#f5c518' }}>★ TOP CREATOR</div>
                <span style={{ color: '#555', fontSize: 7 }}>84.2K followers</span>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 12px' }}>
            {[
              { label: 'This Month', value: '$2,840', sub: '+18% vs last month', color: '#22c55e' },
              { label: 'Total Views', value: '4.8M', sub: 'across 12 videos', color: '#f5c518' },
              { label: 'Avg. Watch Time', value: '87%', sub: 'completion rate', color: '#3b82f6' },
              { label: 'New Followers', value: '+1,240', sub: 'this month', color: '#a855f7' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ color: '#666', fontSize: 7, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 2 }}>{s.label}</div>
                <div style={{ color: s.color, fontSize: 16, fontWeight: 900 }}>{s.value}</div>
                <div style={{ color: '#555', fontSize: 7 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          {/* Upload button */}
          <div style={{ padding: '0 12px 8px' }}>
            <div style={{ background: '#f5c518', borderRadius: 8, padding: '8px', textAlign: 'center', fontSize: 10, fontWeight: 800, color: '#000' }}>+ Upload New Essay</div>
          </div>
          {/* Recent videos */}
          <div style={{ padding: '0 12px', flex: 1 }}>
            <div style={{ color: '#666', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Recent Videos</div>
            {[
              { title: 'The Upside Down Explained', views: '1.2M', earnings: '$840', status: 'live' },
              { title: 'Every Hidden Clue in S4', views: '890K', earnings: '$612', status: 'live' },
            ].map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 4, background: 'linear-gradient(135deg, #1a1a2e, #16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>🎬</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#ddd', fontSize: 8, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</div>
                  <div style={{ color: '#555', fontSize: 7 }}>{v.views} views</div>
                </div>
                <div style={{ color: '#22c55e', fontSize: 8, fontWeight: 700, flexShrink: 0 }}>{v.earnings}</div>
              </div>
            ))}
          </div>
          <NetflixBottomNav active="Home" />
        </div>
      </PhoneMockup>
    </div>
  )
}

const concept: ConceptData = {
  id: 'creator-studio',
  name: 'Creator Studio',
  tagline: 'Fan creativity becomes a Netflix content flywheel',
  description:
    'Creator Studio gives Netflix subscribers tools to make, publish, and monetize fan-created content layered on top of Netflix originals — video essays, commentary tracks, reaction overlays, and scene analysis — turning the most passionate viewers into content creators who extend the life and reach of every show.',
  color: '#f5c518',
  colorDark: '#c09b00',
  icon: <Star size={36} />,
  nceScore: 0,
  maxUsers: 45,

  problemStatement:
    'YouTube and TikTok are flooded with fan-made Netflix content — video essays, reaction videos, theory deep-dives, and scene breakdowns. This content drives massive traffic and discovery for Netflix, but Netflix captures none of the creator relationship, none of the monetization, and none of the engagement. Fans who create content about Netflix shows are the most valuable, highest-retention segment in the subscriber base — and they\'re doing it entirely on someone else\'s platform.',

  insightQuote:
    'The most loyal Netflix subscribers are the ones who talk about our shows between episodes. Creator Studio is how we give them a microphone — and keep that conversation inside Netflix.',
  insightSource: 'Fan Engagement Strategy, Content Partnerships',

  targetUser: 'Superfan creators aged 16–30 across drama, anime, and genre content',
  targetUserDetail:
    'These are subscribers who finish a 10-episode season in 48 hours, then spend the next week on Reddit and YouTube discussing it. They have 1K–500K social followers, post about Netflix content regularly, and have strong opinions about endings. They\'re not looking for permission — they\'re already creating. Creator Studio gives them better tools and a bigger stage.',

  features: [
    {
      icon: <Film size={18} />,
      title: 'Commentary Track Studio',
      description: 'Record and publish a commentary audio/video track that syncs perfectly over any Netflix episode — accessible by any subscriber as an alternate audio channel.',
      techNote: 'Tracks stored as timestamp-offset overlays, not re-encoded video; no licensing complications',
    },
    {
      icon: <Mic2 size={18} />,
      title: 'Scene Analysis Tools',
      description: 'Frame-by-frame annotation, chapter markers, side-by-side comparisons, and text overlay tools for creating analytical video essays inside the Netflix player.',
      techNote: 'Web-based video editing with WebGL rendering; export to Creator Studio-hosted format',
    },
    {
      icon: <BookOpen size={18} />,
      title: 'Theory & Lore Database',
      description: 'A structured wiki-style layer over every Netflix original — fan-contributed character timelines, episode connections, hidden details, and confirmed/unconfirmed theories.',
      techNote: 'Collaborative editing with version history; Netflix Editorial moderates flagged content',
    },
    {
      icon: <Star size={18} />,
      title: 'Creator Profiles & Following',
      description: 'Subscribers follow their favorite creators and get notified when they publish new commentary tracks or analyses for shows they\'re watching.',
      techNote: 'Social graph stored separately from primary recommendation graph; opt-in follow',
    },
    {
      icon: <TrendingUp size={18} />,
      title: 'Creator Monetization',
      description: 'Top creators earn a share of the subscription revenue attributable to subscribers who engage primarily with their content — similar to YouTube Partner Program.',
      techNote: 'Attribution model: weighted engagement time on creator content vs. baseline',
    },
    {
      icon: <Award size={18} />,
      title: 'Netflix Creator Certification',
      description: 'Official "Netflix Certified Creator" badge for top-performing creators — unlocks advanced tools, early access to content, and direct relationship with Netflix show teams.',
      techNote: 'Tiered certification: Bronze/Silver/Gold based on engagement metrics',
    },
    {
      icon: <Users size={18} />,
      title: 'Creator Collaboration Tools',
      description: 'Co-creation features allowing two creators to produce a split-screen reaction or debate format — recorded asynchronously and published as a unified track.',
      techNote: 'Async audio recording with waveform alignment and latency compensation',
    },
    {
      icon: <DollarSign size={18} />,
      title: 'Brand Partnership Marketplace',
      description: 'Netflix-brokered brand deals for top creators — Netflix takes a platform fee while creators access brand budgets without needing an agent or management.',
      techNote: 'Managed marketplace with Netflix approval on all brand content to ensure quality',
    },
  ],

  userJourney: [
    {
      step: 1,
      actor: 'user',
      action: 'Finishes season finale of a Netflix original',
      outcome: '"Create your take" CTA appears in the post-play screen — low-friction entry point at peak emotional engagement.',
    },
    {
      step: 2,
      actor: 'user',
      action: 'Opens Creator Studio and selects "Commentary Track"',
      outcome: 'Guided creation flow with recording tools, timestamp markers, and preview mode. First creation typically takes 45 minutes.',
    },
    {
      step: 3,
      actor: 'system',
      action: 'Creator publishes track — distributed to their followers and the show\'s fan page',
      outcome: 'Followers notified. Track appears on the episode page under "Fan Takes." Quality moderation runs within 2 hours.',
    },
    {
      step: 4,
      actor: 'user',
      action: 'Other subscribers discover and play the commentary track',
      outcome: 'Subscribers re-watch episodes with fan commentary — driving repeat viewing that Netflix would otherwise never recapture.',
    },
    {
      step: 5,
      actor: 'netflix',
      action: 'Top tracks are editorially featured on show pages',
      outcome: 'Editorial curation drives massive traffic to top creators — incentivizing more creation and validating the quality bar.',
    },
    {
      step: 6,
      actor: 'system',
      action: 'Creator reaches Silver tier — earns revenue share',
      outcome: 'First monetization event converts a passion project into a part-time income. Creator deepens commitment, produces more content, retains indefinitely.',
    },
  ],

  networkEffects: [
    {
      trigger: 'First creator publishes commentary on a hit show',
      mechanism: 'Their followers re-watch the show to consume the creator\'s take — driving repeat viewing hours on titles Netflix already owns.',
      compounding: 'Each creator adds marginal viewing hours to catalog at near-zero incremental content cost',
    },
    {
      trigger: 'Creator follower graphs grow inside Netflix',
      mechanism: 'Social graph within Netflix increases stickiness — subscribers follow 5+ creators stay 3× longer because they have reasons to return unrelated to new content.',
      compounding: 'Social graph density is directly anti-correlated with churn probability',
    },
    {
      trigger: 'Catalog depth increases via fan lore layer',
      mechanism: 'Shows with rich fan-created theory/lore databases have higher re-watch rates. Older catalog titles become evergreen when fans keep adding new analysis.',
      compounding: 'Cost per viewing hour on older catalog drops as fan content re-activates it — catalog ROI improves continuously',
    },
    {
      trigger: 'Creator certification drives quality bar',
      mechanism: 'As top creators earn more, competition for certification raises average content quality — creating a positive selection pressure that improves subscriber experience over time.',
      compounding: 'Higher quality creator content → more subscriber engagement → more creator revenue → more creator investment → higher quality',
    },
  ],

  metrics: [
    { label: 'Monthly Active Creators', value: '2M', target: '5M', timeframe: 'Year 2', color: '#f5c518' },
    { label: 'Catalog Re-Watch Lift', value: '+31%', target: '+50%', timeframe: 'for shows with >100 tracks', color: '#ffd700' },
    { label: 'Creator Retention Rate', value: '94%', target: '96%', timeframe: 'annual', color: '#f5c518' },
    { label: 'Fan Content Views/Month', value: '500M', target: '1B', timeframe: 'Year 3', color: '#e6b800' },
  ],

  revenueModel:
    'Creator Studio operates on a platform revenue model: (1) Creator Revenue Share — Netflix retains 30% of monetization payouts, similar to app store economics, (2) Brand Marketplace fees — 15% platform fee on all brand partnership deals brokered through Netflix, (3) Creator tier subscription — a "Creator Pro" add-on at $4/month for professional editing tools, analytics dashboard, and early content access. The primary ROI driver is catalog extension — creator content extends the effective life of every original, reducing content cost per viewing hour.',

  goToMarket: [
    'Seed program: recruit 500 top Netflix-adjacent YouTube creators (those already making Netflix content) with early access, dedicated support, and guaranteed editorial featuring for their first Creator Studio tracks.',
    'Launch alongside a highly anticipated season (Stranger Things, Bridgerton) to maximize first-wave creator energy — the show\'s release is the creator\'s creative prompt.',
    'Creator leaderboards per show — publicly visible rankings create competitive incentive and surface best content organically to casual subscribers.',
    'School and university partnerships: Creator Studio as a legitimate media studies project platform — drives youth adoption and next-gen creator pipeline.',
    'Netflix Creator Summit: annual event (virtual + in-person) celebrating top creators, connecting them with show writers and directors, generating earned media and deepening loyalty.',
  ],

  timeline: [
    {
      phase: 'Creator Tools (Alpha)',
      months: 'Months 1–4',
      milestones: [
        'Commentary track recording + publishing',
        'Creator profiles with follower graph',
        'Episode page "Fan Takes" section',
        'Basic content moderation pipeline',
      ],
    },
    {
      phase: 'Monetization (Beta)',
      months: 'Months 5–10',
      milestones: [
        'Revenue share program for top 1,000 creators',
        'Scene analysis and annotation tools',
        'Theory/lore database per show',
        'Creator certification tiers',
      ],
    },
    {
      phase: 'Ecosystem (GA)',
      months: 'Months 11–20',
      milestones: [
        'Brand partnership marketplace',
        'Creator collaboration (co-commentary)',
        'Creator analytics dashboard',
        'International creator program launch',
      ],
    },
  ],

  risks: [
    {
      risk: 'Content licensing complications — fan commentary layered over copyrighted content may create legal grey areas in some jurisdictions.',
      mitigation: 'Commentary tracks are audio/overlay only — no re-encoding of source video. Legal pre-clearance per market. Commentary explicitly framed as editorial, not reproduction.',
    },
    {
      risk: 'Low-quality or toxic creator content damages subscriber experience and brand perception.',
      mitigation: 'Moderation queue with 2-hour SLA for flagged content. Creator accountability score — sustained quality violations result in demotion or removal from program.',
    },
    {
      risk: 'Creator monetization creates incentive for engagement farming over quality — quantity over substance.',
      mitigation: 'Monetization model weighted by watch completion rate and subscriber retention, not raw view count — quality content earns more than clickbait.',
    },
    {
      risk: 'Top creators build audiences inside Netflix then migrate back to YouTube where monetization is higher.',
      mitigation: 'Netflix must offer competitive or superior economics to keep top creators. Creator-exclusive perks (early content access, show team connections) create non-financial lock-in.',
    },
  ],
}

const conceptWithMockup: ConceptData = {
  ...concept,
  mockup: <CreatorStudioMockup />,
  execSummary: {
    why: "Fan creators are already making Netflix content — video essays, commentary tracks, reaction videos — and building audiences of millions on YouTube. Netflix gets zero revenue from that engagement, zero retention signal, and zero credit for the content that inspired it.",
    impact: "Estimated $300–600M in annual creator revenue currently flows to YouTube for Netflix-IP content. Creator Studio captures that flywheel inside the platform and turns one-time viewers into subscribers with a reason to stay after the finale drops.",
    edge: "Only Netflix can offer creators what they actually want: proximity to the source content and a 260M subscriber audience that no YouTube channel can reach. The content is the moat. Creator Studio is just the door.",
  },
  kevinsTake: "I've built creator monetization tools at scale. The insight that always held: creators follow the audience, not the platform. Netflix has the audience — 260M subscribers who already love the IP these creators are building on. Creator Studio is not a bet on creators choosing Netflix. It's the product that makes the choice obvious.",
}

export default function CreatorStudioPage() {
  return <ConceptLayout concept={conceptWithMockup} siblings={SIBLINGS} />
}
