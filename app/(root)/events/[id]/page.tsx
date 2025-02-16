import { getEventById } from "@/actions/event.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const page = async ({ params }: any) => {
  const EventDetails = await getEventById(params.id);
  const {
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
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <Image src={imageUrl} alt="Event Image" width={1000} height={1000} />
        </div>
        <div>
          <div className="flex flex-col justify-center items-start gap-5  py-5">
            <h1 className="heading">{title}</h1>
            <div className="flex justify-start items-center gap-5">
              <span className="bg-green-100 px-4 py-2 rounded-full text-green-800">
                {isFree? "Free":price}
              </span>
              {category.categoryName}
            </div>
            by {organizer.firstName} {organizer.lastName}
          
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
            <h1 className="heading">What You'll Learn</h1>
            {description}
          </div>
          {url}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
