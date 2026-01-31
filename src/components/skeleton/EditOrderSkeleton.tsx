const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded bg-gray-300 dark:bg-gray-700 ${className}`}
  />
);

const EditOrderSkeleton = () => {
  return (
    <div className="w-full dark:bg-blackPrimary bg-whiteSecondary">
      <div className="py-10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-8 border-b border-gray-800 sm:px-6 lg:px-8 max-sm:flex-col max-sm:gap-5">
          <SkeletonBox className="w-48 h-8" />
          <SkeletonBox className="w-48 h-10" />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-2 px-4 pt-8 pb-8 sm:px-6 lg:px-8 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
          {/* Left: Order information */}
          <div>
            <SkeletonBox className="w-56 h-6 mb-6" />

            <div className="flex flex-col gap-5">
              <SkeletonBox className="w-full h-12" />
              <SkeletonBox className="w-full h-12" />
              <SkeletonBox className="w-full h-24" />
              <SkeletonBox className="w-full h-24" />
              <SkeletonBox className="w-full h-12" />
            </div>
          </div>

          {/* Right: Products */}
          <div>
            <SkeletonBox className="w-56 h-6 mb-6" />

            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SkeletonBox className="w-12 h-12" />
                    <SkeletonBox className="w-32 h-4" />
                  </div>
                  <SkeletonBox className="w-20 h-4" />
                </div>
              ))}
            </div>

            {/* Total section */}
            <div className="mt-8">
              <SkeletonBox className="w-32 h-6 mb-4" />

              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <SkeletonBox className="w-32 h-4" />
                  <SkeletonBox className="w-10 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <SkeletonBox className="w-32 h-4" />
                  <SkeletonBox className="w-24 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderSkeleton;
