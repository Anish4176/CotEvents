import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="py-14">
      <div className="flex flex-col md:flex-row justify-around items-center space-y-7 ">
        <div className="md:w-[45%] space-y-4 md:space-y-6 max-md:text-center">
         <h1 className="text-3xl  lg:text-5xl font-semibold ">Discover What's Happening at College Of Technology!</h1>
         <p className="text-base md:text-lg font-medium ">Stay updated with all the latest events, from workshops to cultural fests. Join us and be a part of the excitement!"</p>
         <Button
            size="lg"
         >Explore Events</Button>
        </div>
        <div className="md:w-[45%]">
          <Image 
          src="/HeroBanner.png"
          alt="Banner" 
          width={600} 
          height={600} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
