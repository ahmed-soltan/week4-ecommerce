import { create } from "zustand";
import { Image } from "@prisma/client";

type CartItemType = {
  id: string;
  quantity: number;
  total: number;
  product: {
    id: string;
    name: string;
    price: number;
    discount: number;
  };
  selectedImage: Image;
  sizes: string[];
};

interface CartState {
  cartItems: CartItemType[];
  total: number;
  addToCart: ({ product, quantity, selectedImage, sizes }: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartLength: () => number;
  initializeCartFromLocalStorage: () => void;
  updateQuantity: (id: string, newQuantity: number) => void;
}

type ProductType = {
  id: string;
  name: string;
  price: number;
  discount: number;
};

type DataType = {
  product: ProductType;
  quantity: number;
  selectedImage: Image;
  sizes: string[];
};

const useCartStore = create<CartState>((set: any, get: any) => ({
  cartItems: [],
  total: 0,

  initializeCartFromLocalStorage: () => {
    if (typeof window !== "undefined") {
      const savedCartItems = localStorage.getItem("cart");
      const savedTotal = localStorage.getItem("total");

      if (savedCartItems) {
        set({ cartItems: JSON.parse(savedCartItems) });
      }
      if (savedTotal) {
        set({ total: JSON.parse(savedTotal) });
      }
    }
  },

  addToCart: ({ product, quantity, selectedImage, sizes }: any) => {
    const currentItems: CartItemType[] = get().cartItems;

    const total =
      (product.price - product.price * (product.discount / 100)) * quantity;

    const existingItem = currentItems.find(
      (cartItem) => cartItem.product.id === product.id
    );

    let updatedItems;
    if (existingItem) {
      updatedItems = currentItems.map((cartItem) =>
        cartItem.id === existingItem.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + quantity,
              total: cartItem.total + total,
            }
          : cartItem
      );
    } else {
      updatedItems = [
        ...currentItems,
        {
          id: `${product.id}-${selectedImage.image}-${sizes.join(",")}`,
          quantity,
          total,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
          },
          selectedImage,
        },
      ];
    }

    // Calculate the total price of all cart items
    const updatedTotal = updatedItems.reduce(
      (sum, cartItem) => sum + cartItem.total,
      0
    );

    set({ cartItems: updatedItems, total: updatedTotal });

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      localStorage.setItem("total", JSON.stringify(updatedTotal));
    }
  },

  removeFromCart: (id: string) => {
    const currentItems: CartItemType[] = get().cartItems;

    const updatedItems = currentItems.filter((cartItem) => cartItem.id !== id);

    const updatedTotal = updatedItems.reduce(
      (sum, cartItem) => sum + cartItem.total,
      0
    );

    set({ cartItems: updatedItems, total: updatedTotal });

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      localStorage.setItem("total", JSON.stringify(updatedTotal));
    }
  },

  updateQuantity: (id: string, newQuantity: number) => {
    const currentItems: CartItemType[] = get().cartItems;

    const updatedItems = currentItems.map((cartItem) =>
      cartItem.id === id
        ? {
            ...cartItem,
            quantity: newQuantity,
            total:
              (cartItem.product.price -
                cartItem.product.price * (cartItem.product.discount / 100)) *
              newQuantity,
          }
        : cartItem
    );

    const updatedTotal = updatedItems.reduce(
      (sum, cartItem) => sum + cartItem.total,
      0
    );

    set({ cartItems: updatedItems, total: updatedTotal });

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      localStorage.setItem("total", JSON.stringify(updatedTotal));
    }
  },

  clearCart: () => {
    set({ cartItems: [], total: 0 });

    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
    }
  },

  cartLength: () => {
    const currentItems: CartItemType[] = get().cartItems;
    return currentItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  },
}));

useCartStore.getState().initializeCartFromLocalStorage();

export default useCartStore;
