"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCw, Trash2 } from "lucide-react";
import { SlBag } from "react-icons/sl";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export function AddToBagButton({ className }: { className: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn("capitalize", className)}
    >
      {pending ? (
        <>
          <RotateCw className="mr-2 h-4 w-4 text-white animate-spin" />
          Please wait...
        </>
      ) : (
        <>
          <SlBag className="size-4 text-white" />
          add to bag
        </>
      )}
    </Button>
  );
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 size-[44px]  cursor-pointer rounded-none bg-transparent border-none hover:bg-transparent"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

type SubmitButtonProps = {
  className?: string;
  text?: string;
};

export function SubmitButton({
  className = "",
  text = "submit",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn("capitalize", className)}
      size="lg"
    >
      {pending ? (
        <>
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export const DeleteReviewButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <RotateCw className="animate-spin size-[12px]" />
      ) : (
        <Trash2 className="text-red-500 size-[14px] " />
      )}
    </Button>
  );
};

export const FavoriteSubmitButton = ({
  isFavorite,
}: {
  isFavorite: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 size-[44px] cursor-pointer rounded-none bg-transparent border-none hover:bg-transparent"
    >
      {pending ? (
        <RotateCw className="animate-spin" />
      ) : isFavorite ? (
        <FaHeart className="size-full" />
      ) : (
        <FaRegHeart className="size-full " />
      )}
    </Button>
  );
};

export const ProductSignInButton = ({ className }: { className: string }) => {
  return (
    <SignInButton mode="modal">
      <Button type="button" className={className}>
        sign in
      </Button>
    </SignInButton>
  );
};
export const DeleteCartItemButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-1 xl:p-2  cursor-pointer"
    >
      {pending ? (
        <RotateCw className="animate-spin text-black size-[20px] md:size-[24px] xl:size-[32px]" />
      ) : (
        <Trash2 className="text-red-500 size-[20px] md:size-[24px] xl:size-[32px] " />
      )}
    </Button>
  );
};
