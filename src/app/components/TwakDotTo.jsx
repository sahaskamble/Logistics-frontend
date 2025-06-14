'use client'

import React, { useEffect } from 'react'

export default function TwakDotTo() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://embed.tawk.to/684d19aa47f3b9190ba00363/1itmioh7b';
        script.async = true;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.body.appendChild(script);
      }, []);
  return (
    <div>TwakDotTo</div>
  )
}
