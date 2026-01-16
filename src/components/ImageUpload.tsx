// *********************
// Role of the component: The image upload component
// Name of the component: ImageUpload.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ImageUpload />
// Input parameters: No input parameters
// Output: The upload input component
// *********************

import MediaSelector from "./MediaSelector";

const ImageUpload = ({
  label = "Upload Image",
  selectedImageIds,
  multiple = false,
  maxSelection,
  showPreview,
  previewPosition,
  onSelect,
}: {
  label: string;
  selectedImageIds: string[];
  multiple?: boolean;
  maxSelection?: number;
  showPreview?: boolean;
  previewPosition?: "inside" | "outside";
  onSelect: (mediaIds: string[]) => void;
}) => {
  return (
    <div className="p-4 mb-8 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-wrap gap-4">
        {/* Option 1: Direct Upload */}

        {/* Option 2: Media Library */}
        <div className="flex-1 min-w-[300px]">
          <h3 className="mb-3 font-medium dark:text-white ">{label}</h3>
          <MediaSelector
            onSelect={onSelect}
            selectedMedia={selectedImageIds}
            multiple={multiple}
            maxSelection={maxSelection}
            showPreview={showPreview}
            previewPosition={previewPosition}
          />
        </div>
      </div>
    </div>
  );
};
export default ImageUpload;
