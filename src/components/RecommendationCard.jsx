import React from 'react'

const RecommendationCard = () => {
    return (
        <>
            <div className="w-[20rem] max-w-md bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
                <div className="">
                    <div
                        // src="/placeholder.svg?height=200&width=400"
                        // alt="Course instructor pointing at a screen"
                        className="w-full h-48 object-cover bg-gray-500"
                    />
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <div className="bottom-0 left-0 right-0">
                        <h2 className="text-white text-xl font-bold leading-tight">
                            How To Get 10k Followers On Instagram Per Week
                        </h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div variant="secondary" className="text-white">
                                Creator
                            </div>
                            <span className="ml-2 text-gray-300 text-sm">The Futur, Chris Do</span>
                        </div>
                        <span className="text-gray-300 text-sm line-through">$450</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div variant="outline" className="text-black text-sm bg-yellow-300 rounded-[10px] px-2 py-1 font-medium">
                            Bestseller
                        </div>
                        <span className="text-2xl font-bold text-white">$389</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendationCard