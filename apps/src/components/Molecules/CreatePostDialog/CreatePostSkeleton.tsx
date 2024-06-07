import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CreatePostDialogSkeleton = () => {
  return (
    <div className="w-[645px] max-sm:w-[90%] max-sm:rounded-md p-4 border rounded-md">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">
          <Skeleton width={150} height={20} />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton width={300} height={20} />
        </div>
        <div className="flex flex-col gap-4 pt-6">
          <Skeleton height={40} />
          <Skeleton height={80} />
          <div className="w-full h-[250px] border rounded-md flex justify-center items-center">
            <Skeleton width={200} height={200} />
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton width={80} height={40} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostDialogSkeleton;
