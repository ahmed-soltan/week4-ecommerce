import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "@/hooks/use-toast";

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
    name: string;
    image: string;
  };
};

type UpdateReviewProps = {
  reviewId: string;
  comment: string;
  rating: number;
  productId: string;
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
  const {
    data: reviews,
    refetch: refetchReviews,
    isLoading: isFetchingReviews,
  } = useQuery<ReviewType[]>({
    queryKey: [`reviews/${productId}`],
    queryFn: () => fetchReviewApi(productId),
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
      toast({
        title: "Review added successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong while creating the review.",
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
  };
};
