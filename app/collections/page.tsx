import FilterDropDown from "@/components/collections/FilterDropDown";
import ProductsContainer from "@/components/collections/ProductsContainer";
import ProductsSkeleton from "@/components/collections/ProductsSkeleton";

import Container from "@/components/global/Container";

import type {
  AvailableColours,
  Collections,
  FilterOptions,
  PriceOrder,
} from "@/utils/schema";
import { Suspense } from "react";

function CollectionsPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    category?: string;
    colours?: string;
    bestSeller?: string;
    newCollection?: string;
    priceOrder?: string;
    min?: string;
    max?: string;
  };
}) {
  const search = searchParams.search || "";
  const category = (searchParams.category?.split(",") as Collections) || [];
  const colours = (searchParams.colours?.split(",") as AvailableColours) || [];
  const priceRange = {
    min: Number(searchParams.min) || 0,
    max: Number(searchParams.max) || 1000,
  };
  const priceOrder = (searchParams.priceOrder as PriceOrder) || "asc";
  const bestSeller = Boolean(searchParams.bestSeller);
  const newCollection = Boolean(searchParams.newCollection);

  const filterOptions: FilterOptions = {
    search,
    category,
    colours,
    priceRange,
    bestSeller,
    newCollection,
    priceOrder,
  };

  return (
    <Container className="flex flex-col gap-10 py-14">
      <FilterDropDown />
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsContainer filterOptions={filterOptions} />
      </Suspense>
    </Container>
  );
}
export default CollectionsPage;
