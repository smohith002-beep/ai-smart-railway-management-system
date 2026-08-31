import React, { useEffect } from 'react';
import { SEOPageMetadata } from '../../config/seoConfig';
import { seoHeadManager } from '../../services/seo/seoHeadManager';

interface SEOHeadProps extends SEOPageMetadata {}

export const SEOHead: React.FC<SEOHeadProps> = (props) => {
  useEffect(() => {
    seoHeadManager.updatePageSEO(props);
  }, [
    props.title,
    props.description,
    JSON.stringify(props.keywords),
    props.canonicalUrl,
    props.ogType,
    props.ogImage,
    props.noindex,
    JSON.stringify(props.structuredData)
  ]);

  return null;
};
