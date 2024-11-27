import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ReviewInputs from "./review-inputs";

import { reviewSchema } from "@/schemas";

import { useReviews } from "../../hooks/use-reviews";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";

interface AddReviewProps {
  productId: string;
}

const AddReview = ({ productId }: AddReviewProps) => {
  const user = useCurrentUser();
  const { createReview, isCreatingReview } = useReviews({ productId });
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login First!!",
        description: "You need to be logged in to create a review.",
      });
      return;
    }
    createReview({ ...data, productId });
    form.reset();
  };

  return (
    <div className="flex flex-col items-start gap-5 border-r w-full p-4">
      <h1 className="text-2xl font-semibold">Add Your Review</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <ReviewInputs form={form} disabled={isCreatingReview} />
          <Button
            type="submit"
            variant={"destructive"}
            size={"lg"}
            className="w-full h-10"
            disabled={isCreatingReview || !user}
          >
            Add Review
          </Button>
          {!user && <p className="text-sm text-red">Please Login First to add Review*</p>}
        </form>
      </Form>
    </div>
  );
};

export default AddReview;
