import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { wishlistId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.wishlist.delete({
      where: {
        id: params.wishlistId,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "wishlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    return NextResponse.json(
      { message: "Failed to delete wishlist", error: error },
      { status: 500 }
    );
  }
};
