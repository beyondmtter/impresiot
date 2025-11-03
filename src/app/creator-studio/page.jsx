"use client"
import AnalyticWorkshopCard from '@/components/AnalyticWorkshopCard';
import CreatorLeaderBoard from '@/components/CreatorLeaderBoard';
import SearchResult from '@/components/SearchResult';
import useAnalyticAPI from '@/fetchAPI/useAnalyticAPI';
import useScreenWidth from '@/hooks/useScreenWidth';
import { ChartNoAxesCombined, ChevronUp, Forward } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';

const Dashboard = () => {
  const screenWidth = useScreenWidth()
  const { getAnalyticData, getRankBoard } = useAnalyticAPI()
  const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
  const user = useSelector((state) => state.user.userData, shallowEqual);

  const [analyticData, setAnalyticData] = useState()
  const [rank, setRank] = useState()

  useEffect(() => {
    const getAnalytic = async () => {
      const data = await getAnalyticData(user?._id)
      setAnalyticData(data.analytic)
      const ranks = await getRankBoard(user?._id)
      setRank(ranks?.rankboard)

    }

    if (user?._id) {
      getAnalytic()
    }

  }, [user])


  return (
    <>
      {isSearch && <SearchResult />}
      {!isSearch &&
        <div className={`${screenWidth > 1024 ? "ml-[20rem]" : "flex justify-center mb-[6rem]"}  mt-[6rem]`}>
          <div className={`${screenWidth < 560 && "w-[24rem] px-4"} flex fixed top-[4rem] z-10 bg-[#070707] h-[4rem] pt-[2rem]`}>
            <div className={`sm:w-[35rem]`}>
              <h1 className='text-[1.1rem] font-semibold'>Summary</h1>
            </div>
            <div className={`${screenWidth < 1024 && "hidden"} px-4`}>
              <h1 className='text-[1.1rem] font-semibold'>Total Earnings</h1>
            </div>
          </div>
          <div className={` flex-col justify-center lg:flex-row flex gap-[2rem]`}>
            <div className='flex flex-col gap-6 mt-[4rem] px-4'>
              <div className='bg-[#0E0E0E] w-[24rem] sm:w-[35rem] p-4'>
                <div className='flex flex-col gap-2'>
                  <div>
                    <span className='text-[.9rem] text-white font-medium'>New followers</span>
                    <div className='flex gap-2 text-[1.6rem] font-semibold items-center'>
                      <ChevronUp color={"#00ff33"} size={28} />
                      {analyticData?.followersGained || 0}
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    {/* <div className='flex justify-between items-center text-[.8rem] text-white'>
                      <span className='text-[.9rem]'>Courses purchase</span>
                      <div className='h-[1px] w-[12rem] sm:w-[20rem] bg-neutral-600' />
                      <span>233</span>
                    </div> */}
                    <div className='flex justify-between items-center text-[.8rem] text-white'>
                      <span className='text-[.9rem]'>Workshop registration</span>
                      <div className='h-[1px] w-[10rem] sm:w-[18rem] bg-neutral-600' />
                      <span>{analyticData?.workshopSold || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <h2 className='text-[1.2rem]'>Most Attendted Workshop</h2>
                {analyticData?.topWorkshops.map((workshop, index) => (
                  <AnalyticWorkshopCard key={index} workshop={workshop} creator={user?.fullName} />
                ))}
                {/* <h2 className='text-[1.2rem]'>Top Selling Course</h2>
                <div>
                  <div className='bg-[#0E0E0E] w-[24rem] sm:w-[35rem] h-[8rem] flex justify-between'>
                    <div className='p-2 pl-4'>
                      <div className='flex flex-col'>
                        <span className='text-[1rem] text-white font-semibold'>Open AI workshop</span>
                        <span className=' text-[.9rem] text-neutral-600'>Sam Altmen</span>
                      </div>
                      <div className='flex gap-4 mt-4'>
                        <div className='flex flex-col items-center gap-1'>
                          <UsersRound size={18} />
                          <span className='text-[.8rem] text-neutral-600'>2.1k</span>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                          <Heart size={18} />
                          <span className='text-[.8rem] text-neutral-600'>2.1k</span>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                          <Forward size={18} />
                          <span className='text-[.8rem] text-neutral-600'>2.1k</span>
                        </div>
                      </div>
                    </div>
                    <div className='bg-white h-[8rem] w-[10rem] sm:w-[15rem]'></div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className=' mt-[4rem] m-auto w-[24rem] sm:w-[20rem]'>
              <div className={`lg:hidden py-4`}>
                <h1 className='text-[1.1rem] font-semibold'>Total Earnings</h1>
              </div>
              <div className='bg-[#0E0E0E] p-2 px-4 flex w-full justify-between items-center'>
                <div>
                  <span className='text-[1.8rem] font-medium'>₹: {analyticData?.earnings || 0}</span>
                  {/* <div className='flex gap-2 items-center text-[#00ff33]'>
                    <ChevronUp color={"#00ff33"} size={28} />
                    <span>4434,5</span>
                    <span className='ml-2'>43.50%</span>
                  </div> */}
                </div>
                <ChartNoAxesCombined size={30} />
              </div>
              <div className='mt-[2.5rem]'>
                <h2 className='text-[1.1rem] font-semibold'>Creator Leaderboard</h2>
                {rank &&
                  <CreatorLeaderBoard top5User={rank?.top5Users} userRank={rank?.userRank} />
                }
                {/* <div className='bg-[#0E0E0E] w-[24rem] sm:w-[20rem] p-2 flex flex-col gap-1'>
                  <div className='flex gap-4 p-2 bg-[#141414]'>
                    <div className='w-[5rem] h-[5rem] bg-white' />
                    <div className='flex flex-col gap-1'>
                      <span className='text-[1.4rem] font-bold'>1st</span>
                      <span className='text-[.9rem] text-neutral-500'>Robert Downy</span>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <div className='flex gap-4 p-2 bg-[#141414] w-[9.4rem]'>
                      <div className='w-[3rem] h-[3rem] bg-white' />
                      <div className='flex flex-col gap-1'>
                        <span className='text-[1.2rem] font-bold'>2nd</span>
                        <span className='text-[.6rem] text-neutral-500'>Robert Downy</span>
                      </div>
                    </div>
                    <div className='flex gap-4 p-2 bg-[#141414] w-[9.4rem]'>
                      <div className='w-[3rem] h-[3rem] bg-white' />
                      <div className='flex flex-col gap-1'>
                        <span className='text-[1.2rem] font-bold'>3rd</span>
                        <span className='text-[.6rem] text-neutral-500'>Robert Downy</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-4 p-2 bg-[#141414]'>
                    <div className='w-[3rem] h-[3rem] bg-white' />
                    <div className='flex flex-col gap-1'>
                      <span className='text-[1.2rem] font-bold'>4th</span>
                      <span className='text-[.6rem] text-neutral-500'>Robert Downy</span>
                    </div>
                  </div>
                  <div className='flex gap-4 p-2 bg-[#141414]'>
                    <div className='w-[3rem] h-[3rem] bg-white' />
                    <div className='flex flex-col gap-1'>
                      <span className='text-[1.2rem] font-bold'>5th</span>
                      <span className='text-[.6rem] text-neutral-500'>Robert Downy</span>
                    </div>
                  </div>
                  <div className='flex gap-4 p-2 bg-[#141414]'>
                    <div className='w-[3rem] h-[3rem] bg-white' />
                    <div className='flex flex-col gap-1'>
                      <span className='text-[1.2rem] font-bold'>203rd</span>
                      <span className='text-[.6rem] text-neutral-500'>Robert Downy</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Dashboard