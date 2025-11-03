"use client"
import React, { useEffect, useState } from 'react';
import useWorkshopTicketAPI from '@/fetchAPI/useWorkshopTicketAPI';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoContent from "../../../../public/NoContent.png"
import { shallowEqual, useSelector } from 'react-redux';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import BillCard from '@/components/BillCard';
import BillCardSkeleton from '@/components/skeleton/BillCardSkeleton';
import useScreenWidth from '@/hooks/useScreenWidth';
import Image from 'next/image';


const Billing = () => {
    const screenWidth = useScreenWidth()
    const { getBuyerTickets } = useWorkshopTicketAPI()
    const user = useSelector(state => state.user.userData, shallowEqual)

    const [bills, setbills] = useState([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [hasMore, setHasMore] = useState(true)
    const [searchedLength, setSearchedLength] = useState(0)
 

    const handleGetbills = async () => {
        try {
            const bill = true
            const res = await getBuyerTickets(user?._id, page, limit, bill);
            const data = res.tickets;

            setHasMore(data.length > 0);
            setbills(prevState => {
                const newbills = data.filter(ticket => !prevState.some(prevBill => prevBill._id === ticket._id));
                return [...prevState, ...newbills];
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
            handleGetbills();
        }
    }, [user, page])


    return (
        <>
            <div className={`${screenWidth > 1024 && "ml-[20rem]"} m-auto w-[24rem] sm:w-[45rem] flex flex-col items-center mt-[6rem] mb-[4rem] gap-[2rem]`}>
                <div className='flex items-start w-full font-semiBold text-[1.4rem]'>
                    <span>Your Bills</span>
                </div>
                {(!bills.length && !loading) &&
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
                    className='flex flex-col items-center gap-4 mt-[4rem]'
                    hasMore={hasMore}
                    loader={
                        <>
                            <BillCardSkeleton />
                            <BillCardSkeleton />
                        </>
                    }
                >
                    {bills.map((bill) => (
                        <BillCard
                            key={bill._id}
                            bill={bill}
                        />
                    ))}
                </InfiniteScroll>
                
            </div>
        </>
    )
}

export default Billing