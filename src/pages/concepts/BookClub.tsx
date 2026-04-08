import { BookOpen, Users, MessageCircle, TrendingUp, Star, Bell, Globe, Layers } from 'lucide-react'
import ConceptLayout, { type ConceptData, PhoneMockup, NetflixTopBar, NetflixBottomNav } from './ConceptLayout'
import { SIBLINGS } from './siblings'

function BookClubMockup() {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-start">
      <PhoneMockup label="Book Club prompt after finishing Daisy Jones">
        <div style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NetflixTopBar title="Book Club" back />
          {/* Post-show prompt */}
          <div style={{ margin: '8px 10px', background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.04))', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '12px 12px' }}>
            <div style={{ color: '#22c55e', fontSize: 7, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>📚 Book Club</div>
            <div style={{ color: '#fff', fontSize: 10, fontWeight: 800, lineHeight: 1.3, marginBottom: 4 }}>The show was adapted from a bestselling novel</div>
            <div style={{ color: '#888', fontSize: 8, marginBottom: 10, lineHeight: 1.4 }}>14,200 subscribers have read Daisy Jones & The Six — join the discussion</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ background: '#22c55e', borderRadius: 6, padding: '6px 14px', fontSize: 9, fontWeight: 800, color: '#fff' }}>Join Book Club</div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '6px 10px', fontSize: 9, color: '#888' }}>Not now</div>
            </div>
          </div>
          {/* Reading group */}
          <div style={{ padding: '0 12px' }}>
            <div style={{ color: '#666', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Your Reading Group</div>
            {[
              { initials: 'SL', name: 'Sarah L.', color: '#3b82f6', progress: 'Chapter 8', status: '🟢 Reading now' },
              { initials: 'MR', name: 'Mike R.', color: '#22c55e', progress: 'Finished!', status: '✅ Done' },
              { initials: 'JK', name: 'Jess K.', color: '#f5c518', progress: 'Chapter 3', status: '🟡 Just started' },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: '#fff', flexShrink: 0 }}>{m.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#ddd', fontSize: 9, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ color: '#555', fontSize: 7 }}>{m.progress}</div>
                </div>
                <div style={{ color: '#888', fontSize: 7 }}>{m.status}</div>
              </div>
            ))}
          </div>
          {/* Discussion threads */}
          <div style={{ padding: '0 12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, marginTop: 4 }}>
            <div style={{ color: '#666', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Recent Discussions</div>
            {[
              { title: 'The ending was completely different from the show', chapter: 'Ch. 28 · Spoilers', replies: 42 },
              { title: 'Did Billy deserve his redemption arc?', chapter: 'Ch. 14 · No spoilers', replies: 27 },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '7px 9px', marginBottom: 6 }}>
                <div style={{ color: '#ddd', fontSize: 8, fontWeight: 600, lineHeight: 1.3 }}>{t.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <span style={{ color: '#22c55e', fontSize: 7 }}>{t.chapter}</span>
                  <span style={{ color: '#555', fontSize: 7 }}>{t.replies} replies</span>
                </div>
              </div>
            ))}
          </div>
          <NetflixBottomNav active="Home" />
        </div>
      </PhoneMockup>

      <PhoneMockup label="Book vs Show comparison — chapter-by-chapter breakdown">
        <div style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NetflixTopBar title="Book vs Show" back />
          {/* Header */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 8, padding: '6px 8px', textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: 8, fontWeight: 900 }}>📖 Book</div>
              <div style={{ color: '#888', fontSize: 7 }}>Taylor Jenkins Reid</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(229,9,20,0.08)', border: '1px solid rgba(229,9,20,0.2)', borderRadius: 8, padding: '6px 8px', textAlign: 'center' }}>
              <div style={{ color: '#e50914', fontSize: 8, fontWeight: 900 }}>🎬 Show</div>
              <div style={{ color: '#888', fontSize: 7 }}>Amazon/Netflix Adaptation</div>
            </div>
          </div>
          {/* Comparison items */}
          <div style={{ padding: '8px 10px', flex: 1, overflow: 'auto' }}>
            <div style={{ color: '#666', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Key Differences</div>
            {[
              { type: 'Changed', title: "Daisy's backstory", detail: 'Much more detail in book', color: '#f5c518', emoji: '✏️' },
              { type: 'Cut', title: "Graham's subplot", detail: 'Removed entirely from show', color: '#ef4444', emoji: '✂️' },
              { type: 'Added', title: 'Concert visuals', detail: 'Enhanced for screen only', color: '#22c55e', emoji: '✨' },
              { type: 'Changed', title: 'The ending', detail: 'More ambiguous in novel', color: '#f5c518', emoji: '✏️' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '7px 9px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>{item.emoji}</div>
                <div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ background: `${item.color}20`, color: item.color, fontSize: 6, fontWeight: 900, padding: '1px 4px', borderRadius: 3, textTransform: 'uppercase' }}>{item.type}</span>
                    <span style={{ color: '#ddd', fontSize: 8, fontWeight: 600 }}>{item.title}</span>
                  </div>
                  <div style={{ color: '#666', fontSize: 7 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Rating section */}
          <div style={{ padding: '6px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ color: '#aaa', fontSize: 7, marginBottom: 2 }}>Book rating</div>
              <div style={{ color: '#22c55e', fontSize: 14, fontWeight: 900 }}>4.6 ★</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ color: '#aaa', fontSize: 7, marginBottom: 2 }}>Show rating</div>
              <div style={{ color: '#e50914', fontSize: 14, fontWeight: 900 }}>4.1 ★</div>
            </div>
          </div>
          <NetflixBottomNav active="Home" />
        </div>
      </PhoneMockup>
    </div>
  )
}

const concept: ConceptData = {
  id: 'book-club',
  name: 'Netflix Book Club',
  tagline: 'BookTok lives here — the reading community built for Netflix adaptation fans',
  description:
    'Netflix Book Club turns the massive overlap between readers and Netflix subscribers into a structured community — book discussions, adaptation comparisons, author Q&As, and curated reading lists tied directly to the shows subscribers already love. It captures the BookTok generation before they finish the book and open a competing app.',
  color: '#22c55e',
  colorDark: '#15803d',
  icon: <BookOpen size={36} />,
  nceScore: 2,
  maxUsers: 40,

  problemStatement:
    'Netflix adapts more bestselling books than any other streamer — Daisy Jones & The Six, Bridgerton, The Seven Husbands of Evelyn Hugo, Lessons in Chemistry, All the Light We Cannot See. Every one of these drives a massive "BookTok" phenomenon where readers flood social media to compare the adaptation to the source. 85% of that conversation happens on TikTok, Instagram, and Goodreads — not Netflix. The readers who love these adaptations most passionately are churning to discuss them somewhere else the moment the credits roll.',

  insightQuote:
    'Every Netflix adaptation premiere creates a BookTok moment. The question is whether that moment happens on our platform or someone else\'s.',
  insightSource: 'Content & Community Strategy, Netflix Originals',

  targetUser: 'Female book-lovers aged 18–40 who follow BookTok and read Netflix adaptation source material',
  targetUserDetail:
    'This is the highest-intent, most culturally influential segment in the Netflix subscriber base. They finish a show and immediately want to know: Was the book better? What did the adaptation change? Is there a sequel? They have 50K+ Goodreads shelves dedicated exclusively to "Netflix adaptations" and they drive real-world book sales. When Bridgerton premieres, Bridgerton book sales spike 300%. These readers are already doing Netflix\'s marketing — Book Club gives them a home for it.',

  features: [
    {
      icon: <BookOpen size={18} />,
      title: 'Book × Show Companion Mode',
      description: 'Side-by-side comparison of the book and Netflix adaptation — chapter-by-chapter breakdowns of what changed, what was cut, and what was added. Spoiler-gated by default.',
      techNote: 'Companion content authored by Netflix Editorial + fan contributor program',
    },
    {
      icon: <Users size={18} />,
      title: 'Reading Groups',
      description: 'Create or join a reading group tied to an upcoming Netflix adaptation — read together before the premiere, then watch together and discuss. The complete fan cycle in one place.',
      techNote: 'Group infrastructure shared with Watch Together social graph',
    },
    {
      icon: <MessageCircle size={18} />,
      title: 'Chapter Discussion Threads',
      description: 'Spoiler-safe, chapter-level discussion threads for every Netflix adaptation source book — comment on chapter 12 without spoiling chapter 20 for fellow readers.',
      techNote: 'Spoiler reveal gates powered by reading-progress tracking (opt-in)',
    },
    {
      icon: <Star size={18} />,
      title: 'Author Live Events',
      description: 'Live Q&A sessions with authors of upcoming Netflix adaptations — hosted inside the Netflix app in the weeks before a premiere, driving appointment viewing and watch enthusiasm.',
      techNote: 'Powered by Netflix Live infrastructure; recorded replay available post-event',
    },
    {
      icon: <TrendingUp size={18} />,
      title: 'Adaptation Reading Lists',
      description: 'Curated "Read Before You Watch" and "Read After You Binge" lists for every Netflix original with source material — including sequels, author back-catalogs, and "if you liked this" recs.',
      techNote: 'Lists curated by Netflix Editorial + algorithmic personalization layer',
    },
    {
      icon: <Bell size={18} />,
      title: 'Book-to-Screen Alerts',
      description: '"Your favorite book is becoming a Netflix show" — personalized alerts when a book on a subscriber\'s Goodreads or Book Club shelf gets a Netflix adaptation announcement.',
      techNote: 'Goodreads API integration (opt-in import); internal rights announcement feed',
    },
    {
      icon: <Globe size={18} />,
      title: 'Global Reading Challenges',
      description: 'Monthly and seasonal reading challenges tied to Netflix content — "Watch the show, read the book, earn the badge." Community leaderboards and milestone rewards.',
      techNote: 'Badge system shared with Creator Studio certification infrastructure',
    },
    {
      icon: <Layers size={18} />,
      title: 'Book Score & Adaptation Rating',
      description: 'Community ratings on both the book AND the adaptation — "Was the show faithful? Did it improve on the book?" The two-axis rating creates unique data Netflix can use in acquisition decisions.',
      techNote: 'Dual-rating model: separate scores for literary quality and adaptation fidelity',
    },
  ],

  userJourney: [
    {
      step: 1,
      actor: 'user',
      action: 'Finishes Daisy Jones & The Six on Netflix',
      outcome: '"Read the book this was based on?" prompt appears — with Book Club community stats: "14,200 subscribers have read it and want to discuss."',
    },
    {
      step: 2,
      actor: 'user',
      action: 'Opens Book Club — joins the Daisy Jones reading group',
      outcome: 'Sees 3 active friends in the group. Chapter discussion threads visible. "Where are you in the book?" progress check-in appears.',
    },
    {
      step: 3,
      actor: 'system',
      action: 'Tracks reading progress (opt-in) and gates spoilers accordingly',
      outcome: 'User sees discussions relevant to where they are in the book. No accidental spoilers. Engagement is sustained over the full reading period — not just premiere week.',
    },
    {
      step: 4,
      actor: 'user',
      action: 'Finishes book — unlocks "Book vs. Show" full comparison mode',
      outcome: 'Side-by-side breakdown of every major change from page to screen. User posts a reaction. Earns "Bibliophile" badge. Their opinion feeds Netflix\'s adaptation quality signals.',
    },
    {
      step: 5,
      actor: 'netflix',
      action: 'Surfaces "If you loved Daisy Jones, read these next" list',
      outcome: 'Three books by the same author, two Netflix-adjacent thrillers, and a "coming soon to Netflix" title on the list. Book Club extends subscriber engagement by weeks beyond the finale.',
    },
    {
      step: 6,
      actor: 'system',
      action: 'Author Taylor Jenkins Reid live Q&A announced in-app',
      outcome: 'User RSVPs. Appointment event locks in app-open for the live session. Book Club turns a one-time binge into a multi-month engagement cycle.',
    },
  ],

  networkEffects: [
    {
      trigger: 'Reading group forms around an upcoming adaptation',
      mechanism: 'Members read on a shared timeline, creating sustained daily engagement in the weeks before premiere — the show launch becomes a community event, not just a content drop.',
      compounding: 'Reading group members watch premiere week within 48 hours at 3× the rate of solo subscribers — driving the viewership spike that signals a hit to Netflix algorithms',
    },
    {
      trigger: 'Book Club reviews feed Netflix acquisition signals',
      mechanism: 'When Book Club community rates a book highly AND rates it as "under-adapted," Netflix content team has a direct signal for which books deserve better adaptations.',
      compounding: 'Community taste data reduces adaptation risk — each Book Club rating cycle improves acquisition decision accuracy',
    },
    {
      trigger: 'Goodreads import connects existing reader social graph',
      mechanism: 'Subscribers who import their Goodreads shelf immediately find Netflix friends with overlapping reading history — activating the social graph without requiring new behavior.',
      compounding: 'Goodreads importers have 5× more Book Club connections on day one than organic joiners; connection density predicts 6-month retention',
    },
    {
      trigger: 'Author live events drive word-of-mouth outside Netflix',
      mechanism: 'Authors promote their Netflix Book Club appearances on their own social channels — driving their readership audience (often non-subscribers) to the Netflix platform.',
      compounding: 'Each author appearance generates an average 40K impressions outside Netflix; estimated 3–5% trial conversion among engaged readers who aren\'t yet subscribers',
    },
  ],

  metrics: [
    { label: 'Monthly Active Readers', value: '8M', target: '20M', timeframe: 'Year 2', color: '#22c55e' },
    { label: 'Pre-Premiere Engagement Lift', value: '+3.2×', target: '+5×', timeframe: 'vs. non-Book Club', color: '#4ade80' },
    { label: 'Goodreads Imports (Y1)', value: '2.1M', target: '5M', timeframe: 'opt-in connects', color: '#22c55e' },
    { label: 'Author Event Conversions', value: '4.1%', target: '6%', timeframe: 'non-sub to trial', color: '#16a34a' },
  ],

  revenueModel:
    'Book Club drives value through (1) retention — Book Club members binge premiere week content at higher rates, reducing the post-season churn spike by an estimated 20%, (2) acquisition — author and reading community word-of-mouth brings book-readers who aren\'t Netflix subscribers into the funnel at near-zero CAC, (3) acquisition intelligence — community ratings and reading trends directly inform which book rights to acquire next, reducing content risk, and (4) an optional "Book Club Premium" tier at $2/month that unlocks early access to Book × Show companion content, priority slots at author events, and exclusive reading challenges.',

  goToMarket: [
    'Launch with the top 5 most-discussed Netflix adaptations on BookTok (Bridgerton, Daisy Jones, Heartstopper, Wednesday [book series], Outer Banks) — tap existing fan energy rather than building from cold.',
    'Partner with top BookTok creators (1M+ followers) as founding Book Club Ambassadors — give them early access and editorial presence in exchange for authentic community seeding.',
    'Goodreads import as the Day 1 growth hack — "Bring your shelf to Netflix" converts existing readers\' social graph instantly without requiring them to rebuild connections.',
    'Author partnership program: commit to 12 author live events in year one, prioritizing authors with active social communities. Announce all 12 at launch to signal long-term commitment.',
    'Launch Book Club during a high-profile premiere (Bridgerton S4 or similar) — the premiere creates the organic "should I read the book?" moment that Book Club is built to capture.',
  ],

  timeline: [
    {
      phase: 'Community Foundation',
      months: 'Months 1–4',
      milestones: [
        'Book × Show companion pages for top 20 Netflix adaptations',
        'Reading groups (join/create/invite)',
        'Chapter discussion threads with spoiler gating',
        'Goodreads shelf import (opt-in)',
      ],
    },
    {
      phase: 'Social & Live',
      months: 'Months 5–9',
      milestones: [
        'Author live Q&A events (first 4)',
        'Reading challenges + badge system',
        'Book-to-screen adaptation alerts',
        'Dual-rating system (book + adaptation)',
      ],
    },
    {
      phase: 'Ecosystem',
      months: 'Months 10–18',
      milestones: [
        'Book Club Premium tier ($2/month)',
        'Global reading challenges with leaderboards',
        'Book Club feed in Netflix homepage algorithm',
        'Publishing partnership program for advance copies',
      ],
    },
  ],

  risks: [
    {
      risk: 'Goodreads is already the dominant reading social network — subscribers won\'t migrate their social graph to a new platform.',
      mitigation: 'Don\'t compete with Goodreads — integrate with it. The import creates the Netflix-specific layer on top of their existing Goodreads identity. Book Club is the "Netflix edition" of their reading life, not a replacement.',
    },
    {
      risk: 'Adaptation spoilers in discussion threads damage the experience for subscribers who haven\'t watched yet.',
      mitigation: 'Dual-gate spoilers by both reading progress (for book) and viewing status (for show). Subscribers self-select their spoiler threshold. Default is "no spoilers" for both.',
    },
    {
      risk: 'Book Club only works for the subset of Netflix content with book source material — it doesn\'t scale across the full catalog.',
      mitigation: 'Correct by design. Book Club is a high-intent feature for a specific high-value segment. It doesn\'t need to serve 260M subscribers — it needs to deeply serve the 40M who are readers and fans simultaneously.',
    },
    {
      risk: 'Author events require coordinated scheduling and promotion — a low-turnout event damages the feature\'s perceived value.',
      mitigation: 'Minimum threshold for author events: 10K RSVPs before going live. Below threshold, event converts to an asynchronous Q&A format. Author is paid regardless.',
    },
  ],
}

const conceptWithMockup: ConceptData = {
  ...concept,
  mockup: <BookClubMockup />,
  execSummary: {
    why: "Netflix is the world's most prolific book adapter — Bridgerton, Daisy Jones, The Seven Husbands of Evelyn Hugo, Heartstopper, Wednesday — and every adaptation creates a BookTok phenomenon that currently happens entirely off-platform on TikTok, Instagram, and Goodreads.",
    impact: 'Book Club members watch premiere-week content at 3× the rate of non-members, reducing the post-season churn spike by an estimated 20%. Author events bring non-subscribers into the funnel at near-zero CAC — each appearance generates ~40K external impressions with 3–5% trial conversion.',
    edge: "The only platform that can offer 'watch the show and discuss the book' is one that has both the show and the subscriber relationship. Netflix has both. Goodreads can host the discussion; only Netflix can connect it to the moment the credits roll.",
  },
  kevinsTake: "GWI's audience research consistently showed that book readers are the highest-intent, most culturally influential consumer segment in streaming. They're also the exact subscribers who drive word-of-mouth and show up for premiere week. Book Club isn't a nice-to-have community feature — it's a retention and acquisition product for the segment that matters most to Netflix's cultural authority.",
}

export default function BookClubPage() {
  return <ConceptLayout concept={conceptWithMockup} siblings={SIBLINGS} />
}
