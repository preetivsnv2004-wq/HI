/* eslint-disable no-unused-vars */
import { MarketingSoftwareScroll } from './components/ui/container-scroll-animation';
import PAGE_DATA from './pages';
import AboutRoute from './pages/about-route';
import ContactRoute from './pages/contact-route';
import BlogRoute from './pages/blog-route';
import BlogDetailRoute from './pages/blog-detail-route';
import DevelopmentPage from './pages/development-page';
import MarketingPage from './pages/marketing-page';
import SolutionsPage from './pages/solutions-page';
import DevServiceDetail from './pages/dev-detail';
import MarketingServiceDetail from './pages/marketing-detail';
import SolutionServiceDetail from './pages/solutions-detail';
import CrmPage from './pages/crm-page';
import BLOG_FAQ_ANSWERS from './blog-faq-answers';
import SEO_BLOG_DETAILS from './seo-blog-content';
import INDUSTRY_BLOG_DETAILS from './industry-blog-content';
import SOFTWARE_BLOG_DETAILS from './software-blog-content';
import MARKETING_BLOG_DETAILS from './marketing-blog-content';
import STRATEGY_BLOG_DETAILS from './strategy-blog-content';
import CONTENT_BLOG_DETAILS from './content-blog-content';
import SEO from './components/SEO';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  ChevronDown, Phone, MessageSquare, BarChart3, Shield, 
  FileText, Brain, Users, Zap, 
  ArrowRight, Play, Pause, Star, CheckCircle, Menu, X,
  Sparkles, TrendingUp, Heart, ShoppingCart, Mail, Layers,
  Globe, Database, Rocket, Target, Search, ArrowUp,
  Monitor, Smartphone, Megaphone, Cpu,
  Palette, Award, Instagram, Linkedin
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
// accordion component available if needed

const useMediaQuery = (query) => {
  const getInitialValue = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
};

const useLightMotion = () => {
  const shouldReduceMotion = useReducedMotion();
  const isCompactViewport = useMediaQuery('(max-width: 1023px)');
  return !shouldReduceMotion && !isCompactViewport;
};

/* Scroll reveals replay every time a section re-enters the viewport
   (viewport.once=false). Reduced-motion users get static content. */
const ScrollReveal = ({ children, delay = 0, direction }) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div>{children}</div>;
  const offset = direction === 'left' ? { x: 36 } : direction === 'right' ? { x: -36 } : { y: 28 };
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, staggerDelay = 0.08 }) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div>{children}</div>;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
};

// Theme-matched emoji for card stickers, picked from the card text.
const CARD_EMOJI_RULES = [
  [/whatsapp|chat|message/i, '💬'], [/e-?commerce|store|shop|cart/i, '🛒'], [/seo|search|rank|keyword/i, '🔍'],
  [/speed|fast|performance|optimi/i, '⚡'], [/design|ui|ux|wireframe|prototype/i, '🎨'], [/mobile|app|android|ios/i, '📱'],
  [/lead|enquir|form|pipeline/i, '🎯'], [/email|newsletter|nurture/i, '📧'], [/analytics|report|track|metric|insight/i, '📊'],
  [/secure|ssl|security|gdpr|backup/i, '🔒'], [/cloud|host|deploy|server/i, '☁️'], [/api|integrat|connect|sync/i, '🔗'],
  [/crm|customer|follow|retention/i, '🤝'], [/content|blog|copy|writing/i, '✍️'], [/social|instagram|reels/i, '📣'],
  [/ads|campaign|ppc|google|meta|roas/i, '📢'], [/launch|start|onboard/i, '🚀'], [/maintenance|health|support|update/i, '🛠️'],
  [/brand|trust|premium/i, '✨'], [/revenue|roi|budget|billing|price/i, '💰'], [/scal|grow|conversion/i, '📈'],
  [/discovery|audit|plan|strategy|roadmap/i, '🧭'], [/cms|landing|page|website|web/i, '🖥️'],
];
const getCardEmoji = (text) => {
  for (const [re, emoji] of CARD_EMOJI_RULES) { if (re.test(text)) return emoji; }
  return '⭐';
};

// Small emoji sticker: springs in, then floats forever. Purely decorative.
const FloatingEmoji = ({ emoji, className = '', delay = 0, size = 'w-9 h-9 text-lg' }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0, rotate: -24 }}
    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
    viewport={{ once: false, amount: 0.5 }}
    transition={{ type: 'spring', stiffness: 250, damping: 15, delay }}
    className={`pointer-events-none absolute z-10 ${className}`}
    aria-hidden="true"
  >
    <motion.span
      animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 2.8 + delay, repeat: Infinity, ease: 'easeInOut' }}
      className={`inline-flex items-center justify-center ${size} rounded-full bg-white shadow-lg shadow-secondary/10 border border-gray-100 leading-none`}
    >
      {emoji}
    </motion.span>
  </motion.span>
);

const AnimatedBackground = ({ dark = false }) => {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i, x: (i * 37) % 100, y: (i * 53) % 100, size: (i % 5) + 3,
    delay: (i % 6) * 0.35, duration: 10 + (i % 7),
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {!shouldReduceMotion && particles.map((p) => (
        <motion.div key={p.id} className={`absolute rounded-full ${dark ? 'bg-primary/20' : 'bg-primary/10'}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -100, 0], x: [0, 50, -30, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
      <div className={`absolute inset-0 ${dark ? 'dark-gradient-mesh' : 'gradient-mesh'}`} />
    </div>
  );
};

const Navbar = () => {
  const isBlogHeader = typeof window !== 'undefined' && window.location.hash.startsWith('#/blog');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const closeTimer = useRef(null);
  const fixedHeaderStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 'auto',
    width: '100%',
    zIndex: 2147483647,
    transform: 'none',
    opacity: 1,
    visibility: 'visible',
    pointerEvents: 'auto',
  };

  const slug = (value) => value.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const megaMenuData = {
    Development: {
      href: '#/development',
      featured: { title: 'Development Services', desc: 'Modern websites, apps, UI/UX, and e-commerce builds.', icon: Monitor, gradient: 'from-[#07152f] via-[#3b1d78] to-[#f5aa02]', metric: '01', sticker: 'BUILD LAB' },
      columns: [
        { heading: 'Development', items: [
          { label: 'Web Development', desc: 'Fast, scalable websites', icon: Monitor, href: 'web-development' },
          { label: 'App Development', desc: 'iOS & Android apps', icon: Smartphone, href: 'app-development' },
          { label: 'UI/UX Design', desc: 'Interfaces that convert', icon: Palette, href: 'uiux-design' },
          { label: 'E-commerce', desc: 'Sell more online', icon: ShoppingCart, href: 'e-commerce' },
        ]},
        { heading: 'Build Support', items: [
          { label: 'CRM Software', desc: 'Manage leads & customers', icon: Database, href: 'crm-software' },
          { label: 'Salon Software', desc: 'Salon booking & management', icon: Shield, href: 'salon-software' },
          { label: 'Business Automation', desc: 'Automate workflows', icon: Zap, href: 'business-automation' },
          { label: 'Custom Software', desc: 'Business tools & workflows', icon: Database, href: 'custom-software' },
        ]},
      ]
    },
    Marketing: {
      href: '#/marketing',
      featured: { title: 'Marketing Services', desc: 'SEO, paid ads, social media, content, and growth campaigns.', icon: Megaphone, gradient: 'from-[#321203] via-[#f5aa02] to-[#f5aa02]', metric: '02', sticker: 'GROWTH STUDIO' },
      columns: [
        { heading: 'Marketing', items: [
          { label: 'Digital Marketing', desc: 'Full-funnel campaigns', icon: Megaphone, href: 'digital-marketing' },
          { label: 'SEO Services', desc: 'Improve search visibility', icon: Search, href: 'seo-services' },
          { label: 'PPC & Paid Ads', desc: 'Max ROAS campaigns', icon: Target, href: 'ppc-paid-ads' },
          { label: 'Social Media', desc: 'Grow your audience', icon: Globe, href: 'social-media' },
        ]},
        { heading: 'Growth', items: [
          { label: 'Content Marketing', desc: 'Authority-building content', icon: FileText, href: 'content-marketing' },
          { label: 'Email Marketing', desc: 'Nurture & retain leads', icon: Mail, href: 'email-marketing' },
          { label: 'Lead Generation', desc: 'Fill your pipeline', icon: Target, href: 'lead-generation' },
          { label: 'Analytics & Reporting', desc: 'Track what works', icon: BarChart3, href: 'analytics-reporting' },
        ]},
      ]
    },
    Solutions: {
      href: '#/solutions',
      featured: { title: 'Industry-Specific Solutions', desc: 'Tailored strategies for your unique market.', icon: Award, gradient: 'from-[#07152f] via-[#0d2a55] to-[#f5aa02]', metric: '03', sticker: 'SOLUTIONS MAP' },
      columns: [
        { heading: 'By Industry', items: [
          { label: 'Startups', desc: 'Launch fast & lean', icon: Rocket, href: 'startups' },
          { label: 'E-commerce', desc: 'Scale online revenue', icon: ShoppingCart, href: 'solutions-e-commerce' },
          { label: 'Healthcare', desc: 'Attract more patients', icon: Heart, href: 'healthcare' },
          { label: 'Real Estate', desc: 'Generate quality leads', icon: Globe, href: 'real-estate' },
        ]},
        { heading: 'By Goal', items: [
          { label: 'Enterprise', desc: 'Enterprise-grade growth', icon: Shield, href: 'enterprise' },
          { label: 'Lead Generation', desc: 'Fill your pipeline', icon: Target, href: 'lead-generation' },
          { label: 'Brand Building', desc: 'Stand out & be remembered', icon: Sparkles, href: 'brand-building' },
          { label: 'Performance Marketing', desc: 'Data-driven ROI', icon: BarChart3, href: 'performance-marketing' },
        ]},
      ]
    }
  };

  const simpleNavItems = [
    { label: 'About', href: '#/about' },
    { label: 'CRM', href: '#/crm' },
    { label: 'AI', comingSoon: true },
    { label: 'Contact', href: '#/contact' },
    { label: 'Blog', href: '#/blog' },
  ];

  const handleMouseEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (megaMenuData[label]) setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.toggle('mobile-menu-open', mobileMenuOpen);
    body.classList.toggle('mobile-menu-open', mobileMenuOpen);
    if (!mobileMenuOpen) setActiveMobileDropdown(null);
    return () => {
      root.classList.remove('mobile-menu-open');
      body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const closeOnRouteChange = () => {
      setMobileMenuOpen(false);
      setActiveDropdown(null);
      setActiveMobileDropdown(null);
    };
    window.addEventListener('hashchange', closeOnRouteChange);
    return () => window.removeEventListener('hashchange', closeOnRouteChange);
  }, []);

  /* HDRX 2026-07-04: transparent/adaptive header — toggles glass state after scroll */
  useEffect(() => {
    const root = document.documentElement;
    let frame = null;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        root.classList.toggle('hdrx-scrolled', window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const setImportantStyle = (element, values) => {
      Object.entries(values).forEach(([property, value]) => {
        element.style.setProperty(property, value, 'important');
      });
    };
    const lockHeader = () => {
      const header = document.querySelector('.app-fixed-header');
      if (!header) return;
      const headerHeight = header.getBoundingClientRect().height || (window.innerWidth >= 1024 ? 80 : 64);

      setImportantStyle(header, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: 'auto',
        width: '100%',
        'max-width': 'none',
        'z-index': '2147483647',
        transform: 'none',
        translate: 'none',
        scale: 'none',
        rotate: 'none',
        opacity: '1',
        visibility: 'visible',
        'pointer-events': 'auto',
      });

      const panel = document.querySelector('.mobile-nav-panel');
      if (panel) {
        setImportantStyle(panel, {
          position: 'fixed',
          top: `${headerHeight}px`,
          right: '0',
          bottom: 'auto',
          left: '0',
          width: '100vw',
          height: `calc(100dvh - ${headerHeight}px)`,
          'max-height': `calc(100dvh - ${headerHeight}px)`,
          'z-index': '2147483646',
        });
      }
    };
    lockHeader();
    window.addEventListener('resize', lockHeader);
    window.addEventListener('orientationchange', lockHeader);
    return () => {
      window.removeEventListener('resize', lockHeader);
      window.removeEventListener('orientationchange', lockHeader);
    };
  }, [mobileMenuOpen]);

  const headerMarkup = (
    <header
      style={fixedHeaderStyle}
      className="app-fixed-header hdrx-header fixed top-0 left-0 right-0 z-[2147483647]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-20">
          <motion.a href="#/home" className="flex items-center" whileHover={{ scale: 1.03 }}>
            <img src="/assets/aurashine-logo.png" alt="Aura Shine Infotech — Best IT Company for Website Development, App Development, CRM & Digital Marketing" width="220" height="48" className="hdrx-logo h-10 lg:h-14 w-auto max-w-[180px] lg:max-w-[240px] object-contain" />
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {Object.keys(megaMenuData).map((label) => (
              <div key={label} className="relative" onMouseEnter={() => handleMouseEnter(label)} onMouseLeave={handleMouseLeave}>
                <button className={`hdrx-link flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors ${isBlogHeader ? 'rounded-none hover:bg-transparent' : 'rounded-lg hover:bg-primary/5'}`}>
                  {label}
                  <motion.span animate={{ rotate: activeDropdown === label ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeDropdown === label && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
                      onMouseLeave={handleMouseLeave}
                      className={`mega-menu-panel mega-menu-panel-${slug(label)} absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[580px] bg-white rounded-2xl shadow-2xl shadow-primary/10 border border-gray-100 overflow-hidden`}
                    >
                      {/* Featured banner links to the category page. */}
                      <a
                        href={megaMenuData[label].href}
                        onClick={() => setActiveDropdown(null)}
                        className={`bg-gradient-to-r ${megaMenuData[label].featured.gradient} p-5 flex items-center gap-4 hover:opacity-95 transition-opacity`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                          {React.createElement(megaMenuData[label].featured.icon, { className: "w-5 h-5 text-white" })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="text-white font-black text-sm tracking-wide">{megaMenuData[label].featured.title}</p>
                            <span className="mega-menu-sticker">{megaMenuData[label].featured.sticker}</span>
                          </div>
                          <p className="text-white/85 text-xs mt-0.5">{megaMenuData[label].featured.desc}</p>
                        </div>
                        <div className="mega-menu-orb" aria-hidden="true">{megaMenuData[label].featured.metric}</div>
                      </a>

                      {/* Columns */}
                      <div className="mega-menu-columns grid grid-cols-2 gap-0 p-4">
                        {megaMenuData[label].columns.map((col) => (
                          <div key={col.heading} className="p-2">
                            <p className="mega-menu-heading text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-2">{col.heading}</p>
                            <div className="space-y-1">
                              {col.items.map((item) => (
                                <motion.a
                                  key={item.label}
                                  href={`#/${item.href}`}
                                  whileHover={{ x: 4 }}
                                  onClick={() => setActiveDropdown(null)}
                                  className="mega-menu-link flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 group transition-colors"
                                >
                                  <div className="mega-menu-icon w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
                                    {React.createElement(item.icon, { className: "w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" })}
                                  </div>
                                  <div>
                                    <p className="mega-menu-title text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">{item.label}</p>
                                    <p className="mega-menu-desc text-xs text-gray-400">{item.desc}</p>
                                  </div>
                                </motion.a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer bar */}
                      <div className="mega-menu-footer border-t border-gray-100 px-6 py-3 bg-gray-50 flex items-center justify-between">
                        <p className="text-xs text-gray-500">Not sure where to start?</p>
                        <a href="#/contact?focus=message" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                          Get a free strategy call <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {simpleNavItems.map((item) => (
              item.comingSoon ? (
                <span key={item.label} aria-disabled="true" tabIndex={0} className="hdrx-link group relative inline-flex cursor-default items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg">
                  {item.label}
                  <small className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">Coming Soon</small>
                </span>
              ) : (
                <a key={item.label} href={item.href} className="hdrx-link px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
                  {item.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <motion.a href="#/contact?focus=message" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary text-sm">Get Started</motion.a>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="hdrx-link lg:hidden p-2 rounded-lg text-secondary hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-nav-panel lg:hidden bg-white border-t border-gray-100 shadow-2xl"
            >
              <div className="mobile-menu-inner">
                {Object.entries(megaMenuData).map(([label, data]) => (
                  <section key={label} className="mobile-menu-group">
                    <div className="mobile-menu-row flex items-center justify-between">
                      <a
                        href={data.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-semibold flex-1"
                      >
                        {label}
                      </a>
                      <button
                        type="button"
                        aria-expanded={activeMobileDropdown === label}
                        onClick={() => setActiveMobileDropdown(activeMobileDropdown === label ? null : label)}
                        className="p-1"
                      >
                        <motion.span animate={{ rotate: activeMobileDropdown === label ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {activeMobileDropdown === label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          className="mobile-submenu"
                        >
                          {data.columns.map((col) => (
                            <div key={col.heading} className="mobile-submenu-block">
                              <p>{col.heading}</p>
                              {col.items.map((item) => (
                                <a
                                  key={item.label}
                                  href={`#/${item.href}`}
                                  onClick={() => { setMobileMenuOpen(false); setActiveDropdown(null); setActiveMobileDropdown(null); }}
                                  className="mobile-menu-link"
                                >
                                  {React.createElement(item.icon, { className: "w-4 h-4" })}
                                  <span>{item.label}</span>
                                </a>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>
                ))}
                <div className="mobile-simple-links">
                  {simpleNavItems.map((item) => (
                    item.comingSoon ? (
                      <span key={item.label} aria-disabled="true">
                        {item.label}
                      </span>
                    ) : (
                      <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
                    )
                  ))}
                </div>
                <div className="mobile-menu-cta-wrap">
                  <a href="#/contact?focus=message" onClick={() => setMobileMenuOpen(false)} className="mobile-menu-cta">Get Started</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );

  return headerMarkup;
};

const LogoMarquee = () => {
  const shouldAnimate = useLightMotion();
  const logos = ['Website Development', 'Digital Marketing', 'SEO', 'Google Ads', 'Meta Ads', 'CRM Software', 'UI/UX Design', 'Brand Strategy'];
  const marqueeLogos = shouldAnimate ? [...logos, ...logos, ...logos, ...logos] : logos;
  return (
    <section className="logo-marquee-section py-16 bg-gray-50/50 relative overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider">
            Digital services for growing businesses in Mumbai and across India
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50/50 to-transparent z-10" />
          <div className="flex overflow-hidden">
            <motion.div animate={shouldAnimate ? { x: [0, -50 * logos.length * 2] } : undefined} transition={shouldAnimate ? { duration: 40, repeat: Infinity, ease: "linear" } : undefined}
              className="logo-marquee-track flex gap-10 items-center">
              {marqueeLogos.map((logo, i) => (
                <div key={i} className="logo-marquee-item flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-300 hover:text-primary transition-colors duration-300 cursor-default">{logo}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};


const ServiceMiniVisual = ({ service, progress }) => {
  const shouldAnimate = useLightMotion();
  const Icon = service.solutionIcon || service.icon;
  const visual = service.visual || 'growth';
  const detailRows = service.features?.slice(0, 4) || ['Plan', 'Build', 'Track', 'Improve'];

  if (visual === 'phone') {
    return (
      <div className="service-visual service-phone dedicated-device-visual">
        <motion.div className="phone-shell" animate={shouldAnimate ? { y: [0, -8, 0] } : undefined} transition={shouldAnimate ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } : undefined}>
          <div className={`phone-screen bg-gradient-to-br ${service.color}`}>
            <div className="phone-notch" />
            <Icon className="w-8 h-8 text-white mb-4" />
            <strong className="text-white text-sm mb-3">{service.solution}</strong>
            <div className="space-y-3 w-full">
              {['Onboarding', 'Dashboard', 'Launch flow'].map((item, i) => (
                <motion.div key={item} initial={{ x: 28, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.12 }} className="phone-row">
                  <span>{item}</span>
                  <CheckCircle className="w-4 h-4" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (visual === 'search') {
    return (
      <div className="service-visual dedicated-device-visual">
        <div className="laptop-frame seo-laptop">
          <div className="laptop-topbar"><span /><span /><span /></div>
          <motion.div className={`search-scan bg-gradient-to-r ${service.color}`} animate={shouldAnimate ? { x: ['-20%', '115%'] } : undefined} transition={shouldAnimate ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined} />
          <div className="search-bar"><Search className="w-4 h-4 text-primary" /> high intent keyword</div>
          {['Technical health', 'Local visibility', 'Content authority'].map((item, i) => (
            <motion.div key={item} className="rank-row" animate={shouldAnimate ? { x: [0, i % 2 ? -4 : 4, 0] } : undefined} transition={shouldAnimate ? { duration: 2.2, delay: i * 0.2, repeat: Infinity } : undefined}>
              <span className="rank-number">0{i + 1}</span>
              <span>{item}</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </motion.div>
          ))}
          <div className="laptop-base" />
        </div>
      </div>
    );
  }

  if (visual === 'ads') {
    return (
      <div className="service-visual dedicated-device-visual">
        <div className="laptop-frame ads-dashboard">
          <div className="laptop-topbar"><span /><span /><span /></div>
          <div className="ad-console-grid">
            {['Audience', 'Creative', 'Budget', 'Leads'].map((item, i) => (
              <motion.div key={item} className="ad-console-card" animate={shouldAnimate ? { y: [0, -5, 0] } : undefined} transition={shouldAnimate ? { duration: 2.5, delay: i * 0.2, repeat: Infinity } : undefined}>
                <Target className="w-4 h-4 text-primary" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.div className={`ad-performance-line bg-gradient-to-r ${service.color}`} animate={shouldAnimate ? { width: ['35%', '88%', '55%'] } : undefined} transition={shouldAnimate ? { duration: 2.8, repeat: Infinity } : undefined} style={shouldAnimate ? undefined : { width: '70%' }} />
          <div className="laptop-base" />
        </div>
      </div>
    );
  }

  if (visual === 'web') {
    return (
      <div className="service-visual dedicated-device-visual">
        <div className="laptop-frame website-laptop">
          <div className="laptop-topbar"><span /><span /><span /></div>
          <div className={`website-hero-strip bg-gradient-to-r ${service.color}`}>
            <Monitor className="w-5 h-5 text-white" />
            <strong>{service.solution}</strong>
          </div>
          <div className="website-layout-grid">
            {['Hero section', 'Service blocks', 'Lead form', 'Trust proof'].map((item, i) => (
              <motion.div key={item} className="website-wire-card" animate={shouldAnimate ? { opacity: [0.75, 1, 0.75] } : undefined} transition={shouldAnimate ? { duration: 2.3, delay: i * 0.15, repeat: Infinity } : undefined}>
                <span className="wire-dot" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
          <div className="wire-lines"><i /><i /><i /></div>
          <div className="laptop-base" />
        </div>
      </div>
    );
  }

  if (visual === 'email') {
    return (
      <div className="service-visual dedicated-device-visual">
        <div className="laptop-frame email-flow">
          <div className="laptop-topbar"><span /><span /><span /></div>
          {['Welcome', 'Follow-up', 'Offer', 'Retain'].map((item, i) => (
            <motion.div key={item} className="email-step" animate={shouldAnimate ? { x: [0, i % 2 ? -4 : 4, 0] } : undefined} transition={shouldAnimate ? { duration: 2.2, delay: i * 0.2, repeat: Infinity } : undefined}>
              <Mail className="w-4 h-4 text-primary" />
              <span>{item}</span>
            </motion.div>
          ))}
          <div className="laptop-base" />
        </div>
      </div>
    );
  }

  if (visual === 'software') {
    return (
      <div className="service-visual dedicated-device-visual">
        <div className="laptop-frame design-board">
          <div className="laptop-topbar"><span /><span /><span /></div>
          {[
            { label: 'CRM', icon: Database },
            { label: 'Analytics', icon: BarChart3 },
            { label: 'Workflow', icon: Zap },
            { label: 'Automation', icon: Cpu },
          ].map((item, i) => {
            const TileIcon = item.icon;
            return (
            <motion.div key={item.label} className={`design-tile tile-${i}`} whileHover={{ y: -4 }} animate={shouldAnimate ? { opacity: [0.78, 1, 0.78] } : undefined} transition={shouldAnimate ? { duration: 2.2, delay: i * 0.2, repeat: Infinity } : undefined}>
              <TileIcon className="w-4 h-4 text-primary" />
              <span>{item.label}</span>
            </motion.div>
            );
          })}
          <div className="laptop-base" />
        </div>
      </div>
    );
  }

  if (visual === 'design') {
    return (
      <div className="service-visual dedicated-device-visual">
        <div className="laptop-frame design-board">
          <div className="laptop-topbar"><span /><span /><span /></div>
          {['Hero', 'Flow', 'CTA', 'System'].map((item, i) => (
            <motion.div key={item} className={`design-tile tile-${i}`} whileHover={{ y: -4 }} animate={shouldAnimate ? { opacity: [0.78, 1, 0.78] } : undefined} transition={shouldAnimate ? { duration: 2.2, delay: i * 0.2, repeat: Infinity } : undefined}>
              <Palette className="w-4 h-4 text-primary" />
              <span>{item}</span>
            </motion.div>
          ))}
          <div className="laptop-base" />
        </div>
      </div>
    );
  }

  if (visual === 'analytics') {
    return (
      <div className="service-visual dedicated-device-visual">
        <div className="laptop-frame analytics-panel">
          <div className="laptop-topbar"><span /><span /><span /></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-secondary">Live dashboard</span>
            <span className="text-xs font-black text-primary">{progress}%</span>
          </div>
          {[74, 92, 58, 86].map((width, i) => (
            <div className="metric-row" key={width}>
              <span />
              <motion.b className={`bg-gradient-to-r ${service.color}`} initial={{ width: '20%' }} animate={shouldAnimate ? { width: `${width}%` } : undefined} transition={shouldAnimate ? { duration: 1.7, delay: i * 0.15, repeat: Infinity, repeatType: 'reverse' } : undefined} style={shouldAnimate ? undefined : { width: `${width}%` }} />
            </div>
          ))}
          <div className="laptop-base" />
        </div>
      </div>
    );
  }

  return (
    <div className="service-visual dedicated-device-visual">
      <div className="laptop-frame website-laptop">
        <div className="laptop-topbar"><span /><span /><span /></div>
        <div className={`website-hero-strip bg-gradient-to-r ${service.color}`}>
          <Icon className="w-5 h-5 text-white" />
          <strong>{service.solution}</strong>
        </div>
        <div className="website-layout-grid">
          {detailRows.map((item, i) => (
            <motion.div key={item} className="website-wire-card" animate={shouldAnimate ? { opacity: [0.75, 1, 0.75] } : undefined} transition={shouldAnimate ? { duration: 2.3, delay: i * 0.15, repeat: Infinity } : undefined}>
              <span className="wire-dot" />
              <span>{item}</span>
            </motion.div>
        ))}
        </div>
        <div className="laptop-base" />
      </div>
    </div>
  );
};

const ServiceCard = ({ service, isActive, progress }) => {
  return (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, x: 55, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -35, scale: 0.96, filter: "blur(8px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] bg-white p-4 sm:p-8 shadow-2xl shadow-primary/15 border border-gray-100 h-full"
    >
      <div className={`absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gradient-to-br ${service.color} opacity-20 blur-3xl`} />
      <div className={`absolute -left-24 bottom-0 w-60 h-60 rounded-full bg-gradient-to-br ${service.color} opacity-10 blur-3xl`} />

      <div className="relative">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${service.color} text-white text-[10px] sm:text-xs font-bold uppercase mb-3 sm:mb-4 shadow-lg`}>
          <Sparkles className="w-3 h-3" /> {service.solutionSubtitle}
        </div>

        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1">
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-secondary mb-1 sm:mb-2 leading-tight">{service.solution}</h3>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-base lg:text-lg">{service.description}</p>
          </div>
          <div className={`flex-shrink-0 w-11 h-11 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.color} items-center justify-center shadow-xl flex`}>
            {React.createElement(service.solutionIcon || service.icon, { className: "w-6 h-6 sm:w-8 sm:h-8 text-white" })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-5">
          {service.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-2.5 py-2 sm:px-4 sm:py-3"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span className="text-gray-700 text-[11px] sm:text-sm font-medium leading-tight">{feature}</span>
            </motion.div>
          ))}
        </div>

        <ServiceMiniVisual service={service} progress={progress} />

        <a href={`#/${service.href || service.solution.toLowerCase().replace(/[&]/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`} className="mt-3 sm:mt-5 inline-flex items-center gap-2 text-primary font-bold text-sm sm:text-base hover:underline">
          Learn more about {service.solution} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

const MobileServicesSection = ({ services, activeService, setActiveService }) => {
  const trackRef = useRef(null);
  const rafRef = useRef(null);

  // Keep the active dot in sync with the snapped card (nearest slide to centre).
  const syncActiveFromScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const viewCenter = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - viewCenter);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    setActiveService((current) => (current === best ? current : best));
  };

  const handleTrackScroll = () => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      syncActiveFromScroll();
    });
  };

  // Dot taps scroll the matching card to centre (CSS scroll-behavior handles the smoothing).
  const scrollToIndex = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[idx];
    if (!slide) return;
    const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left, behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden py-8">
      <div className="px-4">
        {/* Section heading */}
        <div className="text-center mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
            <Sparkles className="w-3 h-3" /> OUR SERVICES
          </span>
          <h2 className="text-2xl font-bold text-secondary leading-tight">
            Solutions for every <span className="gradient-text">digital challenge.</span>
          </h2>
        </div>

        {/* Progress dots + counter */}
        <div className="flex items-center justify-between px-1 mb-3">
          <div className="flex gap-1.5">
            {services.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to service ${idx + 1}`}
                onClick={() => scrollToIndex(idx)}
                className="h-1.5 rounded-full bg-primary transition-all duration-300"
                style={{ width: activeService === idx ? 20 : 6, opacity: activeService === idx ? 1 : 0.35 }}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-primary">
            {activeService + 1} / {services.length}
          </span>
        </div>
      </div>

      {/* Horizontal scroll-snap carousel — exactly one card per swipe */}
      <div
        ref={trackRef}
        onScroll={handleTrackScroll}
        className="mobsvc-track px-4"
        role="group"
        aria-roledescription="carousel"
      >
        {services.map((service, idx) => {
          const slideProgress = Math.round(((idx + 1) / services.length) * 100);
          return (
            <div
              key={service.solution}
              className="mobsvc-slide"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${services.length}`}
            >
              {/* Problem card */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-white p-4 shadow-xl shadow-primary/15 mb-2">
                <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${service.color}`} />
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 flex-shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-primary truncate">{service.title}</h3>
                    <p className="text-gray-700 font-medium text-sm mt-0.5 leading-snug">{service.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white flex-shrink-0">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Solution card */}
              <ServiceCard service={service} isActive={activeService === idx} progress={slideProgress} />
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3 px-4">
        ← Swipe to explore all services →
      </p>
    </div>
  );
};

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    { 
      icon: Monitor, 
      title: 'OUTDATED WEBSITE',
      subtitle: 'Visitors leave when the site feels slow, unclear, or old.',
      solution: 'Web Development',
      href: 'web-development',
      solutionSubtitle: 'Fast conversion pages',
      description: 'Build responsive websites, landing pages, e-commerce flows, and business pages that are fast, readable, and enquiry-ready.',
      features: ['React websites', 'Landing pages', 'E-commerce', 'Maintenance'],
      color: 'from-primary to-primary-light',
      visual: 'web'
    },
    { 
      icon: Search, 
      solutionIcon: Megaphone,
      title: 'NO CONSISTENT LEAD FLOW',
      subtitle: "Your business isn't generating predictable, high-quality enquiries.",
      solution: 'Digital Marketing',
      href: 'digital-marketing',
      solutionSubtitle: 'Business growth strategy',
      description: 'Build a scalable digital marketing system that attracts the right audience, generates qualified leads, increases brand visibility, and converts visitors into long-term customers through data-driven strategies.',
      features: ['Social Media Management', 'PPC & Paid Advertising', 'SEO & GEO Optimization', 'Content Marketing', 'Email Marketing & Copywriting', 'Analytics & Performance Tracking'],
      color: 'from-primary to-primary-light',
      visual: 'growth'
    },
    { 
      icon: Smartphone, 
      title: 'NO MOBILE PRODUCT',
      subtitle: 'Your audience needs a smoother app-like experience.',
      solution: 'App Development',
      href: 'app-development',
      solutionSubtitle: 'Mobile app experience',
      description: 'Design and build iOS, Android, and cross-platform apps with simple onboarding, useful flows, analytics, and launch support.',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App launch'],
      color: 'from-primary to-primary',
      visual: 'phone'
    },
    { 
      icon: Database, 
      title: 'MANUAL PROCESSES',
      subtitle: 'Spreadsheets and disconnected tools cause delays, errors, duplicate work, and poor business visibility.',
      solution: 'Software Solutions',
      href: 'custom-software',
      solutionSubtitle: 'Software that automates business',
      description: 'Build custom software that automates operations, centralizes data, streamlines workflows, and helps your business scale faster with complete visibility.',
      features: ['Custom Web Applications', 'Business Dashboards', 'CRM Solutions', 'API Integrations', 'Workflow Automation', 'Cloud-Based Solutions'],
      color: 'from-primary to-primary',
      visual: 'software'
    },
    { 
      icon: BarChart3, 
      title: 'NO PERFORMANCE CLARITY',
      subtitle: 'Decisions become guesses when tracking is missing.',
      solution: 'Analytics & Reporting',
      href: 'analytics-reporting',
      solutionSubtitle: 'Clear growth dashboards',
      description: 'Track leads, calls, WhatsApp clicks, campaigns, landing pages, and conversion paths in simple reports your team can use.',
      features: ['GA4 setup', 'Dashboards', 'Lead tracking', 'Monthly insights'],
      color: 'from-primary to-primary',
      visual: 'analytics'
    },
  ];

  // Desktop scroll behavior only (lg = 1024px+)
  useEffect(() => {
    let frame = null;
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        const el = document.getElementById('services-desktop-wrapper');
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        const prog = Math.min(0.999, Math.max(0, -rect.top / scrollable));
        const nextIndex = Math.floor(prog * services.length);
        setActiveService((current) => {
          const bounded = Math.min(services.length - 1, Math.max(0, nextIndex));
          return current === bounded ? current : bounded;
        });
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [services.length]);

  const active = services[activeService];
  const progress = Math.round(((activeService + 1) / services.length) * 100);

  return (
    <section id="services-scroll-section" className="relative overflow-visible bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(245,170,2,0.08),transparent_30%),radial-gradient(circle_at_85%_55%,rgba(36,36,36,0.08),transparent_30%)] pointer-events-none" />

      {/* Mobile Layout — handles its own height internally */}
      <div className="lg:hidden">
        <MobileServicesSection services={services} activeService={activeService} setActiveService={setActiveService} />
      </div>

      {/* Desktop Layout — tall section for scroll-driven sticky */}
      <div id="services-desktop-wrapper" className="hidden lg:block" style={{ minHeight: `${services.length * 130}vh` }}>
        <div className="sticky top-0 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <ScrollReveal>
            <div className="text-center mb-8 lg:mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" /> OUR SERVICES
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-4">
                Solutions for every <span className="gradient-text">digital challenge.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 text-base lg:text-lg">
                From invisible to unstoppable. Our digital marketing and development services
                tackle your biggest growth challenges and turn them into competitive advantages.
              </p>
            </div>
          </ScrollReveal>

        {/* Desktop Layout */}
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <div className="space-y-4 services-problem-list">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isActive = activeService === idx;
              return (
                <motion.div
                  key={service.title}
                  layout
                  onClick={() => setActiveService(idx)}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className={`relative overflow-hidden cursor-pointer rounded-2xl border bg-white p-5 transition-all duration-500 ${
                    isActive
                      ? 'border-primary shadow-2xl shadow-primary/20'
                      : 'border-gray-200/70 shadow-sm hover:border-primary/40 hover:shadow-lg'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceBorder"
                      className="absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none"
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    />
                  )}

                  {isActive && (
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 2.5, ease: "linear" }}
                      className={`absolute left-0 top-0 h-1 bg-gradient-to-r ${service.color}`}
                      style={{ width: "100%" }}
                    />
                  )}

                  <div className="relative flex items-center gap-4">
                    <motion.div
                      animate={{ scale: isActive ? 1.08 : 1, rotate: isActive ? 0 : -4 }}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-primary/10' : 'bg-gray-100'}`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className={`font-bold text-sm uppercase tracking-wider ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                        {service.title}
                      </h3>
                      <p className="text-gray-700 font-medium mt-1">{service.subtitle}</p>
                    </div>

                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0, x: isActive ? 3 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div key={activeService}>
                <ServiceCard service={active} isActive={true} progress={progress} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </div>{/* end desktop inner */}
      </div>{/* end desktop block */}
    </section>
  );
};

const ResultsSection = () => {
  const stats = [
    { title: 'Retention Growth Planner', description: 'Organizes customer follow-up plans, retention messages, and win-back journeys for repeat business.', stat: '-30%', statLabel: 'Churn reduction', icon: Users, color: 'from-primary to-primary-light', mock: 'retention' },
    { title: 'Campaign Performance Planner', description: 'Helps plan bids, budgets, and targeting improvements to improve enquiry quality across campaign platforms.', stat: 'ROAS', statLabel: 'Tracking-ready campaigns', icon: Target, color: 'from-primary-dark to-primary', mock: 'ads' },
    { title: 'Content Growth Engine', description: 'Generates SEO-optimized blog posts, social content, and ad copy at scale — saving 20+ hours/week.', stat: '10x', statLabel: 'Content output', icon: FileText, color: 'from-primary to-primary', mock: 'content' },
  ];

  return (
    <section className="py-16 bg-dark relative overflow-hidden">
      <AnimatedBackground dark />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-light text-sm font-medium mb-4">
              <Brain className="w-4 h-4" /> PERFORMANCE-FOCUSED RESULTS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              From guessing to <span className="gradient-text">growing.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              Our data-driven systems do not just react — they predict, optimize, and execute
              marketing strategies that deliver measurable results 24/7.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.15}>
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {stats.map((stat, idx) => (
              <StaggerItem key={idx} direction="up">
                <motion.div whileHover={{ y: -10 }}
                  className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                      className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.stat}
                    </motion.div>
                  </div>

                  <p className="text-xs text-gray-400 mb-2">{stat.statLabel}</p>
                  <h3 className="text-xl font-bold text-white mb-3">{stat.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{stat.description}</p>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    {stat.mock === 'retention' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">AC</div>
                            <div>
                              <p className="text-white text-sm">Acme Corp</p>
                              <p className="text-red-400 text-xs">At Risk</p>
                            </div>
                          </div>
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="w-[82%] h-full bg-gradient-to-r from-primary to-primary-dark rounded-full" />
                          </div>
                        </div>
                        <div className="bg-green-500/10 rounded-lg p-2 border border-green-500/20">
                          <p className="text-green-400 text-xs flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Win-back email sent automatically
                          </p>
                        </div>
                      </div>
                    )}
                    {stat.mock === 'ads' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Google Ads</span>
                          <span className="text-green-400">ROAS tracked</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Meta Ads</span>
                          <span className="text-green-400">ROAS 4.1x</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
                          <motion.div animate={{ width: ['60%', '90%', '60%'] }} transition={{ duration: 3, repeat: Infinity }}
                            className="h-full bg-gradient-to-r from-primary-dark to-primary rounded-full" />
                        </div>
                        <p className="text-xs text-primary-light mt-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Auto-optimizing bids in real-time
                        </p>
                      </div>
                    )}
                    {stat.mock === 'content' && (
                      <div className="space-y-2">
                        {[
                          { title: 'SEO Blog Post', status: 'Published', color: 'text-green-400' },
                          { title: 'Social Media Carousel', status: 'Scheduled', color: 'text-primary' },
                          { title: 'Ad Copy Variants', status: 'Generated', color: 'text-blue-400' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{item.title}</span>
                            <span className={item.color}>{item.status}</span>
                          </div>
                        ))}
                        <p className="text-xs text-primary-light mt-2 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> 47 articles this month
                        </p>
                      </div>
                    )}
                  </div>

                  <motion.button whileHover={{ x: 5 }} className="mt-4 flex items-center gap-2 text-primary-light text-sm font-medium">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const enableMotion = useLightMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [spotlightX, setSpotlightX] = useState(50);

  const dragRef = useRef({ startX: 0, moved: false, didChange: false });
  const autoTimerRef = useRef(null);
  const userStoppedRef = useRef(false);

  const steps = [
    { title: 'Discovery & Audit', description: 'We analyze your current digital presence, competitors, and market opportunities to build a winning strategy.', icon: Search, color: 'text-blue-400', iconBg: 'rgba(59,130,246,0.15)' },
    { title: 'Strategy & Planning', description: 'Custom roadmap with clear KPIs, timelines, and budgets tailored to your business goals.', icon: Target, color: 'text-primary', iconBg: 'rgba(245,170,2,0.15)' },
    { title: 'Execution & Launch', description: 'Our team implements campaigns, builds your website, or develops your app with precision and speed.', icon: Rocket, color: 'text-primary', iconBg: 'rgba(234,179,8,0.15)' },
    { title: 'Optimize & Scale', description: 'Continuous monitoring, A/B testing, and data-backed optimizations to maximize your ROI.', icon: TrendingUp, color: 'text-primary', iconBg: 'rgba(245,170,2,0.15)' },
  ];

  const total = steps.length;

  const goNext = useCallback(() => setActiveIdx((p) => (p + 1) % total), [total]);
  const goPrev = useCallback(() => setActiveIdx((p) => (p - 1 + total) % total), [total]);
  const goTo = useCallback((idx) => setActiveIdx(((idx % total) + total) % total), [total]);

  const stopAuto = () => {
    userStoppedRef.current = true;
    clearInterval(autoTimerRef.current);
  };

  /* auto-rotate every 3s */
  useEffect(() => {
    if (!enableMotion) return;
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setActiveIdx((p) => (p + 1) % total);
    }, 3000);
    return () => clearInterval(autoTimerRef.current);
  }, [enableMotion, total]);

  /* keyboard */
  useEffect(() => {
    const handler = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); stopAuto(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stopAuto(); goPrev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  /* wheel — only horizontal changes slides, vertical scrolls page */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
      if (!inView) return;
      if (Math.abs(e.deltaX) > 20 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5) {
        e.preventDefault();
        stopAuto();
        if (e.deltaX > 0) goNext(); else goPrev();
      }
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [goNext, goPrev]);

  /* drag / swipe — robust touch + pointer support, one slide per gesture */
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, moved: false, didChange: false };
    stopAuto();
  };

  const onPointerMove = (e) => {
    if (!isDragging || dragRef.current.didChange) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    // Keep normal vertical page scrolling; only treat a clearly horizontal gesture as a swipe.
    if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 12) return;
    dragRef.current.moved = true;

    if (Math.abs(dx) >= 44) {
      dragRef.current.didChange = true;
      if (dx > 0) goPrev(); else goNext();
    }
  };

  const onPointerUp = (e) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setIsDragging(false);
  };

  const handleUserInteract = (idx) => {
    stopAuto();
    goTo(idx);
  };

  /* spotlight position */
  useEffect(() => {
    if (isMobile) {
      setSpotlightX(50);
    } else {
      const offset = (activeIdx - (total - 1) / 2);
      setSpotlightX(50 + offset * 18);
    }
  }, [activeIdx, isMobile, total]);

  const reducedMotion = useReducedMotion();

  const getCardStyle = (idx) => {
    const diff = idx - activeIdx;
    const absDiff = Math.abs(diff);
    const isCenter = diff === 0;

    let translateX, translateZ, rotateY, scale, opacity, filter, zIndex;

    if (isMobile) {
      if (isCenter) {
        translateX = '0%'; translateZ = '60px'; rotateY = '0deg';
        scale = 1; opacity = 1; filter = 'blur(0px)'; zIndex = 10;
      } else if (absDiff === 1) {
        translateX = diff > 0 ? '85%' : '-85%';
        translateZ = '0px'; rotateY = '0deg';
        scale = 0.78; opacity = 0.45; filter = 'blur(2px)'; zIndex = 5;
      } else {
        translateX = diff > 0 ? '120%' : '-120%';
        translateZ = '-40px'; rotateY = '0deg';
        scale = 0.6; opacity = 0; filter = 'blur(6px)'; zIndex = 1;
      }
    } else if (isCenter) {
      translateX = '0%'; translateZ = '80px'; rotateY = '0deg';
      scale = 1; opacity = 1; filter = 'blur(0px)'; zIndex = 10;
    } else if (absDiff === 1) {
      translateX = diff > 0 ? '65%' : '-65%';
      translateZ = '10px'; rotateY = diff > 0 ? '-16deg' : '16deg';
      scale = 0.85; opacity = 0.75; filter = 'blur(0.5px)'; zIndex = 7;
    } else {
      translateX = diff > 0 ? '100%' : '-100%';
      translateZ = '-30px'; rotateY = diff > 0 ? '-28deg' : '28deg';
      scale = 0.7; opacity = 0.3; filter = 'blur(2px)'; zIndex = 3;
    }

    return {
      transform: `translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale})`,
      opacity,
      filter,
      zIndex,
    };
  };

  return (
    <motion.section
      ref={sectionRef}
      className="psp-section py-14 sm:py-16 lg:py-20 bg-dark relative"
      initial={reducedMotion ? undefined : { opacity: 0, y: 40, filter: 'blur(6px)' }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="psp-cinematic-bg" />
      {enableMotion && <div className="psp-beam" />}

      <div className="psp-spotlight" style={{
        left: `${spotlightX}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: isDragging ? 0.3 : 0.6,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">How we </span>
          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text">deliver results.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-gray-400 text-lg text-center mb-4 sm:mb-6"
        >
          A proven 4-step process that takes you from where you are to where you want to be —
          faster and smarter than anyone else.
        </motion.p>

          <div
            className="psp-carousel-wrap"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className="psp-carousel-viewport">
              <div className="psp-carousel-track" ref={carouselRef}>
                {steps.map((step, idx) => {
                  const diff = idx - activeIdx;
                  const isActive = diff === 0;
                  return (
                    <div
                      key={idx}
                      className={`psp-card-wrapper ${isActive ? 'is-active' : ''}`}
                      style={getCardStyle(idx)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserInteract(idx);
                      }}
                    >
                      <div className="psp-card" style={{ animationDelay: `${idx * 0.6}s` }}>
                        <div className="psp-card-glow" />
                        <div className="psp-card-head">
                          <div className="psp-card-icon" style={{ background: step.iconBg }}>
                            <step.icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                          </div>
                          <span className="psp-card-num">0{idx + 1}</span>
                        </div>
                        <h3 className="psp-card-title" style={{ color: isActive ? '#f5aa02' : '#fff' }}>{step.title}</h3>
                        <p className="psp-card-desc">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="psp-nav-dots">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  className={`psp-dot ${idx === activeIdx ? 'is-active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleUserInteract(idx); }}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
    </motion.section>
  );
};


const IndustriesSection = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [readyVideos, setReadyVideos] = useState({ 0: false });
  const isMobileIndustry = useMediaQuery('(max-width: 768px)');
  const activeVideoRef = useRef(null);

  const industries = [
    { 
      name: 'Business', 
      tagline: 'Build trust. Capture enquiries. Grow faster.',
      video: '/assets/industry-uploaded/business-growth.mp4',
      poster: '/assets/industry-uploaded/business-growth.jpg',
      cards: [
        { title: 'Business Website', desc: 'Premium pages that explain services clearly', icon: Monitor, href: 'web-development' },
        { title: 'Lead Capture', desc: 'Forms, WhatsApp CTAs, and enquiry funnels', icon: Target, href: 'lead-generation' },
        { title: 'CRM Follow-up', desc: 'Track every lead and automate next actions', icon: Database, href: 'crm-software' },
      ]
    },
    { 
      name: 'Gym', 
      tagline: 'Convert leads. Fill classes. Retain members.',
      video: '/assets/industry-uploaded/untitled-design.mp4',
      poster: '/assets/industry-uploaded/untitled-design.jpg',
      cards: [
        { title: 'Lead Ads', desc: 'Trial passes and PT enquiries on autopilot', icon: Target, href: 'ppc-paid-ads' },
        { title: 'Retention Flow', desc: 'Member renewal and follow-up automation', icon: Mail, href: 'email-marketing' },
        { title: 'Local SEO', desc: 'Rank for gym, fitness, and trainer searches', icon: Search, href: 'seo-services' },
        { title: 'Instagram Growth', desc: 'Gym reels and client transformation content', icon: Megaphone, href: 'social-media' },
      ]
    },
    { 
      name: 'Salon', 
      tagline: 'Maximize bookings. Improve repeat visits.',
      video: '/assets/industry-uploaded/0619-1.mp4',
      poster: '/assets/industry-uploaded/0619-1.jpg',
      cards: [
        { title: 'Booking System', desc: 'Online appointments and WhatsApp prompts', icon: Smartphone, href: 'salon-software' },
        { title: 'Instagram Growth', desc: 'Reels, offers, and client proof content', icon: Megaphone, href: 'social-media' },
        { title: 'Repeat Visits', desc: 'Reminder flows for regular customers', icon: Mail, href: 'email-marketing' },
      ]
    },
    { 
      name: 'Healthcare', 
      tagline: 'Attract patients. Build trust. Grow practice.',
      video: '/assets/industry-uploaded/0619-1-1.mp4',
      poster: '/assets/industry-uploaded/0619-1-1.jpg',
      cards: [
        { title: 'Local SEO', desc: 'Google Maps and specialty search visibility', icon: Search, href: 'seo-services' },
        { title: 'Trust Website', desc: 'Patient-friendly pages and appointment CTAs', icon: Monitor, href: 'web-development' },
        { title: 'Reputation', desc: 'Review growth and credibility systems', icon: Star, href: 'brand-building' },
      ]
    },
    { 
      name: 'Real Estate', 
      tagline: 'Generate leads. Book visits. Close deals.',
      video: '/assets/industry-uploaded/0619-2.mp4',
      poster: '/assets/industry-uploaded/0619-2.jpg',
      cards: [
        { title: 'Property Leads', desc: 'Qualified buyer and rental enquiries', icon: Target, href: 'lead-generation' },
        { title: 'Listing Pages', desc: 'Project pages built to convert visits', icon: Globe, href: 'web-development' },
        { title: 'CRM Follow-up', desc: 'Automated nurture for site visits', icon: Database, href: 'crm-software' },
      ]
    },
  ];

  const industrySectionRef = useRef(null);

  useEffect(() => {
    let frame = null;
    const updateFromScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        const section = industrySectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.min(0.999, Math.max(0, -rect.top / scrollable));
        const nextIndex = Math.min(industries.length - 1, Math.max(0, Math.floor(progress * industries.length)));
        setActiveIndustry((current) => current === nextIndex ? current : nextIndex);
      });
    };
    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);
    return () => {
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [industries.length]);

  const active = industries[activeIndustry];

  useEffect(() => {
    if (isMobileIndustry) return undefined;

    const video = activeVideoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.disablePictureInPicture = true;
    video.preload = 'auto';

    if (video.readyState < 2) video.load();

    const playVideo = () => video.play().catch(() => undefined);
    const syncPlayback = () => {
      if (document.visibilityState === 'visible') {
        window.requestAnimationFrame(playVideo);
      } else {
        video.pause();
      }
    };

    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [activeIndustry, isMobileIndustry]);

  return (
    <section
      ref={industrySectionRef}
      id="industry-scroll-story"
      className="relative bg-dark industry-story scroll-controlled-industry"
      style={{ minHeight: isMobileIndustry ? `${industries.length * 92}svh` : `${industries.length * 96}svh` }}
    >
      <div className="sticky top-0 min-h-screen overflow-hidden flex items-center pt-24 pb-6 lg:py-16 industry-sticky">
        <div className="absolute inset-0 overflow-hidden bg-black">
          <motion.img
            key={active.poster}
            animate={{ opacity: isMobileIndustry || !readyVideos[activeIndustry] ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover industry-video-poster"
            src={active.poster}
            alt=""
            aria-hidden="true"
            loading={activeIndustry === 0 ? 'eager' : 'lazy'}
            fetchpriority={activeIndustry === 0 ? 'high' : 'auto'}
            decoding="async"
          />
          {!isMobileIndustry && (
            <motion.video
              key={active.video}
              ref={activeVideoRef}
              animate={{ opacity: readyVideos[activeIndustry] ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover industry-video"
              src={active.video}
              poster={active.poster}
              aria-hidden="true"
              data-active="true"
              data-ready={readyVideos[activeIndustry] ? 'true' : 'false'}
              onCanPlay={() => setReadyVideos((current) => current[activeIndustry] ? current : { ...current, [activeIndustry]: true })}
              onLoadedData={() => setReadyVideos((current) => current[activeIndustry] ? current : { ...current, [activeIndustry]: true })}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          )}
        </div>

        <div className="industry-video-soft-overlay absolute inset-0 bg-black/10" />
        <div className="industry-video-side-overlay absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-black/12" />
        <div className="industry-video-bottom-overlay absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/24" />
        <div className="industry-video-glow absolute -left-40 top-0 w-[42rem] h-[42rem] bg-primary/5 rounded-full blur-3xl" />
        <div className="industry-video-glow absolute -right-40 bottom-0 w-[42rem] h-[42rem] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="premium-hero-eyebrow"
              >
                <Sparkles className="w-4 h-4" /> Premium Website • Growth Marketing • CRM Automation
              </motion.div>
              <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 max-w-2xl industry-intro">
                Strategy, creative, websites, and automation adapted for each business category.
              </p>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white drop-shadow-xl max-w-6xl leading-tight industry-title">
                Fine-tuned digital growth for your{' '}
                <motion.span
                  key={active.name}
                  initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-primary inline-block"
                >
                  {active.name}.
                </motion.span>
              </h2>
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.tagline}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base sm:text-2xl text-white font-bold mt-5 sm:mt-8 mb-4 sm:mb-6 drop-shadow-lg"
                >
                  {active.tagline}
                </motion.p>
              </AnimatePresence>

              <div className="grid grid-flow-col auto-cols-[minmax(180px,1fr)] sm:grid-flow-row sm:grid-cols-3 gap-3 sm:gap-4 max-w-5xl overflow-x-auto pb-2">
                {active.cards.map((card, idx) => (
                  <motion.div
                    key={`${active.name}-${card.title}`}
                    initial={{ opacity: 0, x: 42, y: 20, rotateX: -8 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotateX: 0 }}
                    transition={{ delay: idx * 0.25, duration: 1.85, ease: [0.12, 0.72, 0.16, 1] }}
                    whileHover={{ y: -8 }}
                    className="rounded-2xl border border-white/20 bg-black/45 backdrop-blur-md p-3 sm:p-5 shadow-xl"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/15 text-primary-light flex items-center justify-center mb-3 sm:mb-4">
                      <card.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-white mb-1 sm:mb-2 text-sm sm:text-base">{card.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{card.desc}</p>
                    {card.href && <a href={`#/${card.href}`} className="inline-block mt-2 text-primary-light text-xs font-semibold hover:underline">Learn More &rarr;</a>}
                  </motion.div>
                ))}
              </div>
              <div className="premium-hero-actions">
                <motion.a href="#/contact?focus=message" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="premium-hero-primary">
                  Start Premium Project <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a href="#/services" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="premium-hero-secondary">
                  View Services
                </motion.a>
              </div>

              <div className="premium-industry-tabs" role="tablist" aria-label="Choose industry">
                {industries.map((industry, idx) => (
                  <button
                    type="button"
                    key={industry.name}
                    onClick={() => setActiveIndustry(idx)}
                    className={activeIndustry === idx ? 'active' : ''}
                    role="tab"
                    aria-selected={activeIndustry === idx}
                  >
                    {industry.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="industry-scroll-hint" aria-hidden="true">
            <span>Scroll to switch industry</span>
            <div><i style={{ width: `${((activeIndustry + 1) / industries.length) * 100}%` }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══ VHX 2026-07-04: Zenoti-style home video hero (single-screen, click-driven —
   replaces the IndustriesSection scroll story as the first home section).
   Fresh vhx- class prefix on purpose: the legacy patch layers key on
   #industry-scroll-story / .industry-* and must not restyle this hero. ═══ */
const VIDEO_HERO_SLIDES = [
  {
    label: 'Business',
    sub: 'Convert leads. Win trust. Grow revenue.',
    video: '/assets/industry-uploaded/business-growth.mp4',
    poster: '/assets/industry-uploaded/business-growth.jpg',
    cards: [
      { title: 'AI Lead Manager', text: 'New enquiry captured and routed automatically.', icon: Target, href: 'lead-generation' },
      { title: 'AI Marketer', text: 'Campaigns tuned to your best customers.', icon: Megaphone, href: 'digital-marketing' },
      { title: 'AI Concierge', text: 'Every visitor guided to the right service.', icon: Database, href: 'crm-software' },
    ],
  },
  {
    label: 'Gym',
    sub: 'Convert leads. Collect dues. Retain members.',
    video: '/assets/industry-uploaded/untitled-design.mp4',
    poster: '/assets/industry-uploaded/untitled-design.jpg',
    cards: [
      { title: 'AI Lead Manager', text: 'Trial-pass enquiries booked on autopilot.', icon: Target, href: 'ppc-paid-ads' },
      { title: 'AI Marketer', text: 'Lapsed members re-engaged with win-back offers.', icon: Megaphone, href: 'social-media' },
      { title: 'AI Concierge', text: 'Renewals and PT sessions scheduled automatically.', icon: Mail, href: 'email-marketing' },
    ],
  },
  {
    label: 'Salon',
    sub: 'Maximize bookings. Improve repeat visits.',
    video: '/assets/industry-uploaded/0619-1.mp4',
    poster: '/assets/industry-uploaded/0619-1.jpg',
    cards: [
      { title: 'AI Lead Manager', text: 'New consultation booked automatically.', icon: Smartphone, href: 'salon-software' },
      { title: 'AI Marketer', text: 'Churn-risk clients re-engaged with offers.', icon: Megaphone, href: 'social-media' },
      { title: 'AI Concierge', text: 'Personalized rebooking reminders that convert.', icon: Mail, href: 'email-marketing' },
    ],
  },
  {
    label: 'Healthcare',
    sub: 'Attract patients. Build trust. Grow practice.',
    video: '/assets/industry-uploaded/0619-1-1.mp4',
    poster: '/assets/industry-uploaded/0619-1-1.jpg',
    cards: [
      { title: 'AI Lead Manager', text: 'Appointment requests captured 24/7.', icon: Search, href: 'seo-services' },
      { title: 'AI Marketer', text: 'Reviews and reputation grown on autopilot.', icon: Star, href: 'brand-building' },
      { title: 'AI Concierge', text: 'Patients guided to the right specialist.', icon: Monitor, href: 'web-development' },
    ],
  },
  {
    label: 'Real Estate',
    sub: 'Generate leads. Book visits. Close deals.',
    video: '/assets/industry-uploaded/0619-2.mp4',
    poster: '/assets/industry-uploaded/0619-2.jpg',
    cards: [
      { title: 'AI Lead Manager', text: 'Site-visit enquiries qualified instantly.', icon: Target, href: 'lead-generation' },
      { title: 'AI Marketer', text: 'Buyers retargeted across every channel.', icon: Megaphone, href: 'ppc-paid-ads' },
      { title: 'AI Concierge', text: 'Automated follow-up after every property visit.', icon: Database, href: 'crm-software' },
    ],
  },
];

const VideoHeroSection = () => {
  const slides = VIDEO_HERO_SLIDES;
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const slide = slides[activeHeroIndex];
  const progressRadius = 21;
  const progressCircumference = 2 * Math.PI * progressRadius;
  const progressDashOffset = progressCircumference * (1 - videoProgress / 100);

  /* Video plays once per slide (no loop attribute on the tag); when it ends,
     cycle to the next industry slide inside the same hero section. This never
     scrolls the page — the visitor's scroll position is left untouched. */
  const onHeroVideoEnded = () => {
    setVideoProgress(100);
    nextHero();
  };

  const onHeroVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) {
      setVideoProgress(0);
      return;
    }
    setVideoProgress(Math.min(100, Math.max(0, (video.currentTime / video.duration) * 100)));
  };

  const selectHero = (index) => {
    if (index === activeHeroIndex) return;
    setVideoReady(false);
    setVideoProgress(0);
    setActiveHeroIndex(index);
  };
  const nextHero = () => selectHero((activeHeroIndex + 1) % slides.length);
  const previousHero = () => selectHero((activeHeroIndex - 1 + slides.length) % slides.length);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const onTablistKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); nextHero(); }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); previousHero(); }
  };

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.disablePictureInPicture = true;
    if (video.readyState < 2) video.load();

    const playVideo = () => { if (!video.ended) video.play().catch(() => undefined); };
    const syncPlayback = () => {
      if (isPaused) { video.pause(); return; }
      if (document.visibilityState === 'visible') {
        window.requestAnimationFrame(playVideo);
      } else {
        video.pause();
      }
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [activeHeroIndex, isPaused, prefersReducedMotion]);

  return (
    <section id="home-video-hero" ref={heroSectionRef} className="vhx-hero" aria-label="AuraShine — fine-tuned digital growth by industry">
      <div className="vhx-media" aria-hidden="true">
        <motion.img
          key={slide.poster}
          className="vhx-poster"
          src={slide.poster}
          alt=""
          initial={{ opacity: 1 }}
          animate={{ opacity: !prefersReducedMotion && videoReady ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          loading={activeHeroIndex === 0 ? 'eager' : 'lazy'}
          fetchpriority={activeHeroIndex === 0 ? 'high' : 'auto'}
          decoding="async"
        />
        {!prefersReducedMotion && (
          <motion.video
            key={slide.video}
            ref={videoRef}
            className="vhx-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            src={slide.video}
            poster={slide.poster}
            onCanPlay={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
            onTimeUpdate={onHeroVideoTimeUpdate}
            onEnded={onHeroVideoEnded}
            autoPlay
            muted
            playsInline
            preload={activeHeroIndex === 0 ? 'auto' : 'metadata'}
          />
        )}
        <div className="vhx-overlay" />
        <div className="vhx-overlay-side" />
      </div>

      <div className="vhx-content">
        <div className="vhx-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="vhx-main">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="premium-hero-eyebrow"
            >
              <Sparkles className="w-4 h-4" /> Premium Websites • Growth Marketing • CRM Automation
            </motion.div>

            <h2 className="vhx-title">
              Fine-tuned for your{' '}
              <motion.span
                key={slide.label}
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="vhx-title-accent"
              >
                {slide.label}.
              </motion.span>
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={slide.sub}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="vhx-sub"
              >
                {slide.sub}
              </motion.p>
            </AnimatePresence>

            <div className="vhx-tabs-mobile" role="tablist" aria-label="Choose industry" onKeyDown={onTablistKeyDown}>
              {slides.map((s, idx) => (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={activeHeroIndex === idx}
                  className={activeHeroIndex === idx ? 'active' : ''}
                  onClick={() => selectHero(idx)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="vhx-cards">
              {slide.cards.map((card, idx) => (
                <motion.a
                  key={`${slide.label}-${card.title}`}
                  href={`#/${card.href}`}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="vhx-card"
                >
                  <span className="vhx-card-icon"><card.icon className="w-4 h-4" /></span>
                  <span className="vhx-card-body">
                    <strong>{card.title}</strong>
                    <em>{card.text}</em>
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="premium-hero-actions">
              <motion.a href="#/contact?focus=message" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="premium-hero-primary">
                Start Premium Project <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href="#/services" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="premium-hero-secondary">
                View Services
              </motion.a>
            </div>
          </div>

          <div className="vhx-side" role="tablist" aria-label="Choose industry" onKeyDown={onTablistKeyDown}>
            {slides.map((s, idx) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={activeHeroIndex === idx}
                className={`vhx-side-label ${activeHeroIndex === idx ? 'active' : ''}`}
                onClick={() => selectHero(idx)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!prefersReducedMotion && (
        <button
          type="button"
          className="vhx-playbtn"
          onClick={toggleVideo}
          aria-label={isPaused ? 'Play background video' : 'Pause background video'}
        >
          <svg className="vhx-playbtn-ring" viewBox="0 0 48 48" aria-hidden="true">
            <circle className="vhx-playbtn-ring-track" cx="24" cy="24" r={progressRadius} />
            <circle
              className="vhx-playbtn-ring-value"
              cx="24"
              cy="24"
              r={progressRadius}
              style={{ strokeDasharray: progressCircumference, strokeDashoffset: progressDashOffset }}
            />
          </svg>
          <span className="vhx-playbtn-icon">
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </span>
        </button>
      )}

      <div className="vhx-scrollhint" aria-hidden="true"><span /></div>
    </section>
  );
};

const CaseStudiesSection = () => {
  const isTimelineSplit = useMediaQuery('(min-width: 640px)');
  const enableMotion = useLightMotion();
  const [psv3Parallax, setPsv3Parallax] = useState({ x: 0, y: 0 });

  const handlePsv3MouseMove = (e) => {
    if (!enableMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setPsv3Parallax({ x: relX * 22, y: relY * 22 });
  };

  const cases = [
    { week: 'PHASE 1', title: 'Discovery & Strategy', description: 'Deep dive into your business, competitors, and market. We identify opportunities and build a data-backed strategy.', stat: '2 WEEKS', statLabel: 'Strategy delivery time', icon: Search, color: 'from-primary to-primary-light' },
    { week: 'PHASE 2', title: 'Implementation', description: 'Our team executes the strategy — building campaigns, optimizing your site, or developing your app with weekly updates.', stat: '4-8 WEEKS', statLabel: 'Average launch time', icon: Rocket, color: 'from-primary-dark to-primary' },
    { week: 'PHASE 3', title: 'Optimization', description: 'Continuous A/B testing, performance tuning, and data-backed adjustments to maximize results from day one.', stat: '24/7', statLabel: 'Active monitoring', icon: Brain, color: 'from-primary to-primary-light' },
    { week: 'PHASE 4', title: 'Scale & Grow', description: 'Once we hit targets, we scale aggressively. More budget, more channels, more growth — all managed by our team.', stat: '3x', statLabel: 'Average growth rate', icon: TrendingUp, color: 'from-primary to-primary' },
    { week: 'ONGOING', title: 'Partnership & Support', description: 'Post-launch support, content updates, reports, and improvement planning as your business grows.', stat: 'SUPPORT', statLabel: 'Ongoing guidance', icon: Heart, color: 'from-primary to-primary' },
  ];

  const psv3Particles = [
    { top: '9%', left: '10%', size: 6, delay: '0s', duration: '7s' },
    { top: '16%', left: '85%', size: 4, delay: '1.2s', duration: '9s' },
    { top: '34%', left: '5%', size: 5, delay: '2.4s', duration: '8s' },
    { top: '48%', left: '92%', size: 7, delay: '0.6s', duration: '10s' },
    { top: '64%', left: '12%', size: 4, delay: '3s', duration: '7.5s' },
    { top: '78%', left: '80%', size: 6, delay: '1.8s', duration: '9.5s' },
    { top: '90%', left: '45%', size: 5, delay: '2.6s', duration: '8.5s' },
  ];

  return (
    <section className="psv3-strategy-section py-24 sm:py-32 relative overflow-hidden" onMouseMove={handlePsv3MouseMove}>
      {/* premium dark-to-light gradient base */}
      <div className="absolute inset-0 psv3-strategy-gradient" aria-hidden="true" />
      {/* soft radial glow behind the timeline */}
      <div className="absolute inset-0 psv3-radial-glow" aria-hidden="true" />
      {/* decorative blurred circles with subtle mouse parallax */}
      <div className="absolute -top-16 left-[8%] w-80 h-80 rounded-full blur-[110px] pointer-events-none transition-transform duration-500 ease-out"
        style={{ background: 'rgba(245,170,2,.16)', transform: `translate3d(${psv3Parallax.x}px, ${psv3Parallax.y}px, 0)` }} aria-hidden="true" />
      <div className="absolute bottom-0 right-[6%] w-96 h-96 rounded-full blur-[130px] pointer-events-none transition-transform duration-500 ease-out"
        style={{ background: 'rgba(245,170,2,.10)', transform: `translate3d(${-psv3Parallax.x}px, ${-psv3Parallax.y}px, 0)` }} aria-hidden="true" />
      {/* subtle floating particles */}
      {psv3Particles.map((p, i) => (
        <span key={i} className="psv3-particle hidden sm:block"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration }} aria-hidden="true" />
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <span className="psv3-glass-chip inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-5 border border-primary/20">
              <Award className="w-4 h-4" /> OUR PROCESS
            </span>
            <h2 className="psv3-heading-gradient text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
              From strategy to <span className="homx-shimmer-text">results.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg">
              A practical process for websites, software, campaigns, and growth work from first brief to post-launch support.
            </p>
          </div>
        </ScrollReveal>

        {/* journey timeline: growing gradient spine + alternating glass cards.
            The spine's scaleY animation is driven by a variants parent —
            a scaleY(0) element has zero area, so observing it directly
            never triggers whileInView. */}
        <motion.div className="relative" initial="hidden" whileInView="show"
          viewport={{ once: false, amount: 0.06 }}>
          <div className="psv3-spine-track absolute left-5 sm:left-1/2 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" aria-hidden="true">
            <motion.div
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="psv3-spine-fill w-full h-full origin-top rounded-full" />
          </div>
          <div className="space-y-14 sm:space-y-16">
            {cases.map((item, idx) => {
              const left = idx % 2 === 0;
              return (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: left ? -70 : 70, y: 24 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative pl-14 sm:pl-0 sm:w-1/2 ${left ? 'sm:pr-16' : 'sm:ml-auto sm:pl-16'}`}>
                  {/* node on the spine — inline-positioned so patch CSS or
                      missing utility classes can never misplace it */}
                  <motion.div className="psv3-timeline-dot rounded-full z-10"
                    initial={{ scale: 0.5, opacity: 0.6 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: 30,
                      ...(isTimelineSplit ? (left ? { right: -9 } : { left: -9 }) : { left: 20, transform: 'translateX(-50%)' }),
                    }} aria-hidden="true" />
                  {/* card slightly overlaps the timeline spine */}
                  <motion.div whileHover={enableMotion ? { y: -6 } : undefined} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`psv3-phase-card group relative overflow-hidden rounded-3xl p-7 sm:p-8 ${left ? 'sm:-mr-4' : 'sm:-ml-4'}`}>
                    <div className="psv3-phase-border" aria-hidden="true" />
                    <span className="psv3-phase-number absolute -top-3 right-5 text-7xl sm:text-8xl select-none pointer-events-none">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.color}`} />
                    <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary-light text-xs font-bold tracking-wider border border-primary/20">{item.week}</span>
                      <div className={`psv3-icon-shell w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                        <motion.div whileHover={enableMotion ? { rotate: 12 } : undefined} transition={{ duration: 0.3 }}>
                          <item.icon className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 relative z-10">{item.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base mb-6 relative z-10 leading-relaxed">{item.description}</p>
                    <div className="flex items-end justify-between gap-3 relative z-10">
                      <div>
                        <p className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.stat}</p>
                        <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">{item.statLabel}</p>
                      </div>
                    </div>
                    <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-3xl`} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const caseStudies = [
    {
      company: "SalonEase CRM",
      industry: "Salon & Wellness Software",
      title: "A complete CRM for appointment-led service businesses",
      overview: "AuraShine designed a clean CRM experience for salons that need fast appointment handling, customer profiles, service history, staff planning, invoices, and daily reports.",
      challenge: "The business needed one place to manage bookings, walk-ins, customer notes, package sales, reminders, and revenue tracking without confusing staff members.",
      solution: "We created a responsive dashboard with booking flows, searchable customer records, quick billing, staff performance cards, and a simple reporting area for owners.",
      result: "Faster front-desk operations, better customer follow-ups, and clearer daily business visibility.",
      author: "Operations Team",
      role: "Salon Management",
      stat: "CRM",
      statLabel: "Appointment + Billing System",
      tech: ["React", "Node.js", "MySQL", "Dashboard UI"],
      color: "from-primary to-primary-light"
    },
    {
      company: "Ember & Stone",
      industry: "Restaurant Website",
      title: "Premium restaurant website with modern booking experience",
      overview: "A restaurant website designed to present menu highlights, ambience, offers, contact details, and reservation calls-to-action in a premium visual style.",
      challenge: "The client needed a website that looked high-end, loaded smoothly on mobile, and helped customers quickly understand the restaurant experience.",
      solution: "We built structured sections for hero, menu, gallery, story, reservation CTA, location, and contact, with responsive layouts and smooth transitions.",
      result: "A stronger digital first impression and an easier enquiry path for customers viewing from mobile devices.",
      author: "Brand Team",
      role: "Restaurant Growth",
      stat: "Web",
      statLabel: "Restaurant Brand Presence",
      tech: ["HTML", "CSS", "JavaScript", "Responsive UI"],
      color: "from-primary-dark to-primary-light"
    },
    {
      company: "Velora Dining",
      industry: "Angular Web Application",
      title: "Multi-page restaurant experience with interactive visual sections",
      overview: "AuraShine created a multi-page restaurant interface focused on storytelling, smooth navigation, premium visuals, and structured content for real customers.",
      challenge: "The website required a polished frontend structure that could present multiple pages without feeling heavy or outdated.",
      solution: "We planned the page flow, designed reusable UI sections, added movement, and built a scalable Angular structure for future content updates.",
      result: "A modern restaurant presentation that can be extended with offers, menu updates, gallery pages, and booking integrations.",
      author: "Project Team",
      role: "Frontend Delivery",
      stat: "Angular",
      statLabel: "Multipage Experience",
      tech: ["Angular", "TypeScript", "CSS", "Animations"],
      color: "from-primary to-primary-light"
    },
    {
      company: "Business Launch Kit",
      industry: "Corporate Website",
      title: "Conversion-focused company website for service businesses",
      overview: "A professional business website structure with service pages, project proof, contact capture, trust points, and clear brand messaging.",
      challenge: "Small and mid-size businesses often need a website that explains services clearly and helps visitors contact them without extra friction.",
      solution: "We developed a clean single-page layout with service cards, process timeline, portfolio blocks, testimonials, and a direct enquiry section.",
      result: "A complete online profile ready for client presentation, lead generation, and future SEO expansion.",
      author: "AuraShine Team",
      role: "Digital Delivery",
      stat: "Lead",
      statLabel: "Enquiry-Ready Website",
      tech: ["React", "Tailwind", "Framer Motion", "SEO Structure"],
      color: "from-primary-dark to-primary"
    }
  ];

  const active = caseStudies[activeTestimonial];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(245,170,2,0.08),transparent_28%),radial-gradient(circle_at_85%_35%,rgba(241,210,122,0.08),transparent_28%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Award className="w-4 h-4" /> PROJECT CASE STUDIES
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-4">
              Real project work with <span className="gradient-text">clear business purpose.</span>
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              This section is designed like a client presentation: project overview, challenge, solution, result, and technologies are all visible without hiding important text.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {caseStudies.map((item, idx) => (
            <motion.button key={item.company} whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} onClick={() => setActiveTestimonial(idx)}
              className={`px-4 py-3 rounded-2xl text-sm font-bold border transition-all ${activeTestimonial === idx ? 'bg-secondary text-white border-secondary shadow-xl' : 'bg-white text-gray-700 border-gray-200 hover:border-primary/40 hover:text-primary'}`}>
              {item.company}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active.company} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <div className="grid lg:grid-cols-[1fr_1.12fr]">
              <div className={`relative min-h-[360px] bg-gradient-to-br ${active.color} p-8 sm:p-10 text-white overflow-hidden`}>
                <motion.div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/15 blur-2xl" animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
                <motion.div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/15 border border-white/25 backdrop-blur-xl p-6" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/75 font-bold">{active.industry}</p>
                      <h3 className="text-2xl font-black">{active.company}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/15 p-4">
                      <p className="text-3xl font-black">{active.stat}</p>
                      <p className="text-white/80 text-xs font-semibold">{active.statLabel}</p>
                    </div>
                    <div className="rounded-2xl bg-white/15 p-4">
                      <p className="text-3xl font-black">Live</p>
                      <p className="text-white/80 text-xs font-semibold">Editable Project Section</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="bg-secondary p-7 sm:p-10 lg:p-12 text-white">
                <span className="text-primary-light text-xs font-bold uppercase tracking-wider">{active.company} — {active.industry}</span>
                <h3 className="text-3xl lg:text-4xl font-black leading-tight mt-3 mb-5">{active.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-7">{active.overview}</p>

                <div className="grid sm:grid-cols-3 gap-4 mb-7">
                  <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                    <p className="text-primary-light text-xs font-bold uppercase mb-2">Challenge</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{active.challenge}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                    <p className="text-primary-light text-xs font-bold uppercase mb-2">Solution</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{active.solution}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                    <p className="text-primary-light text-xs font-bold uppercase mb-2">Result</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{active.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-7">
                  {active.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gray-200">{tech}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold">
                      {active.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold">{active.author}</p>
                      <p className="text-gray-400 text-sm">{active.role}</p>
                    </div>
                  </div>
                  <a href="#/contact" className="hidden sm:inline-flex items-center gap-2 text-primary-light font-bold hover:gap-3 transition-all">Discuss Similar Project <ArrowRight className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const stats = [
    { value: "Leads", label: "Clear enquiry paths and contact actions" },
    { value: "Trust", label: "Premium visuals, proof blocks and brand story" },
    { value: "Speed", label: "Fast pages, responsive layout and smooth launch" },
    { value: "Growth", label: "SEO foundation, analytics and future upgrades" }
  ];

  const systemCards = [
    { icon: Target, title: "Business Discovery & Strategy", desc: "We study your goals, audience, competitors and challenges before writing a single line of code — so every decision supports real business outcomes." },
    { icon: Sparkles, title: "Custom Solution Planning", desc: "No templates, no shortcuts. Every feature, page and workflow is mapped to your operations, ensuring the final product fits how your business actually runs." },
    { icon: Search, title: "Design & User Experience", desc: "Clean layouts, purposeful motion and clear navigation guide visitors toward action — building trust and making every interaction feel effortless across all screen sizes." },
    { icon: Database, title: "Development & Quality", desc: "Readable code, rigorous testing, strong security and fast load times come standard — because reliability and speed directly impact how customers perceive your brand." },
    { icon: Monitor, title: "Growth & Conversions", desc: "Strategic CTAs, SEO-friendly structure, analytics tracking and lead capture systems work together to turn website visitors into paying customers and repeat buyers." },
    { icon: BarChart3, title: "Long-Term Support", desc: "After launch we handle updates, backups, performance tuning and new feature development — so your platform keeps pace as your business evolves." }
  ];

  const buildItems = [
    "Business website with strong hero, services, portfolio, FAQs and enquiry sections",
    "Landing pages for ads, offers, campaigns, products and local service targeting",
    "CRM dashboards for leads, customers, bookings, billing and follow-up tracking",
    "Editable content blocks so future services, projects and offers can be updated easily",
    "Clear CTA strategy using call, WhatsApp, form, booking and consultation buttons",
    "SEO basics including headings, page flow, metadata-ready content and internal linking",
    "Mobile-first layout with smooth scrolling, clean spacing and premium card design",
    "Post-launch support for fixes, updates, new sections and performance improvement"
  ];

  const pageIdeas = [
    { title: "Home", desc: "Brand promise, proof, services, process, industries, results and contact CTA." },
    { title: "Services", desc: "Detailed service benefits, deliverables, tech stack, timelines and key features." },
    { title: "Portfolio", desc: "Project cards, case highlights, technology used, outcomes and business category." },
    { title: "About", desc: "Company story, mission, values, workflow, team strengths and client approach." },
    { title: "Contact", desc: "Inquiry form, phone, WhatsApp, email, business hours and consultation message." },
    { title: "Blog", desc: "Useful growth tips, website education, SEO guides and digital business insights." }
  ];

  const results = ["More qualified enquiries", "Better first impression", "Higher customer trust", "Clearer service communication", "Faster business response", "Improved search readiness", "Professional client presentation", "Room for future growth"];

  return (
    <section id="about" className="py-32 bg-secondary relative overflow-hidden text-white">
      <AnimatedBackground dark />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-5xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light text-sm font-semibold mb-5">
              <Rocket className="w-4 h-4" /> BUSINESS GROWTH SYSTEM
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-7">
              We build digital systems that bring <span className="gradient-text">customers, clarity, and growth.</span>
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed">
              AuraShine helps businesses move from a simple online presence to a complete growth engine. We combine website strategy, premium UI design, service content, CRM planning, landing pages, SEO structure, lead capture, analytics and ongoing support into one practical system.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {stats.map((stat) => (
              <StaggerItem key={stat.value}>
                <motion.div whileHover={{ y: -6 }} className="rounded-3xl bg-white/10 border border-white/10 p-7 text-center backdrop-blur-xl h-full">
                  <p className="text-4xl font-black gradient-text mb-2">{stat.value}</p>
                  <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start mb-14">
          <ScrollReveal direction="right">
            <div className="rounded-[2rem] bg-white text-secondary p-9 sm:p-12 shadow-2xl">
              <span className="text-primary text-xs font-bold uppercase tracking-widest">What You Get</span>
              <h3 className="text-3xl sm:text-4xl font-black mt-3 mb-6">A complete online business foundation, not only a website.</h3>
              <div className="grid gap-4">
                {buildItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4 border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="grid sm:grid-cols-2 gap-5">
              {systemCards.map((item) => (
                <motion.div key={item.title} whileHover={{ y: -6, scale: 1.01 }} className="rounded-3xl bg-white/10 border border-white/10 p-7 backdrop-blur-xl h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="rounded-[2rem] bg-white/6 border border-white/10 p-7 sm:p-10 mb-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <span className="text-primary-light text-xs font-bold uppercase tracking-widest">More Complete Website Pages</span>
                <h3 className="text-3xl sm:text-4xl font-black mt-2">Every page gets different information, stronger sections and useful key points.</h3>
              </div>
              <p className="text-gray-300 max-w-xl">The website is planned so pages do not repeat the same agency intro. Each page has a clear purpose, fresh copy, service details, trust content and conversion-focused call-to-actions.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pageIdeas.map((item) => (
                <motion.div key={item.title} whileHover={{ y: -5 }} className="rounded-3xl bg-secondary/70 border border-white/10 p-6">
                  <h4 className="text-2xl font-black gradient-text mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollReveal direction="right">
            <div className="rounded-[2rem] bg-white text-secondary p-8 shadow-2xl h-full">
              <h3 className="text-3xl font-black mb-4">Built For Real Results</h3>
              <p className="text-gray-600 mb-6">The goal is not just a beautiful design. The goal is to make the business easier to understand, easier to contact, easier to trust and easier to scale.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {results.map((item) => <span key={item} className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 text-sm font-semibold">{item}</span>)}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left">
            <div className="rounded-[2rem] bg-gradient-to-br from-primary to-primary-light p-8 shadow-2xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black mb-4">Ready to make your brand look bigger?</h3>
                <p className="text-white/85 text-lg leading-relaxed mb-8">We can plan your website, improve your content, add service details, create stronger landing pages, and connect enquiry systems that support real business growth.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#/contact" className="px-6 py-3 rounded-full bg-white text-primary font-bold text-center">Book Free Consultation</a>
                <a href="#/contact?focus=message" className="px-6 py-3 rounded-full bg-white/15 border border-white/25 text-white font-bold text-center">Discuss Your Project</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const WhyUsSection = () => {
  const reasons = [
    { icon: Target, title: 'Strategy-First Approach', desc: 'We use structured planning, clear reporting, content operations, and performance testing so every decision supports your business goals.', stat: 'Clear plan', color: 'from-primary to-primary-light' },
    { icon: Shield, title: 'Transparent Scope', desc: 'Pages, features, forms, content, timelines, and responsibilities are discussed clearly before development starts.', stat: 'No confusion', color: 'from-primary-dark to-primary' },
    { icon: Users, title: 'Focused Delivery Team', desc: 'Strategy, design, development, SEO structure, and launch support are planned together so the website feels consistent.', stat: 'One workflow', color: 'from-primary to-primary' },
    { icon: BarChart3, title: 'Tracking Ready', desc: 'Analytics, conversion events, form tracking, and reporting dashboards can be added so business performance is easier to read.', stat: 'Data ready', color: 'from-primary to-primary' },
    { icon: Zap, title: 'Fast Launch Planning', desc: 'We break the project into clear phases so design, content, development, testing, and handover move smoothly.', stat: 'Phase-wise', color: 'from-primary to-primary' },
    { icon: Award, title: 'Authentic Brand Presentation', desc: 'We avoid fake claims and build trust through clear services, real contact details, project proof areas, FAQs, and Google review connection.', stat: 'Trust-first', color: 'from-primary to-primary-light' },
  ];

  return (
    <section className="wcux-section py-24 sm:py-32">
      {/* layered decor: soft gold glow (light theme) */}
      <div className="absolute inset-0 v4-dotgrid pointer-events-none opacity-20" aria-hidden="true" />
      <div className="absolute -top-24 right-[8%] w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(245,170,2,.14)' }} aria-hidden="true" />
      <div className="absolute -bottom-28 left-[4%] w-72 h-72 rounded-full blur-[110px] pointer-events-none" style={{ background: 'rgba(245,170,2,.10)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5 wcux-chip-light">
              <Award className="w-4 h-4" /> WHY CHOOSE US
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-5 leading-[1.05]">
              Why growing brands <span>choose Aurashine.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are not just another agency. Here is what actually sets us apart from everyone else.
            </p>
          </div>
        </ScrollReveal>

        <div className="brand-choice-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {reasons.map((r, index) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="brand-choice-card relative"
            >
              <div className="wcux-panel p-7 sm:p-8 h-full">
                <span className="wcux-panel-glow" aria-hidden="true" />
                <div className="relative">
                  <div className={`wcux-ico mb-5 bg-gradient-to-br ${r.color}`}><r.icon className="w-7 h-7" /></div>
                  <h3 className="text-xl font-black text-secondary mb-2.5">{r.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{r.desc}</p>
                  <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${r.color} text-white shadow-md`}>{r.stat}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ToolsSection = () => {
  const toolCategories = [
    { name: 'Analytics', tools: ['Google Analytics 4', 'Hotjar', 'Mixpanel', 'Looker Studio', 'Amplitude'] },
    { name: 'Advertising', tools: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'Programmatic DSP'] },
    { name: 'SEO', tools: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Surfer SEO', 'Google Search Console'] },
    { name: 'Development', tools: ['React.js', 'Next.js', 'Node.js', 'Flutter', 'AWS / Firebase'] },
    { name: 'Design', tools: ['Figma', 'Adobe XD', 'Illustrator', 'After Effects', 'Webflow'] },
    { name: 'Automation', tools: ['HubSpot', 'Zapier', 'Klaviyo', 'ActiveCampaign', 'Make.com'] },
  ];

  return (
    <section className="tsx-section py-24 sm:py-32">
      <div className="absolute inset-0 v4-mesh pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 v4-dotgrid pointer-events-none opacity-40" aria-hidden="true" />
      <div className="absolute -top-24 left-[6%] w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(59,130,246,.12)' }} aria-hidden="true" />
      <div className="absolute -bottom-28 right-[6%] w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(245,170,2,.14)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-light text-sm font-medium mb-5 psv3-glass-chip">
                <Zap className="w-4 h-4" /> OUR TECH STACK
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.05]">
                Industry-leading <span className="v4-gradient-text">tools we use.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We invest in the best tools so you do not have to. Every platform we use is chosen for maximum ROI.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-3xl font-black text-white leading-none">6</p>
                  <p className="text-xs text-gray-500 mt-1">Categories</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-3xl font-black text-white leading-none">30+</p>
                  <p className="text-xs text-gray-500 mt-1">Platforms mastered</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="tsx-panel rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/8">
              <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#f5aa02' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              <span className="ml-3 text-xs font-mono text-gray-500">aurashine / tech-stack</span>
            </div>
            <div className="px-6 sm:px-8 py-2">
              {toolCategories.map((cat, i) => (
                <motion.div key={cat.name}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid sm:grid-cols-[130px_1fr] gap-3 sm:gap-5 items-start py-5 ${i ? 'border-t border-white/8' : ''}`}>
                  <h3 className="font-black text-white flex items-center gap-2 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-primary-light" />
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.tools.map((tool) => (
                      <span key={tool} className="tsx-chip">
                        <span className="tsx-chip-dot" aria-hidden="true" />{tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "How long does a website project take?", a: "A standard business website usually takes 7–21 days depending on the number of pages, content, design complexity, screenshots, forms, and revision rounds. Larger software or CRM projects are planned with a separate timeline." },
    { q: "Can AuraShine redesign my existing website?", a: "Yes. We can redesign your current website, improve content visibility, add modern sections, fix mobile layout issues, improve speed, and make the website more suitable for client presentation and enquiries." },
    { q: "Do you build software and CRM systems?", a: "Yes. We build custom CRM systems, dashboards, booking systems, admin panels, billing screens, customer management tools, and internal business workflow software." },
    { q: "Can I edit the website after delivery?", a: "Yes. We structure the project so text, project names, screenshots, links, services, and contact information can be edited later from the source files or connected CMS depending on your selected setup." },
    { q: "Do you add real project screenshots?", a: "Yes. Send project screenshots or live links and we can place multiple images inside each project project showcase with proper captions, technology badges, and demo buttons." },
    { q: "Do you provide contact form integration?", a: "Yes. We can connect the form with EmailJS, Formspree, Google Sheets, WhatsApp click-to-chat, or a custom backend API." },
    { q: "What do you need to start?", a: "We need your company name, services, phone number, email, address, logo if available, project screenshots, live links, and any reference designs you like." }
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden faq-clean-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <MessageSquare className="w-3.5 h-3.5" /> FAQ
            </span>
            <div className="w-20 h-1 rounded-full bg-primary mx-auto mb-5" />
            <h2 className="text-3xl sm:text-5xl font-black text-secondary mb-3 leading-tight">
              Frequently asked <span className="gradient-text">questions.</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">Clear answers for website, software, CRM, and digital growth projects.</p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.05}>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <StaggerItem key={i} direction="up">
                <motion.div className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors bg-white shadow-sm">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-left hover:bg-primary/5 transition-colors">
                    <span className="font-semibold text-secondary pr-4 text-sm sm:text-base">{faq.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                      <ChevronDown className="w-4 h-4 text-primary" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-4 sm:px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3 bg-gray-50/70">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};



const HomeGrowthSuiteSection = () => {
  const enableMotion = useLightMotion();
  const pillars = [
    { icon: Target, title: 'Lead Generation Flow', desc: 'Every page is planned with clear enquiry buttons, WhatsApp actions, contact prompts, service clarity and trust points that help visitors take action.' },
    { icon: Palette, title: 'Brand Presentation', desc: 'Premium visual sections, clean spacing, strong typography, brand colors, service highlights and modern layouts that make the business look established.' },
    { icon: Database, title: 'CRM Ready Enquiries', desc: 'Website forms are structured to collect useful client details like name, phone, service interest, budget, timeline and project requirements.' },
    { icon: Search, title: 'Search-Ready Content', desc: 'Service pages use clear headings, local Mumbai context, helpful FAQs, internal links and detailed explanations so customers and search engines understand the business faster.' },
    { icon: Shield, title: 'Trust & Proof Sections', desc: 'Process steps, benefits, technology stack, project approach, support details, testimonials and portfolio-ready areas build credibility before the first call.' },
    { icon: Rocket, title: 'Launch Support', desc: 'Responsive checks, form testing, speed review, analytics setup, contact updates and post-launch improvement guidance are included for smooth delivery.' }
  ];
  const deliverables = ['Business website', 'Landing pages', 'CRM dashboard', 'Booking system', 'Service pages', 'Portfolio gallery', 'Search structure', 'WhatsApp leads', 'Contact form', 'Speed optimized', 'Mobile-first UI', 'Support setup'];
  return (
    <section className="home-growth-suite-section psv3-features-section py-32 bg-secondary text-white relative overflow-hidden">
      <AnimatedBackground dark />
      {/* animated background mesh gradient + soft golden lighting */}
      <div className="psv3-mesh-bg" aria-hidden="true" />
      {/* subtle dot pattern */}
      <div className="absolute inset-0 psv3-dotpattern pointer-events-none" aria-hidden="true" />
      {/* decorative blurred blobs */}
      <div className="absolute -top-24 right-[10%] w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(245,170,2,.14)' }} aria-hidden="true" />
      <div className="absolute bottom-0 left-[6%] w-80 h-80 rounded-full blur-[110px] pointer-events-none" style={{ background: 'rgba(245,170,2,.10)' }} aria-hidden="true" />
      {/* decorative lines */}
      <div className="hidden lg:block absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="hidden lg:block absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mb-14">
            <span className="psv3-glass-chip inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light text-sm font-semibold mb-5 border border-white/10">
              <Sparkles className="w-4 h-4" /> AURASHINE WEBSITE FEATURES
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
              Complete digital solutions for <span className="gradient-text">websites, CRM, marketing and growth.</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              AuraShine Infotech helps businesses build a professional online presence with modern websites, landing pages, CRM systems, booking flows, portfolio sections, search-friendly service content and conversion-focused contact journeys.
            </p>
          </div>
        </ScrollReveal>
        {/* floating feature badges */}
        <div className="homx-float psv3-badge-float absolute top-24 right-[6%] hidden lg:flex w-12 h-12 rounded-2xl items-center justify-center pointer-events-none"
          style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(245,170,2,.4)', backdropFilter: 'blur(8px)' }} aria-hidden="true">
          <Rocket className="w-5 h-5 text-primary-light" />
        </div>
        <div className="homx-float psv3-badge-float absolute bottom-24 left-[3%] hidden lg:flex w-11 h-11 rounded-full items-center justify-center pointer-events-none"
          style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', backdropFilter: 'blur(8px)', animationDelay: '1.8s' }} aria-hidden="true">
          <Sparkles className="w-5 h-5 text-primary-light" />
        </div>

        {/* NEW layout 2026-07-06: six pillar cards in a 3-column grid on top,
            then a full-width "everything included" panel with the deliverables
            as a chip cloud beside the growth-focus highlight. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {pillars.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={enableMotion ? { y: -6 } : undefined}
              className="home-growth-pillar-card psv3-bento-card p-7 flex flex-col relative">
              <div className="psv3-pillar-icon w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4 shadow-lg">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* full-width feature panel: intro + growth-focus on the left, deliverables chip cloud on the right */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.12 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="psv3-bento-card psv3-gradient-border">
          <div className="home-growth-feature-card relative p-8 sm:p-10 grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Core website features</span>
              <h3 className="text-3xl font-black mt-3 mb-5">Everything your business website needs to look professional and generate enquiries.</h3>
              <div className="rounded-2xl bg-secondary text-white p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px]" style={{ background: 'rgba(245,170,2,.25)' }} />
                <p className="text-primary-light font-bold mb-2 relative z-10">Business growth focus</p>
                <p className="text-gray-300 leading-relaxed relative z-10">From homepage to contact page, the website is structured to explain services clearly, build trust, collect enquiries and support future business growth.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {deliverables.map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: i * 0.035, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={enableMotion ? { y: -3 } : undefined}
                  className="psv3-badge-chip home-growth-deliverable inline-flex items-center gap-2 rounded-full bg-gray-50 border border-gray-100 px-4 py-2.5">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-semibold text-gray-700 text-sm whitespace-nowrap">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProcessConnectorCard = ({ item, index, dark, prefersReducedMotion }) => {
  const Icon = item.icon;

  if (prefersReducedMotion) {
    return (
      <div
        className={`relative rounded-[22px] p-7 h-full border overflow-hidden ${dark ? 'bg-white/[0.06] border-white/10' : 'bg-white border-primary/20'}`}
        style={{ boxShadow: dark ? '0 18px 46px rgba(0,0,0,.35)' : '0 18px 46px rgba(17,24,39,.08)' }}
      >
        <span className={`absolute top-4 right-6 text-6xl font-black leading-none select-none ${dark ? 'text-white/[0.06]' : 'text-secondary/[0.06]'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative z-10">
          <span className={`inline-block text-xs font-black tracking-[0.2em] mb-4 ${dark ? 'text-primary-light' : 'text-primary-dark'}`}>
            STEP {String(index + 1).padStart(2, '0')}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-5 shadow-md">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-lg font-black mb-2 leading-snug ${dark ? 'text-white' : 'text-secondary'}`}>{item.title}</h3>
          <p className={`${dark ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>{item.desc}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="page-expansion-card-wrap relative"
    >
      <div
        className={`relative rounded-[22px] p-7 h-full border overflow-hidden ${dark ? 'bg-white/[0.06] border-primary/20' : 'bg-white border-primary/25'}`}
        style={{ boxShadow: dark ? '0 18px 46px rgba(0,0,0,.35)' : '0 18px 46px rgba(17,24,39,.08)' }}
      >
        <span className={`absolute top-4 right-6 text-6xl font-black leading-none select-none ${dark ? 'text-white/[0.06]' : 'text-secondary/[0.06]'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative z-10">
          <span className={`inline-block text-xs font-black tracking-[0.2em] mb-4 ${dark ? 'text-primary-light' : 'text-primary-dark'}`}>
            STEP {String(index + 1).padStart(2, '0')}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-5 shadow-md">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-lg font-black mb-2 leading-snug ${dark ? 'text-white' : 'text-secondary'}`}>{item.title}</h3>

          <p className={`${dark ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>{item.desc}</p>
        </div>
      </div>
    </motion.article>
  );
};

const PageExpansionSection = ({ title = 'More detailed business content', dark = false }) => {
  const prefersReducedMotion = useReducedMotion();

  const blocks = [
    { title: 'Business Discovery & Strategy', desc: 'We understand your goals, audience and challenges first, so the project begins with clear priorities and practical direction.', icon: Search },
    { title: 'Custom Solution Planning', desc: 'Each website or software flow is planned around your actual business needs instead of forcing your work into a generic template.', icon: Target },
    { title: 'Design & User Experience', desc: 'Modern layouts, simple navigation and clear content help users trust your brand, understand your offer and take action faster.', icon: Palette },
    { title: 'Development & Quality', desc: 'Clean development, testing, security checks and device optimization help your platform perform reliably from launch day onward.', icon: Cpu },
    { title: 'Growth & Conversions', desc: 'SEO-ready structure, focused CTAs, lead capture and analytics help turn website traffic into enquiries, bookings and measurable growth.', icon: TrendingUp },
    { title: 'Long-Term Support', desc: 'Ongoing updates, maintenance and performance improvements keep your digital platform stable as your business expands and changes.', icon: Shield }
  ];

  return (
    <section className={`py-14 ${dark ? 'bg-secondary text-white' : 'bg-gradient-to-b from-white to-primary/5 text-secondary'} relative overflow-hidden`}>
      {dark && <AnimatedBackground dark />}
      {!dark && <div className="absolute inset-0 homx-dotgrid pointer-events-none" aria-hidden="true" />}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${dark ? 'text-primary-light bg-white/10 border-white/15' : 'text-primary bg-primary/10 border-primary/20'}`}>
            <Layers className="w-4 h-4" /> EXPANDED PAGE CONTENT
          </span>
          <h2 className="text-4xl lg:text-6xl font-black mt-5 mb-5">{title}</h2>
          <p className={`${dark ? 'text-gray-300' : 'text-gray-600'} text-lg leading-relaxed`}>
            Each page now has larger content depth, unique information, key points and practical details so the website feels complete instead of short or repeated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blocks.map((item, i) => (
            <ProcessConnectorCard
              key={item.title}
              item={item}
              index={i}
              dark={dark}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesOverviewCard = ({ service, index }) => {
  const Icon = service.icon;
  const interactiveProps = service.disabled
    ? { role: 'article', tabIndex: 0, 'aria-disabled': 'true' }
    : { href: service.href, 'aria-label': `${service.cta}: ${service.title}` };
  const Wrapper = service.disabled ? motion.article : motion.a;

  return (
    <Wrapper
      {...interactiveProps}
      initial={{ opacity: 0, y: 56, scale: 0.82, rotateX: -14 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
      whileHover={service.disabled ? { y: -3 } : { y: -7, rotateX: 2, scale: 1.012 }}
      className={`services-overview-card group relative block overflow-hidden rounded-2xl border p-3 shadow-[0_24px_80px_rgba(0,0,0,.28)] outline-none backdrop-blur focus-visible:ring-4 focus-visible:ring-[#8b5cf6]/30 sm:p-4 lg:p-5 ${service.disabled ? 'cursor-default' : 'cursor-pointer'}`}
      style={{ borderColor: service.border, background: service.cardBg, transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }} aria-hidden="true" />
      <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full blur-3xl" style={{ background: service.glow }} aria-hidden="true" />
      <span className="absolute right-4 top-3 font-mono text-[11px] font-black tracking-[0.22em]" style={{ color: service.numberColor }} aria-hidden="true">
        0{index + 1}
      </span>
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border" style={{ background: service.iconBg, color: service.accent, borderColor: service.iconBorder }}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: service.accent, borderColor: service.iconBorder, background: '#ffffff08' }}>
            {service.badge || service.tag}
          </span>
        </div>

        <h2 className="mb-1.5 text-lg font-black tracking-tight sm:text-xl" style={{ color: service.titleColor }}>{service.title}</h2>
        <p className="mb-3 text-xs leading-relaxed sm:text-sm" style={{ color: service.bodyColor }}>{service.subtitle}</p>
        <div className="mb-3 grid gap-1.5 sm:grid-cols-2">
          {service.points.map((point) => (
            <div
              key={point}
              className="inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold sm:text-xs"
              style={{ borderColor: service.chipBorder, color: service.chipText, background: service.chipBg }}
            >
              <CheckCircle className="h-3 w-3 flex-shrink-0" style={{ color: service.accent }} />
              {point}
            </div>
          ))}
        </div>
        <div className="mt-auto inline-flex items-center gap-2 self-start text-sm font-black" style={{ color: service.accent }}>
          {service.cta}
          {!service.disabled && <ArrowRight className="h-4 w-4" />}
        </div>
      </div>
    </Wrapper>
  );
};

const ServicesOverviewPage = () => {
  const services = [
    {
      title: 'Development',
      subtitle: 'Web, app and software solutions engineered for performance and growth.',
      points: ['Website Development', 'Mobile App Development', 'Custom Software', 'E-commerce Solutions'],
      cta: 'Explore Development',
      href: '#/development',
      icon: Monitor,
      tag: 'BUILD LAB',
      accent: '#8b5cf6',
      border: 'rgba(139,92,246,.32)',
      cardBg: 'linear-gradient(135deg, rgba(23,32,51,.96), rgba(15,23,42,.98))',
      iconBg: 'rgba(139,92,246,.14)',
      iconBorder: 'rgba(139,92,246,.35)',
      chipBg: 'rgba(255,255,255,.06)',
      chipBorder: 'rgba(255,255,255,.10)',
      chipText: '#cbd5e1',
      titleColor: '#ffffff',
      bodyColor: '#94a3b8',
      numberColor: 'rgba(139,92,246,.30)',
      glow: 'rgba(139,92,246,.18)',
    },
    {
      title: 'Digital Marketing',
      subtitle: 'Data-led campaigns that help brands attract, engage and convert the right audience.',
      points: ['Social Media Marketing', 'Performance Advertising', 'SEO', 'Content Strategy'],
      cta: 'Explore Marketing',
      href: '#/marketing',
      icon: Megaphone,
      tag: 'GROWTH OPS',
      accent: '#3b82f6',
      border: 'rgba(59,130,246,.30)',
      cardBg: 'linear-gradient(135deg, rgba(23,32,51,.94), rgba(15,23,42,.98))',
      iconBg: 'rgba(59,130,246,.13)',
      iconBorder: 'rgba(59,130,246,.34)',
      chipBg: 'rgba(255,255,255,.06)',
      chipBorder: 'rgba(255,255,255,.10)',
      chipText: '#cbd5e1',
      titleColor: '#ffffff',
      bodyColor: '#94a3b8',
      numberColor: 'rgba(59,130,246,.26)',
      glow: 'rgba(59,130,246,.15)',
    },
    {
      title: 'AI Solutions',
      subtitle: 'Intelligent systems that automate workflows, improve decisions and create smarter customer experiences.',
      points: ['AI Automation', 'Smart Assistants', 'Intelligent Search', 'Business Analytics'],
      cta: 'Coming Soon',
      icon: Brain,
      badge: 'Coming Soon',
      disabled: true,
      accent: '#14b8a6',
      border: 'rgba(20,184,166,.28)',
      cardBg: 'linear-gradient(135deg, rgba(23,32,51,.92), rgba(15,23,42,.98))',
      iconBg: 'rgba(20,184,166,.12)',
      iconBorder: 'rgba(20,184,166,.32)',
      chipBg: 'rgba(255,255,255,.06)',
      chipBorder: 'rgba(255,255,255,.10)',
      chipText: '#cbd5e1',
      titleColor: '#ffffff',
      bodyColor: '#94a3b8',
      numberColor: 'rgba(20,184,166,.24)',
      glow: 'rgba(20,184,166,.13)',
    },
    {
      title: 'CRM Solutions',
      subtitle: 'Centralize customer data, simplify follow-ups and manage relationships more effectively.',
      points: ['Lead Management', 'Sales Pipeline', 'Customer Communication', 'Reports and Automation'],
      cta: 'Explore CRM',
      href: '#/crm',
      icon: Database,
      tag: 'CRM STACK',
      accent: '#f5aa02',
      border: 'rgba(245,170,2,.30)',
      cardBg: 'linear-gradient(135deg, rgba(23,32,51,.94), rgba(15,23,42,.98))',
      iconBg: 'rgba(245,170,2,.12)',
      iconBorder: 'rgba(245,170,2,.34)',
      chipBg: 'rgba(255,255,255,.06)',
      chipBorder: 'rgba(255,255,255,.10)',
      chipText: '#cbd5e1',
      titleColor: '#ffffff',
      bodyColor: '#94a3b8',
      numberColor: 'rgba(245,170,2,.26)',
      glow: 'rgba(245,170,2,.14)',
    },
  ];

  return (
    <main className="services-overview-page relative flex h-screen overflow-hidden bg-[#0b1220] pt-16 text-slate-200 lg:pt-20" style={{ fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif", perspective: '1200px' }}>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,.75) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.75) 1px, transparent 1px)', backgroundSize: '80px 80px' }} aria-hidden="true" />
      <div className="absolute right-[8%] top-20 h-96 w-96 rounded-full bg-[#8b5cf6]/20 blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-0 left-[5%] h-72 w-72 rounded-full bg-[#6366f1]/20 blur-[100px]" aria-hidden="true" />
      <section className="relative z-10 flex w-full items-start py-2 sm:py-3 lg:py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-3 max-w-3xl text-center lg:mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#a78bfa]">
              <Cpu className="h-3.5 w-3.5" /> Service Command Center
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4">
            {services.map((service, index) => (
              <ServicesOverviewCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const ContactSection = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobileContact = useMediaQuery('(max-width: 767px)');
  const contactCards = [
    { icon: Phone, title: "Call / WhatsApp", value: "+91 7900129064", desc: "Quick project discussion for websites, software, CRM dashboards, landing pages, and redesign work.", href: isMobileContact ? "tel:+917900129064" : "https://wa.me/917900129064", external: !isMobileContact },
    { icon: Mail, title: "Email", value: "aurashineinfotech@gmail.com", desc: "Send project brief, reference links, screenshots, requirement notes, and business goals.", href: "https://mail.google.com/mail/?view=cm&fs=1&to=aurashineinfotech@gmail.com", external: true },
    { icon: Globe, title: "Address", value: "Kandivali West, Mumbai", desc: "Local business support for Mumbai clients and remote project delivery across India.", href: "https://www.google.com/maps/search/?api=1&query=AuraShine%20Infotech%20Raghuleela%20Mega%20Mall%20Kandivali%20West%20Mumbai", external: true },
    { icon: MessageSquare, title: "Working Hours", value: "Mon - Sat, 10 AM - 7 PM", desc: "Project discussion, updates, support coordination, and delivery planning." }
  ];
  const projectTypes = ["Static Website", "Dynamic Website", "Marketing Services", "E-commerce", "CRM Software", "Mobile App", "Landing Page", "Website Redesign"];
  const formFields = ["First Name", "Company Name", "Phone / WhatsApp", "Email Address"];
  const handleEnquirySubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Unable to send enquiry');
      form.reset();
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-secondary text-white relative overflow-hidden">
      <AnimatedBackground dark />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light text-sm font-semibold mb-4">
              <Phone className="w-4 h-4" /> CONTACT AURASHINE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Let us build your <span className="gradient-text">next digital project.</span>
            </h2>
            <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
              Share your requirements and our team will suggest the right pages, features, design style, technology stack, timeline, and launch plan.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <StaggerContainer staggerDelay={0.08}>
              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                {contactCards.map((card) => {
                  const ContactCard = card.href ? motion.a : motion.div;
                  return (
                  <StaggerItem key={card.title} direction="up">
                    <ContactCard
                      href={card.href}
                      target={card.external ? '_blank' : undefined}
                      rel={card.external ? 'noreferrer' : undefined}
                      aria-label={card.href ? `${card.title}: ${card.value}` : undefined}
                      whileHover={{ y: -6 }}
                      className={`block bg-white/10 rounded-3xl p-6 border border-white/10 hover:border-primary/40 transition-all h-full backdrop-blur-xl ${card.href ? 'cursor-pointer' : ''}`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4">
                        <card.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-white mb-1">{card.title}</h3>
                      <p className="text-primary-light font-semibold text-sm mb-2">{card.value}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{card.desc}</p>
                    </ContactCard>
                  </StaggerItem>
                  );
                })}
              </div>
            </StaggerContainer>

            <ScrollReveal delay={0.1}>
              <div className="rounded-3xl bg-white text-secondary p-7 shadow-2xl">
                <h3 className="text-2xl font-black mb-3">What to send us</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  {["Company name, logo, phone, email, and address", "List of services or products you want to show", "Project screenshots, app screens, or live links", "Reference websites or design styles you like", "Required pages, forms, features, and deadline"].map((item) => (
                    <li key={item} className="flex gap-3"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /> <span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left">
            <form action="https://formsubmit.co/aurashineinfotech@gmail.com" method="POST" onSubmit={handleEnquirySubmit} className="rounded-[2rem] p-6 sm:p-8 bg-white text-secondary shadow-2xl border border-gray-100">
              <input type="hidden" name="_subject" value="New AuraShine Website Enquiry" />
              <input type="hidden" name="_captcha" value="false" />
              <h3 className="text-3xl font-black mb-2">Project Enquiry Form</h3>
              <p className="text-gray-600 mb-7 text-sm leading-relaxed">Submit your requirement here. Your enquiry will be sent to aurashineinfotech@gmail.com.</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                {formFields.map((field) => (
                  <div key={field}>
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">{field}</label>
                    <input id={field === 'First Name' ? 'project-first-name' : undefined} className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors text-secondary" name={field} required placeholder={field} />
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <label htmlFor="project-type-select" className="text-xs text-gray-500 font-bold uppercase tracking-wider">Project Type</label>
                {/* Real form control (was a row of decorative pills): the selected
                    value now submits with the enquiry as "Project Type". */}
                <select
                  id="project-type-select"
                  name="Project Type"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors text-secondary appearance-none cursor-pointer"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                >
                  <option value="" disabled>Select your project type...</option>
                  {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div id="contact-message-box">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Project Details</label>
                <textarea id="project-details-message" rows="5" name="Project Details" required className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors text-secondary" placeholder="Write your requirement, pages, features, deadline, and reference links here..." />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed">{isSubmitting ? 'Sending...' : 'Send Enquiry'}</motion.button>
                  {submitStatus === 'success' && (
                    <p role="status" className="mt-3 text-sm font-bold text-green-600">Your message has been sent successfully.</p>
                  )}
                  {submitStatus === 'error' && (
                    <p role="alert" className="mt-3 text-sm font-bold text-red-600">Message could not be sent. Please try again.</p>
                  )}
                </div>
                <motion.a href="https://wa.me/917900129064" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full rounded-xl border border-gray-200 px-6 py-4 text-center font-bold text-secondary hover:border-primary hover:text-primary transition-colors">Chat on WhatsApp</motion.a>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const GOOGLE_REVIEWS_API_KEY = 'AIzaSyDZe5w2b3LIMtncoc7EbPbtm97hVXKRoUI';
const GOOGLE_REVIEW_QUERY = 'AuraShine Infotech Raghuleela Mega Mall Kandivali West Mumbai';
const CLIENT_FEEDBACK_REVIEWS = [
  {
    id: 'client-feedback-1',
    author: 'Rohit Mehta',
    role: 'Retail Founder',
    rating: 5,
    text: 'AuraShine rebuilt our website with a clean lead flow. Enquiries became easier to track and the team stayed responsive after launch.',
  },
  {
    id: 'client-feedback-2',
    author: 'Priya Shah',
    role: 'Clinic Owner',
    rating: 5,
    text: 'The website, WhatsApp CTA, and follow-up system felt professional from day one. Patients can find services quickly and contact us faster.',
  },
  {
    id: 'client-feedback-3',
    author: 'Aman Verma',
    role: 'Real Estate Consultant',
    rating: 5,
    text: 'Their pages explain each project clearly and the landing page structure helped us capture better quality leads from campaigns.',
  },
];

const GoogleReviewsSection = () => {
  const [active, setActive] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [placeMeta, setPlaceMeta] = useState({ name: 'AuraShine Infotech', rating: null, total: null, url: '' });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const scriptStatus = useRef('idle');

  useEffect(() => {
    let cancelled = false;
    let timeoutId = null;
    const previousGoogleAuthFailure = window.gm_authFailure;

    const stopWithGoogleError = (message = 'Live Google reviews could not load. Please check Google Places API, billing, and website domain restriction for this key.') => {
      if (cancelled) return;
      if (timeoutId) window.clearTimeout(timeoutId);
      setLoadError(message);
      setReviews([]);
      setLoading(false);
    };

    window.gm_authFailure = () => {
      stopWithGoogleError('Google API key is loading, but Maps JavaScript API is not activated or this website domain is not allowed for the key.');
      if (typeof previousGoogleAuthFailure === 'function') previousGoogleAuthFailure();
    };

    const normalizeReviews = (googleReviews = []) => googleReviews
      .filter((review) => review && review.text)
      .map((review, index) => ({
        id: `${review.author_name || 'google-review'}-${review.time || index}`,
        author: review.author_name || 'Google user',
        profilePhoto: review.profile_photo_url || '',
        rating: Number(review.rating || 5),
        text: review.text,
        time: review.relative_time_description || '',
        url: review.author_url || '',
      }));

    const loadRealGoogleReviews = () => {
      if (cancelled || !window.google?.maps?.places) return;
      const mapDiv = document.createElement('div');
      const service = new window.google.maps.places.PlacesService(mapDiv);
      service.findPlaceFromQuery(
        {
          query: GOOGLE_REVIEW_QUERY,
          fields: ['place_id', 'name', 'rating', 'user_ratings_total', 'url'],
        },
        (places, status) => {
          if (cancelled) return;
          if (status !== window.google.maps.places.PlacesServiceStatus.OK || !places?.[0]?.place_id) {
            stopWithGoogleError(`Live Google reviews could not load from Places API. Google status: ${status}.`);
            return;
          }

          const place = places[0];
          service.getDetails(
            {
              placeId: place.place_id,
              fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'url'],
            },
            (details, detailsStatus) => {
              if (cancelled) return;
              if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK && details) {
                const realReviews = normalizeReviews(details.reviews || []);
                setPlaceMeta({
                  name: details.name || place.name || 'AuraShine Infotech',
                  rating: details.rating || place.rating || null,
                  total: details.user_ratings_total || place.user_ratings_total || null,
                  url: details.url || place.url || '',
                });
                if (realReviews.length) {
                  if (timeoutId) window.clearTimeout(timeoutId);
                  setReviews(realReviews);
                  setLoadError('');
                } else {
                  stopWithGoogleError('Google Places found the business, but did not return public review text.');
                }
              } else {
                stopWithGoogleError(`Google review details could not load. Google status: ${detailsStatus}.`);
              }
              setLoading(false);
            }
          );
        }
      );
    };

    if (window.google?.maps?.places) {
      loadRealGoogleReviews();
      return () => {
        cancelled = true;
        window.gm_authFailure = previousGoogleAuthFailure;
      };
    }

    timeoutId = window.setTimeout(() => {
      stopWithGoogleError('Live Google reviews took too long to respond. Please check Maps JavaScript API, Places API, billing, and allowed website domains.');
    }, 12000);

      if (scriptStatus.current === 'idle') {
      scriptStatus.current = 'loading';
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_REVIEWS_API_KEY}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        scriptStatus.current = 'loaded';
        loadRealGoogleReviews();
      };
      script.onerror = () => {
        stopWithGoogleError('Google Maps script failed to load. Please check API key restrictions and allowed website domains.');
      };
      document.head.appendChild(script);
    } else {
      const retry = window.setInterval(() => {
        if (window.google?.maps?.places) {
          window.clearInterval(retry);
          loadRealGoogleReviews();
        }
      }, 300);
      return () => {
        cancelled = true;
        window.gm_authFailure = previousGoogleAuthFailure;
        window.clearInterval(retry);
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    return () => {
      cancelled = true;
      window.gm_authFailure = previousGoogleAuthFailure;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const slideCount = reviews.length || (!loading ? CLIENT_FEEDBACK_REVIEWS.length : 0);
    if (!slideCount) return undefined;
    const timer = setInterval(() => setActive((current) => (current + 1) % slideCount), 3600);
    return () => clearInterval(timer);
  }, [reviews.length, loading]);

  const usingClientFeedback = !loading && !reviews.length;
  const visibleReviews = reviews.length ? reviews : (usingClientFeedback ? CLIENT_FEEDBACK_REVIEWS : []);
  const sectionLabel = reviews.length ? 'GOOGLE REVIEWS' : 'CLIENT FEEDBACK';
  const sectionTitle = reviews.length ? 'Google Reviews' : 'Client Feedback';
  const sectionSubtitle = reviews.length && placeMeta.rating
    ? `${placeMeta.name} - ${placeMeta.rating} rating${placeMeta.total ? ` from ${placeMeta.total} Google reviews` : ''}`
    : 'Real Google reviews load when Google API is enabled. Meanwhile, this carousel shows client feedback.';

  return (
    <section className="py-16 bg-white relative overflow-hidden google-review-section">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -left-24 top-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-0 w-72 h-72 rounded-full bg-primary-light/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              <Star className="w-4 h-4 fill-primary" /> {sectionLabel}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-secondary mb-3 leading-tight">
              {sectionTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {sectionSubtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="google-review-grid" aria-live="polite">
          {loading && (
            <div className="google-review-card text-center">
              <div className="google-review-avatar mx-auto mb-4">G</div>
              <h3>Loading Google reviews...</h3>
              <p>Loading real public reviews from Google.</p>
            </div>
          )}

          {!loading && !!visibleReviews.length && (
            <div className="google-review-list">
              <AnimatePresence mode="popLayout">
                {visibleReviews.map((review, index) => index === active && (
              <motion.article
                key={review.id}
                initial={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0.9, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.22, delay: 0, ease: [0.22, 1, 0.36, 1] }}
                className="google-review-card"
              >
                <div className="flex items-center gap-4 mb-5">
                  {review.profilePhoto ? (
                    <img className="google-review-photo" src={review.profilePhoto} alt={review.author} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="google-review-avatar">{review.author.charAt(0)}</div>
                  )}
                  <div className="min-w-0">
                    <h3>{review.author}</h3>
                    <div className="flex items-center gap-1 text-primary mt-1">
                      {Array.from({ length: Math.max(1, Math.min(5, review.rating)) }).map((_, item) => <Star key={item} className="w-4 h-4 fill-primary" />)}
                    </div>
                    {(review.time || review.role) && <small>{review.time || review.role}</small>}
                  </div>
                </div>
                <p className="google-review-text">"{review.text}"</p>
                {reviews.length > 0 && placeMeta.url && <a href={placeMeta.url} target="_blank" rel="noreferrer" className="google-review-link">View on Google</a>}
              </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && !visibleReviews.length && (
            <div className="google-review-card text-center">
              <div className="google-review-avatar mx-auto mb-4">G</div>
              <h3>Google reviews not available yet</h3>
              <p>{loadError || 'No reviews were returned by Google Places API.'}</p>
            </div>
          )}
        </div>

        {visibleReviews.length > 1 && (
          <div className="google-review-dots" role="tablist" aria-label={`${sectionTitle} slides`}>
            {visibleReviews.map((review, i) => (
              <button key={review.id} type="button" onClick={() => setActive(i)} className={i === active ? 'active' : ''} aria-label={`Show review ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="home-growth-cta py-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5aa02 0%, #f5aa02 48%, #f5aa02 100%)' }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <ScrollReveal>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3a2d05]/90 mb-4 cta-readable-heading">
            Ready to grow?<br />Let us talk strategy.
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#3a2d05]/70 text-base font-semibold mb-7">
            Book a free 30-minute strategy call. We will audit your current digital presence and show you exactly how to scale.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a href="#/contact?focus=message" whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.95 }}
              className="cta-main-button inline-flex min-h-[56px] items-center justify-center bg-white text-secondary px-8 py-4 rounded-xl font-bold text-lg leading-tight text-center shadow-xl hover:shadow-2xl transition-all">
              Book Free Strategy Call
            </motion.a>
          </div>
        </div>
      </ScrollReveal>

      <StaggerContainer staggerDelay={0.1}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 mt-9">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: 'Websites', source: 'Design & Development' },
              { label: 'SEO', source: 'Search Visibility' },
              { label: 'Google Ads', source: 'Campaign Setup' },
              { label: 'CRM', source: 'Business Workflows' },
              { label: 'Support', source: 'Launch Guidance' },
            ].map((award, idx) => (
              <StaggerItem key={idx} direction="up">
                <motion.div whileHover={{ y: -5 }}
                  className="bg-white/82 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/70 shadow-sm cta-proof-chip flex min-h-[74px] flex-col items-center justify-center text-center">
                  <div className="flex w-full items-center justify-center text-center">
                    <span className="text-secondary text-sm font-black">{award.label}</span>
                  </div>
                  <p className="w-full text-center text-secondary/70 text-xs font-semibold leading-tight mt-1">{award.source}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </StaggerContainer>
    </section>
  );
};

const Footer = () => {
  const footerGroups = [
    { title: 'Digital Marketing', links: [
      ['Digital Marketing', '#/digital-marketing'], ['SEO Services', '#/seo-services'], ['PPC & Paid Ads', '#/ppc-paid-ads'], ['Social Media', '#/social-media'], ['Content Marketing', '#/content-marketing'], ['Email Marketing', '#/email-marketing'], ['Lead Generation', '#/lead-generation'], ['Analytics & Reporting', '#/analytics-reporting']
    ]},
    { title: 'Development', links: [
      ['Web Development Services', '#/web-development'], ['App Development Services', '#/app-development'], ['CRM Software Solutions', '#/crm-software'], ['Salon Management Software', '#/salon-software'], ['Business Automation Tools', '#/business-automation'], ['UI/UX Design', '#/uiux-design'], ['E-commerce', '#/e-commerce']
    ]},
    { title: 'Solutions', links: [
      ['Startups', '#/startups'], ['Healthcare', '#/healthcare'], ['Real Estate', '#/real-estate'], ['Enterprise', '#/enterprise'], ['Brand Building', '#/brand-building'], ['Performance Marketing', '#/performance-marketing']
    ]},
    { title: 'Company', links: [
      ['Services', '#/services'], ['Contact Us', '#/contact'], ['About Us', '#/about'], ['Blog', '#/blog'], ['Home', '#/']
    ]},
  ];

  return (
    <footer className="bg-secondary pt-10 pb-6 footer-compact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr_1fr_.8fr] gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Aura Shine Infotech</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">A modern IT company in Mumbai offering website development, app development, CRM software, digital marketing, SEO, and business automation solutions. We help businesses grow with technology-driven strategies.</p>
            <div className="flex items-center gap-3 mt-4">
              <a aria-label="Instagram" href="https://www.instagram.com/aurashineinfotech/" target="_blank" rel="noreferrer" className="footer-social text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/company/aurashineinfotech/?viewAsMember=true" target="_blank" rel="noreferrer" className="footer-social text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a aria-label="Call Aura Shine Infotech at +91 7900129064" href="tel:+917900129064" className="footer-social text-gray-400 hover:text-primary transition-colors"><Phone className="w-5 h-5" /></a>
              <a aria-label="Email Aura Shine Infotech" href="mailto:aurashineinfotech@gmail.com" className="footer-social text-gray-400 hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-gray-400 text-sm hover:text-primary transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6 pt-6 border-t border-white/10 text-sm">
          <a href="tel:+917900129064" className="text-gray-300 hover:text-primary transition-colors"><span className="text-primary font-bold">Phone:</span> +91 7900129064</a>
          <a href="mailto:aurashineinfotech@gmail.com" className="text-gray-300 hover:text-primary transition-colors"><span className="text-primary font-bold">Email:</span> aurashineinfotech@gmail.com</a>
          <p className="text-gray-300"><span className="text-primary font-bold">Address:</span> Kandivali West, Mumbai, Maharashtra, India</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-5 border-t border-white/10 gap-4">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/assets/aurashine-logo.png" alt="Aura Shine Infotech — Best IT Company in Mumbai for Website Development, App Development, CRM Software, and Digital Marketing" width="220" height="48" className="h-12 w-auto max-w-[220px] object-contain" />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span>&copy; 2026 Aura Shine Infotech. All rights reserved.</span>
            <a href="#/" className="text-gray-500 hover:text-primary transition-colors">Home</a>
            <a href="#/services" className="text-gray-500 hover:text-primary transition-colors">Services</a>
            <a href="#/about" className="text-gray-500 hover:text-primary transition-colors">About</a>
            <a href="#/contact" className="text-gray-500 hover:text-primary transition-colors">Contact</a>
            <a href="#/blog" className="text-gray-500 hover:text-primary transition-colors">Blog</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="scroll-to-top-button fixed bottom-5 right-5 sm:bottom-7 sm:right-7 w-12 h-12 rounded-full bg-primary text-secondary shadow-xl shadow-primary/30 flex items-center justify-center z-[2147483646] border border-white/70 opacity-100 visible">
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  );
};


const getPageVisualType = (page) => {
  const title = page.title.toLowerCase();
  if (title.includes('web') || title.includes('website') || title.includes('landing') || title.includes('software') || title.includes('crm') || title.includes('maintenance') || title.includes('startup') || title.includes('enterprise') || title.includes('solution') || title.includes('app')) return 'website';
  if (title.includes('design') || title.includes('brand')) return 'design';
  if (title.includes('analytics') || title.includes('performance')) return 'analytics';
  if (title.includes('ppc') || title.includes('ads') || title.includes('marketing') || title.includes('lead')) return 'campaign';
  if (title.includes('e-commerce')) return 'commerce';
  if (title.includes('healthcare')) return 'healthcare';
  if (title.includes('real estate')) return 'property';
  return 'website';
};

const PAGE_VISUAL_KIND = {
  'Web Development': 'website',
  'App Development': 'app',
  'UI/UX Design': 'design',
  'E-commerce': 'commerce',
  'Custom Software': 'software',
  'API Integration': 'api',
  'Cloud Solutions': 'cloud',
  'Website Maintenance': 'maintenance',
  'Digital Marketing': 'campaign',
  'SEO Services': 'seo',
  'PPC & Paid Ads': 'ads',
  'Social Media': 'social',
  'Social Media Marketing': 'social',
  'Content Marketing': 'content',
  'Email Marketing': 'email',
  'Lead Generation': 'lead',
  'Analytics & Reporting': 'analytics',
  'Startups': 'startup',
  'Healthcare': 'healthcare',
  'Real Estate': 'realestate',
  'Enterprise': 'enterprise',
  'Brand Building': 'brand',
  'Performance Marketing': 'performance',
  'CRM Software': 'software',
  'Salon Software': 'software',
  'Business Automation': 'software',
};

const DevelopmentHeroVisual = ({ page }) => {
  const kind = PAGE_VISUAL_KIND[page.title];
  if (!kind) return null;
  const Icon = page.icon;
  const bullets = page.bullets.slice(0, 4);
  const stats = page.stats.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className={`dev-hero-visual dev-hero-${kind}`}
    >
      <div className="dev-visual-topbar">
        <span /><span /><span />
        <strong>{page.title}</strong>
      </div>

      {kind === 'website' && (
        <div className="dev-browser-layout">
          <div className="dev-browser-hero">
            <small>{page.kicker}</small>
            <h3>{page.title}</h3>
            <p>{page.description}</p>
          </div>
          <div className="dev-browser-grid">
            {bullets.map((item, i) => <b key={item}><small>0{i + 1}</small>{item}</b>)}
          </div>
          <div className="dev-stat-row">{stats.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}

      {kind === 'app' && (
        <div className="dev-phone-layout">
          <div className="dev-phone-shell">
            <div className="dev-phone-notch" />
            <div className="dev-app-head"><Icon className="w-5 h-5" /><span>{page.kicker}</span></div>
            <h3>{page.title}</h3>
            {bullets.map((item, i) => <div className="dev-app-row" key={item}><span>{item}</span><b>{i + 1}</b></div>)}
          </div>
          <div className="dev-phone-side">{stats.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}

      {kind === 'design' && (
        <div className="dev-design-layout">
          <div className="dev-design-canvas">
            <div className="dev-design-hero-block" />
            <div className="dev-design-wire-row"><i /><i /><i /></div>
            <div className="dev-design-frame"><span /> <span /> <span /></div>
          </div>
          <div className="dev-design-panel">
            {['#07152f', '#f5aa02', '#ffffff'].map((color) => <i key={color} style={{ background: color }} />)}
            {bullets.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      )}

      {kind === 'commerce' && (
        <div className="dev-commerce-layout">
          <div className="dev-product-main">
            <ShoppingCart className="w-7 h-7" />
            <h3>{page.title}</h3>
            <p>{page.kicker}</p>
          </div>
          <div className="dev-product-grid">
            {bullets.map((item, i) => <div key={item}><b>{item}</b><span>{['Cart', 'SEO', 'Ads', 'Email'][i] || 'Store'}</span></div>)}
          </div>
        </div>
      )}

      {kind === 'software' && (
        <div className="dev-dashboard-layout">
          <div className="dev-dashboard-chart"><i /><i /><i /><i /></div>
          <div className="dev-dashboard-cards">{bullets.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="dev-stat-row">{stats.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}

      {kind === 'api' && (
        <div className="dev-api-layout">
          {bullets.map((item, i) => (
            <div className="dev-api-node" key={item}>
              <Zap className="w-4 h-4" />
              <span>{item}</span>
              {i < bullets.length - 1 && <i />}
            </div>
          ))}
        </div>
      )}

      {kind === 'cloud' && (
        <div className="dev-cloud-layout">
          <div className="dev-cloud-orbit"><Shield className="w-10 h-10" /></div>
          <div className="dev-server-stack">{bullets.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="dev-stat-row">{stats.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}

      {kind === 'maintenance' && (
        <div className="dev-maintenance-layout">
          <div className="dev-health-ring"><CheckCircle className="w-10 h-10" /><strong>Healthy</strong></div>
          <div className="dev-checklist">{bullets.map((item) => <span key={item}><CheckCircle className="w-4 h-4" />{item}</span>)}</div>
        </div>
      )}

      {kind === 'campaign' && (
        <div className="dev-campaign-layout">
          <div className="dev-funnel-stack">{['Reach', 'Click', 'Lead', 'Sale'].map((item, i) => <span key={item} style={{ width: `${100 - i * 13}%` }}>{item}</span>)}</div>
          <div className="dev-dashboard-cards">{bullets.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}

      {kind === 'seo' && (
        <div className="dev-seo-layout">
          <div className="dev-search-box"><Search className="w-5 h-5" /><span>{page.title}</span></div>
          <div className="dev-rank-list">{bullets.map((item, i) => <span key={item}><b>#{i + 1}</b>{item}</span>)}</div>
        </div>
      )}

      {kind === 'ads' && (
        <div className="dev-ads-layout">
          <div className="dev-ad-preview"><Target className="w-8 h-8" /><h3>Ad Console</h3><p>{page.kicker}</p></div>
          <div className="dev-dashboard-chart"><i /><i /><i /><i /></div>
        </div>
      )}

      {kind === 'social' && (
        <div className="dev-social-layout">
          {bullets.map((item, i) => <div key={item} className="dev-social-card"><Instagram className="w-5 h-5" /><b>{item}</b><span>{['Post', 'Reel', 'Story', 'DM'][i] || 'Social'}</span></div>)}
        </div>
      )}

      {kind === 'content' && (
        <div className="dev-content-layout">
          <div className="dev-document-page"><FileText className="w-6 h-6" />{bullets.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="dev-stat-row">{stats.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}

      {kind === 'email' && (
        <div className="dev-email-layout">
          {bullets.map((item, i) => <div key={item} className="dev-email-card"><Mail className="w-4 h-4" /><span>{item}</span><b>{i + 1}</b></div>)}
        </div>
      )}

      {kind === 'lead' && (
        <div className="dev-lead-layout">
          <div className="dev-lead-meter"><Target className="w-9 h-9" /><strong>Lead Flow</strong></div>
          <div className="dev-api-layout">{bullets.map((item, i) => <div className="dev-api-node" key={item}><Users className="w-4 h-4" /><span>{item}</span>{i < bullets.length - 1 && <i />}</div>)}</div>
        </div>
      )}

      {kind === 'analytics' && (
        <div className="dev-analytics-layout">
          <div className="dev-dashboard-chart"><i /><i /><i /><i /></div>
          <div className="dev-stat-row">{stats.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="dev-dashboard-cards">{bullets.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}

      {['startup', 'enterprise', 'brand', 'performance', 'healthcare', 'realestate'].includes(kind) && (
        <div className={`dev-solution-layout dev-solution-${kind}`}>
          <div className="dev-solution-orbit"><Icon className="w-10 h-10" /><strong>{page.title}</strong></div>
          <div className="dev-solution-grid">{bullets.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="dev-stat-row">{stats.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      )}
    </motion.div>
  );
};

const AnimatedPageVisual = ({ page }) => {
  const shouldAnimate = useLightMotion();
  const Icon = page.icon;
  if (page.animation === 'scroll') return <MarketingSoftwareScroll />;
  const developmentVisual = <DevelopmentHeroVisual page={page} />;
  if (PAGE_VISUAL_KIND[page.title]) return developmentVisual;

  const visualType = getPageVisualType(page);
  const topItems = page.bullets.slice(0, 4);

  if (visualType !== 'phone') {
    const rows = {
      website: ['Home', 'Services', 'Work', 'Contact'],
      design: ['Wireframe', 'UI kit', 'Prototype', 'Handoff'],
      analytics: ['Lead source', 'Conversion rate', 'Campaign ROAS', 'Next action'],
      campaign: ['Audience', 'Creative', 'Landing page', 'Retargeting'],
      commerce: ['Product page', 'Cart recovery', 'Offers', 'Repeat sales'],
      healthcare: ['Appointment CTA', 'Doctor profile', 'Reviews', 'Local search'],
      property: ['Listing page', 'Site visit lead', 'CRM follow-up', 'Virtual tour'],
      search: ['Keyword map', 'Technical audit', 'Content cluster', 'Local SEO'],
      orbit: ['Strategy', 'Launch', 'Measure', 'Scale'],
      cards: ['Plan', 'Build', 'Track', 'Improve'],
    }[visualType] || topItems;

    const isLaptop = true;
    const isDashboard = false;
    return (
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className={`page-device page-device-${visualType} ${isLaptop ? 'page-device-laptop' : ''} ${isDashboard ? 'page-device-dashboard' : ''}`}>
        <div className="page-device-toolbar">
          <span /><span /><span />
          <b>{page.title}</b>
        </div>
        {isLaptop ? (
          <>
            <div className={`page-laptop-hero bg-gradient-to-br ${page.gradient}`}>
              <div><p>{page.kicker}</p><h3>{page.title}</h3></div>
              <a href="#/contact">Enquire</a>
            </div>
            <div className="page-laptop-layout">
              <div className="page-laptop-sidebar">
                {rows.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="page-laptop-content page-website-preview">
                <div className="website-preview-nav">
                  <strong>{page.title}</strong>
                  <span>Live</span>
                </div>
                <div className="website-preview-hero">
                  <div>
                    <small>{page.kicker}</small>
                    <h4>{page.title}</h4>
                    <p>{page.description}</p>
                  </div>
                  <a href="#/contact">Start</a>
                </div>
                <div className="website-preview-grid">
                  {page.bullets.slice(0, 4).map((item, i) => (
                    <b key={item}>
                      <small>0{i + 1}</small>
                      <span>{item}</span>
                    </b>
                  ))}
                </div>
                <div className="website-preview-footer">
                  {page.stats.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </div>
          </>
        ) : isDashboard ? (
          <>
            <div className="page-dashboard-grid">
              {rows.map((item, i) => (
                <div key={item} className="page-dashboard-card">
                  <span>{item}</span>
                  <motion.strong animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 1.8, delay: i * 0.2, repeat: Infinity }}>{['4.8x', '92%', '36', '+28%'][i] || 'Live'}</motion.strong>
                </div>
              ))}
            </div>
            <div className="page-device-bars">
              {[72, 92, 58].map((width, i) => (
                <motion.i key={width} initial={{ width: '24%' }} animate={{ width: `${width}%` }} transition={{ duration: 1.6, delay: i * 0.15, repeat: Infinity, repeatType: 'reverse' }} className={`bg-gradient-to-r ${page.gradient}`} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className={`page-device-hero bg-gradient-to-br ${page.gradient}`}>
              <Icon className="w-9 h-9 text-white" />
              <div><p>{page.kicker}</p><h3>{page.title}</h3></div>
            </div>
            <div className="page-device-grid">
              {rows.map((item, i) => (
                <motion.div key={item} className="page-device-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.16, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}>
                  <div className={`bg-gradient-to-br ${page.gradient}`}><Icon className="w-4 h-4 text-white" /></div>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    );
  }

  if (page.animation === 'phone') {
    return (
      <motion.div initial={{ opacity: 0, rotateY: -25 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ duration: 0.8 }}
        className="relative mx-auto w-72 h-[560px] rounded-[3rem] bg-secondary p-4 shadow-2xl shadow-primary/20 border-8 border-gray-900">
        <div className={`h-full rounded-[2.2rem] bg-gradient-to-br ${page.gradient} p-6 text-white overflow-hidden`}>
          <motion.div animate={shouldAnimate ? { y: [0, -10, 0] } : undefined} transition={shouldAnimate ? { duration: 3, repeat: Infinity } : undefined}>
            <Icon className="w-14 h-14 mb-10" />
          </motion.div>
          <h3 className="text-3xl font-black">{page.title}</h3>
          <div className="mt-10 space-y-4">
            {page.bullets.map((b, i) => <motion.div key={b} initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.12 }} className="bg-white/15 rounded-2xl p-4">{b}</motion.div>)}
          </div>
        </div>
      </motion.div>
    );
  }

  if (page.animation === 'search') {
    return (
      <div className="relative rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-6">
        <motion.div initial={{ width: '25%' }} animate={shouldAnimate ? { width: ['25%', '100%', '70%'] } : undefined} transition={shouldAnimate ? { duration: 4, repeat: Infinity } : undefined} style={shouldAnimate ? undefined : { width: '70%' }} className={`h-3 rounded-full bg-gradient-to-r ${page.gradient} mb-6`} />
        <div className="space-y-4">
          {page.bullets.map((b, i) => (
            <motion.div key={b} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-2xl border bg-gray-50 p-4">
              <Search className="text-primary" />
              <span className="font-semibold text-secondary">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (page.animation === 'design') {
    return (
      <motion.div className="grid grid-cols-2 gap-4" initial="hidden" whileInView="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
        {page.bullets.map((b, i) => (
          <motion.div key={b} variants={{ hidden: { opacity: 0, scale: 0.8, rotate: -6 }, visible: { opacity: 1, scale: 1, rotate: 0 } }}
            whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
            className={`min-h-40 rounded-[2rem] bg-gradient-to-br ${page.gradient} p-6 text-white shadow-xl`}>
            <Palette className="w-9 h-9 mb-6" />
            <p className="font-bold text-xl">{b}</p>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (page.animation === 'cards') {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {page.bullets.map((b, i) => (
          <motion.div key={b}
            initial={{ opacity: 0, x: i % 2 === 0 ? -44 : 44, y: 24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="relative rounded-[2rem] bg-white p-6 border border-gray-100 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-[box-shadow,border-color] duration-300">
            <FloatingEmoji emoji={getCardEmoji(b)} className="-top-2.5 -right-1.5" delay={0.45 + i * 0.12} size="w-8 h-8 text-base" />
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${page.gradient} flex items-center justify-center mb-6`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-black text-secondary">{b}</h4>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-[420px] rounded-[2rem] bg-secondary overflow-hidden">
      <AnimatedBackground dark />
      <motion.div animate={shouldAnimate ? { rotate: 360 } : undefined} transition={shouldAnimate ? { duration: 18, repeat: Infinity, ease: "linear" } : undefined} className={`absolute inset-16 rounded-full border-4 border-primary/30`} />
      <motion.div animate={shouldAnimate ? { scale: [1, 1.12, 1] } : undefined} transition={shouldAnimate ? { duration: 3, repeat: Infinity } : undefined} className={`absolute inset-24 rounded-full bg-gradient-to-br ${page.gradient} blur-2xl opacity-60`} />
      <div className="relative z-10 h-full flex items-center justify-center">
        <Icon className="w-28 h-28 text-white" />
      </div>
    </div>
  );
};

const IncludedScrollSection = ({ page, includedDescription }) => {
  const Icon = page.icon;
  const chips = page.stats || [];
  return (
    <section className="included-scroll-section dev-service-inclusions bg-gray-50">
      <div className="included-scroll-wrap dev-inclusions-wrap">
        <ScrollReveal>
          <div className="included-scroll-heading dev-inclusions-heading">
            <span>Premium deliverables</span>
            <h2>{page.title} package, clean and compact.</h2>
            <p>No long sticky card scroll. Everything important is visible in a shorter, polished grid so the page feels fast, premium, and easy to read.</p>
            <div className="dev-inclusion-chips">
              {chips.map((chip) => <em key={chip}>{chip}</em>)}
            </div>
          </div>
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.07}>
          <div className="included-card-stack dev-inclusions-grid">
            {page.bullets.map((b, i) => (
              <StaggerItem key={b} direction={i % 2 === 0 ? 'up' : 'right'}>
                <motion.article
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: 'easeOut' }}
                  className="included-sticky-card dev-inclusion-card dev-card-glow"
                  whileHover={{ y: -10, scale: 1.025, rotateX: 2, rotateY: -2 }}
                >
                  <FloatingEmoji emoji={getCardEmoji(b)} className="top-3 right-3" delay={0.3 + (i % 3) * 0.15} size="w-8 h-8 text-base" />
                  <div className={`included-card-icon bg-gradient-to-br ${page.gradient}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <h3>{b}</h3>
                    <p>{includedDescription(b, i)}</p>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

const getPageTopic = (page) => {
  const value = `${page.title} ${page.kicker}`.toLowerCase();
  if (value.includes('seo')) return 'search visibility';
  if (value.includes('ppc') || value.includes('ads')) return 'paid campaign performance';
  if (value.includes('social')) return 'social trust and engagement';
  if (value.includes('content')) return 'content authority';
  if (value.includes('email')) return 'email nurturing and retention';
  if (value.includes('lead')) return 'qualified lead flow';
  if (value.includes('analytics')) return 'measurement clarity';
  if (value.includes('web')) return 'website conversion';
  if (value.includes('app')) return 'mobile product experience';
  if (value.includes('software')) return 'business workflow automation';
  if (value.includes('api')) return 'connected system flow';
  if (value.includes('cloud')) return 'reliable hosting and deployment';
  if (value.includes('maintenance')) return 'long-term website health';
  if (value.includes('ui') || value.includes('ux') || value.includes('design')) return 'clear user journeys';
  if (value.includes('startup')) return 'fast launch momentum';
  if (value.includes('commerce')) return 'online store growth';
  if (value.includes('enterprise')) return 'large-team digital operations';
  if (value.includes('brand')) return 'brand trust and recall';
  if (value.includes('performance')) return 'ROI-focused growth';
  if (value.includes('healthcare')) return 'patient acquisition';
  if (value.includes('real estate')) return 'property enquiry generation';
  return page.kicker.toLowerCase();
};

const buildPageDetailCards = (page) => {
  const topic = getPageTopic(page);
  const keyPointCards = (page.keyPoints || []).slice(0, 3).map((point) => ({
    title: point.title,
    desc: point.desc,
  }));
  const processCards = (page.process || []).slice(0, 3).map((step, i) => ({
    title: step,
    desc: `${step} is handled as part of the ${page.title} workflow so the final output supports ${topic}, clear next actions, and a smoother handover.`,
    badge: `Step ${i + 1}`,
  }));
  const bulletCards = (page.bullets || []).slice(0, 3).map((bullet, i) => ({
    title: bullet,
    desc: `${bullet} is planned specifically for ${page.title.toLowerCase()} so visitors see relevant proof, benefits, and conversion paths instead of generic content.`,
    badge: page.stats?.[i] || page.kicker,
  }));

  return [...keyPointCards, ...processCards, ...bulletCards].slice(0, 6);
};

const MorePageDetailSection = ({ page }) => {
  const Icon = page.icon;
  const cards = buildPageDetailCards(page);
  return (
    <section className="py-10 bg-gradient-to-b from-white to-primary/5 page-specific-detail-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-8">
            <span className="text-primary font-bold">{page.title.toUpperCase()} DETAIL</span>
            <h2 className="text-3xl lg:text-4xl font-black text-secondary mt-3">Specific cards for this service and solution.</h2>
            <p className="text-gray-600 mt-4 text-base">The content below is pulled from this page's own deliverables, process, and key points so every sub page feels relevant.</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((item, i) => {
            const col = i % 3; // slide in from the column's own side
            return (
              <motion.div
                key={`${item.title}-${i}`}
                initial={{ opacity: 0, x: col === 0 ? -56 : col === 2 ? 56 : 0, y: col === 1 ? 48 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.75, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative rounded-3xl p-7 bg-white border border-gray-100 shadow-lg h-full page-specific-card hover:shadow-2xl hover:border-primary/30 transition-[box-shadow,border-color] duration-300"
              >
                <FloatingEmoji emoji={getCardEmoji(`${item.title} ${item.badge || ''}`)} className="-top-3 -right-2" delay={0.35 + (i % 3) * 0.12} />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${page.gradient} flex items-center justify-center mb-4 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-primary text-xs font-black uppercase">{item.badge || `0${i + 1}`}</span>
                <h3 className="text-xl font-black text-secondary mt-2 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServiceFAQSection = ({ page }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const name = page.title;
  const lower = name.toLowerCase();
  const focus = lower.includes('web') ? 'website speed, responsive pages, forms, SEO basics and enquiry flow'
    : lower.includes('app') ? 'mobile screens, backend APIs, launch support and user retention'
    : lower.includes('seo') ? 'technical SEO, keywords, local ranking, content structure and reporting'
    : lower.includes('ppc') || lower.includes('ads') ? 'campaign setup, audience targeting, creatives, tracking and ROAS'
    : lower.includes('design') ? 'wireframes, UI screens, prototypes, design system and handoff'
    : lower.includes('analytics') ? 'GA4, conversion events, dashboards, source tracking and monthly insights'
    : lower.includes('email') ? 'automation flows, newsletters, segmentation and retention campaigns'
    : lower.includes('software') ? 'dashboards, CRM workflows, roles, reports and integrations'
    : 'strategy, implementation, tracking, reporting and support';
  const faqs = [
    { q: `What is included in ${name}?`, a: `The service includes ${focus}. We keep the scope practical so every deliverable supports clarity, trust and measurable business action.` },
    { q: `How long does ${name} usually take?`, a: `Small improvements can start within a few days. Full builds or campaigns usually take 1 to 6 weeks depending on pages, features, content, integrations and review rounds.` },
    { q: `Will it work properly on mobile?`, a: `Yes. Layout, text size, tap targets, forms, cards, images and scroll behavior are checked for mobile and desktop separately.` },
    { q: `Can you connect forms, WhatsApp or tracking?`, a: `Yes. We can connect contact forms, WhatsApp actions, call buttons, CRM handoff, analytics events and campaign tracking based on your workflow.` },
    { q: `What do you need from us?`, a: `We need your business details, services, target audience, logo, contact details, references you like, current website or campaign access if available, and any must-have content.` },
  ];
  return (
    <section className="service-faq-section bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <MessageSquare className="w-3.5 h-3.5" /> Service Q&A
            </span>
            <div className="w-20 h-1 rounded-full bg-primary mx-auto mb-5" />
            <h2 className="text-3xl sm:text-5xl font-black text-secondary mt-2">{name} questions answered.</h2>
          </div>
        </ScrollReveal>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.q} delay={i * 0.03}>
              <motion.div className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors bg-white shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-left hover:bg-primary/5 transition-colors">
                  <span className="font-semibold text-secondary pr-4 text-sm sm:text-base">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                    <ChevronDown className="w-4 h-4 text-primary" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-4 sm:px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3 bg-gray-50/70">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const DEVELOPMENT_PAGE_TITLES = new Set([
  'Web Development',
  'App Development',
  'UI/UX Design',
  'E-commerce',
  'Custom Software',
  'API Integration',
  'Cloud Solutions',
  'Website Maintenance',
  'CRM Software',
  'Salon Software',
  'Business Automation',
]);

const MARKETING_PAGE_TITLES = new Set([
  'Digital Marketing',
  'SEO Services',
  'PPC & Paid Ads',
  'Social Media',
  'Social Media Marketing',
  'Content Marketing',
  'Email Marketing',
  'Lead Generation',
  'Analytics & Reporting',
]);

const SOLUTION_PAGE_TITLES = new Set([
  'Startups',
  'Healthcare',
  'Real Estate',
  'Enterprise',
  'Brand Building',
  'Performance Marketing',
]);

const DetailPage = ({ page }) => {
  const Icon = page.icon;
  const isDevelopmentPage = DEVELOPMENT_PAGE_TITLES.has(page.title);
  const isMarketingPage = ['Digital Marketing','SEO Services','PPC & Paid Ads','Social Media','Content Marketing','Email Marketing','Lead Generation','Analytics & Reporting'].includes(page.title);
  const isSolutionPage = ['Startups','Healthcare','Real Estate','Enterprise','Brand Building','Performance Marketing'].includes(page.title);
  const isVisualDetailPage = Boolean(PAGE_VISUAL_KIND[page.title]);
  const includedDescription = (item, index = 0) => {
    const keyPoint = page.keyPoints?.find((point) => point.title.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(point.title.toLowerCase()));
    if (keyPoint) return keyPoint.desc;
    if (page.keyPoints?.[index]) return page.keyPoints[index].desc;
    const service = page.title.toLowerCase();
    if (service.includes('seo')) return `${item} is mapped to search intent, page health, local visibility, and measurable ranking improvement.`;
    if (service.includes('app')) return `${item} is planned for smooth mobile journeys, reliable screens, store readiness, and retention tracking.`;
    if (service.includes('ppc') || service.includes('ads')) return `${item} is set up with audience logic, budget control, creative testing, and clear lead tracking.`;
    if (service.includes('design')) return `${item} is shaped into clean flows, reusable components, accessible states, and developer-ready handoff.`;
    if (service.includes('analytics')) return `${item} is configured to show real actions, source quality, conversion paths, and next-step insights.`;
    if (service.includes('web')) return `${item} is built with responsive layout, fast loading, clean content hierarchy, and enquiry-focused CTAs.`;
    return `${item} supports ${getPageTopic(page)} with page-specific planning, polished execution, responsive checks, and business-focused handover.`;
  };
  return (
    <div className={`min-h-screen bg-white detail-page-shell ${isDevelopmentPage ? 'development-detail-page' : ''} ${isMarketingPage ? 'marketing-detail-page' : ''} ${isSolutionPage ? 'solution-detail-page' : ''} ${isVisualDetailPage ? 'visual-detail-page' : ''}`}>
      {/* Hero */}
      <section className="relative overflow-hidden py-8 detail-hero-section">
        <AnimatedBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6 items-center">
          <ScrollReveal>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${page.gradient} text-white text-sm font-bold mb-5`}>
              <Icon className="w-4 h-4" /> {page.kicker}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-secondary mb-4">{page.title}</h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">{page.description}</p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {page.stats.map((s) => <div key={s} className="rounded-2xl bg-white/100 backdrop-blur border border-gray-100 p-4 shadow-lg"><p className="font-black gradient-text text-xl">{s}</p></div>)}
            </div>
            <div className="flex gap-3">
              <a href="#/contact?focus=message" className="btn-primary inline-flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></a>
              <a href="#/" className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-gray-700 hover:border-primary hover:text-primary transition-colors font-medium text-sm">Back home</a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left">
            <AnimatedPageVisual page={page} />
          </ScrollReveal>
        </div>
      </section>

      {/* Features grid */}
      <IncludedScrollSection page={page} includedDescription={includedDescription} />

      {/* Key Points */}
      {page.keyPoints && (
        <section className="py-14 bg-white development-keypoints-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">How we deliver <span className="gradient-text">real results.</span></h2>
                <p className="text-gray-500 max-w-xl mx-auto">Our approach combines strategy, design, development, content, analytics, and experienced specialists working as an extension of your team. Every service page includes planning, implementation, testing, reporting, and post-launch support.</p>
              </div>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid sm:grid-cols-2 gap-6">
                {page.keyPoints.map((kp, i) => (
                  <StaggerItem key={kp.title} direction={i % 2 === 0 ? 'right' : 'left'}>
                    <motion.div
                      initial={{ opacity: 0, x: i % 2 === 0 ? -52 : 52 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{ duration: 0.75, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -6 }}
                      className="relative flex gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-[box-shadow,border-color]"
                    >
                      <FloatingEmoji emoji={getCardEmoji(kp.title)} className="top-3 right-3" delay={0.4 + (i % 2) * 0.15} size="w-8 h-8 text-base" />
                      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${page.gradient} flex items-center justify-center shadow-lg`}>
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary mb-2">{kp.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{kp.desc}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Process steps */}
      {page.process && (
        <section className="py-14 bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-white text-center mb-8">Our <span className="gradient-text">process</span></h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {page.process.map((step, i) => (
                <motion.div key={step} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ delay: i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, scale: 1.018 }}
                  className="glass-card rounded-2xl p-6 border border-white/10 text-center">
                  <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${page.gradient} flex items-center justify-center mb-4 text-white font-black text-lg shadow-lg`}>
                    {i + 1}
                  </div>
                  <h3 className="text-white font-semibold text-sm">{step}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <MorePageDetailSection page={page} />
      <ServiceFAQSection page={page} />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

const parseHashLocation = () => {
  if (typeof window === 'undefined') return { routeKey: 'home', anchor: '' };
  const rawHash = window.location.hash || '#/';
  if (!rawHash.startsWith('#/')) {
    return { routeKey: 'home', anchor: rawHash.startsWith('#') ? rawHash.slice(1) : '' };
  }
  const hashValue = rawHash.slice(2);
  const anchorIndex = hashValue.indexOf('#');
  const routeKey = anchorIndex === -1 ? hashValue : hashValue.slice(0, anchorIndex);
  const anchor = anchorIndex === -1 ? '' : hashValue.slice(anchorIndex + 1);
  return {
    routeKey: routeKey || 'home',
    anchor: anchor ? decodeURIComponent(anchor) : '',
  };
};

const useHashLocation = () => {
  const [locationState, setLocationState] = useState(parseHashLocation);
  useEffect(() => {
    const onHash = () => setLocationState(parseHashLocation());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return locationState;
};


/* AuraShine V14 custom dedicated pages */

/* ABTL 2026-07-07: About-page structured data (AboutPage + Breadcrumb + local
   business ref + service list). Additive — the site-wide graph in index.html
   is untouched; this is injected/removed by the SEO component per route. */
const ABOUT_PAGE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://aurashineinfotech.com/#/about#webpage',
      'url': 'https://aurashineinfotech.com/#/about',
      'name': 'About Aura Shine Infotech — IT Company in Kandivali West, Mumbai',
      'description': 'Aura Shine Infotech is a software development, web development and digital marketing company in Kandivali West, Mumbai, delivering websites, mobile apps, CRM software, SEO and business automation.',
      'inLanguage': 'en-IN',
      'isPartOf': { '@id': 'https://aurashineinfotech.com/#website' },
      'about': { '@id': 'https://aurashineinfotech.com/#organization' },
      'primaryImageOfPage': 'https://aurashineinfotech.com/assets/aurashine-logo.png'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://aurashineinfotech.com/#/about#breadcrumb',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aurashineinfotech.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'About Us', 'item': 'https://aurashineinfotech.com/#/about' }
      ]
    },
    {
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
      '@id': 'https://aurashineinfotech.com/#organization',
      'name': 'Aura Shine Infotech',
      'alternateName': 'AuraShine Infotech',
      'url': 'https://aurashineinfotech.com/',
      'logo': 'https://aurashineinfotech.com/assets/aurashine-logo.png',
      'image': 'https://aurashineinfotech.com/assets/aurashine-logo.png',
      'description': 'Best IT company in Kandivali West, Mumbai — website development, mobile app development, CRM software, digital marketing, SEO and business automation.',
      'telephone': '+91-7900129064',
      'email': 'aurashineinfotech@gmail.com',
      'foundingDate': '2020',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Kandivali West',
        'addressLocality': 'Mumbai',
        'addressRegion': 'Maharashtra',
        'postalCode': '400067',
        'addressCountry': 'IN'
      },
      'geo': { '@type': 'GeoCoordinates', 'latitude': 19.2094, 'longitude': 72.8487 },
      'areaServed': [
        { '@type': 'City', 'name': 'Kandivali' },
        { '@type': 'City', 'name': 'Mumbai' },
        { '@type': 'City', 'name': 'Borivali' },
        { '@type': 'City', 'name': 'Thane' },
        { '@type': 'City', 'name': 'Navi Mumbai' }
      ],
      'priceRange': '₹₹',
      'openingHours': 'Mo-Sa 10:00-19:00',
      'knowsAbout': [
        'Web Development', 'Mobile App Development', 'Software Development', 'SEO Services',
        'Digital Marketing', 'CRM Software', 'UI/UX Design', 'AI Development', 'Business Automation'
      ],
      'sameAs': [
        'https://www.linkedin.com/company/aurashine-infotech',
        'https://www.instagram.com/aurashineinfotech'
      ]
    }
  ]
};

const V14AboutPage = () => {
  const aboutGlowRef = useRef(null);
  const moveAboutGlow = (event) => {
    if (!aboutGlowRef.current) return;
    aboutGlowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    aboutGlowRef.current.style.opacity = '1';
  };
  const stats = [
    { value: 'Web', label: 'business websites, landing pages and service pages planned for clear enquiries' },
    { value: 'Growth', label: 'SEO structure, Google visibility, ads, content and analytics support' },
    { value: 'Software', label: 'apps, dashboards, CRM flows and custom workflow tools for business teams' },
    { value: 'Support', label: 'responsive checks, launch help, updates and improvement guidance after delivery' }
  ];
  const team = [
    ['Founder & Strategy Lead', 'Shapes the business story, page architecture and launch direction.'],
    ['UI/UX Designer', 'Creates premium visual systems, spacing, cards, motion and mobile-first screens.'],
    ['Full Stack Developer', 'Builds responsive frontends, secure backends, APIs, databases and complete end-to-end product flows.'],
    ['SEO & Content Specialist', 'Plans headings, FAQs, blog structure, metadata and trust-building copy.']
  ];
  const timeline = [
    ['01', 'Discover', 'We understand the offer, audience, competitors, required pages and conversion goals.'],
    ['02', 'Structure', 'We organize sections, CTAs, services, industries, proof blocks and content priorities.'],
    ['03', 'Design', 'We create a premium interface with consistent colors, typography, spacing and motion.'],
    ['04', 'Develop', 'We build responsive React pages, animations, navigation, forms and reusable layouts.'],
    ['05', 'Launch', 'We test pages, polish interactions, prepare handover and guide deployment.'],
    ['06', 'Grow', 'We support blog content, SEO sections, landing pages and continuous improvements.']
  ];
  const why = [
    ['Business Discovery & Strategy', 'Understand your business goals, customer expectations, competitors and market opportunities before development begins. A strong strategy creates the foundation for better digital products and long-term business growth.'],
    ['Solution Planning & Architecture', 'Every website or software solution is carefully planned around your workflows, business objectives and future scalability. The right architecture ensures flexibility, performance and easier expansion.'],
    ['UI/UX Design Experience', 'Design intuitive interfaces, seamless user journeys and responsive layouts that create memorable experiences while improving usability, engagement and customer satisfaction across all devices.'],
    ['Development & Quality', 'Build secure, scalable and high-performance digital solutions using modern technologies, clean development practices and comprehensive quality testing to ensure reliability from day one.'],
    ['Launch & Business Growth', 'Go beyond deployment with SEO foundations, analytics integration, conversion-focused pages and digital strategies that help attract customers, generate leads and increase business opportunities.'],
    ['Ongoing Support & Innovation', 'Keep your digital platform updated with continuous improvements, proactive maintenance, security updates and new feature enhancements that help your business stay competitive as it grows.']
  ];
  const success = [
    ['Restaurant layout', 'Menu, reservation CTA, gallery and local SEO sections planned for direct enquiries.'],
    ['Consulting brand flow', 'Authority-focused service pages, proof areas and lead capture sections for premium enquiries.'],
    ['Startup website system', 'Product story, feature cards, pricing blocks and blog structure planned for early growth.']
  ];
  const heroBadges = [
    { icon: Monitor, label: 'Websites & Apps' },
    { icon: Megaphone, label: 'SEO & Marketing' },
    { icon: Database, label: 'CRM & Automation' },
  ];
  const story = [
    ['01', 'Foundation', 'Started as a focused web studio in Kandivali, Mumbai — building premium business websites with clear enquiry paths.'],
    ['02', 'Expansion', 'Grew into full digital delivery: apps, CRM dashboards, SEO structure, content systems and paid growth campaigns.'],
    ['03', 'Today', 'One team for strategy, design, development and growth — trusted by salons, gyms, healthcare, real estate and startups.'],
  ];
  return (
    <main className="abtl-page-shell bg-white pt-0 overflow-hidden" onMouseMove={moveAboutGlow} onMouseLeave={() => { if (aboutGlowRef.current) aboutGlowRef.current.style.opacity = '0'; }}>
      <span ref={aboutGlowRef} className="abtl-page-mouse-light" aria-hidden="true" />
      {/* ── ABX 2026-07-07: dedicated About hero — premium soft White + Light Gold ── */}
      <section className="relative overflow-hidden abtl-hero text-[#1A1A1A] pt-32 pb-16 lg:pt-40 lg:pb-24" aria-labelledby="about-hero-heading"
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          event.currentTarget.style.setProperty('--about-tilt-x', `${(-y * 3).toFixed(2)}deg`);
          event.currentTarget.style.setProperty('--about-tilt-y', `${(x * 5).toFixed(2)}deg`);
        }}>
        <div className="abtl-blob absolute -top-32 -right-24 w-[34rem] h-[34rem]" style={{ background: 'rgba(245,170,2,.5)' }} aria-hidden="true" />
        <div className="abtl-blob absolute -bottom-40 -left-24 w-[30rem] h-[30rem]" style={{ background: 'rgba(245,170,2,.14)' }} aria-hidden="true" />
        <div className="abtl-dev-hero-bg" aria-hidden="true">
          <span className="abtl-dev-orb abtl-dev-orb-one" />
          <span className="abtl-dev-orb abtl-dev-orb-two" />
          <svg className="abtl-dev-circuit" viewBox="0 0 1200 620" preserveAspectRatio="none">
            <path d="M0 155H170L225 210H390" />
            <path d="M1200 128H1030L970 188H825" />
            <path d="M0 470H145L205 410H350" />
            <path d="M1200 455H1060L990 390H855" />
            <circle cx="225" cy="210" r="6" />
            <circle cx="970" cy="188" r="6" />
            <circle cx="205" cy="410" r="6" />
            <circle cx="990" cy="390" r="6" />
          </svg>
          <div className="abtl-dev-ribbon"><i /><i /><i /></div>
          <div className="abtl-dev-diamond"><i /><i /><i /><i /></div>
          <div className="abtl-dev-particles">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
          <div className="abtl-dev-portal"><i /><i /><i /></div>
          <div className="abtl-dev-sphere">
            <i /><i /><i />
          </div>
          <div className="abtl-dev-stack">
            <i /><i /><i />
          </div>
          {[0, 1].map((cube) => (
            <div className={`abtl-dev-cube abtl-dev-cube-${cube + 1}`} key={cube}>
              {[0, 1, 2, 3, 4, 5].map((face) => <i key={face} />)}
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="homx-pulse-dot abtl-chip mb-6"><Sparkles className="w-4 h-4" /> ABOUT AURASHINE INFOTECH</span>
            <h1 id="about-hero-heading" className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight max-w-5xl mx-auto text-[#1A1A1A]">About Aura Shine Infotech — IT Company in Kandivali West, Mumbai for <span className="abtl-gold-text">Websites, Apps &amp; Software</span></h1>
            <p className="text-lg lg:text-xl text-[#666666] leading-relaxed max-w-3xl mx-auto mb-9">We are a software development, web development and digital marketing company based in Kandivali West, Mumbai. We combine strategy, design, development, SEO, blog architecture and launch support so every page gives visitors more clarity, confidence and reasons to take action.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <motion.a href="#/contact?focus=message" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="abtl-btn-primary">Start Your Project <ArrowRight className="w-4 h-4" /></motion.a>
              <motion.a href="#/blog" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="abtl-btn-secondary">Read Our Insights</motion.a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {heroBadges.map((b, i) => (
                <span key={b.label} className="homx-float inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-bold text-[#3A2E08]" style={{ background: 'rgba(255,255,255,.75)', borderColor: 'rgba(245,170,2,.35)', boxShadow: '0 10px 24px -18px rgba(120,96,30,.4)', backdropFilter: 'blur(8px)', animationDelay: `${i * 0.7}s` }}>
                  <b.icon className="w-4 h-4" style={{ color: '#f5aa02' }} /> {b.label}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <span className="abtl-hero-hairline" aria-hidden="true" />
      </section>

      {/* ── ABTL 2026-07-07: below-hero rebuilt into a bright, premium White + Gold experience ── */}
      <div className="abtl-wrap relative">
      <div className="abtl-page-tech-bg" aria-hidden="true" />
      {/* company story — sticky narrative + milestone spine */}
      <section className="abtl-section py-20 lg:py-28" aria-labelledby="about-story-heading">
        <div className="absolute inset-0 abtl-mesh pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 abtl-dotgrid pointer-events-none opacity-70" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <ScrollReveal direction="right">
            <div className="lg:sticky lg:top-28">
              <span className="abtl-eyebrow">OUR STORY</span>
              <h2 id="about-story-heading" className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-4 mb-5 leading-[1.1]">From a Kandivali web studio to a complete <span className="abtl-gold-text">digital growth partner.</span></h2>
              <p className="text-[#666666] text-lg leading-relaxed mb-4">AuraShine began with one belief: a business website should do real work — explain the offer clearly, earn trust quickly and turn visitors into enquiries. That belief started as a focused <a href="#/web-development-kandivali" className="font-bold text-[#f5aa02] underline decoration-[#f5aa02] underline-offset-4 hover:decoration-[#f5aa02]">web development studio in Kandivali West</a>.</p>
              <p className="text-[#666666] text-lg leading-relaxed">That belief grew into a complete system: premium design, responsive builds, CRM automation, SEO structure and growth campaigns that keep improving after launch.</p>
            </div>
          </ScrollReveal>
          <div className="relative pl-8">
            <span className="abtl-spine" aria-hidden="true" />
            <div className="space-y-6">
              {story.map((s, i) => (
                <motion.div key={s[1]}
                  initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  className="relative">
                  <span className="abtl-node" aria-hidden="true" />
                  <div className="abtl-card p-6 lg:p-7 flex items-start gap-5">
                    <div className="abtl-num-badge">{s[0]}</div>
                    <div>
                      <h3 className="text-2xl font-black text-[#1A1A1A] mb-1.5">{s[1]}</h3>
                      <p className="text-[#666666] leading-relaxed">{s[2]}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* what we deliver — four pillars */}
      <section className="abtl-section py-20 lg:py-24" aria-labelledby="about-deliver-heading">
        <div className="abtl-blob absolute -top-24 right-[8%] w-80 h-80" style={{ background: 'rgba(245,170,2,.16)' }} aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="abtl-chip"><Sparkles className="w-4 h-4" /> WHAT WE DELIVER</span>
              <h2 id="about-deliver-heading" className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-5">Four pillars behind every <span className="abtl-gold-text">AuraShine project.</span></h2>
              <p className="text-lg text-[#666666] leading-relaxed mt-4">Web, growth, software and support — planned together so the website keeps producing enquiries after launch.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, si) => (
              <motion.div key={s.value}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: si * 0.08 }}
                className="abtl-card p-6 h-full">
                <span className="abtl-pill-num mb-4">0{si + 1}</span>
                <h3 className="text-3xl font-black abtl-gold-text mb-2 mt-2">{s.value}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <ScrollReveal>
            <div role="navigation" aria-label="Explore AuraShine services" className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold text-[#666666]">
              <span className="text-[#f5aa02] font-bold">Explore services:</span>
              <a href="#/web-development-kandivali" className="hover:text-[#f5aa02] underline decoration-[#f5aa02] underline-offset-4 hover:decoration-[#f5aa02]">Web Development in Kandivali West</a>
              <span aria-hidden="true" className="text-[#f5aa02]">•</span>
              <a href="#/app-development-mumbai" className="hover:text-[#f5aa02] underline decoration-[#f5aa02] underline-offset-4 hover:decoration-[#f5aa02]">App Development in Mumbai</a>
              <span aria-hidden="true" className="text-[#f5aa02]">•</span>
              <a href="#/digital-marketing" className="hover:text-[#f5aa02] underline decoration-[#f5aa02] underline-offset-4 hover:decoration-[#f5aa02]">Digital Marketing</a>
              <span aria-hidden="true" className="text-[#f5aa02]">•</span>
              <a href="#/seo-services-kandivali" className="hover:text-[#f5aa02] underline decoration-[#f5aa02] underline-offset-4 hover:decoration-[#f5aa02]">SEO Services in Kandivali West</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* mission / vision / values — large panels, elevated centre */}
      <section className="abtl-section py-20 lg:py-24" aria-labelledby="about-drives-heading">
        <div className="absolute inset-0 abtl-dotgrid pointer-events-none opacity-50" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal><div className="text-center max-w-3xl mx-auto mb-14"><span className="abtl-chip"><Heart className="w-4 h-4" /> WHAT DRIVES US</span><h2 id="about-drives-heading" className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-5">Mission, vision and the values behind the work.</h2></div></ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {[
              { icon: Target, tag: 'MISSION', title: 'Explain, impress and convert.', text: 'Help businesses present their services with clarity, modern design and purposeful content so visitors understand the value quickly and feel confident to enquire.' },
              { icon: Rocket, tag: 'VISION', title: 'A trusted partner for growing brands.', text: 'Build long-term digital systems — websites, software, SEO content, blogs, dashboards and campaigns that keep improving after launch.' },
              { icon: Heart, tag: 'VALUES', title: 'Honest work, premium quality.', text: 'Clear communication, realistic timelines, mobile-first quality checks and no fake claims — every page must earn trust for the business it represents.' },
            ].map((c, i) => (
              <ScrollReveal key={c.tag} delay={i * 0.07}>
                <div className={`abtl-panel p-8 h-full ${i === 1 ? 'lg:-mt-4 lg:mb-4' : ''}`}>
                  <span className="abtl-panel-glow" aria-hidden="true" />
                  <div className="relative">
                    <div className="abtl-ico mb-6"><c.icon className="w-7 h-7" /></div>
                    <span className="abtl-pill-num tracking-widest">{c.tag}</span>
                    <h3 className="text-2xl font-black text-[#1A1A1A] mt-3 mb-3">{c.title}</h3>
                    <p className="text-[#666666] leading-relaxed">{c.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* growth timeline — interactive vertical spine with scroll fill */}
      <section className="abtl-section py-20 lg:py-28" aria-labelledby="about-timeline-heading">
        <div className="abtl-blob absolute -bottom-24 left-[6%] w-80 h-80" style={{ background: 'rgba(245,170,2,.4)' }} aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal><div className="text-center max-w-3xl mx-auto mb-16"><span className="abtl-eyebrow">GROWTH TIMELINE</span><h2 id="about-timeline-heading" className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-4">A clear process from first idea to ongoing growth.</h2></div></ScrollReveal>
          <motion.div className="relative pl-12" initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.05 }}>
            <div className="abtl-tl-track" aria-hidden="true">
              <motion.div className="abtl-tl-fill" variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } } }} />
            </div>
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <motion.div key={t[1]}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className="relative">
                  <span className="abtl-tl-node" aria-hidden="true" />
                  <div className="abtl-card p-6 lg:p-7">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="abtl-num-badge">{t[0]}</span>
                      <h3 className="text-2xl font-black text-[#1A1A1A]">{t[1]}</h3>
                    </div>
                    <p className="text-[#666666] leading-relaxed">{t[2]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* why choose us — sticky intro + numbered cards */}
      <section className="abtl-section py-20 lg:py-24" aria-labelledby="about-why-heading">
        <div className="absolute inset-0 abtl-mesh pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-14 items-start">
          <ScrollReveal direction="right">
            <div className="lg:sticky lg:top-28">
              <span className="abtl-chip"><Award className="w-4 h-4" /> WHY CHOOSE US</span>
              <h2 id="about-why-heading" className="text-4xl lg:text-6xl font-black text-[#1A1A1A] mt-5 mb-5 leading-[1.05]">Premium design with practical business thinking.</h2>
              <p className="text-[#666666] text-lg leading-relaxed mb-7">Six working principles shape every AuraShine project — from the first layout draft to post-launch growth.</p>
              <motion.a href="#/contact?focus=message" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="abtl-btn-primary">Work With Us <ArrowRight className="w-4 h-4" /></motion.a>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {why.map((w,i)=><ScrollReveal key={w[0]} delay={i*.04}><div className="abtl-card p-6 lg:p-7 h-full"><div className="flex items-center justify-between mb-4"><CheckCircle className="w-7 h-7" style={{ color: '#f5aa02' }}/><span className="text-[#f5aa02] font-black text-lg">0{i+1}</span></div><h3 className="text-xl font-black text-[#1A1A1A] mb-2.5">{w[0]}</h3><p className="text-[#666666] text-sm leading-relaxed">{w[1]}</p></div></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* team — modern white cards */}
      <section className="abtl-section py-20 lg:py-24" aria-labelledby="about-team-heading">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal><div className="text-center max-w-3xl mx-auto mb-14"><span className="abtl-eyebrow">TEAM SECTION</span><h2 id="about-team-heading" className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-4">A focused team for strategy, design, development and growth.</h2></div></ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m,i)=><ScrollReveal key={m[0]} delay={i*.06}><div className="abtl-card p-7 text-center h-full"><div className="abtl-avatar mx-auto mb-5">{m[0][0]}</div><h3 className="text-xl font-black text-[#1A1A1A] mb-3">{m[0]}</h3><p className="text-[#666666] leading-relaxed text-sm">{m[1]}</p></div></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* client success — editorial split */}
      <section className="abtl-section py-20 lg:py-24" aria-labelledby="about-success-heading">
        <div className="abtl-blob absolute -top-20 right-[8%] w-72 h-72" style={{ background: 'rgba(245,170,2,.14)' }} aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <ScrollReveal direction="right"><div className="lg:sticky lg:top-28"><span className="abtl-eyebrow">CLIENT SUCCESS</span><h2 id="about-success-heading" className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-4 mb-5 leading-[1.1]">Real layouts for real business outcomes.</h2><p className="text-[#666666] text-lg leading-relaxed">Each success story is planned around clearer messaging, better trust, page-specific CTAs and a smoother path from visitor to enquiry.</p></div></ScrollReveal>
          <div className="space-y-5">
            {success.map((s,i)=><ScrollReveal key={s[0]} direction="left" delay={i*.05}><div className="abtl-card p-6 lg:p-7"><div className="flex items-start gap-5"><div className="abtl-num-badge">0{i+1}</div><div><h3 className="text-2xl font-black text-[#1A1A1A] mb-2">{s[0]}</h3><p className="text-[#666666] leading-relaxed">{s[1]}</p></div></div></div></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* about CTA panel */}
      <section className="abtl-section py-20 lg:py-24" aria-labelledby="about-cta-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="abtl-cta px-6 py-14 sm:px-12 lg:px-16 text-center">
              <div className="abtl-blob absolute -top-24 -right-16 w-80 h-80" style={{ background: 'rgba(245,170,2,.2)' }} aria-hidden="true" />
              <div className="abtl-blob absolute -bottom-28 -left-16 w-80 h-80" style={{ background: 'rgba(245,170,2,.4)' }} aria-hidden="true" />
              <div className="relative z-10">
                <span className="abtl-chip mb-6"><Rocket className="w-4 h-4" /> START A PROJECT</span>
                <h2 id="about-cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 max-w-3xl mx-auto text-[#1A1A1A]">Ready to grow? Let&rsquo;s plan a website that earns enquiries.</h2>
                <p className="text-[#666666] text-lg leading-relaxed max-w-2xl mx-auto mb-9">Book a free 30-minute strategy call. We will audit your current digital presence and show you exactly how to scale.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <motion.a href="#/contact?focus=message" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="abtl-btn-primary">Start Your Project <ArrowRight className="w-4 h-4" /></motion.a>
                  <motion.a href="#/services" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="abtl-btn-secondary">Explore Our Services</motion.a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-[#666666]">
                  <span className="inline-flex items-center gap-2"><CheckCircle className="w-4 h-4" style={{ color: '#f5aa02' }} /> Clear timelines</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle className="w-4 h-4" style={{ color: '#f5aa02' }} /> Mobile-first quality checks</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle className="w-4 h-4" style={{ color: '#f5aa02' }} /> No fake claims</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>
    </main>
  );
};
const BLOG_POSTS = [
  { slug:'modern-website-trends', title:'Modern Website Trends for Business Growth', category:'Design', author:'AuraShine Editorial', read:'7 min read', image:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop', excerpt:'Premium layouts, motion effects, trust sections and conversion-focused journeys that help modern businesses grow.', points:['Start with a clear business promise and one primary CTA.','Use motion to guide attention without slowing the page.','Design reusable cards, proof blocks and content sections for long-term growth.'] },
  { slug:'uiux-principles', title:'UI/UX Principles That Make Websites Feel Premium', category:'Design', author:'AuraShine Design Team', read:'7 min read', image:'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1800&auto=format&fit=crop', excerpt:'Learn how spacing, hierarchy, responsive structure and interaction feedback improve the complete website experience.', points:['Use large headings and short paragraphs for scanning.','Group related information into clear cards.','Make mobile layouts feel as intentional as desktop.'] },
  { slug:'high-converting-homepage', title:'How to Design a High-Converting Homepage', category:'Design', author:'AuraShine Design Team', read:'6 min read', image:'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1800&auto=format&fit=crop', excerpt:'A practical guide to creating a homepage with strong messaging, clear sections, trust signals and focused calls to action.', points:['Lead with one clear value proposition above the fold.','Use proof sections like testimonials and stats to build trust early.','End every homepage section with a single focused CTA.'] },
  { slug:'color-psychology-brands', title:'Website Color Psychology for Modern Brands', category:'Design', author:'AuraShine Design Team', read:'5 min read', image:'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1800&auto=format&fit=crop', excerpt:'Understand how brand colors influence trust, emotion, readability and customer decisions across digital experiences.', points:['Choose a primary brand color that matches your industry tone.','Use contrast ratios that meet accessibility standards.','Limit your palette to 2–3 core colors with neutral fallbacks.'] },
  { slug:'mobile-first-mistakes', title:'Mobile-First Design Mistakes Businesses Should Avoid', category:'Design', author:'AuraShine Design Team', read:'6 min read', image:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1800&auto=format&fit=crop', excerpt:'Common responsive design problems that create poor mobile experiences and reduce leads, engagement and conversions.', points:['Design for 375px viewport first, then scale up to desktop.','Ensure every tap target is at least 44px for comfortable touch.','Test real content on real phones, not just browser resizing.'] },
  { slug:'typography-rules', title:'Typography Rules for Clean and Professional Websites', category:'Design', author:'AuraShine Design Team', read:'5 min read', image:'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1800&auto=format&fit=crop', excerpt:'Improve readability and visual hierarchy by choosing the right fonts, sizes, weights, spacing and line lengths.', points:['Limit your font families to a heading and a body pair.','Keep line lengths between 60 and 75 characters for readability.','Use font weight and size contrast to create clear hierarchy.'] },
  { slug:'micro-interactions-ux', title:'How Micro-Interactions Improve User Experience', category:'Design', author:'AuraShine Design Team', read:'6 min read', image:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1800&auto=format&fit=crop', excerpt:'Explore how subtle hover states, button feedback, transitions and motion can make digital products feel more polished.', points:['Add hover lift effects on cards and buttons for clear feedback.','Use loading states and confirmations so users know actions registered.','Keep transitions under 300ms to stay responsive and non-intrusive.'] },
  { slug:'service-pages-enquiries', title:'Designing Service Pages That Generate Enquiries', category:'Design', author:'AuraShine Design Team', read:'7 min read', image:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop', excerpt:'Structure service pages with clear benefits, proof, process, FAQs and conversion-focused calls to action.', points:['Open with a benefit-driven headline, not just the service name.','Add proof elements like reviews, case studies and client logos near the CTA.','End with a focused FAQ section that removes buying objections.'] },
  { slug:'seo-beginners-guide-2026', title:"Complete Beginner's Guide to SEO in 2026", category:'SEO', author:'AuraShine Growth Team', read:'14 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1800&auto=format&fit=crop', excerpt:'Learn how search engines work, crawling, indexing, ranking, search intent, keyword research, technical SEO, local SEO, AI search, GEO and beginner best practices.', points:['Understand crawling, indexing and ranking before chasing keywords.','Use search intent to choose the right page type for each query.','Build SEO foundations that work for traditional and AI-powered search.'] },
  { slug:'on-page-seo-checklist-business-websites', title:'On-Page SEO Checklist for Business Websites', category:'SEO', author:'AuraShine Growth Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover title tags, meta descriptions, heading hierarchy, URLs, keyword placement, internal linking, image optimization, content quality, schema and practical optimization tips.', points:['Write titles, descriptions and headings that match buyer intent.','Improve internal links, image SEO and visible content quality.','Use schema to help search engines understand useful page sections.'] },
  { slug:'local-seo-strategies-more-customers', title:'Local SEO Strategies That Bring More Customers', category:'SEO', author:'AuraShine Growth Team', read:'13 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain Google Business Profile optimization, reviews, local citations, NAP consistency, Maps rankings, local keywords, service pages, schema and local SEO best practices.', points:['Optimize Google Business Profile with complete service and location details.','Build reviews, citations and NAP consistency across trusted platforms.','Create local landing pages that convert nearby searchers into enquiries.'] },
  { slug:'technical-seo-explained-simply', title:'Technical SEO Explained Simply', category:'SEO', author:'AuraShine Growth Team', read:'13 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover XML sitemaps, robots.txt, crawling, indexing, canonical tags, redirects, HTTPS, structured data, Core Web Vitals, crawl budget and technical SEO audits.', points:['Make important pages crawlable, indexable and technically reliable.','Use canonicals, redirects and HTTPS correctly during site changes.','Connect technical health with mobile performance and search visibility.'] },
  { slug:'keyword-research-drives-traffic', title:'Keyword Research That Actually Drives Traffic', category:'SEO', author:'AuraShine Growth Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain search intent, keyword difficulty, long-tail keywords, competitor research, keyword clustering, topical authority, content planning and modern keyword research tools.', points:['Prioritize search intent and business value before search volume.','Cluster related keywords into service pages, guides and FAQs.','Use competitor research to find gaps instead of copying headings.'] },
  { slug:'common-seo-mistakes-hurt-rankings', title:'Common SEO Mistakes That Hurt Rankings', category:'SEO', author:'AuraShine Growth Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1800&auto=format&fit=crop', excerpt:'Discuss keyword stuffing, duplicate content, thin pages, broken links, poor mobile experience, slow websites, missing metadata, poor internal linking and tracking mistakes with practical solutions.', points:['Fix thin, duplicated and over-optimized pages before publishing more content.','Repair broken links, metadata gaps and weak internal linking.','Track conversions so ranking improvements connect to business outcomes.'] },
  { slug:'seo-vs-paid-ads-business', title:'SEO vs Paid Ads: Which Is Better for Your Business?', category:'SEO', author:'AuraShine Growth Team', read:'10 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1800&auto=format&fit=crop', excerpt:'Compare SEO and PPC in terms of cost, ROI, speed, scalability, lead quality, long-term growth and when businesses should combine both strategies.', points:['Use paid ads for speed and SEO for compounding long-term visibility.','Compare channels by qualified leads and closed revenue, not clicks alone.','Combine PPC data with SEO content planning for stronger growth.'] },
  { slug:'core-web-vitals-performance-guide', title:'Core Web Vitals & Website Performance Guide', category:'SEO', author:'AuraShine Growth Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain LCP, INP, CLS, caching, lazy loading, image optimization, code splitting, CDN usage, Lighthouse audits and website speed optimization.', points:['Improve LCP, INP and CLS on the pages that drive enquiries.','Use caching, lazy loading and image optimization to reduce page weight.','Monitor real-user Core Web Vitals after every major website update.'] },
  { slug:'ai-changing-seo-geo', title:'How AI Is Changing SEO & GEO', category:'SEO', author:'AuraShine Growth Team', read:'13 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover AI-powered search, Google AI Overviews, ChatGPT, Generative Engine Optimization, semantic search, EEAT, entity SEO, AI-generated content and the future of search.', points:['Structure content so AI search can understand, summarize and cite it.','Strengthen EEAT with proof, author signals, reviews and real examples.','Use GEO to complement SEO instead of replacing search fundamentals.'] },
  { slug:'ultimate-seo-audit-checklist', title:'The Ultimate SEO Audit Checklist', category:'SEO', author:'AuraShine Growth Team', read:'15 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1800&auto=format&fit=crop', excerpt:'Create a complete SEO audit guide covering technical SEO, on-page SEO, content quality, backlinks, performance, security, mobile optimization, structured data, indexing and maintenance checklists.', points:['Audit technical, content, link, mobile and performance issues together.','Prioritize fixes by severity, business impact and implementation effort.','Create a maintenance routine so SEO health does not decay after launch.'] },
  { slug:'restaurant-website-direct-bookings', title:'Restaurant Website Guide for Better Direct Bookings', category:'Industry', author:'AuraShine Industry Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain how restaurants can increase reservations with modern websites, online menus, ordering, table booking, Google Maps, local SEO and customer engagement.', points:['Place direct booking and ordering CTAs above the fold.','Build searchable menu pages instead of PDF-only menus.','Use local SEO and customer engagement to increase repeat visits.'] },
  { slug:'salon-spa-website-appointments', title:'Salon & Spa Website Features That Increase Appointments', category:'Industry', author:'AuraShine Industry Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover online booking, memberships, loyalty programs, packages, before-after galleries, reviews, WhatsApp integration and automated reminders.', points:['Make appointment booking simple and mobile-first.','Use before-after galleries and reviews to build trust.','Automate reminders, memberships and loyalty follow-ups.'] },
  { slug:'real-estate-website-more-leads', title:'Real Estate Website Features That Generate More Leads', category:'Industry', author:'AuraShine Industry Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1800&auto=format&fit=crop', excerpt:'Discuss property listings, advanced search, virtual tours, mortgage calculators, CRM integration, lead forms and WhatsApp enquiries.', points:['Create rich property listings with filters and clear enquiry actions.','Use virtual tours and calculators to qualify serious buyers.','Connect leads to CRM and WhatsApp with property context.'] },
  { slug:'healthcare-website-clinics-hospitals', title:'Healthcare Website Best Practices for Clinics & Hospitals', category:'Industry', author:'AuraShine Industry Team', read:'13 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover appointment booking, patient portals, accessibility, privacy considerations, trust building, doctor profiles and online consultations.', points:['Build trust with doctor profiles, departments and patient-friendly content.','Make appointment booking and online consultations clear.','Protect privacy and improve accessibility on every device.'] },
  { slug:'manufacturing-websites-build-trust', title:'Manufacturing Company Websites That Build Trust', category:'Industry', author:'AuraShine Industry Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain product catalogs, certifications, process pages, enquiry forms, downloadable brochures, case studies and B2B lead generation.', points:['Show product specifications, capabilities and certifications clearly.','Use process pages and case studies to build procurement trust.','Capture qualified RFQs with structured enquiry forms.'] },
  { slug:'ecommerce-trends-online-stores', title:'E-commerce Trends Every Online Store Should Know', category:'Industry', author:'AuraShine Industry Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover UX, checkout optimization, payment methods, personalization, AI recommendations, speed optimization and conversion strategies.', points:['Improve product discovery, checkout speed and mobile UX.','Use personalization and payment options to lift conversions.','Track cart, checkout and repeat purchase behavior.'] },
  { slug:'education-websites-student-enrolment', title:'Education Websites That Improve Student Enrolment', category:'Industry', author:'AuraShine Industry Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1800&auto=format&fit=crop', excerpt:'Discuss online admissions, course pages, student portals, events, faculty profiles, testimonials and lead generation.', points:['Create dedicated course and admissions pages.','Use faculty profiles, events and testimonials to build confidence.','Automate brochure delivery and counsellor follow-up.'] },
  { slug:'hotel-travel-website-bookings', title:'Hotel & Travel Website Features That Increase Bookings', category:'Industry', author:'AuraShine Industry Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover booking engines, travel packages, itineraries, image galleries, reviews, payment gateways, offers and local SEO.', points:['Promote direct-booking benefits and package clarity.','Use premium galleries, reviews and secure payment options.','Create local SEO pages for destinations and attractions.'] },
  { slug:'fitness-gym-websites-members', title:'Fitness & Gym Websites That Convert Visitors Into Members', category:'Industry', author:'AuraShine Industry Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain memberships, trainer profiles, schedules, online classes, transformations, payment integration and retention strategies.', points:['Compare membership plans and class schedules clearly.','Use trainer profiles and transformations to create trust.','Automate trial bookings, renewals and retention reminders.'] },
  { slug:'automotive-websites-more-enquiries', title:'Automotive Business Websites That Drive More Enquiries', category:'Industry', author:'AuraShine Industry Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover vehicle inventory, service booking, financing calculators, comparison tools, customer reviews and lead generation.', points:['Make inventory searchable with detailed vehicle pages.','Add finance calculators, service booking and test-drive flows.','Connect every enquiry to CRM with vehicle context.'] },
  { slug:'custom-vs-off-the-shelf-software', title:'Custom Software vs Off-the-Shelf Software: Which Is Right for Your Business?', category:'Software', author:'AuraShine Product Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1800&auto=format&fit=crop', excerpt:'Compare custom software with ready-made solutions, discussing scalability, cost, flexibility, maintenance, security and long-term ROI.', points:['Compare long-term ownership, subscription cost and flexibility.','Choose custom software when workflows are unique or integration-heavy.','Use ready-made tools when standard features are enough.'] },
  { slug:'crm-software-increase-sales', title:'How CRM Software Helps Businesses Increase Sales', category:'Software', author:'AuraShine Product Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain lead management, customer tracking, sales pipelines, automation, reporting, integrations and business growth.', points:['Centralize leads, customers and follow-ups in one system.','Use pipelines and automation to improve sales consistency.','Track conversion reports by lead source and sales stage.'] },
  { slug:'erp-systems-explained-businesses', title:'ERP Systems Explained: Everything Businesses Need to Know', category:'Software', author:'AuraShine Product Team', read:'13 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover inventory management, HR, finance, procurement, manufacturing, reporting, implementation challenges and business benefits.', points:['Connect departments through shared operational data.','Plan ERP modules around inventory, finance, HR and reporting needs.','Reduce implementation risk with phased rollout and training.'] },
  { slug:'custom-business-management-system', title:'Why Every Growing Business Needs a Custom Business Management System', category:'Software', author:'AuraShine Product Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800&auto=format&fit=crop', excerpt:'Discuss replacing spreadsheets with centralized software for operations, finance, staff, clients, inventory and reporting.', points:['Replace spreadsheet chaos with centralized workflows.','Connect operations, finance, staff and client records.','Use dashboards to make faster business decisions.'] },
  { slug:'ai-transforming-business-software', title:'How AI Is Transforming Modern Business Software', category:'Software', author:'AuraShine Product Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain AI assistants, predictive analytics, workflow automation, chatbots, document processing, recommendation engines and future trends.', points:['Use AI assistants to summarize and support daily work.','Apply predictive analytics and recommendations to business decisions.','Connect AI to real workflows with human oversight.'] },
  { slug:'saas-vs-custom-software-costs', title:'SaaS vs Custom Software Development: Pros, Cons & Costs', category:'Software', author:'AuraShine Product Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop', excerpt:'Compare subscription-based SaaS products with custom-built software, including ownership, scalability, security, customization and pricing.', points:['Compare subscription fees with long-term ownership value.','Understand where SaaS configuration ends and custom needs begin.','Review data ownership, security and migration before deciding.'] },
  { slug:'software-development-lifecycle-explained', title:'Software Development Lifecycle (SDLC) Explained', category:'Software', author:'AuraShine Product Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover planning, requirements, UI/UX design, development, testing, deployment, maintenance, Agile methodology and best practices.', points:['Use planning and requirements to reduce project risk.','Prototype UI/UX before development cost increases.','Treat testing, deployment and maintenance as core project stages.'] },
  { slug:'business-automation-saves-time-costs', title:'How Business Automation Saves Time and Reduces Costs', category:'Software', author:'AuraShine Product Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1800&auto=format&fit=crop', excerpt:'Discuss workflow automation, approvals, notifications, scheduling, invoicing, CRM automation and operational efficiency.', points:['Automate repeated approvals, reminders and operational tasks.','Reduce errors with structured workflows and notifications.','Measure time saved and revenue protected after launch.'] },
  { slug:'right-tech-stack-software-project', title:'Choosing the Right Tech Stack for Your Next Software Project', category:'Software', author:'AuraShine Product Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain frontend, backend, databases, cloud services, APIs, scalability, security and technology selection based on business goals.', points:['Choose frontend, backend and databases based on business goals.','Plan APIs, cloud, security and scalability early.','Avoid trendy choices that are hard to maintain.'] },
  { slug:'modern-business-software-essential-features', title:'Essential Features Every Modern Business Software Should Have', category:'Software', author:'AuraShine Product Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover role-based access, dashboards, analytics, security, mobile responsiveness, notifications, integrations, cloud backup, audit logs and API support.', points:['Add role-based access, dashboards and analytics from the start.','Protect data with security, backups and audit logs.','Use APIs and integrations to keep software future-ready.'] },
  { slug:'complete-digital-marketing-guide', title:'Complete Digital Marketing Guide for Business Growth', category:'Marketing', author:'AuraShine Marketing Team', read:'14 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover SEO, PPC, social media, content marketing, email marketing, branding, analytics and how businesses can build a complete digital marketing strategy.', points:['Balance organic and paid channels for short-term and long-term growth.','Connect every marketing activity to measurable business outcomes.','Use analytics to guide budget decisions across channels.'] },
  { slug:'social-media-marketing-generate-leads', title:'Social Media Marketing Strategies That Actually Generate Leads', category:'Marketing', author:'AuraShine Marketing Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain platform selection, content planning, engagement, reels, short-form videos, paid promotions, influencer collaborations and lead generation.', points:['Choose platforms based on where your audience actually spends time.','Combine organic content with paid campaigns for reach and leads.','Use short-form video to grow awareness and engagement.'] },
  { slug:'google-ads-vs-meta-ads-roi', title:'Google Ads vs Meta Ads: Which Platform Delivers Better ROI?', category:'Marketing', author:'AuraShine Marketing Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop', excerpt:'Compare Google Ads and Facebook/Instagram Ads based on audience intent, targeting, cost, conversions, industries and business goals.', points:['Use Google Ads for high-intent search capture.','Use Meta Ads for awareness, education and remarketing.','Let conversion data decide budget allocation.'] },
  { slug:'content-marketing-trust-sales', title:'Content Marketing That Builds Trust and Sales', category:'Marketing', author:'AuraShine Marketing Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover blogs, videos, case studies, guides, newsletters, storytelling, content funnels and long-term authority building.', points:['Mix blogs, videos and case studies for a complete content strategy.','Map content to awareness, consideration and decision stages.','Measure business outcomes, not just pageviews.'] },
  { slug:'email-marketing-best-practices', title:'Email Marketing Best Practices for Higher Conversions', category:'Marketing', author:'AuraShine Marketing Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1800&auto=format&fit=crop', excerpt:'Discuss email sequences, newsletters, automation, segmentation, personalization, lead nurturing and performance tracking.', points:['Use automated sequences for consistent lead nurturing.','Segment lists by interest, source and behavior.','Track conversions per email, not just opens.'] },
  { slug:'brand-positioning-stand-out', title:'Brand Positioning: How to Stand Out in a Competitive Market', category:'Marketing', author:'AuraShine Marketing Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain branding, messaging, unique value proposition, visual identity, customer perception and consistency across channels.', points:['Define a clear value proposition and core messaging.','Maintain brand consistency across every customer touchpoint.','Let customer perception guide positioning refinement.'] },
  { slug:'local-marketing-small-businesses', title:'Local Marketing Strategies for Small Businesses', category:'Marketing', author:'AuraShine Marketing Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1800&auto=format&fit=crop', excerpt:'Cover Google Business Profile, local SEO, community engagement, reviews, WhatsApp marketing, local ads and referral programs.', points:['Optimize Google Business Profile with complete business details.','Build local trust through reviews and community engagement.','Use WhatsApp and referral programs to grow local reach.'] },
  { slug:'marketing-automation-save-time-revenue', title:'Marketing Automation: Save Time and Increase Revenue', category:'Marketing', author:'AuraShine Marketing Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain CRM automation, lead nurturing, email workflows, chatbots, scheduling, customer journeys and reporting.', points:['Automate lead capture, follow-up and nurturing workflows.','Use chatbots and email automation for timely communication.','Measure and optimize automations based on conversion data.'] },
  { slug:'measure-marketing-roi-professional', title:'How to Measure Marketing ROI Like a Professional', category:'Marketing', author:'AuraShine Marketing Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop&hue=30', excerpt:'Cover KPIs, CAC, ROAS, ROI, conversion tracking, Google Analytics, attribution models and dashboard reporting.', points:['Track conversions and revenue, not just traffic and clicks.','Calculate CAC and ROAS per channel for real ROI visibility.','Use dashboards to guide monthly budget decisions.'] },
  { slug:'marketing-funnel-convert-visitors', title:'Building a Marketing Funnel That Converts Visitors Into Customers', category:'Marketing', author:'AuraShine Marketing Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop', excerpt:'Explain awareness, consideration, conversion, retention, remarketing, landing pages, lead magnets, CTAs and optimization techniques.', points:['Map content and campaigns to each funnel stage.','Create focused landing pages for conversion.','Use remarketing and retention to reduce wasted spend.'] },
  { slug:'digital-transformation-strategy', title:'Digital Transformation Strategy for Modern Businesses', category:'Strategy', author:'AuraShine Strategy Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1800&auto=format&fit=crop', excerpt:'Learn how to build a digital transformation strategy covering technology adoption, workflows, data, culture, leadership and implementation.', points:['Start transformation with business goals, not technology.','Redesign workflows before automating them.','Phase the work and measure progress at every stage.'] },
  { slug:'scalable-business-2026', title:'How to Build a Scalable Business in 2026', category:'Strategy', author:'AuraShine Strategy Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop', excerpt:'Learn how to build a scalable business with repeatable systems, technology, processes, teams and growth frameworks.', points:['Build repeatable systems before hiring at scale.','Use technology that grows with your business.','Plan finances for the growth stage you are entering.'] },
  { slug:'business-growth-strategies-work', title:'Business Growth Strategies That Actually Work', category:'Strategy', author:'AuraShine Strategy Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1800&auto=format&fit=crop', excerpt:'Practical business growth strategies including market penetration, product development, partnerships, pricing and customer expansion.', points:['Focus on leverage from existing assets.','Customer expansion is often the easiest win.','Use frameworks and measure every initiative.'] },
  { slug:'customer-acquisition-strategy', title:'Creating a Winning Customer Acquisition Strategy', category:'Strategy', author:'AuraShine Strategy Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1800&auto=format&fit=crop', excerpt:'Learn how to create a customer acquisition strategy covering channels, funnels, cost optimization, lead quality and growth planning.', points:['Know your customer before choosing channels.','Design funnels with clear stage objectives.','Connect acquisition with retention.'] },
  { slug:'digital-brand-strategy', title:'How to Build a Strong Digital Brand Strategy', category:'Strategy', author:'AuraShine Strategy Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1800&auto=format&fit=crop', excerpt:'Build a digital brand strategy covering identity, messaging, content, social media, SEO, reputation and consistent brand experience.', points:['Brand strategy covers identity, messaging and experience.','Consistency builds recognition.','Measure brand strength through multiple signals.'] },
  { slug:'data-driven-decision-making', title:'Data-Driven Decision Making for Business Leaders', category:'Strategy', author:'AuraShine Strategy Team', read:'10 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop', excerpt:'Learn data-driven decision making using dashboards, analytics, KPIs, reporting frameworks and practical business intelligence.', points:['Data improves decision quality.','Dashboards should be actionable.','Every KPI should connect to a goal.'] },
  { slug:'business-process-optimization', title:'Business Process Optimization: Increase Efficiency & Profitability', category:'Strategy', author:'AuraShine Strategy Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop', excerpt:'Business process optimization covering workflow analysis, efficiency improvements, automation, measurement and continuous improvement.', points:['Map processes before optimizing them.','Eliminate waste before automating.','Build a culture of continuous improvement.'] },
  { slug:'customer-retention-strategies', title:'Customer Retention Strategies That Drive Long-Term Growth', category:'Strategy', author:'AuraShine Strategy Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1800&auto=format&fit=crop', excerpt:'Customer retention strategies covering loyalty programs, customer experience, feedback loops, communication, personalization and lifetime value.', points:['Retention is more profitable than acquisition.','Customer experience drives loyalty.','Personalization increases lifetime value.'] },
  { slug:'scaling-business-technology-automation', title:'Scaling Your Business with Technology & Automation', category:'Strategy', author:'AuraShine Strategy Team', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1800&auto=format&fit=crop&sat=-50', excerpt:'Learn how to scale business operations using technology, automation, CRM, ERP, AI tools and operational systems.', points:['Technology should support scalable workflows.','CRM and ERP are foundational.','People and process matter as much as tools.'] },
  { slug:'competitive-advantage-digital-age', title:'Building a Competitive Advantage in the Digital Age', category:'Strategy', author:'AuraShine Strategy Team', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1800&auto=format&fit=crop', excerpt:'Build competitive advantage through differentiation, innovation, customer experience, technology, data and strategic positioning.', points:['Differentiation must be clear to customers.','Customer experience is a key differentiator.','Build durable moats that compound over time.'] },
  { slug:'ultimate-guide-content-marketing', title:'The Ultimate Guide to Content Marketing', category:'Content', author:'AuraShine Editorial', read:'14 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1800&auto=format&fit=crop', excerpt:'The ultimate guide to content marketing covering strategy, content types, distribution, SEO, analytics, planning and long-term authority building.', points:['Content marketing starts with strategy, not publishing.','Mix formats for a complete content system.','Distribution is as important as creation.'] },
  { slug:'content-that-converts-visitors', title:'How to Create Content That Converts Visitors into Customers', category:'Content', author:'AuraShine Editorial', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1800&auto=format&fit=crop&v=content-converts', excerpt:'Learn how to create conversion-focused content using CTAs, proof elements, clarity, trust signals and funnel-aligned writing.', points:['Conversion content addresses real objections.','Clarity and proof drive action.','Create content for every funnel stage.'] },
  { slug:'blog-writing-google-rankings', title:'Blog Writing Best Practices for Higher Google Rankings', category:'Content', author:'AuraShine Editorial', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1800&auto=format&fit=crop&hue=20', excerpt:'Blog writing best practices covering SEO structure, keyword placement, readability, internal linking, content depth and ranking optimization.', points:['Structure content for both readers and search engines.','Depth and originality improve rankings.','Keep content fresh and updated.'] },
  { slug:'copywriting-techniques-increase-sales', title:'Copywriting Techniques That Increase Sales', category:'Content', author:'AuraShine Editorial', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1800&auto=format&fit=crop', excerpt:'Copywriting techniques covering headline formulas, persuasion principles, CTAs, storytelling, objection handling and conversion writing.', points:['Headlines determine whether copy is read.','CTAs should be clear and relevant.','Stories create emotional connection.'] },
  { slug:'video-content-marketing-strategies', title:'Video Content Marketing Strategies for Modern Brands', category:'Content', author:'AuraShine Editorial', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1800&auto=format&fit=crop', excerpt:'Video content marketing strategies covering planning, production, distribution, YouTube, short-form video, live streaming and analytics.', points:['Video strategy should serve business goals.','Start simple and improve over time.','Analytics drive continuous improvement.'] },
  { slug:'successful-content-calendar', title:'Building a Successful Content Calendar', category:'Content', author:'AuraShine Editorial', read:'10 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop', excerpt:'Learn how to build a content calendar covering planning, themes, scheduling, collaboration, consistency and content operations.', points:['A content calendar prevents random publishing.','Clear workflows support consistency.','Balance structure with flexibility.'] },
  { slug:'storytelling-in-marketing', title:'Storytelling in Marketing: Connect With Your Audience', category:'Content', author:'AuraShine Editorial', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1800&auto=format&fit=crop', excerpt:'Learn storytelling in marketing covering narrative frameworks, emotional connection, brand stories, customer stories and content storytelling.', points:['Stories make marketing messages stick.','Customer stories build authentic trust.','Incorporate stories across all content types.'] },
  { slug:'repurposing-content-multiple-platforms', title:'Repurposing Content Across Multiple Platforms', category:'Content', author:'AuraShine Editorial', read:'10 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1800&auto=format&fit=crop', excerpt:'Content repurposing strategies covering adaptation, formats, platforms, workflows, efficiency and multi-channel distribution.', points:['Repurposing maximizes content value.','Match formats to platforms.','Track performance by format and platform.'] },
  { slug:'ai-content-creation-best-practices', title:'AI Content Creation: Best Practices & Common Mistakes', category:'Content', author:'AuraShine Editorial', read:'11 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1800&auto=format&fit=crop&v=ai-content-card', excerpt:'AI content creation best practices covering workflow integration, quality control, originality, brand voice, ethics and common mistakes.', points:['AI accelerates content creation.','Human editing ensures quality and originality.','Always verify facts and maintain standards.'] },
  { slug:'measuring-content-marketing-success', title:'Measuring Content Marketing Success with Analytics', category:'Content', author:'AuraShine Editorial', read:'12 min read', date:'July 16, 2026', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop&hue=60', excerpt:'Content marketing analytics covering KPIs, GA4, conversion tracking, attribution, content ROI and reporting frameworks.', points:['Define KPIs aligned with content goals.','Track assisted conversions for full attribution.','Optimize based on regular performance reviews.'] }
];

const getBlogImage = (image, width = 900) => {
  if (!image || !image.includes('images.unsplash.com')) return image;
  const withWidth = image.includes('w=') ? image.replace(/([?&])w=\d+/, `$1w=${width}`) : `${image}${image.includes('?') ? '&' : '?'}w=${width}`;
  return withWidth.includes('q=') ? withWidth.replace(/([?&])q=\d+/, '$1q=72') : `${withWidth}&q=72`;
};

const V14BlogPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const featured = BLOG_POSTS[0];
  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];
  const filtered = BLOG_POSTS.filter(p => (category === 'All' || p.category === category) && (p.title + p.excerpt + p.category + p.author).toLowerCase().includes(query.toLowerCase()));
  return (
    <main className="bg-white pt-0 overflow-hidden">
      <section className="pt-28 pb-24 bg-gradient-to-br from-secondary via-secondary to-slate-900 text-white relative overflow-hidden">
        <AnimatedBackground dark />
        <div className="homx-float absolute top-24 right-[8%] hidden lg:flex w-12 h-12 rounded-2xl items-center justify-center pointer-events-none" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(0,229,255,.4)', backdropFilter: 'blur(8px)', zIndex: 5 }} aria-hidden="true"><FileText className="w-5 h-5 text-primary-light" /></div>
        <div className="homx-float absolute bottom-16 left-[5%] hidden lg:flex w-11 h-11 rounded-full items-center justify-center pointer-events-none" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', backdropFilter: 'blur(8px)', animationDelay: '1.6s', zIndex: 5 }} aria-hidden="true"><Sparkles className="w-5 h-5 text-primary-light" /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-8 items-center">
          <ScrollReveal><span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light text-sm font-bold mb-5"><FileText className="w-4 h-4"/> AURASHINE BLOG</span><h1 className="text-5xl lg:text-7xl font-black mb-6">A complete knowledge hub for websites, software, SEO and digital growth.</h1><p className="text-xl text-gray-300 leading-relaxed">Explore featured insights, categories, search, author cards, article detail pages, related posts and newsletter-ready content blocks.</p></ScrollReveal>
          <ScrollReveal direction="left"><a href={`#/blog/${featured.slug}`} className="block rounded-[2rem] overflow-hidden bg-white/10 border border-white/10 shadow-2xl hover:-translate-y-2 transition-all"><img src={getBlogImage(featured.image, 1100)} alt={featured.title} loading="eager" decoding="async" className="h-72 w-full object-cover"/><div className="p-7"><span className="text-primary-light font-bold">FEATURED / {featured.category}</span><h2 className="text-3xl font-black mt-2 mb-3">{featured.title}</h2><p className="text-gray-300">{featured.excerpt}</p><div className="mt-5 inline-flex items-center gap-2 text-primary-light font-bold">Read featured article <ArrowRight className="w-4 h-4"/></div></div></a></ScrollReveal>
        </div>
      </section>

      <section className="blx-filterbar py-6 lg:py-8 bg-white/90 border-b border-gray-100 sticky top-20 z-20 shadow-sm" style={{ backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:max-w-md"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search articles, categories or authors..." className="w-full rounded-2xl border border-gray-200 py-4 pl-12 pr-4 outline-none focus:border-primary shadow-sm" /></div>
          <div className="flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`px-5 py-3 rounded-full font-bold text-sm transition-all ${category===c?'bg-primary text-white shadow-lg':'bg-gray-100 text-gray-700 hover:bg-primary/10'}`}>{c}</button>)}</div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal><div className="text-center max-w-3xl mx-auto mb-14"><span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20"><FileText className="w-4 h-4" /> ARTICLES</span><h2 className="text-4xl lg:text-5xl font-black text-secondary mt-5">Practical guides with <span className="homx-shimmer-text">real detail pages.</span></h2></div></ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post,i)=>{
              const cardThemes=[
                { accent:'from-[#f5aa02] to-[#f5aa02]', badge:'bg-[#f5aa02] text-[#111827]', border:'border-[#f5aa02]/30', hover:'hover:border-[#f5aa02]/60', bar:'from-[#f5aa02] via-[#f5aa02] to-transparent', num:'text-[#f5aa02]' },
                { accent:'from-[#111827] to-[#1e293b]', badge:'bg-[#111827] text-[#f5aa02]', border:'border-[#111827]/30', hover:'hover:border-[#111827]/60', bar:'from-[#111827] via-[#334155] to-transparent', num:'text-[#111827]' },
                { accent:'from-[#f5aa02] to-[#f5aa02]', badge:'bg-[#f5aa02] text-white', border:'border-[#f5aa02]/30', hover:'hover:border-[#f5aa02]/60', bar:'from-[#f5aa02] via-[#f5aa02] to-transparent', num:'text-[#f5aa02]' },
                { accent:'from-[#0b1220] to-[#1e293b]', badge:'bg-[#0b1220] text-[#f5aa02]', border:'border-[#0b1220]/30', hover:'hover:border-[#0b1220]/60', bar:'from-[#0b1220] via-[#334155] to-transparent', num:'text-[#0b1220]' },
                { accent:'from-[#f5aa02] to-[#f5aa02]', badge:'bg-[#f5aa02] text-[#111827]', border:'border-[#f5aa02]/30', hover:'hover:border-[#f5aa02]/60', bar:'from-[#f5aa02] via-[#f5aa02] to-transparent', num:'text-[#f5aa02]' },
                { accent:'from-[#1e293b] to-[#0b1220]', badge:'bg-[#1e293b] text-[#f5aa02]', border:'border-[#1e293b]/30', hover:'hover:border-[#1e293b]/60', bar:'from-[#1e293b] via-[#334155] to-transparent', num:'text-[#1e293b]' },
                { accent:'from-[#f5aa02] to-[#f5aa02]', badge:'bg-[#f5aa02] text-[#111827]', border:'border-[#f5aa02]/30', hover:'hover:border-[#f5aa02]/60', bar:'from-[#f5aa02] via-[#f5aa02] to-transparent', num:'text-[#f5aa02]' },
                { accent:'from-[#07152f] to-[#111827]', badge:'bg-[#07152f] text-[#f5aa02]', border:'border-[#07152f]/30', hover:'hover:border-[#07152f]/60', bar:'from-[#07152f] via-[#1e293b] to-transparent', num:'text-[#07152f]' },
              ];
              const t=cardThemes[i%cardThemes.length];
              return (
                <ScrollReveal key={post.slug} delay={0}>
                  <a href={`#/blog/${post.slug}`} className={`blx-card bg-white rounded-[2rem] overflow-hidden border ${t.border} ${t.hover} shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all h-full block`}>
                    <div className="blx-thumb-wrap overflow-hidden relative">
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.bar} z-10`}></div>
                      <img src={getBlogImage(post.image, 720)} alt={post.title} loading={i < 6 ? 'eager' : 'lazy'} decoding="async" className="blx-thumb h-56 w-full object-cover"/>
                      <span className={`blog-category-pill absolute top-4 left-4 px-3 py-1.5 rounded-full ${t.badge} text-xs font-black shadow-lg`}>{post.category}</span>
                    </div>
                    <div className="p-7">
                      <div className="flex items-center justify-between text-xs font-bold mb-3">
                        <span className="text-gray-400 uppercase tracking-wider">Article</span>
                        <span className={t.num}>{post.read}</span>
                      </div>
                      <h3 className="text-2xl font-black text-secondary mb-3">{post.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-5">{post.excerpt}</p>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-gray-500">By {post.author}</span>
                        <span className={`blx-readmore font-bold inline-flex items-center gap-2 ${t.num}`}>Read <ArrowRight className="w-4 h-4"/></span>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
          {filtered.length === 0 && <div className="text-center py-16 text-gray-500 font-semibold">No articles found. Try another keyword or category.</div>}
        </div>
      </section>

      <section className="py-16 bg-secondary text-white relative overflow-hidden">
        <AnimatedBackground dark/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8 items-start">
          <ScrollReveal><div><span className="text-primary-light font-bold">AUTHOR CARDS</span><h2 className="text-4xl font-black mt-3">Written by design, growth and product specialists.</h2><p className="text-gray-300 mt-4">Each author profile adds credibility and makes the blog feel like a real publishing system.</p></div></ScrollReveal>
          {['Editorial Team','Growth Team','Product Team'].map((a,i)=><ScrollReveal key={a} delay={i*.08}><motion.div whileHover={{ y: -8 }} className="bg-white/10 rounded-[2rem] p-7 border border-white/10 h-full"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center font-black text-2xl mb-5">{a[0]}</div><h3 className="text-2xl font-black">AuraShine {a}</h3><p className="text-gray-300 mt-3">Focused on practical guidance for better websites, stronger content, cleaner software and growth-ready digital systems.</p></motion.div></ScrollReveal>)}
        </div>
      </section>

      <CTASection />
    </main>
  );
};

const DESIGN_BLOG_CONTENT = {
  'modern-website-trends': {
    paragraphs: [
      `Web design moves fast, and what looked modern two years ago can make a business feel outdated today. The trends that actually matter in 2026 are the ones that help businesses convert visitors, not just win design awards. Bento-style grids, bold type pairings, dark mode defaults, and scroll-driven animations are everywhere — but the real shift is toward layouts that guide people toward a single action instead of scattering attention across ten competing elements.`,
      `AI-driven personalization is changing how websites feel to each visitor. Instead of showing the same static homepage to everyone, smart sites now swap hero sections, reorder service blocks, and adjust CTAs based on where the visitor came from and what they are likely looking for. A first-time visitor from a Google search sees something different than a returning user who already explored three service pages, and that kind of relevance keeps people engaged longer.`,
      `Motion design has matured beyond flashy page transitions. The best modern sites use subtle scroll reveals, hover feedback on cards, and animated counters that fire only when they scroll into view. These small movements create a sense of polish without slowing the page down. The rule of thumb is simple: if the animation helps the visitor understand what to do next, keep it. If it is just decoration, cut it.`,
      `Dark mode is no longer a novelty — visitors expect it. Offering a toggle between light and dark themes shows attention to user comfort, especially for people who browse at night or in low-light environments. From a design perspective, dark backgrounds with light text also make gold accents and bright CTAs pop in ways that flat white pages cannot match, which is why so many premium brands have adopted this approach.`,
      `Component-driven design systems are replacing one-off page builds. Instead of designing every new page from scratch, growing businesses now build reusable card patterns, CTA bands, testimonial blocks, and FAQ accordions that stay consistent across the entire site. This approach keeps the visual identity tight, speeds up new page launches, and makes it much easier to update the design language without rebuilding everything.`,
      `The businesses that stay ahead are the ones that treat their website as a living product rather than a finished project. Quarterly design reviews, A/B testing on key pages, regular performance audits, and content refreshes keep the site competitive. Trends come and go, but a website that loads fast, communicates clearly, and adapts to visitor behavior will keep generating leads long after the latest visual fad fades.`,
    ],
    extraPoints: [
      'Audit your current site against 2026 layout patterns — bento grids, dark mode, scroll reveals — and list three upgrades that would improve conversion, not just appearance.',
      'Add personalization to at least one page: swap the hero headline or reorder service cards based on traffic source and measure the effect on scroll depth and enquiry rate.',
      'Build a small component library of cards, CTAs and proof blocks so every new page launches faster and stays visually consistent with the rest of the site.',
    ],
  },
  'uiux-principles': {
    paragraphs: [
      `Premium websites do not feel premium because of expensive animations or trendy color schemes. They feel that way because every element on the page has a clear purpose and the spacing between elements gives the eye room to breathe. Whitespace is not empty space — it is a design tool that separates ideas, creates rhythm, and makes content easier to scan. The difference between a professional site and an amateur one often comes down to how generously the layout uses space.`,
      `Visual hierarchy is what tells a visitor where to look first, second, and third. Large headings act as signposts that let people scan without reading every word, and short paragraphs between them give the eye resting points. When the size contrast between a heading and body text is strong enough, the page feels organized even before the visitor reads a single sentence. Weak hierarchy is why some pages feel cluttered even when they have very little content.`,
      `Consistency across every component is what separates a polished site from one that feels stitched together. Identical border radius on every card, the same shadow depth across all elevated surfaces, uniform padding inside similar blocks, and a single button style for primary actions — these details are invisible when done right but painfully obvious when one element breaks the pattern. Users notice inconsistency even if they cannot explain why something feels off.`,
      `Responsive design is not about making things smaller for mobile. It is about recomposing the layout so each screen size feels intentional. On a phone, headings should be shorter rather than just scaled down, buttons should sit in the lower thumb zone, and secondary content should collapse cleanly behind toggles. A page that looks good on desktop but cramped on a 375px screen is not responsive — it is just scaled.`,
      `Interaction feedback tells users that the system registered their action. A button that changes shade on hover, a form field that highlights its border when focused, a card that lifts slightly when touched — these responses create confidence. Without them, visitors click twice, wonder if the page is broken, or leave. The best feedback is subtle, fast (under 200ms), and consistent across every interactive element on the site.`,
      `User experience is not something you fix at the end. It is a habit that starts with understanding what each visitor needs from a page and ends with testing that the page actually delivers it. Heatmaps, scroll-depth tracking, session recordings, and simple post-enquiry surveys all turn opinions into evidence. The most common UX problem on business websites is not ugly design — it is unclear next steps, and that costs enquiries every day.`,
    ],
    extraPoints: [
      'Walk through your site on a 375px phone and list every heading that wraps awkwardly, every button that feels too small to tap, and every card that breaks the spacing pattern.',
      'Pick one component — a service card, a testimonial block, or a CTA band — and make every instance on the site match exactly: same radius, same padding, same shadow.',
      'Add interaction feedback to every interactive element: hover lift on cards, focus ring on form fields, color shift on buttons. Keep it under 200ms and consistent everywhere.',
    ],
  },
  'high-converting-homepage': {
    paragraphs: [
      `A homepage has about three seconds to answer the visitor's first question: am I in the right place? The hero section needs one clear benefit statement, a short supporting line, and a single high-contrast call to action. Anything beyond that — multiple headlines, competing buttons, auto-playing video — splits attention and reduces the chance that the visitor takes any action at all. Clarity in the first screen wins more conversions than all the visual polish below the fold.`,
      `Trust signals belong close to the decision point, not buried at the bottom of the page. A testimonial, a row of client logos, or a star rating placed within one scroll of the hero removes doubt at the exact moment the visitor is deciding whether to keep scrolling or leave. The most common mistake is saving all the social proof for the bottom, where most visitors never reach.`,
      `Every section on a homepage should earn its place by pushing visitors toward one action. If a section does not support a click, a call, a form fill, or a scroll to a proof block, it is visual noise that dilutes conversion. The best homepages feel tight because every strip has a job — hero earns attention, services explain, proof removes doubt, and the final CTA converts.`,
      `Heatmaps consistently show that the very bottom of a page gets far fewer clicks than the middle. Placing a secondary conversion point — a short enquiry form or a WhatsApp button — around the 60% scroll mark catches visitors at peak engagement before their attention drops off. One mid-page CTA often generates more leads than the final footer section.`,
      `What you measure determines what you improve. Tracking hero CTA clicks, scroll depth, time on page, and bounce rate in GA4 gives you the signal to act on. A beautiful homepage with a high bounce rate usually means the headline promises something the rest of the page does not deliver, or the first scroll does not reinforce the promise made in the hero.`,
      `Most homepage visitors arrive on phones, which means the mobile experience is the real homepage. After every content change, check the hero text size, the CTA button tap target, how many scrolls it takes to reach the first proof block, and whether any section feels cramped. A five-minute phone test after every update prevents slow conversion decay that is hard to diagnose later.`,
    ],
    extraPoints: [
      'Rewrite your hero section to answer three questions in under ten words: what you do, for whom, and what the visitor should do next.',
      'Move one trust element — testimonial, logo row, or star rating — to within one scroll of the hero and measure whether scroll depth improves.',
      'Place a secondary CTA (short form or WhatsApp button) at the 60% scroll point and track whether mid-page conversions increase in the first two weeks.',
    ],
  },
  'color-psychology-brands': {
    paragraphs: [
      `Color is one of the fastest decisions a visitor makes — before reading a single word, the palette already communicates something about the brand. Blue signals trust and stability, which is why finance and technology companies lean toward it. Gold suggests premium quality and warmth. Green communicates growth, health, or sustainability. The color you choose for your primary brand element should match the emotion your audience needs to feel when they land on the site.`,
      `A dark navy background with gold accents is a popular combination because the two colors reinforce each other: navy reads as professional and grounded, while gold adds energy and a premium feel. This pairing also produces strong contrast ratios that keep text accessible and easy to read, which is a practical benefit beyond aesthetics. When the palette works on accessibility tools, it works for everyone.`,
      `Color palettes should never be chosen in isolation. Test every color against real content: white text on dark backgrounds, dark text on light backgrounds, and accent colors on small interactive elements like badges, buttons, and hover states. A color that looks stunning in a design tool can fail badly when placed against real photography or dense body text, so always validate in context.`,
      `Every brand palette needs neutral fallback colors. Off-whites like warm cream and soft grays keep background sections calm and let the accent color draw attention without overwhelming the reader. These neutrals also create breathing room between content blocks, which is especially important on long pages where visual fatigue can set in quickly.`,
      `Accessibility standards are not optional guidelines — they are the minimum for a usable website. WCAG requires a 4.5:1 contrast ratio for body text and 3:1 for large text. Tools like WebAIM Contrast Checker help identify combinations that look beautiful but fail real-world readability. Failing accessibility also means excluding visitors with visual impairments, which is both a legal risk and a lost audience.`,
      `Brand color consistency across every touchpoint — website, social media profiles, email signatures, presentations, and print materials — reinforces recognition and professionalism. When the website uses one shade of blue and the Instagram page uses a different one, the inconsistency quietly undermines the trust the site is trying to build. Document your palette with exact hex values and stick to them everywhere.`,
    ],
    extraPoints: [
      'Run your current palette through WebAIM Contrast Checker and fix any combinations that fall below the 4.5:1 ratio for body text.',
      'Pick one accent color and apply it consistently to all interactive elements — buttons, badges, hover states, and focus rings — across every page.',
      'Create a simple color reference document with exact hex values for primary, secondary, accent, and neutral colors and share it with everyone who creates brand materials.',
    ],
  },
  'mobile-first-mistakes': {
    paragraphs: [
      `The most damaging mobile design mistake is building for desktop first and then shrinking everything to fit a phone screen. This approach creates tiny tap targets, cramped text, and call-to-action buttons buried below the fold where most visitors never reach them. The correct approach is to design for 375px first, make sure every element works for thumbs and small screens, and then expand to tablet and desktop layouts.`,
      `Hidden content hurts both user trust and search rankings. Accordions and tabs that hide key information behind extra taps mean many visitors never see it, and Google indexes the mobile version of your site — so content that is collapsed or hidden on phones may not contribute to search visibility. Important information should be visible without requiring the visitor to guess where to tap.`,
      `Auto-playing carousels and hero sliders are one of the most persistent bad habits in web design. They waste bandwidth on mobile, distract from the main message, and research consistently shows that most visitors never swipe past the first slide. A single static image with a clear headline and one call to action loads faster and converts better than any rotating banner.`,
      `Forms with too many fields are the number one killer of mobile conversions. Every extra input field increases the likelihood that the visitor abandons the form entirely. For initial enquiries, ask only for a name, a contact method, and one qualifying question. Additional details can be collected after the first response, when the visitor has already committed to the conversation.`,
      `Fixed headers and sticky elements that work perfectly on a wide desktop screen often cover 20% or more of a phone's viewport. In some cases, a sticky header can hide a call-to-action button or block the top of a form from view. After adding any fixed element, check on a real phone that it does not eat critical screen space or block interactive content.`,
      `Testing only on iPhone is not enough. Android devices with screen widths of 360px and 412px are among the most common in markets like India, and they expose layout issues that Safari on iPhone never shows. After every significant content or layout change, open the page on a real Android device and check text overflow, image sizing, button spacing, and overall readability.`,
    ],
    extraPoints: [
      'Open your homepage on a 375px device and list every element that feels too small to tap, every heading that wraps awkwardly, and every CTA that requires scrolling to reach.',
      'Remove or simplify any form that asks for more than three fields on mobile — name, contact method, and one qualifier are enough for an initial enquiry.',
      'Test your site on a real Android device with 360px or 412px width after every content update and check for overflow, stacking issues, and tap target spacing.',
    ],
  },
  'typography-rules': {
    paragraphs: [
      `Typography is the backbone of every website, yet it is often treated as an afterthought. The choices you make about fonts, sizes, spacing, and weight directly affect how quickly visitors can scan and understand your content. A page with strong typography feels effortless to read, while poor typography makes even excellent content feel exhausting. The difference shows up in how long people stay, how much they read, and whether they take action.`,
      `Two font families are the practical maximum for most business websites — one for headings and one for body text. Adding a third font creates visual noise and adds to page load time, especially on mobile devices where font rendering is slower. A heading font with personality paired with a clean, readable body font is usually enough to establish a premium feel without overcomplicating the design.`,
      `Line length has a direct impact on readability. Body text should stay between 60 and 75 characters per line — shorter on mobile. Lines that are too wide force the eye to travel too far, which causes fatigue and makes it harder to track from the end of one line to the beginning of the next. Lines that are too narrow break the reading rhythm and feel choppy.`,
      `Font weight contrast creates hierarchy more reliably than size alone. A bold or semibold heading sitting above regular-weight body text creates clear visual separation even when both are similar in size. This weight difference is what makes a page feel structured and easy to navigate, even for visitors who are scanning rather than reading word by word.`,
      `Line height is the invisible factor that determines whether a paragraph feels open or claustrophobic. Body text needs a line height between 1.6 and 1.8 to give the eye room to travel comfortably between lines. Tight spacing makes paragraphs feel dense and unreadable, while overly loose spacing disconnects the lines and disrupts the reading flow.`,
      `Limit your type scale to four or five sizes. A main heading, a subheading, body text, a small caption, and badge text cover every need on a typical business page. Too many sizes create inconsistency that makes the page feel unpolished, even if the visitor cannot pinpoint what is wrong. A consistent scale also makes the design system easier to maintain as the site grows.`,
    ],
    extraPoints: [
      'Count the characters in your longest body text lines — if any exceed 75 characters on desktop or 50 on mobile, adjust the container width or font size.',
      'Audit your type scale and remove any sizes that are used only once. Most business sites need no more than five distinct text sizes.',
      'Set body text line height to 1.7 and test a full page of content on a real phone — if paragraphs feel dense, increase to 1.8; if they feel loose, drop to 1.6.',
    ],
  },
  'micro-interactions-ux': {
    paragraphs: [
      `Micro-interactions are the small, purposeful responses a website gives when a visitor acts — a button that changes color on hover, a card that lifts slightly when touched, a form field that highlights its border when focused. These tiny moments are what make a digital interface feel alive rather than static. Without them, visitors click and wonder whether anything happened, which creates doubt and slows down the journey toward conversion.`,
      `The best micro-interactions are fast and subtle. Transitions under 300 milliseconds feel responsive without drawing attention to themselves, while anything longer starts to feel sluggish. The goal is not to impress the visitor with animation skill — it is to confirm that the system recognized their action and is responding. When the feedback is nearly instantaneous, the interface feels trustworthy.`,
      `Loading states are a critical category of micro-interaction that many sites overlook. When a form is submitting or a page is loading, the visitor needs a signal that the system is working. A skeleton loader, a progress bar, or even a subtle pulse animation prevents the anxiety that leads to repeated clicking, page refreshes, or abandonment. Silence during a loading moment is one of the fastest ways to lose a conversion.`,
      `Consistency across micro-interactions is essential for a coherent experience. If one card lifts on hover, every card on the site should lift on hover. If one button has a color transition, every button should behave the same way. Mixing interaction styles across different sections makes the interface feel like it was built by multiple teams who never talked to each other.`,
      `Motion should support content, not compete with it. Animated number counters on a stats section, progress bars on a case study, and scroll-linked reveals on feature lists all add energy to data-heavy areas. The key is subtlety — the animation should make the content more memorable, not distract from it. When in doubt, make the motion shorter, smaller, and slower.`,
      `Always respect the prefers-reduced-motion setting. Some users have vestibular disorders that cause real physical discomfort from unnecessary animation. A simple CSS media query can disable or reduce transitions for those users, improving accessibility without affecting the experience for everyone else. This is not a nice-to-have — it is a basic consideration for inclusive design.`,
    ],
    extraPoints: [
      'Add hover lift and focus ring feedback to every card and button on your site — keep transitions under 200ms and make sure every interactive element responds to both hover and keyboard focus.',
      'Add a visible loading state to every form submission and asynchronous action — a spinner, progress bar, or skeleton loader — so visitors always know the system is working.',
      'Add a prefers-reduced-motion media query that disables or shortens all transitions and animations for users who have requested reduced motion in their system settings.',
    ],
  },
  'service-pages-enquiries': {
    paragraphs: [
      `A service page has one job: turn a visitor into an enquiry. Everything on the page — headline, body text, proof elements, process section, and call to action — should be designed around that single goal. The most common mistake is treating the service page as a brochure that lists features and capabilities without connecting any of it to the visitor's actual problem or the action they should take next.`,
      `The headline on a service page should state the outcome, not just the service name. "Websites that turn visitors into qualified leads" performs better than "Web Design Services" because it answers the visitor's real question: what will this do for me? When the headline speaks to a result the visitor cares about, they keep reading. When it just names a service category, they bounce.`,
      `Proof elements — client logos, star ratings, review quotes, and short case study snippets — need to sit directly beside or above the primary call to action. Trust at the moment of decision reduces hesitation and increases clicks. The worst placement for social proof is at the very bottom of the page, where only the most committed visitors ever reach it.`,
      `Every service page needs a visible process section that answers the question: what happens after I enquire? A simple three or four step timeline — Discovery, Design, Development, Launch — removes uncertainty and makes the next step feel manageable. Visitors who understand the process are more likely to start it than visitors who are staring at a button with no idea what comes after clicking it.`,
      `One primary call to action per service page, repeated two or three times in different positions: hero, mid-page, and bottom. Secondary actions like "View portfolio" or "Read case study" should be visually quieter than the main conversion button so they do not compete for attention. When everything looks equally important, nothing stands out.`,
      `Thin service pages hurt both conversion and search performance. A page with a paragraph and a contact form does not give visitors enough reason to enquire, and it does not give search engines enough context to rank it. Aim for 800 to 1200 words of genuine detail — deliverables, timelines, pricing context, and real proof — to satisfy both human readers and search algorithms.`,
    ],
    extraPoints: [
      'Rewrite your service page headline to state the outcome or benefit instead of the service name — test it against the current version and measure which generates more enquiries.',
      'Move one trust element — testimonial, logo bar, or star rating — to directly above or beside the primary CTA on each service page.',
      'Add a visible 3-step process section to every service page that answers "what happens after I click?" and place it between the body content and the final CTA.',
    ],
  },
};


const V18BlogDetailPage = ({ post }) => {
  if (!post) {
    return (
      <main className="bg-white pt-0 overflow-hidden">
        <section className="pt-40 pb-24 bg-secondary text-white relative overflow-hidden">
          <AnimatedBackground dark />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-bold text-sm mb-6">404 — ARTICLE NOT FOUND</span>
            <h1 className="text-4xl sm:text-5xl font-black mb-5">We couldn&rsquo;t find that article.</h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-9">The blog post you are looking for doesn&rsquo;t exist or may have been moved. Browse the latest articles instead.</p>
            <a className="btn-primary" href="#/blog">Back to Blog</a>
          </div>
        </section>
      </main>
    );
  }
  const seoArticle = SEO_BLOG_DETAILS[post.slug] || INDUSTRY_BLOG_DETAILS[post.slug] || SOFTWARE_BLOG_DETAILS[post.slug] || MARKETING_BLOG_DETAILS[post.slug] || STRATEGY_BLOG_DETAILS[post.slug] || CONTENT_BLOG_DETAILS[post.slug];
  if (seoArticle) {
    const seoPosts = BLOG_POSTS.filter(p => p.category === post.category);
    const currentIndex = seoPosts.findIndex(p => p.slug === post.slug);
    const previousPost = seoPosts[(currentIndex - 1 + seoPosts.length) % seoPosts.length];
    const nextPost = seoPosts[(currentIndex + 1) % seoPosts.length];
    const relatedPosts = seoPosts.filter(p => p.slug !== post.slug).slice(0, 3);
    const getSectionId = (section) => section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: seoArticle.metaDescription,
      image: post.image,
      datePublished: seoArticle.publishDate,
      author: { '@type': 'Organization', name: post.author },
      publisher: { '@type': 'Organization', name: 'AuraShine Infotech' },
      mainEntityOfPage: `https://aurashineinfotech.com/blog/${post.slug}`
    };
    return (
      <main className="bg-[#fbfaf7] pt-0 overflow-hidden">
        <SEO title={post.title} description={seoArticle.metaDescription} path={`/blog/${post.slug}`} ogImage={post.image} ogType="article" keywords={`${post.title}, SEO, search engine optimization, AuraShine Infotech`} jsonLd={jsonLd} />
        <section className="pt-32 pb-16 bg-gradient-to-br from-[#07111f] via-[#111827] to-[#1f2937] text-white relative overflow-hidden">
          <AnimatedBackground dark />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(245,170,2,.18),transparent_30%),radial-gradient(circle_at_82%_15%,rgba(245,170,2,.12),transparent_28%)]"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.02fr_.98fr] gap-10 items-center">
            <ScrollReveal>
              <span className="blog-meta-pill inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-bold text-sm mb-5 border border-white/10">{post.category} / {post.read}</span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">{post.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">{post.excerpt}</p>
              <div className="flex flex-wrap gap-3 text-sm font-bold text-primary-light"><span>{seoArticle.publishDate}</span><span>/</span><span>By {post.author}</span></div>
            </ScrollReveal>
            <ScrollReveal direction="left"><img src={getBlogImage(post.image, 1200)} alt={post.title} loading="eager" decoding="async" className="rounded-[2rem] shadow-2xl w-full h-[360px] lg:h-[460px] object-cover border border-white/10" /></ScrollReveal>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="space-y-10">
              <ScrollReveal><div className="rounded-[2rem] p-7 lg:p-9 bg-white border border-gray-100 shadow-xl space-y-5">{seoArticle.intro.map(p => <p key={p} className="text-lg text-gray-700 leading-8">{p}</p>)}<div className="flex flex-wrap gap-3 pt-3">{seoArticle.serviceLinks.map(link => <a key={link.href} href={link.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5aa02]/12 text-[#f5aa02] font-black text-sm border border-[#f5aa02]/25">{link.label}<ArrowRight className="w-4 h-4" /></a>)}</div></div></ScrollReveal>

              {seoArticle.sections.map((section, i) => {
                const id = getSectionId(section);
                const isDark = i % 2 === 1;
                const accent = isDark ? 'border-[#1e3a5f]/40 from-[#0e2340]' : 'border-[#f5aa02]/30 from-[#f5aa02]/10';
                const numColor = isDark ? 'text-[#f5aa02]' : 'text-[#f5aa02]';
                const headingColor = isDark ? 'text-white' : 'text-secondary';
                const bodyColor = isDark ? 'text-white' : 'text-gray-700';
                const innerBg = isDark ? 'bg-[#162d4a]' : 'bg-white';
                const innerBorder = isDark ? 'border-[#1e3a5f]/30' : 'border-gray-100';
                const innerText = isDark ? 'text-white' : 'text-gray-700';
                const innerHeading = isDark ? 'text-white' : 'text-secondary';
                return (
                  <ScrollReveal key={section.title} direction={i % 2 ? 'left' : 'right'}>
                    <section id={id} className={`blog-article-section ${isDark ? 'blog-article-section-dark' : ''} scroll-mt-32 rounded-[2rem] p-7 lg:p-9 bg-gradient-to-br ${accent} to-white border shadow-xl`}>
                      <span className={`${numColor} font-black`}>0{i + 1}</span>
                      <h2 className={`text-3xl lg:text-4xl font-black ${headingColor} mt-2 mb-5`}>{section.title}</h2>
                      <div className="space-y-5">{section.body.map(p => <p key={p} className={`text-lg ${bodyColor} leading-8`}>{p}</p>)}</div>
                      {section.callout && <div className="mt-7 rounded-3xl p-6 bg-[#111827] text-white border border-[#f5aa02]/30"><span className="text-primary-light font-black">Key Insight</span><p className="mt-2 text-gray-200 leading-7">{section.callout}</p></div>}
                      {section.warning && <div className="mt-7 rounded-3xl p-6 bg-[#fff8e6] border border-[#f5aa02]/35"><span className="text-[#f5aa02] font-black">Warning</span><p className="mt-2 text-gray-700 leading-7">{section.warning}</p></div>}
                      {section.tips && <div className="mt-7 grid sm:grid-cols-2 gap-4">{section.tips.map(tip => <div key={tip} className={`rounded-2xl p-4 ${innerBg} border ${innerBorder} shadow-sm`}><CheckCircle className="w-5 h-5 text-[#f5aa02] mb-2" /><p className={`${innerText} font-semibold leading-6`}>{tip}</p></div>)}</div>}
                      {section.checklist && <div className={`mt-7 rounded-3xl p-6 ${innerBg} border ${innerBorder}`}><h3 className={`text-xl font-black ${innerHeading} mb-4`}>Practical Checklist</h3><div className="grid sm:grid-cols-2 gap-3">{section.checklist.map(item => <div key={item} className={`flex gap-3 ${innerText} font-semibold`}><CheckCircle className="w-5 h-5 shrink-0 text-[#f5aa02]" /><span>{item}</span></div>)}</div></div>}
                    </section>
                  </ScrollReveal>
                );
              })}

              <ScrollReveal><section className="rounded-[2rem] p-7 lg:p-9 bg-white border border-gray-100 shadow-xl"><h2 className="text-3xl font-black text-secondary mb-5">Conclusion: Key Takeaways</h2><div className="grid sm:grid-cols-2 gap-4">{seoArticle.takeaways.map(item => <div key={item} className="rounded-2xl p-5 bg-[#f8f7f4] border border-[#f5aa02]/20 font-bold text-gray-700">{item}</div>)}</div></section></ScrollReveal>

              <ScrollReveal><section className="rounded-[2rem] p-7 lg:p-9 bg-white border border-gray-100 shadow-xl"><h2 className="text-3xl font-black text-secondary mb-6">FAQs</h2><div className="space-y-4">{seoArticle.faqs.map((faq, i) => <details key={faq.question} className="group rounded-2xl p-5 bg-[#fbfaf7] border border-gray-100"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-black text-secondary"><span>{i + 1}. {faq.question}</span><ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" /></summary><p className="text-gray-600 leading-7 mt-4">{faq.answer}</p></details>)}</div></section></ScrollReveal>
            </article>
          </div>
        </section>

        <section className="py-12 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6"><a href={`#/blog/${previousPost.slug}`} className="rounded-3xl p-6 bg-[#fbfaf7] border border-[#f5aa02]/25 shadow-lg hover:-translate-y-1 transition-all"><span className="text-[#f5aa02] font-black text-sm">Previous {post.category} Article</span><h3 className="text-2xl font-black text-secondary mt-2">{previousPost.title}</h3></a><a href={`#/blog/${nextPost.slug}`} className="rounded-3xl p-6 bg-[#111827] text-white border border-[#f5aa02]/25 shadow-lg hover:-translate-y-1 transition-all"><span className="text-primary-light font-black text-sm">Next {post.category} Article</span><h3 className="text-2xl font-black mt-2">{nextPost.title}</h3></a></div></section>
        <section className="py-16 bg-[#fbfaf7]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-black text-secondary mb-8">Related {post.category} Articles</h2><div className="grid md:grid-cols-3 gap-6">{relatedPosts.map((p, i) => <a key={p.slug} href={`#/blog/${p.slug}`} className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:-translate-y-1 transition-all"><img src={getBlogImage(p.image, 620)} alt={p.title} className="h-44 w-full object-cover" loading="lazy" decoding="async" /><div className="p-6"><span className={`blog-category-pill font-bold text-xs px-3 py-1 rounded-full inline-block mb-3 ${i % 2 ? 'bg-[#111827] text-[#f5aa02]' : 'bg-[#f5aa02] text-[#111827]'}`}>{p.category}</span><h3 className="text-xl font-black text-secondary">{p.title}</h3></div></a>)}</div></div></section>
        <section className="py-16 bg-gradient-to-br from-[#111827] to-[#0b1220] text-white"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><ScrollReveal><Mail className="w-10 h-10 text-primary-light mx-auto mb-4" /><h2 className="text-4xl font-black mb-4">Get practical growth insights in your inbox.</h2><p className="text-gray-300 mb-8">Monthly website, SEO, industry and conversion ideas for growing businesses.</p><a href="#/contact" className="btn-primary">Plan My Website Strategy</a></ScrollReveal></div></section>
      </main>
    );
  }
  const designContent = DESIGN_BLOG_CONTENT[post.slug];
  const articleParagraphs = designContent ? designContent.paragraphs : [
    `A strong ${post.category.toLowerCase()} strategy starts with clarity, not decoration. Before adding animations, campaigns, or extra sections, the business should define the audience, the main offer, the proof customers need, and the action the visitor should take next. Google Search Central explains SEO as helping search engines understand content while helping users decide whether to visit, so the same principle applies to every serious service page: write for people first, structure the page clearly, and make the business value easy to understand without forcing the visitor to hunt for it.`,
    `Mobile quality is not optional. Google documents mobile-first indexing, which means the mobile version of a site is the primary version used for indexing and ranking. That makes mobile layout, readable text, complete content, visible media, tap-friendly buttons, and consistent structured information very important for a business website. If a desktop page looks premium but the mobile view cuts headings, hides important proof, or pushes the contact action too far down, the page can lose both user trust and search clarity at the exact point where many visitors are deciding whether to call, message, or leave.`,
    `Performance also has to be treated as part of design. Core Web Vitals measure real-world loading performance, interactivity, and visual stability, and Google recommends achieving good scores for both Search success and user experience. In practical website work, this means images and videos should be compressed and sized properly, layout blocks should not jump while loading, heavy effects should be used carefully, and forms or buttons should respond quickly. A beautiful layout that feels slow or unstable can make visitors doubt the business before they even read the offer.`,
    `Content depth builds trust when it answers real buyer questions. A useful page should explain the problem, the service, the process, the deliverables, the expected timeline, the support model, and the next step. For SEO, this also gives search engines more context about the page topic. For sales, it reduces confusion before the first call. The best pages avoid fake numbers, copied testimonials, and generic claims; instead, they use clear service details, authentic contact information, real project proof areas, FAQs, and honest descriptions of what the business can deliver.`,
    `Tracking should be planned before launch, not added as an afterthought. Google Analytics 4 can collect automatic events and also supports recommended or custom events for business-specific actions. For a service website, useful events can include form submissions, WhatsApp clicks, phone clicks, email clicks, booking starts, file downloads, blog engagement, and landing-page CTA clicks. When those actions are measured, the business can see which pages create enquiries, which campaigns bring useful visitors, and which sections need improvement instead of making design and marketing decisions from guesswork.`,
    `A complete digital system stays useful after launch. Blogs, service pages, landing pages, case-study sections, FAQs, schema-ready content, analytics dashboards, CRM handoff, and regular mobile checks help the website grow with the business. The goal is not only to make a page look modern on launch day; the goal is to create a structure that can support new services, better search visibility, stronger customer education, and cleaner enquiry management over time. When design, content, performance, SEO, and tracking work together, the website becomes easier to trust, easier to improve, and easier to scale.`,
  ];
  return (
    <main className="bg-white pt-0 overflow-hidden">
        <section className="pt-32 pb-14 bg-secondary text-white relative overflow-hidden"><AnimatedBackground dark/><div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><ScrollReveal><span className="blog-meta-pill inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-bold text-sm mb-5">{post.category} / {post.read}</span><h1 className="text-5xl lg:text-7xl font-black mb-6">{post.title}</h1><p className="text-xl text-gray-300 leading-relaxed">{post.excerpt}</p><p className="mt-6 text-primary-light font-bold">By {post.author}</p></ScrollReveal></div></section>
      <section className="py-10"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><ScrollReveal><img src={getBlogImage(post.image, 1200)} alt={post.title} loading="eager" decoding="async" className="rounded-[2rem] shadow-2xl w-full h-[420px] object-cover"/></ScrollReveal></div></section>
      <section className="py-16 bg-white"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><ScrollReveal><div className="prose-like space-y-5 mb-10">{articleParagraphs.map((p)=><p key={p} className="text-lg text-gray-700 leading-8">{p}</p>)}</div></ScrollReveal><div className="space-y-8">{post.points.concat(designContent ? designContent.extraPoints : ['Keep every section tied to a business action.','Measure enquiries, clicks, calls and page engagement after launch.','Review mobile layout whenever new content is added.']).map((p,i)=>{const qThemes=[{bg:'from-[#f5aa02]/8 to-white',border:'border-[#f5aa02]/25',num:'text-[#f5aa02]'},{bg:'from-[#111827]/8 to-white',border:'border-[#111827]/25',num:'text-[#111827]'},{bg:'from-[#f5aa02]/8 to-white',border:'border-[#f5aa02]/25',num:'text-[#f5aa02]'},{bg:'from-[#0b1220]/8 to-white',border:'border-[#0b1220]/25',num:'text-[#0b1220]'},{bg:'from-[#f5aa02]/8 to-white',border:'border-[#f5aa02]/25',num:'text-[#f5aa02]'},{bg:'from-[#1e293b]/8 to-white',border:'border-[#1e293b]/25',num:'text-[#1e293b]'}];const q=qThemes[i%qThemes.length];return (<ScrollReveal key={p} direction={i%2?'left':'right'}><div className={`rounded-3xl p-7 bg-gradient-to-br ${q.bg} border ${q.border} shadow-lg`}><span className={`${q.num} font-black text-lg`}>0{i+1}</span><h2 className="text-2xl font-black text-secondary mt-2 mb-2">{p}</h2><p className="text-gray-600 leading-relaxed">{(BLOG_FAQ_ANSWERS[post.slug] || [])[i] || 'Turn this into a real website section, checklist, FAQ, case study block, CTA, analytics event or internal task so the idea becomes practical after launch.'}</p></div></ScrollReveal>);})}</div></div></section>
      <section className="py-14 bg-primary/5"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><ScrollReveal><h2 className="text-4xl font-black text-secondary mb-4">Need this strategy implemented?</h2><p className="text-gray-600 mb-8">We can design the page, write the content structure and build the final responsive website.</p><a className="btn-primary" href="#/contact">Discuss Project</a></ScrollReveal></div></section>
      <section className="py-16 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-black text-secondary mb-8">More articles</h2><div className="grid md:grid-cols-3 gap-6">{BLOG_POSTS.filter(p=>p.slug!==post.slug).slice(0,3).map((p,ri)=>{const rc=[['border-[#f5aa02]/40','border-[#111827]/40','border-[#f5aa02]/40']];const rc2=[['bg-[#f5aa02]','bg-[#111827]','bg-[#f5aa02]']];return (<a key={p.slug} href={`#/blog/${p.slug}`} className={`rounded-3xl p-6 bg-white border ${rc[0][ri%3]} shadow-lg hover:-translate-y-1 transition-all`}><span className={`blog-category-pill ${rc2[0][ri%3]} text-white font-bold text-xs px-3 py-1 rounded-full inline-block mb-3`}>{p.category}</span><h3 className="text-xl font-black text-secondary">{p.title}</h3></a>);})}</div></div></section>
    </main>
  );
};


function App() {

  
  const { routeKey: rawRoute, anchor } = useHashLocation();
  const [route, queryString = ''] = rawRoute.split('?');
  const routeParams = new URLSearchParams(queryString);
  const shouldFocusEnquiry = ['message', 'first-name'].includes(routeParams.get('focus'));
  useEffect(() => {
    if (typeof window === 'undefined' || !window.history?.scrollRestoration) return undefined;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);
  useEffect(() => {
    const scrollToAnchor = () => {
      if (!anchor) return false;
      const target = document.getElementById(anchor);
      if (!target) return false;
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
      return true;
    };

    const rafId = window.requestAnimationFrame(() => {
      if (!scrollToAnchor()) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });

    const anchorRetry = anchor
      ? window.setTimeout(() => {
          scrollToAnchor();
        }, 160)
      : null;

    return () => {
      window.cancelAnimationFrame(rafId);
      if (anchorRetry) window.clearTimeout(anchorRetry);
    };
  }, [rawRoute, anchor]);
  useEffect(() => {
    if (route !== 'contact' || !shouldFocusEnquiry) return;
    const timer = setTimeout(() => {
      const firstName = document.getElementById('project-first-name');
      if (!firstName) return;
      firstName.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstName.focus({ preventScroll: true });
    }, 300);
    return () => clearTimeout(timer);
  }, [rawRoute, route, shouldFocusEnquiry]);
  const page = PAGE_DATA[route];

  /* HDRX 2026-07-04: adaptive header theme — dark-top pages get white nav text,
     light-top pages (solutions overview + legacy detail template) get dark text. */
  const isLightTopRoute =
    route === 'solutions' ||
    route === 'about' ||
    Boolean(
      page &&
      !DEVELOPMENT_PAGE_TITLES.has(page.title) &&
      !MARKETING_PAGE_TITLES.has(page.title) &&
      !SOLUTION_PAGE_TITLES.has(page.title)
    );
  /* Pages whose whole body is dark keep dark glass + white text after scroll;
     pages with white bodies flip to light glass + dark text for readability. */
  const isDarkBodyRoute =
    route === 'development' ||
    route === 'crm' ||
    Boolean(page && (DEVELOPMENT_PAGE_TITLES.has(page.title) || SOLUTION_PAGE_TITLES.has(page.title)));
  useEffect(() => {
    document.documentElement.setAttribute('data-header-theme', isLightTopRoute ? 'light' : 'dark');
    document.documentElement.setAttribute('data-header-scrolled-theme', isDarkBodyRoute ? 'dark' : 'light');
  }, [isLightTopRoute, isDarkBodyRoute]);

  if (route === 'services') {
    return (
      <div className="min-h-screen bg-[#0b1220]">
        <SEO title="Services Overview" description="Explore AuraShine Infotech services across development, digital marketing, AI solutions and CRM systems." path="/#/services" />
        <Navbar />
        <ServicesOverviewPage />
        <ScrollToTop />
      </div>
    );
  }

  if (route === 'development') {
    return (
      <div className="min-h-screen bg-white">
        <SEO title="Development Services" description="Modern websites, apps, UI/UX, and e-commerce builds by Aura Shine Infotech — a leading IT company for business websites and software." path="/#/development" />
        <Navbar />
        <DevelopmentPage />
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  if (route === 'marketing') {
    return (
      <div className="min-h-screen bg-white">
        <SEO title="Marketing Services" description="SEO, paid ads, social media, content, and growth campaigns by Aura Shine Infotech — your trusted digital marketing company." path="/#/marketing" />
        <Navbar />
        <MarketingPage />
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  if (route === 'solutions') {
    return (
      <div className="min-h-screen bg-white">
        <SEO title="Industry Solutions" description="Tailored IT strategies for startups, healthcare, real estate, enterprise, and e-commerce by Aura Shine Infotech." path="/#/solutions" />
        <Navbar />
        <SolutionsPage />
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  if (route === 'about') {
    return (
      <>
        <SEO
          title="About Us — Best IT Company in Kandivali West, Mumbai"
          description="Learn about Aura Shine Infotech — a leading IT and software development company in Kandivali West, Mumbai, offering website development, mobile app development, CRM software, digital marketing and SEO services."
          path="/#/about"
          keywords="best IT company in Kandivali West, IT company in Kandivali West, software development company in Kandivali West, web development company in Kandivali West, digital marketing company in Kandivali West, mobile app development company in Mumbai, best software company in Mumbai, AI development company Mumbai"
          jsonLd={ABOUT_PAGE_JSONLD}
        />
        <AboutRoute
          NavbarComponent={Navbar}
          AboutContent={V14AboutPage}
          ReviewsComponent={GoogleReviewsSection}
          FooterComponent={Footer}
          ScrollToTopComponent={ScrollToTop}
        />
      </>
    );
  }

  if (route === 'blog') {
    return (
      <>
        <SEO title="Blog" description="Read about website development, SEO, digital marketing, CRM software, app development, and business growth strategies by Aura Shine Infotech." path="/#/blog" />
        <BlogRoute
          NavbarComponent={Navbar}
          BlogContent={V14BlogPage}
          FooterComponent={Footer}
          ScrollToTopComponent={ScrollToTop}
        />
      </>
    );
  }

  if (route.startsWith('blog/')) {
    const post = BLOG_POSTS.find((p) => p.slug === route.split('/')[1]);
    return (
      <>
        <SEO title={post?.title || 'Blog'} description={post?.excerpt || 'Read our latest articles on website development, SEO, digital marketing, and business growth.'} path={`/#/blog/${post?.slug || ''}`} />
        <BlogDetailRoute
          NavbarComponent={Navbar}
          BlogDetailContent={V18BlogDetailPage}
          FooterComponent={Footer}
          ScrollToTopComponent={ScrollToTop}
          post={post}
        />
      </>
    );
  }

  if (route === 'crm') {
    return (
      <div className="min-h-screen" style={{ background: '#0B0F19' }}>
        <SEO title="AuraShine CRM — Coming Soon" description="AuraShine CRM is coming soon — a powerful all-in-one CRM for leads, bookings, customers, billing and reports. Join the waitlist for early access." path="/#/crm" />
        <Navbar />
        <CrmPage />
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  if (route === 'contact') {
    return (
      <>
        <SEO title="Contact Us" description="Contact Aura Shine Infotech for website development, app development, CRM software, SEO, and digital marketing services in Mumbai, India." path="/#/contact" />
        <ContactRoute
          NavbarComponent={Navbar}
          ContactSection={ContactSection}
          PageExpansionSection={PageExpansionSection}
          FAQSection={FAQSection}
          FooterComponent={Footer}
          ScrollToTopComponent={ScrollToTop}
          ScrollReveal={ScrollReveal}
        />
      </>
    );
  }

  if (page) {
    const SectionDetail = page.solutionTheme
      ? SolutionServiceDetail
      : DEVELOPMENT_PAGE_TITLES.has(page.title)
      ? DevServiceDetail
      : MARKETING_PAGE_TITLES.has(page.title)
        ? MarketingServiceDetail
        : SOLUTION_PAGE_TITLES.has(page.title)
          ? SolutionServiceDetail
          : null;
    if (SectionDetail) {
      const descMap = {
        'Digital Marketing': 'Full-funnel digital marketing services including SEO, PPC, social media, content, email, and lead generation by Aura Shine Infotech.',
        'SEO Services': 'Professional SEO services including technical SEO, local SEO, keyword research, content strategy, and search visibility improvement.',
        'PPC & Paid Ads': 'Results-driven PPC and paid ads management on Google, Meta, LinkedIn, and YouTube with ROAS-focused campaign optimization.',
        'Social Media': 'Social media marketing services for Instagram, LinkedIn, Facebook — content creation, community management, and paid social campaigns.',
        'Content Marketing': 'Content marketing services including blogs, case studies, whitepapers, SEO content, and authority-building content strategies.',
        'Email Marketing': 'Email marketing automation with welcome flows, nurture sequences, newsletters, and win-back campaigns for better conversions.',
        'Lead Generation': 'Lead generation services with landing pages, forms, WhatsApp CTAs, CRM handoff, and follow-up automation for qualified enquiries.',
        'Analytics & Reporting': 'Analytics and reporting services with GA4 setup, custom dashboards, conversion tracking, and monthly performance insights.',
        'Web Development': 'Professional website development services by a top IT company — responsive, fast-loading business websites with modern React.js technology.',
        'App Development': 'Mobile app development services for iOS and Android using React Native and Flutter — from onboarding to app store launch.',
        'UI/UX Design': 'UI/UX design services including wireframes, design systems, prototypes, and user research for websites and mobile applications.',
        'E-commerce': 'E-commerce development services with shopping cart, payment integration, inventory management, and SEO-optimized product pages.',
        'Custom Software': 'Custom software development including CRM systems, dashboards, booking platforms, admin panels, and business workflow automation.',
        'API Integration': 'API integration services connecting your business systems, third-party platforms, payment gateways, and automation workflows.',
        'Cloud Solutions': 'Cloud solutions including AWS, Firebase, and scalable hosting infrastructure for reliable application deployment and management.',
        'Website Maintenance': 'Website maintenance services including updates, security patches, performance optimization, content updates, and technical support.',
        'CRM Software': 'Custom CRM software development with lead tracking, customer management, appointment booking, billing, and WhatsApp integration by Aura Shine Infotech.',
        'Salon Software': 'Salon management software with online booking, customer profiles, staff scheduling, package management, and revenue reports by Aura Shine Infotech.',
        'Business Automation': 'Business automation solutions including workflow automation, custom dashboards, invoice generators, and system integration by Aura Shine Infotech.',
        'Startups': 'Startup digital solutions including MVP development, brand building, growth marketing, and scalable technology stack planning.',
        'Healthcare': 'Healthcare digital marketing and technology solutions including patient acquisition, local SEO, appointment systems, and trust-building websites.',
        'Real Estate': 'Real estate digital solutions with property listing websites, lead generation campaigns, CRM follow-up, and virtual tour integration.',
        'Enterprise': 'Enterprise-grade IT solutions including large-scale web applications, cloud infrastructure, team collaboration tools, and digital transformation.',
        'Brand Building': 'Brand building services including brand identity, positioning, visual design, content strategy, and digital presence development.',
        'Performance Marketing': 'Performance marketing with data-driven campaigns, ROAS optimization, multi-channel attribution, and conversion rate improvement.',
      };
      const fallbackTitle = page.title || 'Service';
      const titleTag = page.seoTitle || fallbackTitle;
      const desc = page.seoDescription || descMap[page.title] || `${page.title} services by Aura Shine Infotech — a trusted software development company and IT company in India.`;
      const isSolutionPage = page.solutionTheme || SOLUTION_PAGE_TITLES.has(page.title);
      return (
        <div className={`min-h-screen ${isSolutionPage ? 'bg-[#0e2340]' : 'bg-white'}`}>
          <SEO title={titleTag} description={desc} path={`/#/${route}`} />
          <Navbar />
          <SectionDetail
            page={page}
            FooterComponent={Footer}
          />
          <ScrollToTop />
        </div>
      );
    }
    const isSolutionPage = page.solutionTheme || SOLUTION_PAGE_TITLES.has(page.title);
    return (
      <div className={`min-h-screen ${isSolutionPage ? 'bg-[#0e2340]' : 'bg-white'} site-compact`}>
        <SEO title={page.seoTitle || page.title} description={`${page.title} services by Aura Shine Infotech — a trusted IT company in India for website development, app development, and digital marketing.`} path={`/#/${route}`} />
        <Navbar />
        <DetailPage page={page} />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white site-compact hdrx-fullbleed">
      <SEO
        title="Aura Shine Infotech | Best IT Company for Websites, Apps & Software"
        description="Aura Shine Infotech is a modern IT company in Mumbai offering website development, app development, CRM software, digital marketing, SEO, and business automation solutions. Best tech company for business growth."
        path="/"
      />
      <Navbar />
      <h1 className="sr-only text-0" style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',borderWidth:0}}>Aura Shine Infotech — Website Development, App Development, CRM Software, Digital Marketing & SEO Company in Mumbai</h1>
      <VideoHeroSection />
      <div id="after-hero">
        <LogoMarquee />
      </div>
      <ServicesSection />
      <ResultsSection />
      <ProcessSection />
      <WhyUsSection />
      <CaseStudiesSection />
      <HomeGrowthSuiteSection />
      <PageExpansionSection title="More sections, stronger content and clearer business key points" />
      <ToolsSection />
      <MarketingSoftwareScroll />
      <FAQSection />
      <ContactSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;

/* V29 unique page content placeholder updated */
