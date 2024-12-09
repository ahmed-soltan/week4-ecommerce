import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("User ID:", user.id);


    const reviews = await db.review.findMany({
      where: { userId: user.id },
      include:{
        user:{
          select:{
            name:true,
            image:true,
          },
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Failed to fetch reviews", error },
      { status: 500 }
    );
  }
};
