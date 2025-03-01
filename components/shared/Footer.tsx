import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t py-4 h-12 w-[100%]' >
      <div className='wrapper flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-3'>
        <Link href='/'>
        <Image
        src={"/logo.png"}
        alt="logo"
        width={140}
        height={80}
        className="cursor-pointer md:w-40 md:h-12"
        />
        </Link>

        <p>2024 Cotevents All Rights reserved</p>
      </div>

    </footer>
  )
}

export default Footer