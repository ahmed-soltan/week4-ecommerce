import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export const GET = async () => {
  try {
    const categories = await db.category.findMany();

    if (!categories || categories.length === 0) {
      return NextResponse.json([]);
    }


    const reducedCategories = categories.filter((category, index, self) => {
      return self.findIndex(c => c.name === category.name) === index;
    });
    
    return NextResponse.json(reducedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
};
