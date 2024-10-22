"use client";

import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/ui/card";
import RatingInput from "../form/RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { createReviewAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const { user } = useUser();
  return (
    <div className="flex flex-col gap-4 items-start h-[375px]">
      <Button
        size="lg"
        className="capitalize rounded-full w-[160px]"
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        leave review
      </Button>

      {isReviewFormVisible && (
        <Card className={"w-full max-w-[500px] animate-in fade-in p-6"}>
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="feedback"
              defaultValue="Outstanding product!!!"
            />
            <SubmitButton className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
