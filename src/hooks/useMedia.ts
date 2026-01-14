// hooks/useMedia.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { mediaService } from "../services/mediaService";
import {
  ApiResponse,
  Media,
  MediaConnection,
  PaginatedResponse,
} from "../vite-env";

export const useMedia = (
  params?: { page?: number; limit?: number; search?: string },
  options?: UseQueryOptions<PaginatedResponse<Media>>
) => {
  return useQuery<PaginatedResponse<Media>>({
    queryKey: ["media", params],
    queryFn: () => mediaService.getMedia(params),
    ...options,
  });
};

export const useUploadMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => mediaService.uploadMedia(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
    onError: (error: any) => {
      console.error("Upload failed:", error);
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mediaService.deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};

export const useUpdateMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Media> }) =>
      mediaService.updateMedia(id, data),
    onSuccess: (response, variables) => {
      // Update the specific media in cache
      queryClient.setQueryData<PaginatedResponse<Media>>(["media"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((media: Media) =>
            media.id === variables.id ? { ...media, ...response.data } : media
          ),
        };
      });
    },
  });
};

export const useMediaConnections = (mediaId: string) => {
  return useQuery<ApiResponse<MediaConnection[]>>({
    queryKey: ["media-connections", mediaId],
    queryFn: () => mediaService.getConnections(mediaId),
    enabled: !!mediaId,
  });
};

export const useConnectMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mediaService.connectMedia,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["media-connections", variables.mediaId],
      });
    },
  });
};

export const useDisconnectMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mediaService.disconnectMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media-connections"] });
    },
  });
};

export const useSearchMedia = () => {
  return useMutation({
    mutationFn: (query: string) => mediaService.searchMedia(query),
  });
};
