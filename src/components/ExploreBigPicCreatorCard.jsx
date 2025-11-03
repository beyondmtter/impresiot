"use client"
import { Heart } from 'lucide-react'
import Image from 'next/image'
import nullAvatar from "../../public/nullAvatar.jpg"
import { useRouter } from 'next/navigation'
import React from 'react'

const ExploreBigPicCreatorCard = ({creator}) => {
    const router = useRouter()
    return (
        <>
            <div onClick={() => router.push(`/profile/${creator._id}`)} className="w-[10rem] max-w-md bg-black rounded-lg overflow-hidden shadow-lg">
                <div className="">
                    <Image
                        src={creator.profilePicture || nullAvatar}
                        width={500}
                        height={600}
                        alt={`Profile picture of ${creator.fullName}`}
                        className="w-full h-[10rem] object-cover bg-gray-500"
                    />
                </div>
                <div className="flex justify-between gap-2 p-2">
                    <div className="flex flex-col">
                        <span className=" text-white text-sm font-semibold">{creator.fullName}</span>
                        <span className="text-[.8rem] font-medium text-neutral-500">{creator.profession}</span>
                    </div>
                    {/* <Heart size={15}/> */}
                </div>
            </div>
        </>
    )
}

export default ExploreBigPicCreatorCard