import React from 'react';
import { motion } from 'framer-motion';

const slides = [
  {
    title: 'Growth Dashboard',
    caption: 'Campaigns, leads, and reports in one clean view.',
    chips: ['Campaign view', 'Lead inbox', 'Weekly reports'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    stickers: [
      { emoji: '📈', label: '+38% growth', pos: '-top-5 -right-2 sm:-right-4', rotate: 6 },
      { emoji: '💰', pos: '-bottom-4 -left-2 sm:-left-4', rotate: -10 },
    ],
  },
  {
    title: 'CRM Automation',
    caption: 'Follow-ups, status updates, and customer notes stay organized.',
    chips: ['Auto follow-ups', 'Pipeline stages', 'Customer notes'],
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop',
    stickers: [
      { emoji: '⚡', label: 'Auto follow-up', pos: '-top-5 -left-2 sm:-left-4', rotate: -6 },
      { emoji: '🤝', pos: '-bottom-4 -right-2 sm:-right-4', rotate: 10 },
    ],
  },
  {
    title: 'Lead Generation Flow',
    caption: 'Landing pages, forms, WhatsApp actions, and tracking work together.',
    chips: ['Landing pages', 'Smart forms', 'WhatsApp actions'],
    img: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1600&auto=format&fit=crop',
    stickers: [
      { emoji: '🎯', label: 'New lead!', pos: '-top-5 -right-2 sm:-right-4', rotate: 8 },
      { emoji: '💬', pos: '-bottom-4 -left-2 sm:-left-4', rotate: -8 },
    ],
  },
  {
    title: 'Analytics Dashboard',
    caption: 'Readable metrics show what to improve next.',
    chips: ['Live metrics', 'Conversion paths', 'Clear insights'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    stickers: [
      { emoji: '📊', label: 'Live metrics', pos: '-top-5 -left-2 sm:-left-4', rotate: -7 },
      { emoji: '🔍', pos: '-bottom-4 -right-2 sm:-right-4', rotate: 9 },
    ],
  },
];

const easeOut = [0.16, 1, 0.3, 1];

export function MarketingSoftwareScroll() {
  return (
    <section className="marketing-showcase-section relative bg-white py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(245,170,2,0.06),transparent_32%),radial-gradient(circle_at_88%_70%,rgba(7,21,47,0.05),transparent_32%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            Platform Preview
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-secondary leading-tight">
            One system for <span className="gradient-text">marketing, leads and growth.</span>
          </h2>
        </motion.div>

        <div className="space-y-12 sm:space-y-20">
          {slides.map((slide, i) => (
            <Scene key={slide.title} slide={slide} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Scene({ slide, index }) {
  const fromLeft = index % 2 === 0;
  const textX = fromLeft ? -56 : 56;

  return (
    <div className="marketing-showcase-scene grid md:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-8 md:gap-12 items-center">
      {/* Text block — slides in from one side */}
      <motion.div
        initial={{ opacity: 0, x: textX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.85, ease: easeOut }}
        className={`text-center md:text-left ${fromLeft ? 'md:order-1' : 'md:order-2'}`}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-black mb-4">
          0{index + 1}
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary mb-3 leading-tight">{slide.title}</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 max-w-md mx-auto md:mx-0">{slide.caption}</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {slide.chips.map((chip, ci) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.25 + ci * 0.12, ease: easeOut }}
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 border border-gray-200 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-700"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {chip}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Image card — slides in from the opposite side */}
      <motion.div
        initial={{ opacity: 0, x: -textX, scale: 0.94 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.95, ease: easeOut, delay: 0.08 }}
        whileHover={{ y: -6 }}
        className={`relative ${fromLeft ? 'md:order-2' : 'md:order-1'}`}
      >
        <div
          className={`absolute -inset-4 rounded-[26px] bg-gradient-to-br ${
            fromLeft ? 'from-primary/15 to-transparent' : 'from-transparent to-primary/15'
          } blur-2xl pointer-events-none`}
        />
        <div className="relative rounded-[18px] sm:rounded-[22px] bg-[#101623] p-2 sm:p-2.5 shadow-2xl shadow-secondary/25 border border-white/10 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2 pt-0.5 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5aa02]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[10px] sm:text-xs font-semibold text-white/45 truncate">{slide.title}</span>
          </div>
          <img
            src={slide.img}
            alt={slide.title}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl block object-cover"
            style={{ height: 'clamp(200px, 34vw, 380px)' }}
          />
        </div>

        {/* Emoji stickers — pop in, then float forever */}
        {slide.stickers.map((sticker, si) => (
          <Sticker key={sticker.emoji} sticker={sticker} delay={0.55 + si * 0.2} />
        ))}
      </motion.div>
    </div>
  );
}

function Sticker({ sticker, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: sticker.rotate * 4 }}
      whileInView={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay }}
      className={`absolute z-10 ${sticker.pos}`}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 2.6 + delay, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.12 }}
        className={
          sticker.label
            ? 'flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 shadow-xl shadow-secondary/15 border border-gray-100'
            : 'flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl shadow-secondary/15 border border-gray-100'
        }
      >
        <span className="text-xl sm:text-2xl leading-none">{sticker.emoji}</span>
        {sticker.label && <span className="text-xs sm:text-sm font-black text-secondary whitespace-nowrap">{sticker.label}</span>}
      </motion.div>
    </motion.div>
  );
}
