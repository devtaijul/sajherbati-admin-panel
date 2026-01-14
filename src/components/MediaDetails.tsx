import React, { useState } from "react";
import { Media } from "../vite-env";
import { useUpdateMedia } from "../hooks/useMedia";

interface MediaDetailsProps {
  media: Media;
  onUpdate: () => void;
}

const MediaDetails: React.FC<MediaDetailsProps> = ({ media, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    altText: media.altText || "",
    caption: media.caption || "",
    filename: media.filename,
  });
  const updateMutation = useUpdateMedia();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // MediaDetails.tsx-এ handleSave function আপডেট করুন
  const handleSave = async () => {
    try {
      const response = await updateMutation.mutateAsync({
        id: media.id,
        data: {
          altText: formData.altText,
          caption: formData.caption,
        },
      });

      if (response.success) {
        setIsEditing(false);
        onUpdate();
        // You can add a success toast here
        alert("Media updated successfully!");
      } else {
        alert(response.message || "Failed to update media");
      }
    } catch (error: any) {
      console.error("Failed to update media:", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(media.url);
    // You can add a toast notification here
    alert("URL copied to clipboard!");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = media.url;
    link.download = media.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return (
        <svg
          className="w-6 h-6 text-blue-500"
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
      );
    } else if (mimeType.startsWith("video/")) {
      return (
        <svg
          className="w-6 h-6 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (mimeType.includes("pdf")) {
      return (
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    }
  };

  const isImage = media.mimeType.startsWith("image/");

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Media Details</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Media Preview */}
        <div className="mb-6">
          {isImage ? (
            <div className="relative overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={media.url}
                alt={media.altText || media.filename}
                className="object-contain w-full h-64"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-sm font-medium text-white truncate">
                  {media.filename}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
              <div className="mb-4">{getFileIcon(media.mimeType)}</div>
              <p className="font-medium text-center text-gray-700">
                {media.filename}
              </p>
              <p className="mt-1 text-sm text-gray-500">{media.mimeType}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={handleCopyUrl}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy URL
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>
        </div>

        {/* Media Information */}
        <div className="space-y-4">
          {/* File Information */}
          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="mb-3 font-medium text-gray-700">File Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Filename:</span>
                <span className="font-medium">{media.filename}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">File Type:</span>
                <span className="font-medium">{media.mimeType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">File Size:</span>
                <span className="font-medium">
                  {formatFileSize(media.size)}
                </span>
              </div>
              {isImage && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium">
                    {media.dimensions.width} × {media.dimensions.height}px
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Uploaded:</span>
                <span className="font-medium">
                  {new Date(media.createdAt).toLocaleDateString()} at{" "}
                  {new Date(media.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* SEO & Description */}
          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="mb-3 font-medium text-gray-700">
              SEO & Description
            </h4>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Alternative Text
                  </label>
                  <input
                    type="text"
                    name="altText"
                    value={formData.altText}
                    onChange={handleInputChange}
                    placeholder="Describe the media for screen readers"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Used for accessibility and when image cannot be displayed.
                  </p>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Caption
                  </label>
                  <textarea
                    name="caption"
                    value={formData.caption}
                    onChange={handleInputChange}
                    placeholder="Optional caption for the media"
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        altText: media.altText || "",
                        caption: media.caption || "",
                        filename: media.filename,
                      });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-sm text-gray-600">Alternative Text</p>
                  <p
                    className={`font-medium ${
                      !media.altText ? "text-gray-400 italic" : "text-gray-800"
                    }`}
                  >
                    {media.altText || "No alt text provided"}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">Caption</p>
                  <p
                    className={`font-medium ${
                      !media.caption ? "text-gray-400 italic" : "text-gray-800"
                    }`}
                  >
                    {media.caption || "No caption provided"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Direct URL */}
          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="mb-2 font-medium text-gray-700">Direct URL</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={media.url}
                readOnly
                className="flex-1 px-3 py-2 font-mono text-sm text-gray-600 truncate bg-white border rounded-lg"
              />
              <button
                onClick={handleCopyUrl}
                className="px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                title="Copy URL"
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Media ID & Quick Actions */}
          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="mb-3 font-medium text-gray-700">Quick Actions</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Media ID:</span>
                <code className="px-2 py-1 font-mono text-sm bg-gray-200 rounded">
                  {media.id}
                </code>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => window.open(media.url, "_blank")}
                  className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open in New Tab
                </button>
                {isImage && (
                  <button
                    onClick={() => {
                      const img = new Image();
                      img.src = media.url;
                      const newWindow = window.open("");
                      newWindow?.document.write(img.outerHTML);
                    }}
                    className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    View Full Size
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
