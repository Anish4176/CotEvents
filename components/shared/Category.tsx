"use client";
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

import { addNewCategory, getAllCategory } from "@/actions/event.action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DropDownProps = {
  onChangeHandler: () => void;
  value: string;
};
type Icategory = {
  _id: string;
  categoryName: string;
};

const Category = () => {
  const [categories, setcategories] = useState<Icategory[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await getAllCategory();
      setcategories(response as Icategory[]);
    };
    getCategories();
  }, []);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // console.log(searchParams.toString())
  const router = useRouter();

  const onFilterCategory = (category: string) => {
    console.log('called')
    const params = new URLSearchParams(searchParams.toString());
    if (category && category != "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={(value) => onFilterCategory(value)} >
      <SelectTrigger className="w-full input">
        <SelectValue placeholder="Filter by Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        {categories.length > 0 &&
          categories.map((item) => (
            <SelectItem key={item._id} value={item.categoryName}>
              {item.categoryName}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Category;
