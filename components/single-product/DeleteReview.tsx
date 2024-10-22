import { deleteReviewAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { DeleteReviewButton } from "../form/Buttons";

const DeleteReview = ({
  reviewId,
  userId,
  productId,
}: {
  reviewId: string;
  userId: string;
  productId: string;
}) => {
  const deleteReview = deleteReviewAction.bind(null, {
    reviewId,
    userId,
    productId,
  });
  return (
    <FormContainer action={deleteReview}>
      <DeleteReviewButton />
    </FormContainer>
  );
};

export default DeleteReview;
