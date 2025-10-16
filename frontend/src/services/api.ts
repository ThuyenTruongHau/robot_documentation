import { Product, Category, ProductListResponse, CategoryListResponse } from '../types/product';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10);
const ENABLE_LOGS = process.env.REACT_APP_ENABLE_CONSOLE_LOGS === 'true';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

class ApiService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private log(message: string, data?: any): void {
    if (ENABLE_LOGS) {
      console.log(`[API Service] ${message}`, data || '');
    }
  }

  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      this.log(`Cache hit for key: ${key}`);
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
    this.log(`Cached data for key: ${key}`);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async makeRequest<T>(endpoint: string, options?: RequestInit, retries = MAX_RETRIES): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const mergedOptions = { ...defaultOptions, ...options };

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.log(`Request to ${endpoint} (Attempt ${attempt}/${retries})`);
        
        const response = await this.fetchWithTimeout(url, mergedOptions, API_TIMEOUT);
        
        if (!response.ok) {
          // Don't retry on client errors (4xx), only on server errors (5xx)
          if (response.status >= 400 && response.status < 500) {
            throw new Error(`Client Error: ${response.status} ${response.statusText}`);
          }
          
          // Retry on server errors
          if (attempt < retries) {
            this.log(`Server error ${response.status}, retrying...`);
            await this.delay(RETRY_DELAY * attempt);
            continue;
          }
          
          throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        this.log(`Response from ${endpoint}`, data);
        return data;
      } catch (error) {
        this.log(`Error on attempt ${attempt}`, error);
        
        // Don't retry if it's an abort/timeout or client error
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new Error('Request timeout');
          }
          if (error.message.includes('Client Error')) {
            throw error;
          }
        }
        
        // Last attempt failed
        if (attempt === retries) {
          throw new Error(
            error instanceof Error 
              ? error.message 
              : 'Network error. Please check your connection and try again.'
          );
        }
        
        // Wait before retrying
        await this.delay(RETRY_DELAY * attempt);
      }
    }

    throw new Error('Max retries exceeded');
  }

  // Products API
  async getProducts(params?: {
    page?: number;
    category?: number;
    search?: string;
    limit?: number;
  }): Promise<ProductListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.category) searchParams.set('category', params.category.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.limit) searchParams.set('page_size', params.limit.toString());
    
    const query = searchParams.toString();
    return this.makeRequest<ProductListResponse>(`/api/products/${query ? `?${query}` : ''}`);
  }

  async getProduct(id: number): Promise<Product> {
    return this.makeRequest<Product>(`/api/products/${id}/`);
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({ limit });
    return response.results;
  }

  // Categories API
  async getCategories(params?: {
    page?: number;
    search?: string;
    limit?: number;
  }): Promise<CategoryListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.limit) searchParams.set('page_size', params.limit.toString());
    
    const query = searchParams.toString();
    return this.makeRequest<CategoryListResponse>(`/api/categories/${query ? `?${query}` : ''}`);
  }

  async getCategory(id: number): Promise<Category> {
    return this.makeRequest<Category>(`/api/categories/${id}/`);
  }

  async getAllCategories(): Promise<Category[]> {
    const cacheKey = 'all-categories';
    const cached = this.getCachedData<Category[]>(cacheKey);
    if (cached) return cached;

    const response = await this.getCategories({ limit: 100 });
    this.setCachedData(cacheKey, response.results);
    return response.results;
  }

  // Search API - with fuzzy search support
  async searchProducts(params?: {
    q?: string;
    query?: string;
    category?: number;
    brand?: number;
    limit?: number;
  }): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams();
      
      // Support both 'q' and 'query' parameter names
      const searchQuery = params?.q || params?.query;
      if (searchQuery) searchParams.set('q', searchQuery);
      if (params?.category) searchParams.set('category', params.category.toString());
      if (params?.brand) searchParams.set('brand', params.brand.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      
      const query = searchParams.toString();
      const response = await this.makeRequest<any>(
        `/api/products/search/${query ? `?${query}` : ''}`
      );
      
      // Handle both response formats
      if (response.results) {
        return response.results;
      } else if (Array.isArray(response)) {
        return response;
      }
      
      return [];
    } catch (error) {
      this.log('Error searching products', error);
      return []; // Return empty array instead of throwing
    }
  }

  // Utility method to get full image URL
  getImageUrl(imagePath?: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${API_BASE_URL}${cleanPath}`;
  }

  // Contact API
  async submitContact(contactData: {
    full_name?: string;
    email: string;
    company?: string;
    phone_number: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.makeRequest<{ success: boolean; message: string }>(
        '/api/contact/',
        {
          method: 'POST',
          body: JSON.stringify(contactData),
        },
        1 // No retries for contact form
      );
      return response;
    } catch (error) {
      this.log('Error submitting contact form', error);
      throw error;
    }
  }

  // Health check
  async checkHealth(): Promise<boolean> {
    try {
      await this.makeRequest('/api/health/', {}, 1);
      return true;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();
export default apiService;
