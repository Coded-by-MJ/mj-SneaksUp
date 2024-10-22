import ProductCard from "@/components/collections/ProductCard";
import BestSellerCarousel from "@/components/global/BestSellerCarousel";
import Container from "@/components/global/Container";
import { fetchBestSellerProducts, fetchUserFavorites } from "@/utils/actions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites - SneaksUp",
};
async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  const bestSellers = await fetchBestSellerProducts();

  if (favorites.length === 0) {
    return (
      <>
        <Container className="flex flex-col gap-4 py-14">
          <h2 className="lg:text-4xl uppercase font-medium xl:text-[43px] text-black text-3xl">
            You have no favorites yet.
          </h2>
        </Container>
        <BestSellerCarousel bestSellers={bestSellers} />
      </>
    );
  }
  return (
    <>
      <Container className="flex flex-col gap-4 py-14">
        <h2 className="lg:text-4xl uppercase font-medium xl:text-[43px] text-black text-3xl">
          Favorites
        </h2>
        <section className="grid w-full grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[48px]">
          {favorites.map((favorite) => (
            <ProductCard key={favorite.product.id} product={favorite.product} />
          ))}
        </section>
      </Container>
      <BestSellerCarousel bestSellers={bestSellers} />
    </>
  );
}
export default FavoritesPage;
