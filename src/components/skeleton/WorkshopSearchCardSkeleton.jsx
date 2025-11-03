import React from 'react';
import { Skeleton } from '../ui/skeleton';

const WorkshopSearchCardSkeleton = () => {
    return (
        <div className="relative bg-[#070707] w-full max-w-[35rem] flex flex-col sm:flex-row text-white overflow-hidden rounded-[8px]">
            {/* Image Section */}
            <div className="w-full sm:w-[18rem] p-2">
                <Skeleton className="h-[9rem] w-full sm:w-[16rem] rounded-[8px]" />
            </div>

            {/* Content Section */}
            <div className="w-full sm:w-[18rem] p-2 flex flex-col justify-between">
                {/* Title and Details */}
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-[10rem] h-6" /> {/* Placeholder for title */}
                    <Skeleton className="w-[6rem] h-4" /> {/* Placeholder for subtitle */}
                    <Skeleton className="w-[8rem] h-4" /> {/* Placeholder for additional info */}
                </div>

                {/* Workshop Status */}
                <div className="flex justify-between items-center mt-4">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-[8rem] h-4" /> {/* Placeholder for 'Workshop Status' text */}
                        <Skeleton className="w-[6rem] h-5" /> {/* Placeholder for dynamic status text */}
                    </div>

                    {/* Join Button */}
                    <div className="relative">
                        <Skeleton className="w-[6rem] h-10 rounded-[10px]" /> {/* Placeholder for button */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopSearchCardSkeleton;
