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
    })

    if (!existingOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if(!existingOrder.isDelivered){
      return NextResponse.json({ message: "Order is not delivered" }, { status: 400 });
    }

    const returnOrder = await db.order.update({
      where: { id: params.orderId, userId: user.id },
      data: {
        isRefunded: true,
        isDelivered:false
      },
    });

    if (!returnOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(returnOrder);
  } catch (error) {
    console.error("Error returning order:", error);
    return NextResponse.json(
      { message: "Failed to return order", error: error },
      { status: 500 }
    );
  }
};

