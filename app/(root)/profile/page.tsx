import { fetchEventsOfOrganizer } from "@/actions/event.action";
import { fetchBoughtEvents } from "@/actions/order.action";
import EventCollection from "@/components/shared/EventCollection";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/database/models/eventModel";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const page = async ({searchParams}:any) => {
  const OrderPage=searchParams?.OrderPage as string || "1";
  const EventPage=searchParams?.EventPage as string || "1";
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  console.log(userId);
  const OrganizedEvents = await fetchEventsOfOrganizer({
    userId,
    limit: 3,
    page: EventPage,
  });
  // console.log('oye',OrganizedEvents?.totalPages)
  const EventsTickets = await fetchBoughtEvents({
    userId,
    limit:3,
    page: OrderPage,
  });
  console.log(EventsTickets?.totalPages);
  const EventData= EventsTickets?.data.map((item:any)=>(
       item.eventId
  ))
  // console.log(EventData)
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
        <div className="wrapper flex flex-col justify-center items-start gap-5 my-10">
          <EventCollection
            data={EventData}
            type="Ticket_Events"
            emptyTitle="No event tickets purchased yet"
            emptySubTitle="No worries - plenty of exciting events to explore!"
            page={OrderPage}
            totalPages={EventsTickets?.totalPages}
            urlParamName="OrderPage"
          />
        </div>
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
            emptyTitle="No events have been created yet"
            emptySubTitle="Go create some now"
            page={EventPage}
            totalPages={OrganizedEvents?.totalPages}
            urlParamName="EventPage"
          />
        </div>
      </section>
    </>
  );
};

export default page;
