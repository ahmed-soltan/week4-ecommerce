"use client";

import TopHeaderSection from "@/features/home/components/top-header-section";
import ReviewCard from "./review-card";
import ReviewInput from "./review-input";

import { useReviews } from "../../hooks/use-reviews";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";

interface ReviewsProps {
  productId: string;
}

const Reviews = ({ productId }: ReviewsProps) => {
  const { reviews, isFetchingReviews } = useReviews({ productId });
  const user = useCurrentUser();

  if (isFetchingReviews) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LuLoader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  const userHasReview = () => {
    return user && reviews?.some((review) => review.userId === user?.id);
  };

  return (
    <div className="flex flex-col items-start gap-10 w-full">
      <TopHeaderSection title="Reviews" />
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full">
        {!user && (
          <div className="text-center border-b w-full lg:border-r p-4 text-slate-600 italic">
            Please sign in to leave a review*.{" "}
            <Link href={"/auth/login"} className="underline text-red">
              Sign in
            </Link>
          </div>
        )}
        {userHasReview() && (
          <div className="text-center border-b w-full lg:border-r p-4 text-slate-500 italic">
            You have already submitted a review for this product.
          </div>
        )}
        {user && !userHasReview() && <ReviewInput productId={productId} />}
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
