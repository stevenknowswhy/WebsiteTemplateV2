import * as React from 'react';

export interface PerformanceMetrics {
  bundleSize: {
    js: number;
    css: number;
    images: number;
    fonts: number;
    total: number;
  };
  loadTime: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
  };
  runtime: {
    hydration: number;
    interactive: number;
    totalBlockingTime: number;
  };
}

export interface BundleReport {
  name: string;
  size: number;
  gzip: number;
  percentChange?: number;
  chunks: string[];
  modules: Array<{
    name: string;
    size: number;
    path: string;
  }>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics | null = null;
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.setupPerformanceMonitoring();
  }

  private setupPerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lcp = entries[entries.length - 1];
          if (this.metrics) {
            this.metrics.loadTime.largestContentfulPaint = lcp.startTime;
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);

        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const fcp = entries[0];
          if (this.metrics) {
            this.metrics.loadTime.firstContentfulPaint = fcp.startTime;
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);

        // Layout Shift
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            const layoutShiftEntry = entry as any;
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          }
          if (this.metrics) {
            this.metrics.loadTime.cumulativeLayoutShift = clsValue;
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('Performance monitoring setup failed:', e);
      }
    }

    // Navigation timing
    window.addEventListener('load', () => {
      if (this.metrics) {
        const navigation = performance.getEntriesByType('navigation')[0] as any;
        if (navigation) {
          this.metrics.runtime.hydration = navigation.domInteractive - navigation.domLoading;
          this.metrics.runtime.interactive = navigation.loadEventEnd - navigation.navigationStart;
        }
      }
    });
  }

  async collectMetrics(): Promise<PerformanceMetrics> {
    if (typeof window === 'undefined') {
      throw new Error('Performance metrics can only be collected in the browser');
    }

    this.metrics = {
      bundleSize: await this.calculateBundleSize(),
      loadTime: {
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
      },
      runtime: {
        hydration: 0,
        interactive: 0,
        totalBlockingTime: 0,
      },
    };

    // Collect additional metrics
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcp) {
      this.metrics.loadTime.firstContentfulPaint = fcp.startTime;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as any;
    if (navigation) {
      this.metrics.runtime.hydration = navigation.domInteractive - navigation.domLoading;
      this.metrics.runtime.interactive = navigation.loadEventEnd - navigation.navigationStart;
      this.metrics.runtime.totalBlockingTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
    }

    return this.metrics;
  }

  private async calculateBundleSize(): Promise<PerformanceMetrics['bundleSize']> {
    if (typeof window === 'undefined') {
      return {
        js: 0,
        css: 0,
        images: 0,
        fonts: 0,
        total: 0,
      };
    }

    const resources = performance.getEntriesByType('resource');
    let js = 0, css = 0, images = 0, fonts = 0;

    for (const resource of resources) {
      const size = (resource as PerformanceResourceTiming).transferSize || 0;

      if (resource.name.includes('.js')) {
        js += size;
      } else if (resource.name.includes('.css')) {
        css += size;
      } else if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(resource.name)) {
        images += size;
      } else if (/\.(woff|woff2|ttf|otf)$/i.test(resource.name)) {
        fonts += size;
      }
    }

    return { js, css, images, fonts, total: js + css + images + fonts };
  }

  generateReport(): string {
    if (!this.metrics) {
      return 'No metrics collected yet';
    }

    const { bundleSize, loadTime, runtime } = this.metrics;

    return `
Performance Report
==================

Bundle Sizes:
- JavaScript: ${this.formatBytes(bundleSize.js)}
- CSS: ${this.formatBytes(bundleSize.css)}
- Images: ${this.formatBytes(bundleSize.images)}
- Fonts: ${this.formatBytes(bundleSize.fonts)}
- Total: ${this.formatBytes(bundleSize.total)}

Loading Performance:
- First Contentful Paint: ${this.formatTime(loadTime.firstContentfulPaint)}
- Largest Contentful Paint: ${this.formatTime(loadTime.largestContentfulPaint)}
- Cumulative Layout Shift: ${loadTime.cumulativeLayoutShift.toFixed(3)}

Runtime Performance:
- Hydration Time: ${this.formatTime(runtime.hydration)}
- Time to Interactive: ${this.formatTime(runtime.interactive)}
- Total Blocking Time: ${this.formatTime(runtime.totalBlockingTime)}

Core Web Vitals Assessment:
- LCP: ${this.assessLCP(loadTime.largestContentfulPaint)}
- FID: ${this.assessFID(loadTime.firstInputDelay)}
- CLS: ${this.assessCLS(loadTime.cumulativeLayoutShift)}
    `.trim();
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private formatTime(ms: number): string {
    return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(2)}s`;
  }

  private assessLCP(lcp: number): string {
    if (lcp < 2.5) return 'Good (≤2.5s)';
    if (lcp < 4.0) return 'Needs Improvement (≤4s)';
    return 'Poor (>4s)';
  }

  private assessFID(fid: number): string {
    if (fid < 100) return 'Good (<100ms)';
    if (fid < 300) return 'Needs Improvement (<300ms)';
    return 'Poor (≥300ms)';
  }

  private assessCLS(cls: number): string {
    if (cls < 0.1) return 'Good (≤0.1)';
    if (cls < 0.25) return 'Needs Improvement (≤0.25)';
    return 'Poor (>0.25)';
  }

  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// React performance utilities
export const ReactPerformance = {
  // Component-level memoization check
  checkMemoUsage(componentName: string, props: any): void {
    if (process.env.NODE_ENV === 'development') {
      const propCount = Object.keys(props).length;
      if (propCount > 10) {
        console.warn(
          `${componentName} has ${propCount} props. Consider using React.memo or breaking into smaller components.`
        );
      }
    }
  },

  // Hook performance check
  checkHookPerformance(componentName: string, hookName: string, executionTime: number): void {
    if (process.env.NODE_ENV === 'development' && executionTime > 16) {
      console.warn(
        `${componentName}'s ${hookName} took ${executionTime}ms. Consider optimization.`
      );
    }
  },

  // Bundle size analysis for imports
  analyzeBundleImport(path: string, estimatedSize: number): void {
    if (process.env.NODE_ENV === 'development' && estimatedSize > 100 * 1024) { // 100KB
      console.warn(
        `${path} is estimated to be ${Math.round(estimatedSize / 1024)}KB. Consider dynamic import.`
      );
    }
  },
};

// Dynamic import utilities
export const DynamicImports = {
  // Lazy load components
  lazyComponent<T extends React.ComponentType<any> = any>(
    importFn: () => Promise<{ default: T }>,
    componentName: string
  ): React.LazyExoticComponent<T> {
    ReactPerformance.analyzeBundleImport(componentName, 50 * 1024); // 50KB estimate
    return React.lazy(importFn);
  },

  // Conditional library loading
  async loadLibrary<T = any>(
    importFn: () => Promise<T>,
    libraryName: string,
    condition: boolean = true
  ): Promise<T | null> {
    if (!condition) return null;

    try {
      const start = performance.now();
      const module = await importFn();
      const duration = performance.now() - start;

      ReactPerformance.checkHookPerformance('DynamicImport', libraryName, duration);
      return module;
    } catch (error) {
      console.error(`Failed to load ${libraryName}:`, error);
      return null;
    }
  },
};

// Default instance
export const performanceMonitor = new PerformanceMonitor();

// React utilities
export const usePerformance = () => {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      performanceMonitor.collectMetrics().then(setMetrics);
    }
  }, []);

  return metrics;
};

export default performanceMonitor;