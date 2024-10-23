"use client";

import {
  generateColourImages,
  generateSizeButton,
  generateSmallImages,
} from "@/utils/helpers";
import Image from "next/image";

import FormContainer from "../form/FormContainer";
import { AddToBagButton, ProductSignInButton } from "../form/Buttons";
import { Product } from "@/utils/types";
import { useState } from "react";
import placeholderImage from "@/public/imagebackdrop.jpg";
import { MinusCircle, PlusCircle } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";

function SingleProductContent({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const { userId } = useAuth();
  const [amount, setAmount] = useState(1);
  const [selectedColour, setSelectedColour] = useState(product.defaultColour);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [mainImage, setMainImage] = useState(
    product.colourInfo.find((colour) => colour.name === selectedColour)
      ?.mainImage || ""
  );
  const [others, setOthers] = useState(
    product.colourInfo.find((colour) => colour.name === selectedColour)
      ?.others || []
  );
  const { name, collection, price, colourInfo, sizes } = product;

  const handleColourChange = (newColour: string) => {
    setSelectedColour(newColour);
    setMainImage(
      colourInfo.find((colour) => colour.name === newColour)?.mainImage || ""
    );
    setOthers(
      colourInfo.find((colour) => colour.name === newColour)?.others || []
    );
  };

  return (
    <>
      {/* first col  */}
      <div className="row-span-2 flex flex-col lg:flex-row gap-3 xl:gap-6 h-[480px] sm:h-[600px] md:h-[680px] xl:h-[720px]">
        <div className="flex lg:flex-col gap-1 lg:gap-2 w-full h-[70px] sm:h-[100px]  lg:h-full lg:w-[87px] max-lg:order-2">
          {generateSmallImages(others, name)}
        </div>
        <div className="flex-grow lg:h-full relative max-lg:order-1">
          <Image
            src={mainImage}
            alt={name}
            placeholder="blur"
            blurDataURL={placeholderImage.blurDataURL}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
            priority
            className="w-full h-full rounded-3xl object-cover"
          />
        </div>
      </div>
      {/* second col  first-row */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-xl font-medium text-black  capitalize">{name}</h2>
          <span className="text-sm block capitalize text-black/80">
            {collection}&apos;s shoes
          </span>
          <span className="text-xl block font-medium text-black mt-1.5">
            {formatCurrency(price)}
          </span>
        </div>

        <div className="flex  w-full justify-between items-center gap-2">
          <span className="text-black block w-[80px] flex-shrink-0 capitalize text-base">
            colours:
          </span>
          <div className="flex-grow flex-wrap flex justify-start items-center gap-2">
            {generateColourImages(
              colourInfo,
              selectedColour,
              handleColourChange
            )}
          </div>
        </div>
        <div className="flex w-full justify-between items-center gap-2">
          <span className="text-black block w-[80px] flex-shrink-0 capitalize text-base">
            Sizes:
          </span>
          <div className="flex-grow flex flex-wrap justify-start items-center gap-2">
            {generateSizeButton(sizes, selectedSize, setSelectedSize)}
          </div>
        </div>
        <div className="flex  w-full justify-between items-center gap-2">
          <span className="text-black block w-[80px] capitalize text-base">
            quantity:
          </span>
          <div className="flex-grow flex items-center gap-2">
            <button
              onClick={() => setAmount(amount - 1)}
              className="size-6 text-black cursor-pointer disabled:text-[#787880] flex items-center justify-center"
              disabled={amount <= 1}
            >
              <MinusCircle className="stroke-1 size-5" />
            </button>
            <span className="text-base text-black text-center">{amount}</span>
            <button
              onClick={() => setAmount(amount + 1)}
              className="size-6 text-black cursor-pointer flex items-center justify-center"
            >
              <PlusCircle className="stroke-1 size-[21px] fill-black stroke-white" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {userId ? (
            <FormContainer action={addToCartAction} className="flex-grow">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="amount" value={amount} />
              <input type="hidden" name="size" value={selectedSize} />
              <input type="hidden" name="colour" value={selectedColour} />
              <AddToBagButton className="bg-black rounded-full py-3 text-sm font-normal gap-2 h-[44px] w-full sm:w-[338px] lg:w-[512px]" />
            </FormContainer>
          ) : (
            <ProductSignInButton className="bg-black capitalize rounded-full py-3 text-sm font-normal gap-2 h-[44px] flex-grow sm:flex-grow-0 sm:w-[338px] lg:w-[512px]" />
          )}
          {children}
        </div>
      </div>
    </>
  );
}
export default SingleProductContent;
