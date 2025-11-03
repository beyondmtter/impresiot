import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProfileWorkshopCardSkeleton = () => {
    return (
        <div className="w-[18rem] max-w-md bg-zinc-900 rounded-lg">
            {/* Image Section Skeleton */}
            <Skeleton className="w-full h-48" />

            <div className="flex flex-col gap-2 p-4">
                {/* Workshop Title Skeleton */}
                <Skeleton className="w-[14rem] h-5 rounded-md" />

                {/* Date and Time Info Skeleton */}
                <div className="flex gap-1 items-center">
                    <Skeleton className="w-[6rem] h-4 rounded-md" /> {/* Date */}
                    <Skeleton className="w-[8rem] h-4 rounded-md" /> {/* Workshop Status */}
                </div>

                {/* Price and Deadline Info Skeleton */}
                <div className="flex justify-between items-center mt-2">
                    <Skeleton className="w-[4rem] h-5 rounded-md" /> {/* Price */}
                    <Skeleton className="w-[8rem] h-6 rounded-[10px]" /> {/* Time Left/Status */}
                </div>
            </div>
        </div>
    );
};

export default ProfileWorkshopCardSkeleton;
