import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

/**
 * Generic useScrollAnimation hook
 * Returns a ref to attach to an element of type T and a `visible` boolean.
 */
export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible } as { ref: RefObject<T>; visible: boolean };
};
