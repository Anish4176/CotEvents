"use server"

import { connectToDatabase } from "@/database/dbConnect";
import Category from "@/database/models/categoryModel";
import { handleError } from "@/lib/utils"

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