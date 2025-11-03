'use client'
import {EllipsisVertical, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import useUserAPI from '@/fetchAPI/useUserAPI';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import LogoutDialog from './LogoutDialog';
import { setQuery, setSearch } from '@/redux/searchSlice';
import { useDebounce } from 'use-debounce';
import nullAvatar from "../../public/nullAvatar.jpg"
import SettingDialog from './SettingDialog';

const Navbar = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state) => state.user.userData, shallowEqual);
    const stateQuery = useSelector((state) => state.search.query, shallowEqual);

    const [searchQuery, setSearchQuery] = useState('');
    const [query] = useDebounce(searchQuery, 200);
    const { updateSession } = useUserAPI();
    const [openLogout, setOpenLogout] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)

    useEffect(() => {
        dispatch(setQuery(query))
    }, [query])

    useEffect(() => {
        setSearchQuery(stateQuery)
    }, [stateQuery])

    useEffect(() => {
        if (searchQuery) {
            dispatch(setSearch(true))
            return
        }
        dispatch(setSearch(false))
    }, [searchQuery])

    useEffect(() => {
        (async () => {
            if (user?._id) {
                return;
            }
            await updateSession();
        })();
    }, []);


    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);

    };


    return (
        <>
            <div className='flex z-10 w-full h-[4rem] items-center justify-between px-4 pl-2 fixed top-0 bg-[#070707]'>
                <section id='logo' className='sm:w-[20rem]'>
                    <Image src='/logo.png' height={200} width={400} alt='logo' className='w-[8rem] sm:w-[10rem] sm:h-[4rem]' onClick={() => router.push('/main')} />
                </section>
                <section id='menu' className={`${!user?._id ? "hidden" : "block"}`}>
                    <div className='flex bg-black rounded-[8px]'>
                        <input
                            type='text'
                            id='search'
                            name='searchQuery'
                            placeholder='Search for workshop or creator'
                            value={searchQuery}
                            onChange={handleInputChange}
                            className='p-2 w-[10rem] sm:w-[20rem] lg:w-[26rem] bg-black pl-3 outline-none rounded-l-[8px]'
                        />
                        <div className='grid place-items-center bg-black p-2 pr-3 cursor-pointer rounded-r-[8px]'>
                            <Search size={18} className='transform scale-x-[-1] active:scale-95 duration-250 transition-all' />
                        </div>
                    </div>
                </section>
                <section id='profile' className={`${!user?._id ? "hidden" : "sm:flex"} hidden w-[20rem] justify-end`}>
                <div>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Image width={35} height={35} alt='user profile' src={user?.profilePicture || nullAvatar} className='bg-white h-[2rem] w-[2rem] active:scale-95 duration-100 transition-all rounded-[10px] object-cover' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={"bg-black border-[1px] font-medium border-neutral-800 text-white w-[12rem]"}>
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
                
                </section>
                <section id='auth' className={`${!user?._id ? "block" : "hidden"}`}>
                    <div className='flex items-center gap-[2rem] text-[.7rem] sm:text-[.9rem]'>
                        <button onClick={() => router.push("/contact")} className='active:scale-95 duration-100 transition-all'>
                            Contact
                        </button>
                        <button onClick={() => router.push("/auth/login")} className='active:scale-95 duration-100 transition-all'>
                            Sign In
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 rounded-[8px] active:scale-95 duration-100 transition-all"
                            onClick={() => router.push("/auth/signup")}
                        >
                            Sign Up
                        </button>
                    </div>
                </section>
            </div>
            <LogoutDialog open={openLogout} setOpen={setOpenLogout} />
            <SettingDialog open={openSetting} setOpen={setOpenSetting} />
        </>
    );
};

export default Navbar;
