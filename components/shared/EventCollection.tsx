import { IEvent } from "@/database/models/eventModel";
import React from "react";
import Card from "./Card";
type EventCollectionParams = {
  data: IEvent[];
  type: "All_Events" | "Related_Events";
  emptyTitle: string;
};
const EventCollection = ({ data, type, emptyTitle }: EventCollectionParams) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5">
      {data.length > 0 ? (
          data.map((item) => {
            const {_id}=item;           
            return (         
                <Card key={_id} item={item}   />
            )
          }
      )) : (
        <div>
          <h1>{emptyTitle}</h1>
        </div>
      )}
    </div>
  );
};

export default EventCollection;
