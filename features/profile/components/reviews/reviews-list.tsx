"use client";

import dynamic from "next/dynamic";

import ReviewCard from "@/features/product/components/reviews/review-card";
import { Skeleton } from "@/components/ui/skeleton";

import { useUserReviews } from "../../hooks/use-user-reviews";

const ReviewsList = () => {
  const {reviews , isLoading} = useUserReviews()

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center w-full gap-3">
        <Skeleton className="w-full h-32 rounded-sm" />
        <Skeleton className="w-full h-32 rounded-sm" />
        <Skeleton className="w-full h-32 rounded-sm" />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 space-y-4 w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.403 1.402M5 7h14M5 17h5l-1.403 1.402"
          />
        </svg>
        <p className="text-xl">No Reviews found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5 w-full flex-wrap justify-center md:justify-start">
      {reviews.map((review) => (
        <ReviewCard review={review} key={review.id}/>
      ))}
    </div>
  );
};

export default ReviewsList;
