import { IEvent } from "@/database/models/eventModel";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { boolean } from "zod";
import DeleteConfirmation from "./DeleteConfirmation";
type CardProps = {
  item: IEvent;
  type: "All_Events" | "Related_Events" | "Organized_Events" | "Ticket_Events";
  hasOrderLink: boolean
};
const Card = async ({ item, type,hasOrderLink }: CardProps) => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const isEventOrganizer = userId === (item.organizer?._id as string);
  return (
    <div className="flex relative flex-col gap-5 rounded-lg shadow-md pb-3">
      <div>
        <Image
          src={item.imageUrl}
          alt="image"
          width={500}
          height={200}
          className="h-[200px] object-cover rounded-t-lg"
        />
      </div>
      {isEventOrganizer && (
        <div className="absolute right-3 top-3 bg-white p-2 space-y-2 rounded-md">
          <Link href={`/events/${item?._id}/update`}>
            <Image
              src={"/assets/icons/edit.svg"}
              alt="Edit"
              width={25}
              height={25}
            />
          </Link>

          <DeleteConfirmation id={item?._id} />
        </div>
      )}

      <Link
        href={`/events/${item._id}`}
        className="px-5 pt-2 flex flex-col gap-3 "
      >
        <div className="flex justify-start items-center gap-2">
          {item.price ? (
            <span className="bg-green-100 rounded-2xl p-2">₹{item.price}</span>
          ) : (
            <span className="bg-green-100 rounded-2xl p-2">FREE</span>
          )}

          <span className="bg-gray-100 rounded-2xl p-2">
            {item.category.categoryName}
          </span>
        </div>
        <div className="text-gray-500">
          {formatDateTime(item.startDateTime).dateTime}
        </div>
        <div className="text-xl md:text-xl font-semibold line-clamp-2">
          {item.title}{" "}
        </div>
        <div className="text-gray-500">
          {item.organizer.firstName} {item.organizer.lastName}
        </div>
      </Link>
      {hasOrderLink && <div >
        <Link className="flex justify-end items-center p-3 gap-2" href={`/order/${item?._id}`}>
        <h1 className="text-purple-700">Order Details</h1>
          <Image
          src='/assets/icons/arrow.svg'
          alt='arrow'
          width={10}
          height={10}
          />
        </Link>
      </div>}
    </div>
  );
};

export default Card;
