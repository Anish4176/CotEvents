import EventForm from "@/components/shared/EventForm";
import React from "react";
import { auth } from "@clerk/nextjs/server";
const CreateEvent = async() => {
  const { sessionClaims,redirectToSignIn } = await auth();
  const userId= sessionClaims?.userId as string;
  
  return (
    <section className="w-full">
      <div className="h-24 md:h-44 bg-gray-50 flex justify-center items-center">
        <h1 className="heading mx-auto">Create Event</h1>
      </div>
      <div className="wrapper">
        <EventForm userId={userId} type="Create"/>
      </div>
    </section>
  );
};

export default CreateEvent;
