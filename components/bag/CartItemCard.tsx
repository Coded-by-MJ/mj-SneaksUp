"use client";

import { CartItemWithProduct, ColourDetails } from "@/utils/types";
import Image from "next/image";
import placeholderImage from "@/public/imagebackdrop.jpg";
import { IoCheckbox } from "react-icons/io5";
import { useState } from "react";
import { formatCurrency } from "@/utils/format";
import { toast } from "@/hooks/use-toast";
import SelectProductAmount from "./SelectProductAmount";
import SelectProductSize from "./SelectProductSize";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import Link from "next/link";
import FormContainer from "../form/FormContainer";
import { DeleteCartItemButton } from "../form/Buttons";

function CartItemCard({ cartItem }: { cartItem: CartItemWithProduct }) {
  const [amount, setAmount] = useState(cartItem.amount);
  const [size, setSize] = useState(cartItem.size);
  const [isAmountLoading, setIsAmountLoading] = useState(false);
  const [isSizeLoading, setIsSizeLoading] = useState(false);

  const handleAmountChange = async (value: number) => {
    setIsAmountLoading(true);
    toast({ description: "Calculating..." });

    const result = await updateCartItemAction({
      updateProperty: {
        amount: value,
      },
      cartItemId: cartItem.id,
    });
    setAmount(value);
    toast({ description: result.message, variant: result.variant });
    setIsAmountLoading(false);
  };

  const handleSizeChange = async (value: number) => {
    setIsSizeLoading(true);
    toast({ description: "Updating size..." });
    const result = await updateCartItemAction({
      updateProperty: {
        size: value,
      },
      cartItemId: cartItem.id,
    });
    toast({ description: result.message, variant: result.variant });
    setSize(value);
    setIsSizeLoading(false);
  };

  const { colour } = cartItem;
  const { name, price, collection, sizes } = cartItem.product;
  const colourInfo = cartItem.product.colourInfo as ColourDetails[];
  const mainImage =
    colourInfo.find((col) => col.name === colour)?.mainImage || "";
  return (
    <div className="flex max-phone:flex-col gap-3  xl:h-[210px] pb-6 border-#[C0C0C0] border-b">
      <div className="sm:w-[250px] w-full phone:w-[190px]  h-[246px] xl:h-[192px] relative">
        <Image
          src={mainImage}
          alt={name}
          placeholder="blur"
          blurDataURL={placeholderImage.blurDataURL}
          fill
          sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
          priority
          className="w-full h-full rounded-sm object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 xl:gap-4 flex-grow">
        <div className="flex flex-col gap-1.5 md:gap-3 md:flex-row md:justify-between items-start">
          <div>
            <Link href={`/collections/${cartItem.product.id}`}>
              <h3 className=" text-base lg:text-xl  xl:text-2xl transition-all hover:underline font-medium capitalize">
                {name}
              </h3>
            </Link>
            <span className="mt-1 block capitalize text-sm text-black/80">
              {collection}&apos;s shoes
            </span>
          </div>
          <span className="capitalize text-base lg:text-xl  xl:text-2xl font-medium ">
            {formatCurrency(price)}
          </span>
        </div>

        <div className="flex gap-1 items-center">
          <span className="text-sm capitalize w-[56px]">colour:</span>
          <div className="relative size-[20px] rounded-sm">
            <Image
              src={mainImage}
              alt={name}
              fill
              placeholder="blur"
              blurDataURL={placeholderImage.blurDataURL}
              sizes="33vw"
              priority
              className="w-full rounded-sm h-full object-cover"
            />
            <span className="absolute flex justify-center items-center z-10 rounded-sm inset-0 bg-black/40">
              <IoCheckbox className="size-[8px] text-green-500" />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 md:gap-3 items-start md:flex-row md:justify-between md:items-center">
          <div className="lg:w-[230px] w-full flex flex-col gap-1.5 xl:gap-3 items-start  xl:flex-row xl:justify-between xl:items-center">
            <div className="flex items-center gap-1">
              <span className="text-sm capitalize w-[56px]">Size:</span>
              <SelectProductSize
                size={size}
                setSize={handleSizeChange}
                isLoading={isSizeLoading}
                productSizes={sizes}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm capitalize w-[56px]">Quatity:</span>
              <SelectProductAmount
                amount={amount}
                setAmount={handleAmountChange}
                isLoading={isAmountLoading}
              />
            </div>
          </div>
          {/* delete */}
          <FormContainer action={removeCartItemAction}>
            <input type="hidden" name="id" value={cartItem.id} />
            <DeleteCartItemButton />
          </FormContainer>
        </div>
      </div>
    </div>
  );
}
export default CartItemCard;
