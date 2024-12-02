import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const OrderSchema = z.object({
  orderItems: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
      total: z.number().positive(),
      sizes: z.array(z.string()).optional(),
      selectedImage: z.object({
        image: z.string(),
        color: z.string(),
        colorCode: z.string(),
      }),
    })
  ),
  total: z.number().positive(),
  firstName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  streetAddress: z.string().min(5),
  city: z.string().min(2),
  apartment: z.string().optional(),
  companyName: z.string().optional(),
  paymentMethod: z.enum(["cash", "card"]),
  cardNumber: z.string().optional(),
  cvv: z.string().optional(),
  expirationDate: z.string().optional(),
});

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const parsedBody = await req.json();
    const validatedBody = OrderSchema.parse(parsedBody);

    if (
      validatedBody.paymentMethod === "card" &&
      (!validatedBody.cardNumber ||
        !validatedBody.cvv ||
        !validatedBody.expirationDate)
    ) {
      return NextResponse.json(
        { message: "Card details are required for card payment" },
        { status: 400 }
      );
    }

    const order = await db.order.create({
      data: {
        userId: user.id,
        total: validatedBody.total,
        firstName: validatedBody.firstName,
        email: validatedBody.email,
        phoneNumber: validatedBody.phoneNumber,
        streetAddress: validatedBody.streetAddress,
        city: validatedBody.city,
        apartment: validatedBody.apartment,
        companyName: validatedBody.companyName,
        paymentMethod: validatedBody.paymentMethod,
        cardNumber: validatedBody.cardNumber || null,
        cvv: validatedBody.cvv || null,
        expirationDate: validatedBody.expirationDate
          ? new Date(validatedBody.expirationDate)
          : null,
        orderItems: {
          create: validatedBody.orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            total: item.total,
            sizes: item.sizes || [],
            selectedImage: item.selectedImage,
          })),
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orders = await db.order.findMany({
      where: { userId: user.id },
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
