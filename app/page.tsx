import Hero from "@/components/home/Hero";
import NewCollectionsCarousel from "@/components/home/NewCollectionsCarousel";
import BestSellerCarousel from "@/components/global/BestSellerCarousel";
import {
  fetchBestSellerProducts,
  fetchNewCollectionProducts,
} from "@/utils/actions";

export default async function Home() {
  const newCollections = await fetchNewCollectionProducts();
  const bestSellers = await fetchBestSellerProducts();
  return (
    <>
      <Hero />
      <NewCollectionsCarousel newCollections={newCollections} />
      <BestSellerCarousel title="best sellers" bestSellers={bestSellers} />
    </>
  );
}
