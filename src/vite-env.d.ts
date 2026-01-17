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
export interface ApiResponse<T = any> {
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

export type Category = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  featuredImageId: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryInput = Omit<
  Category,
  "id" | "createdAt" | "updatedAt" | "children"
>;
