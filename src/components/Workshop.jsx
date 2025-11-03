import { getWorkshopStatus } from '@/helper/getWorkshopStatus'
import { setQuery } from '@/redux/searchSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const Workshop = ({ workshop }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const {
        _id,
        title,
        thumbNail,
        startDate,
        time,
        creator
    } = workshop;

    const formattedDate = new Date(startDate).toLocaleDateString();

    return (
        <div className="relative bg-[#070707] border-[1px] border-neutral-900 w-[22rem] lg:w-[20rem] flex flex-col text-white overflow-hidden rounded-[8px] p-4 gap-4">
            {/* Image Section */}
            <div className="flex justify-center">
                <Image
                    width={300}
                    height={176}
                    src={thumbNail || "/default-thumbnail.jpg"}
                    alt={title}
                    className="object-cover h-[12rem] w-full bg-white rounded-[8px]"
                />
            </div>
            
            {/* Content Section */}
            <div className="flex flex-col gap-2">
                <h2 className="text-[1rem] font-medium leading-tight truncate">
                    {title.slice(0, 30) || "Untitled Workshop"}
                </h2>
                <p className="text-[.9rem] text-zinc-400">
                    Creator - {creator?.fullName || "Anonymous"}
                </p>
                <p className="text-[.9rem] text-gray-400">Date - {formattedDate}</p>
                
                <div className="flex flex-col gap-2 mt-2">
                    <span className="text-sm font-medium">Workshop Status</span>
                    <span className="text-[1.2rem] font-bold text-gray-500">
                        {getWorkshopStatus(startDate, time)}
                    </span>
                </div>
                
                <button
                    onClick={() => {
                        router.push(`/main/workshop/${_id}`)
                        dispatch(setQuery(""))
                    }}
                    className="w-full text-center bg-red-500 hover:bg-red-600 text-white active:scale-95 duration-100 transition-all font-semibold text-sm py-2 rounded-[10px]"
                >
                    Join
                </button>
            </div>
        </div>
    )
}

export default Workshop
