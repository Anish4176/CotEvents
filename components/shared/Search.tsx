'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


const Search = () => {
  const [searchQuery, setsearchQuery] = useState('');
  const pathname=usePathname();
  const searchParams=useSearchParams();
  // console.log(searchParams.toString())
  const router=useRouter();
  useEffect(() => {
    if(searchQuery){
      const params = new URLSearchParams(searchParams.toString())
      params.set("query", searchQuery)
      console.log(`${pathname}?${params.toString()}`)
      router.push(`${pathname}?${params.toString()}`,{scroll:false})
    }
    else{
      router.push(`${pathname}`,{scroll:false})
    }
   
  }, [searchQuery,router,pathname])
  
  
  return (
    <div className='flex justify-start items-center bg-gray-50 w-full rounded-full px-2'>
     <Image
     src="/assets/icons/search.svg"
     alt='search'
     width={30}
     height={30}
     />
     <Input className='bg-gray-50 rounded-full h-[54px] focus-visible:ring-offset-0 border-none focus-visible:ring-transparent outline-none shadow-none' value={searchQuery} onChange={(e)=>setsearchQuery(e.target.value)}/>
    </div>
  )
}

export default Search