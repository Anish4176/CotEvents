import EventForm from "@/components/shared/EventForm";
import React from "react";
import { auth } from "@clerk/nextjs/server";
const CreateEvent = async() => {
  const {userId}= await auth();
  if(!userId){
    return <div>Please Signin to create a event</div>
  }
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
