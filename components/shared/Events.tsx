import React from "react";
import EventCollection from "./EventCollection";
import { getAllEvents } from "@/actions/event.action";
import Search from "./Search";

const Events = async({searchParams}:any) => {
  // const query=await searchParams?.query as string || "";
  // console.log('hey',query);
  const query= searchParams?.query;
  console.log('are',query)
  const allEvents=await getAllEvents({
    limit:6,
    category:"",
    query:"",
    page:1
  });

  return (
    <section id="events" className="w-[100%] py-5 md:py-10">
      <div className="wrapper flex flex-col justify-center items-start gap-5">
        <h1 className="text-[24px] lg:text-[33px] lg:leading-[2.4rem] tracking-wide font-bold text-start">
          Trusted by <br /> Thousands of events
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <Search />
          <p>filter</p>
        </div>
        <div className="wrapper w-full flex flex-col justify-center items-start gap-5 my-10">
          <EventCollection
           data={allEvents?.data}
           type="All_Events"
           emptyTitle="No Events Found"
           emptySubTitle="Come back later"
          />
        </div>
      </div>
    </section>
  );
};

export default Events;
