(function () {
  var STYLE_ID = 'aurashine-runtime-fix-style-v2';
  var PAGE_FIX_DATA = {
  "analytics-reporting": {
    "title": "Analytics & Reporting",
    "rows": [
      "GA4 Setup",
      "Conversion Tracking",
      "Dashboards",
      "Campaign Reports"
    ],
    "bullets": [
      "GA4 Setup",
      "Conversion Tracking",
      "Dashboards",
      "Campaign Reports",
      "Heatmaps",
      "Monthly Insights"
    ],
    "stats": [
      "Live clarity",
      "Better decisions",
      "No guesswork"
    ],
    "process": [
      "Tracking Audit",
      "Setup Events",
      "Dashboard Build",
      "Monthly Review"
    ],
    "kps": [
      {
        "title": "Conversion Tracking",
        "desc": "We track form submits, WhatsApp clicks, calls, purchases, and other important actions."
      },
      {
        "title": "Simple Dashboards",
        "desc": "Reports are designed so business owners can understand performance quickly without digging through tools."
      },
      {
        "title": "Campaign Attribution",
        "desc": "Lead sources, channels, campaigns, and landing pages are connected to business outcomes."
      },
      {
        "title": "Improvement Notes",
        "desc": "Every report includes clear next steps, not just numbers."
}
    ]
  },
  "api-integration": {
    "title": "API Integration",
    "rows": [
      "CRM Integration",
      "Payment Gateway",
      "WhatsApp/API",
      "Inventory Sync"
    ],
    "bullets": [
      "CRM Integration",
      "Payment Gateway",
      "WhatsApp/API",
      "Inventory Sync",
      "Form Automation",
      "Webhook Setup"
    ],
    "stats": [
      "Faster handoff",
      "Reduced errors",
      "Connected data"
    ],
    "process": [
      "Integration Map",
      "API Setup",
      "Testing",
      "Monitoring"
    ],
    "kps": [
      {
        "title": "System Planning",
        "desc": "We identify what data needs to move, where it should go, and what should trigger each action."
      },
      {
        "title": "Secure Connections",
        "desc": "API keys, validation, and error handling are implemented carefully to keep workflows reliable."
      },
      {
        "title": "Automation Logic",
        "desc": "Leads, orders, notifications, and status updates can move between tools without manual copying."
      },
      {
        "title": "Testing & Monitoring",
        "desc": "We test success paths, failed requests, duplicate submissions, and edge cases before launch."
      }
    ]
  },
  "app-development": {
    "title": "App Development",
    "rows": [
      "React Native Apps",
      "Flutter Apps",
      "iOS & Android",
      "App Store Launch"
    ],
    "bullets": [
      "React Native Apps",
      "Flutter Apps",
      "iOS & Android",
      "App Store Launch",
      "Push Notifications",
      "Analytics Integration"
    ],
    "stats": [
      "Native-like UX",
      "Cross-platform",
      "Retention focused"
    ],
    "process": [
      "Concept & Wireframing",
      "UI/UX Design",
      "Development & Testing",
      "Launch & ASO"
    ],
    "kps": [
      {
        "title": "Cross-Platform Development",
        "desc": "One codebase, two platforms. React Native and Flutter let us build high-quality apps for iOS and Android at lower cost and faster delivery."
      },
      {
        "title": "App Store Optimization",
        "desc": "We optimize your app title, description, screenshots, and keywords so users can discover you organically on the App Store and Play Store."
      },
      {
        "title": "User-First UX",
        "desc": "Every screen is designed for simplicity and delight. We reduce friction, increase retention, and design flows that users actually want to return to."
      },
      {
        "title": "Backend & APIs",
        "desc": "We build the full stack — from app frontend to cloud backend, REST APIs, push notification services, and real-time data sync."
      }
    ]
  },
  "brand-building": {
    "title": "Brand Building",
    "rows": [
      "Brand Positioning",
      "Visual Direction",
      "Website Story",
      "Social Identity"
    ],
    "bullets": [
      "Brand Positioning",
      "Visual Direction",
      "Website Story",
      "Social Identity",
      "Trust Sections",
      "Campaign Messaging"
    ],
    "stats": [
      "Clear identity",
      "Premium recall",
      "Higher trust"
    ],
    "process": [
      "Brand Audit",
      "Positioning",
      "Visual System",
      "Launch Assets"
    ],
    "kps": [
      {
        "title": "Positioning Clarity",
        "desc": "We define what the brand stands for, who it serves, and why customers should choose it over alternatives."
      },
      {
        "title": "Visual Consistency",
        "desc": "Colors, sections, typography, image style, icons, and motion are aligned so the business looks established everywhere."
      },
      {
        "title": "Trust-First Website Flow",
        "desc": "Hero, proof blocks, process, testimonials, FAQs, and contact prompts are arranged to build confidence quickly."
      },
      {
        "title": "Campaign-Ready Messaging",
        "desc": "Brand messaging is shaped into website copy, social posts, ads, landing pages, and sales material."
      }
    ]
  },
  "cloud-solutions": {
    "title": "Cloud Solutions",
    "rows": [
      "Cloud Hosting",
      "Database Setup",
      "Backups",
      "SSL & Security"
    ],
    "bullets": [
      "Cloud Hosting",
      "Database Setup",
      "Backups",
      "SSL & Security",
      "Performance Tuning",
      "Deployment Pipelines"
    ],
    "stats": [
      "Stable hosting",
      "Secure setup",
      "Scale ready"
    ],
    "process": [
      "Architecture Plan",
      "Cloud Setup",
      "Deploy",
      "Monitor"
    ],
    "kps": [
      {
        "title": "Deployment Setup",
        "desc": "We prepare clean deployment flows so updates can go live safely and predictably."
      },
      {
        "title": "Performance & Uptime",
        "desc": "Hosting, caching, assets, and server settings are tuned for speed and reliability."
      },
      {
        "title": "Backup Planning",
        "desc": "Databases, media, and important application data can be backed up based on your risk level."
      },
      {
        "title": "Security Basics",
        "desc": "SSL, environment variables, permissions, and access controls are handled carefully."
      }
    ]
  },
  "content-marketing": {
    "title": "Content Marketing",
    "rows": [
      "SEO Blogs",
      "Service Pages",
      "Campaign Copy",
      "Social Content"
    ],
    "bullets": [
      "SEO Blogs",
      "Service Pages",
      "Campaign Copy",
      "Social Content",
      "Case Studies",
      "Content Calendar"
    ],
    "stats": [
      "Topical authority",
      "Better trust",
      "Search-ready"
    ],
    "process": [
      "Topic Research",
      "Content Calendar",
      "Writing & Design",
      "Publish & Improve"
    ],
    "kps": [
      {
        "title": "SEO Topic Planning",
        "desc": "We map keywords, customer questions, and service topics into a structured content plan."
      },
      {
        "title": "Sales-Ready Copy",
        "desc": "Content is written to educate visitors and move them toward enquiry, not just fill space."
      },
      {
        "title": "Reusable Assets",
        "desc": "One strong idea can become a blog, social post, email, ad angle, and FAQ block."
      },
      {
        "title": "Consistent Publishing",
        "desc": "A practical calendar keeps your brand active without overwhelming your internal team."
      }
    ]
  },
  "custom-software": {
    "title": "Custom Software",
    "rows": [
      "Admin Panels",
      "CRM Tools",
      "Workflow Automation",
      "Dashboards"
    ],
    "bullets": [
      "Admin Panels",
      "CRM Tools",
      "Workflow Automation",
      "Dashboards",
      "Role Management",
      "Business Reports"
    ],
    "stats": [
      "Less manual work",
      "Cleaner operations",
      "Scalable systems"
    ],
    "process": [
      "Process Study",
      "Feature Planning",
      "Build Modules",
      "Train & Launch"
    ],
    "kps": [
      {
        "title": "Workflow Mapping",
        "desc": "We understand your current process first, then build software that removes repeated manual work."
      },
      {
        "title": "Role-Based Access",
        "desc": "Staff, admins, managers, and clients can each see the tools and data they need."
      },
      {
        "title": "Dashboard Views",
        "desc": "Important business numbers are presented in simple, action-ready dashboards."
      },
      {
        "title": "Future-Ready Build",
        "desc": "The system is structured so new modules and integrations can be added later."
      }
    ]
  },
  "digital-marketing": {
    "title": "Digital Marketing",
    "rows": [
      "Performance Strategy",
      "Social Media Campaigns",
      "Paid Acquisition (PPC)",
      "Email & Automation"
    ],
    "bullets": [
      "Performance Strategy",
      "Social Media Campaigns",
      "Paid Acquisition (PPC)",
      "Email & Automation",
      "Content Marketing",
      "Conversion Rate Optimization"
    ],
    "stats": [
      "Traffic tracking",
      "Lead quality",
      "Campaign clarity"
    ],
    "process": [
      "Audit & Research",
      "Strategy & Roadmap",
      "Campaign Launch",
      "Optimize & Scale"
    ],
    "kps": [
      {
        "title": "Google & Meta Ads",
        "desc": "Expert PPC management across Google Search, Display, YouTube, Facebook, Instagram, and LinkedIn. We optimize daily for maximum ROAS."
      },
      {
        "title": "Content Marketing",
        "desc": "SEO-optimized blogs, social posts, videos, and infographics that build authority and attract your ideal customers organically."
      },
      {
        "title": "Email Automation",
        "desc": "Automated drip sequences, welcome flows, and re-engagement campaigns that nurture leads 24/7 without manual effort."
      },
      {
        "title": "Conversion Optimization",
        "desc": "A/B testing, heatmaps, and UX improvements that turn more of your existing traffic into paying customers."
      }
    ]
  },
  "e-commerce": {
    "title": "E-commerce",
    "rows": [
      "Store Optimization",
      "Google Shopping",
      "Abandoned Cart Flows",
      "Product SEO"
    ],
    "bullets": [
      "Store Optimization",
      "Google Shopping",
      "Abandoned Cart Flows",
      "Product SEO",
      "Influencer Marketing",
      "Retention Campaigns"
    ],
    "stats": [
      "Cart recovery",
      "ROAS tracking",
      "Higher AOV planning"
    ],
    "process": [
      "Store Audit",
      "Paid Ads Launch",
      "Email Automation",
      "Scale & Retain"
    ],
    "kps": [
      {
        "title": "Google Shopping & PMax",
        "desc": "Performance Max campaigns and Shopping ads that put your products in front of high-intent buyers at the exact moment they're ready to purchase."
      },
      {
        "title": "Abandoned Cart Recovery",
        "desc": "Multi-step email and SMS sequences that recover 30–40% of abandoned carts. Most stores leave this revenue on the table."
      },
      {
        "title": "Product Page Optimization",
        "desc": "Better product descriptions, images, reviews, and schema markup that improve SEO rankings and increase add-to-cart rates."
      },
      {
        "title": "Repeat Purchase Programs",
        "desc": "Loyalty programs, replenishment reminders, and VIP campaigns that grow customer lifetime value and reduce churn."
      }
    ]
  },
  "email-marketing": {
    "title": "Email Marketing",
    "rows": [
      "Welcome Flows",
      "Lead Nurture",
      "Newsletters",
      "Abandoned Cart"
    ],
    "bullets": [
      "Welcome Flows",
      "Lead Nurture",
      "Newsletters",
      "Abandoned Cart",
      "Win-back Campaigns",
      "A/B Testing"
    ],
    "stats": [
      "Always-on nurture",
      "Better retention",
      "More repeat sales"
    ],
    "process": [
      "List Audit",
      "Flow Mapping",
      "Copy & Setup",
      "Test & Optimize"
    ],
    "kps": [
      {
        "title": "Automation Flows",
        "desc": "We build welcome, follow-up, cart recovery, and win-back sequences that work without manual reminders."
      },
      {
        "title": "Segmentation",
        "desc": "Audiences are grouped by interest, behavior, source, and lifecycle stage for more relevant messaging."
      },
      {
        "title": "Newsletter System",
        "desc": "Monthly newsletters keep your audience warm with offers, education, proof, and product updates."
      },
      {
        "title": "Performance Tracking",
        "desc": "Open rates, clicks, replies, revenue, and unsubscribes guide ongoing improvements."
      }
    ]
  },
  "enterprise": {
    "title": "Enterprise",
    "rows": [
      "Dedicated Account Team",
      "Custom Dashboards",
      "Multi-channel Strategy",
      "Enterprise SEO"
    ],
    "bullets": [
      "Dedicated Account Team",
      "Custom Dashboards",
      "Multi-channel Strategy",
      "Enterprise SEO",
      "API Integrations",
      "SLA Guarantees"
    ],
    "stats": [
      "Dedicated team",
      "Custom SLAs",
      "Full integration"
    ],
    "process": [
      "Discovery & Audit",
      "Strategy & Roadmap",
      "Team Onboarding",
      "Ongoing Partnership"
    ],
    "kps": [
      {
        "title": "Dedicated Growth Team",
        "desc": "A team of 5–10 specialists — strategist, SEO lead, paid media manager, developer, and designer — exclusively focused on your account."
      },
      {
        "title": "Multi-Channel Execution",
        "desc": "Coordinated strategy across SEO, PPC, social, email, content, and PR — all managed from a single point of contact."
      },
      {
        "title": "Custom Tech Integration",
        "desc": "We integrate with your CRM, ERP, BI tools, and internal systems to build a fully connected marketing operations stack."
      },
      {
        "title": "Compliance & Security",
        "desc": "GDPR, CCPA, and data security compliance built into every campaign and system we build for enterprise clients."
      }
    ]
  },
  "healthcare": {
    "title": "Healthcare",
    "rows": [
      "Local SEO for Clinics",
      "Google Ads for Doctors",
      "Reputation Management",
      "Patient-Centric UX"
    ],
    "bullets": [
      "Local SEO for Clinics",
      "Google Ads for Doctors",
      "Reputation Management",
      "Patient-Centric UX",
      "Telemedicine Marketing",
      "Healthcare Content"
    ],
    "stats": [
      "Local visibility",
      "Review-ready",
      "Booking-focused"
    ],
    "process": [
      "Compliance Audit",
      "Local SEO Setup",
      "Reputation Program",
      "Patient Acquisition"
    ],
    "kps": [
      {
        "title": "Local SEO & Maps Focus",
        "desc": "Most patients search nearby clinics and doctors on Google. We structure location, service, and trust content for stronger local presence."
      },
      {
        "title": "Online Reputation Management",
        "desc": "Systematic review generation, response management, and brand monitoring to maintain a 4.8+ star average across all platforms."
      },
      {
        "title": "Healthcare-Compliant Ads",
        "desc": "We understand Google's and Meta's healthcare advertising policies. Certified to run sensitive health category campaigns without disapprovals."
      },
      {
        "title": "Patient Journey Optimization",
        "desc": "Website, booking flow, and follow-up sequences designed specifically for the healthcare patient lifecycle — from search to loyal patient."
      }
    ]
  },
  "lead-generation": {
    "title": "Lead Generation",
    "rows": [
      "Landing Pages",
      "Lead Forms",
      "WhatsApp CTAs",
      "CRM Handoff"
    ],
    "bullets": [
      "Landing Pages",
      "Lead Forms",
      "WhatsApp CTAs",
      "CRM Handoff",
      "Retargeting",
      "Follow-up Flows"
    ],
    "stats": [
      "More enquiries",
      "Cleaner handoff",
      "Lower leakage"
    ],
    "process": [
      "Funnel Audit",
      "Landing Page",
      "Tracking Setup",
      "Lead Quality Review"
    ],
    "kps": [
      {
        "title": "Offer Clarity",
        "desc": "We sharpen your message so visitors understand what you do, who it helps, and why they should enquire."
      },
      {
        "title": "Conversion Forms",
        "desc": "Forms collect useful details like service interest, budget, timeline, and contact information without becoming too long."
      },
      {
        "title": "Follow-up Ready",
        "desc": "Enquiries can be structured for CRM, email, WhatsApp, or spreadsheet handoff depending on your workflow."
      },
      {
        "title": "Funnel Optimization",
        "desc": "We track sources, conversion rate, and lead quality so the funnel improves over time."
      }
    ]
  },
  "performance-marketing": {
    "title": "Performance Marketing",
    "rows": [
      "Growth Strategy",
      "Paid Media",
      "Landing Pages",
      "Conversion Tracking"
    ],
    "bullets": [
      "Growth Strategy",
      "Paid Media",
      "Landing Pages",
      "Conversion Tracking",
      "Retargeting",
      "Weekly Optimization"
    ],
    "stats": [
      "Better ROAS",
      "Lower CPL",
      "Clear reporting"
    ],
    "process": [
      "Growth Audit",
      "Campaign Build",
      "Tracking Setup",
      "Scale Winners"
    ],
    "kps": [
      {
        "title": "Goal-Based Planning",
        "desc": "Campaigns are structured around enquiries, bookings, purchases, demos, or revenue instead of only clicks and reach."
      },
      {
        "title": "Landing Page Alignment",
        "desc": "Ads and landing pages use the same promise, proof, and call-to-action so traffic converts better."
      },
      {
        "title": "Retargeting System",
        "desc": "Visitors who do not convert immediately can be brought back with sharper offers and trust-led messaging."
      },
      {
        "title": "Optimization Rhythm",
        "desc": "Budgets, creatives, keywords, audiences, and landing pages are reviewed regularly based on performance data."
      }
    ]
  },
  "ppc-paid-ads": {
    "title": "PPC & Paid Ads",
    "rows": [
      "Google Search Ads",
      "Meta Ads",
      "YouTube Campaigns",
      "LinkedIn B2B Ads"
    ],
    "bullets": [
      "Google Search Ads",
      "Meta Ads",
      "YouTube Campaigns",
      "LinkedIn B2B Ads",
      "Retargeting",
      "Landing Page Testing"
    ],
    "stats": [
      "ROAS tracking",
      "Lower waste planning",
      "Optimization rhythm"
    ],
    "process": [
      "Account Audit",
      "Campaign Setup",
      "Creative Testing",
      "Scale Winners"
    ],
    "kps": [
      {
        "title": "Audience Targeting",
        "desc": "We build campaigns around buyer intent, location, interest, remarketing, and conversion signals so ads reach people ready to act."
      },
      {
        "title": "Conversion-Focused Creatives",
        "desc": "Every ad and landing page message is written to reduce confusion, highlight value, and push visitors toward enquiry."
      },
      {
        "title": "Budget Control",
        "desc": "Campaign budgets, bids, and placements are reviewed regularly so spending stays focused on channels that produce real leads."
      },
      {
        "title": "Transparent Reporting",
        "desc": "You see leads, cost per lead, ROAS, conversion rate, and next actions in a simple reporting format."
      }
    ]
  },
  "real-estate": {
    "title": "Real Estate",
    "rows": [
      "Lead Generation Campaigns",
      "Facebook Property Ads",
      "IDX Website Integration",
      "Listing SEO"
    ],
    "bullets": [
      "Lead Generation Campaigns",
      "Facebook Property Ads",
      "IDX Website Integration",
      "Listing SEO",
      "CRM Automation",
      "Virtual Tour Marketing"
    ],
    "stats": [
      "400% more leads",
      "60% lower CPL",
      "Faster deal closure"
    ],
    "process": [
      "Market Research",
      "Lead Gen Setup",
      "Nurture Automation",
      "Agent Dashboard"
    ],
    "kps": [
      {
        "title": "Facebook & Instagram Property Ads",
        "desc": "Hyper-targeted property ads shown to likely buyers by location, income, life events (newly married, relocating), and search behavior."
      },
      {
        "title": "Lead Nurture Automation",
        "desc": "Automated SMS, email, and WhatsApp follow-up sequences that keep prospects engaged until they're ready to book a site visit."
      },
      {
        "title": "Listing SEO & Content",
        "desc": "Location-based landing pages and blog content that rank for \"flats in [area]\", \"plots near [landmark]\", and high-intent property searches."
      },
      {
        "title": "Virtual Tour & Video Marketing",
        "desc": "Professional property videos and 3D virtual tours distributed across YouTube, Instagram, and real estate portals to drive qualified interest."
      }
    ]
  },
  "seo-services": {
    "title": "SEO Services",
    "rows": [
      "Keyword Strategy",
      "Technical Audits",
      "Content Clusters",
      "Local SEO & Maps"
    ],
    "bullets": [
      "Keyword Strategy",
      "Technical Audits",
      "Content Clusters",
      "Local SEO & Maps",
      "Link Building",
      "Analytics & Reporting"
    ],
    "stats": [
      "Search visibility",
      "Organic traffic planning",
      "Content authority"
    ],
    "process": [
      "Full SEO Audit",
      "Keyword Research",
      "On-Page Optimization",
      "Content & Links"
    ],
    "kps": [
      {
        "title": "Technical SEO",
        "desc": "Core Web Vitals, crawlability, sitemap structure, schema markup, and indexation — we fix every technical issue holding you back from ranking."
      },
      {
        "title": "Keyword & Content Strategy",
        "desc": "Cluster-based keyword research and a content calendar that systematically builds authority across your entire topic space."
      },
      {
        "title": "Link Building",
        "desc": "White-hat outreach to earn high-quality backlinks from real, relevant websites. We never buy links or use PBNs."
      },
      {
        "title": "Local SEO",
        "desc": "Google Business Profile optimization, local citations, and geo-targeted content to dominate your city and neighborhood rankings."
      }
    ]
  },
  "social-media": {
    "title": "Social Media Marketing",
    "rows": [
      "Content Calendar",
      "Instagram Growth",
      "Facebook Campaigns",
      "LinkedIn Content"
    ],
    "bullets": [
      "Content Calendar",
      "Instagram Growth",
      "Facebook Campaigns",
      "LinkedIn Content",
      "Reels Direction",
      "Community Management"
    ],
    "stats": [
      "Consistent posting",
      "Higher engagement",
      "Brand recall"
    ],
    "process": [
      "Profile Audit",
      "Content Plan",
      "Creative Production",
      "Growth Review"
    ],
    "kps": [
      {
        "title": "Content Strategy",
        "desc": "We plan content around customer questions, offers, trust points, results, and brand personality rather than random posts."
      },
      {
        "title": "Creative Direction",
        "desc": "Post formats, reels ideas, captions, and campaign themes are created with a polished visual system."
      },
      {
        "title": "Lead-Oriented Social",
        "desc": "Profiles, highlights, bios, and calls-to-action are structured so social traffic can turn into enquiries."
      },
      {
        "title": "Monthly Improvement",
        "desc": "We review reach, saves, shares, profile visits, enquiries, and content winners to improve the next month."
      }
    ]
  },
  "startups": {
    "title": "Startups",
    "rows": [
      "MVP Landing Pages",
      "Launch Campaigns",
      "Investor-Ready Assets",
      "Growth Experiments"
    ],
    "bullets": [
      "MVP Landing Pages",
      "Launch Campaigns",
      "Investor-Ready Assets",
      "Growth Experiments",
      "Brand Identity",
      "Analytics Setup"
    ],
    "stats": [
      "Fast launch",
      "Lean budget",
      "Scalable foundation"
    ],
    "process": [
      "Brand Sprint",
      "Website Launch",
      "Growth Experiments",
      "Scale & Optimize"
    ],
    "kps": [
      {
        "title": "Launch in Weeks, Not Months",
        "desc": "We move at startup speed. Brand, website, and first growth campaigns can be live within 4 weeks of kick-off — no corporate delays."
      },
      {
        "title": "Investor-Ready Materials",
        "desc": "Pitch decks, one-pagers, project showcase, and landing pages designed to build credibility with angels and VCs."
      },
      {
        "title": "Growth Experimentation",
        "desc": "Rapid A/B testing, channel experiments, and weekly iteration to find your acquisition flywheel before you scale spend."
      },
      {
        "title": "Startup-Friendly Delivery",
        "desc": "Flexible project scopes built for bootstrapped and growing companies. Start focused, launch professionally, and scale features as the business grows."
      }
    ]
  },
  "uiux-design": {
    "title": "UI/UX Design",
    "rows": [
      "Wireframes & Prototypes",
      "Design Systems",
      "User Research",
      "Brand Identity"
    ],
    "bullets": [
      "Wireframes & Prototypes",
      "Design Systems",
      "User Research",
      "Brand Identity",
      "Motion Design",
      "Conversion Optimization"
    ],
    "stats": [
      "3x clearer journeys",
      "Design system ready",
      "+28% conversions"
    ],
    "process": [
      "Research & Discovery",
      "Wireframes",
      "Visual Design",
      "Prototype & Handoff"
    ],
    "kps": [
      {
        "title": "User Research & Testing",
        "desc": "We interview real users, run usability tests, and analyze heatmaps before designing a single screen — so we know exactly what they need."
      },
      {
        "title": "Design Systems",
        "desc": "Component libraries and design tokens that keep your product consistent across platforms and speed up development by 50%."
      },
      {
        "title": "Brand Identity",
        "desc": "Logos, color palettes, typography, and brand guidelines that create a memorable, professional identity your audience trusts."
      },
      {
        "title": "Prototyping & Handoff",
        "desc": "Fully clickable Figma prototypes for stakeholder approval, plus developer-ready handoff files with every spec documented."
      }
    ]
  },
  "web-development": {
    "title": "Web Development",
    "rows": [
      "Custom React Websites",
      "E-commerce Development",
      "Landing Pages",
      "CMS Integration"
    ],
    "bullets": [
      "Custom React Websites",
      "E-commerce Development",
      "Landing Pages",
      "CMS Integration",
      "API & Integrations",
      "Website Maintenance"
    ],
    "stats": [
      "95+ performance score",
      "50% faster load",
      "Mobile-first UX"
    ],
    "process": [
      "Discovery & Wireframing",
      "Design Mockups",
      "Development",
      "QA & Launch"
    ],
    "kps": [
      {
        "title": "Custom Design",
        "desc": "No templates. Every website is designed from scratch to reflect your brand, speak to your audience, and stand out from competitors."
      },
      {
        "title": "Speed Optimized",
        "desc": "We target 95+ Google PageSpeed scores. Fast websites rank better on Google and convert up to 40% more visitors."
      },
      {
        "title": "SEO-Ready Architecture",
        "desc": "Built with clean code, proper schema markup, optimized metadata, and technical SEO best practices from day one."
      },
      {
        "title": "Scalable & Secure",
        "desc": "From startups to enterprise, our builds are production-grade with SSL, GDPR compliance, and infrastructure that scales."
      }
    ]
  },
  "website-maintenance": {
    "title": "Website Maintenance",
    "rows": [
      "Content Updates",
      "Bug Fixes",
      "Speed Checks",
      "Security Review"
    ],
    "bullets": [
      "Content Updates",
      "Bug Fixes",
      "Speed Checks",
      "Security Review",
      "Backup Support",
      "Monthly Improvements"
    ],
    "stats": [
      "Updated site",
      "Fewer issues",
      "Long-term support"
    ],
    "process": [
      "Site Review",
      "Update Plan",
      "Fix & Improve",
      "Monthly Support"
    ],
    "kps": [
      {
        "title": "Regular Improvements",
        "desc": "Small updates keep the website fresh, useful, and aligned with new offers or services."
      },
      {
        "title": "Technical Health",
        "desc": "We monitor common issues like broken links, slow pages, layout problems, and outdated assets."
      },
      {
        "title": "Content Support",
        "desc": "New sections, project updates, FAQs, blogs, and service details can be added cleanly."
      },
      {
        "title": "Launch Confidence",
        "desc": "Post-launch support gives your business a reliable partner when changes are needed."
      }
    ]
  }
};

  function normalize(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function route() {
    return (window.location.hash || '#/home').replace(/^#\/?/, '').split('?')[0] || 'home';
  }

  function currentData() {
    return PAGE_FIX_DATA[route()] || null;
  }

  function topic(data) {
    var value = (data && data.title || '').toLowerCase();
    if (value.indexOf('seo') > -1) return 'search visibility';
    if (value.indexOf('ppc') > -1 || value.indexOf('ads') > -1) return 'paid performance';
    if (value.indexOf('social') > -1) return 'social trust';
    if (value.indexOf('content') > -1) return 'content authority';
    if (value.indexOf('email') > -1) return 'retention';
    if (value.indexOf('lead') > -1) return 'qualified enquiries';
    if (value.indexOf('analytics') > -1) return 'clear reporting';
    if (value.indexOf('web') > -1) return 'website conversion';
    if (value.indexOf('app') > -1) return 'mobile UX';
    if (value.indexOf('software') > -1) return 'workflow automation';
    if (value.indexOf('api') > -1) return 'connected systems';
    if (value.indexOf('cloud') > -1) return 'reliable deployment';
    if (value.indexOf('maintenance') > -1) return 'site health';
    if (value.indexOf('commerce') > -1) return 'store revenue';
    if (value.indexOf('healthcare') > -1) return 'patient enquiries';
    if (value.indexOf('real estate') > -1) return 'property leads';
    return 'business growth';
  }

  function ensureStyle() {
    var old = document.getElementById(STYLE_ID);
    if (old) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      'html,body,#root{transform:none!important;translate:none!important;scale:none!important;rotate:none!important;}body{padding-top:0!important;overflow-x:clip!important;}',
      '.site-compact{padding-top:64px!important;}@media (min-width:1024px){.site-compact{padding-top:80px!important;}}',
      '.app-fixed-header,body>.app-fixed-header,body>header.app-fixed-header{position:fixed!important;top:0!important;right:0!important;bottom:auto!important;left:0!important;width:100%!important;max-width:none!important;height:64px!important;min-height:64px!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;z-index:2147483647!important;transform:none!important;translate:none!important;scale:none!important;rotate:none!important;background:var(--header-bg,transparent)!important;border-bottom:1px solid var(--header-border,transparent)!important;box-shadow:var(--header-shadow,none)!important;}@media (min-width:1024px){.app-fixed-header,body>.app-fixed-header,body>header.app-fixed-header{height:80px!important;min-height:80px!important;}}',
      '.app-fixed-header.aura-header-stable{contain:layout!important;transition:background-color .18s ease,border-color .18s ease,box-shadow .18s ease!important}.app-fixed-header.aura-header-stable>.max-w-7xl,.app-fixed-header.aura-header-stable>div{height:100%!important;min-height:inherit!important;width:100%!important}.app-fixed-header.aura-header-stable .hdrx-link{min-height:36px!important;transform:none!important}.app-fixed-header.aura-header-stable .btn-primary{min-height:48px!important;white-space:nowrap!important}',
      'html.aura-blog-nav-plain .app-fixed-header .hidden.lg\\:flex.items-center.gap-1>.relative>button.hdrx-link{background:transparent!important;border:0!important;box-shadow:none!important;color:var(--header-text,#fff)!important;border-radius:.5rem!important;}html.aura-blog-nav-plain .app-fixed-header .hidden.lg\\:flex.items-center.gap-1>.relative>button.hdrx-link:hover{background:transparent!important;color:#f5aa02!important;}html.aura-blog-nav-plain .app-fixed-header span[aria-disabled="true"].hdrx-link{color:rgba(255,255,255,.72)!important;-webkit-text-fill-color:rgba(255,255,255,.72)!important;opacity:1!important;}html.aura-blog-nav-plain .app-fixed-header span[aria-disabled="true"].hdrx-link:hover,html.aura-blog-nav-plain .app-fixed-header span[aria-disabled="true"].hdrx-link:focus{color:rgba(255,255,255,.86)!important;-webkit-text-fill-color:rgba(255,255,255,.86)!important;background:transparent!important;}',
      'html.aura-blog-detail .blog-article-section-dark{background:linear-gradient(135deg,#07111f,#111827 55%,#1f2937)!important;border-color:rgba(255,255,255,.12)!important;}html.aura-blog-detail .blog-article-section-dark .aura-dark-readable:not(.blog-article-section){background:#111827!important;border-color:rgba(255,255,255,.12)!important;}html.aura-blog-detail .aura-dark-readable,html.aura-blog-detail .aura-dark-readable :where(h2,h3,h4,p,li,summary,strong,b){color:#fff!important;-webkit-text-fill-color:#fff!important;}html.aura-blog-detail .aura-dark-readable :where(svg){color:#f5aa02!important;stroke:#f5aa02!important;}html.aura-blog-detail .aura-dark-readable .text-\\[\\#f5aa02\\],html.aura-blog-detail .aura-dark-readable .text-primary-light{color:#f5aa02!important;-webkit-text-fill-color:#f5aa02!important;}html.aura-blog-detail .aura-dark-readable :where(.bg-white,.bg-\\[\\#fff8e6\\],.bg-\\[\\#fbfaf7\\],.bg-\\[\\#f8f7f4\\]) :where(h2,h3,h4,p,span,li,summary,strong,b){color:#334155!important;-webkit-text-fill-color:#334155!important;}',
      'button[aria-label="Back to top"]{position:fixed!important;opacity:1!important;visibility:visible!important;display:flex!important;transform:translateZ(0)!important;pointer-events:auto!important;z-index:2147483646!important;}',
      '.detail-page-shell .included-sticky-card h3,.detail-page-shell .included-sticky-card p,.detail-page-shell .page-specific-card h3,.detail-page-shell .page-specific-card p{white-space:normal!important;overflow:visible!important;text-overflow:clip!important;overflow-wrap:break-word!important;word-break:normal!important;}',
      '@media (max-width:1023px){body>.mobile-nav-panel{position:fixed!important;top:64px!important;height:calc(100dvh - 64px)!important;max-height:calc(100dvh - 64px)!important;z-index:2147483646!important;}button[aria-label="Back to top"]{right:1rem!important;bottom:max(1rem,env(safe-area-inset-bottom))!important;}}',
      '@media (max-width:768px){.detail-page-shell .included-scroll-section{padding:1.25rem 0 2rem!important;overflow:visible!important;}.detail-page-shell .included-scroll-wrap{display:block!important;width:100%!important;max-width:100%!important;padding:0!important;overflow:visible!important;}.detail-page-shell .included-scroll-heading{position:relative!important;top:auto!important;width:100%!important;max-width:100%!important;margin:0 0 1rem!important;padding:0 1rem!important;box-sizing:border-box!important;z-index:1!important;}.detail-page-shell .included-scroll-heading h2{width:100%!important;max-width:100%!important;font-size:clamp(2rem,9vw,2.65rem)!important;line-height:1.05!important;overflow:visible!important;overflow-wrap:break-word!important;word-break:normal!important;}.detail-page-shell .included-card-stack{display:grid!important;grid-template-columns:1fr!important;gap:1rem!important;width:100%!important;padding:0 .85rem!important;box-sizing:border-box!important;}.detail-page-shell .included-sticky-card{position:relative!important;top:auto!important;min-height:0!important;width:100%!important;transform:none!important;padding:1.05rem!important;align-items:flex-start!important;z-index:1!important;}}',
      '.detail-page-shell .included-scroll-section{overflow:visible!important}.detail-page-shell .included-scroll-wrap{display:grid!important;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)!important;gap:clamp(1rem,3vw,2.5rem)!important;align-items:start!important}.detail-page-shell .included-scroll-heading{position:sticky!important;top:calc(80px + 1rem)!important;align-self:start!important}.detail-page-shell .included-card-stack{display:grid!important;grid-template-columns:1fr!important;gap:1rem!important;overflow:visible!important}.detail-page-shell .included-sticky-card{position:sticky!important;top:calc(80px + 1.25rem)!important;min-height:150px!important;transform:none!important;align-items:flex-start!important}',
      '@media (max-width:768px){.detail-page-shell .included-scroll-section{padding:1.15rem 0 2.5rem!important;overflow:visible!important}.detail-page-shell .included-scroll-wrap{display:grid!important;grid-template-columns:1fr!important;gap:.9rem!important;width:100%!important;max-width:100%!important;padding:0 .85rem!important;overflow:visible!important}.detail-page-shell .included-scroll-heading{position:relative!important;top:auto!important;margin:0!important;padding:0 .15rem!important}.detail-page-shell .included-card-stack{display:grid!important;grid-template-columns:1fr!important;gap:.85rem!important;padding:0!important;overflow:visible!important}.detail-page-shell .included-sticky-card{position:sticky!important;top:calc(64px + .8rem)!important;min-height:158px!important;width:100%!important;padding:1.1rem!important;transform:none!important;z-index:2!important}}',
      '@media (max-width:768px){.min-h-\\[58svh\\],.marketing-scroll-scene{min-height:104svh!important}.min-h-\\[calc\\(58svh-1rem\\)\\],.marketing-scroll-sticky{min-height:calc(74svh - 1rem)!important}.md\\:sticky{position:sticky!important}.md\\:top-20{top:4rem!important}.marketing-scroll-scene{padding-top:.25rem!important;padding-bottom:.25rem!important}.marketing-scroll-sticky{display:flex!important;align-items:flex-start!important;justify-content:center!important;padding-top:.75rem!important}.marketing-scroll-sticky h2{margin-bottom:.25rem!important;font-size:clamp(2rem,10vw,3rem)!important}.marketing-scroll-sticky p{margin-bottom:.65rem!important}.marketing-scroll-sticky img{max-height:38svh!important;min-height:0!important}}',
      '@media (min-width:1024px){#services-scroll-section .services-scroll-stage{min-height:calc(100svh - 80px)!important;padding-top:1.25rem!important;padding-bottom:1.25rem!important}#services-scroll-section .services-scroll-grid{gap:1.5rem!important}#services-scroll-section .services-result-panel{height:auto!important;padding:1.5rem!important;transform:translateY(-36px)!important}#services-scroll-section .services-result-panel .service-visual{height:165px!important;min-height:165px!important}#services-scroll-section .services-result-panel .phone-shell{height:145px!important;min-height:0!important}}',
      '@media (min-width:1024px) and (max-height:820px){#services-scroll-section .services-scroll-stage{padding-top:.75rem!important;padding-bottom:.75rem!important}#services-scroll-section .services-result-panel{padding:1rem!important}#services-scroll-section .services-result-panel .service-visual{height:125px!important;min-height:125px!important}#services-scroll-section .services-result-panel .phone-shell{height:112px!important}#services-scroll-section .services-result-panel h3{font-size:1.75rem!important}#services-scroll-section .services-result-panel p{line-height:1.45!important}}',
      '.aura-hidden-hero-badge,.aura-contact-quick-link{display:none!important}.aura-contact-hero{min-height:0!important;height:auto!important;padding-bottom:clamp(2rem,4vw,3.5rem)!important}.aura-about-trust-badge{margin-top:clamp(1rem,2.5vw,2.25rem)!important}.aura-contact-hero-title{margin-top:clamp(1.75rem,4vw,3.5rem)!important}.aura-contact-separator{display:inline-block!important;margin:0 .08em!important;font-weight:400!important;opacity:.62!important;transform:scaleX(.72)!important}html.aura-about-page .aura-about-hero-title{width:min(100%,1050px)!important;max-width:1050px!important;margin:.625rem auto 0!important;text-align:center!important;text-wrap:balance!important}html.aura-about-page .aura-about-hero-copy{width:min(100%,850px)!important;max-width:850px!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;text-wrap:pretty!important}',
      '@keyframes aura-blog-orbit{to{transform:rotate(360deg)}}@keyframes aura-blog-float{0%,100%{transform:translate3d(0,0,0) rotateX(58deg) rotateZ(-12deg)}50%{transform:translate3d(0,-24px,35px) rotateX(48deg) rotateZ(12deg)}}@keyframes aura-blog-cube{0%,100%{transform:rotateX(-18deg) rotateY(25deg) translateY(0)}50%{transform:rotateX(18deg) rotateY(65deg) translateY(-18px)}}@keyframes aura-blog-pulse{0%,100%{opacity:.35;transform:scale(.92)}50%{opacity:.8;transform:scale(1.08)}}',
      'html.aura-blog-3d .premium-blog-page{background:radial-gradient(circle at 12% 7%,rgba(245,170,2,.15),transparent 25%),radial-gradient(circle at 88% 24%,rgba(30,58,95,.7),transparent 30%),linear-gradient(145deg,#050a12,#081321 48%,#0c1b2d)!important;perspective:1400px}html.aura-blog-3d .premium-blog-page main{background:transparent!important}html.aura-blog-3d .premium-blog-page main>section:not(:first-child){background:linear-gradient(180deg,rgba(7,17,31,.78),rgba(10,25,42,.92))!important;border-top:1px solid rgba(245,170,2,.12)}html.aura-blog-3d .premium-blog-page .aura-blog-white-copy,html.aura-blog-3d .premium-blog-page .aura-blog-white-copy .text-secondary{color:#fff!important;-webkit-text-fill-color:#fff!important}html.aura-blog-3d .premium-blog-page .home-growth-cta h2,html.aura-blog-3d .premium-blog-page .home-growth-cta h3,html.aura-blog-3d .premium-blog-page .home-growth-cta strong,html.aura-blog-3d .premium-blog-page .home-growth-cta .cta-proof-chip span{color:#fff!important;-webkit-text-fill-color:#fff!important}html.aura-blog-3d .premium-blog-page .home-growth-cta p,html.aura-blog-3d .premium-blog-page .home-growth-cta .cta-proof-chip p{color:#cbd5e1!important;-webkit-text-fill-color:#cbd5e1!important}',
      'html.aura-blog-3d .premium-blog-page{perspective:none!important;transform:none!important}html.aura-blog-3d .premium-blog-page main{perspective:1400px}',
      '.aura-blog-depth-scene{inset:0;overflow:hidden;pointer-events:none;position:fixed!important;z-index:0!important;transform:rotateX(var(--aura-blog-x,0deg)) rotateY(var(--aura-blog-y,0deg));transform-style:preserve-3d;transition:transform .5s cubic-bezier(.16,1,.3,1)}.aura-blog-depth-grid{background-image:linear-gradient(rgba(245,170,2,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(245,170,2,.055) 1px,transparent 1px);background-size:64px 64px;bottom:-14%;height:58%;left:-10%;mask-image:linear-gradient(to top,#000,transparent);opacity:.58;position:absolute;transform:perspective(600px) rotateX(62deg);width:120%}.aura-blog-depth-orb{animation:aura-blog-float 10s ease-in-out infinite;border:1px solid rgba(245,170,2,.32);border-radius:50%;box-shadow:0 0 70px rgba(245,170,2,.08),inset 0 0 45px rgba(245,170,2,.05);height:240px;position:absolute;right:3%;top:25%;transform-style:preserve-3d;width:240px}.aura-blog-depth-orb:before,.aura-blog-depth-orb:after{border:1px solid rgba(245,170,2,.22);border-radius:50%;content:"";inset:18%;position:absolute}.aura-blog-depth-orb:before{transform:rotateX(68deg)}.aura-blog-depth-orb:after{transform:rotateY(68deg)}.aura-blog-depth-prism{animation:aura-blog-cube 9s ease-in-out infinite;background:linear-gradient(145deg,rgba(245,170,2,.18),rgba(13,39,67,.08));border:1px solid rgba(245,170,2,.28);box-shadow:18px 24px 45px rgba(0,0,0,.3);height:82px;left:5%;position:absolute;top:58%;transform-style:preserve-3d;width:82px}.aura-blog-depth-prism:before{background:rgba(245,170,2,.06);border:1px solid rgba(245,170,2,.2);content:"";inset:12px;position:absolute;transform:translateZ(22px) rotate(45deg)}',
      '.aura-blog-hero-object{height:330px;opacity:.82;pointer-events:none;position:absolute;right:clamp(-80px,2vw,40px);top:50%;transform:translateY(-46%) rotateX(calc(60deg + var(--aura-blog-x,0deg))) rotateZ(calc(-10deg + var(--aura-blog-y,0deg)));transform-style:preserve-3d;width:330px;z-index:1}.aura-blog-hero-ring,.aura-blog-hero-ring:before,.aura-blog-hero-ring:after{border:1px solid rgba(245,170,2,.36);border-radius:50%;inset:0;position:absolute}.aura-blog-hero-ring{animation:aura-blog-orbit 24s linear infinite;box-shadow:0 0 70px rgba(245,170,2,.1),inset 0 0 55px rgba(245,170,2,.06)}.aura-blog-hero-ring:before{content:"";inset:14%;transform:rotateX(68deg)}.aura-blog-hero-ring:after{content:"";inset:30%;transform:rotateY(68deg)}.aura-blog-hero-core{animation:aura-blog-pulse 4.8s ease-in-out infinite;background:radial-gradient(circle at 32% 28%,#fff4c2,#f5aa02 35%,#8d5b00 72%,#07152f);border-radius:50%;box-shadow:0 0 55px rgba(245,170,2,.28);height:72px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:72px}.aura-blog-hero-particle{background:#f5aa02;border-radius:50%;box-shadow:0 0 16px rgba(245,170,2,.8);height:7px;position:absolute;width:7px}.aura-blog-hero-particle:nth-child(3){left:15%;top:28%}.aura-blog-hero-particle:nth-child(4){right:12%;top:42%}.aura-blog-hero-particle:nth-child(5){bottom:18%;left:38%}',
      'html.aura-blog-3d .premium-blog-page .blx-card,html.aura-blog-3d .premium-blog-page .grid>div .blx-card:hover{backface-visibility:visible!important;transform:none!important;transform-style:flat!important;transition:box-shadow .4s ease,border-color .35s ease!important;will-change:auto!important}html.aura-blog-3d .premium-blog-page .blx-card:hover{border-color:rgba(245,170,2,.55)!important;box-shadow:0 26px 60px rgba(0,0,0,.46),0 0 28px rgba(245,170,2,.07)!important}html.aura-blog-3d .premium-blog-page .blx-card .blx-thumb-wrap,html.aura-blog-3d .premium-blog-page .blx-card .p-7{transform:none!important}',
      '@keyframes aura-top-card-enter{0%{opacity:0;translate:0 18px}100%{opacity:1;translate:0 0}}html.aura-blog-3d .aura-stable-top-card-wrap{animation:none!important;filter:none!important;opacity:1!important;transform:none!important;will-change:auto!important}html.aura-blog-3d .aura-stable-top-card{animation:aura-top-card-enter .68s cubic-bezier(.16,1,.3,1) var(--aura-card-delay,0ms) both!important;animation-iteration-count:1!important;backface-visibility:visible!important;transform:none!important;transform-style:flat!important;transition:transform .24s ease,box-shadow .35s ease,border-color .35s ease!important;will-change:auto!important}html.aura-blog-3d .aura-stable-top-card:hover{transform:translateY(-4px)!important}html.aura-blog-3d .aura-stable-top-card:before,html.aura-blog-3d .aura-stable-top-card:after,html.aura-blog-3d .aura-stable-top-card *{animation:none!important}html.aura-blog-3d .aura-stable-top-card:hover img{filter:none!important;transform:none!important}@media(prefers-reduced-motion:reduce){html.aura-blog-3d .aura-stable-top-card{animation:none!important;opacity:1!important;translate:none!important}html.aura-blog-3d .aura-stable-top-card:hover{transform:none!important}}',
      '@media(max-width:1023px){.aura-blog-hero-object{opacity:.32;right:-130px;width:280px;height:280px}.aura-blog-depth-orb{opacity:.35;right:-110px}}@media(max-width:768px){.aura-blog-depth-scene,.aura-blog-hero-object{display:none!important}html.aura-blog-3d .premium-blog-page .blx-card,html.aura-blog-3d .premium-blog-page .grid>div .blx-card:hover{transform:translateY(0)!important}}@media(prefers-reduced-motion:reduce){.aura-blog-depth-orb,.aura-blog-depth-prism,.aura-blog-hero-core,.aura-blog-hero-ring{animation:none!important}.aura-blog-depth-scene{transform:none!important}html.aura-blog-3d .premium-blog-page .blx-card{transition:none!important}}',
      '@keyframes aura-ai-nav-3d{0%{transform:rotateX(18deg) rotateY(0deg) rotateZ(-8deg)}50%{transform:rotateX(-12deg) rotateY(180deg) rotateZ(8deg)}100%{transform:rotateX(18deg) rotateY(360deg) rotateZ(-8deg)}}@keyframes aura-ai-nav-glow{0%,100%{opacity:.45;transform:scale(.82)}50%{opacity:1;transform:scale(1.12)}}',
      '@media(min-width:1024px){.app-fixed-header .max-w-7xl{max-width:1480px!important}.app-fixed-header .aura-ai-original-hidden{display:none!important}.app-fixed-header .aura-ai-workforce-cta{align-items:center!important;color:#f5aa02!important;display:inline-flex!important;gap:.55rem!important;margin-left:1.35rem!important;margin-right:.65rem!important;padding:.55rem .35rem!important;position:relative!important;-webkit-text-fill-color:#f5aa02!important;font-size:.9rem!important;font-weight:800!important;white-space:nowrap!important}.app-fixed-header .aura-ai-workforce-cta:hover,.app-fixed-header .aura-ai-workforce-cta:focus{background:transparent!important;color:#f5aa02!important;-webkit-text-fill-color:#f5aa02!important}.app-fixed-header .aura-ai-workforce-cta:after{background:#07152f;border:1px solid rgba(245,170,2,.45);border-radius:.55rem;box-shadow:0 12px 30px rgba(0,0,0,.28);color:#f5aa02;content:"Coming Soon";font-size:.7rem;font-weight:800;left:50%;opacity:0;padding:.42rem .65rem;pointer-events:none;position:absolute;top:calc(100% + .55rem);transform:translate(-50%,-5px);transition:opacity .2s ease,transform .2s ease;visibility:hidden;z-index:2147483647}.app-fixed-header .aura-ai-workforce-cta:hover:after,.app-fixed-header .aura-ai-workforce-cta:focus:after{opacity:1;transform:translate(-50%,0);visibility:visible}.aura-ai-mini-object{animation:aura-ai-nav-3d 5.5s linear infinite;display:inline-block;flex:0 0 23px;height:23px;perspective:120px;position:relative;transform-style:preserve-3d;width:23px}.aura-ai-mini-object:before,.aura-ai-mini-object:after{border:1.5px solid currentColor;border-radius:50%;content:"";inset:2px;position:absolute}.aura-ai-mini-object:before{transform:rotateX(68deg)}.aura-ai-mini-object:after{transform:rotateY(68deg)}.aura-ai-mini-object i{animation:aura-ai-nav-glow 2.4s ease-in-out infinite;background:#f5aa02;border-radius:50%;box-shadow:0 0 13px rgba(245,170,2,.8);height:6px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:6px}.aura-ai-nav-label{color:inherit!important;-webkit-text-fill-color:inherit!important}}@media(min-width:1024px) and (max-width:1350px){.app-fixed-header .aura-ai-workforce-cta{margin-left:.45rem!important;margin-right:.25rem!important}.app-fixed-header .aura-ai-workforce-cta .aura-ai-nav-label{display:none!important}}@media(prefers-reduced-motion:reduce){.aura-ai-mini-object,.aura-ai-mini-object i{animation:none!important}}',
      'html.aura-blog-3d .app-fixed-header button.hdrx-link{background:transparent!important;border-color:transparent!important;box-shadow:none!important;color:var(--header-text,#fff)!important;-webkit-text-fill-color:var(--header-text,#fff)!important}html.aura-blog-3d .app-fixed-header button.hdrx-link:hover{background:transparent!important;color:#f5aa02!important;-webkit-text-fill-color:#f5aa02!important}',
      'html.aura-blog-3d .app-fixed-header .mega-menu-panel-development{background:radial-gradient(circle at 12% 10%,rgba(245,170,2,.18),transparent 32%),linear-gradient(145deg,rgba(3,7,18,.97),rgba(10,20,44,.99) 54%,rgba(4,9,22,.99))!important;border-color:rgba(245,170,2,.28)!important;box-shadow:0 30px 90px rgba(2,6,23,.4),inset 0 0 0 1px rgba(255,255,255,.08)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel-marketing{background:radial-gradient(circle at 12% 10%,rgba(245,170,2,.24),transparent 32%),radial-gradient(circle at 86% 12%,rgba(255,255,255,.14),transparent 26%),linear-gradient(145deg,rgba(3,7,18,.96),rgba(10,20,44,.98) 54%,rgba(4,9,22,.98))!important;border-color:rgba(245,170,2,.28)!important;box-shadow:0 30px 90px rgba(2,6,23,.4),inset 0 0 0 1px rgba(255,255,255,.08)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel-solutions{background:#07152f!important;border-color:rgba(255,255,255,.12)!important;box-shadow:0 28px 70px rgba(7,21,47,.34)!important}',
      'html.aura-blog-3d .app-fixed-header .mega-menu-panel .mega-menu-columns{background:transparent!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel .mega-menu-title{color:#fff!important;-webkit-text-fill-color:#fff!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel .mega-menu-desc,html.aura-blog-3d .app-fixed-header .mega-menu-panel .mega-menu-footer p{color:rgba(255,255,255,.66)!important;-webkit-text-fill-color:rgba(255,255,255,.66)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel-development .mega-menu-heading,html.aura-blog-3d .app-fixed-header .mega-menu-panel-marketing .mega-menu-heading{color:#f5aa02!important;-webkit-text-fill-color:#f5aa02!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel-solutions .mega-menu-heading{color:rgba(255,255,255,.66)!important;-webkit-text-fill-color:rgba(255,255,255,.66)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel .mega-menu-link{background:rgba(255,255,255,.055)!important;border-color:rgba(255,255,255,.08)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel .mega-menu-link:hover{background:rgba(255,255,255,.105)!important;border-color:rgba(245,170,2,.34)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel-development .mega-menu-icon,html.aura-blog-3d .app-fixed-header .mega-menu-panel-marketing .mega-menu-icon{background:linear-gradient(145deg,rgba(245,170,2,.2),rgba(255,255,255,.08))!important;border-color:rgba(245,170,2,.24)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel-development .mega-menu-icon svg,html.aura-blog-3d .app-fixed-header .mega-menu-panel-marketing .mega-menu-icon svg{color:#f5aa02!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel-solutions .mega-menu-icon{background:rgba(255,255,255,.1)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel-solutions .mega-menu-icon svg{color:#fff!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel .mega-menu-footer{background:rgba(9,18,38,.96)!important;border-color:rgba(255,255,255,.1)!important}html.aura-blog-3d .app-fixed-header .mega-menu-panel .mega-menu-footer a{color:#fff3b0!important;-webkit-text-fill-color:#fff3b0!important}',
      'html.aura-blog-3d .mega-menu-panel-development{background:radial-gradient(circle at 12% 10%,rgba(245,170,2,.18),transparent 32%),linear-gradient(145deg,rgba(3,7,18,.97),rgba(10,20,44,.99) 54%,rgba(4,9,22,.99))!important;border-color:rgba(245,170,2,.28)!important}html.aura-blog-3d .mega-menu-panel-marketing{background:radial-gradient(circle at 12% 10%,rgba(245,170,2,.24),transparent 32%),radial-gradient(circle at 86% 12%,rgba(255,255,255,.14),transparent 26%),linear-gradient(145deg,rgba(3,7,18,.96),rgba(10,20,44,.98) 54%,rgba(4,9,22,.98))!important;border-color:rgba(245,170,2,.28)!important}html.aura-blog-3d .mega-menu-panel-solutions{background:#07152f!important;border-color:rgba(255,255,255,.12)!important}',
      'html.aura-blog-3d .mega-menu-panel .mega-menu-columns{background:transparent!important}html.aura-blog-3d .mega-menu-panel .mega-menu-title{color:#fff!important;-webkit-text-fill-color:#fff!important}html.aura-blog-3d .mega-menu-panel :is(.mega-menu-desc,.mega-menu-footer p){color:rgba(255,255,255,.66)!important;-webkit-text-fill-color:rgba(255,255,255,.66)!important}html.aura-blog-3d :is(.mega-menu-panel-development,.mega-menu-panel-marketing) .mega-menu-heading{color:#f5aa02!important;-webkit-text-fill-color:#f5aa02!important}html.aura-blog-3d .mega-menu-panel-solutions .mega-menu-heading{color:rgba(255,255,255,.66)!important;-webkit-text-fill-color:rgba(255,255,255,.66)!important}html.aura-blog-3d .mega-menu-panel .mega-menu-link{background:rgba(255,255,255,.055)!important;border-color:rgba(255,255,255,.08)!important}html.aura-blog-3d .mega-menu-panel .mega-menu-link:hover{background:rgba(255,255,255,.105)!important;border-color:rgba(245,170,2,.34)!important}html.aura-blog-3d .mega-menu-panel .mega-menu-footer{background:rgba(9,18,38,.96)!important;border-color:rgba(255,255,255,.1)!important}html.aura-blog-3d .mega-menu-panel .mega-menu-footer a{color:#fff3b0!important;-webkit-text-fill-color:#fff3b0!important}',
      'html.aura-blog-3d .premium-blog-page .blx-filterbar .aura-blog-filter-stable,html.aura-blog-3d .premium-blog-page .blx-filterbar .aura-blog-filter-stable:hover,html.aura-blog-3d .premium-blog-page .blx-filterbar .aura-blog-filter-stable:focus{background:#f5aa02!important;border-color:#f5aa02!important;box-shadow:0 10px 24px rgba(245,170,2,.18)!important;color:#07111f!important;-webkit-text-fill-color:#07111f!important;filter:none!important}',
      'html.aura-blog-3d .app-fixed-header .btn-primary,html.aura-blog-3d .app-fixed-header .btn-primary:hover,html.aura-blog-3d .app-fixed-header .btn-primary:focus{background:#f5aa02!important;border-color:#f5aa02!important;color:#07111f!important;-webkit-text-fill-color:#07111f!important;filter:none!important}',
      'html.aura-blog-3d .premium-blog-page .blx-readmore{cursor:pointer!important;pointer-events:auto!important;position:relative!important;z-index:5!important}',
      'html.aura-contact-route main *{animation-delay:0s!important;transition-delay:0s!important}html.aura-contact-route .contact-spline-hero{contain:paint;isolation:isolate}html.aura-contact-route .contact-spline-scene{backface-visibility:hidden;contain:paint;transform:translateZ(0)}html.aura-contact-route .contact-spline-scene canvas{backface-visibility:hidden;height:100%!important;transform:translateZ(0);width:100%!important;will-change:auto!important}',
      '.case-study-section-remove{display:none!important}',
      '.contact-success-message{margin-top:.75rem!important;color:#16a34a!important;font-size:.875rem!important;line-height:1.35!important;font-weight:800!important}.contact-error-message{margin-top:.75rem!important;color:#dc2626!important;font-size:.875rem!important;line-height:1.35!important;font-weight:800!important}',
      '.logo-marquee-section{display:block!important;visibility:visible!important;opacity:1!important;overflow:hidden!important}.logo-marquee-section .logo-marquee-track{display:flex!important;min-width:max-content!important;width:max-content!important;will-change:transform!important}.logo-marquee-section span{white-space:nowrap!important}',
      '@media (max-width:768px){.logo-marquee-section{display:block!important;visibility:visible!important;opacity:1!important;padding-top:18px!important;padding-bottom:18px!important}.logo-marquee-section .max-w-7xl{margin-bottom:12px!important}.logo-marquee-section .absolute.left-0,.logo-marquee-section .absolute.right-0{width:42px!important}.logo-marquee-section .logo-marquee-track,.logo-marquee-section .gap-10{gap:20px!important}.logo-marquee-section .text-2xl,.logo-marquee-section span{font-size:17px!important;line-height:1.25!important;white-space:nowrap!important}}',
      '@media (max-width:768px){.home-growth-suite-section{padding-top:44px!important;padding-bottom:44px!important;overflow:hidden!important}.home-growth-suite-section .max-w-4xl{margin-bottom:24px!important}.home-growth-suite-section h2{font-size:clamp(2rem,9vw,2.75rem)!important;line-height:1.08!important;overflow:visible!important;overflow-wrap:anywhere!important;word-break:normal!important}.home-growth-suite-section p,.home-growth-suite-section h3,.home-growth-suite-section span{max-width:100%!important;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;overflow-wrap:anywhere!important;word-break:normal!important}.home-growth-feature-card,.home-growth-pillar-card{width:100%!important;max-width:100%!important;min-width:0!important;border-radius:18px!important;padding:18px!important}.home-growth-suite-section .grid{min-width:0!important}.home-growth-suite-section .grid.sm\\:grid-cols-2{grid-template-columns:1fr!important}.home-growth-deliverable{min-width:0!important;padding:12px!important;align-items:flex-start!important}.home-growth-deliverable span{font-size:13px!important;line-height:1.35!important}}',
      '@media(min-width:769px){#industry-scroll-story img.industry-video-poster{display:none!important}}#industry-scroll-story .industry-video{filter:saturate(1.04) contrast(1.02) brightness(1.08)!important;image-rendering:auto!important;object-fit:cover!important;object-position:center center!important}#industry-scroll-story .industry-video-soft-overlay{background:rgba(0,0,0,.18)!important}#industry-scroll-story .industry-video-side-overlay{background:linear-gradient(90deg,rgba(0,0,0,.32),rgba(0,0,0,.08),rgba(0,0,0,.18))!important}#industry-scroll-story .industry-video-bottom-overlay{background:linear-gradient(180deg,rgba(0,0,0,.08),transparent 45%,rgba(0,0,0,.28))!important}#industry-scroll-story .industry-video-glow{opacity:.45!important}',
      '.development-detail-page section.development-keypoints-section,.development-detail-page section.page-specific-detail-section,.development-detail-page section.service-faq-section{background:#fff!important}.development-detail-page .development-keypoints-section h2,.development-detail-page .development-keypoints-section h3,.development-detail-page .development-keypoints-section .text-secondary,.development-detail-page .page-specific-detail-section .page-specific-card h3,.development-detail-page .service-faq-section button span:first-child{color:#07152f!important;-webkit-text-fill-color:#07152f!important}.development-detail-page .development-keypoints-section p,.development-detail-page .page-specific-detail-section .page-specific-card p,.development-detail-page .service-faq-section .bg-gray-50\\/70,.development-detail-page .service-faq-section .bg-gray-50\\/70 *{color:#475569!important;-webkit-text-fill-color:#475569!important}.development-detail-page .page-specific-card,.development-detail-page .service-faq-section .border,.development-detail-page .development-keypoints-section .bg-gray-50{background:#fff!important;border-color:#e5e7eb!important}.development-detail-page .page-specific-card>span{color:#f5aa02!important;-webkit-text-fill-color:#f5aa02!important}',
      '@media (max-width:1023px){body>.mobile-nav-panel,body>.mobile-nav-panel *{box-sizing:border-box!important}body>.mobile-nav-panel .mobile-menu-inner{width:100%!important;max-width:100%!important;padding:14px 16px calc(22px + env(safe-area-inset-bottom))!important;overflow:visible!important}body>.mobile-nav-panel .mobile-menu-row{width:100%!important;min-height:54px!important;display:grid!important;grid-template-columns:minmax(0,1fr) 28px!important;align-items:center!important;gap:10px!important;padding:0 10px 0 12px!important;overflow:visible!important;line-height:1.2!important}body>.mobile-nav-panel .mobile-menu-row>span:first-child{min-width:0!important;overflow:visible!important;white-space:normal!important;overflow-wrap:anywhere!important}body>.mobile-nav-panel .mobile-menu-row>span:last-child{width:28px!important;height:28px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;justify-self:end!important;flex:0 0 28px!important;overflow:visible!important;transform-origin:center center!important}body>.mobile-nav-panel .mobile-menu-row svg,body>.mobile-nav-panel .mobile-menu-link svg{width:18px!important;height:18px!important;min-width:18px!important;min-height:18px!important;flex:0 0 18px!important;display:block!important;overflow:visible!important;stroke-width:2.25!important}body>.mobile-nav-panel .mobile-submenu{padding:0 4px 8px!important;overflow:hidden!important}body>.mobile-nav-panel .mobile-submenu-block{min-width:0!important;overflow:visible!important}body>.mobile-nav-panel .mobile-menu-link{width:100%!important;min-height:46px!important;display:grid!important;grid-template-columns:22px minmax(0,1fr)!important;align-items:center!important;gap:10px!important;padding:10px 12px!important;overflow:visible!important}body>.mobile-nav-panel .mobile-menu-link span,body>.mobile-nav-panel .mobile-menu-link span:last-child,body>.mobile-nav-panel .mobile-simple-links a{display:block!important;min-width:0!important;max-width:100%!important;overflow:visible!important;text-overflow:clip!important;white-space:normal!important;overflow-wrap:anywhere!important;line-height:1.25!important}}',
      '@media (max-width:768px){html{scroll-behavior:auto!important}.backdrop-blur,.backdrop-blur-xl{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}.mobile-nav-panel,.mobile-nav-panel *,.app-fixed-header,.app-fixed-header *{backface-visibility:hidden!important;-webkit-backface-visibility:hidden!important}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function setText(nodes, values) {
    Array.prototype.slice.call(nodes).forEach(function (node, index) {
      if (values[index]) node.textContent = values[index];
    });
  }

  function patchPreview(data) {
    if (!data) return;
    setText(document.querySelectorAll('.page-laptop-sidebar span'), data.rows || []);
    setText(document.querySelectorAll('.website-preview-grid b span'), data.bullets || []);
    setText(document.querySelectorAll('.website-preview-footer span'), data.stats || []);
    var toolbar = document.querySelector('.page-device-toolbar b');
    if (toolbar) toolbar.textContent = data.title;
  }

  function patchIncluded(data) {
    if (!data) return;
    var heading = document.querySelector('.included-scroll-heading h2');
    if (heading) heading.textContent = data.title + ' deliverables, one by one.';
    var sub = document.querySelector('.included-scroll-heading p');
    if (sub) sub.textContent = 'Each card explains a real part of this service, with enough space on mobile so the full text stays visible.';
    Array.prototype.slice.call(document.querySelectorAll('.included-sticky-card')).forEach(function (card, index) {
      var title = data.bullets[index];
      var desc = data.kps[index] && data.kps[index].desc || title + ' is planned for ' + topic(data) + ', responsive checks, and business-focused handover.';
      var h3 = card.querySelector('h3');
      var p = card.querySelector('p');
      if (h3 && title) h3.textContent = title;
      if (p && desc) p.textContent = desc;
      card.style.top = 'auto';
    });
  }

  function detailCards(data) {
    if (!data) return [];
    var cards = [];
    (data.kps || []).slice(0, 4).forEach(function (item, index) {
      cards.push({ title: item.title, desc: item.desc, badge: 'Focus ' + (index + 1) });
    });
    (data.process || []).slice(0, 2).forEach(function (item, index) {
      cards.push({ title: item, desc: item + ' is part of the ' + data.title + ' workflow so planning, execution, QA, and handover stay specific to this page.', badge: 'Step ' + (index + 1) });
    });
    return cards.slice(0, 6);
  }

  function patchDetail(data) {
    if (!data) return;
    var section = Array.prototype.find.call(document.querySelectorAll('section'), function (item) {
      var text = normalize(item.textContent);
      return text.indexOf('MORE PAGE DETAIL') > -1 || text.indexOf('Specific cards for this service and solution') > -1;
    });
    if (!section) return;
    var eyebrow = section.querySelector('span');
    var heading = section.querySelector('h2');
    var intro = section.querySelector('p');
    if (eyebrow) eyebrow.textContent = data.title.toUpperCase() + ' DETAIL';
    if (heading) heading.textContent = 'Specific cards for ' + data.title + '.';
    if (intro) intro.textContent = "These cards use this page's own deliverables, process, and key points, so every service and solution page is different.";
    var cards = detailCards(data);
    Array.prototype.slice.call(section.querySelectorAll('h3')).forEach(function (node, index) {
      if (cards[index]) node.textContent = cards[index].title;
    });
    Array.prototype.slice.call(section.querySelectorAll('.grid p')).forEach(function (node, index) {
      if (cards[index]) node.textContent = cards[index].desc;
    });
    Array.prototype.slice.call(section.querySelectorAll('.grid span')).forEach(function (node, index) {
      if (cards[index]) node.textContent = cards[index].badge;
    });
  }

  function removeCaseStudiesSection() {
    Array.prototype.slice.call(document.querySelectorAll('section')).forEach(function (section) {
      var text = normalize(section.textContent).toUpperCase();
      if (text.indexOf('PROJECT CASE STUDIES') > -1 || text.indexOf('REAL PROJECT WORK WITH CLEAR BUSINESS PURPOSE') > -1) {
        section.classList.add('case-study-section-remove');
        if (section.parentNode) section.parentNode.removeChild(section);
      }
    });
  }

  function patchLogoMarquee() {
    var section = Array.prototype.find.call(document.querySelectorAll('section'), function (item) {
      return normalize(item.textContent).toUpperCase().indexOf('DIGITAL SERVICES FOR GROWING BUSINESSES') > -1;
    });
    if (!section) return;
    section.classList.add('logo-marquee-section');
    section.style.display = 'block';
    section.style.visibility = 'visible';
    section.style.opacity = '1';
    var track = Array.prototype.find.call(section.querySelectorAll('div'), function (node) {
      var className = typeof node.className === 'string' ? node.className : '';
      var text = normalize(node.textContent).toUpperCase();
      return className.indexOf('gap-10') > -1 && text.indexOf('WEBSITE DEVELOPMENT') > -1;
    });
    if (track) {
      track.classList.add('logo-marquee-track');
      track.style.display = 'flex';
      track.style.minWidth = 'max-content';
      track.style.width = 'max-content';
      track.style.willChange = 'transform';
    }
  }

  function patchHomeGrowthSection() {
    var section = Array.prototype.find.call(document.querySelectorAll('section'), function (item) {
      return normalize(item.textContent).toUpperCase().indexOf('AURASHINE WEBSITE FEATURES') > -1;
    });
    if (!section) return;
    section.classList.add('home-growth-suite-section');
    var featureCard = Array.prototype.find.call(section.querySelectorAll('div'), function (node) {
      var text = normalize(node.textContent).toUpperCase();
      var className = typeof node.className === 'string' ? node.className : '';
      return text.indexOf('CORE WEBSITE FEATURES') > -1 && className.indexOf('bg-white') > -1;
    });
    if (featureCard) featureCard.classList.add('home-growth-feature-card');
    Array.prototype.slice.call(section.querySelectorAll('div')).forEach(function (node) {
      var text = normalize(node.textContent).toUpperCase();
      var className = typeof node.className === 'string' ? node.className : '';
      if (className.indexOf('bg-gray-50') > -1 && text.length < 80) node.classList.add('home-growth-deliverable');
      if (className.indexOf('bg-white/10') > -1 && text.length > 80) node.classList.add('home-growth-pillar-card');
    });
  }

  function patchServicesViewport() {
    var section = document.getElementById('services-scroll-section');
    if (!section) return;
    Array.prototype.slice.call(section.querySelectorAll('.services-scroll-stage')).forEach(function (node) {
      if (String(node.className).indexOf('sticky top-0') === -1) node.classList.remove('services-scroll-stage');
    });
    var stage = Array.prototype.find.call(section.querySelectorAll('div'), function (node) {
      var className = typeof node.className === 'string' ? node.className : '';
      return className.indexOf('sticky top-0') > -1 && className.indexOf('min-h-screen') > -1;
    });
    if (stage) stage.classList.add('services-scroll-stage');
    var grid = Array.prototype.find.call(section.querySelectorAll('div'), function (node) {
      var className = typeof node.className === 'string' ? node.className : '';
      return className.indexOf('lg:grid-cols-[0.95fr_1.05fr]') > -1;
    });
    if (!grid) return;
    grid.classList.add('services-scroll-grid');
    var resultColumn = grid.children[1];
    var panel = resultColumn && resultColumn.firstElementChild;
    if (panel) panel.classList.add('services-result-panel');
  }

  function patchAboutHero() {
    var isAbout = route() === 'about';
    document.documentElement.classList.toggle('aura-about-page', isAbout);
    if (!isAbout) return;
    var heading = Array.prototype.find.call(document.querySelectorAll('h1'), function (node) {
      return node.classList.contains('aura-about-hero-title') || normalize(node.textContent).indexOf('About Aura Shine Infotech') === 0;
    });
    if (!heading) return;
    heading.textContent = 'Website & Software Development for Smarter Business Growth';
    heading.classList.add('aura-about-hero-title');
    var hero = heading.closest('section') || heading.parentElement;
    if (!hero) return;
    Array.prototype.slice.call(hero.querySelectorAll('span')).forEach(function (node) {
      var badgeText = normalize(node.textContent).toUpperCase();
      if (badgeText === 'ABOUT AURASHINE INFOTECH' || badgeText === 'TRUSTED IT COMPANY IN KANDIVALI WEST, MUMBAI') {
        node.textContent = 'Trusted IT Company in Kandivali West, Mumbai';
        node.classList.remove('aura-hidden-hero-badge');
        node.classList.add('aura-about-trust-badge');
      }
    });
    var copy = hero.querySelector('.aura-about-hero-copy') || Array.prototype.find.call(hero.querySelectorAll('p'), function (node) {
      var text = normalize(node.textContent);
      return text.length > 80 && text.indexOf('Aura Shine Infotech') > -1;
    }) || hero.querySelector('p');
    if (copy) {
      copy.textContent = 'AuraShine Infotech replaces slow growth, manual workflows, and disconnected customer journeys with scalable digital systems. From Kandivali West, Mumbai, we combine Website Development, Software Development, Mobile App Development, CRM, AI Solutions, and Digital Marketing to create measurable business value.';
      copy.classList.add('aura-about-hero-copy');
    }
  }

  function patchContactHero() {
    var isContact = route() === 'contact';
    document.documentElement.classList.toggle('aura-contact-route', isContact);
    if (!isContact) return;
    var contactMain = document.querySelector('main');
    if (contactMain) contactMain.classList.add('aura-contact-page');
    var heading = document.querySelector('main h1') || document.querySelector('h1');
    if (heading) {
      heading.classList.add('aura-contact-hero-title');
      var hero = heading.closest('section');
      if (hero) {
        hero.classList.add('aura-contact-hero');
        Array.prototype.slice.call(hero.querySelectorAll('a,button')).forEach(function (node) {
          var text = normalize(node.textContent).toLowerCase();
          if (text.indexOf('call +91 7900129064') === 0 || text === 'whatsapp us' || text === 'aurashineinfotech@gmail.com') {
            node.classList.add('aura-contact-quick-link');
          }
        });
      }
      if (!heading.querySelector('.aura-contact-separator')) {
        heading.textContent = '';
        heading.appendChild(document.createTextNode('Contact Aura Shine Infotech '));
        var separator = document.createElement('span');
        separator.className = 'aura-contact-separator';
        separator.textContent = '–';
        heading.appendChild(separator);
        heading.appendChild(document.createTextNode(' '));
        var growth = document.createElement('span');
        growth.className = 'homx-shimmer-text';
        growth.textContent = 'let’s talk growth.';
        heading.appendChild(growth);
      }
    }
    Array.prototype.slice.call(document.querySelectorAll('span')).forEach(function (node) {
      if (normalize(node.textContent).toUpperCase() === 'CONTACT AURASHINE INFOTECH') {
        node.classList.add('aura-hidden-hero-badge');
      }
    });
  }

  function patchIndustryVideoGrade() {
    var section = document.getElementById('industry-scroll-story');
    if (!section) return;
    Array.prototype.slice.call(section.querySelectorAll('.industry-video')).forEach(function (video) {
      video.style.filter = 'saturate(1.04) contrast(1.02) brightness(1.08)';
    });
    Array.prototype.slice.call(section.querySelectorAll('div')).forEach(function (node) {
      var className = typeof node.className === 'string' ? node.className : '';
      if (className.indexOf('bg-black/55') > -1) {
        node.classList.add('industry-video-soft-overlay');
        node.style.background = 'rgba(0,0,0,.18)';
      }
      if (className.indexOf('from-black/75') > -1) {
        node.classList.add('industry-video-side-overlay');
        node.style.background = 'linear-gradient(90deg,rgba(0,0,0,.32),rgba(0,0,0,.08),rgba(0,0,0,.18))';
      }
      if (className.indexOf('to-black/75') > -1) {
        node.classList.add('industry-video-bottom-overlay');
        node.style.background = 'linear-gradient(180deg,rgba(0,0,0,.08),transparent 45%,rgba(0,0,0,.28))';
      }
      if (className.indexOf('bg-primary/20') > -1 || className.indexOf('bg-primary/10') > -1) {
        node.classList.add('industry-video-glow');
      }
    });
  }

  function patchContactFormSubmit() {
    Array.prototype.slice.call(document.querySelectorAll('form[action*="formsubmit.co"]')).forEach(function (form) {
      if (form.__auraSamePageSubmit) return;
      form.__auraSamePageSubmit = true;
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var button = form.querySelector('button[type="submit"]');
        var oldText = button ? button.textContent : '';
        var status = form.querySelector('.contact-success-message,.contact-error-message');
        if (!status) {
          status = document.createElement('p');
          var anchor = button && button.parentNode ? button.parentNode : form;
          anchor.appendChild(status);
        }

        status.className = '';
        status.textContent = '';
        if (button) {
          button.disabled = true;
          button.textContent = 'Sending...';
        }

        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (response) {
          if (!response.ok) throw new Error('Unable to send enquiry');
          form.reset();
          status.className = 'contact-success-message';
          status.setAttribute('role', 'status');
          status.textContent = 'Your message has been sent successfully.';
        }).catch(function () {
          status.className = 'contact-error-message';
          status.setAttribute('role', 'alert');
          status.textContent = 'Message could not be sent. Please try again.';
        }).finally(function () {
          if (button) {
            button.disabled = false;
            button.textContent = oldText || 'Send Enquiry';
          }
        });
      }, true);
    });
  }

  function preloadContactAssets() {
    if (!document.getElementById('aura-contact-chunk-preload')) {
      var preload = document.createElement('link');
      preload.id = 'aura-contact-chunk-preload';
      preload.rel = 'preload';
      preload.as = 'script';
      preload.href = '/static/js/489.6375e07c.chunk.js';
      preload.setAttribute('fetchpriority', 'high');
      document.head.appendChild(preload);
    }
    if (!document.getElementById('aura-spline-preconnect')) {
      var preconnect = document.createElement('link');
      preconnect.id = 'aura-spline-preconnect';
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://prod.spline.design';
      preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
    }
    if (!document.getElementById('aura-contact-scene-prefetch')) {
      var scenePrefetch = document.createElement('link');
      scenePrefetch.id = 'aura-contact-scene-prefetch';
      scenePrefetch.rel = 'prefetch';
      scenePrefetch.as = 'fetch';
      scenePrefetch.href = 'https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode';
      scenePrefetch.crossOrigin = 'anonymous';
      document.head.appendChild(scenePrefetch);
    }
  }

  function patchBlogHeaderLinks() {
    var isBlogRoute = route() === 'blog' || route().indexOf('blog/') === 0;
    document.documentElement.classList.toggle('aura-blog-nav-plain', isBlogRoute);
  }

  function patchAINavigation() {
    var header = document.querySelector('.app-fixed-header');
    if (!header) return;
    Array.prototype.slice.call(header.querySelectorAll('span,a')).forEach(function (node) {
      if (node.closest('.aura-ai-workforce-cta')) return;
      var navText = normalize(node.textContent).toUpperCase().replace(/\s+/g, '');
      if (navText === 'AI' || navText === 'AICOMINGSOON' || node.classList.contains('aura-ai-nav-link')) {
        node.classList.add('aura-ai-original-hidden');
      }
    });
    var getStarted = Array.prototype.find.call(header.querySelectorAll('a,button'), function (node) {
      return normalize(node.textContent).toUpperCase() === 'GET STARTED';
    });
    if (!getStarted || !getStarted.parentElement || getStarted.parentElement.querySelector('.aura-ai-workforce-cta')) return;
    var item = document.createElement('span');
    item.className = 'aura-ai-workforce-cta';
    item.setAttribute('role', 'note');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', 'AI Workforce - Coming Soon');
    item.innerHTML = '<span class="aura-ai-mini-object" aria-hidden="true"><i></i></span><span class="aura-ai-nav-label">AI Workforce</span>';
    getStarted.parentElement.insertBefore(item, getStarted);
  }

  function stabilizeHeader() {
    var header = document.querySelector('.app-fixed-header');
    if (header) header.classList.add('aura-header-stable');
    if (window.__auraHeaderObserver) return;
    window.__auraHeaderObserver = true;
    var lastHeader = header;
    var pending = false;
    var observer = new MutationObserver(function () {
      if (pending) return;
      pending = true;
      window.queueMicrotask(function () {
        pending = false;
        var currentHeader = document.querySelector('.app-fixed-header');
        if (!currentHeader || currentHeader === lastHeader) return;
        lastHeader = currentHeader;
        currentHeader.classList.add('aura-header-stable');
        patchAINavigation();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function patchBlogDropdownColors() {
    if (route() !== 'blog' && route().indexOf('blog/') !== 0) return;
    if (!window.__auraBlogDropdownWatcher) {
      window.__auraBlogDropdownWatcher = true;
      document.addEventListener('mouseover', function (event) {
        var button = event.target.closest && event.target.closest('.app-fixed-header button.hdrx-link');
        if (!button || (route() !== 'blog' && route().indexOf('blog/') !== 0)) return;
        window.setTimeout(patchBlogDropdownColors, 20);
        window.setTimeout(patchBlogDropdownColors, 120);
        window.setTimeout(patchBlogDropdownColors, 300);
      }, true);
      var dropdownObserver = new MutationObserver(function (mutations) {
        var hasNewNodes = mutations.some(function (mutation) {
          return mutation.addedNodes && mutation.addedNodes.length;
        });
        if (hasNewNodes) window.setTimeout(patchBlogDropdownColors, 0);
      });
      dropdownObserver.observe(document.body, { childList: true, subtree: true });
    }
    var header = document.querySelector('.app-fixed-header');
    if (header) {
      Array.prototype.slice.call(header.querySelectorAll('button.hdrx-link')).forEach(function (button) {
        if (button.dataset.auraDropdownColorsBound === 'true') return;
        button.dataset.auraDropdownColorsBound = 'true';
        button.addEventListener('mouseenter', function () {
          window.setTimeout(patchBlogDropdownColors, 0);
          window.setTimeout(patchBlogDropdownColors, 80);
        });
      });
    }
    Array.prototype.slice.call(document.querySelectorAll('.mega-menu-panel')).forEach(function (panel) {
      panel.style.setProperty('color', '#111827', 'important');
      var banner = panel.firstElementChild;
      var menuType = panel.classList.contains('mega-menu-panel-development') ? 'development' : panel.classList.contains('mega-menu-panel-marketing') ? 'marketing' : 'solutions';
      if (panel.classList.contains('mega-menu-panel-development')) {
        panel.style.setProperty('background', 'radial-gradient(circle at 12% 10%,rgba(245,170,2,.18),transparent 32%),linear-gradient(145deg,rgba(3,7,18,.97),rgba(10,20,44,.99) 54%,rgba(4,9,22,.99))', 'important');
        panel.style.setProperty('border-color', 'rgba(245,170,2,.28)', 'important');
        if (banner) banner.style.setProperty('background', 'linear-gradient(120deg,rgba(255,255,255,.16),transparent 34%),linear-gradient(90deg,#07152f,#3b1d78,#f5aa02)', 'important');
      } else if (panel.classList.contains('mega-menu-panel-marketing')) {
        panel.style.setProperty('background', 'radial-gradient(circle at 12% 10%,rgba(245,170,2,.24),transparent 32%),radial-gradient(circle at 86% 12%,rgba(255,255,255,.14),transparent 26%),linear-gradient(145deg,rgba(3,7,18,.96),rgba(10,20,44,.98) 54%,rgba(4,9,22,.98))', 'important');
        panel.style.setProperty('border-color', 'rgba(245,170,2,.28)', 'important');
        if (banner) banner.style.setProperty('background', 'linear-gradient(120deg,rgba(255,255,255,.16),transparent 34%),linear-gradient(90deg,#321203,#f5aa02,#f5aa02)', 'important');
      } else if (panel.classList.contains('mega-menu-panel-solutions')) {
        panel.style.setProperty('background', '#07152f', 'important');
        panel.style.setProperty('border-color', 'rgba(255,255,255,.12)', 'important');
        if (banner) banner.style.setProperty('background', 'linear-gradient(120deg,rgba(255,255,255,.16),transparent 34%),linear-gradient(90deg,#07152f,#0d2a55,#f5aa02)', 'important');
      }
      if (banner) banner.style.setProperty('border-bottom-color', 'rgba(255,255,255,.16)', 'important');
      Array.prototype.slice.call(panel.querySelectorAll('p.text-white')).forEach(function (node) {
        node.style.setProperty('color', '#fff', 'important');
        node.style.setProperty('-webkit-text-fill-color', '#fff', 'important');
      });
      Array.prototype.slice.call(panel.querySelectorAll('[class*="text-white/85"]')).forEach(function (node) {
        node.style.setProperty('color', 'rgba(255,255,255,.85)', 'important');
        node.style.setProperty('-webkit-text-fill-color', 'rgba(255,255,255,.85)', 'important');
      });
      Array.prototype.slice.call(panel.querySelectorAll('.mega-menu-sticker')).forEach(function (node) {
        node.style.setProperty('background', 'rgba(255,255,255,.18)', 'important');
        node.style.setProperty('border-color', 'rgba(255,255,255,.22)', 'important');
        node.style.setProperty('color', '#fff8d7', 'important');
      });
      Array.prototype.slice.call(panel.querySelectorAll('.mega-menu-orb')).forEach(function (node) {
        node.style.setProperty('background', 'rgba(255,255,255,.16)', 'important');
        node.style.setProperty('border-color', 'rgba(255,255,255,.22)', 'important');
        node.style.setProperty('color', '#fff', 'important');
        node.style.setProperty('box-shadow', '0 16px 38px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.22)', 'important');
      });
      Array.prototype.slice.call(panel.querySelectorAll('.mega-menu-columns')).forEach(function (node) {
        node.style.setProperty('background', menuType === 'solutions' ? '#07152f' : 'transparent', 'important');
      });
      Array.prototype.slice.call(panel.querySelectorAll('.mega-menu-title')).forEach(function (node) {
        node.style.setProperty('color', '#fff', 'important');
        node.style.setProperty('-webkit-text-fill-color', '#fff', 'important');
      });
      Array.prototype.slice.call(panel.querySelectorAll('.mega-menu-desc,.mega-menu-footer p')).forEach(function (node) {
        node.style.setProperty('color', 'rgba(255,255,255,.66)', 'important');
        node.style.setProperty('-webkit-text-fill-color', 'rgba(255,255,255,.66)', 'important');
      });
      Array.prototype.slice.call(panel.querySelectorAll('.mega-menu-link')).forEach(function (node) {
        node.style.setProperty('background', 'rgba(255,255,255,.055)', 'important');
        node.style.setProperty('border-color', 'rgba(255,255,255,.08)', 'important');
        node.style.setProperty('color', '#111827', 'important');
      });
      Array.prototype.slice.call(panel.querySelectorAll('.mega-menu-icon')).forEach(function (node) {
        node.style.setProperty('background', menuType === 'solutions' ? 'rgba(255,255,255,.1)' : 'linear-gradient(145deg,rgba(245,170,2,.2),rgba(255,255,255,.08))', 'important');
        node.style.setProperty('border-color', menuType === 'development' ? 'rgba(245,170,2,.24)' : 'rgba(245,170,2,.18)', 'important');
        var svg = node.querySelector('svg');
        if (svg) svg.style.setProperty('color', menuType === 'solutions' ? '#fff' : '#f5aa02', 'important');
      });
      var footer = panel.querySelector('.mega-menu-footer');
      if (footer) {
        footer.style.setProperty('background', menuType === 'marketing' ? 'rgba(255,255,255,.06)' : menuType === 'solutions' ? '#091b3a' : 'rgba(9,18,38,.96)', 'important');
        footer.style.setProperty('border-color', 'rgba(255,255,255,.1)', 'important');
        var footerText = footer.querySelector('p');
        var footerLink = footer.querySelector('a');
        if (footerText) footerText.style.setProperty('color', menuType === 'marketing' ? 'rgba(255,255,255,.72)' : 'rgba(255,255,255,.66)', 'important');
        if (footerLink) footerLink.style.setProperty('color', menuType === 'development' ? '#fff3b0' : menuType === 'marketing' ? '#f5aa02' : '#fff', 'important');
      }
    });
  }

  function patchBlog3D() {
    var isBlog = route() === 'blog';
    document.documentElement.classList.toggle('aura-blog-3d', isBlog);
    if (!isBlog) return;
    var page = document.querySelector('.premium-blog-page');
    if (!page) return;

    if (!page.querySelector('.aura-blog-depth-scene')) {
      var scene = document.createElement('div');
      scene.className = 'aura-blog-depth-scene';
      scene.setAttribute('aria-hidden', 'true');
      scene.innerHTML = '<div class="aura-blog-depth-grid"></div><div class="aura-blog-depth-orb"></div><div class="aura-blog-depth-prism"></div>';
      page.insertBefore(scene, page.firstChild);
    }

    var hero = page.querySelector('main > section:first-child');
    if (hero) {
      var oldObject = hero.querySelector('.aura-blog-hero-object');
      if (oldObject) oldObject.remove();
      Array.prototype.slice.call(hero.querySelectorAll('p,span')).forEach(function (node) {
        if (normalize(node.textContent).toUpperCase().indexOf('PRACTICAL GUIDES WITH') === 0) {
          node.classList.add('aura-blog-white-copy');
        }
      });
    }
    Array.prototype.slice.call(page.querySelectorAll('h2')).forEach(function (node) {
      if (normalize(node.textContent).toUpperCase().indexOf('PRACTICAL GUIDES WITH') === 0) {
        node.classList.add('aura-blog-white-copy');
      }
    });
    if (!page.__auraStableTopCards) {
      var topCards = Array.prototype.slice.call(page.querySelectorAll('.blx-card')).slice(0, 3);
      if (topCards.length === 3) {
        page.__auraStableTopCards = true;
        topCards.forEach(function (card, index) {
          card.classList.add('aura-stable-top-card');
          card.style.setProperty('--aura-card-delay', String(index * 90) + 'ms');
          if (card.parentElement) card.parentElement.classList.add('aura-stable-top-card-wrap');
        });
      }
    }
    Array.prototype.slice.call(page.querySelectorAll('.blx-filterbar button')).forEach(function (button) {
      if (button.dataset.auraStableFilter === 'true') return;
      var styles = window.getComputedStyle(button);
      button.dataset.auraStableFilter = 'true';
      button.classList.add('aura-blog-filter-stable');
      button.style.setProperty('--aura-filter-background', styles.background);
      button.style.setProperty('--aura-filter-border', styles.borderColor);
      button.style.setProperty('--aura-filter-shadow', styles.boxShadow);
      button.style.setProperty('--aura-filter-color', styles.color);
    });
    Array.prototype.slice.call(page.querySelectorAll('.blx-readmore')).forEach(function (readMore) {
      if (readMore.dataset.auraReadBound === 'true') return;
      readMore.dataset.auraReadBound = 'true';
      readMore.addEventListener('click', function (event) {
        var link = readMore.closest('a');
        var href = link && link.getAttribute('href');
        if (!href || href.indexOf('#/blog/') !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        window.location.hash = href.slice(1);
      });
    });

    if (!page.__auraBlogMotion) {
      page.__auraBlogMotion = true;
      page.addEventListener('pointermove', function (event) {
        var x = ((event.clientX / window.innerWidth) - .5) * 3;
        var y = ((event.clientY / window.innerHeight) - .5) * -3;
        page.style.setProperty('--aura-blog-x', y.toFixed(2) + 'deg');
        page.style.setProperty('--aura-blog-y', x.toFixed(2) + 'deg');
      }, { passive: true });
      page.addEventListener('pointerleave', function () {
        page.style.setProperty('--aura-blog-x', '0deg');
        page.style.setProperty('--aura-blog-y', '0deg');
      }, { passive: true });
    }
  }

  function isDarkColor(value) {
    var match = String(value || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!match) return false;
    var r = Number(match[1]);
    var g = Number(match[2]);
    var b = Number(match[3]);
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 92;
  }

  function hasDarkBlogBackground(node) {
    var styles = window.getComputedStyle(node);
    var bg = String(styles.backgroundColor || '') + ' ' + String(styles.backgroundImage || '');
    return isDarkColor(styles.backgroundColor) || /#(?:0e2340|162d4a|111827|07152f|050b14|101a2d|1c2538)|rgb\(\s*(?:5|7|14|17|22|30)\s*,/i.test(bg);
  }

  function patchBlogDetailTextContrast() {
    var isDetail = route().indexOf('blog/') === 0;
    document.documentElement.classList.toggle('aura-blog-detail', isDetail);
    if (!isDetail) return;
    Array.prototype.slice.call(document.querySelectorAll('.blog-article-section,.blog-article-section div,.blog-article-section aside')).forEach(function (node) {
      node.classList.toggle('aura-dark-readable', hasDarkBlogBackground(node));
    });
  }

  function applyFixes() {
    ensureStyle();
    var data = currentData();
    removeCaseStudiesSection();
    patchLogoMarquee();
    patchHomeGrowthSection();
    patchServicesViewport();
    patchAboutHero();
    patchContactHero();
    patchIndustryVideoGrade();
    patchPreview(data);
    patchIncluded(data);
    patchDetail(data);
    preloadContactAssets();
    patchContactFormSubmit();
    patchBlogHeaderLinks();
    patchAINavigation();
    stabilizeHeader();
    patchBlogDropdownColors();
    patchBlog3D();
    patchBlogDetailTextContrast();
  }

  window.addEventListener('hashchange', function () {
    patchBlogHeaderLinks();
    window.setTimeout(applyFixes, 80);
    window.setTimeout(applyFixes, 350);
    window.setTimeout(applyFixes, 900);
  });
  window.addEventListener('load', function () {
    applyFixes();
    window.setTimeout(applyFixes, 200);
    window.setTimeout(applyFixes, 800);
  });
  window.setInterval(applyFixes, 5000);
})();

(function () {
  // React owns the Google review section. Leaving this legacy DOM patch disabled
  // prevents removeChild crashes while the React component loads real Places data.
  return;
  var apiKey = 'AIzaSyDZe5w2b3LIMtncoc7EbPbtm97hVXKRoUI';
  var query = 'AuraShine Infotech Raghuleela Mega Mall Kandivali West Mumbai';
  var callbackName = '__auraGooglePlacesReady';
  var state = {
    loading: false,
    loaded: false,
    error: '',
    meta: null,
    reviews: []
  };

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  function addRealReviewStyle() {
    if (document.getElementById('aura-real-google-review-style')) return;
    var style = document.createElement('style');
    style.id = 'aura-real-google-review-style';
    style.textContent = [
      '.google-review-grid,.google-review-slider{width:min(100%,1060px)!important;margin:0 auto!important;overflow:visible!important;min-height:0!important;display:block!important}',
      '.aura-real-google-list{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))!important;gap:1rem!important;align-items:stretch!important;width:100%!important}',
      '.aura-real-google-list .google-review-card{width:100%!important;max-width:none!important;min-height:0!important;margin:0!important}',
      '.aura-real-google-list .google-review-text{display:block!important;-webkit-line-clamp:unset!important;line-clamp:unset!important;overflow:visible!important}',
      '.aura-real-google-status{max-width:820px!important;margin:0 auto!important}',
      '@media(max-width:900px){.aura-real-google-list{grid-template-columns:1fr!important}.aura-real-google-list .google-review-card{min-height:0!important}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function normalizeReviews(reviews) {
    return (reviews || []).filter(function (review) {
      return review && review.text;
    }).map(function (review, index) {
      return {
        id: String((review.author_name || 'google-review') + '-' + (review.time || index)),
        author: review.author_name || 'Google user',
        profilePhoto: review.profile_photo_url || '',
        rating: Number(review.rating || 5),
        text: review.text || '',
        time: review.relative_time_description || '',
        url: review.author_url || ''
      };
    });
  }

  function reviewStars(count) {
    var rating = Math.max(1, Math.min(5, Number(count || 5)));
    var html = '';
    for (var i = 0; i < rating; i += 1) {
      html += '<svg class="w-4 h-4 fill-primary" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    }
    return html;
  }

  function getReviewContainer() {
    var section = document.querySelector('.google-review-section');
    if (!section) return null;
    return section.querySelector('.google-review-grid') || section.querySelector('.google-review-slider');
  }

  function renderStatus(message) {
    addRealReviewStyle();
    var container = getReviewContainer();
    if (!container) return;
    container.innerHTML = '<div class="google-review-card text-center aura-real-google-status">' +
      '<div class="google-review-avatar mx-auto mb-4">G</div>' +
      '<h3>Google reviews not available yet</h3>' +
      '<p>' + escapeHtml(message) + '</p>' +
    '</div>';
  }

  function renderConnecting() {
    addRealReviewStyle();
    var section = document.querySelector('.google-review-section');
    var container = getReviewContainer();
    if (!section || !container || state.loaded) return;
    var existingText = container.textContent || '';
    if (!state.loading && !/took too long|timed out|not available|failed to load|could not load/i.test(existingText)) return;
    var subtitle = section.querySelector('.text-gray-600.leading-relaxed');
    if (subtitle) subtitle.textContent = 'Connecting directly to Google Places for real public reviews.';
    container.innerHTML = '<div class="google-review-card text-center aura-real-google-status">' +
      '<div class="google-review-avatar mx-auto mb-4">G</div>' +
      '<h3>Loading real Google reviews...</h3>' +
      '<p>Connecting to Google Places. Keep Maps JavaScript API, Places API, billing, and this website domain enabled for this key.</p>' +
    '</div>';
  }

  function renderReviews() {
    if (!state.loaded || !state.reviews.length) return false;
    addRealReviewStyle();
    var section = document.querySelector('.google-review-section');
    var container = getReviewContainer();
    if (!section || !container) return false;
    if (container.querySelector('.aura-real-google-list') && container.dataset.auraRealGoogle === 'true') return true;

    var subtitle = section.querySelector('.text-gray-600.leading-relaxed');
    if (subtitle && state.meta) {
      subtitle.textContent = state.meta.name + ' • ' + state.meta.rating + ' rating' + (state.meta.total ? ' from ' + state.meta.total + ' Google reviews' : '');
    }
    container.dataset.auraRealGoogle = 'true';
    container.innerHTML = '<div class="aura-real-google-list">' + state.reviews.map(function (review) {
      var avatar = review.profilePhoto
        ? '<img class="google-review-photo" src="' + escapeHtml(review.profilePhoto) + '" alt="' + escapeHtml(review.author) + '" loading="lazy" referrerpolicy="no-referrer">'
        : '<div class="google-review-avatar">' + escapeHtml(review.author.charAt(0) || 'G') + '</div>';
      return '<article class="google-review-card">' +
        '<div class="flex items-center gap-4 mb-5">' +
          avatar +
          '<div class="min-w-0">' +
            '<h3>' + escapeHtml(review.author) + '</h3>' +
            '<div class="flex items-center gap-1 text-primary mt-1">' + reviewStars(review.rating) + '</div>' +
            (review.time ? '<small>' + escapeHtml(review.time) + '</small>' : '') +
          '</div>' +
        '</div>' +
        '<p class="google-review-text">"' + escapeHtml(review.text) + '"</p>' +
        (state.meta && state.meta.url ? '<a href="' + escapeHtml(state.meta.url) + '" target="_blank" rel="noreferrer" class="google-review-link">View on Google</a>' : '') +
      '</article>';
    }).join('') + '</div>';
    var dots = section.querySelector('.google-review-dots');
    if (dots) dots.remove();
    return true;
  }

  function loadRealGoogleReviews() {
    if (state.loading || state.loaded) return;
    if (!document.querySelector('.google-review-section')) return;
    state.loading = true;
    renderConnecting();

    function fail(message) {
      state.loading = false;
      state.error = message;
      renderStatus(message);
    }

    var previousGoogleAuthFailure = window.gm_authFailure;
    window.gm_authFailure = function () {
      fail('Google API key is loading, but Maps JavaScript API is not activated or this website domain is not allowed for the key.');
      if (typeof previousGoogleAuthFailure === 'function') previousGoogleAuthFailure();
    };

    function fetchReviews() {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        fail('Google Maps Places script is not available. Check Maps JavaScript API, Places API, billing, and domain restrictions.');
        return;
      }
      var mapDiv = document.createElement('div');
      var service = new window.google.maps.places.PlacesService(mapDiv);
      service.findPlaceFromQuery({
        query: query,
        fields: ['place_id', 'name', 'rating', 'user_ratings_total', 'url']
      }, function (places, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || !places || !places[0] || !places[0].place_id) {
          fail('Live Google reviews could not load from Places API. Google status: ' + status + '.');
          return;
        }
        var place = places[0];
        service.getDetails({
          placeId: place.place_id,
          fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'url']
        }, function (details, detailsStatus) {
          if (detailsStatus !== window.google.maps.places.PlacesServiceStatus.OK || !details) {
            fail('Google review details could not load. Google status: ' + detailsStatus + '.');
            return;
          }
          var realReviews = normalizeReviews(details.reviews);
          if (!realReviews.length) {
            fail('Google Places found the business, but did not return public review text.');
            return;
          }
          state.loading = false;
          state.loaded = true;
          state.meta = {
            name: details.name || place.name || 'AuraShine Infotech',
            rating: details.rating || place.rating || 5,
            total: details.user_ratings_total || place.user_ratings_total || null,
            url: details.url || place.url || ''
          };
          state.reviews = realReviews;
          renderReviews();
        });
      });
    }

    if (window.google && window.google.maps && window.google.maps.places) {
      fetchReviews();
      return;
    }

    window[callbackName] = function () {
      window.setTimeout(fetchReviews, 50);
    };

    var existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (!existingScript) {
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(apiKey) + '&libraries=places&callback=' + encodeURIComponent(callbackName) + '&loading=async';
      script.async = true;
      script.defer = true;
      script.onerror = function () {
        fail('Google Maps script failed to load. Check API key restrictions and allowed website domains.');
      };
      document.head.appendChild(script);
    }

    var tries = 0;
    var timer = window.setInterval(function () {
      tries += 1;
      renderConnecting();
      if (window.google && window.google.maps && window.google.maps.places) {
        window.clearInterval(timer);
        fetchReviews();
      } else if (tries > 120) {
        window.clearInterval(timer);
        fail('Google Maps Places script timed out. Check API key restrictions and allowed website domains.');
      }
    }, 250);
  }

  window.addEventListener('load', function () {
    window.setTimeout(loadRealGoogleReviews, 120);
    window.setTimeout(renderReviews, 1600);
  });
  window.setInterval(function () {
    if (state.loaded) renderReviews();
    else if (state.loading) renderConnecting();
  }, 1800);
})();

(function () {
  function addPerformanceStyle() {
    if (document.getElementById('aura-performance-scroll-fix')) return;
    var style = document.createElement('style');
    style.id = 'aura-performance-scroll-fix';
    style.textContent = [
      '#industry-scroll-story{contain:paint!important}',
      '#industry-scroll-story .industry-video{backface-visibility:hidden!important;transform:translateZ(0);filter:saturate(1.04) contrast(1.02) brightness(1.08)!important;image-rendering:auto!important;transition:opacity .75s ease,transform .9s cubic-bezier(.16,1,.3,1)!important}',
      '#industry-scroll-story .industry-video{background:#05070d!important;content-visibility:auto!important;will-change:opacity!important}',
      '#industry-scroll-story video.industry-video:not(.aura-video-ready){opacity:0!important}',
      '@media(min-width:769px){#industry-scroll-story img.industry-video-poster{display:none!important}}',
      '#industry-scroll-story .industry-video-poster.aura-poster-active{opacity:1!important}',
      '#industry-scroll-story .grid-flow-col>div{will-change:transform,opacity!important;transition:transform 1.35s cubic-bezier(.16,1,.3,1),opacity 1.35s ease,box-shadow 1.2s ease,border-color 1.2s ease!important}',
      '.glass-card,.page-device-card,.page-dashboard-card,.page-laptop-cards b,.website-wire-card,.ad-console-card,.review-mini-card,.review-feature-card,.included-sticky-card,.home-growth-feature-card,.home-growth-pillar-card,.industry-story .rounded-2xl{transition-duration:1.1s!important;transition-timing-function:cubic-bezier(.16,1,.3,1)!important}',
      '.v14-stats,.v14-hero>div:first-child,.v14-grid3 article,.v14-values article,.v14-process article,.v14-project{animation-duration:1.35s!important;animation-timing-function:cubic-bezier(.16,1,.3,1)!important}',
      '@media(max-width:768px){#industry-scroll-story.industry-story{min-height:1600vh!important}#industry-scroll-story .industry-sticky{position:sticky!important;top:var(--aura-final-header-mobile,64px)!important;min-height:calc(100svh - var(--aura-final-header-mobile,64px))!important;height:calc(100svh - var(--aura-final-header-mobile,64px))!important;padding-top:.75rem!important;padding-bottom:.75rem!important;align-items:center!important;overflow:hidden!important}#industry-scroll-story .industry-video{width:100%!important;height:100%!important;min-height:100%!important;object-fit:cover!important;object-position:center center!important}#industry-scroll-story .industry-video-glow{display:none!important}#industry-scroll-story .industry-title{font-size:clamp(2rem,10vw,3rem)!important;line-height:1.03!important;max-width:100%!important}#industry-scroll-story .grid-flow-col{display:grid!important;grid-auto-flow:row!important;grid-template-columns:1fr!important;gap:.65rem!important;overflow:visible!important;padding-bottom:0!important}#industry-scroll-story .grid-flow-col>div{min-height:0!important;padding:.75rem!important;transform-origin:center right!important}.marketing-scroll-scene{min-height:78svh!important;padding-top:.2rem!important;padding-bottom:.2rem!important}.marketing-scroll-sticky{min-height:calc(60svh - .75rem)!important;align-items:flex-start!important;padding-top:.6rem!important}.mobile-services-sticky{top:var(--aura-final-header-mobile,64px)!important;min-height:calc(100svh - var(--aura-final-header-mobile,64px))!important;padding:.6rem .75rem .85rem!important}#services-scroll-section{overflow:clip!important}}',
      '@media(min-width:769px){#industry-scroll-story.industry-story{min-height:825vh!important}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function optimizeIndustryVideos() {
    var section = document.getElementById('industry-scroll-story');
    if (!section) return;
    var videos = Array.prototype.slice.call(section.querySelectorAll('video.industry-video'));
    if (!videos.length) return;
    videos.forEach(function (video, index) {
      if (!video.dataset.auraPosterBound) {
        video.dataset.auraPosterBound = 'true';
        video.addEventListener('canplay', function () {
          video.classList.add('aura-video-ready');
          video.dataset.ready = 'true';
          var poster = section.querySelector('.industry-video-poster[data-video-index="' + index + '"]');
          if (poster) poster.classList.remove('aura-poster-active');
        }, { once: false });
      }
      video.setAttribute('poster', video.getAttribute('poster') || video.poster || '');
    });
    videos.forEach(function (video, index) {
      var poster = section.querySelector('.industry-video-poster[data-video-index="' + index + '"]');
      var isActive = video.dataset.active === 'true';
      if (poster) poster.classList.toggle('aura-poster-active', isActive && !video.classList.contains('aura-video-ready'));
      video.muted = true;
      video.playsInline = true;
      if (isActive) {
        video.preload = 'auto';
        if (video.readyState < 2) video.load();
        video.play().catch(function () {});
      } else {
        video.pause();
        video.preload = 'metadata';
      }
    });
  }

  function applyPerformanceFixes() {
    addPerformanceStyle();
    optimizeIndustryVideos();
  }

  window.addEventListener('load', function () {
    applyPerformanceFixes();
    window.setTimeout(applyPerformanceFixes, 300);
    window.setTimeout(applyPerformanceFixes, 1000);
  });
  window.addEventListener('scroll', optimizeIndustryVideos, { passive: true });
  window.addEventListener('resize', optimizeIndustryVideos, { passive: true });
})();
