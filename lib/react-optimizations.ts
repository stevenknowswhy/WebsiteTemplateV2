"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const renderTimes = useRef<number[]>([]);
  const lastRenderTime = useRef<number>(0);

  useEffect(() => {
    const now = performance.now();
    if (lastRenderTime.current > 0) {
      const renderTime = now - lastRenderTime.current;
      renderTimes.current.push(renderTime);

      // Keep only last 10 render times
      if (renderTimes.current.length > 10) {
        renderTimes.current = renderTimes.current.slice(-10);
      }
    }
    lastRenderTime.current = now;
    renderCount.current += 1;
  });

  return {
    renderCount: renderCount.current,
    avgRenderTime: renderTimes.current.length > 0
      ? renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length
      : 0,
    lastRenderTime: lastRenderTime.current,
    renderTimes: renderTimes.current
  };
};

// Optimized event handler hook
export const useOptimizedEventHandler = <T extends (...args: any[]) => any>(
  handler: T,
  delay = 100
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handler(...args);
    }, delay);
  }, [handler, delay]) as T;
};

// Virtual scroll hook
export interface VirtualScrollOptions {
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  totalItems: number;
  overscan?: number;
}

export const useVirtualScroll = ({
  itemHeight,
  containerHeight,
  totalItems,
  overscan = 3,
}: VirtualScrollOptions) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const getItemHeight = typeof itemHeight === 'function' ? itemHeight : () => itemHeight;

    let startIndex = 0;
    let endIndex = 0;
    let accumulatedHeight = 0;

    // Find start index
    for (let i = 0; i < totalItems; i++) {
      if (accumulatedHeight <= scrollTop - overscan * getItemHeight(i)) {
        accumulatedHeight += getItemHeight(i);
        startIndex = i + 1;
      } else {
        break;
      }
    }

    // Find end index
    accumulatedHeight = 0;
    for (let i = startIndex; i < totalItems; i++) {
      if (accumulatedHeight <= containerHeight + 2 * overscan * getItemHeight(i)) {
        accumulatedHeight += getItemHeight(i);
        endIndex = i;
      } else {
        break;
      }
    }

    return {
      startIndex: Math.max(0, startIndex),
      endIndex: Math.min(totalItems - 1, endIndex)
    };
  }, [scrollTop, itemHeight, containerHeight, totalItems, overscan]);

  return {
    visibleRange,
    scrollTop,
    setScrollTop
  };
};

// Intersection observer hook
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);

    return () => observer.disconnect();
  }, [callback, options]);

  return elementRef;
};

// Optimized image loading hook
export const useOptimizedImage = (src: string, options?: {
  placeholder?: string;
  lazy?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const loadHandler = () => setIsLoaded(true);
    const errorHandler = (e: ErrorEvent) => setError(new Error('Image failed to load'));

    img.addEventListener('load', loadHandler);
    img.addEventListener('error', errorHandler);

    return () => {
      img.removeEventListener('load', loadHandler);
      img.removeEventListener('error', errorHandler);
    };
  }, [src]);

  return {
    imgRef,
    isLoaded,
    error,
    src: isLoaded || !options?.lazy ? src : options?.placeholder || ''
  };
};

// Debounced state hook
export const useDebouncedState = <T>(
  initialValue: T,
  delay = 300
): [T, React.Dispatch<React.SetStateAction<T>>, T] => {
  const [state, setValue] = useState(initialValue);
  const [debouncedState, setDebouncedState] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => clearTimeout(handler);
  }, [state, delay]);

  return [state, setValue, debouncedState];
};

// Component-level performance utilities
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> {
  return function WithPerformanceMonitoring(props: P) {
    const metrics = usePerformanceMonitor(componentName);

    // Warn about frequent re-renders
    useEffect(() => {
      if (metrics.renderCount > 50 && process.env.NODE_ENV === 'development') {
        console.warn(
          `${componentName} has rendered ${metrics.renderCount} times. Consider optimization.`
        );
      }
    }, [metrics.renderCount, componentName]);

    // Track slow renders
    useEffect(() => {
      if (metrics.avgRenderTime > 16 && process.env.NODE_ENV === 'development') {
        console.warn(
          `${componentName} average render time (${metrics.avgRenderTime.toFixed(2)}ms) exceeds frame budget.`
        );
      }
    }, [metrics.avgRenderTime, componentName]);

    return React.createElement(Component, props);
  };
}

// Optimized list component
export interface OptimizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  className?: string;
  getItemKey?: (item: T, index: number) => string;
}

export function OptimizedList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  className = '',
  getItemKey = (item, index) => index.toString(),
}: OptimizedListProps<T>) {
  const { visibleRange, scrollTop, setScrollTop } = useVirtualScroll({
    itemHeight,
    containerHeight,
    totalItems: items.length,
    overscan: 3,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const visibleItems = items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);

  const getItemHeightValue = useCallback((index: number) => {
    return typeof itemHeight === 'function' ? itemHeight(index) : itemHeight;
  }, [itemHeight]);

  const totalHeight = useMemo(() => {
    return items.reduce((total, _, i) => total + getItemHeightValue(i), 0);
  }, [items.length, getItemHeightValue]);

  const offsetY = useMemo(() => {
    return items.slice(0, visibleRange.startIndex).reduce((total, _, i) => total + getItemHeightValue(i), 0);
  }, [visibleRange.startIndex, getItemHeightValue]);

  return React.createElement('div', {
    ref: containerRef,
    className: `optimized-list ${className}`,
    onScroll: handleScroll,
    style: {
      height: containerHeight,
      overflowY: 'auto',
      position: 'relative',
    }
  }, React.createElement('div', {
    style: {
      height: totalHeight,
      position: 'relative',
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      top: offsetY,
      left: 0,
      right: 0,
    }
  }, visibleItems.map((item, index) => {
    const actualIndex = visibleRange.startIndex + index;
    return React.createElement('div', {
      key: getItemKey(item, actualIndex),
      style: {
        height: getItemHeightValue(actualIndex),
      }
    }, renderItem(item, actualIndex));
  }))));
}

// Utility hooks
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useClickOutside = (
  callback: () => void,
  elementRef?: React.RefObject<Element>
) => {
  const internalRef = useRef<Element>(null);
  const ref = elementRef || internalRef;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback, ref]);

  return ref;
};