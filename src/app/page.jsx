"use client"
import React from 'react';
import home_img from "../../public/home_img.png";
import Image from 'next/image';
import { shallowEqual, useSelector } from 'react-redux';
import SearchResult from '@/components/SearchResult';

function Home() {
  const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
  return (
    <>
      {isSearch && <SearchResult />}
      {!isSearch &&
        <div className="bg-black w-screen overflow-hidden flex flex-col items-center mt-[4rem] py-[5rem] gap-[2rem]">
          <div
            className="boujee-text text-transparent font-bold text-5xl sm:text-7xl lg:text-[4rem] text-center p-5"
            style={{
              backgroundImage: 'linear-gradient(90deg, #FF3A3A, #A282FF, #FF3A3A)',
              backgroundSize: '400% 100%',
              WebkitBackgroundClip: 'text',
              animation: 'move-bg 8s linear infinite',
            }}
          >
            Create Without any Limits
          </div>
          <div>
            <div className="sec_text_home text-white font-bold text-lg lg:text-xl mt-4 text-center">
              One stop solution to regulate the
            </div>
            <div className="sec_text_home text-white font-bold text-lg lg:text-xl text-center">
              Creator&apos;s Economy
            </div>
          </div>
          <div className='mb-[10rem]'>
            <Image src={home_img} alt="Home" width={2000} height={1800} className="w-[80rem] mt-8" />
          </div>
        </div>
      }
    </>
  );
}

export default Home;
