import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const newUser = await db.user.update({
        where: { id: user.id },
        data: {
          ...body,
        },
    })

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};
