import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    const product = await db.products.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const { reviews, ...rest } = product;
    const rating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    const productWithRating = {
      ...rest,
      rating: rating || 0,
      reviewCount: reviews.length,
    };

    return NextResponse.json(productWithRating);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
};
