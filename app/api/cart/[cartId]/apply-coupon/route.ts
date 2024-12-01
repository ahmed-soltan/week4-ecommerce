import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { cartId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { coupon } = await req.json();

    if (!coupon) {
      return NextResponse.json(
        { message: "Coupon code is required" },
        { status: 400 }
      );
    }

    const cart = await db.cart.findUnique({
      where: { id: params.cartId },
      include: {
        cartItems: {
          include: { product: true },
        },
        coupon: true,
      },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const validCoupon = await db.coupon.findUnique({
      where: { code: coupon },
    });

    if (!validCoupon) {
      return NextResponse.json(
        { message: "Invalid coupon code" },
        { status: 400 }
      );
    }

    const currentDate = new Date();
    if (
      validCoupon.validFrom > currentDate ||
      (validCoupon.validUntil && validCoupon.validUntil < currentDate)
    ) {
      return NextResponse.json(
        { message: "Coupon code is expired" },
        { status: 400 }
      );
    }

    const priceBeforeCoupon = cart.total;
    const priceAfterCoupon =
      cart.total - (validCoupon.discountPercentage / 100) * cart.total;

    await db.cart.update({
      where: { id: params.cartId },
      data: {
        couponId: validCoupon.id,
        priceBeforeCoupon,
        priceAfterCoupon,
      },
    });

    return NextResponse.json({
      message: "Coupon applied successfully",
      priceBeforeCoupon,
      priceAfterCoupon,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error processing cart" },
      { status: 500 }
    );
  }
};
