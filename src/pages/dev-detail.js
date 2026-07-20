/**
 * DevServiceDetail — detail template for ALL Development subpages.
 * Identity: futuristic engineering lab. Deep-space dark, glassmorphism,
 * neon indigo/violet/cyan, code visuals, particles, bento grid, CI/CD
 * pipeline timeline, mono FAQ. framer-motion + CSS only, no new deps.
 * Class prefix `devx-` — intentionally outside the legacy
 * .detail-page-shell / .site-compact patch layers.
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronRight, Terminal, Cpu, GitBranch, CheckCircle2,
  Braces, Plus, Minus, Rocket, ShieldCheck, Gauge, Workflow,
} from 'lucide-react';

/* ─── Palette (neon — gold is reserved for Solutions) ────────────────── */
const BG = '#05070f';
const PANEL = '#0b1020';
const PANEL2 = '#0d1428';
const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const CYAN = '#22d3ee';
const TXT = '#dbe3f5';
const MUT = '#7c89a6';

const slugOf = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ─── Stat string parser: '95+ performance score' → {num,suffix,label} ─ */
const parseStat = (s) => {
  const m = String(s).match(/^(\d+(?:\.\d+)?)\s*([%+x×]*)\s*(.*)$/);
  if (m && m[1]) return { num: parseFloat(m[1]), suffix: m[2] || '', label: m[3] || '' };
  return { num: null, suffix: '', label: s };
};

const DEV_HERO_CONFIG = {
  'Web Development': {
    variant: 'browser',
    accent: CYAN,
    accentSoft: '#67e8f9',
    badge: 'Lighthouse 98',
    title: 'Browser preview',
    subtitle: 'Mobile-first performance and SEO readiness.',
    primary: '98',
    primaryLabel: 'Performance score',
    stats: ['1.2s LCP', 'SEO ready', '6 breakpoints'],
    chips: ['Desktop', 'Tablet', 'Mobile', 'Schema'],
    bars: [96, 82, 91],
  },
  'App Development': {
    variant: 'device-stack',
    accent: VIOLET,
    accentSoft: '#c4b5fd',
    badge: 'Store Build Ready',
    title: 'Cross-platform shell',
    subtitle: 'Push, auth and release readiness in one sprint board.',
    primary: 'iOS + Android',
    primaryLabel: 'Platform coverage',
    stats: ['58 FPS avg', 'Push ready', 'Offline sync'],
    chips: ['React Native', 'Flutter', 'Store QA'],
  },
  'UI/UX Design': {
    variant: 'design-lab',
    accent: '#f5aa02',
    accentSoft: '#f5aa02',
    badge: 'Prototype Approved',
    title: 'Interface system',
    subtitle: 'Research-backed flows, palette and motion cues.',
    primary: '34 screens',
    primaryLabel: 'Mapped journey',
    stats: ['4 user flows', 'Design tokens', 'Handoff specs'],
    chips: ['Figma', 'Wireframes', 'Components'],
  },
  'E-commerce': {
    variant: 'commerce-console',
    accent: '#34d399',
    accentSoft: '#86efac',
    badge: 'Checkout Tuned',
    title: 'Revenue console',
    subtitle: 'Conversion flow, product sync and payment clarity.',
    primary: '0.9s',
    primaryLabel: 'Checkout response',
    stats: ['24% cart recovery', '3 gateways', 'Live catalog'],
    chips: ['UPI', 'Cards', 'COD', 'Inventory'],
    bars: [88, 72, 94],
  },
  'Custom Software': {
    variant: 'module-grid',
    accent: INDIGO,
    accentSoft: '#a5b4fc',
    badge: 'Blueprint Active',
    title: 'Solution blueprint',
    subtitle: 'Custom modules, workflow speed and roadmap visibility.',
    primary: '12',
    primaryLabel: 'Custom modules',
    stats: ['7 integrations', 'Role matrix', 'Sprint map'],
    chips: ['Admin', 'Reports', 'Ops', 'Automation'],
  },
  'API Integration': {
    variant: 'flow-map',
    accent: CYAN,
    accentSoft: '#a5f3fc',
    badge: 'Webhook Live',
    title: 'Integration flow',
    subtitle: 'Source-to-destination mapping with monitored handoffs.',
    primary: '42 ms',
    primaryLabel: 'Gateway latency',
    stats: ['6 endpoints', 'Retry logic', 'Signed payloads'],
    chips: ['CRM', 'Payments', 'WhatsApp', 'ERP'],
  },
  'Cloud Solutions': {
    variant: 'cloud-cluster',
    accent: '#60a5fa',
    accentSoft: '#93c5fd',
    badge: '99.98% Uptime',
    title: 'Cluster monitor',
    subtitle: 'Backups, deployment lanes and scale-ready hosting.',
    primary: '3 zones',
    primaryLabel: 'Deployment spread',
    stats: ['Nightly backups', 'SSL active', 'Auto scale'],
    chips: ['CDN', 'Cache', 'DB', 'CI/CD'],
    bars: [72, 90, 84],
  },
  'Website Maintenance': {
    variant: 'health-board',
    accent: '#34d399',
    accentSoft: '#86efac',
    badge: 'All Systems Healthy',
    title: 'Maintenance pulse',
    subtitle: 'Monitoring, fixes and iterative improvement tracking.',
    primary: '14',
    primaryLabel: 'Open tickets closed',
    stats: ['0 critical issues', 'Weekly checks', 'Fresh backups'],
    chips: ['Security', 'Speed', 'Content', 'Support'],
  },
};

/* ─── Count-up (mono, ticks like a readout) ──────────────────────────── */
const NeonCounter = ({ to, suffix = '', duration = 1.6 }) => {
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
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to * 10) / 10);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{Number.isInteger(to) ? Math.round(val) : val}{suffix}</span>;
};

/* ─── Floating particles ─────────────────────────────────────────────── */
const Particles = ({ count = 26 }) => {
  const dots = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    size: 1.5 + (i % 3),
    color: [INDIGO, VIOLET, CYAN][i % 3],
    dur: 9 + (i % 6) * 2.2,
    delay: (i % 8) * 0.6,
  })), [count]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, background: d.color, boxShadow: `0 0 8px ${d.color}` }}
          animate={{ y: [0, -46, 0], opacity: [0.15, 0.75, 0.15] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

/* ─── Perspective grid floor + scanline ──────────────────────────────── */
const GridBg = () => (
  <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
    backgroundImage: `linear-gradient(${INDIGO}14 1px, transparent 1px), linear-gradient(90deg, ${INDIGO}14 1px, transparent 1px)`,
    backgroundSize: '56px 56px',
    maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)',
    WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)',
  }} />
);

/* ─── Mouse-follow glow ──────────────────────────────────────────────── */
const MouseGlow = () => {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 70, damping: 18 });
  const sy = useSpring(y, { stiffness: 70, damping: 18 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);
  return (
    <motion.div className="fixed pointer-events-none" aria-hidden="true" style={{
      left: sx, top: sy, translateX: '-50%', translateY: '-50%', zIndex: 1,
      width: 520, height: 520, borderRadius: '50%',
      background: `radial-gradient(circle, ${VIOLET}14 0%, ${CYAN}0a 40%, transparent 70%)`,
    }} />
  );
};

/* ─── 3D tilt wrapper ────────────────────────────────────────────────── */
const Tilt = ({ children, className = '' }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const rotX = useTransform(srx, [-1, 1], [7, -7]);
  const rotY = useTransform(sry, [-1, 1], [-7, 7]);
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        rx.set(((e.clientY - r.top) / r.height - 0.5) * 2);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Page-specific development hero visual ──────────────────────────── */
const CodeEditor = ({ page }) => {
  const slug = slugOf(page.title);
  const Icon = page.icon;
  const visual = DEV_HERO_CONFIG[page.title] || DEV_HERO_CONFIG['Custom Software'];
  const accent = visual.accent;
  const soft = visual.accentSoft;

  const shellStyle = {
    background: `linear-gradient(165deg, ${PANEL2}f2, ${PANEL}f4)`,
    border: `1px solid ${accent}3d`,
    boxShadow: `0 30px 80px -24px ${accent}33, inset 0 1px 0 #ffffff12`,
    backdropFilter: 'blur(14px)',
  };

  const statCard = (value, label, index) => (
    <div key={label} className="rounded-2xl px-4 py-3" style={{ background: '#0f172acc', border: `1px solid ${accent}24` }}>
      <p className="devx-mono text-sm font-black" style={{ color: [accent, soft, '#ffffff'][index % 3] }}>{value}</p>
      <p className="devx-mono text-[10px] uppercase tracking-[0.22em] mt-1" style={{ color: MUT }}>{label}</p>
    </div>
  );

  const chip = (label, index) => (
    <span
      key={label}
      className="devx-chip inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em]"
      style={{
        color: index % 2 === 0 ? accent : soft,
        background: `${index % 2 === 0 ? accent : soft}12`,
        border: `1px solid ${index % 2 === 0 ? accent : soft}33`,
        animationDelay: `${index * 0.18}s`,
      }}
    >
      {label}
    </span>
  );

  const browserVisual = (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
      <div className="rounded-[1.6rem] p-5 relative overflow-hidden" style={{ background: '#091122', border: `1px solid ${accent}26` }}>
        <div className="absolute inset-x-8 top-0 h-px devx-scan" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
        <div className="flex items-center justify-between mb-4">
          <span className="devx-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: soft }}>Live audit</span>
          <span className="rounded-full px-2.5 py-1 text-[10px] font-black" style={{ background: `${accent}14`, color: accent }}>SEO READY</span>
        </div>
        <div className="grid grid-cols-[116px_1fr] gap-4 items-center">
          <div className="relative mx-auto w-28 h-28 rounded-full p-3" style={{ border: `8px solid ${accent}22` }}>
            <div className="w-full h-full rounded-full grid place-items-center" style={{ background: `radial-gradient(circle, ${accent}20, #08101d 72%)` }}>
              <div className="text-center">
                <p className="text-3xl font-black" style={{ color: accent }}>{visual.primary}</p>
                <p className="devx-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: MUT }}>{visual.primaryLabel}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {(visual.bars || []).map((bar, i) => (
              <div key={bar}>
                <div className="flex items-center justify-between text-[10px] devx-mono uppercase tracking-[0.2em] mb-1" style={{ color: MUT }}>
                  <span>{['Speed', 'Accessibility', 'SEO'][i]}</span>
                  <span style={{ color: i === 0 ? accent : soft }}>{bar}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#15203a' }}>
                  <div className="devx-rise h-full rounded-full" style={{ width: `${bar}%`, background: `linear-gradient(90deg, ${accent}, ${soft})`, animationDelay: `${i * 0.18}s` }} />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">{(visual.chips || []).map(chip)}</div>
          </div>
        </div>
      </div>
      <div className="grid gap-3">{(visual.stats || []).map((item, i) => statCard(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
    </div>
  );

  const appVisual = (
    <div className="grid gap-4 lg:grid-cols-[1fr_.78fr] items-start">
      <div className="grid grid-cols-2 gap-4">
        {[['iOS build', 'Push auth'], ['Android build', 'Store QA']].map(([heading, note], index) => (
          <div key={heading} className="rounded-[2rem] px-4 pt-4 pb-5 relative overflow-hidden" style={{ background: '#0a1224', border: `1px solid ${index === 0 ? accent : soft}33` }}>
            <div className="mx-auto mb-3 w-24 h-44 rounded-[1.8rem] border p-3" style={{ borderColor: `${index === 0 ? accent : soft}44`, background: 'linear-gradient(180deg, #111b34, #090f1d)' }}>
              <div className="w-12 h-1.5 rounded-full mx-auto mb-3" style={{ background: '#ffffff25' }} />
              <div className="rounded-2xl p-3 h-full flex flex-col justify-between" style={{ background: `linear-gradient(180deg, ${index === 0 ? accent : soft}22, transparent)` }}>
                <Icon className="w-6 h-6" style={{ color: index === 0 ? accent : soft }} />
                <div className="space-y-2">
                  <div className="h-2 rounded-full" style={{ background: '#ffffff14' }} />
                  <div className="h-2 rounded-full w-4/5" style={{ background: '#ffffff14' }} />
                  <div className="rounded-xl px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em]" style={{ color: index === 0 ? accent : soft, background: '#ffffff0b' }}>{note}</div>
                </div>
              </div>
            </div>
            <p className="devx-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: MUT }}>{heading}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="rounded-[1.5rem] p-4" style={{ background: '#0d1529', border: `1px solid ${accent}26` }}>
          <p className="text-lg font-black" style={{ color: soft }}>{visual.primary}</p>
          <p className="devx-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: MUT }}>{visual.primaryLabel}</p>
        </div>
        {(visual.stats || []).map((item, i) => statCard(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}
        <div className="flex flex-wrap gap-2">{(visual.chips || []).map(chip)}</div>
      </div>
    </div>
  );

  const designVisual = (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
      <div className="rounded-[1.8rem] p-5" style={{ background: '#0a1220', border: `1px solid ${accent}2a` }}>
        <div className="grid grid-cols-[1.2fr_.8fr] gap-4">
          <div className="rounded-[1.4rem] p-4" style={{ background: '#f8fafc', color: '#0f172a' }}>
            <div className="h-24 rounded-[1rem] mb-3" style={{ background: `linear-gradient(135deg, ${accent}, ${soft})` }} />
            <div className="grid gap-2">
              <div className="h-3 rounded-full bg-slate-200 w-4/5" />
              <div className="h-3 rounded-full bg-slate-200" />
              <div className="h-14 rounded-2xl border border-slate-200 bg-white relative overflow-hidden">
                <span className="absolute left-4 top-4 w-2 h-2 rounded-full devx-blink" style={{ background: accent }} />
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            {['Research', 'Flows', 'UI Kit'].map((label, i) => (
              <div key={label} className="rounded-[1.2rem] p-3" style={{ background: '#111a2c', border: `1px solid ${i === 0 ? accent : soft}24` }}>
                <p className="devx-mono text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: MUT }}>{label}</p>
                <div className="flex gap-2">{['#07152f', accent, soft].map((color) => <span key={color + label} className="w-8 h-8 rounded-xl" style={{ background: color }} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="rounded-[1.5rem] p-4" style={{ background: '#0d1529', border: `1px solid ${accent}26` }}>
          <p className="text-2xl font-black" style={{ color: accent }}>{visual.primary}</p>
          <p className="devx-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: MUT }}>{visual.primaryLabel}</p>
        </div>
        {(visual.stats || []).map((item, i) => statCard(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}
        <div className="flex flex-wrap gap-2">{(visual.chips || []).map(chip)}</div>
      </div>
    </div>
  );

  const commerceVisual = (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr] items-start">
      <div className="rounded-[1.8rem] p-5" style={{ background: '#0b1222', border: `1px solid ${accent}28` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-black text-white">Checkout flow</p>
            <p className="devx-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: MUT }}>Storefront health</p>
          </div>
          <span className="rounded-full px-3 py-1 text-[10px] font-black" style={{ background: `${accent}18`, color: accent }}>PAYMENT LIVE</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {['Product view', 'Cart', 'Checkout', 'Upsell'].map((label, i) => (
            <div key={label} className="rounded-[1.2rem] p-3" style={{ background: '#111a2d', border: `1px solid ${i % 2 === 0 ? accent : soft}20` }}>
              <p className="text-sm font-black" style={{ color: i % 2 === 0 ? accent : soft }}>{['12K', '4.1K', '1.9K', '620'][i]}</p>
              <p className="devx-mono text-[10px] uppercase tracking-[0.18em] mt-1" style={{ color: MUT }}>{label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {(visual.bars || []).map((bar, i) => (
            <div key={bar}>
              <div className="flex items-center justify-between text-[10px] devx-mono uppercase tracking-[0.2em] mb-1" style={{ color: MUT }}>
                <span>{['Checkout speed', 'Product sync', 'Payment readiness'][i]}</span>
                <span style={{ color: i === 1 ? soft : accent }}>{bar}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#15203a' }}>
                <div className="devx-rise h-full rounded-full" style={{ width: `${bar}%`, background: `linear-gradient(90deg, ${accent}, ${soft})`, animationDelay: `${i * 0.16}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-[1.5rem] p-4" style={{ background: '#0d1529', border: `1px solid ${accent}26` }}>
          <p className="text-2xl font-black" style={{ color: accent }}>{visual.primary}</p>
          <p className="devx-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: MUT }}>{visual.primaryLabel}</p>
        </div>
        {(visual.stats || []).map((item, i) => statCard(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}
        <div className="flex flex-wrap gap-2">{(visual.chips || []).map(chip)}</div>
      </div>
    </div>
  );

  const moduleVisual = (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-start">
      <div className="rounded-[1.8rem] p-5" style={{ background: '#0a1220', border: `1px solid ${accent}28` }}>
        <div className="grid grid-cols-2 gap-3">
          {['Ops Core', 'Sales Desk', 'Report Hub', 'Workflow Bot'].map((label, i) => (
            <div key={label} className="rounded-[1.3rem] p-4 relative overflow-hidden" style={{ background: '#10192c', border: `1px solid ${[accent, soft, CYAN, '#ffffff'][i]}20` }}>
              <div className="absolute inset-x-0 top-0 h-px devx-scan" style={{ background: `linear-gradient(90deg, transparent, ${[accent, soft, CYAN, '#ffffff'][i]}, transparent)`, animationDelay: `${i * 0.3}s` }} />
              <p className="text-sm font-black" style={{ color: [accent, soft, CYAN, '#ffffff'][i] }}>{['01', '02', '03', '04'][i]}</p>
              <p className="mt-2 text-white font-semibold">{label}</p>
              <p className="devx-mono text-[10px] uppercase tracking-[0.18em] mt-2" style={{ color: MUT }}>{['Live roles', 'Lead board', 'Audit exports', 'Task rules'][i]}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[1.4rem] px-4 py-3 flex items-center gap-3 overflow-x-auto" style={{ background: '#0f172a', border: `1px solid ${accent}1e` }}>
          {['Plan', 'Build', 'QA', 'Launch'].map((stage, i) => (
            <React.Fragment key={stage}>
              <span className="devx-mono text-[10px] uppercase tracking-[0.22em] px-3 py-2 rounded-full" style={{ color: i < 3 ? accent : soft, background: `${i < 3 ? accent : soft}12` }}>{stage}</span>
              {i < 3 && <span className="h-px flex-1 min-w-[28px]" style={{ background: `${accent}33` }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-[1.5rem] p-4" style={{ background: '#0d1529', border: `1px solid ${accent}26` }}>
          <p className="text-2xl font-black" style={{ color: accent }}>{visual.primary}</p>
          <p className="devx-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: MUT }}>{visual.primaryLabel}</p>
        </div>
        {(visual.stats || []).map((item, i) => statCard(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}
        <div className="flex flex-wrap gap-2">{(visual.chips || []).map(chip)}</div>
      </div>
    </div>
  );

  const flowVisual = (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-start">
      <div className="rounded-[1.8rem] p-5" style={{ background: '#0a1220', border: `1px solid ${accent}28` }}>
        <div className="space-y-3">
          {['Form submit', 'Validation queue', 'CRM sync', 'Webhook ack'].map((label, i) => (
            <div key={label} className="relative flex items-center gap-3 rounded-[1.2rem] px-4 py-3" style={{ background: '#0f172a', border: `1px solid ${i % 2 === 0 ? accent : soft}22` }}>
              <span className="w-10 h-10 rounded-2xl grid place-items-center flex-shrink-0" style={{ background: `${i % 2 === 0 ? accent : soft}18`, color: i % 2 === 0 ? accent : soft }}>
                {i % 2 === 0 ? <Workflow className="w-5 h-5" /> : <GitBranch className="w-5 h-5" />}
              </span>
              <div>
                <p className="text-white font-semibold">{label}</p>
                <p className="devx-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: MUT }}>{['Secure capture', 'Schema check', 'Field mapping', 'Retry success'][i]}</p>
              </div>
              {i < 3 && <span className="absolute left-8 top-full h-4 w-px devx-pulse" style={{ background: accent }} />}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-[1.5rem] p-4" style={{ background: '#0d1529', border: `1px solid ${accent}26` }}>
          <p className="text-2xl font-black" style={{ color: accent }}>{visual.primary}</p>
          <p className="devx-mono text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: MUT }}>{visual.primaryLabel}</p>
        </div>
        {(visual.stats || []).map((item, i) => statCard(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}
        <div className="flex flex-wrap gap-2">{(visual.chips || []).map(chip)}</div>
      </div>
    </div>
  );

  const cloudVisual = (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-start">
      <div className="rounded-[1.8rem] p-5 relative overflow-hidden" style={{ background: '#08111f', border: `1px solid ${accent}24` }}>
        <div className="absolute right-6 top-6 w-24 h-24 rounded-full devx-orbit" style={{ border: `1px solid ${accent}33` }} />
        <div className="grid grid-cols-[1fr_.9fr] gap-4 items-center">
          <div>
            <div className="w-28 h-28 rounded-full grid place-items-center mb-4" style={{ border: `8px solid ${accent}20`, background: `radial-gradient(circle, ${accent}18, transparent 72%)` }}>
              <ShieldCheck className="w-10 h-10" style={{ color: accent }} />
            </div>
            <p className="text-white font-black">{visual.primary}</p>
            <p className="devx-mono text-[10px] uppercase tracking-[0.18em] mt-1" style={{ color: MUT }}>{visual.primaryLabel}</p>
          </div>
          <div className="space-y-3">
            {(visual.bars || []).map((bar, i) => (
              <div key={bar}>
                <div className="flex items-center justify-between text-[10px] devx-mono uppercase tracking-[0.2em] mb-1" style={{ color: MUT }}>
                  <span>{['Uptime', 'Cache hit', 'Deploy health'][i]}</span>
                  <span style={{ color: i === 1 ? soft : accent }}>{bar}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#15203a' }}>
                  <div className="devx-rise h-full rounded-full" style={{ width: `${bar}%`, background: `linear-gradient(90deg, ${accent}, ${soft})`, animationDelay: `${i * 0.14}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {(visual.stats || []).map((item, i) => statCard(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}
        <div className="rounded-[1.5rem] p-4" style={{ background: '#0d1529', border: `1px solid ${accent}26` }}>
          <div className="flex flex-wrap gap-2">{(visual.chips || []).map(chip)}</div>
        </div>
      </div>
    </div>
  );

  const healthVisual = (
    <div className="grid gap-4 lg:grid-cols-[.92fr_1.08fr] items-start">
      <div className="rounded-[1.8rem] p-5 text-center" style={{ background: '#0a1220', border: `1px solid ${accent}28` }}>
        <div className="mx-auto w-32 h-32 rounded-full grid place-items-center mb-4 devx-pulse" style={{ border: `10px solid ${accent}20`, background: `radial-gradient(circle, ${accent}18, transparent 72%)` }}>
          <div>
            <CheckCircle2 className="w-10 h-10 mx-auto mb-2" style={{ color: accent }} />
            <p className="text-2xl font-black" style={{ color: accent }}>Healthy</p>
          </div>
        </div>
        <p className="devx-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: MUT }}>{visual.badge}</p>
      </div>
      <div className="space-y-3">
        {['Security review', 'Core updates', 'Backup verified', 'Support notes'].map((label, i) => (
          <div key={label} className="rounded-[1.3rem] px-4 py-3 flex items-center justify-between gap-3" style={{ background: '#0f172a', border: `1px solid ${i % 2 === 0 ? accent : soft}1f` }}>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: `${i % 2 === 0 ? accent : soft}15` }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: i % 2 === 0 ? accent : soft }} />
              </span>
              <div>
                <p className="text-white font-semibold">{label}</p>
                <p className="devx-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: MUT }}>{['Passed', 'Scheduled', 'Snapshot live', 'Shared'][i]}</p>
              </div>
            </div>
            <span className="text-xs font-black" style={{ color: i % 2 === 0 ? accent : soft }}>{['09:30', 'Today', '02:00', 'Ready'][i]}</span>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-3">{(visual.stats || []).map((item, i) => statCard(item.split(' ')[0], item.split(' ').slice(1).join(' '), i))}</div>
      </div>
    </div>
  );

  const visualByVariant = {
    browser: browserVisual,
    'device-stack': appVisual,
    'design-lab': designVisual,
    'commerce-console': commerceVisual,
    'module-grid': moduleVisual,
    'flow-map': flowVisual,
    'cloud-cluster': cloudVisual,
    'health-board': healthVisual,
  };

  return (
    <Tilt>
      <div className="rounded-[2rem] overflow-hidden" style={shellStyle}>
        <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: `1px solid ${accent}20` }}>
          <span className="w-3 h-3 rounded-full" style={{ background: '#f87171' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#f5aa02' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#34d399' }} />
          <span className="ml-3 devx-mono text-xs" style={{ color: MUT }}>{slug}.service.ts</span>
          <span className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: accent, background: `${accent}14`, border: `1px solid ${accent}33` }}>
            <Icon className="w-3.5 h-3.5" /> {visual.badge}
          </span>
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-white text-xl font-black">{visual.title}</p>
              <p className="devx-mono text-[11px] uppercase tracking-[0.18em] mt-1" style={{ color: MUT }}>{visual.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">{(visual.chips || []).map(chip)}</div>
          </div>
          {visualByVariant[visual.variant]}
        </div>
      </div>
    </Tilt>
  );
};

/* ─── Bento capability card descriptions ─────────────────────────────── */
const bentoDesc = (page, item, i) => {
  const kp = page.keyPoints?.find((p) => p.title.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(p.title.toLowerCase()));
  if (kp) return kp.desc;
  if (page.keyPoints?.[i % (page.keyPoints.length || 1)]) return page.keyPoints[i % page.keyPoints.length].desc;
  return `${item} — engineered with clean architecture, automated tests, staging review and production monitoring.`;
};

/* ─── FAQ (dev-flavoured, mono accordion) ────────────────────────────── */
const devFaqs = (page) => ([
  { q: `Which stack do you use for ${page.title.toLowerCase()}?`, a: 'We pick the stack per project — typically React/Next.js on the frontend, Node.js APIs, and managed cloud infrastructure. You get the reasoning, not just the buzzwords, before we write a line of code.' },
  { q: 'Do I get access to the source code and repository?', a: 'Yes. Every build lives in a Git repository you own. Commits, branches, CI logs and deployment history are visible to you from day one.' },
  { q: 'How do you handle testing and quality?', a: 'Code review on every merge, automated checks in CI, staging environment sign-off, and cross-device QA before anything reaches production.' },
  { q: 'What happens after launch?', a: 'We monitor uptime and performance, patch dependencies, and ship improvements in maintenance sprints. You receive a monthly engineering report.' },
  { q: 'Can you take over an existing codebase?', a: 'Yes — we start with a technical audit (architecture, security, performance, debt), then propose a stabilise-and-extend roadmap instead of a risky rewrite.' },
]);

const DevFAQ = ({ page }) => {
  const [open, setOpen] = useState(0);
  const faqs = devFaqs(page);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <motion.div key={f.q} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }} transition={{ delay: i * 0.05, duration: 0.5 }}
          className="rounded-xl overflow-hidden"
          style={{ background: PANEL, border: `1px solid ${open === i ? CYAN + '55' : '#ffffff12'}`, transition: 'border-color .3s' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center gap-4 px-5 py-4 text-left">
            <span className="devx-mono text-xs" style={{ color: CYAN }}>{`>_`}</span>
            <span className="flex-1 font-bold text-sm" style={{ color: TXT }}>{f.q}</span>
            {open === i ? <Minus className="w-4 h-4" style={{ color: CYAN }} /> : <Plus className="w-4 h-4" style={{ color: MUT }} />}
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                <p className="px-5 pb-5 pl-14 text-sm leading-relaxed" style={{ color: MUT }}>{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

/* ═══ MAIN TEMPLATE ═══════════════════════════════════════════════════ */
export default function DevServiceDetail({ page, FooterComponent, ContactSectionComponent }) {
  const Icon = page.icon;
  const slug = slugOf(page.title);
  const stats = page.stats.map(parseStat);
  const bulletIcons = [Braces, Gauge, ShieldCheck, Workflow, GitBranch, Cpu];
  const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-6'];
  const neon = [INDIGO, VIOLET, CYAN];

  return (
    <div className="devx-shell min-h-screen overflow-x-clip" style={{ background: BG, color: TXT }}>
      <style>{`
        .devx-shell{font-family:'Space Grotesk','Inter',system-ui,sans-serif;}
        .devx-mono{font-family:'JetBrains Mono',ui-monospace,monospace;}
        .devx-gradient-border{position:relative;}
        .devx-gradient-border::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;
          background:linear-gradient(135deg,${INDIGO}66,${VIOLET}22 40%,${CYAN}66);
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
        .devx-chip{animation:devxChipFloat 4.6s ease-in-out infinite;}
        .devx-pulse{animation:devxPulse 2.7s ease-in-out infinite;}
        .devx-rise{animation:devxBarRise 4.8s ease-in-out infinite;transform-origin:left center;}
        .devx-scan{animation:devxScan 3.8s linear infinite;}
        .devx-blink{animation:devxBlink 1s steps(1) infinite;}
        .devx-orbit{animation:devxOrbit 8s linear infinite;}
        @keyframes devxChipFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes devxPulse{0%,100%{transform:scale(1);box-shadow:0 0 0 rgba(99,102,241,0)}50%{transform:scale(1.02);box-shadow:0 0 24px rgba(99,102,241,.22)}}
        @keyframes devxBarRise{0%,100%{transform:scaleX(.94)}50%{transform:scaleX(1)}}
        @keyframes devxScan{0%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
        @keyframes devxBlink{0%,49%{opacity:1}50%,100%{opacity:.1}}
        @keyframes devxOrbit{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @media (prefers-reduced-motion: reduce){.devx-shell *{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
      `}</style>
      <MouseGlow />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
        <GridBg />
        <Particles />
        <div className="absolute -top-24 right-[8%] w-[420px] h-[420px] rounded-full blur-[130px] pointer-events-none" style={{ background: `${VIOLET}2e` }} />
        <div className="absolute bottom-0 left-[2%] w-[340px] h-[340px] rounded-full blur-[110px] pointer-events-none" style={{ background: `${CYAN}1f` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p className="devx-mono text-xs mb-5" style={{ color: MUT }}>
              <a href="#/development" className="hover:underline" style={{ color: CYAN }}>~/development</a>
              <span style={{ color: '#3b4763' }}>/</span>{slug}
            </p>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 devx-mono"
              style={{ background: `${INDIGO}1f`, color: '#a5b4fc', border: `1px solid ${INDIGO}55`, boxShadow: `0 0 24px ${INDIGO}33` }}>
              <Icon className="w-3.5 h-3.5" /> {page.kicker}
            </span>
            <h1 className="font-black leading-[1.04] mb-6" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)', color: '#f1f5ff' }}>
              {page.title}
              <span className="block" style={{
                background: `linear-gradient(120deg, ${INDIGO}, ${VIOLET} 45%, ${CYAN})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>built to ship & scale.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-9 max-w-xl" style={{ color: MUT }}>{page.description}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.a href="#/contact?focus=first-name"
                whileHover={{ scale: 1.04, boxShadow: `0 0 44px ${VIOLET}66` }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white"
                style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})` }}>
                Contact Us <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href="#/development" whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm devx-mono"
                style={{ border: `1px solid ${CYAN}44`, color: CYAN, background: `${CYAN}0d` }}>
                <Terminal className="w-4 h-4" /> cd ../development
              </motion.a>
            </div>

            {/* System-readout stats */}
            <div className="devx-kpi-grid grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg w-full">
              {stats.map((s, i) => (
                <motion.div key={page.stats[i]} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className="devx-kpi-card devx-gradient-border rounded-xl px-3 py-3"
                  style={{ background: `${PANEL}cc`, backdropFilter: 'blur(10px)' }}>
                  <p className="devx-mono font-black text-xl sm:text-2xl" style={{ color: neon[i % 3], textShadow: `0 0 18px ${neon[i % 3]}66` }}>
                    {s.num !== null ? <NeonCounter to={s.num} suffix={s.suffix} /> : '◈'}
                  </p>
                  <p className="devx-mono text-[10px] uppercase tracking-wider mt-1" style={{ color: MUT }}>
                    {s.num !== null ? s.label : s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <CodeEditor page={page} />
          </motion.div>
        </div>
      </section>

      {/* ── BENTO CAPABILITIES ───────────────────────────────────────── */}
      <section className="relative py-24">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${INDIGO}55, ${CYAN}55, transparent)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="mb-14">
            <p className="devx-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: CYAN }}>./capabilities --all</p>
            <h2 className="font-black max-w-2xl" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', color: '#f1f5ff' }}>
              Everything inside your {page.title.toLowerCase()} build.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {page.bullets.map((b, i) => {
              const BIcon = bulletIcons[i % bulletIcons.length];
              const col = neon[i % 3];
              const wide = spans[i] === 'lg:col-span-6' || spans[i] === 'lg:col-span-4';
              return (
                <motion.div key={b}
                  initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className={`devx-gradient-border relative rounded-2xl p-6 overflow-hidden group ${spans[i] || 'lg:col-span-2'} ${wide ? 'sm:col-span-2' : ''}`}
                  style={{ background: `linear-gradient(150deg, ${PANEL2}, ${PANEL})` }}>
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `${col}30` }} />
                  <div className={`relative z-10 ${wide ? 'lg:flex lg:items-center lg:gap-8' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="devx-mono text-[10px]" style={{ color: '#42506e' }}>{String(i + 1).padStart(2, '0')}</span>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${col}1c`, border: `1px solid ${col}44`, boxShadow: `0 0 20px ${col}22` }}>
                        <BIcon className="w-5 h-5" style={{ color: col }} />
                      </div>
                      <h3 className="font-black text-base" style={{ color: '#eef2ff' }}>{b}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: MUT }}>{bentoDesc(page, b, i)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── KEY POINTS — system modules ──────────────────────────────── */}
      {page.keyPoints && (
        <section className="relative py-24" style={{ background: `linear-gradient(180deg, ${BG}, #070b17 50%, ${BG})` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.3 }}>
              <p className="devx-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: VIOLET }}>system.modules</p>
              <h2 className="font-black mb-5" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)', color: '#f1f5ff' }}>
                How we engineer real results.
              </h2>
              <p className="leading-relaxed" style={{ color: MUT }}>
                Strategy, architecture, code quality and observability working as one delivery system —
                planned, built, tested and monitored by specialists.
              </p>
            </motion.div>
            <div className="space-y-4">
              {page.keyPoints.map((kp, i) => (
                <motion.div key={kp.title}
                  initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 8 }}
                  className="flex gap-5 rounded-2xl p-6"
                  style={{ background: `${PANEL}bb`, backdropFilter: 'blur(12px)', borderLeft: `2px solid ${neon[i % 3]}`, border: '1px solid #ffffff10', borderLeftColor: neon[i % 3], borderLeftWidth: 2 }}>
                  <span className="devx-mono font-black text-3xl leading-none flex-shrink-0" style={{
                    WebkitTextStroke: `1px ${neon[i % 3]}`, color: 'transparent',
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-black mb-1.5" style={{ color: '#eef2ff' }}>{kp.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUT }}>{kp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PIPELINE (process) ───────────────────────────────────────── */}
      {page.process && (
        <section className="relative py-24 overflow-hidden">
          <Particles count={14} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="text-center mb-16">
              <p className="devx-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: CYAN }}>deploy.pipeline</p>
              <h2 className="font-black" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', color: '#f1f5ff' }}>
                From <span style={{ color: '#a5b4fc' }}>git init</span> to production.
              </h2>
            </motion.div>

            <div className="relative">
              {/* animated pipeline line */}
              <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-[2px] overflow-hidden rounded"
                style={{ background: '#1a2340' }}>
                <motion.div className="h-full w-1/3 rounded"
                  style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
                  animate={{ x: ['-100%', '360%'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
                {page.process.map((step, i) => (
                  <motion.div key={step}
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: i * 0.14, duration: 0.6 }}
                    className="relative text-center">
                    <div className="relative mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: PANEL2, border: `2px solid ${neon[i % 3]}`, boxShadow: `0 0 26px ${neon[i % 3]}55` }}>
                      <CheckCircle2 className="w-6 h-6" style={{ color: neon[i % 3] }} />
                      <motion.span className="absolute inset-0 rounded-full"
                        style={{ border: `2px solid ${neon[i % 3]}` }}
                        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
                    </div>
                    <p className="devx-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: '#42506e' }}>stage_{i + 1}</p>
                    <h3 className="font-bold text-sm" style={{ color: TXT }}>{step}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="mb-10">
            <p className="devx-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: VIOLET }}>man {slug}</p>
            <h2 className="font-black" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', color: '#f1f5ff' }}>
              Technical questions, answered.
            </h2>
          </motion.div>
          <DevFAQ page={page} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden text-center">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: `${INDIGO}1c` }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.7 }}>
            <p className="devx-mono text-sm mb-6" style={{ color: CYAN }}>
              $ npx aurashine init --service {slug}
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 ml-2 align-middle" style={{ background: CYAN }} />
            </p>
            <h2 className="font-black mb-6" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)', color: '#f1f5ff' }}>
              Ready to compile your{' '}
              <span style={{
                background: `linear-gradient(120deg, ${INDIGO}, ${VIOLET}, ${CYAN})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>next release?</span>
            </h2>
            <p className="mb-10 text-lg" style={{ color: MUT }}>
              Free technical consultation — scoping, stack advice, architecture review and a delivery timeline.
            </p>
            <motion.a href="#/contact?focus=first-name"
              whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${VIOLET}66` }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-base text-white"
              style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})` }}>
              <Rocket className="w-5 h-5" /> Connect With Us <ChevronRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {ContactSectionComponent && <div style={{ background: '#fff' }}><ContactSectionComponent /></div>}
      {FooterComponent && <FooterComponent />}
    </div>
  );
}
