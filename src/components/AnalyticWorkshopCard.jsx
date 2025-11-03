import Image from 'next/image'
import React from 'react'
import {  Forward, Heart, UsersRound } from 'lucide-react'

const AnalyticWorkshopCard = ({ workshop, creator }) => {
    return (
        <div>
            <div className='bg-[#0E0E0E] w-[24rem] sm:w-[35rem] h-[8rem] flex justify-between'>
                <div className='p-2 pl-4'>
                    <div className='flex flex-col'>
                        <span className='text-[1rem] text-white font-medium'>{workshop.workshopDetails.title.slice(0, 30)}</span>
                        <span className=' text-[.9rem] text-neutral-600'>{creator}</span>
                    </div>
                    <div className='flex gap-4 mt-4'>
                        <div className='flex flex-col items-center gap-1'>
                            <UsersRound size={18} />
                            <span className='text-[.8rem] text-neutral-600'>{workshop.ticketCount}</span>
                        </div>
                        {/* <div className='flex flex-col items-center gap-1'>
                            <Heart size={18} />
                            <span className='text-[.8rem] text-neutral-600'>2.1k</span>
                        </div> */}
                        {/* <div className='flex flex-col items-center gap-1'>
                            <Forward size={18} />
                            <span className='text-[.8rem] text-neutral-600'>2.1k</span>
                        </div> */}
                    </div>
                </div>
                <Image
                    width={500}
                    height={400}
                    src={workshop.workshopDetails.thumbNail}
                    alt={workshop.workshopDetails.title}
                    className='bg-white h-[8rem] w-[10rem] object-cover sm:w-[15rem]' />
            </div>
        </div>
    )
}

export default AnalyticWorkshopCard