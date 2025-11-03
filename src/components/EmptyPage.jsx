import Image from 'next/image'
import React from 'react'
import NoContent from "../../public/NoContent.png"

const EmptyPage = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <Image
          src={NoContent}
          height={400}
          width={400}
          alt='astronoaut on moon with white flag'
          className='w-[12rem]' />
        <span>Look like you haven&apos;t shcheduled anything yet!</span>
      </div>
    </>
  )
}

export default EmptyPage