'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import React, { useTransition } from "react";
import { Input } from "../ui/input";
import { deleteEventById } from "@/actions/event.action";
import { usePathname } from "next/navigation";

const DeleteConfirmation = ({ id }: { id: string }) => {
  const path=usePathname();
  const [isPending, startTransition]= useTransition();
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Image
            src={"/assets/icons/delete.svg"}
            alt="Delete"
            width={25}
            height={25}
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => startTransition(async()=>await deleteEventById({eventId:id,path})) }>
              {isPending? "Deleting...":'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteConfirmation;
