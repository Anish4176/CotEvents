import { IEvent } from "@/database/models/eventModel";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
type EventCollectionParams = {
  data: IEvent[];
  type: "All_Events" | "Related_Events" | "Organized_Events" | "Ticket_Events";
  emptyTitle: string;
  emptySubTitle?:string;
  page?:string;
  totalPages?:number ;
  urlParamName?:string;
};
const EventCollection = ({ data, type, emptyTitle,emptySubTitle,page,totalPages=0 ,urlParamName}: EventCollectionParams) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5">
          {data.map((item) => {
            const { _id } = item;
            const hasOrderLink = type == "Organized_Events";
            return (
              <Card
                key={_id}
                item={item}
                type={type}
                hasOrderLink={hasOrderLink}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray-50 wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="text-2xl font-bold">{emptyTitle}</h3>
          <p className="text-base">{emptySubTitle}</p>
        </div>
      )}

      {totalPages>1 && 
        <div className="w-full">
          <Pagination page={page} totalPages={totalPages} urlParamName={urlParamName}/>
        </div>
      }
    </>
  );
};

export default EventCollection;
