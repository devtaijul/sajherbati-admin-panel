// components/SelectedMediaPreview.tsx
import React from "react";
import { useMedia } from "../hooks/useMedia";
import { Media } from "../vite-env";

interface SelectedMediaPreviewProps {
  selectedIds: string[];
  onRemove: (mediaId: string) => void;
  onClearAll?: () => void;
  maxDisplay?: number; // Maximum number of images to display
}

const SelectedMediaPreview: React.FC<SelectedMediaPreviewProps> = ({
  selectedIds,
  onRemove,
  onClearAll,
  maxDisplay = 5,
}) => {
  const { data: mediaData } = useMedia({ limit: 100 });

  // Filter selected media from all media
  const selectedMedia =
    mediaData?.data?.filter((media: Media) => selectedIds.includes(media.id)) ||
    [];

  // Display limited previews
  const displayedMedia = selectedMedia.slice(0, maxDisplay);
  const remainingCount = selectedMedia.length - maxDisplay;

  if (selectedMedia.length === 0) {
    return (
      <div className="p-4 text-center border-2 border-gray-300 border-dashed rounded-lg">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-500">No images selected</p>
        <p className="mt-1 text-sm text-gray-400">
          Select images from the media library
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selected Images Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {displayedMedia.map((media: Media) => (
          <div
            key={media.id}
            className="relative overflow-hidden bg-gray-100 border rounded-lg group aspect-square"
          >
            <img
              src={media.url}
              alt={media.altText || media.filename}
              className="object-cover w-full h-full"
            />

            {/* Remove Button */}
            <button
              onClick={() => onRemove(media.id)}
              className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100 hover:bg-red-600"
              title="Remove"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* File Info on Hover */}
            <div className="absolute inset-0 transition-all bg-black bg-opacity-0 group-hover:bg-opacity-40">
              <div className="absolute bottom-0 left-0 right-0 p-2 transition-transform transform translate-y-full bg-gradient-to-t from-black/80 to-transparent group-hover:translate-y-0">
                <p className="text-xs text-white truncate">{media.filename}</p>
                <p className="text-xs text-gray-300">
                  {(media.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Remaining Count Indicator */}
        {remainingCount > 0 && (
          <div className="relative flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg aspect-square bg-gray-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                +{remainingCount}
              </div>
              <div className="text-xs text-gray-500">more images</div>
            </div>
          </div>
        )}
      </div>

      {/* Summary & Actions */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">
              {selectedMedia.length} image
              {selectedMedia.length !== 1 ? "s" : ""} selected
            </span>
          </div>

          <div className="text-sm text-gray-600">
            Total size:{" "}
            {(
              selectedMedia.reduce(
                (acc: number, media: Media) => acc + media.size,
                0
              ) /
              1024 /
              1024
            ).toFixed(2)}{" "}
            MB
          </div>
        </div>

        <div className="flex gap-2">
          {onClearAll && (
            <button
              onClick={onClearAll}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => {
              // You can add a function to view all selected images
              console.log("View all selected:", selectedMedia);
            }}
            className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedMediaPreview;
