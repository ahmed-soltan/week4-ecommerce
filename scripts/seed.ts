const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.products.createMany({
      data: [
        {
          name: "PlayStation®5 console (slim) DualSense® Wireless Controller - White Bundle",
          price: 478,
          description:
            "Purchase together the PlayStation®5 console (slim) + PlayStation DualSense® Wireless Controller - White Bundle",
          brand: "PlayStation Store",
          categoryId: "6741bcbe3ad5a0618983ed2a",
          inStock: true,
          sizes: [],
          discount: null,
          images: [
            {
              color: "white",
              image:
                "https://m.media-amazon.com/images/I/21CaBFa8oCL._SX300_SY300_QL70_FMwebp_.jpg",
              colorCode: "#FFFFFF",
            },
          ],
        },
      ],
    });

    console.log("success");
  } catch (error) {
    console.log("Error Seeding Products", error);
  }
}

main();

//node scripts/seed.ts
