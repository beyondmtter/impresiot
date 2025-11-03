"use client";
import {
    Calendar,
    ChevronLeft,
    Compass,
    Home,
    Instagram,
    LibraryBig,
    Settings,
    User,
    Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import joinCreator1 from "../../public/joinCreator1.png";
import joinCreator2 from "../../public/joinCreator2.png";
import { usePathname, useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";
import useEmailAPI from "@/fetchAPI/useEmailAPI";
import useScreenWidth from "@/hooks/useScreenWidth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import LogoutDialog from "./LogoutDialog";
import SettingDialog from "./SettingDialog";

const SideBar = () => {
    const screenWidth = useScreenWidth()
    const { sendCreatorRequest } = useEmailAPI();
    const user = useSelector((state) => state.user.userData, shallowEqual);
    const path = usePathname();
    const router = useRouter();

    const [instaProfile, setInstaProfile] = useState("");
    const [youtubeProfile, setYoutubeProfile] = useState("");
    const [activeMenu, setActiveMenu] = useState("home");
    const [continueToSendCreatorReq, setContinueToSendCreatorReq] = useState(false);
    const [openLogout, setOpenLogout] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)
    const [openCreatorReq, setOpenCreatorReq] = useState(false)
    const [creatorSideBar, setCreatorSideBar] = useState(false)
    const [isCreatorRequested, setIsCreatorRequested] = useState(false)

    useEffect(() => {
        if (path == "/creator-studio" && activeMenu !== "profile") {
            setActiveMenu("dashboard")
        }
        if (path ==  "/main") {
            setActiveMenu("home")
        }
        if (path == "/creator-studio/analytic") {
            setActiveMenu("analytic")
        }
        if (path == "/creator-studio/workshop") {
            setActiveMenu("workshop")
        }
        // if(path == "/creator-studio/profile"){
        //     setActiveMenu("profile")
        // }
        if (path == "/profile/update") {
            setActiveMenu("user")
        }
        if (path == "/profile") {
            setActiveMenu("user")
        }
        if (path == "/ticket") {
            setActiveMenu("user")
        }
        if (path == "/ticket/billing") {
            setActiveMenu("user")
        }
        if (path == "/explore") {
            setActiveMenu("explore")
        }
        if (path == "/library") {
            setActiveMenu("library")
        }
        if (path == "/settings") {
            setActiveMenu("settings")
        }

    }, [path])

    useEffect(() => {
        if(user?._id){
            setIsCreatorRequested(user?.isRequestedToCreator)
        }
    },[user])

    useEffect(() => {
        if(path.includes("creator-studio") && !user?.approvedToCreator){
            router.push("/main")
        }
    },[])
    
    const handleSetCreatorSideBar = () => {
        if (path.includes("creator-studio") || path.includes("profile") && creatorSideBar) {
            setCreatorSideBar(true)
        }else {
            setCreatorSideBar(false)
        }
    }

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);

    };

    const handleCreatorReqEmail = async (
        fullName,
        instaProfile,
        youtubeProfile,
        userId
    ) => {
        // const instaUrlRegex = /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/[a-zA-Z0-9(_)?]+\/?$/i;
        // const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(c|channel|user|@|watch\?v=)|youtu\.be\/)[a-zA-Z0-9-_]+\/?$/i;

        // const isInstaUrlValid = instaUrlRegex.test(instaProfile);
        // if (!isInstaUrlValid) {
        //     alert("Please provide a valid Instagram URL.");
        //     return;
        // }

        // const isYoutubeUrlValid = youtubeUrlRegex.test(youtubeProfile);
        // if (!isYoutubeUrlValid) {
        //     alert("Please provide a valid YouTube URL.");
        //     return;
        // }

        await sendCreatorRequest(fullName, instaProfile, youtubeProfile, userId);
        setIsCreatorRequested(true)
        setOpenCreatorReq(false);
    };


    return (
        <>
            <section
                id="menu"
                className={`${path === "/" || path.includes("auth") || path.includes("legal-policies") || path.includes("contact") ? "hidden" : "block"
                    }  fixed ${screenWidth > 1024 ? "top-[4rem] w-[15rem] h-[35rem] border-r-[1px] border-neutral-800" : "bottom-0 w-full h-[5rem] bg-black z-10"}  p-[1rem]`}
            >
                {(!path.includes("creator-studio") && !creatorSideBar) &&
                    <>
                        <div className={`${screenWidth > 1024 ? "flex" : "hidden"} flex-col gap-[1rem]`}>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'home' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('home')
                                    router.push("/main")
                                }}
                                aria-label="Home"
                            >
                                <div className='py-2 flex px-2 gap-4 items-center w-[8rem] text-[.9rem]'>
                                    <Home strokeWidth={1.4} size={20} />
                                    Home
                                </div>
                            </div>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'explore' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('explore')
                                    router.push("/explore")
                                }}
                                aria-label="Explore"
                            >
                                <div className='py-2 flex px-2 gap-4 items-center w-[8rem] text-[.9rem]'>
                                    <Compass strokeWidth={1.4} size={20} />
                                    Explore
                                </div>
                            </div>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'library' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('library')
                                    router.push("/library")
                                }}
                                aria-label="Library"
                            >
                                <div className='py-2 flex px-2 gap-4 items-center w-[8rem] text-[.9rem]'>
                                    <LibraryBig strokeWidth={1.4} size={20} />
                                    Library
                                </div>
                            </div>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'user' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('user')
                                    router.push("/profile/update")
                                    handleSetCreatorSideBar()
                                }}
                                aria-label="Settings"
                            >
                                <div className='py-2 flex px-2 gap-4 items-center w-[8rem] text-[.9rem]'>
                                    <Settings strokeWidth={1.4} size={20} />
                                    Setting
                                </div>
                            </div>
                        </div>
                        <div className={`${screenWidth > 1024 ? "hidden" : "flex"} justify-center w-full px-[2rem] gap-[2rem]`}>
                            <div
                                className='py-2 flex px-2 gap-4 justify-center w-[8rem] font-medium '
                                onClick={() => {
                                    router.push("/main")
                                    handleMenuClick('home')
                                }}
                            >
                                <Home strokeWidth={1.4} size={20} color={activeMenu === 'home' ? '#d33c3c' : 'white'} />
                            </div>
                            <div
                                className='py-2 flex px-2 gap-4 justify-center w-[8rem] font-medium '
                                onClick={() => {
                                    router.push("/explore")
                                    handleMenuClick('explore')
                                }}
                            >
                                <Compass strokeWidth={1.4} size={20} color={activeMenu === 'explore' ? '#d33c3c' : 'white'} />
                            </div>
                            <div
                                className='py-2 flex px-2 gap-4 justify-center w-[8rem] font-medium '
                                onClick={() => {
                                    handleMenuClick('library')
                                    router.push("/library")
                                }}
                            >
                                <LibraryBig strokeWidth={1.4} size={20} color={activeMenu === 'library' ? '#d33c3c' : 'white'} />
                            </div>
                            <div
                                className='py-2 flex px-2 gap-4 items-center w-[8rem] font-medium'

                            >
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild onClick={() => handleMenuClick('user')}>
                                        <User strokeWidth={1.4} size={20} color={activeMenu === 'user' ? '#d33c3c' : 'white'} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={"bg-black border-[1px] font-medium border-neutral-800 text-white w-[12rem]"}>
                                        {user?.approvedToCreator &&
                                            <DropdownMenuItem onClick={() => router.push(`/creator-studio`)}>Creator Studio</DropdownMenuItem>
                                        }
                                        <DropdownMenuItem onClick={() => router.push(`/profile/${user?._id}`)}>Profile</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/profile/update`)}>Update</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setOpenSetting(true)}>Setting</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push("/ticket")}>Tickets</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/ticket/billing")}>Billing</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push("/contact")}>Contact</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setOpenLogout(true)}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                    </>
                }
                {(path.includes("creator-studio") || creatorSideBar) &&
                    <>
                        <div className={`${screenWidth > 1024 ? "flex" : "hidden"} flex-col gap-[1rem]`}>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'dashboard' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('dashboard')
                                    router.push("/creator-studio")
                                }}
                                aria-label="Dashboard"
                            >
                                <div className='py-2 flex px-2 gap-4 w-[8rem] items-center text-[.9rem]'>
                                    <Home strokeWidth={1.4} size={20} />
                                    Dashboard
                                </div>
                            </div>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'analytic' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('analytic')
                                    router.push("/creator-studio/analytic")
                                }}
                                aria-label="Analytic"
                            >
                                <div className='py-2 flex px-2 gap-4 items-center w-[8rem] text-[.9rem]'>
                                    <Compass strokeWidth={1.4} size={20} />
                                    Analytic
                                </div>
                            </div>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'workshop' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('workshop')
                                    router.push("/creator-studio/workshop")
                                }}
                                aria-label="Workshop"
                            >
                                <div className='py-2 flex px-2 gap-4 items-center w-[8rem] text-[.9rem]'>
                                    <Calendar strokeWidth={1.4} size={20} />
                                    Workshop
                                </div>
                            </div>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'user' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('user')
                                    router.push("/profile/update")
                                    handleSetCreatorSideBar()
                                }}
                                aria-label="Settings"
                            >
                                <div className='py-2 flex px-2 gap-4 items-center w-[8rem] text-[.9rem]'>
                                    <Settings strokeWidth={1.4} size={20} />
                                    Setting
                                </div>
                            </div>
                            <div
                                className={`flex items-center pl-2 w-[12rem] rounded-[10px] cursor-pointer active:scale-95 transition-all duration-100 ${activeMenu === 'profile' ? 'bg-neutral-900' : ''} hover:bg-neutral-900`}
                                onClick={() => {
                                    handleMenuClick('profile')
                                    handleSetCreatorSideBar()
                                    router.push(`/profile/${user?._id}`)
                                }}
                                aria-label="Profile"
                            >
                                <div className='py-2 flex px-2 gap-4 items-center w-[8rem] text-[.9rem]'>
                                    <User strokeWidth={1.4} size={20} />
                                    Profile
                                </div>
                            </div>
                        </div>
                        <div className={`${screenWidth > 1024 ? "hidden" : "flex"} justify-center items-center w-full px-[2rem] gap-[2rem]`}>
                            <div
                                className='py-2 flex px-2 gap-4 justify-center w-[8rem] font-medium '
                                onClick={() => {
                                    router.push("/creator-studio")
                                    handleMenuClick('dashboard')
                                }}
                            >
                                <Home strokeWidth={1.4} size={20} color={`${activeMenu === 'home' ? '#d33c3c' : 'white'}`} />
                            </div>
                            <div
                                className='py-2 flex px-2 gap-4 justify-center w-[8rem] font-medium '
                                onClick={() => {
                                    router.push("/creator-studio/analytic")
                                    handleMenuClick('analytic')
                                }}
                            >
                                <Compass strokeWidth={1.4} size={20} color={`${activeMenu === 'analytic' ? '#d33c3c' : 'white'}`} />
                            </div>
                            <div
                                className='py-2 flex px-2 gap-4 justify-center w-[8rem] font-medium '
                                onClick={() => {
                                    router.push("/creator-studio/workshop")
                                    handleMenuClick('workshop')
                                }}
                            >
                                <Calendar strokeWidth={1.4} size={20} color={`${activeMenu === 'workshop' ? '#d33c3c' : 'white'}`} />
                            </div>
                            <div
                                className='py-2 flex px-2 gap-4 items-center w-[8rem] font-medium'
                            >
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild onClick={() => handleMenuClick('user')}>
                                        <User strokeWidth={1.4} size={20} color={`${activeMenu === 'user' ? '#d33c3c' : 'white'}`} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={"bg-black border-[1px] font-medium border-neutral-800 text-white w-[12rem]"}>
                                        <DropdownMenuItem onClick={() => router.push(`/main`)}>Home</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/profile/${user?._id}`)}>Profile</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push(`/profile/update`)}>Update</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setOpenSetting(true)}>Setting</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push("/ticket")}>Tickets</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/ticket/billing")}>Billing</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push("/contact")}>Contact</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setOpenLogout(true)}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </>
                }

                <div className={`${screenWidth > 1024 ? "flex" : "hidden"}  mt-[6rem]`}>
                    {(path.includes("creator-studio") || creatorSideBar) ? (
                        <button
                            onClick={() => {
                                router.push("/main")
                                setCreatorSideBar(false)
                            }}
                            className="p-4 text-center w-[9rem] rounded-[10px] bg-red-500 cursor-pointer hover:bg-red-600 active:scale-95 transition-all duration-100"
                        >
                            Home
                        </button>
                    ) : (
                        <>
                            {renderButtonBasedOnStatus(user, router, {
                                isCreatorRequested,
                                openCreatorReq,
                                setOpenCreatorReq,
                                continueToSendCreatorReq,
                                setContinueToSendCreatorReq,
                                instaProfile,
                                setInstaProfile,
                                youtubeProfile,
                                setYoutubeProfile,
                                handleCreatorReqEmail,
                            })}
                        </>
                    )}
                </div>
            </section>
            <LogoutDialog open={openLogout} setOpen={setOpenLogout} />
            <SettingDialog open={openSetting} setOpen={setOpenSetting} />
        </>
    );
};

export default SideBar;

const DialogBoxOfJoinCreator = ({
    openCreatorReq,
    setOpenCreatorReq,
    continueToSendCreatorReq,
    setContinueToSendCreatorReq,
    router,
    instaProfile,
    setInstaProfile,
    youtubeProfile,
    setYoutubeProfile,
    handleCreatorReqEmail,
    user,
}) => {
    return (
        <>
            {!user?.isRequestedToCreator && !user?.approvedToCreator &&
                <button
                    onClick={() => setOpenCreatorReq(true)}
                    className="p-4 text-center w-[9rem] rounded-[10px] bg-red-500 cursor-pointer hover:bg-red-600 active:scale-95 transition-all duration-100">
                    Join Creator+
                </button>
            }

            <Dialog open={openCreatorReq} onOpenChange={setOpenCreatorReq}>
                <DialogContent className="sm:max-w-md bg-[#0A0A0A] border-none h-[34rem]">
                    {continueToSendCreatorReq ? (
                        <SocialLinksInput
                            setContinueToSendCreatorReq={setContinueToSendCreatorReq}
                            router={router}
                            instaProfile={instaProfile}
                            setInstaProfile={setInstaProfile}
                            youtubeProfile={youtubeProfile}
                            setYoutubeProfile={setYoutubeProfile}
                            handleCreatorReqEmail={handleCreatorReqEmail}
                            user={user}
                        />
                    ) : (
                        <CreatorBenefits setContinueToSendCreatorReq={setContinueToSendCreatorReq} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

const CreatorBenefits = ({ setContinueToSendCreatorReq }) => (
    <div className="flex flex-col items-center">
        <div className="w-full grid place-items-center">
            <Image
                width={500}
                height={500}
                src={joinCreator1}
                alt="Join Creator 1"
                className="overflow-hidden w-[15rem]"
            />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
            <div className="font-bold text-[1.6rem]">
                Become <span className="font-semibold text-neutral-500">a creator</span>
            </div>
            <div className="text-center text-[.8rem] w-[20rem]">
                With a Creator+ Account, you get access to our Creator Studio which
                contains a range of assets and features to give your Creator Career a
                good start.
            </div>
            <ul className="list-disc pl-5 text-[.8rem] text-neutral-500 mt-4">
                {/* <li>Post your Own Course</li> */}
                <li>Sell you workshop ticket online</li>
                <li>{`Go Live with your followers  (coming soon)`}</li>
                <li>Get Paid</li>
                <li>Receive Regular Stats about your Account and Activity</li>
            </ul>
            <button
                onClick={() => setContinueToSendCreatorReq(true)}
                className="p-2 text-center w-[8rem] rounded-[10px] bg-red-500 cursor-pointer hover:bg-red-600 active:scale-95 transition-all duration-100 mt-4"
            >
                Continue
            </button>
        </div>
    </div>
);

const SocialLinksInput = ({
    setContinueToSendCreatorReq,
    router,
    instaProfile,
    setInstaProfile,
    youtubeProfile,
    setYoutubeProfile,
    handleCreatorReqEmail,
    user,
}) => (
    <div className="flex flex-col items-center">
        <div className="flex flex-col items-start w-full">
        <button onClick={() => setContinueToSendCreatorReq(false)}>
            <ChevronLeft />
        </button>
        </div>
        <div className="w-full grid place-items-center">
            <Image
                width={500}
                height={500}
                src={joinCreator2}
                alt="Join Creator 2"
                className="overflow-hidden w-[15rem]"
            />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
            <div className="font-bold text-[1.6rem]">
                Enter <span className="font-semibold text-neutral-500">Your Social Link</span>
            </div>
            <div className="flex flex-col gap-4 text-[.8rem] text-neutral-500 mt-4 w-[20rem]">
                <SocialLinkInput
                    icon={Instagram}
                    value={instaProfile}
                    setLink={setInstaProfile}
                    placeholder="instagram.com/username"
                />
                <SocialLinkInput
                    icon={Youtube}
                    value={youtubeProfile}
                    setLink={setYoutubeProfile}
                    placeholder="youtube.com/username"
                />
            </div>
            <button
                className="p-2 text-center w-[8rem] rounded-[10px] bg-red-500 cursor-pointer hover:bg-red-600 active:scale-95 transition-all duration-100 mt-4"
                onClick={() =>
                    handleCreatorReqEmail(user?.fullName, instaProfile, youtubeProfile, user?._id)
                }
            >
                Submit
            </button>
        </div>
    </div>
);

const SocialLinkInput = ({ icon: Icon, placeholder, setLink, value }) => (
    <div className="flex gap-2 items-center">
        <Icon color="white" size={32} strokeWidth={1} />
        <input
            className="bg-black outline-none p-2 rounded-[10px] w-full"
            type="text"
            value={value}
            onChange={(e) => setLink(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);


const renderButtonBasedOnStatus = (user, router, dialogProps) => {
    const {
        isCreatorRequested,
        openCreatorReq,
        setOpenCreatorReq,
        continueToSendCreatorReq,
        setContinueToSendCreatorReq,
        instaProfile,
        setInstaProfile,
        youtubeProfile,
        setYoutubeProfile,
        handleCreatorReqEmail,
    } = dialogProps;

    const isRejectedFor3Months = () => {
        if (user?.rejectedToCreator && user?.dateOfReject) {
            const dateOfReject = new Date(user.dateOfReject);
            const currentDate = new Date();
            const threeMonthsLater = new Date(dateOfReject);
            threeMonthsLater.setMonth(dateOfReject.getMonth() + 3);

            return currentDate < threeMonthsLater;
        }
        return false;
    };

    if (isCreatorRequested) {
        return (
            <button className="p-4 text-center w-[9rem] rounded-[10px] bg-red-500 cursor-default">
                Requested
            </button>
        );
    }

    if (user?.rejectedToCreator && isRejectedFor3Months()) {
        return (
            <button className="p-4 text-center w-[9rem] rounded-[10px] bg-neutral-500 cursor-default">
                Rejected
            </button>
        );
    }

    if (user?.approvedToCreator) {
        return (
            <button
                className="p-4 text-center w-[9rem] rounded-[10px] bg-red-500 cursor-pointer hover:bg-red-600 active:scale-95 transition-all duration-100"
                onClick={() => router.push("/creator-studio")}
            >
                Creator Studio
            </button>
        );

    }


    return (
        <DialogBoxOfJoinCreator            
            openCreatorReq={openCreatorReq}
            setOpenCreatorReq={setOpenCreatorReq}
            continueToSendCreatorReq={continueToSendCreatorReq}
            setContinueToSendCreatorReq={setContinueToSendCreatorReq}
            instaProfile={instaProfile}
            setInstaProfile={setInstaProfile}
            youtubeProfile={youtubeProfile}
            setYoutubeProfile={setYoutubeProfile}
            handleCreatorReqEmail={handleCreatorReqEmail}
            user={user}
            router={router}
        />
    );
};
