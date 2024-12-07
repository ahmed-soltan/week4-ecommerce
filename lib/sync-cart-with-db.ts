import { db } from "./db";

export const syncCartWithDb = async (userId:string , localCart:any) => {
  if (!userId) {
    console.error("User ID is required to sync cart with database.");
    return;
  }

  if (!localCart || localCart.length === 0) {
    console.log("No items in the local storage cart to sync.");
    return;
  }

  try {
    let userCart = await db.cart.findFirst({
      where: { userId },
      include: { cartItems: true },
    });

    if (!userCart) {
      userCart = await db.cart.create({
        data: { userId, total: 0 },
        include: { cartItems: true },
      });
    }

    for (const cartItem of localCart) {
      const { product, quantity, sizes, selectedImage } = cartItem;

      const productFromDb = await db.products.findUnique({
        where: { id: product.id },
      });

      if (!productFromDb) {
        console.warn(`Product with ID: ${product.id} not found.`);
        continue;
      }

      const itemTotal = productFromDb.discount
        ? (productFromDb.price - productFromDb.price * (productFromDb.discount / 100)) * quantity
        : productFromDb.price * quantity;

      const existingCartItem = userCart.cartItems.find(
        (item) =>
          item.productId === product.id &&
          JSON.stringify(item.sizes) === JSON.stringify(sizes) &&
          item.selectedImage?.image === selectedImage?.image
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
            cartId: userCart.id,
            productId: product.id,
            quantity,
            total: itemTotal,
            sizes,
            selectedImage,
          },
        });
      }

      await db.cart.update({
        where: { id: userCart.id },
        data: { total: userCart.total + itemTotal },
      });
    }

    console.log("Cart successfully synced with the database.");
  } catch (error) {
    console.error("Error syncing cart with database:", error);
  }
};
