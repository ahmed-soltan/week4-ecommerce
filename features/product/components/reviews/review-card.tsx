import { format, isToday, isYesterday } from "date-fns";
import { FiEdit, FiUser, FiX } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

import Rating from "@/components/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import ConfirmModal from "@/components/confirm-modal";

import { ReviewType, useReviews } from "../../hooks/use-reviews";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";

import { reviewSchema } from "@/schemas";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

interface ReviewCardProps {
  review: ReviewType;
}

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: review.comment,
      rating: review.rating,
    },
  });

  const user = useCurrentUser();
  const { deleteReview, isDeletingReview, isUpdatingReview, updateReview } =
    useReviews({ productId: review.productId });

  const formatDateLabel = (dateStr: Date) => {
    const date = new Date(dateStr);

    if (isToday(date)) {
      return `Today - ${format(date, "h:mm a")}`;
    }

    if (isYesterday(date)) {
      return `Yesterday - ${format(date, "h:mm a")}`;
    }

    return `${format(date, "EEEE, MMMM d")} - ${format(date, "h:mm a")}`;
  };

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login First!!",
        description: "You need to be logged in to create a review.",
      });
      return;
    }
    updateReview({ ...data, productId: review.productId, reviewId: review.id });
    form.reset();
    setIsEditing(false);
  };

  return (
    <>
      <ConfirmModal
        title="Are You Sure?"
        message="This Action can not be undone"
        callbackFn={() => {
          deleteReview({ reviewId: review.id, productId: review.productId });
        }}
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        isLoading={isDeletingReview}
      />
      <div className="flex items-start w-full p-5 group relative">
        <div className="flex items-start justify-start flex-col gap-2 w-full">
          <div className="flex items-center justify-start gap-2">
            <div className="relative w-[50px]">
              <Avatar>
                <AvatarImage
                  src={review.user?.image || ""}
                  alt={review.user.name || "user Image"}
                  className="bg-rose-500"
                />
                <AvatarFallback className="bg-rose-500 text-white">
                  <FiUser />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className=" flex flex-col items-start">
              <h1 className="text-slate-900 font-medium ">
                {review.user.name || "Guest"}
              </h1>
              <p className="text-slate-500 text-sm">
                {formatDateLabel(review.createdAt)}
              </p>
            </div>
          </div>
          <Rating rating={review.rating} />

          <Renderer value={review.comment} />
          <Separator className="my-2" />
        </div>

        <div className="absolute right-2 top-0 md:opacity-0 group-hover:opacity-100">
          <Hint label="View Product" side="top" align="center">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setIsEditing(true)}
              asChild
            >
              <Link href={`/product/${review.productId}`}>
                <FaEye className="w-4 h-4" />
              </Link>
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
