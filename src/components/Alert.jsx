import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Bell } from 'lucide-react'

const Alert = () => {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <button className='flex items-center justify-around w-[6rem] bg-black p-2 pr-2 cursor-pointer text-[.8rem] rounded-[8px] active:scale-95 duration-100 transition-all'>
                        <Bell size={18} />
                        Alerts
                    </button>
                </PopoverTrigger>
                <PopoverContent className='bg-black border-none text-white w-[22rem]'>
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList className="bg-black">
                            <TabsTrigger className="mx-2" value="all">All</TabsTrigger>
                            <TabsTrigger className="mx-2" value="workshop">Workshop</TabsTrigger>
                            <TabsTrigger className="mx-2" value="live">Live</TabsTrigger>
                            <TabsTrigger className="mx-2" value="course">Course</TabsTrigger>
                        </TabsList>
                        <div className='mt-[2rem] w-[20rem]'>
                            <TabsContent value="all"
                                className="flex flex-col gap-4">
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                            </TabsContent>
                            <TabsContent value="workshop"
                                className="flex flex-col gap-4">
                                <Notification />
                                <Notification />
                                <Notification />
                            </TabsContent>
                            <TabsContent value="live"
                                className="flex flex-col gap-4">
                                <Notification />
                                <Notification />
                            </TabsContent>
                            <TabsContent value="course"
                                className="flex flex-col gap-4">
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                            </TabsContent>
                        </div>
                    </Tabs>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default Alert

const Notification = () => {
    return (
        <div className='flex items-baseline justify-between'>
            <div className='flex items-center gap-6'>
                <div className='w-[2rem] h-[2rem] rounded-full bg-white ' />
                <div className='flex flex-col'>
                    <span className='font-medium'>username</span>
                    <span className='text-neutral-500 text-[.8rem]'>notification</span>
                </div>
            </div>
            <span className='italic text-[.8rem]'>2 hours ago</span>
        </div>
    )
}