"use client";

import TopHeaderSection from "@/features/home/components/top-header-section";
import { useReviews } from "../hooks/use-reviews";
import AddReview from "./add-review";
import ReviewCard from "./review-card";

interface ReviewsProps {
  productId: string;
}

const Reviews = ({ productId }: ReviewsProps) => {
  const { reviews, isFetchingReviews } = useReviews({ productId });

  if (isFetchingReviews) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start gap-10 w-full">
      <TopHeaderSection title="Reviews" />
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full">
        
        <AddReview productId={productId} />
        <div className="col-span-1 lg:col-span-3">
          <div className="flex flex-col gap-4">
            {reviews && reviews?.length > 0 ? (
              reviews.map((review) => {
                return <ReviewCard key={review.id} review={review} />;
              })
            ) : (
              <div className="italic text-gray-500 p-5">No Reviews Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
