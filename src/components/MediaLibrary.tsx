import React, { useState } from "react";
import { useMedia, useUploadMedia, useDeleteMedia } from "../hooks/useMedia";

import MediaGrid from "./MediaGrid";
import MediaConnections from "./MediaConnections";
import MediaUpload from "./MediaUpload";
import { Media } from "../vite-env";
import MediaDetails from "./MediaDetails";

const MediaLibrary: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const {
    data: mediaData,
    isLoading,
    refetch,
  } = useMedia({
    search: searchTerm,
    limit: 50,
  });
  console.log("mediadata", mediaData);

  const uploadMutation = useUploadMedia();
  const deleteMutation = useDeleteMedia();

  const handleUpload = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      await uploadMutation.mutateAsync(files[i]);
    }
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      await deleteMutation.mutateAsync(id);
      if (selectedMedia?.id === id) {
        setSelectedMedia(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Media Library</h1>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <span>Add New</span>
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search media..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded-lg ${
              view === "grid" ? "bg-blue-100 text-blue-600" : "bg-gray-100"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg ${
              view === "list" ? "bg-blue-100 text-blue-600" : "bg-gray-100"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Media Grid/List */}
        <div className="lg:col-span-2">
          <MediaGrid
            media={mediaData?.data || []}
            view={view}
            onSelect={setSelectedMedia}
            selectedId={selectedMedia?.id}
            onDelete={handleDelete}
          />
        </div>

        {/* Sidebar - Details & Connections */}
        <div className="space-y-6">
          {selectedMedia ? (
            <>
              <MediaDetails media={selectedMedia} onUpdate={() => refetch()} />
              <MediaConnections mediaId={selectedMedia.id} />
            </>
          ) : (
            <div className="p-6 text-center rounded-lg bg-gray-50">
              <svg
                className="w-12 h-12 mx-auto text-gray-400"
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
              <p className="mt-2 text-gray-600">
                Select a media to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <MediaUpload
          onUpload={handleUpload}
          onClose={() => setShowUpload(false)}
          isUploading={uploadMutation.isPending}
        />
      )}
    </div>
  );
};

export default MediaLibrary;
