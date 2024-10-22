import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import BestSellerCarousel from "@/components/global/BestSellerCarousel";
import Container from "@/components/global/Container";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import SingleProductContent from "@/components/single-product/SingleProductContent";
import ProductReviews from "@/components/single-product/ProductReviews";
import SubmitReview from "@/components/single-product/SubmitReview";
import {
  fetchBestSellerProducts,
  fetchSingleProduct,
  findExistingReview,
} from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import FavoriteToggleButton from "@/components/favorites/FavoriteToggleButton";

async function SingleProduct({ params }: { params: { id: string } }) {
  const { singleProduct, totalReviews } = await fetchSingleProduct(params.id);
  const bestSellers = await fetchBestSellerProducts();
  const { userId } = auth();
  const { collection, name, description } = singleProduct;
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, singleProduct.id));

  return (
    <>
      <Container className="flex flex-col gap-4 py-14">
        <BreadCrumbs collection={collection} name={name} />
        <article className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3  gap-y-6 gap-x-6">
          <SingleProductContent product={singleProduct}>
            <FavoriteToggleButton productId={singleProduct.id} />
          </SingleProductContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-black">{description}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                <p className="text-black mb-3">
                  We&apos;re passionate about getting your fresh kicks to you
                  fast. That&apos;s why we offer a variety of shipping options
                  to choose from at checkout, ensuring you get your new
                  favourites exactly when you need them.
                </p>
                <p className="text-black">
                  Didn&apos;t find your perfect fit? No worries! We understand
                  that sometimes things don&apos;t work out as planned. Our
                  hassle-free return policy allows you to return unworn items
                  within 3 days for a full refund or exchange.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Reviews ({totalReviews})</AccordionTrigger>
              <AccordionContent>
                <ProductReviews productId={params.id} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {reviewDoesNotExist && <SubmitReview productId={params.id} />}
        </article>
      </Container>
      <BestSellerCarousel
        title="you might also like"
        bestSellers={bestSellers}
      />
    </>
  );
}
export default SingleProduct;
