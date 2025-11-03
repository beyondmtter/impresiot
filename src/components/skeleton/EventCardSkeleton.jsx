"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const EventCardSkeleton = () => {
  return (
    <div className="relative bg-gradient-to-br w-full max-w-[40rem] flex flex-col md:flex-row h-auto from-zinc-900 to-zinc-800 overflow-hidden">
      {/* Image Section Skeleton */}
      <div className="w-full h-[10rem] md:w-[18rem] md:h-auto order-1 md:order-2">
        <Skeleton className="w-full h-full object-cover rounded-t-lg md:rounded-t-none md:rounded-r-lg" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-zinc-900 to-transparent"></div>
      </div>

      {/* Content Section Skeleton */}
      <div className="w-full md:w-[22rem] p-4 order-2 md:order-1">
        <div className="px-4 md:px-6 pt-4 md:pt-6">
          <div className="flex justify-between items-start">
            <div>
              {/* Workshop Title Skeleton */}
              <Skeleton className="w-[10rem] sm:w-[12rem] md:w-[14rem] h-5 rounded-md mb-2" />
              {/* Creator Info Skeleton */}
              <Skeleton className="w-[8rem] sm:w-[10rem] h-4 rounded-md mb-1" />
              {/* Date Skeleton */}
              <Skeleton className="w-[6rem] sm:w-[8rem] h-3 rounded-md" />
            </div>
            {/* Dropdown Button Skeleton */}
            <Skeleton className="w-[2rem] h-[2rem] rounded-md" />
          </div>
        </div>
        <div className="flex justify-between px-4 md:px-6 pt-4">
          {/* Workshop Status Skeleton */}
          <div className="flex flex-col">
            <Skeleton className="w-[6rem] sm:w-[8rem] h-4 rounded-md mb-1" />
            <Skeleton className="w-[8rem] sm:w-[10rem] h-6 rounded-md" />
          </div>

          {/* Join Button Skeleton */}
          <Skeleton className="w-[5rem] sm:w-[6rem] h-[2rem] sm:h-[2.5rem] rounded-[10px]" />
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
