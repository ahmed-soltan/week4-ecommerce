import { useMutation } from "@tanstack/react-query";

export const syncCartWithDb = async (addToCartApi: any) => {
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!localCart || localCart.length === 0) {
    console.log("No items in the local storage cart to sync.");
    return;
  }

  for (const cartItem of localCart) {
    const { product, quantity, sizes, selectedImage } = cartItem;

    try {
      await addToCartApi({
        productId: product.id,
        quantity,
        sizes,
        selectedImage,
      });
    } catch (error) {
      console.error(
        `Failed to sync item with productId: ${product.id}`,
        error
      );
    }
  }

  console.log("Cart synced successfully with the database.");
};
