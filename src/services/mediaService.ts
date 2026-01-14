// services/mediaService.ts
import { apiHelper } from "../utils/api";
import {
  ApiResponse,
  Media,
  MediaConnection,
  PaginatedResponse,
  UploadResponse,
} from "../vite-env";

export const mediaService = {
  // Get all media with pagination
  getMedia: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<Media>> => {
    const response = await apiHelper.get<PaginatedResponse<Media>>("/media", {
      params,
    });
    return response;
  },

  // Upload media
  uploadMedia: async (
    file: File,
    onProgress?: (progressEvent: any) => void
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiHelper.post<UploadResponse>(
      "/media/upload",
      formData
    );
    return response;
  },

  // Delete media
  deleteMedia: async (id: string): Promise<ApiResponse> => {
    const response = await apiHelper.delete<ApiResponse>(`/media/${id}`);
    return response;
  },

  // Update media info
  updateMedia: async (
    id: string,
    data: Partial<Media>
  ): Promise<ApiResponse<Media>> => {
    const response = await apiHelper.put<ApiResponse<Media>>(
      `/media/${id}`,
      data
    );
    return response;
  },

  // Get connections for a media
  getConnections: async (
    mediaId: string
  ): Promise<ApiResponse<MediaConnection[]>> => {
    const response = await apiHelper.get<ApiResponse<MediaConnection[]>>(
      `/media/${mediaId}/connections`
    );
    return response;
  },

  // Connect media to entity
  connectMedia: async (
    data: Omit<MediaConnection, "id">
  ): Promise<ApiResponse<MediaConnection>> => {
    const response = await apiHelper.post<ApiResponse<MediaConnection>>(
      "/media/connections",
      data
    );
    return response;
  },

  // Disconnect media
  disconnectMedia: async (connectionId: string): Promise<ApiResponse> => {
    const response = await apiHelper.delete<ApiResponse>(
      `/media/connections/${connectionId}`
    );
    return response;
  },

  // Search media by filename
  searchMedia: async (query: string): Promise<ApiResponse<Media[]>> => {
    const response = await apiHelper.get<ApiResponse<Media[]>>(
      "/media/search",
      { params: { q: query } }
    );
    return response;
  },

  // Bulk upload multiple files
  uploadMultiple: async (
    files: File[],
    onProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<Media[]>> => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    const response = await apiHelper.post<ApiResponse<Media[]>>(
      "/media/upload-multiple",
      formData
    );
    return response;
  },
};
