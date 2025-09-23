// Enhanced cache for categories with localStorage persistence
class CategoryCache {
  private cache: any[] | null = null;
  private cacheTimestamp: number | null = null;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours instead of 5 minutes
  private readonly STORAGE_KEY = 'thado_categories_cache';
  private readonly STORAGE_TIMESTAMP_KEY = 'thado_categories_timestamp';

  constructor() {
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
    if (!this.cache || !this.cacheTimestamp) return null;
    
    const now = Date.now();
    if (now - this.cacheTimestamp > this.CACHE_DURATION) {
      this.clearCache();
      return null;
    }
    
    return this.cache;
  }

  setCachedCategories(categories: any[]): void {
    this.cache = categories;
    this.cacheTimestamp = Date.now();
    this.saveToStorage();
    console.log('Categories cached:', categories.length, 'items');
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
    this.clearCache();
  }
}

// Export singleton instance
export const categoryCache = new CategoryCache();
