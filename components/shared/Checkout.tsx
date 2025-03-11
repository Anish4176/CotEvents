"use client";
import { CreateOrder, verifyRazorpaySignature } from "@/actions/order.action";
import { IEvent } from "@/database/models/eventModel";
import React from "react";
import { Button } from "../ui/button";
import Razorpay from "razorpay";
import Script from "next/script";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const Checkout = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const currentUserId = user?.publicMetadata.userId as string;
  const {
    _id,
    title,
    description,
    location,
    imageUrl,
    startDateTime,
    endDateTime,
    price,
    isFree,
    url,
    category,
    organizer,
  } = event;
  const hasFinishedEvent = new Date(endDateTime) < new Date();

  const handleCheckout = async () => {
    const createOrder = await CreateOrder(event);
    const order = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: createOrder.amount,
      currency: "INR",
      name: "CotEvents",
      order_id: createOrder.id,
      handler: async (response: any) => {
        try {
          console.log(response);
          const razorpay_payment_id = response.razorpay_payment_id;
          const razorpay_signature = response.razorpay_signature;
          const orderId = createOrder.id;
          await verifyRazorpaySignature({
            orderId,
            razorpay_payment_id,
            razorpay_signature,
          });
          
        } catch (e) {
          console.log(e);
        }
      },
      // prefill: {
      //   name: "Gaurav Kumar", //your customer's name
      //   email: "gaurav.kumar@example.com",
      // },
      notes: {
        eventId: _id,
        eventTitle: title,
        BuyerId: currentUserId,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new (window as any).Razorpay(order);
    paymentObject.on("payment.failed", function (response: any) {
      alert(response.error.description);
    });
    paymentObject.open();
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {hasFinishedEvent ? (
        <p className="text-red-600 text-lg font-medium">
          Sorry this event has been closed!
        </p>
      ) : (
        <>
          <SignedIn>
            <Button
              size="lg"
              className="bg-purple-600 rounded-full text-base font-medium"
              onClick={handleCheckout}
            >
              {isFree ? "Get Ticket " : "Buy Now"}
            </Button>
          </SignedIn>
          <SignedOut>
            <Button
              size="lg"
              className="bg-purple-600 rounded-full text-base font-medium"
            >
              <Link href="/sign-in">Get Ticket</Link>
            </Button>
          </SignedOut>
        </>
      )}
    </>
  );
};

export default Checkout;
