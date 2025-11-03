"use client"
import ExploreBigPicCreatorCard from '@/components/ExploreBigPicCreatorCard'
import ExploreWorkshopLongCard from '@/components/ExploreWorkshopLongCard'
import RecommendationCard from '@/components/RecommendationCard'
import SearchResult from '@/components/SearchResult'
import ExploreBigPicCreatorCardSeleton from '@/components/skeleton/ExploreBigPicCreatorCardSeleton'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import useUserAPI from '@/fetchAPI/useUserAPI'
import  NoContent from "../../../public/NoContent.png"
import useScreenWidth from '@/hooks/useScreenWidth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { shallowEqual, useSelector } from 'react-redux'
import Image from 'next/image'

const Explore = () => {
    const screenWidth = useScreenWidth()
    const { getCreators } = useUserAPI()
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);

    const [activeTab, setActiveTab] = useState("Dance");
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [hasMore, setHasMore] = useState(true)
    const [creators, setCreators] = useState([])
    const [creatorLoading, setCreatorLoading] = useState(true)
    const [searchedLength, setSearchedLength] = useState(0)

    const handleGetCreators = async () => {
        try {
            setCreatorLoading(true)
            const data = await getCreators(page, limit);

            setHasMore(data.length > 0);
            setCreators(prevState => {
                const newCreators = data.filter(creator => !prevState.some(prevCreator => prevCreator._id === creator._id));
                return [...prevState, ...newCreators];
            });
            setSearchedLength(data.length);
        } catch (error) {
            console.error("Search Error:", error);
            setHasMore(false);
        } finally{
            setCreatorLoading(false)
        }
    }

    const fetchMoreData = () => {
        if (!hasMore) return
        setPage(prev => prev + 1)
    }


    useEffect(() => {
        if (!hasMore) return
        handleGetCreators()
    }, [page])

    const tabs = [
        "Dance",
        "Design",
        "Coding",
        "Singing",
        "Music",
        "Gaming",
        "Sports",
        "Photograph"
    ];


    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className={`${screenWidth > 1024 ? "ml-[20rem]" : "justify-center"} mb-[4rem]  mt-[6rem] flex flex-col gap-[4rem] px-4`}>
                    {/* Tabs */}
                    {/* <div className='flex gap-[3.5rem]'>
                        {tabs.map((tab) => (
                            <div
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`cursor-pointer px-4 py-2 rounded-[8px] text-[.8rem] ${activeTab === tab
                                        ? 'bg-white text-black'
                                        : 'text-neutral-500'
                                    }`}
                            >
                                {tab}
                            </div>
                        ))}
                    </div> */}

                    <section id='creators' className='flex flex-col gap-6'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>
                                {/* Top <span className='font-semibold text-neutral-500'>{tabChangeData[activeTab.toLowerCase()][0]}</span> */}
                                Top <span className='font-semibold text-neutral-500'> Creators</span>
                            </div>
                            {/* <Link href={"/"} className='mr-8'>View all</Link> */}
                        </div>
                        <div>
                            {(!creators.length && !creatorLoading) &&
                                <Image
                                    src={NoContent}
                                    alt="no content"
                                    width={100}
                                    height={100}
                                    className="w-[8rem] m-auto xl:ml-[20rem]"
                                />
                            }
                            <InfiniteScroll
                                dataLength={searchedLength}
                                next={fetchMoreData}
                                className='text-white grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center'
                                hasMore={hasMore}
                                loader={
                                    <>
                                        <ExploreBigPicCreatorCardSeleton />
                                        <ExploreBigPicCreatorCardSeleton />
                                        <ExploreBigPicCreatorCardSeleton />
                                        <ExploreBigPicCreatorCardSeleton />
                                    </>
                                }
                            >
                                {creators.map((creator) => (
                                    <ExploreBigPicCreatorCard
                                        key={creator._id}
                                        creator={creator}
                                    />
                                ))}
                            </InfiniteScroll>
                            {/* <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full">
                                <CarouselContent className="-ml-2">
                                    {Array.from({ length: 15 }).map((_, index) => (
                                        <CarouselItem key={index} className="basis-1/5">
                                            <ExploreBigPicCreatorCard />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel> */}
                        </div>
                    </section>

                    {/* <section id='courses' className='flex flex-col gap-6'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>
                                Top <span className='font-semibold text-neutral-500'>{tabChangeData[activeTab.toLowerCase()][1]}</span>
                            </div>
                            <Link href={"/"} className='mr-8'>View all</Link>
                        </div>
                        <div className='grid grid-cols-3 gap-4 text-white'>
                            <RecommendationCard />
                            <RecommendationCard />
                            <RecommendationCard />
                        </div>
                    </section>

                    <section id='workshop' className='flex flex-col gap-6 '>
                        <div className='flex justify-between'>
                            <div className='font-bold'>
                                Workshops- <span className='font-semibold text-neutral-500'>{tabChangeData[activeTab.toLowerCase()][2]}</span>
                            </div>
                            <Link href={"/"} className='mr-8'>View all</Link>
                        </div>
                        <div className=' text-white flex flex-col gap-6'>
                            <ExploreWorkshopLongCard />
                            <ExploreWorkshopLongCard />
                            <ExploreWorkshopLongCard />
                        </div>
                    </section> */}
                </div>
            }
        </>
    )
}

export default Explore

const tabChangeData = {
    dance: ["Creators in Dancing", "Courses in Dancing", "Dancing"],
    design: ["Creators in Designing", "Courses in Designing", "Designing"],
    coding: ["Creators in Coding", "Courses in Coding", "Coding"],
    singing: ["Creators in Singing", "Courses in Singing", "Signing"],
    music: ["Creators in Music", "Courses in Music", "Music"],
    sports: ["Creators in Sports", "Courses in Sports", "Sports"],
    gaming: ["Creators in Gaming", "Courses in Gaming", "Gaming"],
    photograph: ["Creators in Photograph", "Courses in Photograph", "Photograph"]
}