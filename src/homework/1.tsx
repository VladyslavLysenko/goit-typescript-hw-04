import React, { useEffect, useRef } from 'react';


type Props = {
  children: React.ReactNode;
  onContentEndVisible: () => void;
}

type Options = IntersectionObserverInit;

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const options:Options = {
      rootMargin: '0px',
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <p ref={endContentRef} />
    </div>
  );
}
