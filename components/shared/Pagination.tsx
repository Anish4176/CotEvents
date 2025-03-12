'use client'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
type paginationProps={
    page?:string,
    totalPages:number
    urlParamName?:string
}
const Pagination = ({page,totalPages,urlParamName}:paginationProps) => {
  const router=useRouter();
  const pathname= usePathname();
  const searchparams=useSearchParams()

  const handlePrev = () => {
     const params = new URLSearchParams(searchparams.toString());
     const newPage=Number(page)-1;
     const paramName=urlParamName || 'page';
     params.set(paramName,newPage.toString());
     router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }
  const handelNext = () => {
     const params = new URLSearchParams(searchparams.toString());
     const newPage=Number(page)+1;
     const paramName=urlParamName || 'page';
     params.set(paramName,newPage.toString());
     router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className='w-full flex justify-center items-center gap-5'>
        <Button size="lg" variant="outline"   disabled={Number(page)==1} onClick={handlePrev}>Prev</Button>
        <Button size="lg"  variant="outline"   disabled={Number(page)>=totalPages} onClick={handelNext}>Next</Button>
    </div>
  )
}

export default Pagination