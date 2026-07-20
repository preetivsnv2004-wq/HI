/**
 * SolutionServiceDetail — detail template for ALL Solutions subpages.
 * Identity: premium enterprise corporate (Microsoft/IBM/Salesforce tone).
 * White + deep navy + gold accents, serif display type, structured
 * rectangular sections, sticky sidebar navigation, vertical process
 * timeline, comparison table, expandable solution cards, trust
 * indicators, metrics band. Animations: restrained fades & elevation.
 * Class prefix `solx-`. No neon, no glassmorphism, no playful shapes.
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Building2, BadgeCheck, ShieldCheck,
  FileCheck2, Landmark, LineChart, Scale, Check, X, Phone, Layers3,
  Users, TrendingUp, Sparkles, Database,
} from 'lucide-react';

/* ─── Palette (corporate — gold lives here, nowhere else) ────────────── */
const NAVY = '#0e2340';
const GOLD = '#f5aa02';
const GOLD_LIGHT = '#f5aa02';
const PAPER = '#f7f8fa';
const LINE = '#e3e7ee';
const BODY = '#4b5871';

const routeSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const easeOut = [0.25, 0.6, 0.3, 1];
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: { delay, duration: 0.7, ease: easeOut },
});

const parseStat = (s) => {
  const m = String(s).match(/^(\d+(?:\.\d+)?)\s*([%+x×]*)\s*(.*)$/);
  if (m && m[1]) return { num: parseFloat(m[1]), suffix: m[2] || '', label: m[3] || '' };
  return { num: null, suffix: '', label: s };
};

const CHARCOAL = '#1a222e';
const CHARCOAL2 = '#232e3d';
const EMERALD = '#10b981';
const CYAN = '#22d3ee';
const SILVER = '#cbd5e1';

const SOLUTION_HERO_CONFIG = {
  Startups: {
    variant: 'launch-board',
    accent: CYAN,
    accentSoft: GOLD_LIGHT,
    badge: 'Launch Sprint Active',
    title: 'Startup runway board',
    subtitle: 'Milestones, experiments and investor-facing readiness.',
    primary: '4 weeks',
    primaryLabel: 'MVP launch runway',
    stats: ['7 tests queued', '2 funnels live', 'Pitch deck synced'],
    statIcons: [Sparkles, TrendingUp, FileCheck2],
    chips: ['MVP', 'Landing page', 'Pitch', 'Growth'],
  },
  Healthcare: {
    variant: 'patient-board',
    accent: EMERALD,
    accentSoft: CYAN,
    badge: 'Patient Flow Stable',
    title: 'Patient journey board',
    subtitle: 'Bookings, reviews and compliant follow-up operations.',
    primary: '128',
    primaryLabel: 'Weekly bookings',
    stats: ['4.9 review avg', '92% slot fill', '0 policy flags'],
    statIcons: [BadgeCheck, LineChart, ShieldCheck],
    chips: ['Bookings', 'Reviews', 'Local SEO', 'Follow-up'],
  },
  'Real Estate': {
    variant: 'property-board',
    accent: GOLD_LIGHT,
    accentSoft: CYAN,
    badge: 'Lead Queue Warm',
    title: 'Property lead desk',
    subtitle: 'Listings, site visits and nurture sequencing aligned.',
    primary: '42',
    primaryLabel: 'Site visits booked',
    stats: ['310 hot leads', '18 projects live', '6 agents synced'],
    statIcons: [Users, Building2, Database],
    chips: ['Listings', 'Site visits', 'CRM', 'Nurture'],
  },
  'E-commerce': {
    variant: 'roi-board',
    accent: GOLD_LIGHT,
    accentSoft: CYAN,
    badge: 'Store Revenue Live',
    title: 'Commerce growth desk',
    subtitle: 'Acquisition, conversion and retention performance in view.',
    primary: '3.8x',
    primaryLabel: 'Tracked revenue return',
    stats: ['32% cart recovery', '18% AOV lift', '6 flows active'],
    statIcons: [TrendingUp, LineChart, Database],
    chips: ['Store', 'Shopping ads', 'Cart recovery', 'Retention'],
  },
  Enterprise: {
    variant: 'governance-board',
    accent: GOLD_LIGHT,
    accentSoft: SILVER,
    badge: 'SLA Controlled',
    title: 'Enterprise command layer',
    subtitle: 'Teams, approvals and multi-channel governance in view.',
    primary: '99.95%',
    primaryLabel: 'SLA adherence',
    stats: ['5 teams aligned', '12 reports weekly', '24/7 oversight'],
    statIcons: [Users, LineChart, ShieldCheck],
    chips: ['SLA', 'Security', 'Approvals', 'BI'],
  },
  'Brand Building': {
    variant: 'brand-board',
    accent: GOLD_LIGHT,
    accentSoft: EMERALD,
    badge: 'Brand System Live',
    title: 'Brand consistency kit',
    subtitle: 'Palette, messaging and proof assets kept in one place.',
    primary: '86',
    primaryLabel: 'Consistency score',
    stats: ['14 assets approved', '3 brand themes', '1 voice guide'],
    statIcons: [BadgeCheck, Layers3, Sparkles],
    chips: ['Palette', 'Messaging', 'Story', 'Social'],
  },
  'Performance Marketing': {
    variant: 'roi-board',
    accent: GOLD_LIGHT,
    accentSoft: CYAN,
    badge: 'Revenue Tracked',
    title: 'ROI control room',
    subtitle: 'Spend, return and landing-page readiness tied together.',
    primary: '4.2x',
    primaryLabel: 'Revenue multiple',
    stats: ['₹8.6L pipeline', '14 campaigns live', '18% CVR lift'],
    statIcons: [TrendingUp, LineChart, Scale],
    chips: ['Paid media', 'Funnel', 'Attribution', 'ROAS'],
  },
};

/* ─── Elegant counter ────────────────────────────────────────────────── */
const QuietCounter = ({ to, suffix = '', duration = 2 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / (duration * 1000), 1);
        setVal(Math.round((1 - Math.pow(1 - p, 2)) * to * 10) / 10);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{Number.isInteger(to) ? Math.round(val) : val}{suffix}</span>;
};

/* ─── Section heading (thin gold rule — signature of this identity) ──── */
const SectionHead = ({ eyebrow, title, center = false, light = false }) => (
  <motion.div {...fade()} className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-12`}>
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
      <span className="h-px w-10" style={{ background: GOLD }} />
      <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: GOLD }}>{eyebrow}</span>
      {center && <span className="h-px w-10" style={{ background: GOLD }} />}
    </div>
    <h2 className="solx-serif font-bold leading-tight" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', color: '#fff' }}>
      {title}
    </h2>
  </motion.div>
);

/* ─── Enterprise FAQ ─────────────────────────────────────────────────── */
const solFaqs = (page) => ([
  { q: `How do you scope a ${page.title.toLowerCase()} engagement?`, a: 'Every engagement begins with a structured discovery: stakeholder interviews, current-state assessment, and a written scope with deliverables, milestones and governance model — signed off before work begins.' },
  { q: 'How is progress governed and reported?', a: 'A named engagement lead, a shared delivery plan, weekly status reports, and a monthly steering review covering milestones, risks, and budget position.' },
  { q: 'How do you handle data security and compliance?', a: 'Access is role-based and least-privilege, credentials are stored in managed vaults, and we align with your existing security review and vendor-compliance processes, including NDAs and DPAs.' },
  { q: 'Can you integrate with our existing systems and teams?', a: 'Yes. We design around your current CRM, ERP and analytics stack, and can operate as an embedded team alongside internal IT with clear responsibility boundaries.' },
  { q: 'What does long-term partnership look like?', a: 'After delivery, engagements typically move to a quarterly roadmap: managed improvements, performance reviews and priority support under an agreed service level.' },
]);

const capabilityDescriptions = {
  Startups: {
    'MVP Landing Pages': 'Lean conversion pages that explain the offer, capture early demand, and validate positioning before heavy product investment.',
    'Launch Campaigns': 'Launch messaging, channel setup, creative assets, and first campaigns planned around early traction and feedback speed.',
    'Investor-Ready Assets': 'Pitch-friendly pages, proof sections, product snapshots, and concise collateral that make the startup look fundable.',
    'Growth Experiments': 'Small controlled tests across audiences, offers, funnels, and CTAs to find repeatable acquisition signals.',
    'Brand Identity': 'A focused startup identity system with logo usage, colours, typography, tone, and digital presentation rules.',
    'Analytics Setup': 'GA4 events, form tracking, campaign UTMs, and dashboard views so founders know what is actually working.',
  },
  Healthcare: {
    'Local SEO for Clinics': 'Clinic service pages, location signals, Maps optimisation, and patient-friendly content built for nearby searches.',
    'Google Ads for Doctors': 'Policy-aware search campaigns focused on high-intent treatments, appointment actions, and local service areas.',
    'Reputation Management': 'Review request flows, response guidance, testimonial placement, and trust signals that support patient confidence.',
    'Patient-Centric UX': 'Clear doctor profiles, appointment paths, treatment information, phone actions, and accessible mobile layouts.',
    'Telemedicine Marketing': 'Online consultation pages, booking prompts, follow-up messaging, and education content for remote care.',
    'Healthcare Content': 'Ethical condition, treatment, FAQ, and clinic content written to educate without overclaiming medical outcomes.',
  },
  'Real Estate': {
    'Lead Generation Campaigns': 'Property enquiry campaigns with budget control, audience filters, project context, and lead quality tracking.',
    'Facebook Property Ads': 'Visual ad sets for projects, local buyers, remarketing audiences, and site-visit intent segments.',
    'IDX Website Integration': 'Searchable property listings, enquiry actions, filters, and CRM handoff for broker or developer websites.',
    'Listing SEO': 'Area, project, and property-type landing pages designed for buyers searching with local intent.',
    'CRM Automation': 'Lead routing, visit reminders, WhatsApp follow-ups, agent assignment, and stage-based nurture workflows.',
    'Virtual Tour Marketing': 'Video tours, walkthrough embeds, social clips, and landing pages that qualify buyers before site visits.',
  },
  'E-commerce': {
    'Commerce Growth Strategy': 'A commercial roadmap connecting audience priorities, product positioning, acquisition channels, conversion goals, retention opportunities, and operational requirements.',
    'Storefront Experience': 'Navigation, search, collections, product discovery, product pages, trust signals, and mobile interactions designed as one coherent shopping journey.',
    'Checkout Optimization': 'Cart and checkout flows reviewed for payment clarity, shipping visibility, guest purchase, trust, form friction, and mobile completion.',
    'Revenue Operations': 'Orders, customer segments, campaign sources, inventory context, and reporting signals organized for clearer commercial decisions.',
    'Customer Retention': 'Lifecycle journeys for onboarding, cart recovery, replenishment, loyalty, cross-sell, review requests, and customer win-back.',
    'Analytics & Automation': 'Purchase events, funnel reporting, customer cohorts, campaign attribution, notifications, and workflow automation connected around measurable growth.',
  },
  Enterprise: {
    'Dedicated Account Team': 'Specialist roles assigned around strategy, delivery, reporting, technical support, and stakeholder communication.',
    'Custom Dashboards': 'Executive dashboards that combine channel performance, operational metrics, pipeline movement, and ROI context.',
    'Multi-channel Strategy': 'SEO, paid media, content, email, and website improvements planned as one coordinated growth system.',
    'Enterprise SEO': 'Large-site technical audits, content architecture, authority building, governance, and performance reporting.',
    'API Integrations': 'Connections between CRM, ERP, analytics, website forms, campaign platforms, and internal reporting systems.',
    'SLA Guarantees': 'Defined response windows, escalation paths, documentation standards, and ongoing performance accountability.',
  },
  'Brand Building': {
    'Brand Positioning': 'A clear market promise, audience definition, differentiators, and messaging pillars for consistent communication.',
    'Visual Direction': 'Colour, typography, imagery, icon, and layout direction that makes the brand feel premium and recognisable.',
    'Website Story': 'Homepage and service-page messaging that explains the brand, builds trust, and guides visitors toward enquiry.',
    'Social Identity': 'Reusable social templates, post themes, profile language, and visual rules for consistent platform presence.',
    'Trust Sections': 'Reviews, proof blocks, process sections, team credibility, FAQs, and project highlights placed strategically.',
    'Campaign Messaging': 'Ad, landing-page, email, and sales copy themes aligned with the same brand promise.',
  },
  'Performance Marketing': {
    'Growth Strategy': 'Channel priorities, funnel stages, budget logic, offers, landing pages, and KPIs planned before spend increases.',
    'Paid Media': 'Google, Meta, or remarketing campaigns structured around intent, audience quality, and conversion events.',
    'Landing Pages': 'Focused pages with one offer, proof, FAQs, trust signals, and clear CTA paths to improve conversion rate.',
    'Conversion Tracking': 'Events for forms, calls, WhatsApp, purchases, demos, and key actions connected to campaign reporting.',
    Retargeting: 'Audience sequences that bring back visitors with proof-led creatives, stronger offers, and stage-specific messaging.',
    'Weekly Optimization': 'Routine reviews of spend, creatives, keywords, audiences, search terms, and landing-page performance.',
  },
};

const approachDescriptions = {
  Startups: {
    'Brand Sprint': 'We clarify the idea, audience, positioning, offer, visual direction, and launch priorities in one focused sprint.',
    'Website Launch': 'A lean website or landing page goes live with product story, proof blocks, lead capture, and analytics.',
    'Growth Experiments': 'We test channels, CTAs, creatives, and audience segments quickly to identify early acquisition signals.',
    'Scale & Optimize': 'Winning experiments are refined into repeatable campaigns, content improvements, and next-stage feature priorities.',
  },
  Healthcare: {
    'Compliance Audit': 'We review claims, ad policy risks, patient journey, review visibility, and local search foundations first.',
    'Local SEO Setup': 'Google profile, clinic pages, services, schema, citations, and patient-friendly content are structured for local discovery.',
    'Reputation Program': 'Review generation, response workflows, testimonial placement, and trust sections are organised into a repeatable system.',
    'Patient Acquisition': 'Search campaigns, booking flows, WhatsApp/call actions, and reporting are optimised around appointments.',
  },
  'Real Estate': {
    'Market Research': 'We study project location, buyer segments, competing listings, price bands, and enquiry behaviour before campaign setup.',
    'Lead Gen Setup': 'Campaigns, landing pages, lead forms, WhatsApp CTAs, and tracking are built around qualified property enquiries.',
    'Nurture Automation': 'Follow-up messages, visit reminders, agent assignment, and CRM stages keep prospects moving toward site visits.',
    'Agent Dashboard': 'Agents get lead status, source quality, project interest, and follow-up visibility in one workflow.',
  },
  'E-commerce': {
    'Commerce Discovery': 'We review customers, products, margins, channels, storefront journeys, checkout friction, operations, retention, and current reporting.',
    'Journey & System Design': 'The future customer journey, integrations, measurement plan, lifecycle flows, ownership, and implementation priorities are documented.',
    'Implementation & Integration': 'Storefront improvements, checkout changes, analytics events, customer workflows, and required platform connections are configured and tested.',
    'Optimize & Scale': 'Conversion, acquisition quality, repeat purchase, order value, and operational performance are reviewed to prioritize the next growth cycle.',
  },
  Enterprise: {
    'Discovery & Audit': 'Stakeholders, systems, channels, data quality, compliance needs, and reporting gaps are reviewed before execution.',
    'Strategy & Roadmap': 'We define priorities, owners, timelines, governance, SLAs, integrations, and measurable business outcomes.',
    'Team Onboarding': 'Internal teams receive workflows, documentation, dashboards, communication cadence, and escalation paths.',
    'Ongoing Partnership': 'Performance reviews, optimisation cycles, technical support, and roadmap updates continue after launch.',
  },
  'Brand Building': {
    'Brand Audit': 'We review current visuals, messaging, competitors, customer perception, website flow, and trust gaps.',
    Positioning: 'The brand promise, audience, differentiators, proof points, and tone are turned into a clear messaging system.',
    'Visual System': 'Colours, typography, UI patterns, imagery, icons, and layout rules are documented for consistent execution.',
    'Launch Assets': 'Website sections, social templates, ad messages, presentation assets, and campaign copy are prepared for rollout.',
  },
  'Performance Marketing': {
    'Growth Audit': 'We inspect traffic sources, funnel leaks, offer clarity, tracking gaps, past campaign data, and conversion quality.',
    'Campaign Build': 'Campaigns, audiences, keywords, creatives, landing pages, and budgets are set up around revenue intent.',
    'Tracking Setup': 'Conversion events, UTMs, source reports, dashboards, and lead-quality feedback loops are configured.',
    'Scale Winners': 'Budgets shift toward working ads, audiences, landing pages, and offers while weak paths are cut or rebuilt.',
  },
};

const getCapabilityDescription = (page, item) => capabilityDescriptions[page.title]?.[item]
  || `${item} is planned for ${page.title.toLowerCase()} with relevant proof, measurable outcomes, and a clear conversion path.`;

const getApproachDescription = (page, step) => approachDescriptions[page.title]?.[step]
  || `${step} is completed with clear ownership, documented decisions, stakeholder review, and a practical handover.`;

const CorporateFAQ = ({ page }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, borderColor: LINE }}>
      {solFaqs(page).map((f, i) => (
        <div key={f.q} style={{ borderColor: LINE }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-6 py-5 text-left group">
            <span className="solx-serif font-semibold text-base sm:text-lg transition-colors"
              style={{ color: open === i ? GOLD : NAVY }}>{f.q}</span>
            <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5" style={{ color: GOLD }} />
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: easeOut }} className="overflow-hidden">
                <p className="pb-6 pr-10 text-sm leading-7" style={{ color: BODY }}>{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

/* ─── Comparison table ───────────────────────────────────────────────── */
const ComparisonTable = ({ page }) => {
  const rows = [
    ['Dedicated engagement lead', true, false],
    ['Written scope, milestones & governance', true, false],
    ['Weekly reporting & steering reviews', true, false],
    ['Security & compliance alignment', true, false],
    ['Post-delivery roadmap & SLA support', true, false],
    ['One-off, unmanaged delivery', false, true],
  ];
  return (
    <motion.div {...fade(0.1)} className="overflow-hidden rounded-lg" style={{ border: `1px solid ${LINE}`, boxShadow: '0 24px 60px -30px rgba(14,35,64,.25)' }}>
      <div className="grid grid-cols-[1.6fr_1fr_1fr] text-sm">
        <div className="px-5 py-4 font-bold" style={{ background: PAPER, color: NAVY }}>Engagement standard</div>
        <div className="px-5 py-4 text-center font-bold text-white" style={{ background: NAVY }}>
          AuraShine <span style={{ color: GOLD_LIGHT }}>Solutions</span>
        </div>
        <div className="px-5 py-4 text-center font-semibold" style={{ background: PAPER, color: BODY }}>Typical vendor</div>
        {rows.map(([label, us, them], i) => (
          <React.Fragment key={label}>
            <div className="px-5 py-3.5 font-medium" style={{ color: '#fff', borderTop: `1px solid ${LINE}` }}>{label}</div>
            <div className="px-5 py-3.5 flex justify-center items-center" style={{ borderTop: `1px solid ${LINE}`, background: '#0e234008' }}>
              {us ? <Check className="w-5 h-5" style={{ color: GOLD }} /> : <X className="w-4 h-4" style={{ color: GOLD }} />}
            </div>
            <div className="px-5 py-3.5 flex justify-center items-center" style={{ borderTop: `1px solid ${LINE}` }}>
              {them ? <Check className="w-5 h-5" style={{ color: GOLD }} /> : <X className="w-4 h-4" style={{ color: GOLD }} />}
            </div>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

/* ─── HERO VISUAL — business automation board ────────────────────────── *
 * Charcoal board with emerald/cyan workflow nodes, a mini CRM pipeline
 * and gold KPI chips. Deliberately unlike the Development code editor
 * and the Marketing campaign dashboard.                                  */
const AutomationBoard = ({ page }) => {
  const Icon = page.icon;
  const visual = SOLUTION_HERO_CONFIG[page.title] || SOLUTION_HERO_CONFIG.Startups;
  const accent = visual.accent;
  const soft = visual.accentSoft;

  const chip = (label, index) => (
    <span
      key={label}
      className="solx-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.16em]"
      style={{
        color: index % 2 === 0 ? accent : soft,
        background: `${index % 2 === 0 ? accent : soft}12`,
        border: `1px solid ${index % 2 === 0 ? accent : soft}2a`,
        animationDelay: `${index * 0.18}s`,
      }}
    >
      {label}
    </span>
  );

  /* per-variant tile shapes + per-page icons so no two subpages share the
     same KPI treatment */
  const TILE_SHAPES = {
    'launch-board': { borderRadius: '0.55rem', borderLeft: `3px solid ${accent}` },
    'patient-board': { borderRadius: '1.4rem' },
    'property-board': { borderRadius: '0.55rem', borderLeft: `3px solid ${accent}` },
    'governance-board': { borderRadius: '0.4rem', borderTop: `3px solid ${accent}` },
    'brand-board': { borderRadius: '0.9rem', borderBottom: `3px solid ${accent}` },
    'roi-board': { borderRadius: '0.55rem' },
  };
  const statTile = (value, label, index) => {
    const SIcon = (visual.statIcons || [])[index];
    return (
      <div key={label} className="px-3 py-3 text-center"
        style={{ background: '#141b25', border: '1px solid #2e3b4d', ...(TILE_SHAPES[visual.variant] || {}) }}>
        {SIcon && <SIcon className="w-3.5 h-3.5 mx-auto mb-1.5" style={{ color: index % 2 === 0 ? accent : soft }} />}
        <p className="solx-serif font-bold text-base" style={{ color: index % 2 === 0 ? accent : soft }}>{value}</p>
        <p className="text-[8.5px] font-semibold uppercase tracking-wide leading-tight mt-1" style={{ color: '#7d8ea6' }}>{label}</p>
      </div>
    );
  };

  const launchBoard = (
    <div className="grid gap-4 lg:grid-cols-[1fr_.9fr]">
      <div className="rounded-lg p-4" style={{ background: CHARCOAL2, border: '1px solid #2e3b4d' }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-bold">Milestone runway</p>
          <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: accent }}>Live sprint</span>
        </div>
        {['MVP page', 'Beta launch', 'Experiment set', 'Investor pack'].map((label, i) => (
          <div key={label} className="relative flex items-center justify-between rounded-lg px-3 py-2.5 mb-2" style={{ background: '#141b25', border: `1px solid ${i % 2 === 0 ? accent : soft}1f` }}>
            <span className="text-sm font-semibold text-white">{label}</span>
            <span className="text-xs font-black" style={{ color: i % 2 === 0 ? accent : soft }}>{['Week 1', 'Week 2', 'Week 3', 'Week 4'][i]}</span>
            {i < 3 && <span className="absolute left-5 top-full h-3 w-px solx-flow" style={{ background: accent }} />}
          </div>
        ))}
      </div>
      <div className="grid gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const patientBoard = (
    <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr] items-center">
      <div className="text-center rounded-lg p-4" style={{ background: CHARCOAL2, border: '1px solid #2e3b4d' }}>
        <div className="mx-auto w-28 h-28 rounded-full grid place-items-center solx-breathe" style={{ border: `8px solid ${accent}20`, background: `radial-gradient(circle, ${accent}18, transparent 72%)` }}>
          <Icon className="w-10 h-10" style={{ color: accent }} />
        </div>
        <p className="solx-serif text-3xl font-bold mt-3" style={{ color: accent }}>{visual.primary}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] mt-1" style={{ color: '#7d8ea6' }}>{visual.primaryLabel}</p>
      </div>
      <div className="space-y-3">
        {['Bookings confirmed', 'Review requests', 'Reminder flows'].map((label, i) => statTile(['128', '38', '92%'][i], label, i))}
      </div>
    </div>
  );

  const propertyBoard = (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {['Listings', 'Site visits', 'Closers'].map((label, i) => (
          <div key={label} className="rounded-lg p-4" style={{ background: CHARCOAL2, border: `1px solid ${i === 1 ? soft : accent}22` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: '#7d8ea6' }}>{label}</p>
            <p className="solx-serif text-2xl font-bold mt-3" style={{ color: i === 1 ? soft : accent }}>{['18', '42', '9'][i]}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg p-4" style={{ background: '#141b25', border: '1px solid #2e3b4d' }}>
        {['New lead', 'Tour booked', 'Follow-up', 'Deal stage'].map((label, i) => (
          <div key={label} className="flex items-center gap-3 mb-2.5">
            <span className="w-16 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: '#7d8ea6' }}>{label}</span>
            <div className="flex-1 h-4 rounded overflow-hidden" style={{ background: '#0f1620' }}>
              <div className="solx-rise h-full rounded" style={{ width: `${[94, 68, 52, 38][i]}%`, background: `linear-gradient(90deg, ${i % 2 === 0 ? accent : soft}, ${i % 2 === 0 ? soft : accent})`, animationDelay: `${i * 0.16}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const governanceBoard = (
    <div className="space-y-4">
      <div className="rounded-lg p-4" style={{ background: CHARCOAL2, border: '1px solid #2e3b4d' }}>
        <div className="grid grid-cols-2 gap-3">
          {['Approvals', 'BI dashboards', 'Legal review', 'Ops cadence'].map((label, i) => (
            <div key={label} className="flex items-center gap-3 rounded-lg p-3" style={{ background: '#141b25', border: `1px solid ${i % 2 === 0 ? accent : soft}1f` }}>
              <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: i % 2 === 0 ? accent : soft }}>{['01', '02', '03', '04'][i]}</p>
              <p className="text-white text-sm font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const brandBoard = (
    <div className="grid gap-4 lg:grid-cols-[.95fr_1.05fr] items-start">
      <div className="rounded-lg p-4" style={{ background: CHARCOAL2, border: '1px solid #2e3b4d' }}>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[NAVY, GOLD_LIGHT, EMERALD].map((color, i) => <span key={color + i} className="h-16 rounded-lg solx-breathe" style={{ background: color, animationDelay: `${i * 0.2}s` }} />)}
        </div>
        <div className="rounded-lg px-4 py-3" style={{ background: '#141b25', border: `1px solid ${accent}1f` }}>
          <p className="solx-serif text-3xl font-bold" style={{ color: accent }}>{visual.primary}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mt-1" style={{ color: '#7d8ea6' }}>{visual.primaryLabel}</p>
        </div>
      </div>
      <div className="grid gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const roiBoard = (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {['Spend', 'ROAS', 'CPL', 'Revenue'].map((label, i) => (
          <div key={label} className="rounded-lg p-4 text-center" style={{ background: CHARCOAL2, border: `1px solid ${i % 2 === 0 ? accent : soft}1f` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: '#7d8ea6' }}>{label}</p>
            <div className="mt-3 h-20 flex items-end justify-center">
              <div className="w-9 rounded-t-2xl solx-rise" style={{ height: `${[54, 86, 40, 94][i]}%`, background: `linear-gradient(180deg, ${i % 2 === 0 ? accent : soft}, ${i % 2 === 0 ? soft : accent})`, animationDelay: `${i * 0.15}s` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">{(visual.stats || []).map((item, i) => statTile(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const visualByVariant = {
    'launch-board': launchBoard,
    'patient-board': patientBoard,
    'property-board': propertyBoard,
    'governance-board': governanceBoard,
    'brand-board': brandBoard,
    'roi-board': roiBoard,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: easeOut }} className="relative max-w-md mx-auto w-full">
      <div className="rounded-xl overflow-hidden" style={{ background: CHARCOAL, border: '1px solid #2e3b4d', boxShadow: '0 40px 90px -30px rgba(0,0,0,.6)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ background: CHARCOAL2, borderBottom: '1px solid #2e3b4d' }}>
          <div>
            <p className="text-white text-sm font-bold">{visual.title}</p>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: '#7d8ea6' }}>{visual.subtitle}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-[0.16em]" style={{ background: `${accent}16`, color: accent, border: `1px solid ${accent}33` }}>
            <Icon className="w-3 h-3" /> {visual.badge}
          </span>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-5">{(visual.chips || []).map(chip)}</div>
          {visualByVariant[visual.variant]}
        </div>

        {/* primary metric — clean footer strip (was a box hanging off the
            bottom-right corner, which looked broken on Enterprise) */}
        <div className="flex items-center justify-between px-6 py-3.5" style={{ background: '#0f1620', borderTop: `1px solid ${accent}2e` }}>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: '#7d8ea6' }}>
            <Layers3 className="w-3.5 h-3.5" style={{ color: soft }} /> {visual.primaryLabel}
          </span>
          <span className="solx-serif font-bold text-lg leading-none solx-flow" style={{ color: accent }}>{visual.primary}</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══ MAIN TEMPLATE ═══════════════════════════════════════════════════ */
export default function SolutionServiceDetail({ page, FooterComponent, ContactSectionComponent }) {
  const stats = page.stats.map(parseStat);
  const pageRoute = `#/${routeSlug(page.title)}`;
  const featureIcons = [Building2, LineChart, ShieldCheck, Layers3, Scale, FileCheck2];
  const [openCard, setOpenCard] = useState(0);
  const sections = [
    ['overview', 'Overview'],
    ['capabilities', 'Capabilities'],
    ['approach', 'Approach'],
    ['comparison', 'Why AuraShine'],
    ['faq', 'FAQ'],
  ];
  const [active, setActive] = useState('overview');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(`solx-${id}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.title]);

  return (
    <div className="solx-shell min-h-screen overflow-x-clip" style={{ color: BODY }}>
      <style>{`
        .solx-shell{font-family:'Inter',system-ui,sans-serif;}
        .solx-serif{font-family:'Playfair Display','Georgia',serif;}
        .solx-chip{animation:solxChipFloat 4.8s ease-in-out infinite;}
        .solx-breathe{animation:solxBreathe 5.4s ease-in-out infinite;}
        .solx-flow{animation:solxPulse 2.8s ease-in-out infinite;}
        .solx-rise{animation:solxRise 4.8s ease-in-out infinite;transform-origin:center bottom;}
        @keyframes solxChipFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes solxBreathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes solxPulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes solxRise{0%,100%{transform:scaleY(.92)}50%{transform:scaleY(1)}}
        @media (prefers-reduced-motion: reduce){.solx-shell *{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
      `}</style>

      {/* ── HERO — stately split ─────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: NAVY, paddingTop: '8rem', paddingBottom: '5.5rem' }}>
        {/* restrained texture: fine grid + single gold arc */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true" style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '90px 90px',
        }} />
        <div className="absolute -right-48 -top-48 w-[560px] h-[560px] rounded-full pointer-events-none" aria-hidden="true"
          style={{ border: `1px solid ${GOLD}33` }} />
        <div className="absolute -right-32 -top-32 w-[380px] h-[380px] rounded-full pointer-events-none" aria-hidden="true"
          style={{ border: `1px solid ${GOLD}22` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easeOut }}>
            {/* div, not <nav>: the legacy patch layer styles bare `nav` tags
                (fixed position + white bg) which caused a white flash here */}
            <div role="navigation" className="text-xs mb-8 font-medium" aria-label="Breadcrumb" style={{ color: '#8fa3c4' }}>
              <a href="#/solutions" className="hover:underline" style={{ color: GOLD_LIGHT }}>Solutions</a>
              <span className="mx-2">/</span><span>{page.title}</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12" style={{ background: GOLD }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: GOLD_LIGHT }}>{page.kicker}</span>
            </div>
            <h1 className="solx-serif font-bold text-white leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
              {page.title} solutions,<br />
              <span style={{ color: GOLD_LIGHT }}>delivered with governance.</span>
            </h1>
            <p className="text-lg leading-8 mb-10 max-w-xl" style={{ color: '#b6c4da' }}>{page.description}</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <motion.a href="#/contact?focus=message"
                whileHover={{ y: -2, boxShadow: `0 18px 40px -12px ${GOLD}88` }} whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, color: NAVY }}>
                Connect <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href={`${pageRoute}#solx-capabilities`} whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-sm text-white"
                style={{ border: '1px solid #ffffff2e' }}>
                Explore Capabilities
              </motion.a>
            </div>
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[[BadgeCheck, 'NDA & DPA ready'], [ShieldCheck, 'Security-first delivery'], [Landmark, 'Enterprise governance']].map(([TIcon, label]) => (
                <span key={label} className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: '#8fa3c4' }}>
                  <TIcon className="w-4 h-4" style={{ color: GOLD_LIGHT }} /> {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Business automation board */}
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: easeOut }} className="pb-4">
            <AutomationBoard page={page} />
          </motion.div>
        </div>
      </section>

      {/* ── BODY with sticky sidebar nav ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[220px_1fr] lg:gap-14">
        {/* Sidebar (inline sticky — deliberately not the .sticky class) */}
        <aside className="hidden lg:block py-16">
          <div style={{ position: 'sticky', top: 110 }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: GOLD }}>On this page</p>
            <ul className="space-y-1">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#solx-${id}`}
                    className="flex items-center gap-3 py-2 text-sm font-semibold transition-colors"
                    style={{ color: active === id ? NAVY : '#94a1b8' }}>
                    <span className="h-px transition-all" style={{ width: active === id ? 24 : 12, background: active === id ? GOLD : LINE }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#/contact?focus=message"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold" style={{ color: GOLD }}>
              <Phone className="w-4 h-4" /> Talk to an expert
            </a>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Overview */}
          <section id="solx-overview" className="py-16" style={{ scrollMarginTop: 100 }}>
            <SectionHead eyebrow="Overview" title={`A structured path to ${page.title.toLowerCase()} outcomes.`} />
            <div className="grid sm:grid-cols-2 gap-px rounded-lg overflow-hidden" style={{ background: LINE, border: `1px solid ${LINE}` }}>
              {(page.keyPoints || []).map((kp, i) => (
                <motion.div key={kp.title} {...fade(i * 0.06)}
                  whileHover={{ backgroundColor: PAPER }}
                  className="bg-white p-7 transition-colors">
                  <p className="solx-serif text-3xl font-bold mb-4" style={{ color: `${NAVY}26` }}>{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-bold mb-2" style={{ color: NAVY }}>{kp.title}</h3>
                  <p className="text-sm leading-6">{kp.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Capabilities — icon feature grid */}
          <section id="solx-capabilities" className="py-16" style={{ scrollMarginTop: 100, borderTop: `1px solid ${LINE}` }}>
            <SectionHead eyebrow="Capabilities" title="What the engagement includes." />
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {page.bullets.map((b, i) => {
                const FIcon = featureIcons[i % featureIcons.length];
                return (
                  <motion.div key={b} {...fade(i * 0.05)}
                    whileHover={{ y: -6, boxShadow: '0 24px 50px -20px rgba(14,35,64,.28)' }}
                    className="rounded-lg p-6 bg-white transition-shadow"
                    style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}` }}>
                    <div className="w-11 h-11 rounded-md flex items-center justify-center mb-4"
                      style={{ background: `${NAVY}0d` }}>
                      <FIcon className="w-5 h-5" style={{ color: NAVY }} />
                    </div>
                    <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{b}</h3>
                    <p className="text-xs leading-5">
                      {getCapabilityDescription(page, b)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Approach — vertical timeline + expandable cards */}
          <section id="solx-approach" className="py-16" style={{ scrollMarginTop: 100, borderTop: `1px solid ${LINE}` }}>
            <SectionHead eyebrow="Approach" title="A disciplined delivery method." />
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Vertical timeline */}
              <div className="relative pl-8">
                <div className="absolute left-[9px] top-2 bottom-2 w-px" style={{ background: `linear-gradient(${GOLD}, ${LINE})` }} />
                <div className="space-y-8">
                  {(page.process || []).map((step, i) => (
                    <motion.div key={step} {...fade(i * 0.08)} className="relative">
                      <span className="absolute -left-8 top-1 w-[19px] h-[19px] rounded-full bg-white flex items-center justify-center"
                        style={{ border: `2px solid ${GOLD}` }}>
                        <span className="w-[7px] h-[7px] rounded-full" style={{ background: GOLD }} />
                      </span>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-1" style={{ color: GOLD }}>Phase {i + 1}</p>
                      <h3 className="solx-serif font-bold text-lg mb-1" style={{ color: NAVY }}>{step}</h3>
                      <p className="text-sm leading-6">
                        {getApproachDescription(page, step)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Expandable solution cards */}
              <div className="space-y-4">
                {(page.keyPoints || []).map((kp, i) => (
                  <motion.div key={kp.title} {...fade(i * 0.06)}
                    className="rounded-lg overflow-hidden bg-white"
                    style={{ border: `1px solid ${openCard === i ? GOLD : LINE}`, boxShadow: openCard === i ? '0 20px 44px -20px rgba(185,130,0,.3)' : 'none', transition: 'border-color .3s, box-shadow .3s' }}>
                    <button onClick={() => setOpenCard(openCard === i ? null : i)}
                      className="w-full flex items-center gap-4 px-6 py-5 text-left">
                      <span className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: openCard === i ? GOLD : `${NAVY}0d` }}>
                        <Building2 className="w-4 h-4" style={{ color: openCard === i ? '#fff' : NAVY }} />
                      </span>
                      <span className="flex-1 font-bold text-sm" style={{ color: NAVY }}>{kp.title}</span>
                      <motion.span animate={{ rotate: openCard === i ? 180 : 0 }}>
                        <ChevronDown className="w-4 h-4" style={{ color: GOLD }} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {openCard === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: easeOut }} className="overflow-hidden">
                          <p className="px-6 pb-6 pl-[76px] text-sm leading-6">{kp.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section id="solx-comparison" className="py-16" style={{ scrollMarginTop: 100, borderTop: `1px solid ${LINE}` }}>
            <SectionHead eyebrow="Why AuraShine" title="The enterprise standard, side by side." />
            <ComparisonTable page={page} />
          </section>

          {/* FAQ */}
          <section id="solx-faq" className="py-16 pb-20" style={{ scrollMarginTop: 100, borderTop: `1px solid ${LINE}` }}>
            <SectionHead eyebrow="FAQ" title="Questions leadership teams ask." />
            <CorporateFAQ page={page} />
          </section>
        </div>
      </div>

      {/* ── METRICS BAND ─────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {stats.map((s, i) => (
              <motion.div key={page.stats[i]} {...fade(i * 0.1)}>
                <p className="solx-serif font-bold text-white" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)' }}>
                  {s.num !== null ? <QuietCounter to={s.num} suffix={s.suffix} /> : <span style={{ color: GOLD_LIGHT }}>◆</span>}
                </p>
                <div className="h-px w-10 mx-auto my-3" style={{ background: GOLD }} />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#8fa3c4' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade()} className="rounded-lg px-8 py-12 sm:px-14 text-center relative overflow-hidden"
            style={{ background: PAPER, border: `1px solid ${LINE}` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-40" style={{ background: GOLD }} />
            <h2 className="solx-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.7rem)', color: NAVY }}>
              Discuss your {page.title.toLowerCase()} roadmap.
            </h2>
            <p className="max-w-xl mx-auto mb-9 leading-7">
              A 30-minute consultation with a senior consultant — current-state review, opportunity map, and a recommended first phase. No obligation.
            </p>
            <motion.a href="#/contact?focus=message"
              whileHover={{ y: -2, boxShadow: `0 18px 40px -12px ${GOLD}88` }} whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-md font-bold text-sm"
              style={{ background: NAVY, color: '#fff' }}>
              Contact Us <ArrowRight className="w-4 h-4" style={{ color: GOLD_LIGHT }} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {ContactSectionComponent && <ContactSectionComponent />}
      {FooterComponent && <FooterComponent />}
    </div>
  );
}
