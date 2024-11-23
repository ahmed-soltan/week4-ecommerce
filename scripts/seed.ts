const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
   try {
    await database.products.createMany({
      data: [
        {
          name: "Amazon Essentials Men's T-Shirt Regular-Fit Short-Sleeve Crewneck, Pack of 2",
          price: 16,
          description:
            "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort.",
          brand: "Amazon Essentials Store",
          categoryId: "6741bcbe3ad5a0618983ed24",
          inStock: true,
          sizes: ["XL", "2XL", "3XL"],
          discount: null,
          images: {
            color: "red",
            image:
              "https://utfs.io/f/ee5b9b8f-5d9e-47cc-80f3-b38ca1673f77-ba58ja.jpg",
            colorCode: "#ff0000",
          },
        },
        {
          name: 'Dell Inspiron 3511 Laptop, 15.6" Full HD Touchscreen, Intel Core i5-1135G7 (Beats Intel i7-1065G7), 32GB DDR4 RAM, 1TB PCIe SSD, SD Card Reader, HDMI, Wi-Fi, Windows 11 Home, Black',
          price: 369,
          description:
            "Experience more with AI: Harness the speed of AMD Ryzen 7 8840U processor for efficient performance. With AMD Ryzen™ AI built-in, make video chat experiences even better with AI-empowered Windows Studios Effects. Crisp visuals on a wide 16:10, 16-inch screen. Built-in Dell ComfortView Plus for comfortable viewing, by reducing harmful blue light without sacrificing true-to-life color. And, enjoy an immersive audio visual experience with Dolby Vision that brings color and contrast to life and Dolby Atmos for a spatial sound experience.",
          brand: "Dell",
          categoryId: "6741bcbe3ad5a0618983ed25",
          inStock: true,
          sizes: [],
          discount: 3,
          images: {
            color: "black",
            image:
              "https://utfs.io/f/cd9a1e07-9d15-49d6-ba14-7631ed21e523-unrc5v.webp",
            colorCode: "#000000",
          },
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
