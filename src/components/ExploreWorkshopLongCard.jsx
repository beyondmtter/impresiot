"use client"
import React from 'react'
import event from "../../public/eventest.jpg";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ExploreWorkshopLongCard = () => {
    const router = useRouter()
    return (
        <>
            <div className=" w-[64rem] rounded-[10px] relative bg-gradient-to-br flex justify-between from-zinc-900 to-zinc-800 text-white overflow-hidden">

                {/* Image Section */}
                <div className="w-[18rem] relative">
                    <Image width={400} height={500} alt="workshop ThumbNail" src={event} className="object-cover w-full h-full overflow-hidden rounded-[8px]" />
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-zinc-900  to-transparent"></div> */}
                </div>
                {/* Content Section */}
                <div className="w-[34rem] p-4 flex flex-col justify-center">
                    <div>
                        <div className="space-y-1">
                            <h2 className="text-[1rem] font-bold leading-tight">How To Get 10k Followers On Instagram Per Week</h2>
                            <p className="text-sm text-zinc-400">Paul Dance Academy</p>
                        </div>
                    </div>
                    <div className="flex justify-between gap-[6rem] mt-4">
                        <div className="flex flex-col">
                            <span className="text-[1rem] text-gray-500">Ongoing Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, consectetur. Alias repellat itaque voluptas doloremque ipsum assumenda dolor, minus, dolorem numquam</span>
                        </div>

                    </div>
                </div>
                <div className='p-4 flex flex-col justify-between'>
                    <div className="flex flex-col items-end gap-1">
                        <button onClick={() => router.push("/main/workshop/123")} className="w-[6rem] text-center bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-2 rounded-[10px] active:scale-95 duration-100 transition-all">
                            Join
                        </button>
                        <span className='text-white text-[.8rem]'>4 days left</span>
                    </div>
                    <div className="flex flex-col justify-between items-end mt-2">
                        <div>
                            <span className="text-gray-300 text-sm line-through">$450</span>
                        </div>
            \            <div className='flex items-center gap-2'>
                        <div variant="outline" className="text-black text-[.7rem] bg-[#73CD00] rounded-[8px] px-2 py-1 font-bold">
                            -20%
                        </div>
                        <span className="text-lg font-bold text-white">$389</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExploreWorkshopLongCard