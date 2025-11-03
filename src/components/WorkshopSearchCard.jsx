import { getWorkshopStatus } from '@/helper/getWorkshopStatus'
import { setQuery } from '@/redux/searchSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const WorkshopSearchCard = ({ workshop }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const {
        _id,
        creatorId,
        title,
        thumbNail,
        startDate,
        isSellingClosed,
        time,
        creator
    } = workshop;

    const formattedDate = new Date(startDate).toLocaleDateString();

    return (
        <>
            <div className="relative bg-[#070707] w-full max-w-[35rem] flex flex-col md:flex-row text-white overflow-hidden rounded-[8px]">
                {/* Image Section */}
                <div className="w-full md:w-[18rem] relative p-2 flex justify-center">
                    <Image
                        width={300}
                        height={176}
                        src={thumbNail || "/default-thumbnail.jpg"}
                        alt={title}
                        className="object-cover h-[9rem] w-[16rem] bg-white overflow-hidden rounded-[8px]"
                    />
                </div>
                {/* Content Section */}
                <div className="w-full md:w-[18rem] p-2">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[.9rem] font-medium leading-tight">
                                {title.slice(0, 30) || "Untitled Workshop"}
                            </h2>
                            <p className="text-[.8rem] text-zinc-400">
                                Creator - {creator.fullName}
                            </p>
                            <p className="text-[.8rem] text-gray-400">Date - {formattedDate}</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium">Workshop Status</span>
                            <span className="text-[1.2rem] font-bold text-gray-500">
                                {getWorkshopStatus(startDate, time)}
                            </span>
                        </div>

                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={() => {
                                    router.push(`/main/workshop/${_id}`)
                                    dispatch(setQuery(""))
                                }}
                                className="w-full md:w-[6rem] text-center bg-red-500 hover:bg-red-600 text-white active:scale-95 duration-100 transition-all font-semibold text-sm py-2 rounded-[10px]"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkshopSearchCard
