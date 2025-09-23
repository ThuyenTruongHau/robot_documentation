import { Product, Category, ProductListResponse, CategoryListResponse } from '../types/product';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
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

  // Search API
  async searchProducts(query: string, categoryId?: number): Promise<Product[]> {
    const response = await this.getProducts({
      search: query,
      category: categoryId,
      limit: 20
    });
    return response.results;
  }

  // Utility method to get full image URL
  getImageUrl(imagePath?: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
  }
}

export const apiService = new ApiService();
export default apiService;
