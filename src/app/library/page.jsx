"use client"
import ExploreWorkshopLongCard from '@/components/ExploreWorkshopLongCard';
import RecommendationCard from '@/components/RecommendationCard';
import SearchResult from '@/components/SearchResult';
import NoContent from "../../../public/NoContent.png"
import TicketCard from '@/components/TicketCard';
import TicketCardSkeleton from '@/components/skeleton/TicketCardSkeleton';
import useWorkshopTicketAPI from '@/fetchAPI/useWorkshopTicketAPI';
import useScreenWidth from '@/hooks/useScreenWidth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { shallowEqual, useSelector } from 'react-redux';
import Image from 'next/image';


const Library = () => {
    const screenWidth = useScreenWidth()
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
    const { getBuyerTickets } = useWorkshopTicketAPI()
    const user = useSelector(state => state.user.userData, shallowEqual)

    const [activeTab, setActiveTab] = useState("Purchased");
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [hasMore, setHasMore] = useState(true)
    const [searchedLength, setSearchedLength] = useState(0)

    const handleGetTickets = async () => {
        try {
            const res = await getBuyerTickets(user?._id, page, limit, true);
            const data = res.tickets;

            setHasMore(data.length > 0);
            setTickets(prevState => {
                const newTickets = data.filter(ticket => !prevState.some(prevTicket => prevTicket._id === ticket._id));
                return [...prevState, ...newTickets];
            });
            setSearchedLength(data.length);
            setLoading(false);

        } catch (error) {
            console.error("Search Error:", error);
            setHasMore(false);
        }
    };

    const fetchMoreData = () => {
        if (!hasMore) return;
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        if (user) {
            handleGetTickets();
        }
    }, [user, page])


    const tabs = [
        "Purchased",
        "Whishlist",
        "Expired"
    ];


    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className={`${screenWidth > 1024 ? "ml-[20rem]" : "justify-center px-4"}   items-center mt-[6rem] flex flex-col gap-[2rem]`}>
                    <h2 className='xl:mr-[16rem]'>Your all tickets</h2>
                    {(!tickets.length && !loading) &&
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
                        className='grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center'
                        hasMore={hasMore}
                        loader={
                            <>
                                <TicketCardSkeleton />
                                <TicketCardSkeleton />
                            </>
                        }
                    >
                        {tickets.map((ticket) => (
                            <TicketCard
                                key={ticket._id}
                                ticketData={ticket}
                            />
                        ))}
                    </InfiniteScroll>


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
                    </div>
                    <section id='courses' className='flex flex-col gap-6 '>
                        <div className='flex justify-between'>
                            <div className='font-bold'>
                                Courses
                            </div>
                            <Link href={"/"} className='mr-8'>View all</Link>
                        </div>
                        <div className=' text-white flex flex-col gap-6'>
                            <ExploreWorkshopLongCard />
                        </div>
                    </section>
                    <section id='workshop' className='flex flex-col gap-6'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>
                                Workshops
                            </div>
                            <Link href={"/"} className='mr-8'>View all</Link>
                        </div>
                        <div className='grid grid-cols-3 gap-4 text-white'>
                            <RecommendationCard />
                            <RecommendationCard />
                            <RecommendationCard />
                        </div>
                    </section> */}

                </div>
            }
        </>
    )
}

export default Library