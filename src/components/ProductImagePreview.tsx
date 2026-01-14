// components/ProductImagePreview.tsx
import React from "react";
import { Media } from "../vite-env";

interface ProductImagePreviewProps {
  featuredImage?: Media;
  galleryImages: Media[];
  onRemoveGalleryImage: (mediaId: string) => void;
  onSetFeatured: (mediaId: string) => void;
}

const ProductImagePreview: React.FC<ProductImagePreviewProps> = ({
  featuredImage,
  galleryImages,
  onRemoveGalleryImage,
  onSetFeatured,
}) => {
  return (
    <div className="space-y-6">
      {/* Featured Image Preview */}
      {featuredImage && (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={featuredImage.url}
                alt={featuredImage.altText || "Featured"}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                  Featured Image
                </span>
                <span className="text-sm text-gray-500">
                  {featuredImage.dimensions.width}×
                  {featuredImage.dimensions.height}
                </span>
              </div>
              <p className="font-medium">{featuredImage.filename}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => window.open(featuredImage.url, "_blank")}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View Full Size
                </button>
                <button
                  onClick={() => onRemoveGalleryImage(featuredImage.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Images */}
      {galleryImages.length > 0 && (
        <div>
          <h3 className="mb-3 font-medium">
            Gallery Images ({galleryImages.length})
          </h3>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {galleryImages.map((media, index) => (
              <div
                key={media.id}
                className="relative overflow-hidden border rounded-lg group aspect-square"
              >
                <img
                  src={media.url}
                  alt={media.altText || `Gallery ${index + 1}`}
                  className="object-cover w-full h-full"
                />

                <div className="absolute inset-0 transition-all bg-black bg-opacity-0 group-hover:bg-opacity-40">
                  <div className="absolute flex justify-between transition-opacity opacity-0 bottom-2 left-2 right-2 group-hover:opacity-100">
                    <button
                      onClick={() => onSetFeatured(media.id)}
                      className="px-2 py-1 text-xs text-gray-800 bg-white rounded hover:bg-gray-100"
                    >
                      Set Featured
                    </button>
                    <button
                      onClick={() => onRemoveGalleryImage(media.id)}
                      className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Image number badge */}
                <div className="absolute px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded top-2 left-2">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImagePreview;
