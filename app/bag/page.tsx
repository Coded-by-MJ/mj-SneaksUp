import CartItemsList from "@/components/bag/CartItemsList";
import BestSellerCarousel from "@/components/global/BestSellerCarousel";
import {
  fetchBestSellerProducts,
  fetchOrCreateCart,
  updateCart,
} from "@/utils/actions";
import Container from "@/components/global/Container";
import CartTotals from "@/components/bag/CartTotals";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bag - SneaksUp",
};

async function CartPage() {
  const { userId } = auth();
  if (!userId) redirect("/");
  const previousCart = await fetchOrCreateCart({ userId });
  const { currentCart, cartItems } = await updateCart(previousCart);
  const bestSellers = await fetchBestSellerProducts();
  if (cartItems.length === 0) {
    return (
      <>
        <Container className="flex flex-col lg:flex-row gap-6 py-14 items-start">
          <h2 className="lg:text-4xl uppercase font-medium xl:text-[43px] text-black text-3xl">
            Empty Bag
          </h2>
        </Container>
        <BestSellerCarousel bestSellers={bestSellers} />
      </>
    );
  }

  return (
    <>
      <Container className="flex flex-col lg:flex-row gap-8 py-14 items-start">
        <div className="flex w-full flex-col gap-8 flex-grow">
          <h2 className="lg:text-4xl uppercase font-medium xl:text-[43px] text-black text-3xl">
            bag ({currentCart.numItemsInCart})
          </h2>
          <CartItemsList cartItems={cartItems} />
        </div>
        <CartTotals cart={currentCart} />
      </Container>
      <BestSellerCarousel bestSellers={bestSellers} />
    </>
  );
}
export default CartPage;
