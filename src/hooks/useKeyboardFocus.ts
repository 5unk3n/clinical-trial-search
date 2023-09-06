import { useEffect, useRef, useState } from 'react';

// FIXME: 열렸을 때 자동으로 포커스되는 문제 수정
const useKeyboardFocus = (itemCount: number) => {
  const [focusIndex, setFocusIndex] = useState(-1);
  const focusItemRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    focusItemRefs.current[focusIndex]?.focus();
  }, [focusIndex]);

  useEffect(() => {
    const keboardListener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setFocusIndex((prev) => (prev === 0 ? prev : prev - 1));
      } else if (e.key === 'ArrowDown') {
        setFocusIndex((prev) => (prev >= itemCount ? prev : prev + 1));
      }
    };
    document.addEventListener('keydown', keboardListener);

    return () => {
      document.removeEventListener('keydown', keboardListener);
    };
  }, [itemCount, focusIndex]);

  return focusItemRefs;
};

export default useKeyboardFocus;
