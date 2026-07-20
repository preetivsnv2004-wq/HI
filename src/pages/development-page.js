/**
 * DevelopmentPage — Futuristic engineering lab.
 * Dark cyber-tech theme, asymmetric layouts, animated code backgrounds,
 * 3D hover tech cards, circuit lines, mouse-glow, particle FX.
 * Uses only framer-motion (already installed) + CSS; no new deps.
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Monitor, Smartphone, Palette, ShoppingCart, Database, Zap, Shield, CheckCircle,
  ArrowRight, Code, Terminal, Cpu, Layers, GitBranch, Server, Rocket,
  ChevronRight, Play, ExternalLink,
} from 'lucide-react';

/* ─── Neon palette (blue/violet — gold is reserved for Solutions) ───── */
const NEON = '#8b5cf6';
const NEON_DEEP = '#4f46e5';
const DARK = '#0b1220';
const DARK_CARD = '#172033';

/* ─── Floating code snippets ────────────────────────────────────────── */
const CODE_LINES = [
  'const build = async () => {',
  '  await deploy({ env: "prod" });',
  '  return { status: 200 };',
  '};',
  'npm run build',
  'git push origin main',
  'docker compose up -d',
  'SELECT * FROM users;',
  'useEffect(() => {}, []);',
  'export default App;',
  'const router = express.Router();',
  '@keyframes glow { ... }',
  'flex items-center gap-4',
  'import { motion } from "framer-motion"',
  'pg.query("INSERT INTO ...");',
  'res.json({ success: true });',
];

const FloatingCode = () => {
  const snippets = useMemo(
    () =>
      CODE_LINES.map((line, i) => ({
        id: i,
        text: line,
        x: 5 + ((i * 13) % 85),
        y: 3 + ((i * 17) % 90),
        delay: i * 0.4,
        duration: 12 + (i % 7) * 2,
        opacity: 0.07 + (i % 5) * 0.015,
        fontSize: 10 + (i % 4) * 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {snippets.map((s) => (
        <motion.span
          key={s.id}
          className="absolute font-mono text-green-400 whitespace-nowrap"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.fontSize, opacity: s.opacity }}
          animate={{ y: [0, -30, 0], opacity: [s.opacity, s.opacity * 2.5, s.opacity] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {s.text}
        </motion.span>
      ))}
    </div>
  );
};

/* ─── Circuit grid background ────────────────────────────────────────── */
const CircuitBg = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
    <defs>
      <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M0 40 H30 M50 40 H80 M40 0 V30 M40 50 V80" stroke={NEON} strokeWidth="1" fill="none" />
        <circle cx="40" cy="40" r="4" fill="none" stroke={NEON} strokeWidth="1" />
        <circle cx="0" cy="40" r="2" fill={NEON} />
        <circle cx="80" cy="40" r="2" fill={NEON} />
        <circle cx="40" cy="0" r="2" fill={NEON} />
        <circle cx="40" cy="80" r="2" fill={NEON} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#circuit)" />
  </svg>
);

/* ─── Mouse glow ─────────────────────────────────────────────────────── */
const MouseGlow = () => {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{
        left: sx,
        top: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: 480,
        height: 480,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${NEON}18 0%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
};

/* ─── 3-D tilt card ──────────────────────────────────────────────────── */
const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const rotX = useTransform(srx, [-1, 1], [8, -8]);
  const rotY = useTransform(sry, [-1, 1], [-8, 8]);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    rx.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Animated counter ───────────────────────────────────────────────── */
const Counter = ({ to, suffix = '', duration = 1.8 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / (duration * 1000), 1);
        setVal(Math.round(p * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

/* ─── Services data ──────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Monitor,
    title: 'Web Development',
    href: '#/web-development',
    tag: 'REACT / NEXT.JS',
    desc: 'Blazing-fast, conversion-ready websites with clean code architecture and pixel-perfect UI.',
    stack: ['React 18', 'Next.js', 'Tailwind', 'Node.js'],
    color: '#6366f1',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    href: '#/app-development',
    tag: 'IOS / ANDROID',
    desc: 'Cross-platform mobile apps with smooth UX, push notifications, analytics, and store launch support.',
    stack: ['React Native', 'Flutter', 'Firebase', 'REST API'],
    color: '#8b5cf6',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    href: '#/uiux-design',
    tag: 'FIGMA / MOTION',
    desc: 'Wireframes, design systems, interactive prototypes, and accessibility-ready component libraries.',
    stack: ['Figma', 'Framer', 'Design Systems', 'Prototypes'],
    color: '#22d3ee',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    href: '#/e-commerce',
    tag: 'SHOPIFY / CUSTOM',
    desc: 'Product catalogs, cart flows, payment gateways, SEO-ready landing pages, and email automations.',
    stack: ['Shopify', 'WooCommerce', 'Stripe', 'Klaviyo'],
    color: '#22c55e',
  },
  {
    icon: Database,
    title: 'Custom Software',
    href: '#/custom-software',
    tag: 'CRM / SaaS',
    desc: 'Business dashboards, CRM workflows, admin panels, billing systems, and API-driven automation.',
    stack: ['Node.js', 'PostgreSQL', 'MongoDB', 'Redis'],
    color: '#14b8a6',
  },
  {
    icon: Zap,
    title: 'API Integration',
    href: '#/api-integration',
    tag: 'REST / GRAPHQL',
    desc: 'Connect payment systems, CRMs, ERPs, analytics, third-party platforms, and data pipelines.',
    stack: ['REST', 'GraphQL', 'Webhooks', 'OAuth2'],
    color: '#f97316',
  },
  {
    icon: Shield,
    title: 'Cloud Solutions',
    href: '#/cloud-solutions',
    tag: 'AWS / GCP',
    desc: 'Reliable hosting, CI/CD pipelines, Docker containers, SSL, backups, and uptime monitoring.',
    stack: ['AWS', 'GCP', 'Docker', 'Nginx'],
    color: '#3b82f6',
  },
  {
    icon: CheckCircle,
    title: 'Website Maintenance',
    href: '#/website-maintenance',
    tag: 'ONGOING SUPPORT',
    desc: 'Speed audits, security patches, content updates, Core Web Vitals fixes, and monthly reports.',
    stack: ['Monitoring', 'Updates', 'Backups', 'Reports'],
    color: '#ec4899',
  },
  {
    icon: Rocket,
    title: 'Have Something Custom?',
    href: '#/contact',
    tag: 'FREE CONSULT',
    desc: 'Not sure which service fits? Tell us your idea — we scope it, suggest the right stack, and quote a fixed timeline.',
    stack: ['Free scoping call', 'Fixed quote', '48h response'],
    color: '#0ea5e9',
  },
];

/* ─── Timeline steps ─────────────────────────────────────────────────── */
const TIMELINE = [
  { icon: Terminal, step: '01', label: 'Discovery & Scoping', desc: 'Tech audit, requirements gathering, stack selection, and project roadmap.' },
  { icon: Layers, step: '02', label: 'Architecture & Design', desc: 'System design, wireframes, DB schema, API contracts, and UI prototypes.' },
  { icon: Code, step: '03', label: 'Agile Development', desc: 'Sprint-based builds, code reviews, unit tests, and daily progress updates.' },
  { icon: GitBranch, step: '04', label: 'QA & Staging', desc: 'Cross-device testing, performance benchmarks, security scans, and bug fixes.' },
  { icon: Server, step: '05', label: 'Deploy & Monitor', desc: 'CI/CD pipeline, zero-downtime deploy, uptime alerts, and post-launch support.' },
];

/* ─── Main page ──────────────────────────────────────────────────────── */
export default function DevelopmentPage() {
  const [activeService, setActiveService] = useState(null);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="aurashine-dev-page min-h-screen overflow-x-hidden" style={{ background: DARK, color: '#e2e8f0', fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif" }}>
      <MouseGlow />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <CircuitBg />
        <FloatingCode />

        {/* Glowing orbs */}
        <div className="absolute top-20 right-[10%] w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          style={{ background: `${NEON}22` }} />
        <div className="absolute bottom-0 left-[5%] w-72 h-72 rounded-full blur-[100px] pointer-events-none"
          style={{ background: '#6366f120' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
              style={{ background: `${NEON}22`, color: NEON, border: `1px solid ${NEON}44` }}
            >
              <Cpu className="w-3.5 h-3.5" /> Engineering Lab
            </motion.span>

            <h1 className="font-black leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}>
              We{' '}
              <span style={{
                background: `linear-gradient(135deg, ${NEON_DEEP}, ${NEON}, #c7d2fe)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                engineer
              </span>
              {' '}digital products that{' '}
              <span style={{ color: '#a5b4fc' }}>scale.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
              From architecture to deployment — we build fast, secure, production-grade software using modern stacks, clean code, and agile methodology.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#/contact?focus=first-name"
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${NEON}55` }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${NEON_DEEP}, ${NEON})`, color: '#fff' }}
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#/services"
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border text-slate-300"
                style={{ borderColor: '#ffffff22', background: '#ffffff08' }}
              >
                <Play className="w-4 h-4" /> View Services
              </motion.a>
            </div>

            {/* Live stats row */}
            <div className="flex flex-wrap gap-8 mt-14">
              {[
                { label: 'Projects Shipped', val: 80, suffix: '+' },
                { label: 'Stack Coverage', val: 15, suffix: '+' },
                { label: 'Uptime SLA', val: 99, suffix: '%' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black" style={{ color: NEON }}>
                    <Counter to={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — asymmetric terminal card */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="hidden lg:block"
          >
            <TiltCard className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: `1px solid ${NEON}33` }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: DARK_CARD, border: `1px solid ${NEON}22` }}>
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: '#ffffff10' }}>
                  <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-primary opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                  <span className="ml-3 text-xs font-mono text-slate-500">aurashine-build.sh</span>
                </div>
                {/* Terminal body */}
                <div className="p-6 font-mono text-sm space-y-2">
                  {[
                    { prompt: '$', text: 'git clone aurashine/project', color: '#a5b4fc' },
                    { prompt: '$', text: 'npm install && npm run dev', color: '#86efac' },
                    { prompt: '✓', text: 'Server running on :3000', color: NEON },
                    { prompt: '$', text: 'npm run build:prod', color: '#a5b4fc' },
                    { prompt: '✓', text: 'Build complete — 847 kB', color: '#86efac' },
                    { prompt: '$', text: 'docker push registry/app:v2.4', color: '#a5b4fc' },
                    { prompt: '✓', text: 'Deployed  ·  0ms downtime', color: NEON },
                  ].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.18 }}
                      className="flex gap-3"
                    >
                      <span style={{ color: line.color, minWidth: 12 }}>{line.prompt}</span>
                      <span className="text-slate-300">{line.text}</span>
                    </motion.div>
                  ))}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-4 ml-4 rounded-sm"
                    style={{ background: NEON }}
                  />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID (asymmetric) ────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 50% 0%, ${NEON}08 0%, transparent 60%)`,
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: NEON }}>
              Full-Stack Services
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-white mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Everything you need to{' '}
              <span style={{
                background: `linear-gradient(135deg, ${NEON_DEEP}, ${NEON})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>build and launch.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
              Nine engineering disciplines — from UI to infrastructure — delivered by specialists who ship production-quality code.
            </motion.p>
          </motion.div>

          {/* Asymmetric grid: 3 cols but first item spans 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {SERVICES.map((svc, i) => (
              <TiltCard
                key={svc.title}
                className={`${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <motion.a
                  href={svc.href}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ delay: i * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  onHoverStart={() => setActiveService(i)}
                  onHoverEnd={() => setActiveService(null)}
                  className="devx-service-card relative flex flex-col h-full rounded-2xl p-6 overflow-hidden group cursor-pointer"
                  style={{ background: DARK_CARD, border: `1px solid ${activeService === i ? svc.color + '66' : '#ffffff12'}`, transition: 'border-color 0.3s' }}
                >
                  {/* Glow blob */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{ opacity: activeService === i ? 1 : 0 }}
                    style={{ background: `radial-gradient(circle at 30% 30%, ${svc.color}22, transparent 70%)` }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: svc.color + '22', border: `1px solid ${svc.color}44` }}>
                        <svc.icon className="w-6 h-6" style={{ color: svc.color }} />
                      </div>
                      <span className="text-xs font-black px-2 py-1 rounded-full font-mono"
                        style={{ background: '#ffffff08', color: svc.color, border: `1px solid ${svc.color}33` }}>
                        {svc.tag}
                      </span>
                    </div>

                    <h3 className={`font-black text-white mb-2 ${i === 0 ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>{svc.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{svc.desc}</p>

                    {/* Featured card: richer service content so the 2x2 tile never looks empty */}
                    {i === 0 && (
                      <div className="mt-6 space-y-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Your website is your hardest-working salesperson. We design and engineer
                          modern, responsive websites that load fast, rank on Google, and turn
                          visitors into enquiries — built on clean, scalable code you own.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {[
                            'Mobile-first responsive design',
                            '95+ PageSpeed performance',
                            'SEO-ready structure & schema',
                            'Conversion-focused UI/UX',
                            'Secure, scalable architecture',
                            'Analytics & lead tracking baked in',
                          ].map((f) => (
                            <div key={f} className="flex items-center gap-2 rounded-lg px-3 py-2"
                              style={{ background: '#ffffff08', border: '1px solid #ffffff10' }}>
                              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: svc.color }} />
                              <span className="text-slate-300 text-xs font-semibold">{f}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs font-semibold" style={{ color: svc.color }}>
                          From landing pages to full web platforms — planned, designed, built and launched by one team.
                        </p>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {svc.stack.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold font-mono"
                          style={{ background: '#ffffff08', color: '#94a3b8' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    <motion.div
                      className="mt-5 flex items-center gap-2 text-sm font-bold"
                      style={{ color: svc.color }}
                      animate={{ x: activeService === i ? 6 : 0 }}
                    >
                      Explore <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.a>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ─────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ background: '#070b14' }}>
        <CircuitBg />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${NEON}44, transparent)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: NEON }}>
              Engineering Process
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-black text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              From brief to{' '}
              <span style={{
                background: `linear-gradient(135deg, ${NEON_DEEP}, ${NEON})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>production</span>
              {' '}— five precision steps.
            </motion.h2>
          </motion.div>

          {/* Horizontal timeline on desktop */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${NEON}66, transparent)` }} />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {TIMELINE.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl p-6 text-center"
                  style={{ background: DARK_CARD, border: `1px solid ${NEON}22` }}
                >
                  {/* Step bubble */}
                  <div className="relative mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${NEON_DEEP}, ${NEON})`, boxShadow: `0 0 24px ${NEON}44` }}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-black font-mono mb-2" style={{ color: NEON }}>{step.step}</p>
                  <h3 className="text-white font-bold text-sm mb-2">{step.label}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK MARQUEE ───────────────────────────────────────── */}
      <section className="py-20 overflow-hidden" style={{ background: DARK_CARD, borderTop: `1px solid ${NEON}22` }}>
        <p className="text-center text-xs font-black uppercase tracking-widest mb-10" style={{ color: '#4b5563' }}>
          Technologies we master
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: `linear-gradient(90deg, ${DARK_CARD}, transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: `linear-gradient(-90deg, ${DARK_CARD}, transparent)` }} />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex gap-10 whitespace-nowrap"
          >
            {[...Array(2)].flatMap(() =>
              ['React', 'Next.js', 'Node.js', 'TypeScript', 'Flutter', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'GraphQL', 'Figma', 'Tailwind', 'Firebase', 'Python', 'Go'].map((tech) => (
                <span key={Math.random()} className="text-2xl font-black font-mono" style={{ color: '#1e293b' }}>
                  {tech}
                </span>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden text-center" style={{ background: '#070b14' }}>
        <FloatingCode />
        <CircuitBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: `${NEON}10` }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: NEON }}>
              Ready to build?
            </p>
            <h2 className="font-black text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              Let's engineer your next{' '}
              <span style={{
                background: `linear-gradient(135deg, ${NEON_DEEP}, ${NEON})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                breakthrough product.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Free technical consultation — scoping, stack advice, architecture review, and timeline estimate.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#/contact?focus=first-name"
                whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${NEON}55` }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-black text-base"
                style={{ background: `linear-gradient(135deg, ${NEON_DEEP}, ${NEON})`, color: '#fff' }}
              >
                Get Free Tech Consultation <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#/services"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-black text-base text-white border"
                style={{ borderColor: `${NEON}44`, background: `${NEON}08` }}
              >
                <ExternalLink className="w-5 h-5" /> Browse All Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
