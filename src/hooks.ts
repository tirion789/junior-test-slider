import { useEffect, useRef, useState } from 'react';

export const useAdaptive = (innerElementWidth: number) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [elementsCount, setElementsCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef?.current) {
        setElementsCount(Math.floor(containerRef.current.offsetWidth / innerElementWidth));
      }
    };
    if (containerRef?.current) {
      setElementsCount(Math.floor(containerRef.current.offsetWidth / innerElementWidth));
      window.addEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [elementsCount, containerRef, innerElementWidth]);

  return [elementsCount, containerRef] as const;
};
