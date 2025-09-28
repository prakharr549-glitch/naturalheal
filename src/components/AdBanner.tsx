"use client";

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

type AdBannerProps = {
  adSlot: string;
};

export default function AdBanner({ adSlot }: AdBannerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isMounted]);

  if (!isMounted) {
    return (
      <aside className="py-4">
        <div className="container mx-auto">
          <div className="h-20 flex items-center justify-center bg-muted/20 rounded-lg">
            {/* Placeholder for ad */}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="py-4">
      <div className="container mx-auto">
        <div className="h-20 flex items-center justify-center">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-4790820209653050"
                data-ad-slot={adSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
      </div>
    </aside>
  );
}
