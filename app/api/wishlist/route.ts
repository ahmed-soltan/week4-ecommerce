import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const existingWishlist = await db.wishlist.findFirst({
      where: { userId: user.id },
      include: { products: true },
    });

    if (existingWishlist) {
      const isProductInWishlist = existingWishlist.products.some(
        (product) => product.id === productId
      );

      if (isProductInWishlist) {
        return NextResponse.json({
          message: "Product is already in the wishlist",
          wishlist: existingWishlist,
        });
      }

      const updatedWishlist = await db.wishlist.update({
        where: { id: existingWishlist.id },
        data: {
          products: {
            connect: { id: productId },
          },
        },
        include: {
          products: true,
        },
      });

      return NextResponse.json({
        message: "Wishlist updated",
        wishlist: updatedWishlist,
      });
    } else {
      const newWishlist = await db.wishlist.create({
        data: {
          userId: user.id,
          products: {
            connect: { id: productId },
          },
        },
        include: { products: true },
      });

      return NextResponse.json({
        message: "Wishlist created",
        wishlist: newWishlist,
      });
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { message: "Failed to add product to wishlist", error: error },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wishlist = await db.wishlist.findFirst({
      where: { userId: user.id },
      include: {
        products: {
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
        },
      },
    });

    const productsWithRating = wishlist?.products.map((product) => {
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

    const wishlistData = {
      ...wishlist,
      products:productsWithRating,
    };

    return NextResponse.json(wishlistData);
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json(
      { message: "Failed to get user" },
      { status: 500 }
    );
  }
};
