// components/MediaSelector.tsx (Updated)
import React, { useRef, useState } from "react";
import { useMedia, useUploadMedia } from "../hooks/useMedia";
import { Media } from "../vite-env";
import SelectedMediaPreview from "./SelectedMediaPreview";

interface MediaSelectorProps {
  onSelect: (mediaIds: string[]) => void;
  selectedMedia?: string[];
  multiple?: boolean;
  maxSelection?: number;
  showPreview?: boolean; // নতুন prop: preview দেখাবে কিনা
  previewPosition?: "inside" | "outside"; // preview কোথায় দেখাবে
}

const MediaSelector: React.FC<MediaSelectorProps> = ({
  onSelect,
  selectedMedia = [],
  multiple = true,
  maxSelection = 10,
  showPreview = true,
  previewPosition = "outside", // Default: modal-এর বাইরে
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedMedia);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: mediaData,
    isLoading,
    refetch,
  } = useMedia({
    search: searchTerm,
    limit: 30,
  });

  const uploadMutation = useUploadMedia();

  // Handle media selection
  const handleSelect = (mediaId: string) => {
    let newSelectedIds: string[];

    if (multiple) {
      if (selectedIds.includes(mediaId)) {
        // Deselect
        newSelectedIds = selectedIds.filter((id) => id !== mediaId);
      } else {
        // Select - check max limit
        if (selectedIds.length >= maxSelection) {
          alert(`Maximum ${maxSelection} images can be selected`);
          return;
        }
        newSelectedIds = [...selectedIds, mediaId];
      }
    } else {
      newSelectedIds = [mediaId];
    }

    setSelectedIds(newSelectedIds);
    onSelect(newSelectedIds);
  };

  // Handle remove from preview
  const handleRemoveMedia = (mediaId: string) => {
    const newSelectedIds = selectedIds.filter((id) => id !== mediaId);
    setSelectedIds(newSelectedIds);
    onSelect(newSelectedIds);
  };

  // Handle clear all
  const handleClearAll = () => {
    setSelectedIds([]);
    onSelect([]);
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      try {
        await uploadMutation.mutateAsync(files[i]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

    await refetch();
    setUploading(false);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length > 0) {
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        try {
          await uploadMutation.mutateAsync(files[i]);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }

      await refetch();
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected Media Preview (Outside Modal) */}
      {showPreview && previewPosition === "outside" && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium dark:text-white">Selected Images</h3>
            {selectedIds.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear All
              </button>
            )}
          </div>
          <SelectedMediaPreview
            selectedIds={selectedIds}
            onRemove={handleRemoveMedia}
          />
        </div>
      )}

      {/* Trigger Button */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <svg
            className="w-5 h-5"
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
          {selectedIds.length > 0 ? "Edit Selection" : "Select Images"}
        </button>

        {selectedIds.length > 0 && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">{selectedIds.length}</span> image
            {selectedIds.length !== 1 ? "s" : ""} selected
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Media Library
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {multiple
                      ? `Select up to ${maxSelection} images`
                      : "Select one image"}
                  </span>
                  {selectedIds.length > 0 && (
                    <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                      {selectedIds.length} selected
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
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
            </div>

            {/* Search and Upload Bar */}
            <div className="flex gap-4 px-6 py-4 border-b dark:border-gray-700">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search media..."
                  className="w-full px-4 py-2 text-gray-800 bg-white border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Selected Media Preview (Inside Modal) */}
            {showPreview &&
              previewPosition === "inside" &&
              selectedIds.length > 0 && (
                <div className="px-6 py-3 border-b dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
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
                      <span className="font-medium">Selected Images</span>
                    </div>
                    <button
                      onClick={handleClearAll}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex gap-2 pb-2 overflow-x-auto">
                    {selectedIds.slice(0, 8).map((id, index) => {
                      const media = mediaData?.data?.find(
                        (m: Media) => m.id === id,
                      );
                      return media ? (
                        <div key={id} className="relative flex-shrink-0">
                          <div className="w-16 h-16 overflow-hidden border-2 border-blue-500 rounded">
                            <img
                              src={media.url}
                              alt={media.filename}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveMedia(id)}
                            className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1 hover:bg-red-600"
                          >
                            ×
                          </button>
                          {index === 7 && selectedIds.length > 8 && (
                            <div className="absolute inset-0 flex items-center justify-center rounded bg-black/60">
                              <span className="text-sm font-bold text-white">
                                +{selectedIds.length - 8}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

            {/* Media Grid */}
            <div
              className={`flex-1 p-6 overflow-y-auto ${
                isLoading ? "flex items-center justify-center" : ""
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {isLoading ? (
                <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                  {mediaData?.data?.map((media: Media) => (
                    <div
                      key={media.id}
                      className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedIds.includes(media.id)
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
                      }`}
                      onClick={() => handleSelect(media.id)}
                    >
                      <div className="bg-gray-100 aspect-square dark:bg-gray-700">
                        <img
                          src={media.url}
                          alt={media.altText || media.filename}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>

                      {/* Selection Indicator */}
                      {selectedIds.includes(media.id) && (
                        <div className="absolute p-1 text-white bg-blue-500 rounded-full top-2 right-2">
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Filename */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-white truncate">
                          {media.filename}
                        </p>
                        <p className="text-xs text-gray-300">
                          {(media.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {selectedIds.length} image{selectedIds.length !== 1 ? "s" : ""}{" "}
                selected • Total size:{" "}
                {/* {(
                  mediaData?.data
                    ?.filter((m: Media) => selectedIds.includes(m.id))
                    .reduce(
                      (acc: number, media: Media) => acc + media.size,
                      0,
                    ) /
                  1024 /
                  1024
                ).toFixed(2)}{" "}
                MB */}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  disabled={selectedIds.length === 0}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Insert Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSelector;
