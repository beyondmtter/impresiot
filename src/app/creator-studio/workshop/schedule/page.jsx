"use client";
import SearchResult from '@/components/SearchResult';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import useWorkshopAPI from '@/fetchAPI/useWorkshopAPI';
import { useToast } from '@/hooks/use-toast';
import usePreviewImg from '@/hooks/usePreviewImg';
import useScreenWidth from '@/hooks/useScreenWidth';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const SheduleWorkshop = () => {
    const { toast } = useToast()
    const screenWidth = useScreenWidth()
    const fileRef = useRef(null);
    const { createWorkshop, getWorkshopById, updateWorkshop } = useWorkshopAPI()
    const searchParams = useSearchParams()
    const user = useSelector((state) => state.user.userData, shallowEqual);
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);

    const { handleImageChange, imgUrl } = usePreviewImg();
    const [formData, setFormData] = useState({
        thumbNail: "",
        title: '',
        description: '',
        date: null,
        time: '12:00',
        isDiscount: true,
        language: "",
        duration: "",
        price: '',
        location: '',
        discountedPrice: '',
        discountToNumberOfTicket: "",
        batchSize: "",
        isSellingClosed: false
    });

    const update = searchParams.get("update")
    const workshopId = searchParams.get("workshopId")

    useEffect(() => {
        const handleWorkshopData = async () => {
            const workshop = await handleGetworkshopById();
            setFormData({
                thumbNail: workshop.thumbNail || "",
                title: workshop.title || '',
                description: workshop.description || '',
                date: workshop.startDate ? new Date(workshop.startDate) : null,
                time: workshop.time || '12:00',
                isDiscount: workshop.isDiscount ?? true,
                language: workshop.language || "",
                duration: workshop.duration || "",
                price: workshop.price || '',
                location: workshop.location || '',
                discountedPrice: workshop.discount || '',
                discountToNumberOfTicket: workshop.discountToNumberOfTicket || "",
                batchSize: workshop.batchSize || "",
                isSellingClosed: workshop.isSellingClosed ?? false,
            });
        };

        if (update) {
            handleWorkshopData();
        }
    }, [update]);

    const handleGetworkshopById = async () => {
        try {
            const res = await getWorkshopById(workshopId);
            return res.workshop;
        } catch (error) {
            console.error("Error fetching workshop data:", error);
            return {};
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (selectedDate) => {
        setFormData((prev) => ({ ...prev, date: selectedDate }));
    };

    useEffect(() => {
        if (imgUrl) {
            setFormData((prevData) => ({
                ...prevData,
                thumbNail: imgUrl,
            }));
        }
    }, [imgUrl]);


    const handleDiscountToggle = (isChecked) => {
        setFormData((prev) => ({
            ...prev,
            isDiscount: isChecked,
            discountedPrice: '',
            discountToNumberOfTicket: '',
        }));
    };
    const handleSellingToggle = (isChecked) => {

        setFormData((prev) => ({
            ...prev,
            isSellingClosed: isChecked
        }));
    };


    const handleSubmit = async () => {
        const {
            thumbNail,
            title,
            description,
            date,
            time,
            price,
            batchSize,
            discountedPrice,
            language,
            duration,
            discountToNumberOfTicket,
            location,
            isSellingClosed
        } = formData;

        // Validation using toast instead of alert
        if (!thumbNail) {
            toast({
                description: "Please upload a thumbnail image.",
            });
            return;
        }

        if (!location) {
            toast({
                description: "Location is required.",
            });
            return;
        }

        if (!title) {
            toast({
                description: "Title is required.",
            });
            return;
        }

        if (!description) {
            toast({
                description: "Description is required.",
            });
            return;
        }

        if (!date) {
            toast({
                description: "Please select a date for the workshop.",
            });
            return;
        }

        if (!time) {
            toast({
                description: "Please select a time for the workshop.",
            });
            return;
        }

        if (!price) {
            toast({
                description: "Price is required.",
            });
            return;
        }

        if (!batchSize) {
            toast({
                description: "Batch size is required.",
            });
            return;
        }

        if (!language) {
            toast({
                description: "Language is required.",
            });
            return;
        }

        if (!duration) {
            toast({
                description: "Duration is required.",
            });
            return;
        }

        if (formData.isDiscount && !discountedPrice) {
            toast({
                description: "Please provide a discounted price.",
            });
            return;
        }

        if (formData.isDiscount && !discountToNumberOfTicket) {
            toast({
                description: "Please specify the number of tickets for discount.",
            });
            return;
        }

        try {
            const workshopData = {
                creatorId: user?._id,
                thumbNail,
                title,
                description,
                startDate: date,
                time,
                isDiscount: formData.isDiscount,
                price,
                language,
                duration,
                discount: formData.isDiscount ? discountedPrice : null,
                discountToNumberOfTicket: formData.isDiscount ? discountToNumberOfTicket : null,
                batchSize,
                location,
                isSellingClosed
            };

            if (update) {
                const result = await updateWorkshop(workshopData, workshopId);
                toast({
                    description: result.message,
                });
                return;
            }

            const result = await createWorkshop(workshopData);
            toast({
                description: result.message, // Show message after create
            });

        } catch (error) {
            toast({
                description: "An error occurred while scheduling the workshop. Please try again.",
            });
        }
    };


    const handleButtonClick = () => {
        fileRef.current.click();
    };

    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className={`${screenWidth > 1024 && "ml-[20rem]"} m-auto w-[24rem] sm:w-[40rem] mt-[5rem] mb-[15rem]`}>
                    <div className='flex flex-col gap-4'>
                        {/* Image Upload */}
                        <div className='relative h-[12rem] w-[20rem] rounded-[8px] overflow-hidden group'>
                            {imgUrl || formData.thumbNail ? (
                                <Image
                                    width={500}
                                    height={500}
                                    src={imgUrl || formData.thumbNail}
                                    className='h-full w-full object-cover rounded-[8px]'
                                    alt="Workshop Image"
                                />
                            ) : (
                                <div className='bg-black h-full w-full grid place-content-center rounded-[8px]'>
                                    <div
                                        className='border-[1px] border-white rounded-full p-4 w-[2rem] h-[2rem] grid place-content-center cursor-pointer active:scale-95 duration-100 transition-all'
                                        onClick={handleButtonClick}
                                    >
                                        <Plus />
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleButtonClick}
                                className='absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300'
                            >
                                <Plus />
                            </button>

                            <input
                                type='file'
                                hidden
                                ref={fileRef}
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Title Input */}
                        <div className='flex flex-col gap-4'>
                            <label htmlFor="title" className='text-[.9rem] '>Workshop Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className='py-2 px-4 sm:w-[30rem] bg-black text-white rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none'
                                placeholder='Title of workshop'
                            />
                        </div>

                        {/* Description Input */}
                        <div className='flex flex-col gap-4'>
                            <label htmlFor="description" className='text-[.9rem] '>Workshop Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className='p-4 sm:w-[30rem] bg-black text-white rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none h-[15rem]'
                                placeholder='About your workshop'
                            />
                        </div>

                        {/* Date and Time */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="time" className='text-[.9rem] '>Workshop Time</label>
                            <div className='flex items-center gap-2'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[15rem] justify-start flex items-center gap-2 px-2 text-left py-2 text-[.8rem] font-normal bg-black rounded-[6px]",
                                                !formData.date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon size={20} />
                                            {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formData.date}
                                            onSelect={handleDateChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className='py-2 px-4 w-[15rem] bg-black text-white rounded-[6px] border-[1px] border-neutral-800 text-[.8rem] outline-none'
                                />
                            </div>
                        </div>

                        {/* Location Input */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="location" className='text-[.9rem] '>Location of Workshop</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className='py-2 px-4 w-[15rem] bg-black text-white rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none'
                                placeholder='Eg: Delhi, India Gate'
                            />
                        </div>

                        {/* Discount Section */}
                        <div className='flex flex-col gap-2'>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="discountOpen"
                                    checked={formData.isDiscount}
                                    onCheckedChange={handleDiscountToggle}
                                    aria-readonly
                                />
                                <label htmlFor="discountOpen" className='text-[.9rem] '>Want Discount?</label>
                            </div>
                            <div className='flex-col sm:flex-row flex items-start gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="price" className='text-[.9rem] '>Original Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className='py-2 px-4 w-[15rem] bg-black text-white rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none'
                                        placeholder='Original Price'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="discountedPrice" className='text-[.9rem] '>Discounted Price</label>
                                    <input
                                        type="text"
                                        name="discountedPrice"
                                        value={formData.discountedPrice}
                                        onChange={handleInputChange}
                                        className={`py-2 px-4 w-[15rem] ${formData.isDiscount ? "bg-black" : "bg-neutral-900"} text-white rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none`}
                                        placeholder='Discounted Price'
                                        disabled={!formData.isDiscount}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tickets Section */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discountToNumberOfTicket" className='text-[.9rem] '>Number of tickets for discount</label>
                            <div>
                                <input
                                    type="text"
                                    name="discountToNumberOfTicket"
                                    value={formData.discountToNumberOfTicket}
                                    onChange={handleInputChange}
                                    className={`py-2 px-4 w-[15rem] ${formData.isDiscount ? "bg-black" : "bg-neutral-900"} text-white rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none`}
                                    placeholder='Eg: 20 tickets get discount'
                                    disabled={!formData.isDiscount}
                                />
                            </div>
                            <label htmlFor="batchSize" className='text-[.9rem] '>Number of tickets you want to sell</label>
                            <input
                                type="text"
                                name="batchSize"
                                value={formData.batchSize}
                                onChange={handleInputChange}
                                className={`py-2 px-4 w-[15rem] text-white bg-black rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none`}
                                placeholder='Eg: Max 20 tickets can be sold'
                            />
                        </div>
                        <div className='flex-col sm:flex-row flex items-start gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="language" className='text-[.9rem] '>Language</label>
                                <input
                                    type="text"
                                    name="language"
                                    value={formData.language}
                                    onChange={handleInputChange}
                                    className='py-2 px-4 w-[15rem] bg-black text-white rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none'
                                    placeholder='Eg: English or Hindi'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="duration" className='text-[.9rem] '>Duration Of Wokshop</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className={`py-2 px-4 w-[15rem] bg-black text-white rounded-[8px] border-[1px] border-neutral-800 text-[.8rem] outline-none`}
                                    placeholder='Eg: 1 for 1 hour'
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isSellingClosed"
                                checked={formData.isSellingClosed}
                                onCheckedChange={handleSellingToggle}
                                aria-readonly
                            />
                            <label htmlFor="discountOpen" className='text-[.9rem] '>Do you want to close sell?</label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            onClick={handleSubmit}
                            className='mt-6 py-2 px-4 sm:w-[30rem] bg-red-500 text-white rounded-[8px] text-[.8rem] hover:bg-red-600 active:scale-95 duration-100 transition-all'
                        >
                            {update ? "Update Workshop" : "Schedule Workshop"}
                        </Button>
                    </div>
                </div>
            }
        </>
    );
};

const ScheduleWorkshopPage = () => {
    return (
        <Suspense>
            <SheduleWorkshop />
        </Suspense>
    )
}

export default ScheduleWorkshopPage;
