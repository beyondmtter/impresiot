import React from 'react';
import { Skeleton } from '../ui/skeleton';

const TicketCardSkeleton = () => {
  return (
    <div className="relative bg-[#070707] w-[20rem] flex flex-col text-white overflow-hidden rounded-[8px] p-4 mx-auto">
      {/* Image Section */}
      <div className="mb-4">
        <Skeleton className="h-[8rem] w-full rounded-[8px]" />
      </div>

      {/* Confirmation Header */}
      <div className="mb-3">
        <Skeleton className="h-6 w-[12rem] rounded-[4px]" /> 
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col gap-3">
        {/* User Greeting */}
        <Skeleton className="w-[15rem] h-5 rounded-[4px]" /> 
        
        {/* Workshop Details */}
        <Skeleton className="w-[14rem] h-4 rounded-[4px]" /> 
        <Skeleton className="w-[14rem] h-4 rounded-[4px]" /> 

        {/* Additional Information */}
        <Skeleton className="w-[16rem] h-3 rounded-[4px]" /> 
      </div>

      {/* Footer Section */}
      <div className="mt-4">
        <Skeleton className="h-8 w-[10rem] mx-auto rounded-[8px]" />
      </div>
    </div>
  );
};

export default TicketCardSkeleton;
