import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    const reviews = await db.review.findMany({
      where: {
        productId: params.productId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    return NextResponse.json(
      { message: "Failed to get reviews" },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { rating, comment } = await req.json();
    if (!rating || !comment) {
      return NextResponse.json(
        { message: "Rating and comment are required" },
        { status: 400 }
      );
    }

    const newReview = await db.review.create({
      data: {
        rating,
        comment,
        user: { connect: { id: user.id } },
        product: { connect: { id: params.productId } },
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { message: "Failed to create review" },
      { status: 500 }
    );
  }
};
