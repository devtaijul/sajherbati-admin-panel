const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-md bg-gray-300 dark:bg-gray-700 ${className}`}
  />
);

const SkeletonInput = () => (
  <div className="flex flex-col gap-2">
    <SkeletonBox className="w-32 h-4" />
    <SkeletonBox className="w-full h-10" />
  </div>
);

const SkeletonSectionTitle = () => <SkeletonBox className="w-56 h-6 mb-4" />;

const ProductFormSkeleton = () => {
  return (
    <div className="flex h-auto border-t border-blackSecondary dark:bg-blackPrimary bg-whiteSecondary">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-700">
        <SkeletonBox className="w-full h-full" />
      </div>

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-gray-800">
          <SkeletonBox className="w-64 h-8" />
          <SkeletonBox className="w-40 h-10" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-10 pt-8 max-xl:grid-cols-1">
          {/* LEFT */}
          <div>
            <SkeletonSectionTitle />

            <div className="flex flex-col gap-5">
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </div>

            <SkeletonSectionTitle />
            <div className="grid grid-cols-2 gap-5">
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </div>

            <SkeletonSectionTitle />
            <div className="flex flex-col gap-5">
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </div>

            <SkeletonSectionTitle />
            <div className="flex flex-col gap-5">
              <SkeletonInput />
              <SkeletonInput />
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <SkeletonSectionTitle />

            <div className="flex flex-wrap gap-4 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBox key={i} className="h-32 rounded-lg w-36" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormSkeleton;
