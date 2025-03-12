"use server";

import { connectToDatabase } from "@/database/dbConnect";
import Category from "@/database/models/categoryModel";
import EventModel from "@/database/models/eventModel";
import UserModel from "@/database/models/userModel";
import { handleError } from "@/lib/utils";
import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  UpdateEventParams,
} from "@/types";
import { revalidatePath } from "next/cache";

export const addNewCategory = async (newCategory: string) => {
  try {
    await connectToDatabase();
    if (!newCategory) {
      throw new Error("Category name cannot be empty.");
    }
    const categoryDocument = await Category.create({
      categoryName: newCategory,
    });
    return JSON.parse(JSON.stringify(categoryDocument));
  } catch (e) {
    handleError(e);
  }
};
export const getAllCategory = async () => {
  try {
    await connectToDatabase();
    const categoryDocument = await Category.find();
    return JSON.parse(JSON.stringify(categoryDocument));
  } catch (e) {
    handleError(e);
  }
};
export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    const Organizer = await UserModel.find({ clerkId: userId });
    if (!Organizer) throw new Error("Organizer not found");

    const EventDocument = await EventModel.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath('/');
    return JSON.parse(JSON.stringify(EventDocument));
  } catch (e) {
    handleError(e);
  }
};
export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();

    const EventDetail = await EventModel.findById({ _id: eventId })
      .populate({ path: "organizer", select: ["firstName", "lastName"] })
      .populate({ path: "category", select: "categoryName" });

    if (!EventDetail) {
      throw new Error("Event Details not found");
    }
    return JSON.parse(JSON.stringify(EventDetail));
  } catch (e) {
    handleError(e);
  }
};
export const getCategoryByName = async (categoryName:string) => {
  try {
    const getcategory = await Category.findOne({ categoryName: { $regex: categoryName, $options: 'i' } });
    return JSON.parse(JSON.stringify(getcategory));
  } catch (e) {
    handleError(e);
  }
};
export const getAllEvents = async ({
  limit,
  category,
  query,
  page,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase();
    const queryCondition =query?  {title:{ $regex: query, $options: 'i' } }:{};
    const categoryCondition= category? await getCategoryByName(category):null;

    const conditions={$and:[queryCondition , categoryCondition?{ category: categoryCondition._id } : {}]}
    const skipEventDocument = (Number(page) - 1) * limit;
    const EventsQuery = await EventModel.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipEventDocument)
      .limit(limit)
      .populate({ path: "organizer", select: "_id firstName lastName" })
      .populate({ path: "category", select: "_id categoryName" })
      .lean();

    const TotalEventDocuments = await EventModel.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(EventsQuery)),
      totalPages: Math.ceil(TotalEventDocuments / limit),
    };
  } catch (e) {
    handleError(e);
  }
};
export const deleteEventById = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDatabase();
    const deleteEvent = await EventModel.findByIdAndDelete(eventId);

    revalidatePath(path);
    return;
  } catch (e) {
    handleError(e);
  }
};

export const updateEvent = async ({userId, event, path }: UpdateEventParams) => {
  try {
    await connectToDatabase();
    const EventToupdate= await EventModel.findById(event._id);
    if(!EventToupdate || EventToupdate.organizer.toString()!==userId){
      throw new Error("Unauthorized or event not found")
    }
    const updateEvent = await EventModel.findByIdAndUpdate(event._id,{...event,category: event.categoryId,})
    revalidatePath(path)
    return JSON.parse(JSON.stringify(updateEvent));
  } catch (e) {
    handleError(e);
  }
};

export const getRelatedEvents = async (categoryId:string,eventId:string) => {
  try {
    await connectToDatabase();
    const relatedEvents = await EventModel.find({category:categoryId ,_id:{$ne:eventId}}).populate({path:'category'}).populate({path:'organizer',select:"firstName lastName"});
    return JSON.parse(JSON.stringify(relatedEvents));
  } catch (e) {
    handleError(e);
  }
};

export const fetchEventsOfOrganizer = async ({
  userId,
  limit=3,
  page
}: GetEventsByUserParams) => {
  try {
    await connectToDatabase();
    const conditions={organizer:userId};
    const skipEventDocument = (Number(page) - 1) * limit;
    const EventsQuery = await EventModel.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipEventDocument)
      .limit(limit)
      .populate({ path: "organizer", select: "_id firstName lastName" })
      .populate({ path: "category", select: "_id categoryName" })
      .lean();

    const TotalEventDocuments = await EventModel.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(EventsQuery)),
      totalPages: Math.ceil(TotalEventDocuments / limit),
    };
  } catch (e) {
    handleError(e);
  }
};