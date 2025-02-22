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
};
const Card = async ({ item }: CardProps) => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const isEventOrganizer = userId === (item.organizer._id as string);
  return (
    <div className="flex relative flex-col gap-5 rounded-lg shadow-md">
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

          <DeleteConfirmation id={item?._id}/>
        </div>
      )}

      <Link
        href={`/events/${item._id}`}
        className="px-5 py-2 flex flex-col gap-3 pb-5"
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
    </div>
  );
};

export default Card;
