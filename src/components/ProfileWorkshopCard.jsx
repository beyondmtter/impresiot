import { getWorkshopStatus } from '@/helper/getWorkshopStatus';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProfileWorkshopCard = ({ workshop }) => {
    const {_id, title, startDate, time, price, thumbNail } = workshop;
    const router = useRouter()

    const deadlineDate = new Date(startDate);
    const timeLeft = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));

    return (
        <div className="w-[18rem] max-w-md bg-zinc-900 rounded-lg overflow-hidden shadow-lg" onClick={() => router.push(`/main/workshop/${_id}`)}>
            {/* Image Section */}
            <Image
                src={thumbNail}
                alt="Workshop Thumbnail"
                width={400}
                height={500}
                className="w-full h-48 object-cover bg-gray-500"
            />
            <div className="flex flex-col gap-2 p-4">
                {/* Workshop Title */}
                <h2 className="text-white text-md font-medium leading-tight">{title.slice(0,30)}..</h2>

                {/* Date and Time Info */}
                <div className="flex gap-1">
                    <span className="text-sm">{new Date(startDate).toDateString()}</span>
                    .
                    <span className="text-sm">{getWorkshopStatus(startDate, time)}</span>
                </div>

                {/* Price and Deadline Info */}
                <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-white">Rs:{price}</span>
                    <button
                        onClick={() => router.push(`/main/workshop/${_id}`)}
                        className="text-white text-sm bg-red-400 rounded-[10px] px-4 py-1 font-medium"
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileWorkshopCard;
