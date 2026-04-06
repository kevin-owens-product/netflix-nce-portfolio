import { Video, Users, MessageCircle, Heart, Share2, Tv2, Bell, Mic2 } from 'lucide-react'
import ConceptLayout, { type ConceptData } from './ConceptLayout'
import { SIBLINGS } from './siblings'

const concept: ConceptData = {
  id: 'watch-together',
  name: 'Watch Together',
  tagline: 'Synchronized co-viewing that turns watching into a shared moment',
  description:
    'Watch Together enables Netflix subscribers to stream any title in perfect sync with friends and family anywhere in the world — with live emoji reactions, voice/text chat, and shared timestamps that make every watch session a social event.',
  color: '#e50914',
  colorDark: '#b20710',
  icon: <Video size={36} />,
  nceScore: 2,
  maxUsers: 85,

  problemStatement:
    'Netflix is fundamentally a solitary experience — you watch alone, then discuss asynchronously on social media or in text threads. Yet 68% of subscribers say they "wish they could watch with someone" regularly (internal survey proxy). The social layer exists outside the product, bleeding engagement to Discord, FaceTime, and third-party sync apps. This is a churn signal and a missed retention opportunity.',

  insightQuote:
    'The most-shared Netflix moments happen off-platform. Our job is to make Netflix the place where those moments happen — and the place people return to because of them.',
  insightSource: 'Product thesis, Netflix Social Viewing Initiative',

  targetUser: 'Long-distance households & friend groups aged 18–34',
  targetUserDetail:
    'Couples in different cities, college friends dispersed post-graduation, and families separated by time zones. They already co-watch via workarounds (phone on speaker, Teleparty extension) — Watch Together removes the friction and brings the experience natively into Netflix.',

  features: [
    {
      icon: <Tv2 size={18} />,
      title: 'Frame-Perfect Sync',
      description: 'Sub-200ms latency synchronization across devices and network conditions. Adaptive buffer management handles variable connections without breaking sync.',
      techNote: 'WebSocket-based sync protocol with NTP offset correction',
    },
    {
      icon: <Heart size={18} />,
      title: 'Live Reaction Layer',
      description: 'Floating emoji reactions that appear timestamped over the video — tied to the exact scene, not the clock. Revisitable as a "reaction replay" after watching.',
      techNote: 'Reactions stored as timestamp offsets, not wall-clock time',
    },
    {
      icon: <MessageCircle size={18} />,
      title: 'In-Player Chat',
      description: 'Persistent chat drawer with auto-pause-on-message option. Smart auto-scroll pauses when you scroll up to read history, resumes on new message.',
      techNote: 'Local-first message queue with eventual consistency',
    },
    {
      icon: <Mic2 size={18} />,
      title: 'Voice Watch Rooms',
      description: 'Opt-in spatial voice channel inside the player — hear your friends react in real time without leaving the Netflix app or opening a second device.',
      techNote: 'WebRTC peer mesh for ≤4 participants, SFU for 5+',
    },
    {
      icon: <Users size={18} />,
      title: 'Watch Party Scheduling',
      description: 'Create events with an RSVP list, automatic calendar invites, and pre-session recommendations based on the group\'s combined taste profile.',
      techNote: 'Integrates with iOS/Android calendar and Google Calendar',
    },
    {
      icon: <Share2 size={18} />,
      title: 'Social Clips & Highlights',
      description: 'Capture 15-second clips from a session with your group\'s reactions overlaid. One-tap share to Instagram, TikTok, or a Netflix-hosted highlight reel.',
      techNote: 'Client-side compositing with server-side CDN hosting',
    },
    {
      icon: <Bell size={18} />,
      title: 'Watch-With Notifications',
      description: '"Your friend just started Stranger Things Season 5 — join them?" push notifications that convert solo starts into co-viewing sessions.',
      techNote: 'Presence API + notification throttling to prevent fatigue',
    },
    {
      icon: <Video size={18} />,
      title: 'Reaction Replay Mode',
      description: 'After a session, watch any title with the recorded reactions of your group overlaid — relive the moments or share with friends who missed it.',
      techNote: 'Reaction timeline stored server-side per session ID',
    },
  ],

  userJourney: [
    {
      step: 1,
      actor: 'user',
      action: 'Opens title detail page on Netflix',
      outcome: '"Watch Together" button appears alongside solo "Play" — frictionless discovery for an already-intended watch moment.',
    },
    {
      step: 2,
      actor: 'user',
      action: 'Invites friends via contacts, link, or Netflix profile',
      outcome: 'Friends receive push notification + email. Non-subscribers see a landing page prompting free trial — organic acquisition channel.',
    },
    {
      step: 3,
      actor: 'system',
      action: 'Creates synchronized watch room with lobby',
      outcome: 'Participants join lobby with avatars visible. Host can chat, set reactions preferences, and countdown-start the session.',
    },
    {
      step: 4,
      actor: 'user',
      action: 'Watches in sync — reacts, chats, laughs',
      outcome: 'Reactions float over video in real time. Chat auto-pauses at cliffhangers. Shared experience replaces the isolation of solo viewing.',
    },
    {
      step: 5,
      actor: 'netflix',
      action: 'Session ends — surfaces post-watch engagement',
      outcome: '"Next episode?" prompt extends the session. Reaction replay generated. "What to watch next" recommendations are group-aware.',
    },
    {
      step: 6,
      actor: 'system',
      action: 'Sends recap to all participants',
      outcome: 'Each user\'s "Watch Together" history builds a social graph — informing recommendations and watch-party scheduling for future sessions.',
    },
  ],

  networkEffects: [
    {
      trigger: 'First Watch Together session',
      mechanism: 'Each participant sees that Watch Together is possible — and is socially primed to initiate their own next session with different friends.',
      compounding: 'Virality coefficient estimated 0.3–0.6 new session starts per session observed',
    },
    {
      trigger: 'Reaction Replay goes viral on social',
      mechanism: 'Shared clips with group reactions drive organic curiosity and FOMO — non-subscribers follow the link and hit a free trial prompt.',
      compounding: 'Each viral clip = potential acquisition event; cost of acquisition ≈ $0 vs. $40+ paid CAC',
    },
    {
      trigger: 'Social graph density increases',
      mechanism: 'More sessions → richer co-viewing history → better group taste profiles → more relevant "Watch Together" recommendations surfaced.',
      compounding: 'Recommendation relevance improves logarithmically with session count, reducing time-to-play',
    },
    {
      trigger: 'Watch Party scheduling becomes a habit',
      mechanism: 'Regular scheduled sessions create calendar-committed retention — subscribers who have upcoming watch parties are 40% less likely to churn that month.',
      compounding: 'Each recurring group session adds durable retention value to every member simultaneously',
    },
  ],

  metrics: [
    { label: 'Co-view Sessions/Month', value: '120M', target: '200M', timeframe: 'Year 2', color: '#e50914' },
    { label: 'Retention Lift (co-viewers)', value: '+18%', target: '+25%', timeframe: 'vs. solo viewers', color: '#ff6b6b' },
    { label: 'Viral Acquisition Rate', value: '0.4', target: '0.6', timeframe: 'new subs/session', color: '#ffa07a' },
    { label: 'Avg Session Duration', value: '+22min', target: '+30min', timeframe: 'vs. solo viewing', color: '#e50914' },
  ],

  revenueModel:
    'Watch Together is a retention and acquisition driver, not a standalone revenue product. ROI is realized through (1) reduced churn — co-viewers churn at half the rate of solo viewers, worth ~$8/user/month in retained revenue, (2) organic acquisition — viral clips convert non-subscribers at $0 CAC vs. $40 paid, and (3) ad-supported tier upsell — Watch Together in the ad-supported plan creates premium conversion opportunities during high-engagement sessions.',

  goToMarket: [
    'Launch with top 10 returning shows (Stranger Things S5, Wednesday S2) to maximize first-mover social moments — these are the titles people already want to watch with others.',
    'Partner with 5 flagship "Watch Together" moments per quarter — finale nights, sports events, and live specials — with dedicated social amplification and influencer seeding.',
    'Build-in referral loop: every invite sent to a non-subscriber surfaces a targeted 30-day trial offer, tracked with attribution to measure co-viewing acquisition efficiency.',
    'Rollout sequence: Family plan subscribers first (built-in group), then Friends plan (new SKU), then Standard/Premium — each tier gets incremental social features to drive upgrade pressure.',
    'Partner with university housing programs and corporate remote-work communities as institutional pilots — provides data and testimonials for consumer launch.',
  ],

  timeline: [
    {
      phase: 'Foundation (Alpha)',
      months: 'Months 1–4',
      milestones: [
        'Frame-sync protocol shipped to 1% of Family plan users',
        'In-player text chat and emoji reactions',
        'Watch Party scheduling (iOS + Android)',
        'Internal dogfooding with Netflix teams',
      ],
    },
    {
      phase: 'Growth (Beta)',
      months: 'Months 5–9',
      milestones: [
        'Voice rooms for up to 8 participants',
        'Reaction Replay generation and sharing',
        'Social clips with one-tap share to 3 platforms',
        'Group taste profile for post-session recommendations',
      ],
    },
    {
      phase: 'Scale (GA)',
      months: 'Months 10–18',
      milestones: [
        'Watch-With push notifications (presence API)',
        'Watch Together available on all tiers with feature gating',
        'API for 3rd-party integration (smart TVs, game consoles)',
        'Reaction analytics dashboard for content teams',
      ],
    },
  ],

  risks: [
    {
      risk: 'Sync latency makes viewing uncomfortable on variable connections — especially international groups.',
      mitigation: 'Adaptive buffering with manual "resync" button; fallback to async reaction mode when latency > 500ms. Extensive testing across 50+ network profiles in alpha.',
    },
    {
      risk: 'Content licensing agreements may restrict co-viewing or recording for certain titles.',
      mitigation: 'Legal audit of all content contracts pre-launch. Reaction Replay is disabled per-title based on rights flag. Launch with Netflix Originals only (cleared rights).',
    },
    {
      risk: 'Privacy concerns around presence data (knowing when friends are watching what).',
      mitigation: 'Presence is opt-in, off by default. Granular controls: show/hide watching status per title or per friend. No presence data shared without explicit consent.',
    },
    {
      risk: 'Chat abuse and harassment in shared watch rooms.',
      mitigation: 'Host has full moderation controls. Real-time ML content moderation. One-tap mute/block that persists across all future sessions.',
    },
  ],
}

export default function WatchTogetherPage() {
  return <ConceptLayout concept={concept} siblings={SIBLINGS} />
}
