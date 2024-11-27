import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    console.log(user)

    if (!user || !user.id) {
      throw new Error("You Not Unauthorized, Please Login First")
    }

    const { productId, quantity, sizes, selectedImage } = await req.json();

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { message: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    const product = await db.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const itemTotal = product.discount
      ? (product.price - product.price * (product.discount / 100)) * quantity
      : product.price * quantity;

    const existingCart = await db.cart.findFirst({
      where: { userId: user.id },
    });

    if (existingCart) {
      const cartItems = await db.cartItem.findMany({
        where: {
          cartId: existingCart.id,
        },
      });
      const existingCartItem = cartItems.find(
        (item) => item.productId === productId
      );

      if (existingCartItem) {
        await db.cartItem.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: existingCartItem.quantity + quantity,
            total: existingCartItem.total + itemTotal,
          },
        });
      } else {
        await db.cartItem.create({
          data: {
            cartId: existingCart.id,
            productId,
            quantity,
            total: itemTotal,
            sizes: sizes || [],
            selectedImage,
          },
        });
      }

      const updatedCart = await db.cart.update({
        where: { id: existingCart.id },
        data: {
          total: existingCart.total + itemTotal,
        },
        include: {
          cartItems: true,
        },
      });

      return NextResponse.json({ message: "Cart updated", cart: updatedCart });
    } else {
      const newCart = await db.cart.create({
        data: {
          userId: user.id,
          total: itemTotal,
          cartItems: {
            create: [
              {
                productId,
                quantity,
                total: itemTotal,
                sizes: sizes || [],
                selectedImage,
              },
            ],
          },
        },
        include: { cartItems: true },
      });

      return NextResponse.json({
        message: "Cart created",
        cart: newCart,
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { message: error,  error },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cart = await db.cart.findFirst({
      where: { userId: user.id },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json(
      { message: "Failed to get user" },
      { status: 500 }
    );
  }
};
