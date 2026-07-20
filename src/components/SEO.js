import { useEffect } from 'react';

const BASE_URL = 'https://aurashineinfotech.com';
const SITE_NAME = 'AuraShine Infotech';
const DEFAULT_DESC = 'AuraShine Infotech is a modern IT company offering website development, app development, CRM software, digital marketing, SEO, and business automation solutions.';

const SEO = ({ title, description, path, ogImage, ogType = 'website', keywords, jsonLd }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Best IT Company for Websites, Apps & Software`;
  const desc = description || DEFAULT_DESC;
  const url = `${BASE_URL}${path || '/'}`;
  const image = ogImage || `${BASE_URL}/assets/aurashine-logo.png`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', desc);
    setMeta('keywords', keywords || '');
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', url, true);
    setMeta('og:image', image, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'en_IN', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', image);
    setMeta('twitter:site', '@aurashine');
    setMeta('author', SITE_NAME);

    // Canonical URL — create the tag if the static one is missing, then keep it in sync.
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [fullTitle, desc, url, image, ogType, keywords]);

  // Per-page JSON-LD structured data (added without touching the site-wide graph
  // in index.html). Injected on mount, removed on unmount / route change.
  useEffect(() => {
    if (!jsonLd) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-page', '');
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [jsonLd]);

  return null;
};

export default SEO;
