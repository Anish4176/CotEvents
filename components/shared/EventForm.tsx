"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Dropdown from "./Dropdown";
import FileUploader from "./FileUploader";
import Image from "next/image";

type EventFormProps = {
  userId: string;
  type: string;
};

//EventForm shcema
const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(100, { message: "Must be 100 or fewer characters long" }),
  categoryId: z.string(),
  description: z
    .string()
    .trim()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(400, { message: "Must be 400 or fewer characters long" }),
  location: z
    .string()
    .trim()
    .max(400, { message: "Must be 400 or fewer characters long" })
    .optional(),
  imageUrl: z.string().url({ message: "Must be a valid URL" }),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url({ message: "Must be a valid URL" }),
});

const EventForm = ({ userId, type }: EventFormProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [imgUrl, setimgUrl] = useState<string>("");

  // 1. Default values of the form fields
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      description: "",
      location: "",
      imageUrl: "",
      startDateTime: new Date(),
      endDateTime: new Date(),
      price: "",
      isFree: false,
      url: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-5 md:py-10 md:px-10 px-2 py-5"
      >
        {/* Title and category input */}
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* description and imageUrl input */}
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-[100%] ">
                <FormControl className="h-48">
                  <Textarea
                    placeholder="Event Desctiption"
                    {...field}
                    className="bg-gray-50 border-0 rounded-2xl py-4 px-4 focus:ring-0 focus:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormControl>
                  <FileUploader 
                   imgUrl={imgUrl}
                   setimgUrl={setimgUrl}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location  */}
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-start bg-gray-50 rounded-full pl-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="Location"
                      width={20}
                      height={20}
            
                    />
                    <Input
                      placeholder="Event location or Online"
                      {...field}
                      className="rounded-full h-[54px] focus-visible:ring-offset-0 border-none focus-visible:ring-transparent outline-none shadow-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>
        {/* start and end date */}
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
            <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex h-[50px] items-center justify-start gap-2 bg-gray-50 rounded-full pl-2">
                        <Image
                          src="/assets/icons/clock.svg"
                          alt="startDateTime"
                          width={20}
                          height={20}
                
                        />
                        <p className="whitespace-nowrap">Start Date:</p>
                        <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date!)}
                        showTimeSelect 
                        dateFormat="Pp"
                        className="border-none bg-gray-50 focus:outline-none focus:border-none "
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex h-[50px] items-center justify-start gap-2 bg-gray-50 rounded-full pl-2">
                        <Image
                          src="/assets/icons/clock.svg"
                          alt="startDateTime"
                          width={20}
                          height={20}
                
                        />
                        <p className="whitespace-nowrap">End Date:</p>
                        <DatePicker 
                        selected={endDate} 
                        onChange={(date) => setStartDate(date!)}
                        showTimeSelect 
                        dateFormat="Pp"
                        className="border-none bg-gray-50 focus:outline-none focus:border-none "
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
         </div>

         {/* price and url  */}
         <div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-start bg-gray-50 rounded-full pl-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="Price"
                      width={20}
                      height={20}
            
                    />
                    <Input
                      placeholder="Price"
                      {...field}
                      className="rounded-full h-[54px] focus-visible:ring-offset-0 border-none focus-visible:ring-transparent outline-none shadow-none"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem className="pr-5">
                          <FormControl>
                            <div className="flex items-center justify-start bg-gray-50 rounded-full pl-2 gap-2">
                            <label htmlFor="isFree">isFree</label>
                            <Checkbox id="isFree" />

                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center justify-start bg-gray-50 rounded-full pl-2">
                      <Image
                        src="/assets/icons/link.svg"
                        alt="Url"
                        width={20}
                        height={20}
              
                      />
                      <Input
                        placeholder="URL"
                        {...field}
                        className="rounded-full h-[54px] focus-visible:ring-offset-0 border-none focus-visible:ring-transparent outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EventForm;
