"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = ({placeholder}:{placeholder:string}) => {
  const [searchQuery, setsearchQuery] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // console.log(searchParams.toString())
  const router = useRouter();
  useEffect(() => {
    const timeout = 
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
          params.set("query", searchQuery);
          console.log(`${pathname}?${params.toString()}`);
          console.log('oye',params.get("query"))
        } else {
          params.delete("query");        
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }, 300);
     return () => clearTimeout(timeout);
  }, [searchQuery, router, pathname,searchParams]);

  return (
    <div className="flex justify-start items-center bg-gray-50 w-full rounded-full px-2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={30}
        height={30}
      />
      <Input
        className="bg-gray-50 rounded-full h-[54px] focus-visible:ring-offset-0 border-none focus-visible:ring-transparent outline-none shadow-none"
        value={searchQuery}
        placeholder={placeholder}
        onChange={(e) => setsearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
