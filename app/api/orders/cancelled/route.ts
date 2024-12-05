import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
      const user = await currentUser();
      if (!user || !user.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const orders = await db.order.findMany({
        where: { userId: user.id, isCanceled: true, isRefunded: false },
        include: {
          orderItems: {
            include: {
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
  
      return NextResponse.json(orders);
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
  };
  