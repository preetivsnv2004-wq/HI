# Aurashine Infotech

A modern, animated React website inspired by Zenoti's design, built with React, Tailwind CSS, and Framer Motion.

## Features

- **Smooth Animations**: Powered by Framer Motion with scroll-triggered reveals
- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**:
  - Animated navigation with dropdown menus
  - Hero section with floating particles and parallax effects
  - Logo marquee with infinite scroll
  - Digital services section with interactive problem/solution cards
  - Performance-focused service cards with animated mock UIs
  - Industry-specific tabs with smooth transitions
  - Timeline/roadmap with hover effects
  - Testimonials with video placeholders
  - CTA section with gradient backgrounds
- **Dark/Light Theme**: Mix of light and dark sections for visual variety
- **Scroll to Top Button**: Appears when scrolling down
- **Performance Update**: Homepage industry videos are compressed, inactive videos stay paused, static assets include cache headers, and mobile scroll animation matches the slower desktop sticky effect.
- **Smoother Motion Update**: Section reveal, staggered cards, industry cards, and detail-page animations use slower easing so cards appear gradually instead of instantly popping into view.

## Tech Stack

- React 18
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The included `build/` folder has also been synced with the performance update for direct hosting.

## Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main app with all components
│   ├── index.js        # Entry point
│   ├── pages/          # Individual service, solution, About, Contact, Blog and Blog Detail route files
│   └── index.css       # Tailwind + custom styles
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Customization

- Colors: Edit `tailwind.config.js` to change the primary color scheme
- Content: Modify the data arrays in `App.js` to update content
- Individual pages: Edit each file in `src/pages/` for service, solution, About, Contact, Blog and Blog Detail route content
- Industry background videos: Replace files in `public/assets/industry-uploaded/` to update the first visible homepage video section
- Animations: Adjust Framer Motion props for different animation effects
