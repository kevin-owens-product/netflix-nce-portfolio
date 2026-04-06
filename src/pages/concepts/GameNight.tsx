import { Gamepad2, Users, Trophy, Zap, Star, Globe, BarChart2, Tv2 } from 'lucide-react'
import ConceptLayout, { type ConceptData } from './ConceptLayout'
import { SIBLINGS } from './siblings'

const concept: ConceptData = {
  id: 'game-night',
  name: 'Game Night',
  tagline: 'Multiplayer gaming built on Netflix IP — where the screen becomes the game board',
  description:
    'Game Night transforms Netflix IP into multiplayer mini-games, trivia battles, and party games playable directly from the Netflix app — using the TV screen as a shared display while players use their phones as controllers, with no downloads, no consoles, and no friction.',
  color: '#00d4aa',
  colorDark: '#00a882',
  icon: <Gamepad2 size={36} />,
  nceScore: 3,
  maxUsers: 70,

  problemStatement:
    'Netflix already has 50+ mobile games with almost zero discoverability — buried in menus, requiring separate downloads, and disconnected from the content subscribers love. Meanwhile, party gaming is exploding: Jackbox games generate $100M+ annually from a single use case. Netflix has world-class IP (Stranger Things, Squid Game, Money Heist) that fans would pay to play as a game — but the current mobile game strategy squanders that IP on forgettable tile-tappers.',

  insightQuote:
    'The best party game is the one already on the TV. If Netflix is already on, Game Night is already set up.',
  insightSource: 'Gaming Strategy Review, Product Innovation Lab',

  targetUser: 'Friend groups and family households aged 18–45 for social game nights',
  targetUserDetail:
    'People who own a Netflix subscription and a TV — which is everyone. The specific occasion is "Friday night, 4 people, what do we do?" — currently answered by Jackbox, board games, or a movie. Game Night targets this exact moment with zero setup friction: you\'re already on Netflix, the game starts in 10 seconds, everyone uses their phone as a controller.',

  features: [
    {
      icon: <Tv2 size={18} />,
      title: 'Phone-as-Controller',
      description: 'No app download required — players join via QR code or 4-digit room code on their phone browser. The TV runs the game; phones are the controller, buzzer, and voting pad.',
      techNote: 'WebSocket-based room server; phone UI served as PWA from game.netflix.com',
    },
    {
      icon: <Trophy size={18} />,
      title: 'Netflix IP Trivia Battles',
      description: 'Real-time trivia using questions drawn from actual Netflix content — "Stranger Things: The Quiz", "Bridgerton: The Character Challenge" — with scene clips as question prompts.',
      techNote: 'Question bank auto-generated from content metadata + editorial review; scene clips served from CDN',
    },
    {
      icon: <Star size={18} />,
      title: 'Squid Game-Style Elimination Games',
      description: 'Party mini-games with IP-authentic aesthetics and rules — physical challenge simulations using phone motion sensors, timed voting, and audience-elimination mechanics.',
      techNote: 'DeviceOrientation API for motion; fallback to tap-based controls',
    },
    {
      icon: <Zap size={18} />,
      title: 'Live Audience Mode',
      description: 'For shows like Survivor or The Circle — watch parties where subscribers vote in real time on elimination outcomes alongside the in-show contestants.',
      techNote: 'Synced with Netflix Live broadcast; votes aggregated server-side in <100ms',
    },
    {
      icon: <Users size={18} />,
      title: 'Social Deduction Games',
      description: '"Who\'s the Traitor" (Bridgerton-themed), "Among Us"-style hidden role games — all set in Netflix universes, designed for 4–12 players.',
      techNote: 'Role assignment server-side; private actions via phone prevent TV screen spoilers',
    },
    {
      icon: <BarChart2 size={18} />,
      title: 'Leaderboards & Seasons',
      description: 'Monthly Game Night seasons with cumulative leaderboards per game, per friend group, and globally — driving recurring engagement beyond a single session.',
      techNote: 'Season state managed server-side; personal stats stored per account',
    },
    {
      icon: <Globe size={18} />,
      title: 'Cross-Region Play',
      description: 'Family members in different countries play together using the same TV-as-hub model — low-latency matchmaking routes to optimal server region automatically.',
      techNote: 'GeoDNS-based server routing; <80ms latency target for cross-region rooms',
    },
    {
      icon: <Gamepad2 size={18} />,
      title: 'Daily Puzzle Challenges',
      description: 'Solo or co-op daily puzzle based on Netflix content — a "Wordle"-style daily ritual that drives app opens independent of new content releases.',
      techNote: 'One puzzle per day, globally identical; social sharing of results without spoilers',
    },
  ],

  userJourney: [
    {
      step: 1,
      actor: 'user',
      action: 'Friends arrive for Friday game night — Netflix is already on',
      outcome: '"Game Night" tab visible in Netflix homepage. Host opens it with one tap — no setup, no hunting for remotes.',
    },
    {
      step: 2,
      actor: 'user',
      action: 'Selects "Stranger Things: The Upside Down Trivia"',
      outcome: 'QR code appears on TV screen. Each guest scans with phone camera — join takes 8 seconds per person. No app downloads.',
    },
    {
      step: 3,
      actor: 'system',
      action: 'Game begins — phones are now controllers',
      outcome: 'Scene clips from Stranger Things appear as trivia prompts. Players buzz in on phone. TV shows scores, wrong answers, and dramatic countdowns.',
    },
    {
      step: 4,
      actor: 'user',
      action: 'Winning player earns "Eleven\'s Crown" badge',
      outcome: 'Badge appears on subscriber profile. Social share card generated. Game night leaderboard updates — seeding next week\'s rematch.',
    },
    {
      step: 5,
      actor: 'netflix',
      action: 'Post-game screen suggests "Watch the episode that had the most questions you missed"',
      outcome: 'Game drives catalog viewing — guests who didn\'t know Stranger Things answers are now motivated to watch it. IP marketing through gameplay.',
    },
    {
      step: 6,
      actor: 'system',
      action: 'Sends "Game Night rematch?" notification before next weekend',
      outcome: 'Weekly cadence established. Game Night becomes a recurring social ritual anchored to Netflix — competing with, and beating, Jackbox for the occasion.',
    },
  ],

  networkEffects: [
    {
      trigger: 'One subscriber hosts a Game Night session',
      mechanism: 'Non-subscriber guests join via QR code — they experience Netflix\'s content IP without a subscription. "How do I play this at home?" prompt appears at session end.',
      compounding: 'Average Game Night session includes 1.4 non-subscribers; conversion rate estimated 8–12% within 30 days',
    },
    {
      trigger: 'Friend group forms a recurring Game Night habit',
      mechanism: 'Recurring sessions create group lock-in — the "Game Night subscription" is now load-bearing social infrastructure. One person cancelling breaks the ritual for the group.',
      compounding: 'Subscribers in active Game Night groups churn at 25% of the rate of solo subscribers',
    },
    {
      trigger: 'Leaderboard competition drives weekly returns',
      mechanism: 'Season leaderboards give subscribers a reason to open Netflix every weekend — independent of new content releases, eliminating the "nothing to watch" churn trigger.',
      compounding: 'Game Night subscribers average 2.1 additional app opens per week; each app open = 40% chance of starting an on-demand title',
    },
    {
      trigger: 'Viral social sharing of game results',
      mechanism: 'Shareable score cards ("I just ranked #2 in Squid Game Trivia globally") drive curiosity among non-subscribers on social media.',
      compounding: 'Score shares have 3× click-through rate vs. standard Netflix social posts based on Jackbox comparable',
    },
  ],

  metrics: [
    { label: 'Monthly Game Night Sessions', value: '40M', target: '80M', timeframe: 'Year 2', color: '#00d4aa' },
    { label: 'Non-Sub Conversion Rate', value: '9%', target: '12%', timeframe: 'per game guest', color: '#00e5bb' },
    { label: 'Weekly App Opens (gamers)', value: '+2.1×', target: '+3×', timeframe: 'vs. non-gamers', color: '#00d4aa' },
    { label: 'Churn (active game groups)', value: '-60%', target: '-70%', timeframe: 'vs. solo subs', color: '#00c49a' },
  ],

  revenueModel:
    'Game Night is primarily a retention and acquisition flywheel. Revenue model: (1) Guest conversion — the ~1.4 non-subscriber guests per session at 9% conversion = significant organic acquisition at near-zero CAC, (2) Game Night add-on — a "Game Night Pro" tier at $3/month unlocks premium games, seasonal content, and custom IP skins, (3) Brand integrations — limited branded game nights (e.g., "Coca-Cola presents: The Netflix Quiz") at defined integration points, and (4) reduced churn — the primary economic driver, worth $8–15/subscriber/month in retained revenue.',

  goToMarket: [
    'Launch with Stranger Things and Squid Game trivia on the same day as next major season premiere — maximum IP relevance and existing fan energy.',
    'Free-to-all subscribers at launch — no paywall friction. The goal is establishing the habit and measuring engagement before introducing monetization.',
    'Target Gen Z and Millennial households via partnership with college dormitory programs and apartment living platforms — position as the "Jackbox replacement for people who already have Netflix."',
    'Game Night Holiday Special: a live, globally simultaneous game night event during December holiday season — position it as the "Netflix New Year\'s Eve Game Show."',
    'Creator integration: let Creator Studio certified creators design official Game Night trivia decks — they earn revenue share on plays, creating an incentive to promote their deck.',
  ],

  timeline: [
    {
      phase: 'Core Games (Alpha)',
      months: 'Months 1–4',
      milestones: [
        'Phone-as-controller infrastructure (QR + WebSocket)',
        'Stranger Things + Squid Game trivia packs',
        'Score leaderboards per session',
        'Post-game content recommendation hook',
      ],
    },
    {
      phase: 'Social Layer (Beta)',
      months: 'Months 5–9',
      milestones: [
        'Friend group leaderboards',
        'Social deduction game (1 Netflix IP)',
        'Daily puzzle challenge launch',
        'Season pass system and badges',
      ],
    },
    {
      phase: 'Platform Scale (GA)',
      months: 'Months 10–18',
      milestones: [
        '10 IP game packs at launch',
        'Game Night Pro tier ($3/month)',
        'Cross-region multiplayer',
        'Creator-designed trivia decks marketplace',
      ],
    },
  ],

  risks: [
    {
      risk: 'Game quality is poor — Netflix gaming has a track record of launching forgettable mobile games that subscribers ignore.',
      mitigation: 'Partner with proven party game studios (Jackbox, etc.) for first-party game design. Internal Netflix Games team focuses on IP authenticity; partner studios provide game mechanics expertise.',
    },
    {
      risk: 'QR code and phone-as-controller UX has friction points for older demographics and poor-WiFi environments.',
      mitigation: 'Text-based room code as fallback. Pre-testing in 15+ living room environments across age ranges. Offline-capable phone UI for low-connectivity situations.',
    },
    {
      risk: 'IP licensing for game use may be restricted for content Netflix distributes but doesn\'t own (licensed titles).',
      mitigation: 'Launch with Netflix Originals only — 100% IP ownership. Expand to licensed content where game rights are separately negotiated.',
    },
    {
      risk: 'Game Night cannibilizes Watch Together time — subscribers game instead of watching, reducing viewing hours.',
      mitigation: 'Design post-game flows to drive content viewing. Measure incremental subscriber time, not just viewing hours. A subscriber who games and watches is more valuable than one who only watches.',
    },
  ],
}

export default function GameNightPage() {
  return <ConceptLayout concept={concept} siblings={SIBLINGS} />
}
