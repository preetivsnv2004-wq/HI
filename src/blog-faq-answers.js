/* ────────────────────────────────────────────────────────────────────────────
   BLOG FAQ ANSWERS — 2026-07-06 (short version: 2–3 lines per answer)
   Unique, topic-specific answers for the six question cards on every blog
   detail page (V18BlogDetailPage in App.js).

   Index mapping per blog (order must match the render order in App.js):
     [0..2] → the three post.points headings (unique per blog)
     [3]    → "Keep every section tied to a business action."
     [4]    → "Measure enquiries, clicks, calls and page engagement after launch."
     [5]    → "Review mobile layout whenever new content is added."
   ──────────────────────────────────────────────────────────────────────────── */

const BLOG_FAQ_ANSWERS = {
  /* ── 1. Modern Website Trends for Business Growth ── */
  'modern-website-trends': [
    `Visitors decide in seconds, so modern heroes open with one plain promise — like "Websites that turn visitors into enquiries" — and one primary button such as "Get a Free Quote". Three competing CTAs split attention and lower clicks.`,
    `Current design uses short 200–400ms scroll reveals, hover lifts on cards and button micro-interactions to guide the eye. Keep animations GPU-friendly (transform/opacity) and respect reduced-motion so the page stays fast and accessible.`,
    `Trending websites are built from reusable blocks — service cards, review tiles, stat counters and CTA bands with consistent radius, shadows and spacing. Adding a new service later takes hours instead of a redesign.`,
    `Journey-first layouts give every section a job: hero earns attention, services explain, proof removes doubt, CTA converts. If a decorative strip supports no action, modern practice is to cut it.`,
    `Track form submits, call taps, WhatsApp clicks and scroll depth in GA4 from day one. Heatmaps often show plain FAQs outperforming fancy animated sections — let that data drive monthly design tweaks.`,
    `Mobile-first is the baseline every trend must survive: most traffic is on phones and Google indexes the mobile version. After each new section or badge, recheck heading wraps, tap targets and CTA visibility on a real phone.`,
  ],

  /* ── 2. SEO Foundations Every Service Website Needs ── */
  'seo-foundations': [
    `Search engines rank pages, not companies. A single "Our Services" page can't win ten keywords at once — give each service (and each location, like "SEO services in Mumbai") its own keyword-aware URL, title and in-depth content.`,
    `FAQs capture the exact questions people type — "how much does a website cost" — and can win People Also Ask spots with FAQPage schema. They also answer objections early, so enquiries arrive better qualified.`,
    `Contextual links from articles to service pages move readers from learning to enquiry and pass link equity. Use natural anchors like "local SEO strategy", never "click here", and link every service from 2–3 related posts.`,
    `Match each section to search intent: commercial visitors ("software price") get a quote CTA, informational visitors get a guide or demo. Intent-matched sections cut bounce rates, which supports rankings.`,
    `Connect Search Console rankings to GA4 conversion events. A page ranking #6 for a buyer keyword often earns more enquiries than a #3 ranking on a generic term — optimise for enquiries, not just positions.`,
    `Google uses mobile-first indexing: content hidden or broken on phones effectively doesn't exist for search. After every update, check the page in PageSpeed Insights and on a real device for overflow and Core Web Vitals.`,
  ],

  /* ── 3. Restaurant Website Guide for Better Direct Enquiries ── */
  'restaurant-website-guide': [
    `Hungry visitors want three things instantly: what you serve, where you are, and how to book. Put "View Menu", a tappable map address and "Reserve / Order on WhatsApp" in the hero with today's opening hours.`,
    `Food is a visual purchase — 6–12 real photos of signature dishes beat forty stock images. Place recent Google reviews with a star badge right beside the booking button, where trust and decision happen together.`,
    `Create simple local pages like "Family restaurant in Kandivali West" with map, directions and Restaurant schema. They win "near me" searches and bring direct customers without paying aggregator commission.`,
    `Every restaurant section should end in book, order, call or directions. Menus shouldn't be PDF dead-ends — close them with "Reserve your table". If booking takes more than two taps, you're losing covers weekly.`,
    `Track reservations, WhatsApp orders, call taps, direction clicks and menu views separately in GA4. Patterns like "many menu views, few bookings" or pre-mealtime enquiry spikes tell you exactly what to fix or promote.`,
    `Most "restaurant near me" searches happen on phones on mobile data. After each menu or offer update, check readable prices without zooming, sticky booking buttons in thumb reach, and compressed photos that load fast on 4G.`,
  ],

  /* ── 4. Business Automation Ideas for Growing Teams ── */
  'business-automation': [
    `You can't automate what you can't see. Land every lead — form, WhatsApp, ad, referral — in one CRM pipeline with its source attached, auto-assign an owner and escalate anything untouched for 24 hours.`,
    `Start automation where repetition hurts: appointment reminders 24 hours and 2 hours before bookings cut no-shows, project status updates kill "any update?" messages, and unpaid invoices get polite nudges on day 7 and 14.`,
    `A good dashboard shows this week's leads by source, conversion by service, revenue vs target and response times — pulled live, never compiled manually. AI alerts can flag anomalies like a sudden enquiry drop.`,
    `Treat the website as the front end of your workflows: a quote form should create a CRM deal and send an instant acknowledgement; a demo click should book the calendar slot. Any CTA ending in an unmonitored inbox is a leak.`,
    `Measure the funnel and the automation itself: first-response time, reminder delivery, follow-up replies. Leads answered on WhatsApp within five minutes convert several times better than those answered in an hour.`,
    `Forms and dashboards are both used mostly on phones. Every extra form field raises abandonment — and an abandoned form means no automation fires. Test the full flow, enquiry to closed task, on a phone after each change.`,
  ],

  /* ── 5. UI/UX Principles That Make Websites Feel Premium ── */
  'uiux-principles': [
    `Users scan, they don't read. Big meaningful headings act as signposts and 2–4 line paragraphs give the eye resting points — the size contrast between them is where premium hierarchy comes from.`,
    `Cards apply the oldest perception rule: related things should look grouped. Identical radius, padding and shadow across every card is what reads as premium; one mismatched corner radius quietly signals carelessness.`,
    `Intentional mobile means composed for 375px and thumbs — shorter headings rather than shrunken ones, 44px tap targets, and primary buttons in the lower half of the screen. Design mobile first, then expand to desktop.`,
    `Each section should answer one visitor question — "am I in the right place?", "can I trust them?", "what now?" — and visually point to the next step. Exactly one high-emphasis button style belongs to the main conversion.`,
    `Heatmaps, scroll depth and session recordings turn design opinions into evidence: dead clicks reveal cards that look clickable but aren't, and one awkward form field can be where most completions collapse.`,
    `Responsive quality decays by accumulation — a longer heading here, an extra card there. A five-minute pass on a real phone after every publish (wraps, overflow, stacking order, tap spacing) protects the premium feel.`,
  ],

  /* ── 5b. How to Design a High-Converting Homepage ── */
  'high-converting-homepage': [
    `The hero section earns or loses attention in under three seconds. Lead with one clear benefit statement, a supporting subline, and a single high-contrast CTA — visitors who understand your offer instantly are far more likely to scroll.`,
    `Trust elements belong close to the decision point. Place testimonials, logos or ratings within one scroll of the hero, not buried at the bottom — proximity to the CTA removes doubt at the exact moment of consideration.`,
    `Every homepage section should earn its place by pushing visitors toward one action. If a strip doesn't support a click, call, form fill or scroll to a proof block, it's visual noise that dilutes conversion.`,
    `Heatmaps show that bottom-of-page CTAs rarely get clicked unless the visitor has already decided. Place a secondary conversion point — a short form or WhatsApp button — at the 60% scroll mark where engagement peaks.`,
    `Track hero CTA clicks, scroll depth, time on page and bounce rate in GA4. A high bounce rate on a beautiful homepage usually means the headline promises something the rest of the page doesn't deliver.`,
    `Most homepage traffic arrives on phones. After each content change, test the hero text size, CTA tap target, and how many scrolls it takes to reach the first proof block on a real device.`,
  ],

  /* ── 5c. Website Color Psychology for Modern Brands ── */
  'color-psychology-brands': [
    `Colors carry cultural and emotional weight: blue signals trust and professionalism, gold implies premium quality, green suggests growth or health. Choose your primary brand color based on the emotion your audience needs to feel.`,
    `Dark navy backgrounds with gold accents — the AuraShine pattern — work because navy reads as stable and professional while gold adds warmth and premium energy. The contrast ratio also keeps text accessible.`,
    `Never pick a color palette in isolation. Test it against your content: white-on-dark text, dark-on-light body copy, and the accent color on small interactive elements like badges, buttons and hover states.`,
    `A brand palette needs a neutral fallback. Off-whites like #F8F7F4 and warm grays like #5F5A66 keep backgrounds calm and let the accent color do the talking without overwhelming the reader.`,
    `WCAG accessibility requires a 4.5:1 contrast ratio for body text and 3:1 for large text. Tools like WebAIM Contrast Checker prevent beautiful color combinations that fail real-world readability.`,
    `Brand colors should stay consistent across website, social media, email signatures and print. Inconsistency between channels quietly undermines the professionalism your website tries to project.`,
  ],

  /* ── 5d. Mobile-First Design Mistakes Businesses Should Avoid ── */
  'mobile-first-mistakes': [
    `The most common mistake is designing desktop first and then shrinking — this creates tiny tap targets, cramped text and CTAs buried below the fold. Start at 375px, make it work for thumbs, then scale up.`,
    `Hidden content is invisible content. Accordions and tabs that hide key information hurt both user trust and mobile SEO, since Google indexes what's visible on the phone version.`,
    `Auto-playing carousels and hero sliders waste bandwidth and attention on mobile. Most visitors never swipe past the first slide — a single static image with a clear CTA converts better and loads faster.`,
    `Forms with too many fields destroy mobile conversions. Every extra field increases abandonment — ask for name, contact method and one qualifier. You can collect details after the initial enquiry.`,
    `Fixed headers and sticky elements that work on desktop often cover content on small screens. Always check that a fixed header doesn't eat 20% of the viewport or block a CTA button from view.`,
    `Test on real Android devices, not just iPhone. India's most common screen widths — 360px and 412px — often expose layout issues that Safari on iPhone never shows.`,
  ],

  /* ── 5e. Typography Rules for Clean and Professional Websites ── */
  'typography-rules': [
    `Two font families are enough: one for headings and one for body text. Adding a third font creates visual noise and slows page loading — especially on mobile where font rendering is slower.`,
    `Line length directly affects readability. Keep body text between 60 and 75 characters per line — shorter on mobile. Lines that are too wide fatigue the eye; lines that are too narrow break reading rhythm.`,
    `Font weight contrast creates hierarchy more reliably than size alone. A 700-weight heading above 400-weight body text creates clear separation even when both are the same color.`,
    `Line height of 1.6 to 1.8 for body text gives the eye room to travel. Tight line spacing makes paragraphs feel dense and discourages reading, while excessive spacing disconnects lines from each other.`,
    `Limit your type scale to 4–5 sizes. A heading, a subheading, body, small caption, and badge text are usually enough — too many sizes create inconsistency that feels amateur.`,
    `Font loading strategy matters for perceived performance. Use font-display: swap so text is visible immediately with a system font, then swaps to the custom font — no invisible text during load.`,
  ],

  /* ── 5f. How Micro-Interactions Improve User Experience ── */
  'micro-interactions-ux': [
    `A button that changes color or lifts on hover tells the user "this is clickable" without words. Micro-interactions replace guesswork with feedback — the user knows their action was recognized.`,
    `Keep transitions under 300ms for UI feedback and under 500ms for page transitions. Anything longer feels sluggish; anything shorter feels jarring. The goal is noticeable, not dramatic.`,
    `Loading states prevent user anxiety. A skeleton loader, a spinner or even a subtle pulse animation during form submission tells the user the system is working — silence makes people refresh or abandon.`,
    `Micro-interactions scale poorly if they're inconsistent. If one card lifts on hover, all cards should lift on hover. Mixing interaction styles across sections makes the interface feel fragmented.`,
    `Animated number counters, progress bars and scroll-linked reveals add energy to data-heavy sections. The key is subtlety — motion should emphasize content, not distract from it.`,
    `Always respect prefers-reduced-motion. Users with vestibular disorders experience real discomfort from unnecessary animation. A simple media query disables transitions for those who need stillness.`,
  ],

  /* ── 5g. Designing Service Pages That Generate Enquiries ── */
  'service-pages-enquiries': [
    `The headline should state the outcome, not just the service name. "Websites that turn visitors into qualified leads" outperforms "Web Design Services" because it answers the visitor's real question: what will this do for me?`,
    `Place proof elements — client logos, star ratings, review quotes, case study snippets — directly above or beside the primary CTA. Trust at the decision point reduces hesitation and increases clicks.`,
    `Every service page needs a visible process section: what happens after the visitor enquires. A simple 3–4 step timeline — Discovery, Design, Development, Launch — removes uncertainty about next steps.`,
    `FAQ sections on service pages do double duty: they answer buyer objections for humans and provide structured data for search engines. Use FAQPage schema to increase the chance of rich results.`,
    `One primary CTA per service page, repeated 2–3 times: hero, mid-page and bottom. Secondary actions like "View portfolio" or "Read case study" should be visually subordinate to the main conversion.`,
    `Service pages are among the most-visited pages on any business website, yet many have thin content. Aim for 800–1200 words of genuine detail — deliverables, timelines, pricing context and proof — to satisfy both readers and search engines.`,
  ],

  /* ── 6. How Content Builds Trust Before a Sales Call ── */
  'content-growth': [
    `Buyers research quietly before contacting anyone. Articles that answer their private questions — budgets, timelines, process — do pre-sales work at scale, so calls start at "how do we begin?" instead of "convince me".`,
    `Specificity is believable, generality is not: "weekday occupancy went from 40% to 85% in four months" beats "we deliver results". Structure case studies as situation → problem → approach → measurable outcome.`,
    `One useful article per month beats five posts then a year of silence — for rankings and for trust, since a stale blog suggests a stale business. Repurpose each piece into social posts, newsletter and FAQ content.`,
    `Every article needs a next step matched to its stage: guides link to deeper comparisons, comparisons to case studies, decision pages to "Get a free audit". Contextual in-text CTAs outperform generic banners.`,
    `Look past traffic to trust metrics: engaged reading time, newsletter signups per post, clicks to service pages and assisted conversions in GA4. The unglamorous "questions to ask before hiring" posts often win.`,
    `Most blog reading happens on phones in stolen moments. Check every post on your own phone before publishing: 16px+ text, short paragraphs, compressed images and subheadings that let scanners navigate.`,
  ],

  /* ── 7. Enterprise Website Checklist Before Launch ── */
  'enterprise-website-checklist': [
    `Test real templates on a defined device matrix — common Android widths, iPhone, tablet, 1366px laptop — not just browser resizing. Layouts that pass 375 and 768 can still collapse at 412, one of India's most common widths.`,
    `Submit every form end-to-end and confirm the lead reaches CRM and a monitored inbox. If replacing an old site, the 301 redirect map is the highest-stakes item — launching without one destroys years of SEO equity.`,
    `Launch is the start line, not the finish: plan week-one monitoring, month-one behaviour review and quarterly content, performance and A/B work — each stream with a named owner and budget, or it stays a wish list.`,
    `Enterprise homepages drift toward serving the org chart. Give every section a measurable job — demo requests, solution routing, signups — in a spreadsheet of audience, action and metric. Blank columns mean cut it.`,
    `Define the full GA4 event taxonomy before launch and connect it to CRM so you see lead quality, not just volume — one landing page can send fewer leads but double the closed revenue. Broken tracking at launch means flying blind.`,
    `With many contributors publishing constantly, mobile checks must be process: no page ships until someone verifies headings, tables, forms and load time on a real phone. Automate visual regression on high-traffic templates.`,
  ],

  /* ── 8. How to Structure a Blog System That Looks Real ── */
  'blog-system-layout': [
    `Five to eight reader-minded categories as filter chips give visitors an instant map of what you cover; forty micro-categories signal neglect. Keep search visible and forgiving, with a helpful empty state.`,
    `The article page is where readers live: category badge, read time, author block, tuned typography (60–75 character lines) and pull-quote or key-point cards. Uniform structure across posts is what reads as a real publication.`,
    `Related posts and a newsletter box answer the finished reader's silent "what now?" — turning one visit into three pages or a subscription. Match related posts by topic, and keep the signup honest: name, email, one promise.`,
    `Wire the blog into the business: the featured slot goes to the article your ideal buyer needs, and each post links contextually to its matching service. If any top article is more than two clicks from contact, readers are being abandoned.`,
    `Track two funnels: content performance (engaged time, search clicks) and business performance (service-page clicks, signups, enquiry assists in GA4). A handful of posts will drive most results — deepen and interlink those.`,
    `Articles are consumed on phones in queues and commutes. After each publish, read the whole post on a real device, tap a related post and submit the newsletter form — five minutes that protect both polish and pipeline.`,
  ],
};

export default BLOG_FAQ_ANSWERS;
