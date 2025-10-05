"use client";

import { useEffect } from 'react';

type AdBannerProps = {
  'data-ad-client': string;
  'data-ad-slot': string;
  'data-ad-format'?: string;
  'data-full-width-responsive'?: string;
  className?: string;
};

const AdBanner = (props: AdBannerProps) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('Ad push error:', err);
    }
  }, []);

  return (
    <div className={props.className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={props['data-ad-client']}
        data-ad-slot={props['data-ad-slot']}
        data-ad-format={props['data-ad-format'] || 'auto'}
        data-full-width-responsive={props['data-full-width-responsive'] || 'true'}
      ></ins>
    </div>
  );
};

export default AdBanner;
