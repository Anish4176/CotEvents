import { fetchEventsOfOrganizer } from "@/actions/event.action";
import EventCollection from "@/components/shared/EventCollection";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const page = async () => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  console.log(userId);
  const OrganizedEvents = await fetchEventsOfOrganizer({
    userId,
    limit: 4,
    page: 1,
  });
  console.log("ohello", OrganizedEvents);
  return (
    <>
      <section className="w-full">
        <div className="h-24 md:h-44 bg-gray-50 flex items-center justify-center ">
          <div
            id="child"
            className="wrapper my-auto flex justify-between items-center w-full"
          >
            <h1 className="heading ">My Tickets</h1>
            <Button>
              <Link href="/#events">Explore More Events</Link>
            </Button>
          </div>
        </div>
        <div className="wrapper">{/* show all tickets  */}</div>
      </section>
      <section className="w-full">
        <div className="h-24 md:h-44 bg-gray-50 flex items-center justify-center ">
          <div
            id="child"
            className="wrapper my-auto flex justify-between items-center w-full"
          >
            <h1 className="heading ">Events Organized</h1>
            <Button>
              <Link href="/events/create">Create New Event</Link>
            </Button>
          </div>
        </div>

        {/* show all organized events by the userId  */}
        <div className="wrapper flex flex-col justify-center items-start gap-5 my-10">
          <EventCollection
            data={OrganizedEvents?.data}
            type="Organized_Events"
            emptyTitle="No Organized Events Found!"
          />
        </div>
      </section>
    </>
  );
};

export default page;
