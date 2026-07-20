/**
 * SolutionsPage — Premium enterprise storytelling.
 * Structure: Problem → Solution → Benefits → Industries → Case Studies → FAQ → CTA
 * Clean, elegant, light design — connected cards, animated arrows, morphing shapes.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket, ShoppingCart, Heart, Globe, Shield, Target, Sparkles, BarChart3,
  ArrowRight, CheckCircle, ChevronDown, TrendingUp, Zap, Users, Award,
  AlertCircle, Lightbulb, Star, Building, Package, Brain, ArrowDown,
} from 'lucide-react';

/* ─── Brand accent ─────────────────────────────────────────────────── */
const GOLD = '#f5aa02';
const GOLD_DARK = '#f5aa02';
const DARK = '#111827';

/* ─── Morphing blob background ─────────────────────────────────────── */
const MorphBlob = ({ color, size = 400, style = {} }) => (
  <motion.div
    className="absolute rounded-full blur-[120px] pointer-events-none"
    style={{ width: size, height: size, background: color, ...style }}
    animate={{
      borderRadius: [
        '60% 40% 30% 70% / 60% 30% 70% 40%',
        '30% 60% 70% 40% / 50% 60% 30% 60%',
        '60% 40% 30% 70% / 60% 30% 70% 40%',
      ],
    }}
    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
  />
);

/* ─── Animated arrow connector ──────────────────────────────────────── */
const ArrowConnector = ({ horizontal = false }) => (
  <div className={`flex ${horizontal ? 'flex-row' : 'flex-col'} items-center justify-center`}>
    <motion.div
      animate={{ [horizontal ? 'x' : 'y']: [0, 6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="flex items-center justify-center"
    >
      {horizontal
        ? <ArrowRight className="w-6 h-6" style={{ color: GOLD }} />
        : <ArrowDown className="w-6 h-6" style={{ color: GOLD }} />
      }
    </motion.div>
  </div>
);

/* ─── Problems ──────────────────────────────────────────────────────── */
const PROBLEMS = [
  { icon: AlertCircle, title: 'No digital presence', desc: 'Competitors rank higher, appear more credible, and capture the audience before you do.' },
  { icon: TrendingUp, title: 'Wasted marketing budget', desc: 'Campaigns run without attribution, targeting, or conversion tracking — spend grows, results don\'t.' },
  { icon: Users, title: 'Poor customer retention', desc: 'Leads come in but follow-up is slow, manual, and inconsistent — causing lost opportunities.' },
  { icon: BarChart3, title: 'No growth clarity', desc: 'Without dashboards and data, decisions become guesswork and improvements are impossible to prove.' },
];

/* ─── Solutions ─────────────────────────────────────────────────────── */
const SOLUTIONS = [
  { icon: Globe, title: 'Digital Presence System', desc: 'Premium website, SEO structure, Google Business, and content strategy that puts you in front of buyers.' },
  { icon: Target, title: 'Performance Marketing', desc: 'Paid ads, landing pages, A/B testing, and attribution — every rupee tracked to a real business outcome.' },
  { icon: Brain, title: 'CRM & Automation', desc: 'Lead capture, follow-up sequences, customer lifecycle management, and team workflow automation.' },
  { icon: BarChart3, title: 'Analytics & Growth Dashboard', desc: 'Custom GA4 setup, campaign reporting, KPI tracking, and monthly growth insights for clear decisions.' },
];

/* ─── Industries ────────────────────────────────────────────────────── */
const INDUSTRIES = [
  {
    icon: Rocket,
    name: 'Startups',
    href: '#/startups',
    color: '#6366f1',
    tagline: 'Launch fast, grow lean',
    points: ['MVP websites', 'Investor-ready pitch pages', 'Early SEO foundation', 'Product launch campaigns'],
  },
  {
    icon: ShoppingCart,
    name: 'E-commerce',
    href: '#/solutions-e-commerce',
    color: '#22c55e',
    tagline: 'Scale online revenue',
    points: ['Product catalog UX', 'Cart recovery automation', 'Google Shopping ads', 'Email retention flows'],
  },
  {
    icon: Heart,
    name: 'Healthcare',
    href: '#/healthcare',
    color: '#ec4899',
    tagline: 'Attract more patients',
    points: ['Trust-first website', 'Local SEO + Maps', 'Appointment CTAs', 'Review building system'],
  },
  {
    icon: Globe,
    name: 'Real Estate',
    href: '#/real-estate',
    color: '#14b8a6',
    tagline: 'Generate quality leads',
    points: ['Property listing pages', 'Site visit lead funnel', 'CRM follow-up flow', 'Virtual tour integrations'],
  },
  {
    icon: Shield,
    name: 'Enterprise',
    href: '#/enterprise',
    color: '#3b82f6',
    tagline: 'Enterprise-grade growth',
    points: ['Multi-stakeholder strategy', 'Large team CRM', 'Account-based marketing', 'Executive dashboards'],
  },
  {
    icon: Sparkles,
    name: 'Brand Building',
    href: '#/brand-building',
    color: GOLD,
    tagline: 'Stand out and be remembered',
    points: ['Brand identity system', 'Premium website', 'PR & content strategy', 'Social brand voice'],
  },
];

/* ─── Benefits ──────────────────────────────────────────────────────── */
const BENEFITS = [
  { label: 'Faster time-to-market', icon: Zap },
  { label: 'Measurable ROI at every stage', icon: BarChart3 },
  { label: 'Dedicated specialist team', icon: Users },
  { label: 'Transparent, weekly reporting', icon: Award },
  { label: 'Scalable as your business grows', icon: TrendingUp },
  { label: 'End-to-end support post-launch', icon: CheckCircle },
];

/* ─── Case studies ──────────────────────────────────────────────────── */
const CASES = [
  {
    industry: 'Retail Startup',
    challenge: 'No online presence. All sales from word-of-mouth only.',
    solution: 'Premium website + Google Ads + SEO + WhatsApp CTA flow.',
    result: '3x enquiries in 90 days. First-page ranking for 12 local keywords.',
    color: '#6366f1',
  },
  {
    industry: 'Healthcare Clinic',
    challenge: 'Losing patients to competitor clinics appearing first on Google Maps.',
    solution: 'Local SEO overhaul + Google Business optimisation + trust-led website redesign.',
    result: '40% more appointment enquiries. Top 3 Google Maps position for specialty search.',
    color: '#ec4899',
  },
  {
    industry: 'E-commerce Brand',
    challenge: 'High ad spend, 0.8x ROAS, no email retention strategy.',
    solution: 'Campaign restructure + landing pages + Klaviyo email flows + CRO testing.',
    result: 'ROAS improved to 4.2x. Email revenue now 28% of total monthly revenue.',
    color: '#22c55e',
  },
];

/* ─── FAQ ───────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How are the right solutions selected for my business?',
    a: 'We start with a discovery session to understand your industry, audience, goals, budget, and current digital position. From that, we recommend only the services and channels that are most relevant to your situation.',
  },
  {
    q: 'Do you handle everything or work alongside our team?',
    a: 'Both are possible. Some clients want fully managed campaigns and website builds. Others prefer us to work alongside their internal marketing or tech team. We adapt the engagement to fit your structure.',
  },
  {
    q: 'What is the typical timeline from start to results?',
    a: 'For websites and software: 2–6 weeks to launch. For marketing campaigns: initial data within 30 days, meaningful trends by month 2–3. SEO compounds over 3–6 months.',
  },
  {
    q: 'Can the solution scale as the business grows?',
    a: 'Yes. We build all systems — websites, CRMs, campaigns, and analytics — with scale in mind. Adding new services, pages, markets, or integrations is part of the ongoing relationship.',
  },
  {
    q: 'Do you provide reports and regular updates?',
    a: 'Yes. Depending on the service, we provide weekly campaign updates and monthly performance reports covering traffic, leads, conversions, spend, and recommended actions.',
  },
];

export default function SolutionsPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeIndustry, setActiveIndustry] = useState(0);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">

      {/* ── HERO — sophisticated, light ───────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fafafa 0%, #f0f4ff 60%, #fff8e7 100%)' }}>

        <MorphBlob color={`${GOLD}22`} size={600} style={{ top: '-10%', right: '-10%' }} />
        <MorphBlob color="#6366f115" size={400} style={{ bottom: '0%', left: '-5%' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-sm"
              style={{ background: `${GOLD}18`, color: GOLD_DARK, border: `1px solid ${GOLD}44` }}
            >
              <Package className="w-3.5 h-3.5" /> Industry Solutions
            </motion.div>

            <h1 className="font-black text-gray-900 mb-6 leading-[1.08]"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)' }}>
              The right strategy{' '}
              <span style={{
                background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                for your industry,
              </span>
              {' '}not a generic one.
            </h1>

            <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-lg">
              We tailor digital growth strategies to the unique challenges of your sector — combining the right mix of services for maximum impact.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.a
                href="#/contact"
                whileHover={{ scale: 1.04, boxShadow: `0 8px 40px ${GOLD}44` }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base shadow-xl"
                style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`, color: 'white' }}
              >
                Connect <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#/about"
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base text-gray-700 border border-gray-200"
              >
                About Aurashine
              </motion.a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3">
              {['Strategy-first', 'Transparent reporting', 'Industry-specific', 'Scalable systems'].map((chip) => (
                <span key={chip} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-gray-100 shadow-sm text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: GOLD }} /> {chip}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — connected solution cards preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { icon: Globe, label: 'Website & SEO', color: '#6366f1' },
              { icon: Target, label: 'Paid Campaigns', color: GOLD },
              { icon: Brain, label: 'CRM & Automation', color: '#22c55e' },
              { icon: BarChart3, label: 'Analytics', color: '#ec4899' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className="rounded-3xl p-6 shadow-xl flex flex-col items-center text-center cursor-default"
                style={{ background: 'white', border: `2px solid ${item.color}22` }}
              >
                <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center shadow-md"
                  style={{ background: item.color + '18', border: `1px solid ${item.color}33` }}>
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <p className="font-black text-sm text-gray-800">{item.label}</p>
                <div className="mt-3 w-full h-1 rounded-full" style={{ background: item.color + '33' }}>
                  <motion.div
                    className="h-1 rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: '20%' }}
                    animate={{ width: ['20%', '90%', '60%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: i * 0.4 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM → SOLUTION STORY ─────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* PROBLEM */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}
            className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4 bg-red-50 text-red-500">
              <AlertCircle className="w-3.5 h-3.5" /> The Challenges
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-black text-gray-900 mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Problems that hold businesses back.
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl p-6 bg-white border border-red-100 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-red-200 rounded-t-3xl" />
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-black text-gray-800 mb-2 text-base">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Arrow transition */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-col items-center gap-3">
              <ArrowConnector />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-6 py-3 rounded-2xl font-black text-sm text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})` }}
              >
                <Lightbulb className="w-5 h-5 inline mr-2" /> Our Solutions
              </motion.div>
              <ArrowConnector />
            </div>
          </div>

          {/* SOLUTION */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl p-6 bg-white shadow-xl relative overflow-hidden"
                style={{ border: `2px solid ${GOLD}33` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD})` }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}33` }}>
                  <s.icon className="w-6 h-6" style={{ color: GOLD_DARK }} />
                </div>
                <h3 className="font-black text-gray-800 mb-2 text-base">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold" style={{ color: GOLD_DARK }}>
                  Learn more <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: DARK }}>
        <MorphBlob color={`${GOLD}10`} size={500} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}
            className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4"
              style={{ background: `${GOLD}18`, color: GOLD }}>
              <Star className="w-3.5 h-3.5" /> Why It Works
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-black text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              The Aurashine{' '}
              <span style={{
                background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                difference.
              </span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -6 }}
                className="flex items-center gap-4 rounded-2xl px-6 py-5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${GOLD}22` }}>
                  <b.icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <p className="text-white font-bold text-sm">{b.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}
            className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4"
              style={{ background: `${GOLD}15`, color: GOLD_DARK }}>
              <Building className="w-3.5 h-3.5" /> Industries We Serve
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-black text-gray-900"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Tailored for your{' '}
              <span style={{
                background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                sector.
              </span>
            </motion.h2>
          </motion.div>

          {/* Industry tab selector */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <div className="space-y-2">
              {INDUSTRIES.map((ind, i) => (
                <motion.button
                  key={ind.name}
                  onClick={() => setActiveIndustry(i)}
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all"
                  style={{
                    background: activeIndustry === i ? ind.color + '15' : 'transparent',
                    border: `2px solid ${activeIndustry === i ? ind.color + '66' : '#f3f4f6'}`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: ind.color + '18' }}>
                    <ind.icon className="w-5 h-5" style={{ color: ind.color }} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm text-gray-800">{ind.name}</p>
                    <p className="text-xs text-gray-400">{ind.tagline}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Active industry detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: `2px solid ${INDUSTRIES[activeIndustry].color}33` }}
              >
                {/* Header */}
                <div className="p-8 text-white relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${INDUSTRIES[activeIndustry].color}, ${INDUSTRIES[activeIndustry].color}cc)` }}>
                  <MorphBlob color="rgba(255,255,255,0.1)" size={300} style={{ top: '-20%', right: '-10%' }} />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mb-5">
                      {React.createElement(INDUSTRIES[activeIndustry].icon, { className: 'w-8 h-8 text-white' })}
                    </div>
                    <h3 className="font-black text-3xl mb-2">{INDUSTRIES[activeIndustry].name}</h3>
                    <p className="text-white/80 text-lg">{INDUSTRIES[activeIndustry].tagline}</p>
                  </div>
                </div>

                {/* Points */}
                <div className="p-8 bg-white grid sm:grid-cols-2 gap-4">
                  {INDUSTRIES[activeIndustry].points.map((pt, i) => (
                    <motion.div
                      key={pt}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 p-4 rounded-2xl"
                      style={{ background: `${INDUSTRIES[activeIndustry].color}08`, border: `1px solid ${INDUSTRIES[activeIndustry].color}22` }}
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: INDUSTRIES[activeIndustry].color }} />
                      <span className="text-gray-700 font-semibold text-sm">{pt}</span>
                    </motion.div>
                  ))}

                  <motion.a
                    href={INDUSTRIES[activeIndustry].href}
                    whileHover={{ scale: 1.02 }}
                    className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${INDUSTRIES[activeIndustry].color}, ${INDUSTRIES[activeIndustry].color}cc)` }}
                  >
                    Explore {INDUSTRIES[activeIndustry].name} Solutions <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #fafafa 0%, #f0f4ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}
            className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4"
              style={{ background: `${GOLD}15`, color: GOLD_DARK }}>
              <Award className="w-3.5 h-3.5" /> Results
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-black text-gray-900"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Real outcomes. Real businesses.
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <motion.div
                key={c.industry}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -10 }}
                className="rounded-3xl overflow-hidden shadow-xl bg-white"
                style={{ border: `2px solid ${c.color}22` }}
              >
                <div className="h-3 w-full" style={{ background: c.color }} />
                <div className="p-7">
                  <span className="inline-block px-3 py-1.5 rounded-full text-xs font-black mb-4"
                    style={{ background: c.color + '15', color: c.color }}>
                    {c.industry}
                  </span>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-xs font-black text-red-400 uppercase tracking-wide mb-1">Challenge</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide mb-1" style={{ color: GOLD_DARK }}>Solution</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{c.solution}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-green-600 uppercase tracking-wide mb-1">Result</p>
                      <p className="text-gray-800 text-sm font-bold leading-relaxed">{c.result}</p>
                    </div>
                  </div>

                  <a href="#/contact" className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: c.color }}>
                    Discuss similar project <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}
            className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4"
              style={{ background: `${GOLD}15`, color: GOLD_DARK }}>
              Common Questions
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-black text-gray-900"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Questions answered.
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: openFaq === i ? GOLD + '66' : '#f3f4f6' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-800 pr-4 text-sm sm:text-base">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: GOLD }} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t pt-4"
                        style={{ borderColor: '#f3f4f6', background: '#fafafa' }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <MorphBlob color={`${GOLD}15`} size={600} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest mb-8"
              style={{ background: `${GOLD}22`, color: GOLD }}>
              <Sparkles className="w-3.5 h-3.5" /> Start Your Journey
            </span>

            <h2 className="font-black text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              The right solution,{' '}
              <span style={{
                background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                built for your business.
              </span>
            </h2>

            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Free strategy consultation. We'll map out exactly which services will drive the most meaningful growth for your industry and goals.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#/contact"
                whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${GOLD}44` }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-base shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`, color: 'white' }}
              >
                Contact Us <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#/about"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-base text-white border border-white/20"
              >
                Learn About Us
              </motion.a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-16">
              {[
                { label: 'Industries served', value: '6+' },
                { label: 'Services available', value: '15+' },
                { label: 'Client satisfaction', value: '95%' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-black" style={{ color: GOLD }}>{s.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
