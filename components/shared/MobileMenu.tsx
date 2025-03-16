import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavbarMenu } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MobileMenu = () => {
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/hamburger.png"}
            alt="Hamburger"
            width={35}
            height={40}
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Image src={"/logo.png"} alt="logo" width={130} height={40} />
            </SheetTitle>
            <ul className="flex flex-col items-start pt-10 space-y-6">
              {NavbarMenu.map((item) => {
                return (
                  <Link href={item.link} key={item.title}>
                     <SheetClose asChild> 

                    <li
                      className={`${
                        pathname == item.link ? "text-black" : "text-gray-500"
                      } text-start text-xl font-semibold cursor-pointer hover:text-black`}
                    >
                      {item.title}
                    </li>
                    </SheetClose>
                  </Link>
                );
              })}
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
