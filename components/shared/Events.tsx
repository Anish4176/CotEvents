import React from "react";
import EventCollection from "./EventCollection";
import { getAllEvents } from "@/actions/event.action";

const Events = async() => {
  const allEvents=await getAllEvents({
    limit:6,
    category:"",
    query:"",
    page:1
  });
  console.log("results",allEvents);
  return (
    <section id="events" className="w-[100%]">
      <div className="wrapper flex flex-col justify-center items-start gap-5">
        <h1 className="text-[24px] lg:text-[33px] lg:leading-[2.4rem] tracking-wide font-bold text-start">
          Trusted by <br /> Thousands of events
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <p>Events</p>
          <p>filter</p>
        </div>
        <div>
          <EventCollection
           data={allEvents?.data}
           type="All_Events"
           emptyTitle="No Events Found"
          />
        </div>
      </div>
    </section>
  );
};

export default Events;
