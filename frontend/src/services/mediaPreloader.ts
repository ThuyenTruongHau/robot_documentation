/**
 * Media Preloader Service
 * Preloads videos and 3D models to improve performance and user experience
 */

interface CacheItem {
  url: string;
  data: Blob | string;
  type: 'video' | 'model';
  timestamp: number;
}

class MediaPreloaderService {
  private cache: Map<string, CacheItem> = new Map();
  private preloadingQueue: Set<string> = new Set();
  private maxCacheSize = 100 * 1024 * 1024; // 100MB cache limit
  private currentCacheSize = 0;

  /**
   * Preload a video file
   */
  async preloadVideo(url: string): Promise<string> {
    // Check if already cached
    if (this.cache.has(url)) {
      const cached = this.cache.get(url)!;
      return URL.createObjectURL(cached.data as Blob);
    }

    // Check if already preloading
    if (this.preloadingQueue.has(url)) {
      return this.waitForPreload(url);
    }

    // Start preloading
    this.preloadingQueue.add(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to preload video: ${response.statusText}`);
      }

      const blob = await response.blob();
      const size = blob.size;

      // Check if cache has enough space
      if (this.currentCacheSize + size > this.maxCacheSize) {
        this.clearOldestCache(size);
      }

      // Store in cache
      this.cache.set(url, {
        url,
        data: blob,
        type: 'video',
        timestamp: Date.now()
      });
      this.currentCacheSize += size;

      this.preloadingQueue.delete(url);
      return URL.createObjectURL(blob);
    } catch (error) {
      this.preloadingQueue.delete(url);
      console.error('Error preloading video:', error);
      return url; // Return original URL as fallback
    }
  }

  /**
   * Preload a 3D model file
   */
  async preloadModel(url: string): Promise<string> {
    // Check if already cached
    if (this.cache.has(url)) {
      const cached = this.cache.get(url)!;
      return cached.data as string;
    }

    // Check if already preloading
    if (this.preloadingQueue.has(url)) {
      return this.waitForPreload(url);
    }

    // Start preloading
    this.preloadingQueue.add(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to preload model: ${response.statusText}`);
      }

      const blob = await response.blob();
      const size = blob.size;
      const objectUrl = URL.createObjectURL(blob);

      // Check if cache has enough space
      if (this.currentCacheSize + size > this.maxCacheSize) {
        this.clearOldestCache(size);
      }

      // Store in cache
      this.cache.set(url, {
        url,
        data: objectUrl,
        type: 'model',
        timestamp: Date.now()
      });
      this.currentCacheSize += size;

      this.preloadingQueue.delete(url);
      return objectUrl;
    } catch (error) {
      this.preloadingQueue.delete(url);
      console.error('Error preloading model:', error);
      return url; // Return original URL as fallback
    }
  }

  /**
   * Preload multiple media files
   */
  async preloadMultiple(urls: Array<{ url: string; type: 'video' | 'model' }>): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    
    const promises = urls.map(async ({ url, type }) => {
      try {
        const cachedUrl = type === 'video' 
          ? await this.preloadVideo(url) 
          : await this.preloadModel(url);
        results.set(url, cachedUrl);
      } catch (error) {
        console.error(`Error preloading ${url}:`, error);
        results.set(url, url); // Use original URL as fallback
      }
    });

    await Promise.all(promises);
    return results;
  }

  /**
   * Get cached media URL
   */
  getCachedUrl(url: string): string | null {
    const cached = this.cache.get(url);
    if (!cached) return null;

    if (cached.type === 'video') {
      return URL.createObjectURL(cached.data as Blob);
    } else {
      return cached.data as string;
    }
  }

  /**
   * Check if media is cached
   */
  isCached(url: string): boolean {
    return this.cache.has(url);
  }

  /**
   * Wait for ongoing preload to complete
   */
  private async waitForPreload(url: string): Promise<string> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!this.preloadingQueue.has(url)) {
          clearInterval(interval);
          const cached = this.cache.get(url);
          if (cached) {
            const cachedUrl = cached.type === 'video'
              ? URL.createObjectURL(cached.data as Blob)
              : cached.data as string;
            resolve(cachedUrl);
          } else {
            resolve(url); // Fallback to original URL
          }
        }
      }, 100);

      // Timeout after 30 seconds
      setTimeout(() => {
        clearInterval(interval);
        resolve(url);
      }, 30000);
    });
  }

  /**
   * Clear oldest cache items to make space
   */
  private clearOldestCache(requiredSpace: number): void {
    const sortedCache = Array.from(this.cache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);

    let freedSpace = 0;
    for (const [url, item] of sortedCache) {
      if (this.currentCacheSize - freedSpace + requiredSpace <= this.maxCacheSize) {
        break;
      }

      // Revoke object URL if it's a model
      if (item.type === 'model' && typeof item.data === 'string') {
        URL.revokeObjectURL(item.data);
      }

      const itemSize = item.type === 'video' 
        ? (item.data as Blob).size 
        : new Blob([item.data]).size;

      freedSpace += itemSize;
      this.cache.delete(url);
    }

    this.currentCacheSize -= freedSpace;
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    // Revoke all object URLs
    this.cache.forEach((item) => {
      if (item.type === 'model' && typeof item.data === 'string') {
        URL.revokeObjectURL(item.data);
      }
    });

    this.cache.clear();
    this.currentCacheSize = 0;
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      itemCount: this.cache.size,
      totalSize: this.currentCacheSize,
      maxSize: this.maxCacheSize,
      utilizationPercent: (this.currentCacheSize / this.maxCacheSize) * 100
    };
  }
}

// Export singleton instance
const mediaPreloader = new MediaPreloaderService();
export default mediaPreloader;

