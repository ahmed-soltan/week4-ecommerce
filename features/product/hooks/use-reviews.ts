import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "@/hooks/use-toast";
import { useFetchProductById } from "./use-fetch-product-by-id";

type ReviewProps = {
  productId: string;
  comment: string;
  rating: number;
};

export type ReviewType = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name?: string | null;
    image?: string | null;
  };
};

type UpdateReviewProps = {
  reviewId: string;
  comment: string;
  rating: number;
  productId: string;
};

const getUserReviewsApi = async (): Promise<ReviewType[]> => {
  const res = await axios.get("/api/reviews");
  return res.data;
};

const createReviewApi = async ({ productId, comment, rating }: ReviewProps) => {
  const { data } = await axios.post(`/api/product/${productId}/reviews`, {
    comment,
    rating,
  });
  return data;
};

const fetchReviewApi = async (productId: string): Promise<ReviewType[]> => {
  const { data } = await axios.get(`/api/product/${productId}/reviews`);
  return data;
};

const deleteReviewApi = async ({
  reviewId,
  productId,
}: {
  reviewId: string;
  productId: string;
}) => {
  const { data } = await axios.delete(
    `/api/product/${productId}/reviews/${reviewId}`
  );
  return data;
};

const updateReviewApi = async ({
  reviewId,
  comment,
  rating,
  productId,
}: UpdateReviewProps) => {
  const { data } = await axios.patch(
    `/api/product/${productId}/reviews/${reviewId}`,
    { comment, rating }
  );
  return data;
};

export const useReviews = ({ productId }: { productId: string }) => {
  const { refetchProduct } = useFetchProductById({ productId });
  const { data: userReviews, isLoading: isLoadingUserReviews } = useQuery<
    ReviewType[]
  >({
    queryKey: ["userReviews"],
    queryFn: getUserReviewsApi,
    staleTime: Infinity,
  });

  const {
    data: reviews,
    refetch: refetchReviews,
    isLoading: isFetchingReviews,
  } = useQuery<ReviewType[]>({
    queryKey: [`reviews/${productId}`],
    queryFn: () => fetchReviewApi(productId!),
    staleTime: Infinity,
  });

  const { mutate: createReview, isPending: isCreatingReview } = useMutation<
    ReviewType,
    Error,
    ReviewProps
  >({
    mutationFn: createReviewApi,
    onSuccess: () => {
      refetchReviews();
      refetchProduct()
      toast({
        title: "Review added successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "You Already Have Submitted a Review before",
        description: "Find your Review and Edit it",
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteReview, isPending: isDeletingReview } = useMutation<
    void,
    Error,
    { reviewId: string; productId: string }
  >({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      refetchReviews();
      refetchProduct()
      toast({
        title: "Review deleted successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong while deleting the review.",
        variant: "destructive",
      });
    },
  });

  const { mutate: updateReview, isPending: isUpdatingReview } = useMutation<
    ReviewType,
    Error,
    UpdateReviewProps
  >({
    mutationFn: updateReviewApi,
    onSuccess: () => {
      refetchReviews();
      refetchProduct()
      toast({
        title: "Review updated successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong while updating the review.",
        variant: "destructive",
      });
    },
  });

  return {
    reviews,
    isFetchingReviews,
    createReview,
    isCreatingReview,
    deleteReview,
    isDeletingReview,
    updateReview,
    isUpdatingReview,
    userReviews,
    isLoadingUserReviews,
  };
};
