import React from 'react'
import { Skeleton } from '../ui/skeleton'

const BillCardSkeleton = () => {
    return (
        <>
            <div className='w-[45rem] border-[1px] border-neutral-900 p-2 px-4 rounded-[8px]'>
                {/* Accordion Section */}
                <div className="flex flex-col gap-2">
                    {/* Accordion Trigger Skeleton */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-[12rem] rounded-[4px]" />
                        <Skeleton className="h-4 w-[8rem] rounded-[4px]" />
                    </div>

                    {/* Accordion Content Skeleton */}
                    <div className="mt-[2rem] flex flex-col gap-4">
                        {/* Payment Info Section */}
                        <div className="flex justify-between">
                            <div className='flex gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <Skeleton className="h-4 w-[8rem] rounded-[4px]" />
                                    <Skeleton className="h-4 w-[6rem] rounded-[4px]" />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Skeleton className="h-4 w-[4rem] rounded-[4px]" />
                                    <Skeleton className="h-4 w-[5rem] rounded-[4px]" />
                                </div>
                            </div>

                            {/* Help Contact Skeleton */}
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-4 w-[10rem] rounded-[4px]" />
                                <Skeleton className="h-4 w-[8rem] rounded-[4px]" />
                            </div>
                        </div>

                        {/* Buttons Skeleton */}
                        <div className="flex gap-4 mt-4">
                            <Skeleton className="h-8 w-[6rem] rounded-[8px]" />
                            <Skeleton className="h-8 w-[6rem] rounded-[8px]" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillCardSkeleton
