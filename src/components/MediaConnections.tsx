import React, { useState } from "react";
import {
  useMediaConnections,
  useDisconnectMedia,
  useConnectMedia,
} from "../hooks/useMedia";
import { MediaConnection } from "../vite-env";

interface MediaConnectionsProps {
  mediaId: string;
}

const MediaConnections: React.FC<MediaConnectionsProps> = ({ mediaId }) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { data: connections, isLoading } = useMediaConnections(mediaId);
  const disconnectMutation = useDisconnectMedia();

  const handleDisconnect = async (connectionId: string) => {
    if (window.confirm("Are you sure you want to disconnect this media?")) {
      await disconnectMutation.mutateAsync(connectionId);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-3/4 h-4 mb-4 bg-gray-200 rounded"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">Connections</h3>
        <button
          onClick={() => setShowConnectModal(true)}
          className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
        >
          Connect
        </button>
      </div>

      {connections?.length === 0 ? (
        <p className="text-sm text-gray-500">No connections yet</p>
      ) : (
        <div className="space-y-3">
          {connections?.map((connection: MediaConnection) => (
            <div
              key={connection.id}
              className="flex items-center justify-between p-3 rounded bg-gray-50"
            >
              <div>
                <div className="font-medium">
                  {connection.connectedTo.charAt(0).toUpperCase() +
                    connection.connectedTo.slice(1)}
                  : {connection.connectedId}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {connection.connectionType}
                </div>
              </div>
              <button
                onClick={() => handleDisconnect(connection.id)}
                className="p-1 text-red-600 hover:text-red-800"
                title="Disconnect"
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
      )}

      {/* Connect Modal */}
      {showConnectModal && (
        <ConnectModal
          mediaId={mediaId}
          onClose={() => setShowConnectModal(false)}
          existingConnections={connections || []}
        />
      )}
    </div>
  );
};

// Connect Modal Component
const ConnectModal: React.FC<{
  mediaId: string;
  onClose: () => void;
  existingConnections: MediaConnection[];
}> = ({ mediaId, onClose, existingConnections }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("product");
  const [connectionType, setConnectionType] = useState("thumbnail");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const connectMutation = useConnectMedia();

  const handleSearch = async () => {
    // এখানে আপনার API কল করতে হবে entities সার্চ করার জন্য
    // উদাহরণ:
    // const results = await entityService.searchEntities(selectedType, searchQuery);
    // setSearchResults(results);
  };

  const handleConnect = async (entityId: string) => {
    await connectMutation.mutateAsync({
      mediaId,
      connectedTo: selectedType,
      connectedId: entityId,
      connectionType,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Connect Media</h3>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Connect to
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="product">Product</option>
              <option value="category">Category</option>
              <option value="page">Page</option>
              <option value="post">Blog Post</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Connection Type
            </label>
            <select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="thumbnail">Thumbnail</option>
              <option value="featured">Featured Image</option>
              <option value="gallery">Gallery</option>
              <option value="banner">Banner</option>
              <option value="logo">Logo</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Search {selectedType}s
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder={`Search ${selectedType}...`}
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg"
              >
                Search
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="overflow-y-auto border rounded-lg max-h-60">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 border-b hover:bg-gray-50"
                >
                  <div>
                    <div className="font-medium">
                      {result.name || result.title}
                    </div>
                    <div className="text-sm text-gray-500">ID: {result.id}</div>
                  </div>
                  <button
                    onClick={() => handleConnect(result.id)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                    disabled={existingConnections.some(
                      (c) =>
                        c.connectedId === result.id &&
                        c.connectionType === connectionType
                    )}
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaConnections;
