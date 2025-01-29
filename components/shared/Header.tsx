'use client'
import Image from "next/image";
import { NavbarMenu } from "@/constants";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { MobileMenu } from "./MobileMenu";


const Header = () => {
  const pathname = usePathname(); 
  return (
    <nav className="w-[100%] py-4  border-b">
      <div className="flex  justify-between items-center w-full h-10 md:h-12">
        {/* logo */}
        <Link href="/">
          <div>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={170}
              height={80}
              className="cursor-pointer md:w-40 md:h-12"
            />
          </div>
        </Link>

        <div className="flex justify-end w-full  items-center">
          {/* navLinks For desktop devices */}
          <div className="w-full max-md:hidden">
            <ul className="flex justify-center items-center md:space-x-14 md:text-xl font-medium cursor-pointer">
              {NavbarMenu.map((item) => {
                // mapping navbarmenu from constants folder
                return (
                <Link href={item.link} key={item.title}>
                <li className={`${pathname==item.link ? "text-black" : "text-gray-500"} hover:text-black`} >{item.title}</li>
                </Link>
                )
              })}
            </ul>
          </div>

          <div className="flex justify-center items-center space-x-2">
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  size="sm"
                  className="rounded-full bg-white border-2 border-black text-black text-base md:text-lg hover:bg-black hover:text-white px-4 py-3 md:px-8 md:py-5"
                >
                  Sign in
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <MobileMenu /> {/* mobile menu */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
