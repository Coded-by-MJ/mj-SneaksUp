"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Menu, X, Truck, Heart, User } from "lucide-react";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { collectionLinks } from "@/utils/links";
import Link from "next/link";
import { Button } from "../ui/button";
import React, { useState } from "react";
import MobileNavbar from "./MobileNavbar";

export const CollectionLinks = () => {
  return (
    <div className="flex gap-4 items-start lg:items-center max-lg:w-full flex-col lg:flex-row">
      {collectionLinks.map((link) => (
        <Button
          asChild
          key={link.label}
          variant={"link"}
          className="rounded-none p-2.5 text-white bg-transparent capitalize font-light text-sm md:text-base"
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </div>
  );
};

export const UserLinks = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <div className="flex gap-4 items-center">
        {children}
        <FavoritesIcon />
        <OrdersIcon />
        <UserIcon />
        <Button
          asChild
          onClick={toggleMenu}
          className="p-0 lg:hidden cursor-pointer text-white size-6 rounded-none bg-transparent"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {isMenuOpen && <MobileNavbar />}
    </>
  );
};

const FavoritesIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={"/favorites"}>
            <Heart className="text-white size-6" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Favorites</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const OrdersIcon = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={"/orders"}>
            <Truck className="text-white size-6" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Orders</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const UserIcon = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <User className="text-white size-6 cursor-pointer" />
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
