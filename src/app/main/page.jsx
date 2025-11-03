"use client"
import Link from 'next/link'
import EventCard from '@/components/EventCard'
import RecommendationCard from '@/components/RecommendationCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React, { useEffect, useState } from 'react'
import useWorkshopAPI from '@/fetchAPI/useWorkshopAPI'
import useFollowAPI from '@/fetchAPI/useFollowAPI'
import nullAvatar from "../../../public/nullAvatar.jpg"
import NoContent from "../../../public/NoContent.png"
import { shallowEqual, useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import SearchResult from '@/components/SearchResult'
import EventCardSkeleton from '@/components/skeleton/EventCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import useScreenWidth from '@/hooks/useScreenWidth'
import WorkshopSearchCard from '@/components/WorkshopSearchCard'
import Workshop from '@/components/Workshop'
import ProfileWorkshopCardSkeleton from '@/components/skeleton/ProfileWorkshopCardSkeleton'
import InfiniteScroll from 'react-infinite-scroll-component'

const Main = () => {
    const router = useRouter()
    const screenWidth = useScreenWidth()
    const { getUserFollowing } = useFollowAPI()
    const { getWorkshops } = useWorkshopAPI();
    const user = useSelector((state) => state.user.userData, shallowEqual);
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);

    const [followedWorkshop, setFollowedWorkshops] = useState([]);
    const [workshop, setWorkshops] = useState([]);
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true);
    const [workshopLoading, setWokrshopLoading] = useState(true)
    const [followedWorkshopLoading, setFollowedWorkshopLoading] = useState(1)
    const [followedWorkshopPage, setFollowedWorkshopPage] = useState(1)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [userFollowing, setUserFollowing] = useState([])

    useEffect(() => {
        const fetchUserFollowing = async () => {
            if (!user?._id) return;

            setLoading(true);
            try {
                const followers = await getUserFollowing(user._id);
                setUserFollowing(followers);
            } catch (error) {
                console.error("Error fetching user following:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserFollowing();
    }, [user]);

    useEffect(() => {
        const fetchFollowedWorkshops = async () => {
            setFollowedWorkshopLoading(true)
            const upcoming = 1
            const { workshops } = await getWorkshops(limit, followedWorkshopPage, user?._id, upcoming);
            setFollowedWorkshops(workshops || []);
            setFollowedWorkshopLoading(false)
        };
        if (user?._id) {
            fetchFollowedWorkshops();
        }
    }, [user, followedWorkshopPage]);

    const fetchWorkshops = async () => {
        setWokrshopLoading(true)
        const { workshops } = await getWorkshops(limit, page);
        setHasMore(workshops?.length > 0);
        setWorkshops((prevState => {
            const newWorkshops = workshops.filter(workshop => !prevState.some(prevWorkshop => prevWorkshop._id === workshop._id));
            return [...prevState, ...newWorkshops];
        }));
        setWokrshopLoading(false)
    };

    const fetchMoreData = () => {
        if (!hasMore) return;
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        fetchWorkshops();
    }, [page])



    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className={`${screenWidth > 1024 ? "ml-[20rem]" : "flex justify-center mb-[6rem] px-4"} mt-[6rem]`}>
                    <div className='flex flex-col gap-8 w-full overflow-hidden mt-4 '>
                        <section id='accound-follows' className=' bg-[#070707] w-full flex flex-col gap-6 fixed top-[4rem] h-[8rem] z-10 pb-[9rem]'>
                            <div className='font-bold'>
                                Creator <span className='font-semibold text-neutral-500'>You Follow</span>
                            </div>
                            {!userFollowing?.length && !loading &&
                                <span className='w-[8rem] m-auto lg:ml-[26rem]'>No following</span>
                            }
                            {(userFollowing?.length || loading) &&
                                <Carousel
                                    opts={{
                                        align: "start",
                                    }}
                                    className={` ${screenWidth > 1024 && "w-[59rem] ml-[2.5rem]"} pr-6`}>
                                    <CarouselContent className="-ml-2">

                                        {!userFollowing?.length &&
                                            <>
                                                <CarouselItem className="basis-1/10 lg:basis-1/12">
                                                    <Skeleton
                                                        className=' h-[4rem] w-[4rem] rounded-full object-cover text-center text-black'
                                                    />
                                                </CarouselItem>
                                                <CarouselItem className="basis-1/10 lg:basis-1/12">
                                                    <Skeleton
                                                        className=' h-[4rem] w-[4rem] rounded-full object-cover text-center text-black'
                                                    />
                                                </CarouselItem>
                                                <CarouselItem className="basis-1/10 lg:basis-1/12">
                                                    <Skeleton
                                                        className=' h-[4rem] w-[4rem] rounded-full object-cover text-center text-black'
                                                    />
                                                </CarouselItem>
                                                <CarouselItem className="basis-1/10 lg:basis-1/12">
                                                    <Skeleton
                                                        className=' h-[4rem] w-[4rem] rounded-full object-cover text-center text-black'
                                                    />
                                                </CarouselItem>
                                            </>
                                        }
                                        {userFollowing &&
                                            userFollowing?.map((following, index) => (
                                                <CarouselItem key={index} className={`basis-1/10 lg:basis-1/12 flex flex-col items-center`}>
                                                    <>
                                                        <Image
                                                            width={100}
                                                            height={100}
                                                            alt={"profile picture"}
                                                            src={following.userDetails.profilePicture || nullAvatar}
                                                            className=' h-[4rem] w-[4rem] rounded-full object-cover text-center text-black'
                                                            onClick={() => router.push(`/profile/${following.followingId}`)}
                                                        />
                                                        <span className='text-[.7rem] text-neutral-500'>{following.userDetails.fullName.slice(0, 9)}</span>
                                                    </>
                                                </CarouselItem>
                                            ))
                                        }
                                    </CarouselContent>
                                    {screenWidth > 1024 &&
                                        <>
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </>
                                    }
                                </Carousel>
                            }
                        </section>
                        {user?.following >= 1 &&
                            <section id='events' className='flex flex-col gap-6 mt-[8rem]'>
                                <div className='font-bold'>
                                    Upcoming <span className='font-semibold text-neutral-500'>Events</span>
                                </div>
                                {followedWorkshop?.length === 0 &&
                                    !followedWorkshopLoading && (
                                        <span className='w-[8rem] m-auto'>No Events</span>
                                    )}

                                {(followedWorkshop?.length || loading) &&
                                    <Carousel
                                        opts={{
                                            align: "start",
                                        }}
                                        className={`lg:w-[59rem] ${screenWidth > 1024 ? "ml-[3rem]" : ""}`}
                                    >
                                        <CarouselContent className="-ml-2 flex">
                                            {followedWorkshop?.length === 0 && loading &&
                                                <>
                                                    <CarouselItem className="basis-1/1.5">
                                                        <EventCardSkeleton />
                                                    </CarouselItem>
                                                    <CarouselItem className="basis-1/1.5">
                                                        <EventCardSkeleton />
                                                    </CarouselItem>
                                                </>
                                            }

                                            {followedWorkshop?.length > 0 &&
                                                followedWorkshop.map((workshop) => (
                                                    <CarouselItem
                                                        key={workshop._id}
                                                        className={`basis-1/1 lg:basis-1/1.5`}
                                                    >
                                                        {screenWidth >= 768 ? (
                                                            <EventCard workshop={workshop} />
                                                        ) : (
                                                            <WorkshopSearchCard workshop={workshop} />
                                                        )}
                                                    </CarouselItem>
                                                ))}
                                        </CarouselContent>

                                        {/* Carousel Navigation for Larger Screens */}
                                        {screenWidth > 1024 && (
                                            <>
                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </>
                                        )}
                                    </Carousel>
                                }

                            </section>
                        }

                        <section id='recommendation' className={`flex flex-col ${user?.following == 0 && "mt-[12rem]"} gap-6`}>
                            <div className='flex justify-between'>
                                <div className='font-bold'>
                                    Recommendation <span className='font-semibold text-neutral-500'>Workshop For You</span>
                                </div>
                                {/* <Link href={"/"} className='mr-8'>View all</Link> */}

                            </div>
                            <div>
                                {!workshop?.length && !workshopLoading &&
                                    <>
                                        <Image
                                            src={NoContent}
                                            alt="no content"
                                            width={100}
                                            height={100}
                                            className="w-[8rem] m-auto"
                                        />
                                    </>
                                }
                                <InfiniteScroll
                                    dataLength={workshop?.length}
                                    next={fetchMoreData}
                                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl-grid-cols-4 gap-4 place-items-center lg:place-items-start '
                                    hasMore={hasMore}
                                    loader={
                                        <>
                                            <ProfileWorkshopCardSkeleton />
                                            <ProfileWorkshopCardSkeleton />
                                            <ProfileWorkshopCardSkeleton />
                                        </>
                                    }
                                >

                                    {workshop.map((workshop) => (
                                        <Workshop
                                            key={workshop._id}
                                            workshop={workshop}
                                        />
                                    ))}
                                </InfiniteScroll>

                                {/* <RecommendationCard />
                                <RecommendationCard />
                                <RecommendationCard /> */}
                            </div>

                        </section>
                        {/* <section id='upcoming-workshop' className='flex flex-col gap-6'>
                            <div className='flex justify-between'>
                                <div className='font-bold'>
                                    Upcoming <span className='font-semibold text-neutral-500'>Recommendation For You</span>
                                </div>
                                <Link href={"/"} className='mr-8'>View all</Link>
                            </div>
                            <div className='flex justify-center'>
                                No data!
                            </div>
                            <div className='grid grid-cols-3 gap-4'>
                                <RecommendationCard />
                                <RecommendationCard />
                                <RecommendationCard />
                            </div>

                        </section> */}
                    </div>
                </div>
            }
        </>
    )
}

export default Main