import { NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const PATCH = async (
  req: Request,
  { params }: { params: { productId: string; reviewId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { rating, comment } = await req.json();
    if (!rating || !comment) {
      return NextResponse.json(
        { message: "Rating and comment and userId are required" },
        { status: 400 }
      );
    }

    const existingReview = await db.review.findUnique({
      where: { id: params.reviewId },
    });

    if(!existingReview){
        return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    if(existingReview.userId !== user.id){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.review.update({
      where: { id: params.reviewId },
      data: {
        rating,
        comment,
      },
    });

    return NextResponse.json({ message: "Review updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { productId: string; reviewId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    const existingReview = await db.review.findUnique({
      where: { id: params.reviewId },
    });

    if(!existingReview){
        return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    if(existingReview.userId !== user.id){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.review.delete({
      where: { id: params.reviewId },
    });

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};
