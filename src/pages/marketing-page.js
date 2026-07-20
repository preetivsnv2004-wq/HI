/**
 * MarketingPage — Vibrant creative agency.
 * Bright gradients, magazine-style layouts, animated stats, social mockups,
 * floating stickers, count-up animations, logo marquee, hover interactions.
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Megaphone, Search, Target, Globe, FileText, Mail, BarChart3, TrendingUp,
  ArrowRight, Sparkles, Zap, Star, Heart, Instagram, Play, ChevronRight,
  MousePointer, Eye, Share2, Users, DollarSign, Rocket,
} from 'lucide-react';

/* ─── Premium growth palette (re-mapped 2026-07-03: pink retired) ────── *
 * Keys keep their historical names so every usage below re-colours
 * automatically:  orange→warm amber · pink→electric blue · blue→sky ·
 * purple stays as a SMALL accent only.                                  */
const PALETTE = {
  orange: '#f5aa02',
  pink: '#2563eb',
  purple: '#8b5cf6',
  blue: '#38bdf8',
  green: '#22c55e',
  yellow: '#f5aa02',
  lime: '#a3e635',
};
const NAVY = '#0c1834';
const NAVY2 = '#15294f';

/* ─── Animated counter ───────────────────────────────────────────────── */
const Counter = ({ to, suffix = '', prefix = '', duration = 1.8 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setVal(Math.round(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
};

/* ─── Floating sticker ───────────────────────────────────────────────── */
const Sticker = ({ emoji, label, color, style = {}, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: -20 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 15 }}
    className="mkt-sticker absolute z-20 select-none pointer-events-none"
    style={style}
  >
    <motion.div
      animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl shadow-xl"
      style={{ background: color, backdropFilter: 'blur(10px)' }}
    >
      <span className="text-2xl">{emoji}</span>
      {label && <span className="text-white text-xs font-black">{label}</span>}
    </motion.div>
  </motion.div>
);

/* ─── Marketing funnel visual ────────────────────────────────────────── */
const FunnelVisual = () => {
  const stages = [
    { label: 'Awareness', width: '100%', color: PALETTE.blue, pct: '80K', sub: 'Reach' },
    { label: 'Interest', width: '78%', color: PALETTE.purple, pct: '18K', sub: 'Clicks' },
    { label: 'Consideration', width: '58%', color: PALETTE.pink, pct: '4.2K', sub: 'Leads' },
    { label: 'Intent', width: '40%', color: PALETTE.orange, pct: '1.1K', sub: 'Qualify' },
    { label: 'Conversion', width: '24%', color: PALETTE.green, pct: '312', sub: 'Sales' },
  ];

  return (
    <div className="space-y-2">
      {stages.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="text-xs font-bold text-white/60 w-28 text-right flex-shrink-0">{s.label}</div>
          <div className="flex-1 bg-white/10 rounded-full overflow-hidden h-10 relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: s.width }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full flex items-center justify-between px-4"
              style={{ background: s.color }}
            >
              <span className="text-white text-xs font-black">{s.pct}</span>
              <span className="text-white/80 text-xs">{s.sub}</span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Social media mockup ────────────────────────────────────────────── */
const SocialMockup = () => {
  const [likes, setLikes] = useState(2847);
  const [liked, setLiked] = useState(false);

  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl max-w-xs mx-auto"
      style={{ background: '#18181b', border: '1px solid #27272a' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-sm"
          style={{ background: `linear-gradient(135deg, ${PALETTE.pink}, ${PALETTE.purple})` }}>
          A
        </div>
        <div>
          <p className="text-white text-sm font-bold">aurashineinfotech</p>
          <p className="text-white/40 text-xs">Sponsored</p>
        </div>
        <Instagram className="w-5 h-5 ml-auto" style={{ color: PALETTE.pink }} />
      </div>
      {/* Image */}
      <div className="h-48 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${PALETTE.purple}, ${PALETTE.pink}, ${PALETTE.orange})` }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
          <Sparkles className="w-8 h-8 mb-2" />
          <p className="font-black text-lg leading-tight">Grow your brand 10x faster</p>
          <p className="text-white/80 text-xs mt-1">Digital Marketing that delivers ROI</p>
        </div>
        <motion.div
          className="absolute bottom-3 right-3 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs text-white font-bold"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Learn More →
        </motion.div>
      </div>
      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-4 mb-3">
          <button onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }}
            className="transition-transform active:scale-90">
            <Heart className={`w-6 h-6 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-white/70'}`} />
          </button>
          <MousePointer className="w-6 h-6 text-white/70" />
          <Share2 className="w-6 h-6 text-white/70" />
          <Eye className="w-5 h-5 text-white/70 ml-auto" />
        </div>
        <p className="text-white text-sm font-bold">{likes.toLocaleString()} likes</p>
        <p className="text-white/50 text-xs mt-1">View all 234 comments</p>
      </div>
    </div>
  );
};

/* ─── Services ───────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: Megaphone, title: 'Digital Marketing', href: '#/digital-marketing', color: PALETTE.orange, tag: 'Full-Funnel', desc: 'End-to-end digital campaigns across search, social, email and display with clear attribution.' },
  { icon: Search, title: 'SEO Services', href: '#/seo-services', color: PALETTE.blue, tag: 'Organic Growth', desc: 'Technical SEO, content clusters, local ranking, and authority-building backlink strategy.' },
  { icon: Target, title: 'PPC & Paid Ads', href: '#/ppc-paid-ads', color: PALETTE.pink, tag: 'Max ROAS', desc: 'Google, Meta, LinkedIn, and YouTube campaigns with sharp targeting and continuous A/B testing.' },
  { icon: Globe, title: 'Social Media', href: '#/social-media', color: PALETTE.purple, tag: 'Audience Growth', desc: 'Content calendars, reels, carousels, community management, and influencer partnerships.' },
  { icon: FileText, title: 'Content Marketing', href: '#/content-marketing', color: PALETTE.lime, tag: 'Authority Build', desc: 'SEO blogs, case studies, whitepapers, video scripts, and brand-voice content strategy.' },
  { icon: Mail, title: 'Email Marketing', href: '#/email-marketing', color: PALETTE.yellow, tag: 'Retention Focus', desc: 'Welcome sequences, newsletters, cart recovery, win-back flows, and segmented campaigns.' },
  { icon: Users, title: 'Lead Generation', href: '#/lead-generation', color: PALETTE.green, tag: 'Pipeline Fill', desc: 'Qualified lead funnels with landing pages, WhatsApp CTAs, form tracking, and CRM handoff.' },
  { icon: BarChart3, title: 'Analytics & Reporting', href: '#/analytics-reporting', color: PALETTE.orange, tag: 'Data Clarity', desc: 'GA4, custom dashboards, attribution models, and monthly insights to guide every decision.' },
];

/* ─── Results / stats ────────────────────────────────────────────────── */
const STATS = [
  { icon: TrendingUp, value: 320, suffix: '%', label: 'Avg. organic traffic growth', color: PALETTE.green },
  { icon: DollarSign, value: 4.8, suffix: 'x', label: 'Average campaign ROAS', color: PALETTE.yellow },
  { icon: Target, value: 60, suffix: '%', label: 'Reduction in cost per lead', color: PALETTE.pink },
  { icon: Star, value: 95, suffix: '%', label: 'Client retention rate', color: PALETTE.blue },
];

export default function MarketingPage() {
  const [hoveredService, setHoveredService] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['SEO', 'Paid Ads', 'Social', 'Content'];
  const tabData = [
    { metric: '+280%', label: 'Organic traffic in 6 months', color: PALETTE.blue },
    { metric: '4.2x', label: 'Average ROAS across campaigns', color: PALETTE.pink },
    { metric: '12K+', label: 'Followers gained in 90 days', color: PALETTE.purple },
    { metric: '10x', label: 'Content output per month', color: PALETTE.lime },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white" style={{ fontFamily: "'Manrope','Inter',system-ui,sans-serif" }}>

      {/* ── HERO — premium navy campaign cover ───────────────────────── */}
      <section className="relative min-h-[95vh] overflow-hidden flex items-center"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 55%, #1a2f5c 100%)` }}>

        {/* Colorful blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: `${PALETTE.pink}30` }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: `${PALETTE.blue}25` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: `${PALETTE.orange}18` }} />

        {/* Stickers */}
        <Sticker emoji="📣" label="REACH" color={PALETTE.orange} style={{ top: '12%', left: '8%' }} delay={0.8} />
        <Sticker emoji="📈" label="+320%" color={PALETTE.green} style={{ top: '20%', right: '12%' }} delay={1.0} />
        <Sticker emoji="🎯" label="ROI" color={PALETTE.pink} style={{ bottom: '25%', left: '6%' }} delay={1.2} />
        <Sticker emoji="⚡" label="GROWTH" color={PALETTE.purple} style={{ bottom: '15%', right: '8%' }} delay={1.4} />
        <Sticker emoji="🔍" label="SEO" color={PALETTE.blue} style={{ top: '60%', left: '14%' }} delay={1.6} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left — headline */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
              style={{ background: `${PALETTE.orange}22`, color: PALETTE.orange, border: `1px solid ${PALETTE.orange}44` }}
            >
              <Zap className="w-3.5 h-3.5" /> Growth Studio
            </motion.span>

            {/* Magazine-style headline split */}
            <div className="space-y-1 mb-8" style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
              <h1 className="font-black leading-none text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontStyle: 'italic' }}>
                Make
              </h1>
              <h1 className="font-black leading-none"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                  background: `linear-gradient(135deg, ${PALETTE.blue}, ${PALETTE.yellow} 70%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                noise.
              </h1>
              <h1 className="font-black leading-none text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontStyle: 'italic' }}>
                Get results.
              </h1>
            </div>

            <p className="text-xl leading-relaxed mb-10 max-w-lg" style={{ color: '#b9c6e2' }}>
              Full-funnel digital marketing — from search to social, paid to organic — built for brands that want real, measurable growth.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.a
                href="#/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base"
                style={{ background: `linear-gradient(135deg, ${PALETTE.orange}, ${PALETTE.yellow})`, color: NAVY }}
              >
                Connect <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#/services"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base bg-white shadow-md"
                style={{ color: PALETTE.purple, border: `2px solid ${PALETTE.purple}30` }}
              >
                <Play className="w-5 h-5" /> See Services
              </motion.a>
            </div>

            {/* Animated stat row */}
            <div className="flex flex-wrap gap-8">
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black" style={{ color: s.color }}>
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs mt-1 max-w-[120px]" style={{ color: '#8ca0c8' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — social mockup + result card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-center gap-6"
          >
            <SocialMockup />
            {/* Floating result badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl"
              style={{ background: PALETTE.green + 'dd', backdropFilter: 'blur(10px)' }}
            >
              <TrendingUp className="w-6 h-6 text-white" />
              <div>
                <p className="text-white font-black text-sm">Campaign live</p>
                <p className="text-white/80 text-xs">ROAS 4.8x · CTR 3.2%</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Diagonal slice bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom right, transparent 49%, white 50%)' }} />
      </section>

      {/* ── STATS — colorful count-up strip ──────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl p-6 text-center shadow-xl"
                style={{ background: s.color + '15', border: `2px solid ${s.color}30` }}
              >
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: s.color }}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-4xl font-black" style={{ color: s.color }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm font-semibold text-gray-500 mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — magazine grid ──────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4"
              style={{ background: PALETTE.pink + '15', color: PALETTE.pink }}>
              <Megaphone className="w-3.5 h-3.5" /> Marketing Services
            </span>
            <h2 className="font-black text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Eight channels.{' '}
              <span style={{
                background: `linear-gradient(135deg, ${PALETTE.orange}, ${PALETTE.pink})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>One strategy.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Each service is a growth lever. We pull the right ones for your business.
            </p>
          </motion.div>

          {/* Magazine-style: 2 large + 6 small */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((svc, i) => (
              <motion.a
                key={svc.title}
                href={svc.href}
                initial={{ opacity: 0, y: 50, rotate: i % 2 ? 1 : -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: i * 0.07, duration: 0.7 }}
                whileHover={{ y: -10, scale: 1.02, rotate: 0 }}
                onHoverStart={() => setHoveredService(i)}
                onHoverEnd={() => setHoveredService(null)}
                className={`relative rounded-3xl overflow-hidden shadow-lg cursor-pointer ${i < 2 ? 'lg:col-span-2' : ''}`}
                style={{
                  background: hoveredService === i ? svc.color : 'white',
                  border: `2px solid ${hoveredService === i ? svc.color : '#f3f4f6'}`,
                  transition: 'all 0.3s ease',
                  padding: i < 2 ? '2.5rem' : '1.75rem',
                }}
              >
                {/* Coloured top stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: svc.color }} />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: hoveredService === i ? 'rgba(255,255,255,0.2)' : svc.color + '15',
                    }}>
                    <svc.icon className="w-6 h-6" style={{ color: hoveredService === i ? 'white' : svc.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-base" style={{ color: hoveredService === i ? 'white' : '#111827' }}>
                        {svc.title}
                      </h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: hoveredService === i ? 'rgba(255,255,255,0.2)' : svc.color + '15',
                          color: hoveredService === i ? 'white' : svc.color,
                        }}>
                        {svc.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: hoveredService === i ? 'rgba(255,255,255,0.85)' : '#6b7280' }}>
                      {svc.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm font-bold"
                  style={{ color: hoveredService === i ? 'white' : svc.color }}>
                  Explore <ChevronRight className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETING FUNNEL SECTION ──────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          style={{ background: `${PALETTE.pink}20` }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          style={{ background: `${PALETTE.blue}20` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}>
            <span className="text-xs font-black uppercase tracking-widest mb-4 block" style={{ color: PALETTE.orange }}>
              Marketing Funnel
            </span>
            <h2 className="font-black text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Every stage of the buyer journey,{' '}
              <span style={{
                background: `linear-gradient(135deg, ${PALETTE.orange}, ${PALETTE.pink})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>optimised.</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              From first impression to final sale — we engineer funnels that convert. Track, test, and improve every stage.
            </p>

            {/* Tab switcher */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: activeTab === i ? PALETTE.orange : 'rgba(255,255,255,0.08)',
                    color: activeTab === i ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <p className="text-5xl font-black mb-2" style={{ color: tabData[activeTab].color }}>
                  {tabData[activeTab].metric}
                </p>
                <p className="text-white/70 font-medium">{tabData[activeTab].label}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right — funnel visual */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}>
            <div className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-white font-black mb-6 text-sm uppercase tracking-widest">Growth Funnel</p>
              <FunnelVisual />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LOGO MARQUEE ─────────────────────────────────────────────── */}
      <section className="py-14 bg-gray-50 overflow-hidden">
        <p className="text-center text-xs font-black uppercase tracking-widest text-gray-400 mb-8">
          Channels we run campaigns on
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 whitespace-nowrap items-center"
          >
            {[...Array(2)].flatMap(() =>
              ['Google Ads', 'Meta Ads', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'X/Twitter', 'Programmatic', 'Email', 'WhatsApp', 'Pinterest', 'SEO'].map((ch) => (
                <span key={Math.random()} className="text-xl font-black" style={{ color: '#e5e7eb' }}>
                  {ch}
                </span>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 55%, #1a2f5c 100%)` }}>
        <Sticker emoji="🚀" label="LAUNCH" color="rgba(0,0,0,0.25)" style={{ top: '15%', left: '5%' }} />
        <Sticker emoji="📊" label="RESULTS" color="rgba(0,0,0,0.25)" style={{ bottom: '15%', right: '5%' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }}>
            <p className="text-white/70 font-black uppercase text-xs tracking-widest mb-4">Ready to grow?</p>
            <h2 className="font-black text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              Let's build your growth engine.
            </h2>
            <p className="text-white/80 text-xl mb-10">
              Free marketing audit — we'll show you exactly where you're leaving revenue on the table.
            </p>
            <motion.a
              href="#/contact"
              whileHover={{ scale: 1.06, boxShadow: `0 16px 60px -10px ${PALETTE.orange}88` }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg"
              style={{ background: `linear-gradient(120deg, ${PALETTE.orange}, ${PALETTE.yellow})`, color: NAVY }}
            >
              Contact <Rocket className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
