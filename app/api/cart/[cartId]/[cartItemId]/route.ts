import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { cartId: string; cartItemId: string };
  }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingCartItem = await db.cartItem.findUnique({
      where: { id: params.cartItemId },
    });

    if (!existingCartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    const existingCart = await db.cart.findUnique({
      where: { id: params.cartId },
      include: { cartItems: true },
    });

    if (!existingCart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const newCartTotal = existingCart.total - existingCartItem.total;

    await db.cartItem.delete({
      where: { id: params.cartItemId },
    });

    const updatedCart = await db.cart.update({
      where: { id: params.cartId },
      data: {
        total: newCartTotal,
      },
    });

    return NextResponse.json({
      message: "Cart item deleted successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { message: "Failed to delete cart item", error: error },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { cartId: string; cartItemId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { quantity } = await req.json();
    if (quantity === undefined || quantity <= 0) {
      return NextResponse.json(
        { message: "Invalid quantity" },
        { status: 400 }
      );
    }

    const existingCartItem = await db.cartItem.findUnique({
      where: { id: params.cartItemId },
    });

    if (!existingCartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    const product = await db.products.findUnique({
      where: { id: existingCartItem.productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const newItemTotal = product.discount
      ? (product.price - product.price * (product.discount / 100)) * quantity
      : product.price * quantity;

    await db.cartItem.update({
      where: { id: params.cartItemId },
      data: {
        quantity,
        total: newItemTotal,
      },
    });

    const cartItems = await db.cartItem.findMany({
      where: { cartId: params.cartId },
    });

    const newCartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    const updatedCart = await db.cart.update({
      where: { id: params.cartId },
      data: {
        total: newCartTotal,
      },
    });

    return NextResponse.json({
      message: "Cart item quantity updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { message: "Failed to update cart item", error: error },
      { status: 500 }
    );
  }
};
