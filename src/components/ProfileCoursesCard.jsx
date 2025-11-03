import React from 'react'

const ProfileCoursesCard = () => {
    return (
        <>
            <div className="w-[18rem] max-w-md bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
                <div className="">
                    <div
                        // src="/placeholder.svg?height=200&width=400"
                        // alt="Course instructor pointing at a screen"
                        className="w-full h-48 object-cover bg-gray-500"
                    />
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <div className="bottom-0 left-0 right-0">
                        <h2 className="text-white text-md font-semibold leading-tight">
                            How To Get 10k Followers On Instagram Per Week
                        </h2>
                    </div>
                    <div className=" flex gap-1">
                            <span className=" text-gray-300 text-sm">Something Something</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-bold text-white">$389</span>
                        <div variant="outline" className="text-black text-[.7rem] bg-yellow-400 rounded-[10px] px-2 py-1 font-bold">
                            BestSeller
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCoursesCard