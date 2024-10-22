import { FilterOptions } from "@/utils/schema";
import ProductCard from "./ProductCard";
import { fetchFilteredProducts } from "@/utils/actions";

async function ProductsContainer({
  filterOptions,
}: {
  filterOptions: FilterOptions;
}) {
  const products = await fetchFilteredProducts(filterOptions);

  if (products.length === 0) {
    return (
      <h5 className="text-2xl mt-16">
        Sorry, no products matched your search...
      </h5>
    );
  }

  return (
    <section className="grid w-full grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[48px]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
export default ProductsContainer;
