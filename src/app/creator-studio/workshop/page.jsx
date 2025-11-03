"use client";
import EmptyPage from '@/components/EmptyPage';
import EventCard from '@/components/EventCard';
import SearchResult from '@/components/SearchResult';
import Workshop from '@/components/Workshop';
import EventCardSkeleton from '@/components/skeleton/EventCardSkeleton';
import useWorkshopAPI from '@/fetchAPI/useWorkshopAPI';
import useScreenWidth from '@/hooks/useScreenWidth';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const CreatorStudio = () => {
  const screenWidth = useScreenWidth()
  const router = useRouter();
  const user = useSelector(state => state.user.userData, shallowEqual)
  const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCreatorWorkshops } = useWorkshopAPI();


  useEffect(() => {
    const fetchWorkshops = async () => {
      setLoading(true);
      const { workshops } = await getCreatorWorkshops(user?._id);
      setWorkshops(workshops || []);
      setLoading(false);
    };

    fetchWorkshops();
  }, [user?._id]);

  return (
    <>
      {isSearch && <SearchResult />}
      {!isSearch &&
        <div className={`${screenWidth > 1024 ? "ml-[20rem]" : " justify-center px-[2rem]"} mb-[4rem] mt-[6rem] flex items-center`}>

          {!loading && workshops.length === 0 ? (
            <div className={`${screenWidth > 1024 && "ml-[12rem]"} flex flex-col items-center gap-4`}>
              <EmptyPage />
              <button
                className='bg-red-500 flex gap-4 py-2 px-2 text-[.8rem] items-center justify-center rounded-[8px] active:scale-95 duration-100 transition-all'
                onClick={() => router.push("/creator-studio/workshop/schedule")}
              >
                <Plus />
                Schedule Workshop
              </button>
            </div>
          ) : (
            <div className='w-full px-4'>
              <div className='flex justify-between items-center'>
                <h2 className='font-semibold'>Scheduled Workshops</h2>
                <button
                  className='bg-black flex gap-4 py-2 px-2 text-[.8rem] items-center justify-center rounded-[8px] active:scale-95 duration-100 transition-all'
                  onClick={() => router.push("/creator-studio/workshop/schedule")}
                >
                  <Plus />
                  Schedule Workshop
                </button>
              </div>
              <div className='flex flex-col gap-4 mt-[4rem]'>
                {loading &&
                  <>
                    <EventCardSkeleton />
                    <EventCardSkeleton />
                  </>
                }
                {workshops.map((workshop) => (
                  screenWidth >= 768 ?
                    <EventCard
                      key={workshop._id}
                      workshop={workshop}
                    />
                    :
                    <Workshop
                      key={workshop._id}
                      workshop={workshop}
                    />

                ))}
              </div>
            </div>
          )}
        </div>
      }
    </>
  );
};

export default CreatorStudio;
