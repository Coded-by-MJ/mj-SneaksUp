"use client";

import { CartItemWithProduct } from "@/utils/types";
import CartItemCard from "./CartItemCard";

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  return (
    <div className="flex flex-col py-1 pr-2 flex-grow gap-8 max-h-[600px] overflow-y-auto scrollbar-thumb-black scrollbar-track-[#F8F8F8] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin ">
      {cartItems.map((item) => {
        return <CartItemCard cartItem={item} key={item.id} />;
      })}
    </div>
  );
}
export default CartItemsList;
