import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center border rounded-md w-[663px] max-sm:w-[345px]">
      <div className="card w-[663px] max-sm:w-[300px] h-[100%] flex justify-center items-center rounded-md">
        <div className="card-items w-[630px] max-sm:w-[300px] flex flex-col gap-2 justify-between">
          <div className="card-header flex flex-row justify-between mt-4">
            <div className="profile flex flex-row gap-2">
              <Skeleton circle={true} height={42} width={42} />
              <div className="Name&Time">
                <Skeleton width={100} height={20} />
                <div className="flex flex-row gap-1">
                  <Skeleton width={80} height={15} />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[20px] items-center gap-1">
              <Skeleton width={20} height={20} />
            </div>
          </div>
          <div className="card-content flex flex-col gap-2">
            <div className="mt-1 title">
              <Skeleton width="80%" height={24} />
            </div>
            <Skeleton count={3} width="100%" />
            <Skeleton height={320} width="100%" />
          </div>
          <div className="card-footer flex flex-col justify-center items-start gap-2 mb-3">
            <div className="card-items-footer w-[100%] flex flex-row justify-between items-center">
              <div className="flex flex-row justify-between items-center gap-6">
                <Skeleton width={30} height={30} />
                <Skeleton width={30} height={30} />
              </div>
              <Skeleton width={70} height={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;