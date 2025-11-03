"use client"
import SearchResult from '@/components/SearchResult';
import useAnalyticAPI from '@/fetchAPI/useAnalyticAPI';
import useScreenWidth from '@/hooks/useScreenWidth';
import { ChartNoAxesCombined, ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import AnalyticTable from '@/components/AnalyticTable';

const Analytic = () => {
    const screenWidth = useScreenWidth()
    const { getAnalyticData, getTicketSales, getWorkshopTableData } = useAnalyticAPI()
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
    const user = useSelector((state) => state.user.userData, shallowEqual);

    const [analyticData, setAnalyticData] = useState()
    const [chartData, setChartData] = useState()
    const [tableData, setTableData] = useState()

    useEffect(() => {
        const getAnalytic = async () => {
            const data = await getAnalyticData(user?._id)
            setAnalyticData(data.analytic)
            const chart = await getTicketSales(user?._id)
            setChartData(chart.chartData)

        }

        if (user?._id) {
            getAnalytic()
        }

    }, [user])

    useEffect(() => {
        const getTableData = async () => {
            const data = await getWorkshopTableData(user?._id)
            setTableData(data.workshops)
        }

        if (user?._id) {
            getTableData()
        }

    }, [user])


    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className={`${screenWidth > 1024 ? "ml-[20rem]" : "flex flex-col items-center mb-[6rem]"} mb-[4rem] mt-[6rem]`}>
                    <div className={` ${screenWidth < 1024 && "flex-col justify-center"} flex gap-8`}>
                        <div className={`w-[24rem] sm:w-[30rem] flex flex-col gap-4`}>
                            <h2 className='text-[1.1rem] font-semibold'>Personal Milestones</h2>
                            <div className='w-full flex justify-between'>
                                {/* <div className='flex flex-col items-center gap-1 bg-[#0E0E0E] w-[8rem] py-4 '>
                                    <span className='text-[.7rem]'>Courses released</span>
                                    <div className='border-[.6rem] border-[#74E657] w-[4rem] h-[4rem] grid place-items-center font-semibold text-[1.1rem] text-[#2CDD00] rounded-full'>
                                        <span>
                                            0
                                        </span>
                                    </div>
                                </div> */}
                                <div className='flex flex-col items-center gap-1 bg-[#0E0E0E] w-[8rem] py-4'>
                                    <span className='text-[.7rem]'>Workshop completed</span>
                                    <div className='border-[.6rem] border-[#E6B657] w-[4rem] h-[4rem] grid place-items-center font-semibold text-[1.1rem] text-[#E79800] rounded-full'>
                                        <span>
                                            {analyticData?.totalWorkshop || 0}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center gap-1 bg-[#0E0E0E] w-[8rem] py-4'>
                                    <span className='text-[.7rem]'>Hours dedicated</span>
                                    <div className='border-[.6rem] border-[#57CCE6] w-[4rem] h-[4rem] grid place-items-center font-semibold text-[1.1rem] text-[#00B6DE] rounded-full'>
                                        <span>
                                            {analyticData?.totalWorkshopHours || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <h2 className='text-[1.1rem] font-semibold'>Monthly Stats</h2>
                            {/* <div className='w-full bg-[#0E0E0E] py-4  h-[15rem]'> */}
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="ticket" fill="var(--color-ticket)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                            {/* </div> */}
                        </div>

                        {/* <div className={`${screenWidth < 560 ? "w-[24rem]" : "w-[20rem]"} m-auto flex flex-col gap-4 `}>
                            <h2 className='text-[1.1rem] font-semibold'>Total Earnings</h2>
                            <div className='bg-[#0E0E0E] p-2 px-4 flex w-full justify-between items-center'>
                                <div>
                                    <span className='text-[1.8rem] font-semibold'>₹: {analyticData?.earnings || 0}</span>
                                    <div className='flex gap-2 items-center text-[#00ff33]'>
                                        <ChevronUp color={"#00ff33"} size={28} />
                                        <span>4434,5</span>
                                        <span className='ml-2'>43.50%</span>
                                    </div>
                                </div>
                                <ChartNoAxesCombined size={30} />
                            </div>
                            <div className='mt-[2rem] flex flex-col gap-4'>
                                <h2 className='text-[1.1rem] font-semibold'>Content Reach</h2>
                                <div className='bg-[#0E0E0E] w-full h-[15rem] p-2 flex flex-col gap-1'>
                                    <div className='flex gap-4 p-2 bg-[#141414]'>
                                        <div className='flex items-center gap-[2rem]'>
                                            <span className='text-[1.2rem] font-bold'>Flag</span>
                                            <span className='font-semibold'>India</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 p-2 bg-[#141414]'>
                                        <div className='flex items-center gap-[2rem]'>
                                            <span className='text-[1.2rem] font-bold'>Flag</span>
                                            <span className='font-semibold'>India</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 p-2 bg-[#141414]'>
                                        <div className='flex items-center gap-[2rem]'>
                                            <span className='text-[1.2rem] font-bold'>Flag</span>
                                            <span className='font-semibold'>India</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 p-2 bg-[#141414]'>
                                        <div className='flex items-center gap-[2rem]'>
                                            <span className='text-[1.2rem] font-bold'>Flag</span>
                                            <span className='font-semibold'>India</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className='max-w-[60rem] mt-[2rem] px-4'>
                        {tableData?.length && (
                            <AnalyticTable tableData={tableData} />
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default Analytic


const chartConfig = {
    ticket: {
        label: "ticket",
        color: "#2563eb",
    },

}