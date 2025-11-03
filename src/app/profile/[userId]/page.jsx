"use client";
import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ProfileWorkshopCard from "@/components/ProfileWorkshopCard";
import ProfileCoursesCard from "@/components/ProfileCoursesCard";
import nullAvatar from "../../../../public/nullAvatar.jpg"
import NoContent from "../../../../public/NoContent.png"
import youtubeicon from "../../../../public/youtube-icon.png";
import instaicon from "../../../../public/instagram-icon.png";
import twittericon from "../../../../public/twitter-icon.png";
import facebookicon from "../../../../public/facebook-icon.png";
import useUserAPI from "@/fetchAPI/useUserAPI";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import useWorkshopAPI from "@/fetchAPI/useWorkshopAPI";
import { shallowEqual, useSelector } from "react-redux";
import LogoutDialog from "@/components/LogoutDialog";
import useFollowAPI from "@/fetchAPI/useFollowAPI";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import ProfileWorkshopCardSkeleton from "@/components/skeleton/ProfileWorkshopCardSkeleton";
import SearchResult from "@/components/SearchResult";
import SettingDialog from "@/components/SettingDialog";
import useScreenWidth from "@/hooks/useScreenWidth";

const Profile = () => {
  const screenWidth = useScreenWidth()
  const router = useRouter();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.user.userData, shallowEqual);
  const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);

  const { handleFollow, getUserFollowers } = useFollowAPI()
  const { getUser } = useUserAPI();
  const { getCreatorWorkshops } = useWorkshopAPI();
  const [openLogout, setOpenLogout] = useState(false)
  const [userData, setUserData] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [userFollower, setUserFollower] = useState();
  const [userFollowing, setUserFollowing] = useState();
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollower, setIsFollower] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser(userId);
      setUserData(user);
      setFollower(user?.followers)
      setFollowing(user?.following)
    };
    fetchWorkshops()

    if (userId) {
      fetchUserData();
      handleGetUserFollower(userId)
    }
  }, [userId]);

  useEffect(() => {
    const checkIsFollow = () => {
      const check = userFollower?.filter((user) => currentUser?._id === user.followerId);
      if (check.length) {
        setIsFollower(true)
      }
    };

    if (userFollower && Array.isArray(userFollower)) {
      checkIsFollow();
    }

  }, [userFollower]);

  const fetchWorkshops = async () => {
    setLoading(true)
    const { workshops } = await getCreatorWorkshops(userId, true);
    setWorkshops(workshops || []);
    setLoading(false)
  };

  const handleFollowClick = async () => {
    if (!currentUser?._id || !userId) {
      console.error("User IDs are required for follow operation");
      return;
    }

    const result = await handleFollow(currentUser?._id, userId);
    if (result?.success) {
      if (result?.unfollowed) {
        setFollower(prev => prev - 1);
      } else {
        setFollower(prev => prev + 1);
      }
      if (!isFollower) {
        setIsFollower(true)
      } else {
        setIsFollower(false)
      }
    }
  }

  const handleGetUserFollower = async () => {
    const follower = await getUserFollowers(userId)
    setUserFollower(follower)
  }

  if (!userData) {
    return <ProfileSkeleton />;
  }


  return (
    <>
      {isSearch && <SearchResult />}
      {!isSearch &&
        <div className={`flex gap-4 mt-[6rem] ${screenWidth > 1024 ? "ml-[20rem]" : "m-auto"} mb-[4rem] w-[24rem] sm:w-[44rem] `}>
          {/* Profile Picture */}
          <div id="profilePic">
            <div className="w-[5rem] hidden lg:block h-[5rem] rounded-full">
              <Image
                src={userData.profilePicture || nullAvatar}
                alt="Profile Picture"
                width={400}
                height={400}
                className="w-[5rem] h-[5rem] object-cover rounded-full"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div id="profileInfo" className="flex flex-col gap-4">
            <div className="flex items-center gap-4 justify-between w-full">
              <div className="flex items-center gap-2">
                <Image
                  src={userData.profilePicture || nullAvatar}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="w-[5rem] h-[5rem] object-cover rounded-full lg:hidden"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-white text-[1.5rem]">{userData.fullName}</span>
                  {userData?.setting?.showContact &&
                    <span className="text-neutral-500">{userData.email}</span>
                  }
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className='flex items-center gap-2'>
                  {currentUser?._id !== userData?._id && userData?.approvedToCreator &&
                    <button className={`bg-white text-black hidden sm:flex px-4 py-2 active:scale-95 duration-100 transition-all font-semibold text-[.9rem] rounded-[5px]`} onClick={handleFollowClick}>
                      {isFollower ? "Following" : "Follow"}
                    </button>
                  }
                  {userId === currentUser?._id &&
                    <DropdownMenu >
                      <DropdownMenuTrigger asChild>
                        <button className='bg-black text-white px-2 py-2 font-semibold active:scale-95 duration-100 transition-all text-[.9rem] rounded-[5px] outline-none '><EllipsisVertical /></button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className={"bg-black border-[1px] font-medium border-neutral-800 text-white w-[12rem]"}>
                        <DropdownMenuItem onClick={() => router.push('update')}>Update</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenSetting(true)}>Setting</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push("/ticket")}>Tickets</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/ticket/billing")}>Billing</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setOpenLogout(true)}>Logout</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }

                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 items-center">
              <div className="px-4 py-3 text-[.8rem] flex gap-2 bg-[#202020] sm:w-[10rem] justify-center rounded-[4px]">
                Followers <span>{follower}</span>
              </div>
              <div className="px-4 py-3 text-[.8rem] flex gap-2 bg-[#202020] sm:w-[10rem] justify-center rounded-[4px]">
                Following <span>{following}</span>
              </div>
              {currentUser?._id !== userData?._id &&
                <button className='bg-white sm:hidden text-black px-4 py-2 active:scale-95 duration-100 transition-all font-semibold text-[.9rem] rounded-[5px] ' onClick={handleFollowClick}>{isFollower ? "Following" : "Follow"}</button>
              }
            </div>

            {/* About */}
            {userData?.setting?.showAbout &&
              <div>
                <p className="text-neutral-200 text-[.9rem]">{userData.about || "No bio available"}</p>
              </div>
            }

            {/* Social Links */}
            {userData?.setting?.showSocialLink &&
              <div className="flex flex-col gap-2">
                <div className="flex justify-between mt-2">
                  <div className="font-bold text-[.9rem]">Connect with me</div>
                </div>
                <div className="flex gap-4">
                  {userData.socialLinks?.instagram && (

                    <Link href={userData.socialLinks.instagram} target="_blank" className="px-3 py-2 flex gap-2 bg-zinc-900 justify-center cursor-pointer items-center rounded-[4px]">
                      <Image src={instaicon} alt="Instagram" width={15} height={15} />
                      Instagram
                    </Link>
                  )}
                  {userData.socialLinks?.twitter && (
                    <Link href={userData.socialLinks.twitter} target="_blank" className="px-3 py-2 flex gap-2 bg-zinc-900 justify-center cursor-pointer  items-center rounded-[4px]">
                      <Image src={twittericon} alt="Twitter" width={20} height={20} />
                      Twitter
                    </Link>
                  )}
                  {userData.socialLinks?.facebook && (
                    <Link href={userData.socialLinks.facebook} target="_blank" className="px-3 py-2 flex gap-2 bg-zinc-900 justify-center cursor-pointer items-center rounded-[4px]">
                      <Image src={facebookicon} alt="Facebook" width={20} height={20} />
                      Facebook
                    </Link>
                  )}
                  {userData.socialLinks?.youtube && (
                    <Link href={userData.socialLinks.youtube} target="_blank" className="px-3 py-2 flex gap-2 bg-zinc-900 justify-center cursor-pointer items-center rounded-[4px]">
                      <Image src={youtubeicon} alt="Youtube" width={20} height={20} />
                      Youtube
                    </Link>
                  )}
                </div>
              </div>
            }

            {/* Workshops */}
            <div className="flex flex-col w-full sm:w-[38rem] gap-4">
              <div className="font-bold mt-2">Upcoming Workshops</div>
              <div className="flex flex-wrap gap-4">
                {!workshops.length && !loading &&
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
                {!workshops && <ProfileWorkshopCardSkeleton />}
                {workshops.map((workshop) => (
                  <ProfileWorkshopCard
                    key={workshop._id}
                    workshop={workshop}
                  />
                ))}

              </div>
            </div>

            {/* Courses */}
            {/* <div className="flex flex-col gap-2">
            <div className="font-bold mt-2">Courses</div>
            <div className="flex flex-wrap justify-center gap-4">
              <ProfileCoursesCard />
              <ProfileCoursesCard />
            </div>
          </div> */}
          </div>
        </div>
      }
      <LogoutDialog open={openLogout} setOpen={setOpenLogout} />
      <SettingDialog open={openSetting} setOpen={setOpenSetting} />
    </>
  );
};

export default Profile;
