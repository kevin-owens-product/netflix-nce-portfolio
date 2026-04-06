import { Star, Film, Mic2, BookOpen, TrendingUp, Award, Users, DollarSign } from 'lucide-react'
import ConceptLayout, { type ConceptData } from './ConceptLayout'
import { SIBLINGS } from './siblings'

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

export default function CreatorStudioPage() {
  return <ConceptLayout concept={concept} siblings={SIBLINGS} />
}
