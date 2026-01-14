import React from "react";
import { Media } from "../vite-env";

interface MediaGridProps {
  media: Media[];
  view: "grid" | "list";
  onSelect: (media: Media) => void;
  selectedId?: string;
  onDelete: (id: string) => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  media,
  view,
  onSelect,
  selectedId,
  onDelete,
}) => {
  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  if (view === "grid") {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {media.map((item) => (
          <div
            key={item.id}
            className={`relative group border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
              selectedId === item.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => onSelect(item)}
          >
            {isImage(item.mimeType) ? (
              <img
                src={item.url}
                alt={item.altText || item.filename}
                className="object-cover w-full h-48"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-48 bg-gray-100">
                <svg
                  className="w-12 h-12 text-gray-400"
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
              </div>
            )}

            <div className="p-2">
              <p className="text-sm font-medium truncate">{item.filename}</p>
              <p className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100"
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
          </div>
        ))}
      </div>
    );
  }

  // List View
  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Preview
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Filename
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Size
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {media.map((item) => (
            <tr
              key={item.id}
              className={`hover:bg-gray-50 cursor-pointer ${
                selectedId === item.id ? "bg-blue-50" : ""
              }`}
              onClick={() => onSelect(item)}
            >
              <td className="px-6 py-4">
                {isImage(item.mimeType) ? (
                  <img
                    src={item.url}
                    alt={item.altText || item.filename}
                    className="object-cover w-12 h-12 rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded">
                    <svg
                      className="w-6 h-6 text-gray-400"
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
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {item.filename}
                </div>
                <div className="text-sm text-gray-500">{item.mimeType}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {(item.size / 1024 / 1024).toFixed(2)} MB
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediaGrid;
