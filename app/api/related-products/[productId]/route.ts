import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    const productId = params.productId;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const existingProduct = await db.products.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const relatedProducts = await db.products.findMany({
      where: {
        categoryId: existingProduct.categoryId,
        NOT: {
          id: productId,
        },
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

    const productsWithRating = relatedProducts.map((product) => {
      const { reviews, ...rest } = product;
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;

      return {
        ...rest,
        reviewCount: reviews.length,
        rating: rating || 0,
      };
    });

    return NextResponse.json(productsWithRating);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching related products" },
      { status: 500 }
    );
  }
};
