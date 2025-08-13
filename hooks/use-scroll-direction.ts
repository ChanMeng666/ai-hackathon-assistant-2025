'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseScrollDirectionOptions {
  threshold?: number;
  debounceMs?: number;
}

export const useScrollDirection = (options: UseScrollDirectionOptions = {}) => {
  const { threshold = 100, debounceMs = 10 } = options;
  
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const updateScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    // 在页面顶部时，始终显示导航栏
    if (currentScrollY < threshold) {
      setIsHeaderVisible(true);
      setLastScrollY(currentScrollY);
      return;
    }

    // 向下滚动且超过阈值时隐藏导航栏
    if (currentScrollY > lastScrollY && currentScrollY > threshold) {
      setIsHeaderVisible(false);
    }
    // 向上滚动时显示导航栏
    else if (currentScrollY < lastScrollY) {
      setIsHeaderVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, threshold]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // 防抖处理，提高性能
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollDirection, debounceMs);
    };

    // 初始设置
    setScrollY(window.scrollY);
    setLastScrollY(window.scrollY);

    // 添加滚动监听器，使用 passive 提高性能
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [updateScrollDirection, debounceMs]);

  return {
    isHeaderVisible,
    scrollY,
    isAtTop: scrollY < threshold
  };
};
