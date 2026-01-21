/// <reference types="vite/client" />

export interface Media {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  createdAt: string;
  altText?: string;
  caption?: string;
}

export interface MediaConnection {
  id: string;
  mediaId: string;
  connectedTo: string; // 'product', 'category', 'page', etc.
  connectedId: string;
  connectionType: string; // 'thumbnail', 'gallery', 'featured', etc.
}

export interface UploadResponse {
  success: boolean;
  media: Media;
  message?: string;
}

// types/index.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export type CategoryWithParent = Category & {
  parent: Category | null;
};

export type Media = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  productId: string | null;
};

export type Category = {
  featuredImageId: string | null;
  id: string;
  title: string;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  parentId: string | null;
  isPublished: boolean;
};

export type Product = {
  featuredImageId: string | null;
  categoryId: string;
  id: string;
  title: string;
  stitchType: "STITCH" | "UNSTITCH";
  relatedProductId: string | null;
  sizes: string[];
  regularPrice: number;
  price: number;
  inStock: boolean;
  sku: string | null;
  isTopSelling: boolean;
  newArrival: boolean;
  isCustomeRelation: boolean;
  color: string | null;
  manufacturer: string | null;
  displayPriority: string | null;
  keywords: string[];
  body: string | null;
  pantLong: string | null;
  kamizLong: string | null;
  innerAndSalwar: string | null;
  description: JSON | null;
  slug: string;
  galleryImages: Media[] | [];
  featuredImage: Media | null;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryInput = Omit<
  Category,
  "id" | "createdAt" | "updatedAt" | "children"
>;
