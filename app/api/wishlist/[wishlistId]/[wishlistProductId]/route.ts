import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { wishlistProductId: string; wishlistId: string };
  }
) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingWishlist = await db.wishlist.findUnique({
      where: { id: params.wishlistId },
      include: { products: true },
    });

    if (!existingWishlist || existingWishlist.userId !== user.id) {
      return NextResponse.json(
        { message: "Wishlist not found or access denied" },
        { status: 404 }
      );
    }

    const productExists = existingWishlist.products.some(
      (product) => product.id === params.wishlistProductId
    );

    if (!productExists) {
      return NextResponse.json(
        { message: "Product not found in the wishlist" },
        { status: 404 }
      );
    }

    const updatedWishlist = await db.wishlist.update({
      where: { id: params.wishlistId },
      data: {
        products: {
          disconnect: { id: params.wishlistProductId },
        },
      },
    });

    return NextResponse.json({
      message: "Product removed from wishlist successfully",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.error("Error deleting product from wishlist:", error);
    return NextResponse.json(
      { message: "Failed to delete product from wishlist", error },
      { status: 500 }
    );
  }
};
