import { Product } from "@/types";
import { Image } from "@prisma/client";
import { useEffect, useState } from "react";

export type CartProductType = {
  productId: string;
  quantity: number;
  selectedImage: Image;
  sizes: string[];
};

export const useProductAction = (product: Product) => {
  const [cartProduct, setCartProduct] = useState<CartProductType | null>(null);
  const [chars, setChars] = useState(235);

  useEffect(() => {
    if (product) {
      setCartProduct({
        productId: product.id,
        selectedImage: { ...product.images[0] },
        quantity: 1,
        sizes: [],
      });
    }
  }, [product]);

  const handleColor = (image: Image) => {
    setCartProduct((prev: any) => {
      return { ...prev, selectedImage: image };
    });
  };

  const increaseLength = () => {
    setChars(product.description.length);
  };

  const decreaseLength = () => {
    setChars(235);
  };

  const hasMultipleColor = () => {
    const colors = new Set(product.images.map((image) => image.color));
    return colors.size >= 2;
  };

  const handleSelectSizes = (size: string) => {
    setCartProduct((prev: any) => {
      const index = prev?.sizes?.indexOf(size);

      if (index !== -1) {
        const updatedSizes = prev?.sizes?.filter((s: any) => s !== size);
        return { ...prev, sizes: updatedSizes };
      } else {
        const updatedSizes = [...(prev?.sizes || []), size];
        return { ...prev, sizes: updatedSizes };
      }
    });
  };

  const handleIncreaseQuantity = () => {
    setCartProduct((prev: any) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (cartProduct?.quantity! > 1) {
      return setCartProduct((prev: any) => ({
        ...prev,
        quantity: prev.quantity - 1,
      }));
    }
  };

  return {
    cartProduct,
    handleColor,
    increaseLength,
    decreaseLength,
    hasMultipleColor,
    handleSelectSizes,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    chars,
  };
};
