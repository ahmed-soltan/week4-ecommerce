"use client";

import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import useCartStore from "@/app/store/cart-store";

import { useCart } from "@/hooks/use-cart";
import { useCurrentUser } from "@/hooks/use-current-user";

import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";

const CartTable = () => {
  const {
    cartData,
    updateCartItemQuantity,
    isUpdatingQuantity,
    deleteCart,
    isDeletingCart,
  } = useCart();
  const { cartItems, updateQuantity, clearCart } = useCartStore();
  const user = useCurrentUser();

  const increaseQuantity = (itemId: string, quantity: number) => {
    if (user) {
      updateCartItemQuantity({
        cartItemId: itemId,
        quantity: quantity + 1,
        cartId: cartData?.cart.id!,
      });
    } else {
      updateQuantity(itemId, quantity + 1);
    }
  };

  const decreaseQuantity = (itemId: string, quantity: number) => {
    if (quantity > 0) {
      if (user) {
        updateCartItemQuantity({
          cartItemId: itemId,
          quantity: quantity - 1,
          cartId: cartData?.cart.id!,
        });
      } else {
        updateQuantity(itemId, quantity - 1);
      }
    }
  };

  const removeCart = () => {
    if (user) {
      deleteCart({ cartId: cartData?.cart.id! });
    } else {
      clearCart();
    }
  };

  const renderCartRows = () => {
    const items = user ? cartData?.cart?.cartItems : cartItems;

    if (!items || items.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            Your cart is empty.
          </TableCell>
        </TableRow>
      );
    }

    return items.map((item) => (
      <TableRow key={item.id}>
        <TableCell>
          <div className="flex items-center gap-2 max-w-[300px]">
            <Image
              src={item.selectedImage?.image || "/placeholder.png"}
              alt={item.product?.name || "Product"}
              width={50}
              height={50}
            />
            <p className="text-sm line-clamp-2 font-normal">
              {item.product?.name || "Unknown Product"}
            </p>
          </div>
        </TableCell>
        <TableCell className="text-center">
          {formatPrice(item.product?.price || 0)}
        </TableCell>
        <TableCell className="flex items-center justify-center">
          <div
            className={cn(
              "rounded-sm w-16 h-11 border border-slate-400 p-1 flex items-center justify-center gap-3",
              isUpdatingQuantity && "opacity-50 pointer-events-none"
            )}
          >
            <span>
              {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
            </span>
            <div className="flex flex-col items-center">
              <FaAngleUp
                className="w-3 h-3 cursor-pointer"
                onClick={() => increaseQuantity(item.id, item.quantity)}
              />
              <FaAngleDown
                className="w-3 h-3 cursor-pointer"
                onClick={() => decreaseQuantity(item.id, item.quantity)}
              />
            </div>
          </div>
        </TableCell>
        <TableCell className="text-right">
          {formatPrice(item.total || 0)}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="flex flex-col items-start gap-10 w-full">
      {/* Table Wrapper */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Product</TableHead>
            <TableHead className="w-[400px] text-center">Price</TableHead>
            <TableHead className="w-[400px] text-center">Quantity</TableHead>
            <TableHead className="text-right w-[400px]">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderCartRows()}</TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {formatPrice(
                (user
                  ? cartData?.cart?.cartItems || []
                  : cartItems || []
                ).reduce((sum, item) => sum + (item.total || 0), 0)
              )}
            </TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
      {/* Buttons */}
      <div className="flex items-center justify-between flex-wrap w-full">
        <Button
          variant="outline"
          size="lg"
          className="rounded-sm w-[200px] h-12"
          onClick={removeCart}
          disabled={isDeletingCart || isUpdatingQuantity}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartTable;
