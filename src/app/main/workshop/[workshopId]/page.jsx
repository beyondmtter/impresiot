"use client";
import usePaymentAPI from "@/fetchAPI/usePaymentAPI";
import useWorkshopAPI from "@/fetchAPI/useWorkshopAPI";
import { getWorkshopStatus } from "@/helper/getWorkshopStatus";
import { makePayment } from "@/lib/makePayment";
import { ChevronLeft, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import nullAvatar from "../../../../../public/nullAvatar.jpg"
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import WorkshopPageSkeleton from "@/components/skeleton/WorkshopPageSkeleton ";
import useWorkshopTicketAPI from "@/fetchAPI/useWorkshopTicketAPI";
import SearchResult from "@/components/SearchResult";
import useScreenWidth from "@/hooks/useScreenWidth";

const WorkshopPage = () => {
    const screenWidth = useScreenWidth()
    const router = useRouter();
    const { workshopId } = useParams();
    const { getWorkshopById } = useWorkshopAPI();
    const { createOrder, paymentVrification } = usePaymentAPI()
    const { createWorkshopTicket, getIsTicketBought } = useWorkshopTicketAPI()
    const user = useSelector((state) => state.user.userData, shallowEqual);
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);

    const [workshop, setWorkshop] = useState();
    const [isTicketBought, setIsTicketBought] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkshop = async () => {
            setLoading(true);
            const response = await getWorkshopById(workshopId);
            setWorkshop(response.workshop);
            setLoading(false);
        };
        if (workshopId) {
            fetchWorkshop();
        }
    }, [workshopId]);

    useEffect(() => {
        const fetchIsTicketBought = async () => {
            const response = await getIsTicketBought(user?._id, workshopId);
            setIsTicketBought(response.isTicketBought);
        };
        if (workshopId, user?._id) {
            fetchIsTicketBought();
        }
    }, [workshopId, user?._id])
    
    const handlePayment = async () => {
        try {
            const discountThreshold = 19;

            const currentPrice = discountThreshold > workshop.discountToNumberOfTicket 
                ? workshop.price 
                : workshop.discount;
    
            const { orderData } = await createOrder(currentPrice);
            if (!orderData) throw new Error("Order creation failed");
    
            const order = {
                ...orderData,
                fullName: user?.fullName,
                contact: user?.contact,
                email: user?.email
            };
    
            const finalOrder = await makePayment(order, paymentVrification);
            if (!finalOrder) throw new Error("Payment processing failed");
    
            const payload = {
                ...finalOrder,
                eventDate: workshop?.startDate,
                time: workshop?.time,
                creatorId: workshop?.creatorId,
                buyerId: user?._id,
                workshopId: workshop?._id,
                contact: user?.contact,
            };
    
            const ticketResponse = await createWorkshopTicket(payload);
            setIsTicketBought(true)
            if (!ticketResponse) throw new Error("Failed to create workshop ticket");
    
    
        } catch (error) {
            console.error("Error in handlePayment:", error.message);
        }
    };
    
    if (loading) {
        return <WorkshopPageSkeleton />
    }
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            {/* Main Container for Workshop Page Layout */}
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className={`${screenWidth > 1024 && "ml-[20rme]"} flex-col sm:flex-row mb-[4rem] px-2  mt-[4rem] flex gap-2  
                 w-[24rem] sm:w-[46rem] md:w-[48rem] m-auto`}>
                    {/* Left Sidebar Section */}
                    <div className="bg-neutral-900 p-4 w-[22rem] flex flex-col gap-3 rounded-[8px]">
                        {/* Back Button */}
                        <div onClick={() => router.push("/main")} className="active:scale-95 duration-100 transition-all">
                            <ChevronLeft />
                        </div>

                        {/* Workshop Image */}
                        <div>
                            <div className="bg-black rounded-[10px] h-[12rem]">
                                <Image
                                    width={500}
                                    height={500}
                                    src={workshop.thumbNail || "/default-workshop.jpg"}
                                    alt={workshop.title}
                                    className="object-cover w-full h-full rounded-[10px]"
                                />
                            </div>
                        </div>

                        {/* Workshop Title */}
                        <div className="bottom-0 left-0 right-0">
                            <h2 className="text-white text-md leading-tight">
                                {workshop.title}
                            </h2>
                        </div>

                        {/* Organizer Info */}
                        <div className="text-[.8rem] text-neutral-500">{user?.fullName || "N/A"}</div>

                        {/* Date and Time Info */}
                        <div className="flex gap-1 text-white">
                            <span className="text-sm">{new Date(workshop.startDate).toDateString()}</span>
                            .
                            <span className="text-sm">{getWorkshopStatus(workshop.startDate, workshop.time)}</span>
                        </div>

                        {/* Language and Duration Details */}
                        <div className="flex gap-2 text-[.8rem] text-neutral-500">
                            <div className="flex gap-1">
                                Language:
                                <span className="text-white">{workshop.language || "English"}</span>
                            </div>
                            <div className="flex gap-1">
                                Duration:
                                <span className="text-white">{workshop.duration + " hour" || "1 hour"}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 text-[.8rem] text-neutral-500">
                            <div className="flex gap-1">
                                Location:
                                <span className="text-white">{workshop.location}</span>
                            </div>
                        </div>

                        {/* Registration Deadline */}
                        {!isTicketBought &&
                            <button className="bg-red-400 text-white text-[.8rem] p-2 active:scale-95 duration-100 transition-all rounded-[8px]" onClick={handlePayment}>
                                Buy Now
                            </button>
                        }
                        {isTicketBought &&
                            <button className="bg-red-400 text-white text-[.8rem] p-2 active:scale-95 duration-100 transition-all rounded-[8px]" onClick={() => router.push("/ticket")}>
                                Your Tickets
                            </button>
                        }

                        {/* Instructor Section */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-white text-md font-semibold leading-tight">Instructor</h2>
                            <div className="flex gap-2">
                                <div className="bg-white h-[4rem] w-[4rem] rounded-full">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={workshop?.userDetails.profilePicture || nullAvatar}
                                        alt="Instructor Avatar"
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <span className="text-white">{workshop?.userDetails.fullName || "Instructor"}</span>
                                    <div className="flex gap-1 items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <Star key={index} size={12} className="text-yellow-400" />
                                        ))}
                                        <span className="text-[.7rem]">5.0</span>
                                    </div>
                                    <div className="text-[.7rem] flex gap-1 items-center">
                                        <span>({workshop.reviewsCount || "0"} reviews)</span> -
                                        <span>{workshop.enrollments || "0"} enrolled</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push(`/profile/${workshop?.creatorId}`)}
                                className="bg-black border-[1px] w-full border-neutral-600 active:scale-95 duration-100 transition-all text-white text-[.8rem] p-2 rounded-[8px]"
                            >
                                View Profile
                            </button>
                        </div>
                    </div>

                    {/* Right Sidebar Section */}
                    <div className="p-4 w-[22rem] sm:w-[24rem] bg-black flex flex-col gap-4">
                        {/* Workshop Description */}
                        <div className="flex flex-col gap-2">
                            <h2>Description</h2>
                            <p className="text-[.8rem] text-neutral-500">{workshop.description}</p>
                        </div>
                        {/* Divider */}
                        {/* <div className='h-[1px] bg-neutral-500' /> */}

                        {/* Learning Objectives Section */}
                        {/* <div className='flex flex-col gap-2'>
                        <h2>What you'll learn</h2>
                        <p className='text-[.8rem] text-neutral-500'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quae optio aut, nostrum perspiciatis iure itaque commodi, assumenda quaerat ea laboriosam, corporis consequatur! Animi laborum eum tempore, consequatur illum fugiat!
                        </p>
                        <ul className='text-[.8rem] text-neutral-500 list-disc list-inside'>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque aspernatur suscipit impedit? Consectetur dignissimos</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque aspernatur suscipit impedit?</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque aspernatur suscipit</li>
                        </ul>
                    </div> */}

                        {/* Divider */}
                        {/* <div className='h-[1px] bg-neutral-500' /> */}

                        {/* Course Reviews Section */}
                        {/* <div>
                        <div className='mb-4'>Course reviews</div>
                        <div>
                            <div className='flex gap-2'>
                                <span>mera name</span>
                                <div className='flex gap-1 items-center'>
                                    {[...Array(5)].map((_, index) => (
                                        <Star key={index} size={12} className="text-yellow-400" />
                                    ))}
                                    <span className='text-[.7rem]'>5.0</span>
                                </div>
                            </div>
                            <p className='text-[.8rem] text-neutral-500'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quae optio aut, nostrum perspiciatis iure itaque commodi, assumenda quaerat ea laboriosam, corporis consequatur! Animi laborum eum tempore, consequatur illum fugiat!
                            </p>
                        </div>
                        <div>
                            <div className='flex gap-2'>
                                <span>mera name</span>
                                <div className='flex gap-1 items-center'>
                                    {[...Array(5)].map((_, index) => (
                                        <Star key={index} size={12} className="text-yellow-400" />
                                    ))}
                                    <span className='text-[.7rem]'>5.0</span>
                                </div>
                            </div>
                            <p className='text-[.8rem] text-neutral-500'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quae optio aut, nostrum perspiciatis iure itaque commodi, assumenda quaerat ea laboriosam, corporis consequatur! Animi laborum eum tempore, consequatur illum fugiat!
                            </p>
                        </div>
                    </div> */}
                    </div>
                </div>
            }
        </>
    );
};

export default WorkshopPage;
