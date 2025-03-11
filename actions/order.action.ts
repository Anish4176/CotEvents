"use server";
import EventModel, { IEvent } from "@/database/models/eventModel";
import Razorpay from "razorpay";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { CreateOrderParams, GetOrdersByUserParams } from "@/types";
import { connectToDatabase } from "@/database/dbConnect";
import orderModel from "@/database/models/orderModel";
import mongoose from "mongoose";
type verifyRazorpayProps = {
  orderId: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
export async function CreateOrder(event: IEvent) {
  try {
    let instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = event.isFree ? 0 : Number(event.price) * 100;   //we have to handle the product whose price is 0

    const response = await instance.orders.create({
      amount: amount,
      currency: "INR",
    });
    return JSON.parse(JSON.stringify(response));
  } catch (e) {
    console.log(e);
  }
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
    throw new Error("Razorpay signature mismatch"); 
  }
  redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`) 
}


export async function createWebhookOrder({RazorpaymentId,eventId,BuyerId,totalAmount}:CreateOrderParams) {
  try {
    const createdAt= Date.now();
    const data={RazorpaymentId,eventId,BuyerId,totalAmount,createdAt}
    await connectToDatabase();
    const createOrder=await orderModel.create(data);
    return JSON.parse(JSON.stringify(createOrder));
  } catch (e) {
    console.log(e)
  }
}

export async function fetchBoughtEvents({ userId,limit=4, page=1,}:GetOrdersByUserParams) {
  try {
    await connectToDatabase();
    const skipEventDocument = (Number(page) - 1) * limit;
    const createOrder=await orderModel.find({BuyerId:userId})
    .skip(skipEventDocument)
    .populate({path:"eventId" ,model:"EventModel",populate:[{path: "organizer", select: "_id firstName lastName"},{ path: "category", select: "_id categoryName"}]})
    .limit(limit)

    const TotalEventDocuments = await EventModel.countDocuments({BuyerId:userId});
    return {
      data: JSON.parse(JSON.stringify(createOrder)),
      totalPages: Math.ceil(TotalEventDocuments / limit),
    };
    
  } catch (e) {
    console.log(e)
  }
}

export async function findOrdersByEvent(id:string) {
  try {
    await connectToDatabase();
    const getOrdersDetails=await orderModel.find({eventId:id})
    .populate({path:'eventId',model:'EventModel',select:['title']})
    .populate({path:'BuyerId',model:'UserModel',select:['firstName','email']})
    return JSON.parse(JSON.stringify(getOrdersDetails));
    
  } catch (e) {
    console.log(e)
  }
}