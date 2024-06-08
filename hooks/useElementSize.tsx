import { useRef, useState, useEffect, RefObject } from 'react';

export const useElementHeight = <T extends HTMLElement>(): [
  RefObject<T>,
  number
] => {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current?.offsetHeight || 0);

    const handleResize = () => {
      setHeight(ref.current?.offsetHeight || 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return [ref, height];
};

export const useWidthElement = <T extends HTMLElement>(): [
  RefObject<T>,
  number
] => {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current?.offsetWidth || 0);

    const handleResize = () => {
      setWidth(ref.current?.offsetWidth || 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return [ref, width];
};
