import React from 'react'
import { Skeleton } from '../ui/skeleton'

const UserSearchCardSkeleton = () => {
    return (
        <>
            <div className="flex items-center gap-4 justify-between w-[20rem] sm:w-[30rem] cursor-pointer">
                <div className="flex gap-3 items-center">
                    {/* Skeleton for Profile Picture */}
                    <Skeleton className="w-[3rem] h-[3rem] rounded-full" />

                    {/* Skeleton for User Info (Name and Email) */}
                    <div className="flex flex-col gap-1">
                        <Skeleton className="w-[8rem] h-4 rounded-md" /> {/* Placeholder for full name */}
                        <Skeleton className="w-[10rem] h-3 rounded-md" /> {/* Placeholder for email */}
                    </div>
                </div>

                {/* Skeleton for Followers Count */}
                <div>
                    <Skeleton className="px-4 py-3 w-[5rem] sm:w-[10rem] h-[2rem] rounded-[4px]" />
                </div>
            </div>
        </>
    )
}

export default UserSearchCardSkeleton
