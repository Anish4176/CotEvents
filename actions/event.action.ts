"use server"

import { connectToDatabase } from "@/database/dbConnect";
import Category from "@/database/models/categoryModel";
import EventModel from "@/database/models/eventModel";
import UserModel from "@/database/models/userModel";
import { handleError } from "@/lib/utils"
import { CreateEventParams } from "@/types";

export const addNewCategory=async(newCategory:string)=>{
    try{
        await connectToDatabase();
        if (!newCategory) {
            throw new Error("Category name cannot be empty.");
        }
        const categoryDocument=await Category.create({
            categoryName:newCategory
        })
        return JSON.parse(JSON.stringify(categoryDocument));

    }catch(e){
        handleError(e);
    }
}
export const getAllCategory=async()=>{
    try{
        await connectToDatabase();
        const categoryDocument=await Category.find();
        return JSON.parse(JSON.stringify(categoryDocument));

    }catch(e){
        handleError(e);
    }
}
export const createEvent=async({event,userId,path}:CreateEventParams)=>{
    try{
        await connectToDatabase();
        const Organizer= await UserModel.find({clerkId:userId});
        if(!Organizer) throw new Error("Organizer not found");

        const EventDocument= await EventModel.create({
           ...event,category:event.categoryId,organizer:userId
        })
        return JSON.parse(JSON.stringify(EventDocument));
    }catch(e){
        handleError(e);
    }
    
}
export const getEventById=async(eventId:string)=>{
    try{
        await connectToDatabase();
        

        const EventDetail= await EventModel.findById({_id:eventId})
        .populate({path:'organizer',select:['firstName','lastName']})
        .populate({path:'category',select:'categoryName'});
        
        if(!EventDetail){
            throw new Error("Event Details not found");
        }
        return JSON.parse(JSON.stringify(EventDetail));
    }catch(e){
        handleError(e);
    }
    
}
export const getAllEvents=async(eventId:string)=>{
    try{
        await connectToDatabase();
        
        const Events= await EventModel.find()
              
        if(!Events){
            throw new Error("Events not found");
        }
        return JSON.parse(JSON.stringify(Events));
    }catch(e){
        handleError(e);
    }
    
}
