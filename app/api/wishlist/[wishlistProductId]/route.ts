import { NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const DELETE = async ({
  params,
}: {
  params: { wishlistProductId: string };
}) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingWishlistProduct = await db.wishlist.findUnique({
      where: { id: params.wishlistProductId },
    });

    if (!existingWishlistProduct) {
      return NextResponse.json(
        { message: "wishlist product not found" },
        { status: 404 }
      );
    }

    const newWishlist = await db.wishlist.delete({
      where: { id: params.wishlistProductId },
    });

    return NextResponse.json({
      message: "wishlist deleted successfully",
      wishlist: newWishlist,
    });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    return NextResponse.json(
      { message: "Failed to delete wishlist", error: error },
      { status: 500 }
    );
  }
};
