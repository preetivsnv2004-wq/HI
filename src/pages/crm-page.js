import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  LayoutDashboard, BarChart3, Users, TrendingUp, Bell, Calendar,
  Zap, Database, ArrowRight, ArrowLeft, Sparkles, CheckCircle, Clock, Search,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────
   AuraShine CRM — premium "Coming Soon" placeholder (route: #/crm)
   Self-contained so the real CRM app can later replace this file's default
   export without touching routing, nav or global styles.
   Visual system: premium-experience-v4.css (.crmx-* / .v4-* classes).
   ──────────────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1];

/* animated count-up used by the dashboard stat cards */
const CountUp = ({ to, suffix = '', prefix = '', duration = 1600 }) => {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  const ref = useRef(null);
  useEffect(() => {
    if (reduce) { setVal(to); return undefined; }
    let raf = null;
    let start = null;
    const step = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = window.requestAnimationFrame(step);
    };
    const timer = window.setTimeout(() => { raf = window.requestAnimationFrame(step); }, 350);
    return () => { if (raf) window.cancelAnimationFrame(raf); window.clearTimeout(timer); };
  }, [to, duration, reduce]);
  return <span ref={ref}>{prefix}{val.toLocaleString('en-IN')}{suffix}</span>;
};

const CrmPage = () => {
  const reduce = useReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    setParallax({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  const stats = [
    { icon: Users, label: 'Active leads', to: 1284, suffix: '' },
    { icon: TrendingUp, label: 'Conversion', to: 38, suffix: '%' },
    { icon: Calendar, label: 'Bookings', to: 512, suffix: '' },
    { icon: Zap, label: 'Automations', to: 96, suffix: '' },
  ];
  const bars = [42, 58, 35, 74, 61, 88, 52, 70];
  const leads = [
    { n: 'Priya Sharma', s: 'Website enquiry', t: 'Now' },
    { n: 'Rahul Mehta', s: 'Salon booking', t: '4m' },
    { n: 'Aisha Khan', s: 'CRM demo', t: '11m' },
  ];
  const sideIcons = [LayoutDashboard, Users, BarChart3, Calendar, Bell];
  const particles = [
    { top: '18%', left: '8%', s: 8, d: '0s' },
    { top: '30%', left: '92%', s: 6, d: '1.4s' },
    { top: '72%', left: '14%', s: 10, d: '2.1s' },
    { top: '80%', left: '86%', s: 7, d: '.7s' },
    { top: '12%', left: '60%', s: 5, d: '1.9s' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: i * 0.08 } }),
  };

  return (
    <main className="crmx-page min-h-screen pt-28 pb-24 sm:pt-32" onMouseMove={onMouseMove}>
      {/* decorative background layers */}
      <div className="absolute inset-0 v4-mesh pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 v4-dotgrid pointer-events-none opacity-60" aria-hidden="true" />
      <div className="crmx-blob v4-blob" style={{ top: '-8rem', left: '-6rem', width: '26rem', height: '26rem', background: 'rgba(245,170,2,.22)', transform: `translate(${parallax.x * 18}px, ${parallax.y * 18}px)` }} aria-hidden="true" />
      <div className="crmx-blob v4-blob" style={{ bottom: '-10rem', right: '-6rem', width: '30rem', height: '30rem', background: 'rgba(59,130,246,.16)', animationDelay: '2s', transform: `translate(${parallax.x * -22}px, ${parallax.y * -22}px)` }} aria-hidden="true" />
      {!reduce && particles.map((p, i) => (
        <span key={i} className="v4-particle" style={{ top: p.top, left: p.left, width: p.s, height: p.s, animationDelay: p.d }} aria-hidden="true" />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── hero copy ── */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            variants={fadeUp} initial="hidden" animate="show"
            className="crmx-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-primary-light mb-7"
          >
            <Sparkles className="w-4 h-4" /> COMING SOON
          </motion.span>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            <span className="v4-gradient-text">AuraShine CRM</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-9"
          >
            A powerful, all-in-one CRM built for growing businesses — manage leads, bookings,
            customers, billing and daily reports from one premium dashboard. We&rsquo;re putting the
            finishing touches on it. Join the waitlist to be the first to know when it launches.
          </motion.p>

          {/* notify (UI only) + back home */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <form className="flex w-full sm:w-auto flex-1 gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-light" aria-hidden="true" />
                <input type="email" aria-label="Email address for launch notification" placeholder="you@business.com" className="crmx-notify-input w-full rounded-full py-3.5 pl-11 pr-4 text-sm font-medium" />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap text-sm">Notify Me <ArrowRight className="w-4 h-4" /></button>
            </form>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-5">
            <a href="#/" className="crmx-btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
          </motion.div>
        </div>

        {/* ── dashboard preview mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          style={{ perspective: 1200 }}
          className="relative mt-16 sm:mt-20"
        >
          {/* floating feature chips */}
          <div className="crmx-chip-float hidden md:flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-white v4-blob" style={{ top: '-1.5rem', left: '4%', transform: `translate(${parallax.x * 10}px, ${parallax.y * 10}px)` }}>
            <CheckCircle className="w-4 h-4 text-primary-light" /> Lead pipeline
          </div>
          <div className="crmx-chip-float hidden md:flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-white v4-blob" style={{ top: '-1rem', right: '5%', animationDelay: '1.5s', transform: `translate(${parallax.x * -12}px, ${parallax.y * -12}px)` }}>
            <Zap className="w-4 h-4 text-primary-light" /> Automations
          </div>

          <div className="v4-gborder">
            <div className="crmx-dash rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-[64px_1fr]">
                {/* sidebar */}
                <div className="crmx-dash-side hidden sm:flex flex-col items-center gap-3 py-6">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-secondary font-black">A</div>
                  <div className="mt-3 flex flex-col gap-3">
                    {sideIcons.map((Ico, i) => (
                      <div key={i} className={`crmx-dash-ico ${i === 0 ? 'is-active' : ''}`}><Ico className="w-4 h-4" /></div>
                    ))}
                  </div>
                </div>

                {/* main */}
                <div className="p-5 sm:p-7">
                  {/* topbar */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-xs font-bold text-primary-light tracking-widest">DASHBOARD</p>
                      <h3 className="text-lg font-black text-white mt-0.5">Welcome back, AuraShine</h3>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 rounded-full px-3 py-2 text-xs text-gray-400" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
                      <Search className="w-3.5 h-3.5" /> Search leads, bookings…
                    </div>
                  </div>

                  {/* stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {stats.map((s) => (
                      <div key={s.label} className="crmx-stat p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/10 border border-primary/20 flex items-center justify-center">
                            <s.icon className="w-4 h-4 text-primary-light" />
                          </div>
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400/80" />
                        </div>
                        <p className="text-2xl font-black text-white leading-none"><CountUp to={s.to} suffix={s.suffix} /></p>
                        <p className="text-[11px] text-gray-400 mt-1.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
                    {/* chart */}
                    <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-bold text-white">Enquiries this week</p>
                        <span className="text-[11px] text-primary-light font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +24%</span>
                      </div>
                      <div className="flex items-end gap-2 sm:gap-3 h-28">
                        {bars.map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col justify-end h-full">
                            <div className={`crmx-bar ${i === 5 ? '' : i % 3 === 1 ? 'is-ghost' : ''}`} style={{ height: `${h}%`, animationDelay: `${0.6 + i * 0.07}s` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* recent leads */}
                    <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
                      <p className="text-sm font-bold text-white mb-3">Recent leads</p>
                      <div>
                        {leads.map((l, i) => (
                          <div key={l.n} className={`flex items-center gap-3 py-2.5 ${i ? 'crmx-row' : ''}`}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-secondary text-xs font-black">{l.n[0]}</div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-white truncate">{l.n}</p>
                              <p className="text-[11px] text-gray-400 truncate">{l.s}</p>
                            </div>
                            <span className="text-[11px] text-gray-500 flex items-center gap-1 whitespace-nowrap"><Clock className="w-3 h-3" />{l.t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── feature strip ── */}
        <div className="grid sm:grid-cols-3 gap-4 mt-14 max-w-5xl mx-auto">
          {[
            { icon: Database, t: 'Unified customer records', d: 'Every lead, booking and note in one searchable place.' },
            { icon: BarChart3, t: 'Reports that make sense', d: 'Clear dashboards owners can read in seconds.' },
            { icon: Zap, t: 'Workflow automation', d: 'Reminders, follow-ups and status updates on autopilot.' },
          ].map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="crmx-stat p-6"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-secondary mb-4 shadow-lg"><f.icon className="w-5 h-5" /></div>
              <h4 className="font-black text-white mb-1.5">{f.t}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CrmPage;
