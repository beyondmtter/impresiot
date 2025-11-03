"use client";
import { getWorkshopStatus } from "@/helper/getWorkshopStatus";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useState } from "react";
import DeleteWorkshopDialog from "./DeleteWorkshopDialog";

const EventCard = ({ workshop }) => {
    const path = usePathname()
    const screenWidth = useScreenWidth();
    const router = useRouter();
    const user = useSelector(state => state.user.userData, shallowEqual);
    const { _id, creatorId, title, thumbNail, startDate, isSellingClosed, time, creator } = workshop;
    const formattedDate = new Date(startDate).toLocaleDateString();

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://impresiotclient.vercel.app/main/workshop/${_id}`)
      };

    return (
        <>
        <div className={`relative bg-gradient-to-br flex h-[11rem] from-zinc-900 to-zinc-800 text-white overflow-hidden rounded-md shadow-lg
            ${screenWidth > 1024 ? "w-[40rem]" : "w-full md:w-[30rem]"}`}>
            {/* Content Section */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-medium leading-tight">
                            {title.slice(0, 30) || "Untitled Workshop"}
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Creator - {creator.fullName || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-400">Date - {formattedDate}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={` bg-black text-white font-semibold text-sm rounded-md active:scale-95 duration-100 transition-all h-[2.8rem]`}
                            >
                                <EllipsisVertical size={18} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black border-[1px] font-medium border-neutral-800 text-white w-[12rem]">
                            <DropdownMenuItem
                                className={`${creatorId === user?._id ? "block" : "hidden"}`}
                                onClick={() =>
                                    router.push(`/creator-studio/workshop/schedule?update=1&workshopId=${_id}`)
                                }
                            >
                                Update
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className={`${creatorId === user?._id ? "block" : "hidden"}`}
                                onClick={() => setOpenDeleteDialog(true)}
                                >
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                    onClick={copyToClipboard}
                        
                            >
                                Copy link
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <div>
                        <span className="text-sm font-bold">Workshop Status</span>
                        <span className="text-2xl font-bold text-gray-500 block">
                            {getWorkshopStatus(startDate, time)}
                        </span>
                    </div>
                    <button
                        onClick={() => router.push(`/main/workshop/${_id}`)}
                        className={`${isSellingClosed ? "hidden" : "block"} ${path == "/creator-studio/workshop" ? "hidden" : "block"} w-24 text-center bg-red-500 hover:bg-red-600 text-white active:scale-95 duration-100 transition-all font-semibold text-sm py-2 rounded-lg`}
                    >
                        Join
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className={` ${screenWidth > 1024 ? "w-[45%]" : "w-[30%]"} relative`}>
                <div className="aspect-w-16 aspect-h-9">
                    <Image
                        fill
                        src={thumbNail || "/default-thumbnail.jpg"}
                        alt={title}
                        className="object-cover rounded-r-md"
                    />
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-zinc-900 to-transparent"></div>
            </div>
        </div>
        <DeleteWorkshopDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} workshopId={workshop?._id}/>
        </>
    );
};

export default EventCard;
