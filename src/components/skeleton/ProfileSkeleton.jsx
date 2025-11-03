import React from 'react';
import { Skeleton } from '../ui/skeleton';
import ProfileWorkshopCardSkeleton from './ProfileWorkshopCardSkeleton';
import useScreenWidth from '@/hooks/useScreenWidth';

const ProfileSkeleton = () => {
  const { screenWidth } = useScreenWidth()
  return (
    <>
      <div
        className={`flex gap-4 mt-[6rem] ${screenWidth > 1024 ? 'ml-[20rem]' : 'm-auto'
          } w-[22rem] sm:w-[40rem]`}
      >
        {/* Profile Picture */}
        <div id="profilePic">
          <div className="w-[5rem] hidden lg:block h-[5rem] rounded-full">
            <Skeleton className="w-[5rem] h-[5rem] rounded-full" />
          </div>
        </div>

        {/* Profile Info */}
        <div id="profileInfo" className="flex flex-col gap-4 w-[20rem] sm:w-full">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-[5rem] h-[5rem] object-cover rounded-full lg:hidden" />
              <div className="flex flex-col gap-1">
                <Skeleton className="w-[10rem] h-[1.5rem] rounded-md" /> {/* Full Name */}
                <Skeleton className="w-[13rem] h-[1rem] rounded-md" /> {/* Email */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-[8rem] h-[2.5rem] rounded-md hidden sm:flex" /> {/* Follow Button */}
              <Skeleton className="w-[2.5rem] h-[2.5rem] rounded-md" /> {/* Ellipsis Button */}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 items-center">
            <Skeleton className="px-4 py-3 text-[.8rem] flex gap-2 w-[10rem] h-[2rem] rounded-[4px]" />
            <Skeleton className="px-4 py-3 text-[.8rem] flex gap-2 w-[10rem] h-[2rem] rounded-[4px]" />
            <Skeleton className=" sm:hidden px-4 py-2 w-[8rem] h-[2.5rem] rounded-[5px]" />
          </div>

          {/* About Section */}
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-[1rem] rounded-md" />
            <Skeleton className="w-full h-[1rem] rounded-md" />
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between mt-2">
              <Skeleton className="w-[10rem] h-[1.5rem] rounded-md" /> {/* Connect with me text */}
            </div>
            <div className="flex gap-4">
              <Skeleton className="px-3 py-2 flex gap-2 w-[8rem] h-[2.5rem] rounded-[4px]" />
              <Skeleton className="px-3 py-2 flex gap-2 w-[8rem] h-[2.5rem] rounded-[4px]" />
              <Skeleton className="px-3 py-2 flex gap-2 w-[8rem] h-[2.5rem] rounded-[4px]" />
              <Skeleton className="px-3 py-2 flex gap-2 w-[8rem] h-[2.5rem] rounded-[4px]" />
            </div>
          </div>

          {/* Upcoming Workshops */}
          <div className="flex flex-col gap-4">
            <div className="font-bold mt-2">
              <Skeleton className="w-[10rem] h-[1.5rem] rounded-md" /> {/* Upcoming Workshops text */}
            </div>
            <div className="flex flex-wrap gap-4">
              <ProfileWorkshopCardSkeleton />
              <ProfileWorkshopCardSkeleton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
