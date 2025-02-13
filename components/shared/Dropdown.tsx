import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Input } from "../ui/input";
import { addNewCategory, getAllCategory } from "@/actions/event.action";

type DropDownProps = {
  onChangeHandler: () => void;
  value: string;
};
type Icategory={
    _id:string;
    categoryName:string;
}

const Dropdown = ({ onChangeHandler, value }: DropDownProps) => {
  const [categories, setcategories] = useState<Icategory[]>([]);
  const [newCategory, setnewCategory] = useState<string>("");

  const handleAddCategory = async()=>{
    if(!newCategory){
      console.log("category name cannot be Empty");
      return;
    }
    const response:Icategory=await addNewCategory(newCategory.trim());
    setcategories((prev)=>[...prev,response]);   
  }

  useEffect(() => {
      const getCategories= async()=>{
           const response = await getAllCategory();
           setcategories( response as Icategory[]);
      }
      getCategories();
  }, [])
  
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full input">
        <SelectValue placeholder="Select a Category"/>
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.categoryName}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger>Add Category</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New category</AlertDialogTitle>
              <Input type="text" placeholder="Category Name" value={newCategory} onChange={(e)=>
                setnewCategory(e.target.value)
              }/>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
