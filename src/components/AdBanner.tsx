"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <aside className="py-4">
      <div className="container mx-auto">
        <div className="h-20 flex items-center justify-center">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-4790820209653050"
                data-ad-slot="6574275185"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
      </div>
    </aside>
  );
}
