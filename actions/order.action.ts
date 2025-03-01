"use server";
import { IEvent } from "@/database/models/eventModel";
import Razorpay from "razorpay";
import crypto from "crypto";
import { redirect } from 'next/navigation';
type verifyRazorpayProps = {
  orderId: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
export async function CreateOrder(event: IEvent) {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const amount = event.isFree ? 0 : Number(event.price) * 100;

  const response = await instance.orders.create({
    amount: amount,
    currency: "INR",
  });
  return JSON.parse(JSON.stringify(response));
}
export async function verifyRazorpaySignature({
  orderId,
  razorpay_payment_id,
  razorpay_signature,
}: verifyRazorpayProps) {
  const key_secret = process.env.RAZORPAY_KEY_SECRET!;
  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(orderId + "|" + razorpay_payment_id)
    .digest("hex");
  if (generated_signature !== razorpay_signature) {
    redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`)
    return {
      success: false,
      message: "Signature mismatch",
    };
  }
  redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}`)
  return {    
    success: true,
    message: "Signature verified successfully",
    data: {
      orderId,
      razorpay_payment_id,
      razorpay_signature,
    },
  };
}
