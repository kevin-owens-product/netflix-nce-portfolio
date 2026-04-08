import { Network, Users, TrendingUp, Sparkles, BarChart2, Globe, Zap, Star } from 'lucide-react'
import ConceptLayout, { type ConceptData } from './ConceptLayout'
import { SIBLINGS } from './siblings'

const concept: ConceptData = {
  id: 'taste-network',
  name: 'Taste Network',
  tagline: 'Your social graph is your recommendation engine — see what people like you actually watch',
  description:
    'Taste Network transforms Netflix\'s recommendation algorithm from a black box into a transparent social graph — letting subscribers see what friends, taste twins, and trusted tastemakers are watching, rating, and rewatching. It replaces "because you watched X" with "because someone whose taste matches yours loved this."',
  color: '#6366f1',
  colorDark: '#4338ca',
  icon: <Network size={36} />,
  nceScore: 3,
  maxUsers: 55,

  problemStatement:
    'Netflix\'s recommendation algorithm is powerful but opaque and impersonal. "Because you watched Stranger Things" tells you nothing about why someone else would love a show. Meanwhile, the most effective discovery mechanism in media has always been the same: "My friend, whose taste I trust, says I have to watch this." Netflix has 260M subscribers whose taste profiles are enormously rich — but subscribers have zero visibility into each other\'s opinions. Every trusted recommendation is happening off-platform, on Reddit, Twitter, and group chats. Netflix is sitting on the world\'s richest taste dataset and doing nothing social with it.',

  insightQuote:
    'The algorithm tells you what to watch next. A trusted friend tells you what you\'ll be obsessed with. Those are not the same thing.',
  insightSource: 'Product Research, Subscriber Discovery Behavior',

  targetUser: 'Culturally curious subscribers aged 22–45 who ask for recommendations before choosing what to watch',
  targetUserDetail:
    'These are the subscribers who post "what should I watch next?" in group chats, who maintain detailed ratings in spreadsheets, who have strong opinions about endings. They watch an average of 40% more unique titles per month than passive subscribers because they have strong discovery intent. They are also the subscribers most likely to churn when the algorithm stops surfacing things they care about — and most likely to stay when a trusted social layer keeps surprising them.',

  features: [
    {
      icon: <Users size={18} />,
      title: 'Taste Profile',
      description: 'A public-or-private profile showing your genre fingerprint, all-time favorites, recent rewatch counts, and "taste words" — the adjectives that describe what you love in stories.',
      techNote: 'Taste words derived from NLP analysis of viewing patterns + optional self-tagging',
    },
    {
      icon: <Network size={18} />,
      title: 'Taste Twins',
      description: 'Algorithmically matched "taste twins" — subscribers whose viewing and rating patterns most closely match yours, ranked by overlap score. Follow them to get their picks.',
      techNote: 'Collaborative filtering on rating + completion + rewatch vectors; privacy-safe matching',
    },
    {
      icon: <Star size={18} />,
      title: 'Social Ratings & Reviews',
      description: 'Rate and briefly review any title — visible to your followers and your taste twins. Reviews are short-form (280 chars max) and tied to your watch completion status.',
      techNote: 'Reviews moderated via ML + community flagging; no anonymous posting',
    },
    {
      icon: <TrendingUp size={18} />,
      title: 'Friend Activity Feed',
      description: '"Sarah just finished The Bear — 5 stars." A live, scrollable feed of what people in your taste network are watching, finishing, rewatching, and abandoning.',
      techNote: 'Activity feed is opt-in per-action; granular privacy: share ratings but not watch history',
    },
    {
      icon: <BarChart2 size={18} />,
      title: 'Taste Compatibility Score',
      description: 'When you view someone\'s profile, see your "taste compatibility" percentage — how much overlap exists between your viewing preferences on 12 genre dimensions.',
      techNote: 'Cosine similarity on genre-normalized viewing vectors; scores update weekly',
    },
    {
      icon: <Globe size={18} />,
      title: 'Tastemaker Lists',
      description: 'Certified Tastemakers — verified cultural voices (critics, authors, directors) — curate public lists inside Netflix. "Issa Rae\'s 10 shows that changed how I write dialogue."',
      techNote: 'Tastemaker verification tied to Creator Studio certification program',
    },
    {
      icon: <Sparkles size={18} />,
      title: 'Social Recommendation Layer',
      description: '"3 of your taste twins loved this" overlaid on the standard Netflix recommendation shelf — same algorithm, social proof layer on top. No UI redesign required.',
      techNote: 'Requires minimum 3 taste-twin data points to show social label; avoids false precision',
    },
    {
      icon: <Zap size={18} />,
      title: 'Weekly Taste Report',
      description: 'A weekly "Your Taste Network" digest — top picks from your taste twins this week, cultural moments in your genre preferences, and one surprise "outside your comfort zone" recommendation.',
      techNote: 'Push notification + in-app card; send time personalized by historical open-rate',
    },
  ],

  userJourney: [
    {
      step: 1,
      actor: 'user',
      action: 'Opts into Taste Network — imports existing rating history',
      outcome: 'Taste profile generated from existing viewing data. Genre fingerprint visualization shown. 12 "taste twins" suggested immediately — subscribers with 70%+ taste overlap.',
    },
    {
      step: 2,
      actor: 'system',
      action: 'Connects subscriber to friends on Netflix + suggests taste twins',
      outcome: 'Existing Netflix friends visible. Taste twins are strangers with matching tastes — a new discovery mechanism that feels personalized without being creepy.',
    },
    {
      step: 3,
      actor: 'user',
      action: 'Follows 3 taste twins and 1 Tastemaker',
      outcome: 'Homepage now shows "Social picks" shelf — titles loved by their network. Social signal overlaid on standard algorithm. Pick confidence increases because it\'s human-validated.',
    },
    {
      step: 4,
      actor: 'user',
      action: 'Rates a title and writes a 2-sentence review',
      outcome: 'Review visible to their followers. If highly rated by multiple subscribers with similar tastes, surfaces in others\' discovery feeds — organic distribution without a follower requirement.',
    },
    {
      step: 5,
      actor: 'netflix',
      action: 'Weekly Taste Report delivered Friday morning',
      outcome: 'Habit-forming weekly touch point. "Your taste twin Alex watched Severance for the 3rd time this week." Creates social accountability around recommendations.',
    },
    {
      step: 6,
      actor: 'system',
      action: 'Taste Network data improves core algorithm',
      outcome: 'Social signals (ratings, follows, abandonment) feed back into Netflix\'s core recommendation model — every Taste Network interaction makes the algorithm smarter for all 260M subscribers.',
    },
  ],

  networkEffects: [
    {
      trigger: 'First subscriber joins Taste Network and rates 5 titles',
      mechanism: 'Their ratings immediately improve recommendations for their taste twins — creating a give-first dynamic where the network becomes more valuable as each member contributes.',
      compounding: 'Each rating contributes to the collective intelligence of the taste graph; n ratings from m users creates n×m signal pairs',
    },
    {
      trigger: 'Taste twins discover each other across different subscriber demographics',
      mechanism: 'A 55-year-old in Ohio and a 23-year-old in Seoul have identical taste profiles — Taste Network surfaces this connection, driving discovery across demographics that the algorithm would never bridge.',
      compounding: 'Cross-demographic taste connections expose subscribers to content they wouldn\'t discover through solo browsing, increasing unique titles watched per subscriber by 25–40%',
    },
    {
      trigger: 'Social proof layer increases click-through on algorithm picks',
      mechanism: '"3 taste twins loved this" converts at 2.8× the rate of the same title without social validation — the recommendation credibility is borrowed from human trust.',
      compounding: 'Higher click-through reduces the "paralysis of choice" churn trigger — subscribers who find something to watch quickly are 50% less likely to switch apps',
    },
    {
      trigger: 'Tastemaker lists drive catalog discovery',
      mechanism: 'A Tastemaker list curated by a respected director drives viewership of older catalog titles that the algorithm would never surface to a cold audience.',
      compounding: 'Catalog titles with Tastemaker endorsements see a 5–12× viewership spike the week of publication; reduces effective cost-per-view on older content',
    },
  ],

  metrics: [
    { label: 'Monthly Active Taste Networkers', value: '15M', target: '35M', timeframe: 'Year 2', color: '#6366f1' },
    { label: 'Unique Titles/Month (social users)', value: '+38%', target: '+50%', timeframe: 'vs. non-social', color: '#818cf8' },
    { label: 'Social CTR on Recommendations', value: '2.8×', target: '3.5×', timeframe: 'vs. algo-only', color: '#6366f1' },
    { label: 'Churn Rate (Taste Network users)', value: '-28%', target: '-40%', timeframe: 'vs. non-social', color: '#4f46e5' },
  ],

  revenueModel:
    'Taste Network is a retention and engagement multiplier — the direct revenue model is churn reduction. Subscribers who actively use Taste Network churn at 28% lower rates, worth approximately $5–8/user/month in retained revenue at scale. Secondary value: (1) taste graph data improves content acquisition — Netflix can predict demand for specific content types with social signal data, reducing content spend risk, (2) Tastemaker partnerships create premium advertising inventory for prestige brands who want association with cultural arbiters, and (3) a "Taste Network Pro" add-on at $2/month unlocks full taste analytics, historical compatibility tracking, and early access to Tastemaker lists.',

  goToMarket: [
    'Seed with power users first: identify the top 1% of Netflix subscribers by rating activity (they already behave like Taste Network users) — give them early access and ask them to rate 20 titles to seed the taste graph.',
    'Tastmaker program launch: recruit 50 high-profile cultural voices (directors, authors, actors, critics) as founding Tastemakers with verified profiles and exclusive first lists. Announce all 50 on launch day.',
    'The "find your taste twin" onboarding hook: every new subscriber goes through a 3-minute taste calibration that immediately surfaces their top 3 taste twins — making the product\'s core value proposition tangible in under 5 minutes.',
    'Weekly Taste Report is the primary retention loop — the Friday email/notification that keeps Taste Network top-of-mind between binge sessions, even in content drought weeks.',
    'Partner with prestige film/TV press (A24, Criterion Collection community, IndieWire) to validate the cultural seriousness of the Tastemaker program and attract credible early voices.',
  ],

  timeline: [
    {
      phase: 'Graph Foundation',
      months: 'Months 1–4',
      milestones: [
        'Taste profile generation from existing viewing data',
        'Taste twin matching algorithm (collaborative filtering)',
        'Social ratings + short reviews (opt-in)',
        'Friend activity feed with granular privacy controls',
      ],
    },
    {
      phase: 'Discovery Layer',
      months: 'Months 5–9',
      milestones: [
        '"3 taste twins loved this" social overlay on algorithm shelf',
        'Tastemaker program launch (50 verified voices)',
        'Weekly Taste Report push notification',
        'Taste compatibility score on profile pages',
      ],
    },
    {
      phase: 'Network Effects',
      months: 'Months 10–18',
      milestones: [
        'Taste Network data feeds core recommendation model',
        'Taste Network Pro tier ($2/month)',
        'Public taste graph API for third-party apps',
        'Taste trend reports for Netflix content teams',
      ],
    },
  ],

  risks: [
    {
      risk: 'Privacy concerns — subscribers don\'t want Netflix to expose their viewing history to others, even opt-in.',
      mitigation: 'Radical privacy-first design: every social feature is off by default. Granular controls: share ratings but not titles, share genre fingerprint but not specific watches. Taste twins see overlap score, not your watch list.',
    },
    {
      risk: 'Taste twin matching could surface uncomfortable content preferences — someone matched on horror might not want to know their taste twin also watches problematic content.',
      mitigation: 'Matching runs on genre/tone vectors, not raw title lists. No title-level transparency between taste twins unless both parties explicitly share. Matching is similarity-based, not watch-history-based.',
    },
    {
      risk: 'The "social feed" UX is a solved problem (Instagram, Letterboxd) — subscribers may not see the need for it inside Netflix.',
      mitigation: 'The differentiator is not the social feed — it\'s the taste twin matching and the social overlay on Netflix\'s own algorithm. No other platform can offer "see what people with your exact taste profile loved" because no other platform has Netflix\'s viewing data.',
    },
    {
      risk: 'Low participation creates a cold-start problem — the taste graph has no value if only 5% of subscribers use it.',
      mitigation: 'Seeded by existing viewing data (no action required from subscriber) and Tastemaker-curated lists (valuable without any social connections). Value proposition works at 0 connections, improves with each one.',
    },
  ],
}

export default function TasteNetworkPage() {
  return <ConceptLayout concept={concept} siblings={SIBLINGS} />
}
