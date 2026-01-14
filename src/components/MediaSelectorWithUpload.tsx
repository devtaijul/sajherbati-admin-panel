// components/MediaSelectorWithUpload.tsx
import React, { useState, useRef } from "react";
import { useUploadMedia } from "../hooks/useMedia";

interface MediaSelectorWithUploadProps {
  onFileSelect: (files: FileList) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
}

const MediaSelectorWithUpload: React.FC<MediaSelectorWithUploadProps> = ({
  onFileSelect,
  multiple = true,
  accept = "image/*",
  maxSize = 10,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadMedia();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError("");

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;

      // Validate file size
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize * 1024 * 1024) {
          setError(
            `File ${files[i].name} exceeds maximum size of ${maxSize}MB`
          );
          return;
        }
      }

      // Upload to media library
      for (let i = 0; i < files.length; i++) {
        try {
          await uploadMutation.mutateAsync(files[i]);
          setUploadProgress(((i + 1) / files.length) * 100);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }

      // Callback with files
      onFileSelect(files);

      // Reset progress
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      onFileSelect(files);

      // Also upload to media library
      for (let i = 0; i < files.length; i++) {
        try {
          await uploadMutation.mutateAsync(files[i]);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Error Message */}

      {/* Media Library Button */}
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">or</p>
        <button
          type="button"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          onClick={() => {
            // Open media library modal
          }}
        >
          Select from Media Library
        </button>
      </div>
    </div>
  );
};

export default MediaSelectorWithUpload;
