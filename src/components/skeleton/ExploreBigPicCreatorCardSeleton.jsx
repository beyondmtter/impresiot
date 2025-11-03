import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ExploreBigPicCreatorCardSeleton = () => {
  return (
    <>
    <div  className="w-[10rem] max-w-md rounded-lg overflow-hidden shadow-lg">
                <div className="">
                    <Skeleton
                        className="w-full h-[10rem]"
                    />
                </div>
                <div className="flex justify-between gap-2 p-2">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="w-[3rem] h-2"/>
                        <Skeleton className="w-[2rem] h-2"/>
                    </div>
                    {/* <Heart size={15}/> */}
                </div>
            </div>
    </>
  )
}

export default ExploreBigPicCreatorCardSeleton