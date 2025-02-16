import EventForm from "@/components/shared/EventForm";
import React from "react";
import { auth } from "@clerk/nextjs/server";
const CreateEvent = async() => {
  const { sessionClaims,redirectToSignIn } = await auth();
  const userId= sessionClaims?.userId as string;
  
  return (
    <section className="w-full">
      <div>
        <h1 className="heading">Create Event</h1>
      </div>
      <div>
        <EventForm userId={userId} type="Create"/>
      </div>
    </section>
  );
};

export default CreateEvent;
