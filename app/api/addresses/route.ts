import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const addresses = await db.address.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const existingAddresses = await db.address.findMany({
      where: { userId: user.id },
    });

    let address;

    if (existingAddresses.length === 0 && !body.isDefault) {
      address = await db.address.create({
        data: {
          ...body,
          isDefault: true,
          userId: user.id,
        },
      });
      return NextResponse.json(address);
    }

    address = await db.address.create({
      data: {
        ...body,
        userId: user.id,
      },
    });

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

    return NextResponse.json(address);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating address" },
      { status: 500 }
    );
  }
};
