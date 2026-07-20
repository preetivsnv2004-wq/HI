import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

/* CTX 2026-07-04: premium contact hero (dark, blobs, quick-action chips).
   Sits flush under the transparent header — no white pt-20 gap.
   ContactSection below keeps the existing formsubmit.co logic untouched. */
const QUICK_ACTIONS = [
  { label: 'Call +91 7900129064', href: 'tel:+917900129064' },
  { label: 'WhatsApp Us', href: 'https://wa.me/917900129064' },
  { label: 'aurashineinfotech@gmail.com', href: 'mailto:aurashineinfotech@gmail.com' },
];

const CONTACT_STEPS = [
  {
    title: 'Project planning call',
    desc: 'We understand your business goal, target audience, current challenges, budget range and expected timeline before suggesting the right solution.',
  },
  {
    title: 'Requirement checklist',
    desc: 'We collect required pages, features, integrations, content, brand assets, references and access details so the scope stays clear from day one.',
  },
  {
    title: 'Launch support',
    desc: 'After approval, we help with testing, domain or hosting setup, tracking, final deployment, handover and basic post-launch guidance.',
  },
];

const ContactRoute = ({
  NavbarComponent,
  ContactSection,
  PageExpansionSection,
  FAQSection,
  FooterComponent,
  ScrollToTopComponent,
  ScrollReveal,
}) => (
  <div className="min-h-screen bg-white site-compact premium-contact-page hdrx-fullbleed">
    <NavbarComponent />

    <section
      className="contact-spline-hero relative overflow-hidden bg-[#141414] text-white pt-32 pb-14 lg:pt-40 lg:pb-20"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--contact-mouse-x', `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty('--contact-mouse-y', `${event.clientY - bounds.top}px`);
      }}
    >
      <div className="contact-spline-scene absolute inset-0 z-0" aria-hidden="true">
        <Suspense fallback={<div className="absolute inset-0 bg-[#141414]" />}>
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            className="h-full w-full"
          />
        </Suspense>
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/45 to-black/25 pointer-events-none" aria-hidden="true" />
      <div className="contact-brand-hover absolute inset-0 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-28 -right-20 z-[2] w-[30rem] h-[30rem] rounded-full bg-primary/10 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-36 -left-24 z-[2] w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-[110px] pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="homx-pulse-dot inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-light font-bold text-sm mb-6 border border-primary/30">CONTACT AURASHINE INFOTECH</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight max-w-4xl mx-auto mb-6">
            Contact Aura Shine Infotech — <span className="homx-shimmer-text">let&rsquo;s talk growth.</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-9">
            Website development, app development, CRM software, SEO and digital marketing — tell us what you need and we reply with a practical plan, timeline and next steps.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="ctx-chip pointer-events-auto inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm font-bold text-white/90 transition-all"
                style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(8px)' }}
              >
                {action.label}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    <ContactSection />

    <section className="py-12 bg-white relative overflow-hidden">
      <div className="absolute inset-0 homx-dotgrid pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
        {CONTACT_STEPS.map((step, index) => (
          <ScrollReveal key={step.title} delay={index * 0.08}>
            <div className="homx-spinborder homx-lift rounded-2xl h-full">
              <div className="homx-inner rounded-2xl p-6 bg-white/90 h-full" style={{ backdropFilter: 'blur(10px)' }}>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black mb-4">STEP {index + 1}</span>
                <h3 className="text-2xl font-black text-secondary mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
    <PageExpansionSection title="Contact page with stronger enquiry guidance" />
    <FAQSection />
    <FooterComponent />
    <ScrollToTopComponent />
  </div>
);

export default ContactRoute;
