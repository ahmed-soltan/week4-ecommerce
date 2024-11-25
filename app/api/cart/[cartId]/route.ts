import { NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const DELETE = async ({ params }: { params: { cartId: string } }) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.cart.delete({
      where: {
        id: params.cartId,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json(
      { message: "Failed to delete cart", error: error },
      { status: 500 }
    );
  }
};
