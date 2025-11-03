"use client"
import useSearchAPI from '@/fetchAPI/useSearchAPI';
import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import WorkshopSearchCard from './WorkshopSearchCard';
import UserSearchCard from './UserSearchCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import WorkshopSearchCardSkeleton from './skeleton/WorkshopSearchCardSkeleton';
import UserSearchCardSkeleton from './skeleton/UserSearchCardSkeleton';
import useScreenWidth from '@/hooks/useScreenWidth';


const SearchResult = () => {
    const { screenWidth } = useScreenWidth
    const { searchUsers, searchWorkshops } = useSearchAPI()
    const query = useSelector((state) => state.search.query, shallowEqual);

    const [activeTab, setActiveTab] = useState("workshop");
    const [searchPrevState, setSearchPrevState] = useState("")
    const [searchedUser, setSearchedUser] = useState([])
    const [searchedWorkshop, setSearchedWorkshop] = useState([])
    const [searchedLength, setSearchedLength] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const handleSearch = async () => {
        if (!query) return;

        try {
            const isWorkshopTab = activeTab === "workshop";
            const searchFunction = isWorkshopTab ? searchWorkshops : searchUsers;

            const res = await searchFunction(query, page);
            const data = res.data;

            setHasMore(data.length > 0);

            if (isWorkshopTab) {
                setSearchedWorkshop(prevState => {
                    const newWorkshops = data.filter(workshop => !prevState.some(prevWorkshop => prevWorkshop._id === workshop._id));
                    return [...prevState, ...newWorkshops];
                });
            } else {
                setSearchedUser(prevState => {
                    const newUsers = data.filter(user => !prevState.some(prevUser => prevUser._id === user._id));
                    return [...prevState, ...newUsers];
                });
            }

            setSearchedLength(data.length);

        } catch (error) {
            console.error("Search Error:", error);
            setHasMore(false);
        }
    };

    const fetchMoreData = () => {
        if (!hasMore) return;
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        if (activeTab !== searchPrevState) {
            setPage(1)
        }
        setSearchPrevState(activeTab)
        handleSearch()
    }, [query, activeTab, page])

    return (
        <>
            <div className={`${screenWidth > 1024 && "ml-[22rem]"} mt-[4rem] m-auto flex items-center flex-col gap-[4rem] w-[24rem] sm:w-[40rem] bg-black p-[2rem] rounded-[8px]`}>
                {/* Tabs */}
                <div className='flex gap-4 justify-between items-center fixed top-[6rem] bg-black z-10  w-[22rem] sm:w-[38rem] py-2'>
                    <div className='flex gap-[2rem]'>
                        <div
                            onClick={() => setActiveTab("workshop")}
                            className={`cursor-pointer px-4 py-2 rounded-[8px] text-[.8rem] ${activeTab === "workshop"
                                ? 'bg-white text-black'
                                : 'text-neutral-500 bg-neutral-900'
                                }`}
                        >
                            Workshops
                        </div>
                        <div
                            onClick={() => setActiveTab("user")}
                            className={`cursor-pointer px-4 py-2 rounded-[8px] text-[.8rem] ${activeTab === "user"
                                ? 'bg-white text-black'
                                : 'text-neutral-500 bg-neutral-900'
                                }`}
                        >
                            User
                        </div>

                    </div>
                    <div className='text-neutral-500 text-[.8rem] sm:text-[.9rem]'><span>{searchedLength}</span> results of {activeTab}</div>
                </div>
                {activeTab === "workshop" &&
                    <InfiniteScroll
                        dataLength={searchedLength}
                        next={fetchMoreData}
                        className='flex flex-col gap-4  mt-[5rem] sm:mt-[4rem]'
                        hasMore={hasMore}
                        loader={
                            <>
                                <WorkshopSearchCardSkeleton />
                                <WorkshopSearchCardSkeleton />
                            </>
                        }
                    >
                        {searchedWorkshop.map((workshop) => (
                            <WorkshopSearchCard
                                key={workshop._id}
                                workshop={workshop}
                            />
                        ))}
                    </InfiniteScroll>

                }
                    
                {activeTab === "user" &&
                    <InfiniteScroll
                        dataLength={searchedLength}
                        next={fetchMoreData}
                        className='flex flex-col gap-4 mt-[5rem] sm:mt-[4rem]'
                        hasMore={hasMore}
                        loader={
                            <>
                                <UserSearchCardSkeleton />
                                <UserSearchCardSkeleton />
                            </>
                        }
                    >
                        {searchedUser.map((user) => (
                            <UserSearchCard
                                key={user._id}
                                user={user}
                            />
                        ))}
                    </InfiniteScroll>
                }

            </div>
        </>
    )
}

export default SearchResult