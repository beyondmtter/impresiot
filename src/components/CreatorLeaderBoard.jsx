import Image from 'next/image';
import React from 'react';
import nullAvatar from "../../public/nullAvatar.jpg";

const CreatorLeaderBoard = ({ top5User, userRank }) => {
    return (
        <div className='bg-[#0E0E0E] w-[24rem] sm:w-[20rem] p-2 flex flex-col gap-1'>
            {/* First Row - 1st Place */}
            {top5User[0] && (
                <div className='flex gap-4 p-2 bg-[#141414]'>
                    <div className='w-[5rem] h-[5rem] bg-white'>
                        <Image
                            width={400}
                            height={400}
                            src={top5User[0]?.userData.profilePicture || nullAvatar}
                            alt={top5User[0]?.userData.fullName}
                            className="w-full h-full object-cover "
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-[1.4rem] font-bold'>1st</span>
                        <span className='text-[.9rem] text-neutral-500'>{top5User[0]?.userData.fullName}</span>
                    </div>
                </div>
            )}

            {/* Second and Third Row - 2nd and 3rd Places */}
            <div className='flex gap-2'>
                {top5User[1] && (
                    <div className='flex gap-4 p-2 bg-[#141414] w-[9.4rem]'>
                        <div className='w-[3rem] h-[3rem] bg-white'>
                            <Image
                                width={400}
                                height={400}
                                src={top5User[1]?.userData.profilePicture || nullAvatar}
                                alt={top5User[1]?.userData.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span className='text-[1.2rem] font-bold'>2nd</span>
                            <span className='text-[.6rem] text-neutral-500'>{top5User[1]?.userData.fullName}</span>
                        </div>
                    </div>
                )}
                {top5User[2] && (
                    <div className='flex gap-4 p-2 bg-[#141414] w-[9.4rem]'>
                        <div className='w-[3rem] h-[3rem] bg-white'>
                            <Image
                                width={400}
                                height={400}
                                src={top5User[2]?.userData.profilePicture || nullAvatar}
                                alt={top5User[2]?.userData.fullName}
                                className="w-full h-full object-cover "
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span className='text-[1.2rem] font-bold'>3rd</span>
                            <span className='text-[.6rem] text-neutral-500'>{top5User[2]?.userData.fullName}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Fourth Row - 4th Place */}
            {top5User[3] && (
                <div className='flex gap-4 p-2 bg-[#141414]'>
                    <div className='w-[3rem] h-[3rem] bg-white'>
                        <Image
                            width={400}
                            height={400}
                            src={top5User[3]?.userData.profilePicture || nullAvatar}
                            alt={top5User[3]?.userData.fullName}
                            className="w-full h-full object-cover "
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-[1.2rem] font-bold'>4th</span>
                        <span className='text-[.6rem] text-neutral-500'>{top5User[3]?.userData.fullName}</span>
                    </div>
                </div>
            )}

            {/* Fifth Row - 5th Place */}
            {top5User[4] && (
                <div className='flex gap-4 p-2 bg-[#141414]'>
                    <div className='w-[3rem] h-[3rem] bg-white'>
                        <Image
                            width={400}
                            height={400}
                            src={top5User[4]?.userData.profilePicture || nullAvatar}
                            alt={top5User[4]?.userData.fullName}
                            className="w-full h-full object-cover "
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-[1.2rem] font-bold'>5th</span>
                        <span className='text-[.6rem] text-neutral-500'>{top5User[4]?.userData.fullName}</span>
                    </div>
                </div>
            )}
            <div className='flex gap-4 p-2 bg-[#141414]'>
                <div className='w-[3rem] h-[3rem] bg-white'>
                    <Image
                        width={400}
                        height={400}
                        src={userRank?.userData.profilePicture || nullAvatar}
                        alt={userRank?.userData.fullName}
                        className="w-full h-full object-cover "
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-[1.2rem] font-bold'>{userRank?.rank}{userRank?.rank === 1 ? "st" : userRank?.rank === 2 ? "nd" : userRank?.rank === 3 ? "rd" : "th"}- You</span>
                    <span className='text-[.6rem] text-neutral-500'>{userRank?.userData.fullName}</span>
                </div>
            </div>
        </div>
    );
};

export default CreatorLeaderBoard;
