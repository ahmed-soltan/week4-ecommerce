import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ReviewType } from "@/features/product/hooks/use-reviews";

const getUserReviewsApi = async (): Promise<ReviewType[]> => {
  const res = await axios.get("/api/reviews");
  return res.data;
};

export const useUserReviews = () => {
  const {
    data: reviews,
    isLoading,
  } = useQuery({
    queryKey: ["userReviews"],
    queryFn: getUserReviewsApi,
  });

  return {
    reviews,
    isLoading,
  };
};
