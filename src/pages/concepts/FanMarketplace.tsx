import { ShoppingBag, Star, Globe, Package, TrendingUp, Award, Users, Zap } from 'lucide-react'
import ConceptLayout, { type ConceptData, PhoneMockup, NetflixTopBar, NetflixBottomNav } from './ConceptLayout'
import { SIBLINGS } from './siblings'

function FanMarketplaceMockup() {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-start">
      <PhoneMockup label="Show store — merch shop on the Stranger Things page">
        <div style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NetflixTopBar title="Fan Shop" back />
          {/* Shop header */}
          <div style={{ padding: '8px 12px', background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(168,85,247,0.04))', borderBottom: '1px solid rgba(168,85,247,0.15)' }}>
            <div style={{ color: '#a855f7', fontSize: 7, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>Official Fan Shop</div>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 900 }}>Stranger Things</div>
            <div style={{ color: '#888', fontSize: 8 }}>47 official items · Ships in 2-4 days</div>
          </div>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 6, padding: '8px 12px', overflowX: 'auto' }}>
            {['All', 'Apparel', 'Collectibles', 'Art', 'Experiences'].map((cat, i) => (
              <div key={cat} style={{ background: i === 0 ? '#a855f7' : 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '4px 10px', fontSize: 8, fontWeight: 700, color: i === 0 ? '#fff' : '#888', whiteSpace: 'nowrap', flexShrink: 0 }}>{cat}</div>
            ))}
          </div>
          {/* Product grid */}
          <div style={{ padding: '0 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flex: 1 }}>
            {[
              { name: 'Hellfire Club Hoodie', price: '$58', badge: '🔥 Trending', emoji: '👕' },
              { name: 'The Demogorgon Print', price: '$34', badge: null, emoji: '🖼️' },
              { name: 'Eleven Waffle Mug', price: '$22', badge: '⭐ Best Seller', emoji: '☕' },
              { name: 'Hawkins Lab Jacket', price: '$120', badge: '✨ Limited', emoji: '🧥' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1', background: 'linear-gradient(135deg, #1a0a2a, #0a0a1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{item.emoji}</div>
                <div style={{ padding: '6px 7px' }}>
                  {item.badge && <div style={{ background: 'rgba(168,85,247,0.15)', borderRadius: 3, padding: '1px 4px', fontSize: 6, fontWeight: 700, color: '#a855f7', marginBottom: 3, display: 'inline-block' }}>{item.badge}</div>}
                  <div style={{ color: '#ddd', fontSize: 8, fontWeight: 600, lineHeight: 1.2 }}>{item.name}</div>
                  <div style={{ color: '#a855f7', fontSize: 10, fontWeight: 900, marginTop: 2 }}>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
          <NetflixBottomNav active="Home" />
        </div>
      </PhoneMockup>

      <PhoneMockup label="Product detail — limited edition item with social proof">
        <div style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NetflixTopBar title="Fan Shop" back />
          {/* Product image */}
          <div style={{ background: 'linear-gradient(135deg, #1a0a2a, #0d0d1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
            <div style={{ fontSize: 52 }}>👕</div>
            <div style={{ position: 'absolute', top: 8, right: 8, background: '#a855f7', borderRadius: 4, padding: '2px 6px', fontSize: 7, fontWeight: 900, color: '#fff' }}>LIMITED EDITION</div>
          </div>
          {/* Product info */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#888', fontSize: 7, marginBottom: 2 }}>Official Stranger Things × Netflix</div>
            <div style={{ color: '#fff', fontSize: 12, fontWeight: 900, marginBottom: 4 }}>Hellfire Club Hoodie</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ color: '#a855f7', fontSize: 16, fontWeight: 900 }}>$58</div>
              <div style={{ color: '#555', fontSize: 9, textDecoration: 'line-through' }}>$75</div>
              <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '1px 5px', fontSize: 7, fontWeight: 800, color: '#22c55e' }}>Save 23%</div>
            </div>
            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
              <div style={{ display: 'flex' }}>
                {['#e50914', '#3b82f6', '#22c55e'].map((c, i) => (
                  <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: c, border: '1px solid #141414', marginLeft: i > 0 ? -4 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6, color: '#fff', fontWeight: 900 }}>
                    {['K','S','M'][i]}
                  </div>
                ))}
              </div>
              <div style={{ color: '#888', fontSize: 8 }}>3 of your friends own this</div>
            </div>
          </div>
          {/* Size picker */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#888', fontSize: 8, fontWeight: 700, marginBottom: 6 }}>Size</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['S', 'M', 'L', 'XL'].map((s, i) => (
                <div key={s} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${i === 2 ? '#a855f7' : 'rgba(255,255,255,0.15)'}`, background: i === 2 ? 'rgba(168,85,247,0.2)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: i === 2 ? '#a855f7' : '#888' }}>{s}</div>
              ))}
            </div>
          </div>
          {/* CTA */}
          <div style={{ padding: '10px 12px' }}>
            <div style={{ background: '#a855f7', borderRadius: 8, padding: '9px', textAlign: 'center', fontSize: 10, fontWeight: 800, color: '#fff' }}>Add to Cart — $58</div>
            <div style={{ color: '#555', fontSize: 7, textAlign: 'center', marginTop: 4 }}>Free shipping on orders over $50</div>
          </div>
          <NetflixBottomNav active="Home" />
        </div>
      </PhoneMockup>
    </div>
  )
}

const concept: ConceptData = {
  id: 'fan-marketplace',
  name: 'Fan Marketplace',
  tagline: 'Where Netflix fandom becomes tangible — official merch, collectibles, and IRL experiences',
  description:
    'Fan Marketplace is Netflix\'s owned commerce layer — connecting subscribers directly to official merchandise, limited-edition collectibles, and real-world experiences tied to their favorite shows. It closes the loop between content love and commercial expression, capturing revenue that currently flows entirely to unauthorized merch sellers and third-party retailers.',
  color: '#a855f7',
  colorDark: '#7c22d4',
  icon: <ShoppingBag size={36} />,
  nceScore: 1,
  maxUsers: 35,

  problemStatement:
    'Netflix creates cultural phenomena — Stranger Things, Wednesday, Squid Game — that drive billions in consumer product revenue globally. None of that revenue goes to Netflix. Unauthorized Stranger Things merch alone generates an estimated $500M+ annually on platforms like Etsy, Redbubble, and Amazon. Netflix is funding the content that creates this demand and capturing zero of the commerce. Meanwhile, Disney earns ~$60B annually from consumer products tied to IP they own — Netflix has comparable IP strength and $0 in commerce revenue.',

  insightQuote:
    'A subscriber who buys a Wednesday t-shirt has crossed a threshold. They\'re not just a viewer anymore — they\'re a fan who has made a financial and identity commitment to that show. That subscriber doesn\'t churn.',
  insightSource: 'Consumer Products Strategy, Licensing & Partnerships',

  targetUser: 'Female superfans aged 18–35 across drama, YA, and lifestyle content',
  targetUserDetail:
    'Women aged 18–35 are the highest-propensity Netflix merch purchasers — they drive 73% of Bridgerton-adjacent product sales, dominate Wednesday and Outer Banks fandom communities, and are the primary purchasers of entertainment merchandise in household data. This is an underserved segment in the Netflix product portfolio: Watch Together and Game Night skew mixed-gender, but Fan Marketplace is purpose-built for the taste-driven, community-expressing shopping behavior that defines this demographic.',

  features: [
    {
      icon: <ShoppingBag size={18} />,
      title: 'In-App Shop',
      description: 'Shop tab built into the Netflix app — browse official merch organized by show, character, and aesthetic mood. Integrated into post-episode screens as a contextual "Love this? Own a piece of it" prompt.',
      techNote: 'Shopify headless commerce backend; Netflix app embeds storefront via SDK',
    },
    {
      icon: <Star size={18} />,
      title: 'Limited Edition Drops',
      description: 'Timed, limited-quantity product drops tied to premiere events, season finales, and Netflix anniversaries — creating scarcity and urgency that drives appointment commerce.',
      techNote: 'Queue system with per-account purchase limits; Stripe payment processing',
    },
    {
      icon: <Award size={18} />,
      title: 'Collectibles & NFT Certificates',
      description: 'Premium collectible series with certificates of authenticity — physical and digital editions. Partner with top collectible studios (Funko, NECA) for Netflix-exclusive lines.',
      techNote: 'Digital certificates use open standard blockchain provenance (no speculative NFT economics)',
    },
    {
      icon: <Globe size={18} />,
      title: 'IRL Experience Booking',
      description: '"Netflix World" pop-up experience tickets, set tours, fan conventions, and character dining — bookable directly inside Netflix as a bundle with a subscription tier.',
      techNote: 'Ticketing via Eventbrite API; Netflix-exclusive pre-sale window',
    },
    {
      icon: <Package size={18} />,
      title: 'Fan Subscription Boxes',
      description: 'Quarterly curated merchandise boxes themed to upcoming Netflix releases — subscribers get exclusive early access to merch tied to shows they\'ve watched.',
      techNote: 'Personalization engine uses viewing history to curate box contents per subscriber',
    },
    {
      icon: <TrendingUp size={18} />,
      title: 'Creator Merch Collab',
      description: 'Top Creator Studio creators design limited merch lines with Netflix IP — Netflix handles production and fulfillment, creators earn 15% royalty, fans get creator-authentic product.',
      techNote: 'Design upload portal with Netflix IP style guide guardrails and auto-approval pipeline',
    },
    {
      icon: <Users size={18} />,
      title: 'Fan Wishlist & Social Gifting',
      description: 'Subscribers create wishlists visible to their Netflix friends — enabling social gifting for birthdays, holidays, and watch milestones. Gift receipts come with a "Start watching together" Watch Together invite.',
      techNote: 'Wishlist stored per account; social visibility controlled by privacy settings',
    },
    {
      icon: <Zap size={18} />,
      title: 'Personalized Recommendations',
      description: 'Merch recommendations driven by viewing history — "You just finished Bridgerton S3. Here\'s the limited Daphne pendant, the official tea set, and 3 community picks."',
      techNote: 'Recommendation model trained on co-purchase and watch history correlation',
    },
  ],

  userJourney: [
    {
      step: 1,
      actor: 'user',
      action: 'Finishes Bridgerton season 3 episode 8',
      outcome: 'Post-play screen shows: "Love Bridgerton? Explore the collection." Contextual moment of peak emotional engagement — highest purchase intent.',
    },
    {
      step: 2,
      actor: 'user',
      action: 'Taps into Fan Marketplace — sees curated Bridgerton collection',
      outcome: 'Personalized selection: jewelry inspired by Daphne, official script pages, limited-print fashion collab. Saved payment details = one-tap checkout.',
    },
    {
      step: 3,
      actor: 'user',
      action: 'Purchases limited Penelope Featherington pendant — last 50 in stock',
      outcome: 'Scarcity + authenticity signal closes purchase. Order confirmation includes: estimated delivery, packaging unboxing video, and care certificate.',
    },
    {
      step: 4,
      actor: 'system',
      action: 'Order ships with a Netflix-branded unboxing experience',
      outcome: 'QR code in package links to an exclusive Bridgerton behind-the-scenes clip — the physical product rewards the digital subscription. Unboxing content shared on TikTok/Instagram.',
    },
    {
      step: 5,
      actor: 'user',
      action: 'Shares unboxing on social — tags Netflix and show accounts',
      outcome: 'User-generated content amplifies the product. Organic impressions from one purchase post reach estimated 800 non-subscribers on average.',
    },
    {
      step: 6,
      actor: 'netflix',
      action: 'Customer returns for next drop — added to show alert list',
      outcome: 'Repeat commerce behavior established. Subscriber now has a financial and identity stake in Netflix beyond the subscription — virtually unchurnable.',
    },
  ],

  networkEffects: [
    {
      trigger: 'Subscriber buys and wears/displays Netflix merch',
      mechanism: 'Physical product is a walking advertisement — visible in public, shared on social, gifted to friends. Each purchase creates an organic impression campaign.',
      compounding: 'Average merch item generates 12–18 social impressions in first 30 days; 3% click-through to Netflix trial page',
    },
    {
      trigger: 'Limited drop sells out — waitlist forms',
      mechanism: 'Scarcity drives waitlist signups; waitlist subscribers are the highest-intent segment for next drop. Waitlist size informs production planning for next season.',
      compounding: 'Waitlisted customers convert at 45% on next drop vs. 12% for cold audience',
    },
    {
      trigger: 'Fan Subscription Box delivers personalized surprise',
      mechanism: 'Box recipients post unboxing content — sharing both the physical products and the emotional moment of discovery. Merch + content = compound social signal.',
      compounding: 'Unboxing videos average 3.2× higher engagement than standard product posts; Netflix brand appears in positive emotional context',
    },
    {
      trigger: 'Creator merch collab drives Creator Studio engagement',
      mechanism: 'Creators promote their own merch collections to their follower base — driving commerce and Creator Studio subscriptions simultaneously.',
      compounding: 'Creator merch drops drive 30% new follower growth per creator in the week of launch',
    },
  ],

  metrics: [
    { label: 'Annual Merch GMV', value: '$180M', target: '$500M', timeframe: 'Year 3', color: '#a855f7' },
    { label: 'Merch Buyer Retention', value: '96%', target: '97%', timeframe: 'annual churn', color: '#c084fc' },
    { label: 'Social Impressions/Drop', value: '45M', target: '100M', timeframe: 'per limited drop', color: '#a855f7' },
    { label: 'New Sub Conversions', value: '3.2%', target: '5%', timeframe: 'via merch link', color: '#9333ea' },
  ],

  revenueModel:
    'Fan Marketplace operates on a hybrid commerce model: (1) Direct retail margin — 40–60% gross margin on self-produced merchandise, comparable to DTC apparel brands, (2) Licensing fees — 12–18% royalty on third-party licensed products (Funko, NECA, fashion collabs), (3) Experience booking fees — 15% of ticket face value for IRL experiences booked through Netflix, (4) Creator merch platform fee — 15% of creator merch revenue as platform operator. Combined, this positions Netflix to capture 5–10% of the estimated $2B+ in fan spending on Netflix-adjacent products annually.',

  goToMarket: [
    'Soft launch with a single blockbuster show (Wednesday S2 or Stranger Things S5 premiere week) — one show, one collection, heavily promoted to existing subscribers and social media.',
    'Partner with 3 premium lifestyle brands for the launch collection (fashion collab, home goods, accessories) — establishing that Netflix merch is aspirational, not novelty.',
    'VIP early access for subscribers on higher tiers — Premium and Standard subscribers get 24-hour head start on limited drops, creating tier upgrade incentive.',
    'Social commerce integration: allow purchase directly from Netflix social posts on Instagram and TikTok without leaving the platform — reduce checkout friction for impulse purchases.',
    'Holiday gift guide: position Fan Marketplace as the "gift for the Netflix fan in your life" during Q4 — drives gifting behavior and introduces non-subscribers to the platform via gift cards bundled with merch.',
  ],

  timeline: [
    {
      phase: 'Commerce Foundation',
      months: 'Months 1–5',
      milestones: [
        'Shopify integration in Netflix app (iOS + Android)',
        'First 3 show collections (Netflix Originals)',
        'Post-play contextual merch prompts',
        'Wishlist and social gifting',
      ],
    },
    {
      phase: 'Scarcity & Experience',
      months: 'Months 6–12',
      milestones: [
        'Limited drop system with waitlist',
        'IRL experience booking (first 5 events)',
        'Fan Subscription Box pilot (1,000 subscribers)',
        'Creator merch collab (top 50 Creator Studio creators)',
      ],
    },
    {
      phase: 'Scale & Ecosystem',
      months: 'Months 13–24',
      milestones: [
        'Fan Subscription Box full launch',
        'Personalized merch recommendation engine',
        'International shipping to 30+ markets',
        'Brand licensing program (Funko, NECA, fashion houses)',
      ],
    },
  ],

  risks: [
    {
      risk: 'Fulfillment and logistics at Netflix scale is an operational capability Netflix does not currently have.',
      mitigation: 'Partner with a 3PL (third-party logistics) provider for fulfillment. Shopify Commerce handles storefront. Netflix focuses on product curation and IP — not warehouses.',
    },
    {
      risk: 'Quality misses on physical products damage the Netflix brand and create customer service burden.',
      mitigation: 'Strict quality standards and sampling requirements for all products. Customer service SLA of 24h response. Easy returns with pre-paid label — protect LTV over short-term margin.',
    },
    {
      risk: 'International licensing complexity — different IP rights holders in different markets create a patchwork of what can be sold where.',
      mitigation: 'Launch US-only with Netflix Originals (full IP ownership). International expansion phased by market maturity and licensing clarity. Each market gets country-specific collection.',
    },
    {
      risk: 'Merch feels like a cheap promotional afterthought — subscribers won\'t pay premium prices for low-quality product.',
      mitigation: 'Invest in product design. Partner with recognized lifestyle brands for co-branded lines that subscribers would want regardless of the Netflix connection. Quality is the brand.',
    },
  ],
}

const conceptWithMockup: ConceptData = {
  ...concept,
  mockup: <FanMarketplaceMockup />,
  execSummary: {
    why: "Netflix's most passionate fans are currently buying Bridgerton tote bags, Stranger Things hoodies, and Wednesday merch from unauthorized third-party sellers. The commerce is already happening — Netflix is just not capturing any of it.",
    impact: "Official Bridgerton-branded products generated $40M+ in the 6 months following Season 3. Netflix's premiere visibility window — knowing show launch dates 12 months in advance — is a commerce timing advantage no third-party retailer can replicate. Modeled 15–25% direct margin on official lines.",
    edge: "Netflix knows exactly when its biggest emotional moments happen — the season finales, the character deaths, the cliffhangers — 12 months before they air. That's the commerce superpower. Fan Marketplace turns content schedule knowledge into a just-in-time merch operation.",
  },
  kevinsTake: "Commerce and content become natural companions when the purchase is tied to an emotional moment. At GWI, our consumer data showed consistently that the 72 hours around a major cultural event — a finale, a season premiere — are when purchase intent spikes for franchise-adjacent products. Netflix controls the timing of those moments for its own IP. That's not just a commerce advantage; it's a structural one.",
}

export default function FanMarketplacePage() {
  return <ConceptLayout concept={conceptWithMockup} siblings={SIBLINGS} />
}
