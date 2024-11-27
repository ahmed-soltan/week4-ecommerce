import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Quill from "quill";

import { ReviewType, useReviews } from "../../hooks/use-reviews";
import { toast } from "@/hooks/use-toast";

type CreateReviewValues = {
  comment: string;
  rating: number;
  productId: string;
};

interface ReviewInputProps {
  productId: string;
  reviews?: ReviewType[];
}

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const ReviewInput = ({ productId  , reviews}: ReviewInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);

  const { createReview } = useReviews({ productId });



  const onSubmit = async ({
    comment,
    rating,
  }: {
    comment: string;
    rating: number;
  }) => {
    try {
      setIsPending(true);
      const values: CreateReviewValues = {
        comment,
        rating,
        productId,
      };

      createReview(values);
      setEditorKey((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      toast({
        title: "something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="flex flex-col items-start gap-5 border-b w-full lg:border-r p-4">
      <h1 className="text-2xl font-semibold">Add Your Review</h1>
      <Editor
        key={editorKey}
        placeHolder="Add your review"
        onSubmit={onSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ReviewInput;
