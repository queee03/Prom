import React, { useEffect } from 'react';

const useClickOutside = (ref: React.MutableRefObject<HTMLElement | null>, handler: Function) => {
  const listener = (e: MouseEvent) => {
    if (ref?.current?.contains(e.target as HTMLElement)) {
      return;
    }
    handler?.();
  };

  useEffect(() => {
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
