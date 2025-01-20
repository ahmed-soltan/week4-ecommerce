import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { addressId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    if (body.isDefault) {
      const defaultAddress = await db.address.findFirst({
        where: {
          userId: user.id,
          isDefault: true,
        },
      });

      if (defaultAddress) {
        await db.address.update({
          where: { id: defaultAddress.id },
          data: { isDefault: false },
        });
      }
    }

    const updatedAddress = await db.address.update({
      where: { id: params.addressId },
      data: {
        ...body,
      },
    });


    return NextResponse.json(updatedAddress);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating address" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { addressId: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.address.delete({
      where: { userId: user.id, id: params.addressId },
    });

    const existingAddress = await db.address.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!existingAddress)
      return NextResponse.json({ message: "All Addresses has been deleted" });

    const defaultAddress = await db.address.update({
      where: { id: existingAddress.id },
      data: { isDefault: true },
    });

    return NextResponse.json(defaultAddress);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating address" },
      { status: 500 }
    );
  }
};
