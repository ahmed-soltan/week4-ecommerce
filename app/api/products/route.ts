import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const buildFilter = (params: URLSearchParams) => {
  const filter: any = {};

  if (params.has("categoryId")) {
    filter.categoryId = { in: params.getAll("categoryId") }; // Supports multiple IDs
  }

  if (params.has("hasDiscount")) {
    const hasDiscount = params.get("hasDiscount") === "true";
    filter.discount = hasDiscount
      ? { gt: 0 }
      : { equals: null }; 
  }

  if (params.has("minPrice")) {
    const minPrice = parseFloat(params.get("minPrice") as string);
    if (!isNaN(minPrice)) {
      filter.price = { ...filter.price, gte: minPrice };
    }
  }

  if (params.has("maxPrice")) {
    const maxPrice = parseFloat(params.get("maxPrice") as string);
    if (!isNaN(maxPrice)) {
      filter.price = { ...filter.price, lte: maxPrice };
    }
  }

  return filter;
};

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const filter = buildFilter(params);

    const products = await db.products.findMany({
      where: filter,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    const productsWithRating = products.map((product) => {
      const { reviews, ...rest } = product;
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        (reviews.length || 1);

      return {
        ...rest,
        reviewCount: reviews.length,
        rating: rating || 0,
      };
    });

    return NextResponse.json(productsWithRating);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
