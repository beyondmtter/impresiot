import React from 'react'
import nullAvatar from "../../public/nullAvatar.jpg"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setQuery } from '@/redux/searchSlice'

const UserSearchCard = ({ user }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    return (
        <>
            <div className="flex items-center gap-4 justify-between w-[20rem] sm:w-[30rem] cursor-pointer" onClick={() => {
                router.push(`/profile/${user._id}`)
                dispatch(setQuery(""))
            }}>
                <div className="flex gap-3">
                    <Image
                        src={user.profilePicture || nullAvatar}

                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="w-[3rem] h-[3rem] object-cover rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                        <span className="font-medium text-white">{user.fullName}</span>
                        <span className="text-neutral-500 text-[.9rem]">{user.email.slice(0,13)}..</span>
                    </div>
                </div>
                <div>
                    <div className="px-4 py-3 text-[.8rem] flex gap-2 bg-[#202020] sm:w-[10rem] justify-center rounded-[4px]">
                        Followers <span>{user?.followers}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSearchCard