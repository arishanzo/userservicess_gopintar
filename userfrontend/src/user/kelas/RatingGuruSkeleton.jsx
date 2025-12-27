const RatingGuruSkeleton = () => {
  return (
    <div className="min-w-[260px] bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-300" />

      <div className="p-4 space-y-3">
        {/* Teacher Name */}
        <div className="h-4 bg-gray-300 rounded w-3/4" />

        {/* Subject */}
        <div className="h-3 bg-gray-200 rounded w-1/2" />

        {/* Student */}
        <div className="h-3 bg-gray-200 rounded w-2/3" />

        {/* Comment */}
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
};

export default RatingGuruSkeleton;