"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { todo } from "node:test";
import { useState } from "react";

type imageProps={
  imgUrl:string;
  onChangeHandler:(URL:string)=>void;
}
//i have to come back to this component
export default function FileUploader({imgUrl,onChangeHandler}:imageProps) {
  

  return (
    <>
      {imgUrl ? (
        <div className="h-full w-full flex items-center justify-center border border-dashed border-gray-300 rounded-lg relative">
          <Image 
          src={imgUrl} 
          alt="uploaded image"
           width={250} 
           height={250} 
           className="object-cover rounded-lg" />
          
        </div>
      ) : (
        <UploadDropzone
          className="cursor-pointer"
          endpoint="imageUploader"        
          content={{ label: "Choose an image" }} // Custom text
          onClientUploadComplete={(res) => {
            onChangeHandler(res[0].url);
          }}
          onUploadError={(error: Error) => {
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </>
  );
}
