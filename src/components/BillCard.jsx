import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from 'next/navigation'
import useScreenWidth from '@/hooks/useScreenWidth'


const BillCard = ({ bill }) => {
    const screenWidth = useScreenWidth()
    const router = useRouter()
    const formattedDate = new Date(bill.createdAt).toLocaleString()
    return (
        <>
            <div className={`w-[24rem] sm:w-[45rem] border-[1px] border-neutral-900 p-2 px-4 rounded-[8px]`}>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger>
                            <div className='flex gap-[2rem]'>
                                <span>Workshop Title-- {bill.workshopDetails.title.slice(0,20)}
                                </span>
                                <span>Date-- {formattedDate}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="mt-[2rem]">
                            <div className=' flex-col gap-2 sm:gap-0 flex sm:flex-row justify-between'>
                                <div className='flex gap-[1rem] font-medium'>
                                    <div className='flex gap-2'>
                                        Payment Id:
                                        <span>
                                            {bill.paymentId}
                                        </span>
                                    </div>
                                    <div className='flex gap-2'>
                                        Price:
                                        <span>
                                            {bill.price}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    Need help? Contact--
                                    <span>support@impresiot.com</span>
                                </div>
                            </div>
                            <div className='flex gap-4 mt-4'>
                                <button className='text-neutral-800 bg-white py-2 px-4 text-[.8rem] rounded-[8px] active:scale-95 duration-300 transition-all' onClick={(() => router.push(`/main/workshop/${bill.workshopId}`))}>Workshop</button>
                                <button className='text-neutral-800 bg-white py-2 px-4 text-[.8rem] rounded-[8px] active:scale-95 duration-300 transition-all' onClick={() => router.push(`/profile/${bill.creatorId}`)}>Creator</button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
        </>
    )
}

export default BillCard