/**
 * MarketingServiceDetail — detail template for ALL Marketing subpages.
 * Identity: premium growth studio. Deep-navy hero with electric-blue and
 * warm-amber accents, off-white body, organic blob shapes, zig-zag
 * storytelling, campaign-dashboard hero visual (rising chart, SEO score,
 * social chips, pulsing conversion badge), testimonial slider,
 * speech-bubble FAQ. Soft purple appears only as a minor accent.
 * No glassmorphism, no code motifs. Class prefix `mktx-`.
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Sparkles, Star, TrendingUp, Quote, MessageCircle,
  PartyPopper, Send, ChevronLeft, ChevronRight as ChevRight, Flame,
  Instagram, Linkedin, MousePointerClick, Users2,
} from 'lucide-react';

/* ─── Premium growth palette (pink retired 2026-07-03) ───────────────── */
const NAVY = '#0c1834';
const NAVY2 = '#15294f';
const ELECTRIC = '#2563eb';
const SKY = '#38bdf8';
const AMBER = '#f5aa02';
const AMBER_LIGHT = '#f5aa02';
const LIME = '#a3e635';
const PURPLE = '#8b5cf6'; // small accent only — never dominant
const PAPER = '#f6f8fd';
const INK = '#101828';
const SOFT = '#5d6b85';
const BRIGHTS = [ELECTRIC, AMBER, SKY, LIME];

const MARKETING_HERO_CONFIG = {
  'Digital Marketing': {
    variant: 'campaign-grid',
    accent: ELECTRIC,
    accentSoft: AMBER_LIGHT,
    badge: 'Growth Engine Live',
    title: 'Multi-channel dashboard',
    subtitle: 'Audience, creative and conversion signals aligned.',
    primary: '168%',
    primaryLabel: 'Lead growth',
    stats: ['4 channels active', '72% warm reach', '31K engaged'],
    chips: ['Search', 'Social', 'Video', 'Email'],
    bars: [34, 48, 64, 82, 95],
  },
  'SEO Services': {
    variant: 'seo-lab',
    accent: SKY,
    accentSoft: LIME,
    badge: 'Index Health Stable',
    title: 'Search visibility lab',
    subtitle: 'Keyword rankings, crawl health and index momentum.',
    primary: '91',
    primaryLabel: 'Technical score',
    stats: ['38 keywords top 10', '426 pages indexed', '+62% clicks'],
    chips: ['Local SEO', 'Clusters', 'Schema', 'CWV'],
  },
  'PPC & Paid Ads': {
    variant: 'ads-console',
    accent: AMBER,
    accentSoft: ELECTRIC,
    badge: 'Spend Optimized',
    title: 'Paid media console',
    subtitle: 'ROAS, CPC, CTR and conversion cadence in view.',
    primary: '4.8x',
    primaryLabel: 'ROAS',
    stats: ['₹28 CPC', '6.4% CTR', '14.2% CVR'],
    chips: ['Search', 'Meta', 'YouTube', 'Retargeting'],
    bars: [42, 76, 58, 92],
  },
  'Social Media': {
    variant: 'social-wall',
    accent: PURPLE,
    accentSoft: SKY,
    badge: 'Community Rising',
    title: 'Social content wall',
    subtitle: 'Engagement, content rhythm and reach built to move.',
    primary: '8.2%',
    primaryLabel: 'Engagement rate',
    stats: ['+18K reach', '24 posts queued', '+2.4K follows'],
    chips: ['Reels', 'Stories', 'LinkedIn', 'DMs'],
  },
  'Social Media Marketing': {
    variant: 'social-wall',
    accent: PURPLE,
    accentSoft: SKY,
    badge: 'Community Rising',
    title: 'Social content wall',
    subtitle: 'Engagement, content rhythm and reach built to move.',
    primary: '8.2%',
    primaryLabel: 'Engagement rate',
    stats: ['+18K reach', '24 posts queued', '+2.4K follows'],
    chips: ['Reels', 'Stories', 'LinkedIn', 'DMs'],
  },
  'Content Marketing': {
    variant: 'content-studio',
    accent: AMBER,
    accentSoft: SKY,
    badge: 'Editorial Flow Ready',
    title: 'Topic cluster studio',
    subtitle: 'Editorial boards, lead magnets and trust-building assets.',
    primary: '12',
    primaryLabel: 'Live content clusters',
    stats: ['38 briefs mapped', '6 lead magnets', '3x reuse plan'],
    chips: ['Blogs', 'Cases', 'FAQs', 'Guides'],
  },
  'Email Marketing': {
    variant: 'email-flow',
    accent: LIME,
    accentSoft: SKY,
    badge: 'Automation Active',
    title: 'Lifecycle email flow',
    subtitle: 'Open rate, clicks and sequence health in one lane.',
    primary: '42%',
    primaryLabel: 'Open rate',
    stats: ['6-step nurture', '7.9% click rate', '+12% list growth'],
    chips: ['Welcome', 'Nurture', 'Abandon', 'Win-back'],
  },
  'Lead Generation': {
    variant: 'lead-machine',
    accent: AMBER,
    accentSoft: LIME,
    badge: 'CRM Handoff Clean',
    title: 'Enquiry capture map',
    subtitle: 'Landing pages, forms and follow-up logic connected.',
    primary: '312',
    primaryLabel: 'Qualified leads',
    stats: ['18.4% LP CVR', '2-step follow-up', '0 lost fields'],
    chips: ['Landing pages', 'WhatsApp', 'CRM', 'Retargeting'],
  },
  'Analytics & Reporting': {
    variant: 'analytics-deck',
    accent: SKY,
    accentSoft: ELECTRIC,
    badge: 'Attribution Synced',
    title: 'Insight cockpit',
    subtitle: 'Source clarity, dashboard views and next actions.',
    primary: '24/7',
    primaryLabel: 'Live reporting',
    stats: ['9 tracked events', '4 dashboards', 'Weekly insight notes'],
    chips: ['GA4', 'Hotjar', 'CRM', 'Looker'],
    bars: [56, 74, 88, 64],
  },
};

/* organic blob radii — the shape language of this identity */
const BLOBS = [
  '58% 42% 38% 62% / 55% 45% 55% 45%',
  '40% 60% 55% 45% / 45% 55% 45% 55%',
  '62% 38% 46% 54% / 40% 64% 36% 60%',
  '45% 55% 62% 38% / 58% 42% 58% 42%',
];

/* ─── Wiggly underline SVG ───────────────────────────────────────────── */
const Squiggle = ({ color = AMBER }) => (
  <svg viewBox="0 0 220 14" className="w-48 h-4 mx-auto" aria-hidden="true">
    <motion.path d="M4 9 Q 24 2, 44 8 T 84 8 T 124 8 T 164 8 T 212 7"
      fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
      viewport={{ once: false }} transition={{ duration: 1, ease: 'easeOut' }} />
  </svg>
);

/* ─── Confetti dots background (light, playful) ──────────────────────── */
const Confetti = ({ count = 18, dim = false }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <motion.span key={i} className="absolute"
        style={{
          left: `${(i * 41) % 100}%`, top: `${(i * 29) % 100}%`,
          width: 8 + (i % 3) * 4, height: 8 + (i % 3) * 4,
          background: BRIGHTS[i % 4],
          borderRadius: i % 2 ? '50%' : '30%',
          opacity: dim ? 0.22 : 0.45,
          rotate: `${i * 33}deg`,
        }}
        animate={{ y: [0, -18, 0], rotate: [0, 120, 0] }}
        transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }} />
    ))}
  </div>
);

/* ─── HERO VISUAL — page-specific marketing dashboards ───────────────── */
const CampaignDashboard = ({ page }) => {
  const Icon = page.icon;
  const visual = MARKETING_HERO_CONFIG[page.title] || MARKETING_HERO_CONFIG['Digital Marketing'];
  const accent = visual.accent;
  const soft = visual.accentSoft;

  const statTile = (value, label, index) => (
    <div key={label} className="rounded-2xl px-3 py-3 text-center" style={{ background: '#f8fbff', border: `1px solid ${index % 2 === 0 ? accent : soft}24` }}>
      <p className="font-black text-sm" style={{ color: index % 2 === 0 ? accent : soft }}>{value}</p>
      <p className="text-[9px] font-bold uppercase tracking-wide mt-1" style={{ color: SOFT }}>{label}</p>
    </div>
  );

  const chip = (label, index) => (
    <span
      key={label}
      className="mktx-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.16em]"
      style={{
        color: index % 2 === 0 ? accent : soft,
        background: `${index % 2 === 0 ? accent : soft}14`,
        border: `1px solid ${index % 2 === 0 ? accent : soft}30`,
        animationDelay: `${index * 0.18}s`,
      }}
    >
      {label}
    </span>
  );

  const campaignGrid = (
    <div className="space-y-5">
      <div className="flex items-end gap-2 h-28">
        {(visual.bars || []).map((height, i) => (
          <div key={height} className="flex-1 rounded-t-2xl mktx-rise" style={{ height: `${height}%`, background: i === (visual.bars || []).length - 1 ? `linear-gradient(180deg, ${soft}, ${accent})` : `linear-gradient(180deg, ${accent}, ${soft})`, animationDelay: `${i * 0.16}s` }} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const seoLab = (
    <div className="grid gap-4 lg:grid-cols-[.92fr_1.08fr] items-center">
      <div className="text-center">
        <div className="relative w-28 h-28 mx-auto rounded-full" style={{ border: `10px solid ${accent}20`, background: `radial-gradient(circle, ${accent}10, transparent 72%)` }}>
          <div className="absolute inset-3 rounded-full grid place-items-center" style={{ background: PAPER }}>
            <div>
              <p className="font-black text-3xl" style={{ color: accent }}>{visual.primary}</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: SOFT }}>{visual.primaryLabel}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {['keyword clusters', 'core web vitals', 'indexed growth'].map((label, i) => (
          <div key={label} className="rounded-2xl px-4 py-3" style={{ background: '#f8fbff', border: `1px solid ${i === 1 ? soft : accent}22` }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: SOFT }}>{label}</span>
              <span className="text-xs font-black" style={{ color: i === 1 ? soft : accent }}>{['+22', '92', '+61%'][i]}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e6edf8' }}>
              <div className="mktx-rise h-full rounded-full" style={{ width: `${[78, 92, 68][i]}%`, background: `linear-gradient(90deg, ${i === 1 ? soft : accent}, ${i === 1 ? accent : soft})`, animationDelay: `${i * 0.2}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const adsConsole = (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {(visual.bars || []).map((value, i) => (
          <div key={value} className="rounded-[1.4rem] p-4 text-center" style={{ background: '#fff8ef', border: `1px solid ${i % 2 === 0 ? accent : soft}24` }}>
            <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: SOFT }}>{['CPC', 'CTR', 'ROAS', 'CVR'][i]}</p>
            <div className="mt-3 h-20 flex items-end justify-center">
              <div className="w-9 rounded-t-2xl mktx-rise" style={{ height: `${value}%`, background: `linear-gradient(180deg, ${i % 2 === 0 ? accent : soft}, ${i % 2 === 0 ? soft : accent})`, animationDelay: `${i * 0.15}s` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const socialWall = (
    <div className="grid grid-cols-2 gap-3">
      {[
        { title: 'Reels', meta: '+42%', icon: Instagram },
        { title: 'Stories', meta: '18 replies', icon: Flame },
        { title: 'LinkedIn', meta: '12 saves', icon: Linkedin },
        { title: 'Community', meta: 'DM active', icon: MessageCircle },
      ].map((item, i) => (
        <div key={item.title} className="rounded-[1.6rem] p-4 relative overflow-hidden mktx-float" style={{ background: i % 2 === 0 ? '#faf5ff' : '#f0f9ff', border: `1px solid ${i % 2 === 0 ? accent : soft}20`, animationDelay: `${i * 0.25}s` }}>
          <item.icon className="w-5 h-5 mb-6" style={{ color: i % 2 === 0 ? accent : soft }} />
          <p className="font-black" style={{ color: INK }}>{item.title}</p>
          <p className="text-xs font-bold mt-1" style={{ color: i % 2 === 0 ? accent : soft }}>{item.meta}</p>
        </div>
      ))}
    </div>
  );

  const contentStudio = (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
      <div className="rounded-[1.7rem] p-4" style={{ background: '#fff9f1', border: `1px solid ${accent}20` }}>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {['Pillar page', 'Case study', 'FAQ cluster', 'Lead magnet'].map((label, i) => (
            <div key={label} className="rounded-[1.2rem] p-3" style={{ background: '#fff', border: `1px solid ${i % 2 === 0 ? accent : soft}20` }}>
              <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: i % 2 === 0 ? accent : soft }}>{['01', '02', '03', '04'][i]}</p>
              <p className="font-semibold mt-2" style={{ color: INK }}>{label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">{(visual.chips || []).map(chip)}</div>
      </div>
      <div className="grid gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}<div className="rounded-2xl px-4 py-4" style={{ background: PAPER, border: `1px dashed ${soft}` }}><p className="font-black" style={{ color: accent }}>{visual.primary}</p><p className="text-[10px] font-bold uppercase tracking-[0.18em] mt-1" style={{ color: SOFT }}>{visual.primaryLabel}</p></div></div>
    </div>
  );

  const emailFlow = (
    <div className="space-y-3">
      {['Welcome', 'Nurture', 'Offer', 'Retention'].map((label, i) => (
        <div key={label} className="rounded-[1.4rem] px-4 py-3 flex items-center gap-3 relative overflow-hidden" style={{ background: '#f7fff2', border: `1px solid ${i % 2 === 0 ? accent : soft}22` }}>
          <span className="w-10 h-10 rounded-2xl grid place-items-center" style={{ background: `${i % 2 === 0 ? accent : soft}18` }}>
            {i % 2 === 0 ? <Send className="w-4 h-4" style={{ color: accent }} /> : <Star className="w-4 h-4" style={{ color: soft }} />}
          </span>
          <div className="flex-1">
            <p className="font-black" style={{ color: INK }}>{label}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: SOFT }}>{['Immediate', '3-day delay', 'A/B subject', 'Win-back'][i]}</p>
          </div>
          <span className="text-xs font-black" style={{ color: i % 2 === 0 ? accent : soft }}>{['42%', '18%', '7.9%', '12%'][i]}</span>
        </div>
      ))}
      <div className="grid grid-cols-3 gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const leadMachine = (
    <div className="grid gap-4 lg:grid-cols-[1fr_.95fr] items-start">
      <div className="space-y-3">
        {['Ad click', 'Landing page', 'Smart form', 'CRM handoff'].map((label, i) => (
          <div key={label} className="relative rounded-[1.4rem] px-4 py-3" style={{ background: '#fff9f1', border: `1px solid ${i % 2 === 0 ? accent : soft}22` }}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: `${i % 2 === 0 ? accent : soft}18` }}>
                  {i < 2 ? <MousePointerClick className="w-4 h-4" style={{ color: accent }} /> : <Users2 className="w-4 h-4" style={{ color: soft }} />}
                </span>
                <div>
                  <p className="font-black" style={{ color: INK }}>{label}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: SOFT }}>{['Intent', 'Proof', 'Qualification', 'Follow-up'][i]}</p>
                </div>
              </div>
              <span className="text-xs font-black" style={{ color: i % 2 === 0 ? accent : soft }}>{['12K', '18.4%', '312', '100%'][i]}</span>
            </div>
            {i < 3 && <span className="absolute left-8 top-full h-4 w-px mktx-pulse" style={{ background: accent }} />}
          </div>
        ))}
      </div>
      <div className="grid gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}<div className="rounded-2xl px-4 py-4" style={{ background: '#fff', border: `1px dashed ${accent}` }}><p className="font-black text-2xl" style={{ color: accent }}>{visual.primary}</p><p className="text-[10px] font-bold uppercase tracking-[0.18em] mt-1" style={{ color: SOFT }}>{visual.primaryLabel}</p></div></div>
    </div>
  );

  const analyticsDeck = (
    <div className="space-y-4">
      <div className="rounded-[1.7rem] p-4" style={{ background: '#f3f9ff', border: `1px solid ${accent}20` }}>
        <div className="flex items-end gap-2 h-24 mb-4">
          {(visual.bars || []).map((height, i) => (
            <div key={height} className="flex-1 rounded-t-2xl mktx-rise" style={{ height: `${height}%`, background: `linear-gradient(180deg, ${i % 2 === 0 ? accent : soft}, ${i % 2 === 0 ? soft : accent})`, animationDelay: `${i * 0.14}s` }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Source quality', 'Campaign ROAS', 'Top landing page', 'Next action'].map((label, i) => statTile(['82%', '4.2x', '/seo-audit', 'Improve CTA'][i], label, i))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const visualByVariant = {
    'campaign-grid': campaignGrid,
    'seo-lab': seoLab,
    'ads-console': adsConsole,
    'social-wall': socialWall,
    'content-studio': contentStudio,
    'email-flow': emailFlow,
    'lead-machine': leadMachine,
    'analytics-deck': analyticsDeck,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="relative max-w-md mx-auto w-full">
      <div className="rounded-[1.9rem] overflow-hidden shadow-2xl" style={{ background: '#ffffff', border: `1px solid ${accent}20` }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ background: PAPER, borderBottom: `1px solid ${accent}14` }}>
          <div>
            <p className="font-black text-sm" style={{ color: INK }}>{visual.title}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: SOFT }}>{visual.subtitle}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: accent, background: `${accent}14`, border: `1px solid ${accent}28` }}>
            <Icon className="w-3.5 h-3.5" /> {visual.badge}
          </span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-5">{(visual.chips || []).map(chip)}</div>
          {visualByVariant[visual.variant]}
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 sm:-left-6 px-4 py-3 rounded-2xl shadow-xl mktx-float" style={{ background: `linear-gradient(120deg, ${accent}, ${soft})` }}>
        <p className="text-white font-black text-sm leading-none">{visual.primary}</p>
        <p className="text-white/80 text-[10px] font-bold mt-1 uppercase tracking-[0.16em]">{visual.primaryLabel}</p>
      </div>
    </motion.div>
  );
};

/* ─── Mini campaign funnel ───────────────────────────────────────────── */
const MiniFunnel = ({ page }) => {
  const stages = [
    { label: 'Reach', w: '100%', v: '120K', c: SKY },
    { label: 'Engage', w: '72%', v: '31K', c: ELECTRIC },
    { label: 'Leads', w: '46%', v: '5.4K', c: AMBER },
    { label: 'Sales', w: '26%', v: '940', c: LIME },
  ];
  return (
    <div className="rounded-[2.5rem] p-7 sm:p-9 relative overflow-hidden" style={{ background: NAVY }}>
      <Confetti count={8} dim />
      <p className="mktx-display text-white font-black text-lg mb-1 relative z-10">Campaign pulse</p>
      <p className="text-white/50 text-xs mb-6 relative z-10">What a {page.title.toLowerCase()} funnel looks like when it works</p>
      <div className="space-y-3 relative z-10">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="text-white/60 text-xs font-bold w-16 text-right">{s.label}</span>
            <div className="flex-1 h-9 rounded-full overflow-hidden" style={{ background: '#ffffff14' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: s.w }} viewport={{ once: false }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full flex items-center justify-end px-4"
                style={{ background: `linear-gradient(90deg, ${s.c}aa, ${s.c})` }}>
                <span className="text-xs font-black" style={{ color: s.c === LIME ? NAVY : 'white' }}>{s.v}</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Testimonials (generated per service, honest placeholders) ──────── */
const quotesFor = (page) => ([
  { name: 'Priya S.', role: 'D2C Brand Founder', text: `The ${page.title.toLowerCase()} plan finally connected our spend to actual enquiries. We could see what worked within the first month.`, color: ELECTRIC },
  { name: 'Rahul M.', role: 'Clinic Director', text: 'Clear reporting, no jargon. They told us what they changed, why, and what it did to our numbers — every single month.', color: AMBER },
  { name: 'Ayesha K.', role: 'E-commerce Manager', text: 'Creative that actually looks like our brand plus targeting that reaches real buyers. Our cost per lead dropped and stayed down.', color: PURPLE },
]);

const TestimonialSlider = ({ page }) => {
  const quotes = quotesFor(page);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 5200);
    return () => clearInterval(t);
  }, [quotes.length]);
  const q = quotes[idx];
  return (
    <div className="relative max-w-3xl mx-auto">
      <Quote className="absolute -top-6 -left-2 w-14 h-14 opacity-20" style={{ color: q.color }} />
      <AnimatePresence mode="wait">
        <motion.figure key={idx}
          initial={{ opacity: 0, y: 24, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45 }}
          className="rounded-[2.5rem] p-8 sm:p-10 text-center shadow-xl"
          style={{ background: 'white', border: `3px solid ${q.color}26` }}>
          <p className="mktx-display text-xl sm:text-2xl font-semibold italic leading-relaxed mb-6" style={{ color: INK }}>
            “{q.text}”
          </p>
          <figcaption>
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center text-white font-black"
              style={{ background: q.color, borderRadius: BLOBS[idx % 4] }}>
              {q.name[0]}
            </div>
            <p className="font-black text-sm" style={{ color: INK }}>{q.name}</p>
            <p className="text-xs font-semibold" style={{ color: SOFT }}>{q.role}</p>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button aria-label="Previous testimonial" onClick={() => setIdx((idx + quotes.length - 1) % quotes.length)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: `${ELECTRIC}12`, color: ELECTRIC }}><ChevronLeft className="w-5 h-5" /></button>
        {quotes.map((_, i) => (
          <button key={i} aria-label={`Testimonial ${i + 1}`} onClick={() => setIdx(i)}
            className="rounded-full transition-all"
            style={{ width: idx === i ? 22 : 8, height: 8, background: idx === i ? AMBER : '#dde4f0' }} />
        ))}
        <button aria-label="Next testimonial" onClick={() => setIdx((idx + 1) % quotes.length)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: `${ELECTRIC}12`, color: ELECTRIC }}><ChevRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
};

/* ─── Speech-bubble FAQ ──────────────────────────────────────────────── */
const mktFaqs = (page) => ([
  { q: `How soon will ${page.title.toLowerCase()} show results?`, a: 'Paid channels start producing data in days; organic channels compound over 2–4 months. Either way you get a monthly report that shows exactly what moved and what we are doing next.' },
  { q: 'Do you work with our budget?', a: 'Yes — we plan around your monthly budget, split it across the channels most likely to convert for your audience, and rebalance based on real performance, not guesses.' },
  { q: 'Will we own our ad accounts and data?', a: 'Always. Ad accounts, analytics, pixels and audiences are created under your business — you keep everything even if we stop working together.' },
  { q: 'How do you report performance?', a: 'A live dashboard plus a monthly review call: spend, leads, cost per lead, best creatives, and the exact experiments planned for next month.' },
  { q: 'Can you match our brand voice?', a: 'We start with a brand-voice worksheet and mood board, then iterate creatives with you until the tone feels unmistakably yours.' },
]);

const BubbleFAQ = ({ page }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-5">
      {mktFaqs(page).map((f, i) => (
        <motion.div key={f.q} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }} transition={{ delay: i * 0.05 }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left rounded-[1.8rem] rounded-bl-md px-6 py-4 flex items-center gap-3 shadow-md transition-transform hover:-translate-y-0.5"
            style={{ background: open === i ? BRIGHTS[i % 4] : 'white', border: `2px solid ${BRIGHTS[i % 4]}2a` }}>
            <MessageCircle className="w-5 h-5 flex-shrink-0" style={{ color: open === i ? (BRIGHTS[i % 4] === LIME ? NAVY : 'white') : BRIGHTS[i % 4] }} />
            <span className="font-black text-sm sm:text-base" style={{ color: open === i ? (BRIGHTS[i % 4] === LIME ? NAVY : 'white') : INK }}>{f.q}</span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="ml-8 mt-3 rounded-[1.8rem] rounded-tl-md px-6 py-4 shadow-sm"
                  style={{ background: PAPER, border: '2px solid #e4eaf5' }}>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: SOFT }}>{f.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

/* ═══ MAIN TEMPLATE ═══════════════════════════════════════════════════ */
export default function MarketingServiceDetail({ page, FooterComponent, ContactSectionComponent }) {
  const Icon = page.icon;
  return (
    <div className="mktx-shell min-h-screen overflow-x-clip bg-white" style={{ color: INK }}>
      <style>{`
        .mktx-shell{font-family:'Manrope','Inter',system-ui,sans-serif;}
        .mktx-display{font-family:'Fraunces','Georgia',serif;}
        .mktx-diagonal-both{clip-path:polygon(0 4vw,100% 0,100% calc(100% - 4vw),0 100%);}
        .mktx-chip{animation:mktxChipFloat 4.4s ease-in-out infinite;}
        .mktx-rise{animation:mktxRise 4.6s ease-in-out infinite;transform-origin:center bottom;}
        .mktx-float{animation:mktxFloat 5.2s ease-in-out infinite;}
        .mktx-pulse{animation:mktxPulse 2.8s ease-in-out infinite;}
        @keyframes mktxChipFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes mktxRise{0%,100%{transform:scaleY(.92)}50%{transform:scaleY(1)}}
        @keyframes mktxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes mktxPulse{0%,100%{opacity:1}50%{opacity:.3}}
        @media (prefers-reduced-motion: reduce){.mktx-shell *{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
      `}</style>

      {/* ── HERO — premium navy campaign cover ───────────────────────── */}
      <section className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 60%, #1a2f5c 100%)`, paddingTop: '7.5rem', paddingBottom: '6rem' }}>
        {/* glow blobs — electric + amber */}
        <motion.div className="absolute -top-28 -right-28 w-[460px] h-[460px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ELECTRIC}3a, transparent 70%)`, borderRadius: BLOBS[0], filter: 'blur(30px)' }}
          animate={{ borderRadius: [BLOBS[0], BLOBS[2], BLOBS[0]], rotate: [0, 14, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute -bottom-36 -left-28 w-[420px] h-[420px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${AMBER}2e, transparent 70%)`, borderRadius: BLOBS[1], filter: 'blur(30px)' }}
          animate={{ borderRadius: [BLOBS[1], BLOBS[3], BLOBS[1]], rotate: [0, -12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <Confetti dim />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-14 lg:gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <motion.span initial={{ scale: 0, rotate: -8 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 12 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest mb-7 shadow-lg"
              style={{ background: `linear-gradient(120deg, ${AMBER}, ${AMBER_LIGHT})`, color: NAVY, borderRadius: BLOBS[2] }}>
              <Icon className="w-4 h-4" /> {page.kicker}
            </motion.span>

            <h1 className="mktx-display font-black leading-[1.02] mb-3 text-white" style={{ fontSize: 'clamp(2.6rem, 5.6vw, 4.8rem)' }}>
              {page.title}
              <em className="block font-black" style={{
                background: `linear-gradient(110deg, ${SKY}, ${AMBER_LIGHT} 70%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>that converts.</em>
            </h1>
            <div className="mx-0" style={{ width: 'fit-content' }}><Squiggle color={AMBER} /></div>

            <p className="text-lg leading-relaxed mt-6 mb-9 max-w-xl font-medium" style={{ color: '#b9c6e2' }}>{page.description}</p>

            <div className="flex flex-wrap gap-4">
              <motion.a href="#/contact?focus=message"
                whileHover={{ scale: 1.05, boxShadow: `0 14px 44px -8px ${AMBER}77` }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-9 py-4 font-black text-base shadow-xl"
                style={{ background: `linear-gradient(120deg, ${AMBER}, ${AMBER_LIGHT})`, color: NAVY, borderRadius: '2rem 2rem 2rem 0.4rem' }}>
                Connect <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a href="#/marketing" whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-9 py-4 font-black text-base text-white"
                style={{ background: '#ffffff10', border: `2px solid ${SKY}55`, borderRadius: '0.4rem 2rem 2rem 2rem' }}>
                <Sparkles className="w-5 h-5" style={{ color: SKY }} /> All Marketing Services
              </motion.a>
            </div>
          </motion.div>

          {/* Campaign dashboard visual */}
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="pb-6">
            <CampaignDashboard page={page} />
          </motion.div>
        </div>
      </section>

      {/* ── ZIG-ZAG INCLUSIONS ───────────────────────────────────────── */}
      <section className="relative py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4"
              style={{ background: `${ELECTRIC}10`, color: ELECTRIC }}>
              <PartyPopper className="w-4 h-4" /> Inside the plan
            </span>
            <h2 className="mktx-display font-black" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: INK }}>
              Every ingredient of your <em style={{ color: ELECTRIC }}>{page.title.toLowerCase()}</em> recipe.
            </h2>
          </motion.div>

          <div className="space-y-10">
            {page.bullets.map((b, i) => {
              const color = BRIGHTS[i % 4];
              const kp = page.keyPoints?.[i % (page.keyPoints?.length || 1)];
              const left = i % 2 === 0;
              return (
                <motion.div key={b}
                  initial={{ opacity: 0, x: left ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col sm:flex-row items-center gap-6 ${left ? '' : 'sm:flex-row-reverse'}`}>
                  <motion.div whileHover={{ scale: 1.08, rotate: left ? 6 : -6 }}
                    className="w-24 h-24 flex-shrink-0 flex items-center justify-center shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${color}, ${BRIGHTS[(i + 1) % 4]})`, borderRadius: BLOBS[i % 4] }}>
                    <span className="mktx-display font-black text-3xl" style={{ color: color === LIME || BRIGHTS[(i + 1) % 4] === LIME ? NAVY : 'white' }}>{i + 1}</span>
                  </motion.div>
                  <div className={`flex-1 rounded-[2.2rem] px-7 py-6 shadow-lg ${left ? 'sm:rounded-tl-md' : 'sm:rounded-tr-md'}`}
                    style={{ background: PAPER, border: `2px solid ${color}22` }}>
                    <h3 className="mktx-display font-black text-xl mb-1.5" style={{ color: INK }}>{b}</h3>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: SOFT }}>
                      {kp ? kp.desc : `${b} planned, produced and measured as part of your ${page.title.toLowerCase()} engine.`}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DIAGONAL RESULTS BAND — funnel + keypoints ───────────────── */}
      <section className="mktx-diagonal-both relative py-28 overflow-hidden"
        style={{ background: `linear-gradient(120deg, ${PAPER}, #eef3fe 55%, #fdf6e9)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.3 }}>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: AMBER }}>Why it works</span>
            <h2 className="mktx-display font-black mt-3 mb-8" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', color: INK }}>
              Strategy first. <em style={{ color: ELECTRIC }}>Sparkle second.</em>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {(page.keyPoints || []).map((kp, i) => (
                <motion.div key={kp.title}
                  initial={{ opacity: 0, y: 26, rotate: i % 2 ? 2 : -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.2 : -1.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ rotate: 0, y: -6 }}
                  className="rounded-[1.6rem] p-5 bg-white shadow-lg"
                  style={{ border: `2px solid ${BRIGHTS[i % 4]}26` }}>
                  <div className="w-9 h-9 mb-3 flex items-center justify-center"
                    style={{ background: `${BRIGHTS[i % 4]}16`, borderRadius: BLOBS[i % 4] }}>
                    <Flame className="w-4 h-4" style={{ color: BRIGHTS[i % 4] === LIME ? '#65a30d' : BRIGHTS[i % 4] }} />
                  </div>
                  <h3 className="font-black text-sm mb-1" style={{ color: INK }}>{kp.title}</h3>
                  <p className="text-xs leading-relaxed font-medium" style={{ color: SOFT }}>{kp.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.3 }}>
            <MiniFunnel page={page} />
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS — curved story path ──────────────────────────────── */}
      {page.process && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="text-center mb-14">
              <h2 className="mktx-display font-black" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: INK }}>
                The journey from <em style={{ color: AMBER }}>hello</em> to <em style={{ color: ELECTRIC }}>growth.</em>
              </h2>
              <Squiggle color={ELECTRIC} />
            </motion.div>
            <div className="relative">
              {/* dotted spine */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0 hidden sm:block"
                style={{ borderLeft: `3px dashed ${ELECTRIC}3a` }} />
              <div className="space-y-10">
                {page.process.map((step, i) => {
                  const color = BRIGHTS[i % 4];
                  const left = i % 2 === 0;
                  return (
                    <motion.div key={step}
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.6 }}
                      className={`relative sm:w-1/2 ${left ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'}`}>
                      <motion.span whileHover={{ scale: 1.2 }}
                        className={`hidden sm:flex absolute top-2 items-center justify-center w-9 h-9 text-xs font-black shadow-lg z-10 ${left ? '-right-[1.2rem]' : '-left-[1.2rem]'}`}
                        style={{ background: color, color: color === LIME ? NAVY : 'white', borderRadius: BLOBS[i % 4] }}>
                        {i + 1}
                      </motion.span>
                      <div className="rounded-[1.8rem] px-6 py-5 shadow-lg inline-block"
                        style={{ background: PAPER, border: `2px solid ${color}2a` }}>
                        <p className="sm:hidden mktx-display font-black text-lg mb-1" style={{ color: color === LIME ? '#65a30d' : color }}>Step {i + 1}</p>
                        <h3 className="font-black" style={{ color: INK }}>{step}</h3>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: PAPER }}>
        <Confetti count={10} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
              style={{ background: `${AMBER}18`, color: '#b45309' }}>
              <Star className="w-4 h-4" fill={AMBER} stroke={AMBER} /> Client love
            </span>
            <h2 className="mktx-display font-black mt-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: INK }}>
              Brands we made louder.
            </h2>
          </motion.div>
          <TestimonialSlider page={page} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="text-center mb-12">
            <h2 className="mktx-display font-black" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: INK }}>
              Let's clear things up <em style={{ color: ELECTRIC }}>✳</em>
            </h2>
            <p className="font-medium mt-3" style={{ color: SOFT }}>The questions every smart brand asks before hiring us.</p>
          </motion.div>
          <BubbleFAQ page={page} />
        </div>
      </section>

      {/* ── CTA — premium navy band with wave top ────────────────────── */}
      <section className="relative overflow-hidden">
        <svg viewBox="0 0 1440 90" className="w-full block bg-white" preserveAspectRatio="none" style={{ height: 70 }} aria-hidden="true">
          <path d="M0,70 C240,10 480,100 720,55 C960,10 1200,90 1440,35 L1440,90 L0,90 Z"
            fill="url(#mktxwave)" />
          <defs>
            <linearGradient id="mktxwave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={NAVY} /><stop offset="60%" stopColor={NAVY2} /><stop offset="100%" stopColor="#1a2f5c" />
            </linearGradient>
          </defs>
        </svg>
        <div className="py-24 relative" style={{ background: `linear-gradient(120deg, ${NAVY}, ${NAVY2} 60%, #1a2f5c)` }}>
          <div className="absolute top-0 right-[10%] w-80 h-80 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${ELECTRIC}30, transparent 70%)`, filter: 'blur(20px)' }} />
          <div className="absolute bottom-0 left-[8%] w-72 h-72 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${AMBER}26, transparent 70%)`, filter: 'blur(20px)' }} />
          <Confetti count={10} dim />
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.7 }}>
              <h2 className="mktx-display font-black text-white mb-5" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.6rem)' }}>
                Your audience is scrolling <em style={{ color: AMBER_LIGHT }}>right now.</em>
              </h2>
              <p className="text-lg font-medium mb-9" style={{ color: '#b9c6e2' }}>
                Get a free {page.title.toLowerCase()} audit — we'll show you exactly where the growth is hiding.
              </p>
              <motion.a href="#/contact?focus=message"
                whileHover={{ scale: 1.07, boxShadow: `0 16px 50px -8px ${AMBER}88` }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-10 py-5 font-black text-lg shadow-2xl"
                style={{ background: `linear-gradient(120deg, ${AMBER}, ${AMBER_LIGHT})`, color: NAVY, borderRadius: '2.4rem 2.4rem 0.5rem 2.4rem' }}>
                Contact <Send className="w-5 h-5" />
              </motion.a>
              <p className="text-xs font-bold mt-5 flex items-center justify-center gap-2" style={{ color: '#8ca0c8' }}>
                <TrendingUp className="w-4 h-4" style={{ color: LIME }} /> No contracts. No jargon. Just a plan you can keep.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {ContactSectionComponent && <ContactSectionComponent />}
      {FooterComponent && <FooterComponent />}
    </div>
  );
}
