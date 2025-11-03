"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ChevronLeft } from "lucide-react";
import useScreenWidth from "@/hooks/useScreenWidth";

const WorkshopPageSkeleton = () => {
  const screenWidth = useScreenWidth()
  return (
    <>
      {/* Main Container for Workshop Page Layout Skeleton */}
      <div className={`${screenWidth > 1024 && "ml-[20rem]"} flex-col sm:flex-row m-auto mt-[4rem] flex gap-2 w-[24rem] sm:w-[46rem] md:w-[48rem]`}>
        {/* Left Sidebar Section Skeleton */}
        <div className="bg-neutral-900 p-4 w-[22rem] flex flex-col gap-3 rounded-[8px]">
          {/* Back Button Skeleton */}
          <div className="active:scale-95 duration-100 transition-all">
            <Skeleton className="w-[2rem] h-[2rem] rounded-md" />
          </div>

          {/* Workshop Image Skeleton */}
          <div>
            <div className="bg-black rounded-[10px] h-[12rem]">
              <Skeleton className="w-full h-full rounded-[10px]" />
            </div>
          </div>

          {/* Workshop Title Skeleton */}
          <Skeleton className="w-[16rem] h-5 rounded-md mb-2" />

          {/* Organizer Info Skeleton */}
          <Skeleton className="w-[10rem] h-4 rounded-md mb-1" />

          {/* Date and Time Info Skeleton */}
          <div className="flex gap-1">
            <Skeleton className="w-[8rem] h-3 rounded-md" />
            <Skeleton className="w-[5rem] h-3 rounded-md" />
          </div>

          {/* Language and Duration Details Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="w-[6rem] h-3 rounded-md" />
            <Skeleton className="w-[6rem] h-3 rounded-md" />
          </div>

          {/* Buy Now Button Skeleton */}
          <Skeleton className="w-full h-[2.5rem] rounded-[8px]" />

          {/* Instructor Section Skeleton */}
          <div className="flex flex-col gap-3">
            <Skeleton className="w-[10rem] h-5 rounded-md mb-2" />
            <div className="flex gap-2">
              <Skeleton className="w-[4rem] h-[4rem] rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="w-[8rem] h-4 rounded-md" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="w-[1rem] h-[1rem] rounded-full" />
                  ))}
                </div>
                <Skeleton className="w-[12rem] h-3 rounded-md" />
              </div>
            </div>
            <Skeleton className="w-full h-[2.5rem] rounded-[8px]" />
          </div>
        </div>

        {/* Right Sidebar Section Skeleton */}
        <div className="p-4 w-[24rem] bg-black flex flex-col gap-4">
          {/* Workshop Description Skeleton */}
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[10rem] h-5 rounded-md mb-2" />
            <Skeleton className="w-full h-[5rem] rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkshopPageSkeleton;
