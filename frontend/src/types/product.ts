export interface Category {
  id: number;
  name: string;
  image?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  product_count?: number;
}

export interface Brand {
  id: number;
  name: string;
  description?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product: number;
  image: string;
  uploaded_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  parameters?: Record<string, any>;
  category: Category;
  category_id?: number;
  category_name: string;
  brand: Brand;
  brand_id?: number;
  brand_name: string;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ProductListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Product[];
}

export interface CategoryListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Category[];
}

// Solution types
export interface SolutionImage {
  id: number;
  image: string;
  uploaded_at: string;
}

export interface Solution {
  id: number;
  solution_name: string;
  description?: string;
  detail?: Record<string, any>;
  first_image?: SolutionImage;
  images?: SolutionImage[];
  images_count?: number;
  created_at: string;
  updated_at: string;
}

export interface SolutionListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Solution[];
}