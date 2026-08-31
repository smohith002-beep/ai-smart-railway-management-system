// ===============================================================
// AI SMART RAILWAY MANAGEMENT SYSTEM - DYNAMIC SEO HEAD MANAGER
// Developer: MOHITH S | smohith002@gmail.com
// ===============================================================

import { SEOPageMetadata, SITE_BRAND, SITE_URL, CORE_KEYWORDS } from '../../config/seoConfig';

class SeoHeadManager {
  private ensureMetaTag(attributeName: 'name' | 'property', attributeValue: string): HTMLMetaElement {
    let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attributeName, attributeValue);
      document.head.appendChild(tag);
    }
    return tag;
  }

  private ensureLinkTag(rel: string): HTMLLinkElement {
    let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    if (!tag) {
      tag = document.createElement('link');
      tag.setAttribute('rel', rel);
      document.head.appendChild(tag);
    }
    return tag;
  }

  public updatePageSEO(metadata: SEOPageMetadata): void {
    if (typeof document === 'undefined') return;

    // 1. Page Title
    const finalTitle = metadata.title.includes(SITE_BRAND.name)
      ? metadata.title
      : `${metadata.title} | ${SITE_BRAND.name}`;
    document.title = finalTitle;

    // 2. Meta Description
    const metaDescription = this.ensureMetaTag('name', 'description');
    metaDescription.setAttribute('content', metadata.description);

    // 3. Meta Keywords
    const keywordsList = (metadata.keywords && metadata.keywords.length > 0)
      ? metadata.keywords
      : CORE_KEYWORDS;
    const metaKeywords = this.ensureMetaTag('name', 'keywords');
    metaKeywords.setAttribute('content', keywordsList.join(', '));

    // 4. Canonical URL
    const canonicalHref = metadata.canonicalUrl || `${SITE_URL}${window.location.pathname}`;
    const canonicalLink = this.ensureLinkTag('canonical');
    canonicalLink.setAttribute('href', canonicalHref);

    // 5. Robots
    const metaRobots = this.ensureMetaTag('name', 'robots');
    metaRobots.setAttribute('content', metadata.noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // 6. Open Graph Tags
    const ogTitle = this.ensureMetaTag('property', 'og:title');
    ogTitle.setAttribute('content', finalTitle);

    const ogDescription = this.ensureMetaTag('property', 'og:description');
    ogDescription.setAttribute('content', metadata.description);

    const ogUrl = this.ensureMetaTag('property', 'og:url');
    ogUrl.setAttribute('content', canonicalHref);

    const ogType = this.ensureMetaTag('property', 'og:type');
    ogType.setAttribute('content', metadata.ogType || 'website');

    const ogSiteName = this.ensureMetaTag('property', 'og:site_name');
    ogSiteName.setAttribute('content', SITE_BRAND.name);

    const ogImage = this.ensureMetaTag('property', 'og:image');
    ogImage.setAttribute('content', metadata.ogImage || SITE_BRAND.ogImageUrl);

    const ogLocale = this.ensureMetaTag('property', 'og:locale');
    ogLocale.setAttribute('content', SITE_BRAND.locale);

    // 7. Twitter Card Tags
    const twitterCard = this.ensureMetaTag('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');

    const twitterTitle = this.ensureMetaTag('name', 'twitter:title');
    twitterTitle.setAttribute('content', finalTitle);

    const twitterDescription = this.ensureMetaTag('name', 'twitter:description');
    twitterDescription.setAttribute('content', metadata.description);

    const twitterImage = this.ensureMetaTag('name', 'twitter:image');
    twitterImage.setAttribute('content', metadata.ogImage || SITE_BRAND.ogImageUrl);

    // 8. Google Site Verification (if configured via env)
    const verificationKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GOOGLE_SITE_VERIFICATION : '';
    if (verificationKey) {
      const gscMeta = this.ensureMetaTag('name', 'google-site-verification');
      gscMeta.setAttribute('content', verificationKey);
    }

    // 9. Structured Data JSON-LD
    if (metadata.structuredData) {
      let scriptTag = document.getElementById('schema-structured-data') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'schema-structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(metadata.structuredData, null, 2);
    }
  }
}

export const seoHeadManager = new SeoHeadManager();
