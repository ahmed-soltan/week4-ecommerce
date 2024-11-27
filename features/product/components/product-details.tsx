"use client";

import {
  FaAngleDown,
  FaAngleUp,
  FaMinus,
  FaPlus,
  FaRegHeart,
} from "react-icons/fa";
import { GrCycle } from "react-icons/gr";
import { FiTruck } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";

import Rating from "@/components/rating";
import ProductDetailsImage from "./product-details-image";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";

import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useFetchProductById } from "../hooks/use-fetch-product-by-id";
import { useProductAction } from "../hooks/use-product-actions";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import useCartStore from "@/app/store/cart-store";
import { toast } from "@/hooks/use-toast";

export const ProductDetails = ({ productId }: { productId: string }) => {
  const user = useCurrentUser();
  const { product, isLoading } = useFetchProductById({ productId });
  const { addToCart, isAddingToCart } = useCart();
  const { addToWishlist, isAddingToWishlist } = useWishlist();
  const {
    cartProduct,
    chars,
    decreaseLength,
    handleColor,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleSelectSizes,
    hasMultipleColor,
    increaseLength,
  } = useProductAction(product!);
  const { addToCart: addToLocalStorageCart } = useCartStore();

  const addProductToCart = () => {
    if (user) {
      addToCart({
        productId: productId,
        quantity: 1,
        selectedImage: cartProduct?.selectedImage!,
        sizes: product?.sizes || [],
      });
    } else {
      const productData = {
        id: product?.id,
        name: product?.name,
        discount: product?.discount,
        price: product?.price,
      };
      addToLocalStorageCart({
        product: productData,
        quantity: cartProduct?.quantity,
        selectedImage: cartProduct?.selectedImage!,
        sizes: product?.sizes || [],
      });
      toast({
        title: "Product added successfully",
        description: "Check your cart to see the updated item.",
        variant: "success",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="grid grid-cols-1 md:grid-cols-5 h-full gap-6 col-span-1 lg:col-span-2">
          <div className="flex flex-col items-center gap-6 h-full">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton className="w-full h-[120px]" key={index} />
            ))}
          </div>
          <div className="cols-span-1 md:col-span-4">
            <div className="w-full h-[600px] relative">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="h-[600px] col-span-1">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  const couldNotAddToCart =
    product.sizes &&
    product.sizes.length > 0 &&
    cartProduct?.sizes.length === 0;

  return (
    <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
      <ProductDetailsImage
        product={product}
        cartProduct={cartProduct}
        handleColor={handleColor}
      />
      <div className="flex flex-col items-start gap-5">
        <h1 className="text-xl font-semibold text-black">{product.name}</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Rating
            rating={product.rating}
            reviewCount={product.reviewCount}
            showWord={true}
          />
          |
          <span className="text-[#00FF66] text-sm">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        {product.discount ? (
          <p className="text-red text-xl font-semibold">
            {formatPrice(
              product.price - product.price * (product.discount / 100)
            )}{" "}
            <span className="ml-2 text-slate-600 line-through font-medium">
              {formatPrice(product.price)}
            </span>
          </p>
        ) : (
          <p className="text-red text-xl font-semibold">
            {formatPrice(product.price)}{" "}
          </p>
        )}
        <p className="text-sm text-gray-800">
          {product.description?.slice(0, chars)}{" "}
          {chars < product.description?.split(" ").join("").length && (
            <span
              className="text-red hover:underline cursor-pointer"
              onClick={increaseLength}
            >
              ...Read More <FaAngleDown className="inline" />
            </span>
          )}
          {chars === product.description?.length && (
            <span
              className="text-red hover:underline cursor-pointer ml-1"
              onClick={decreaseLength}
            >
              Read Less <FaAngleUp className="inline" />
            </span>
          )}
        </p>
        <Separator className="h-1 bg-gray-200" />
        <div className="flex items-center gap-2">
          <h1 className="text-2xl text-black font-medium mr-4">
            Color{hasMultipleColor() && "s"}:{" "}
          </h1>
          {product.images.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => handleColor(image)}
                className={cn(
                  "cursor-pointer rounded-full",
                  cartProduct?.selectedImage?.colorCode === image.colorCode &&
                    "border-2 border-black",
                  image.colorCode === "#FFFFFF" &&
                    cartProduct?.selectedImage?.colorCode !== image.colorCode &&
                    "border"
                )}
              >
                <Hint label={image.color} side="top" align="center">
                  <div
                    key={index}
                    className={cn("h-4 w-4 rounded-full m-1")}
                    style={{ backgroundColor: image.colorCode }}
                  />
                </Hint>
              </div>
            );
          })}
        </div>
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-md font-semibold">Sizes: </p>
            <div className="flex items-center gap-2">
              {product.sizes.map((size, i) => (
                <Button
                  onClick={() => handleSelectSizes(size)}
                  variant="ghost"
                  key={size}
                  className={`border-[1px] rounded-md ${
                    cartProduct?.sizes?.includes(size)
                      ? " text-white bg-red hover:bg-red hover:text-white"
                      : ""
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
            {couldNotAddToCart && (
              <p className="text-red text-xs">Please Select a Size*</p>
            )}
          </div>
        )}
        <div className="flex items-center gap-2 w-full flex-wrap">
          <div className="flex items-center">
            <Button
              variant={"outline"}
              size={"sm"}
              className="rounded-r-none h-10"
              onClick={handleDecreaseQuantity}
            >
              <FaMinus className="w-4 h-4" />
            </Button>
            <Input
              type="number"
              value={cartProduct?.quantity || 1}
              min={1}
              className="w-full max-w-20 h-10 text-center font-bold rounded-none p-0"
              readOnly
            />
            <Button
              variant={"destructive"}
              size={"sm"}
              className="rounded-l-none h-10"
              onClick={handleIncreaseQuantity}
            >
              <FaPlus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"destructive"}
              size={"lg"}
              className="rounded-sm w-full md:max-w-40"
              onClick={addProductToCart}
              disabled={isAddingToCart || couldNotAddToCart}
            >
              {isAddingToCart && <LuLoader2 className="w-5 h-5 animate-spin" />}
              {!isAddingToCart && "Add to Cart"}
            </Button>
            <Hint label="Add To Wishlist" side="top" align="center">
              <Button
                variant={"outline"}
                size={"sm"}
                className="rounded-sm h-10"
                onClick={() => addToWishlist({ productId })}
                disabled={isAddingToWishlist || !user}
              >
                {isAddingToWishlist && (
                  <LuLoader2 className="w-5 h-5 animate-spin" />
                )}
                {!isAddingToWishlist && <FaRegHeart className="w-6 h-6" />}
              </Button>
            </Hint>
          </div>
        </div>
        <div className="flex flex-col items-start w-full my-5">
          <div className="rounded-sm border border-slate-300 p-5 flex items-center w-full gap-5">
            <FiTruck className="w-7 h-7" />
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-lg">Free Delivery</h1>
              <p className="underline text-sm">
                Enter your postal code for Delivery Availability
              </p>
            </div>
          </div>
          <div className="rounded-sm border border-slate-300 p-5 flex items-center w-full gap-5">
            <GrCycle className="w-7 h-7" />
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-lg">Return Delivery</h1>
              <p className="text-sm">Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
