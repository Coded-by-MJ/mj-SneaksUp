import { Review } from "@prisma/client";
import DeleteReview from "./DeleteReview";
import { auth } from "@clerk/nextjs/server";
import { Rating } from "@/utils/helpers";
import { formatDate } from "@/utils/format";
import { fetchProductReviews } from "@/utils/actions";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);
  const { userId } = auth();

  return (
    <div className="w-full flex flex-col gap-2">
      {reviews.map((review: Review) => {
        const { id, clerkId, rating, authorName, createdAt } = review;
        const showDeleteReview = userId && userId === clerkId;
        return (
          <div key={id} className="w-full flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-1.5 items-center">
                <Rating rating={rating} />
                <span className="block text-sm capitalize text-black/80">
                  {authorName} - {formatDate(createdAt)}
                </span>
              </div>

              {showDeleteReview && (
                <DeleteReview
                  reviewId={id}
                  productId={productId}
                  userId={userId}
                />
              )}
            </div>
            <p className="text-sm black">{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
}
export default ProductReviews;
