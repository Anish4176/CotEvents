import EventForm from "@/components/shared/EventForm";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getEventById } from "@/actions/event.action";
const CreateEvent = async({params}:any) => {
  const eventId=params.id as string;
  const eventDetails= await getEventById(eventId);
  const { sessionClaims,redirectToSignIn } = await auth();
  const userId= sessionClaims?.userId as string;
  
  return (
    <section className="w-full">
      <div className="h-24 md:h-44 bg-gray-50 flex justify-center items-center">
        <h1 className="heading mx-auto">Update Event</h1>
      </div>
      <div className="wrapper">
        <EventForm event={eventDetails} eventId={eventId} userId={userId} type="Update"/>
      </div>
    </section>
  );
};

export default CreateEvent;
