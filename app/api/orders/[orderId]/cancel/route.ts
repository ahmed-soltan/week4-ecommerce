import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingOrder = await db.order.findUnique({
      where: { id: params.orderId, userId: user.id },
    });

    if (!existingOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (existingOrder.isDelivered) {
      return NextResponse.json(
        { message: "Order is delivered" },
        { status: 400 }
      );
    }

    const cancelOrder = await db.order.update({
      where: { id: params.orderId, userId: user.id },
      data: {
        isCanceled: true,
      },
    });

    if (!cancelOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(cancelOrder);
  } catch (error) {
    console.error("Error canceling order:", error);
    return NextResponse.json(
      { message: "Failed to cancel order", error: error },
      { status: 500 }
    );
  }
};
