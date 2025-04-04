import { createWebhookOrder } from "@/actions/order.action";
import { NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req:Request){
   try{
      const signature= await req.headers.get('X-Razorpay-Signature');
      const webhookSecret= process.env.RAZORPAY_WEBHOOK_SECRET!;
      if(!signature){
          throw new Error("Razorpay signature not found!");
      }
      const webhookBody=await req.json();
      const isValidSignature=validateWebhookSignature(JSON.stringify(webhookBody), signature, webhookSecret)
      
      if(!isValidSignature){
         throw new Error("Razorpay Signature is not valid");
      }

      //save the data in our order database
      const {payload} = webhookBody;
      const {id:RazorpaymentId,amount,notes}=payload.payment.entity;
      const {eventId,BuyerId}=notes;
      const totalAmount=amount/100;
      await createWebhookOrder({RazorpaymentId,eventId,BuyerId,totalAmount});
      return NextResponse.json({message:'ok',status:200})
   }catch(e){
      console.log(e);
   }
}