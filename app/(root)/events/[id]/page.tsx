import { getEventById, getRelatedEvents } from "@/actions/event.action";
import Checkout from "@/components/shared/Checkout";
import EventCollection from "@/components/shared/EventCollection";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: any) => {
  const EventDetails = await getEventById(params.id);
  const {
    _id,
    title,
    description,
    location,
    imageUrl,
    startDateTime,
    endDateTime,
    price,
    isFree,
    url,
    category,
    organizer,
  } = EventDetails;
  const relatedEvents = await getRelatedEvents(category._id, _id); //TODO: we have to also add the pagination

  return (
    <section className="w-full">
      <div className="bg-gray-50 w-full">
        <div className="wrapper py-10 gap-5 md:gap-10 grid grid-cols-1 md:grid-cols-2">
          <div>
            <Image
              src={imageUrl}
              alt="Event Image"
              width={1000}
              height={1000}
              className="object-cover h-full"
            />
          </div>
          <div>
            <div className="flex flex-col justify-center items-start gap-3 md:gap-5  py-5">
              <h1 className="heading">{title}</h1>
              <div className="flex justify-start items-center gap-5">
                <span className="bg-green-100 px-4 py-2 rounded-full text-green-800">
                  {isFree ? "Free" : "₹" + price}
                </span>
                {category.categoryName}
              </div>
              by {organizer.firstName} {organizer.lastName}
              <div>
                <Checkout event={EventDetails} />
              </div>
              <div className="flex gap-3 justify-start items-center">
                <Image
                  src={"/assets/icons/calendar.svg"}
                  alt="Date"
                  width={30}
                  height={30}
                />
                {formatDateTime(startDateTime).dateOnly}
                {" - "}
                {formatDateTime(startDateTime).timeOnly}
              </div>
              <div className="flex gap-3 justify-start items-center">
                <Image
                  src={"/assets/icons/calendar.svg"}
                  alt="Date"
                  width={30}
                  height={30}
                />
                {formatDateTime(endDateTime).dateOnly}
                {" - "}
                {formatDateTime(endDateTime).timeOnly}
              </div>
              <div className="flex gap-3 justify-start items-center">
                <Image
                  src={"/assets/icons/location.svg"}
                  alt="Date"
                  width={30}
                  height={30}
                />
                {location}
              </div>
              <div>
                <h1 className="text-[15px] lg:text-[20px] lg:leading-[2.4rem] tracking-wide font-semibold text-start mb-2">
                  What You'll Learn :
                </h1>
                {description}
              </div>
              <Link className="text-purple-500" href={url}>
                {url}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper flex flex-col justify-center items-start gap-5 my-10">
        <h1 className="text-[15px] lg:text-[20px] lg:leading-[2.4rem] tracking-wide font-semibold text-start mb-2">
          Similar Events
        </h1>
        <EventCollection
          data={relatedEvents}
          type="Related_Events"
          emptyTitle="No Related Events Found!"
        />
      </div>
    </section>
  );
};

export default page;
