// Enhanced cache for categories with localStorage persistence
class CategoryCache {
  private cache: any[] | null = null;
  private cacheTimestamp: number | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes for more frequent updates
  private readonly STORAGE_KEY = 'thado_categories_cache';
  private readonly STORAGE_TIMESTAMP_KEY = 'thado_categories_timestamp';

  constructor() {
    // Always clear cache on initialization to ensure fresh data on page load
    console.log('🔄 CategoryCache initialized - clearing existing cache');
    this.clearStorage();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const cachedData = localStorage.getItem(this.STORAGE_KEY);
      const timestamp = localStorage.getItem(this.STORAGE_TIMESTAMP_KEY);
      
      if (cachedData && timestamp) {
        this.cache = JSON.parse(cachedData);
        this.cacheTimestamp = parseInt(timestamp);
        console.log('Categories loaded from localStorage:', this.cache?.length, 'items');
      }
    } catch (error) {
      console.warn('Failed to load categories from localStorage:', error);
      this.clearStorage();
    }
  }

  private saveToStorage(): void {
    try {
      if (this.cache) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cache));
        localStorage.setItem(this.STORAGE_TIMESTAMP_KEY, this.cacheTimestamp?.toString() || '');
        console.log('Categories saved to localStorage');
      }
    } catch (error) {
      console.warn('Failed to save categories to localStorage:', error);
    }
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.STORAGE_TIMESTAMP_KEY);
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  getCachedCategories(): any[] | null {
    if (!this.cache || !this.cacheTimestamp) {
      console.log('🔍 No cache available');
      return null;
    }
    
    const now = Date.now();
    const cacheAge = now - this.cacheTimestamp;
    const isExpired = cacheAge > this.CACHE_DURATION;
    
    console.log(`🔍 Cache check: age=${Math.round(cacheAge/1000)}s, expired=${isExpired}, items=${this.cache?.length}`);
    
    if (isExpired) {
      console.log('🔍 Cache expired, clearing...');
      this.clearCache();
      return null;
    }
    
    return this.cache;
  }

  setCachedCategories(categories: any[]): void {
    this.cache = categories;
    this.cacheTimestamp = Date.now();
    this.saveToStorage();
    console.log('✅ Categories cached:', categories.length, 'items');
  }

  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = null;
    this.clearStorage();
    console.log('Category cache cleared');
  }

  hasValidCache(): boolean {
    return this.getCachedCategories() !== null;
  }

  // Force refresh cache (useful for admin updates)
  forceRefresh(): void {
    console.log('🔄 Force refreshing category cache...');
    this.clearCache();
  }

  // Add method to check cache status for debugging
  getCacheStatus(): { hasCache: boolean; age: number; expired: boolean; count: number } {
    const hasCache = !!(this.cache && this.cacheTimestamp);
    const age = hasCache ? Date.now() - this.cacheTimestamp! : 0;
    const expired = hasCache ? age > this.CACHE_DURATION : true;
    const count = this.cache?.length || 0;
    
    return { hasCache, age, expired, count };
  }
}

// Export singleton instance
export const categoryCache = new CategoryCache();

// Add global debug methods for development
if (typeof window !== 'undefined') {
  (window as any).debugCache = {
    status: () => {
      const status = categoryCache.getCacheStatus();
      console.log('🔍 Cache Status:', {
        ...status,
        ageInSeconds: Math.round(status.age / 1000),
        ageInMinutes: Math.round(status.age / 60000)
      });
      return status;
    },
    clear: () => {
      categoryCache.forceRefresh();
      console.log('🔄 Cache cleared');
    },
    get: () => {
      const cached = categoryCache.getCachedCategories();
      console.log('🔍 Cached categories:', cached);
      return cached;
    },
    test: () => {
      console.log('🧪 Testing cache mechanism...');
      console.log('1. Current cache status:');
      (window as any).debugCache.status();
      console.log('2. Clearing cache...');
      (window as any).debugCache.clear();
      console.log('3. Cache after clear:');
      (window as any).debugCache.status();
      console.log('✅ Test complete. Now hover over RFID Products to see API call.');
    }
  };
}
