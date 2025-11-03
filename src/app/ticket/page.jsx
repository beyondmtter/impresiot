"use client"
import React, { useEffect, useState } from 'react';
import useWorkshopTicketAPI from '@/fetchAPI/useWorkshopTicketAPI';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoContent from "../../../public/NoContent.png"
import { shallowEqual, useSelector } from 'react-redux';
import TicketCardSkeleton from '@/components/skeleton/TicketCardSkeleton';
import TicketCard from '@/components/TicketCard';
import useScreenWidth from '@/hooks/useScreenWidth';
import SearchResult from '@/components/SearchResult';
import Image from 'next/image';

const Ticket = () => {
    const screenWidth = useScreenWidth()
    const { getBuyerTickets } = useWorkshopTicketAPI()
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
    const user = useSelector(state => state.user.userData, shallowEqual)

    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [hasMore, setHasMore] = useState(true)
    const [searchedLength, setSearchedLength] = useState(0)


    const handleGetTickets = async () => {
        try {
            const res = await getBuyerTickets(user?._id, page, limit);
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

    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className={`${screenWidth > 1024 ? "ml-[20rem]" : "justify-center px-4"} items-center mt-[6rem] mb-[4rem] flex flex-col gap-[2rem]`}>
                    <h2 className='xl:mr-[16rem]'>Your upcoming events tickets</h2>
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
                </div>
            }
        </>
    );
};

export default Ticket;
