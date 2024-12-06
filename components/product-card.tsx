"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiHeart } from "react-icons/fi";
import { differenceInDays } from "date-fns";
import { LuLoader2, LuTrash2 } from "react-icons/lu";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Rating from "./rating";
import Hint from "./hint";

import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCurrentUser } from "@/hooks/use-current-user";
import useCartStore from "@/store/cart-store";
import { toast } from "@/hooks/use-toast";
import useWishlistStore from "@/store/wishlist-store";

interface ProductCardProps {
  product: Product;
  inWishlist?: boolean;
}

const ProductCard = ({ product, inWishlist }: ProductCardProps) => {
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const user = useCurrentUser();
  const { addToCart, isAddingToCart } = useCart();
  const {
    addToWishlist: addToWishlistDB,
    isAddingToWishlist,
    deleteWishlistProduct,
    isDeletingItem,
    wishlistData,
  } = useWishlist();
  const { addToWishlist: addToWishlistLocalStorage, removeFromWishlist } =
    useWishlistStore();
  const { addToCart: addToLocalStorageCart } = useCartStore();

  const isNewProduct = (createdAt: string | Date): boolean => {
    const createdDate = new Date(createdAt);
    const daysDifference = differenceInDays(new Date(), createdDate);
    return daysDifference <= 5;
  };

  const addProductToCart = () => {
    if (user) {
      addToCart({
        productId: product.id,
        quantity: 1,
        selectedImage: currentImage,
        sizes: product.sizes || [],
      });
    } else {
      const productData = {
        id: product.id,
        name: product.name,
        discount: product.discount,
        price: product.price,
      };
      addToLocalStorageCart({
        product: productData,
        quantity: 1,
        selectedImage: currentImage,
        sizes: product.sizes || [],
      });
    }
  };

  const handleAddToWishlist = () => {
    if (user) {
      addToWishlistDB({ productId: product.id });
    } else {
      addToWishlistLocalStorage({ product: product });
    }
    toast({
      title: "Product added to wishlist",
      description: "Check your wishlist to see the updated item.",
      variant: "success",
    });
  };

  const handleDeleteFromWishlist = () => {
    if (user) {
      deleteWishlistProduct({
        wishlistProductId: product.id,
        wishlistId: wishlistData?.id!,
      });
    } else {
      removeFromWishlist(product.id);
    }
  };

  const hasOneImage = product.images.length === 1;

  const hasMultipleSizes = product.sizes && product.sizes.length > 1;

  return (
    <Card className="w-full max-w-[270px] min-w-[200px] relative p-0 border-0 shadow-none cursor-pointer">
      <CardHeader className="p-0 group overflow-hidden space-y-0 bg-[#F5F5F5] mb-2">
        <Image
          src={currentImage.image}
          alt={product.name}
          width={270}
          height={250}
          className="w-full h-[200px]"
        />
        <div
          className={cn(
            "translate-y-10 transition-all rounded-none",
            !hasMultipleSizes && "group-hover:-translate-y-0"
          )}
        >
          <Button
            className="w-full text-md bg-black rounded-t-none"
            size={"lg"}
            onClick={addProductToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart && <LuLoader2 className="w-5 h-5 animate-spin" />}
            {!isAddingToCart && "Add to Cart"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start p-0 pb-2 gap-2">
        <h1 className="text-black text-md line-clamp-2 font-medium">
          {product.name}
        </h1>
        {product.discount ? (
          <p className="text-red text-sm font-semibold">
            {formatPrice(
              product.price - product.price * (product.discount / 100)
            )}{" "}
            <span className="ml-2 text-slate-600 line-through font-medium">
              {formatPrice(product.price)}
            </span>
          </p>
        ) : (
          <p className="text-red text-sm font-semibold">
            {formatPrice(product.price)}{" "}
          </p>
        )}
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        {!hasOneImage && (
          <div className="flex items-center gap-2">
            {product.images.map((image, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setCurrentImage(image)}
                  className={cn(
                    "cursor-pointer rounded-full",
                    currentImage.colorCode === image.colorCode &&
                      "border-2 border-black",
                    image.colorCode === "#FFFFFF" &&
                      currentImage.colorCode !== image.colorCode &&
                      "border"
                  )}
                >
                  <Hint label={image.color} side="bottom" align="center">
                    <div
                      className={cn("h-4 w-4 rounded-full m-1")}
                      style={{ backgroundColor: image.colorCode }}
                    />
                  </Hint>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      <div className="flex flex-col items-center gap-2 absolute top-2 right-2">
        {!inWishlist && (
          <Hint label="Add To Wishlist" side="right" align="start">
            <Button
              variant={"outline"}
              size={"icon"}
              className="rounded-full"
              onClick={handleAddToWishlist}
              disabled={isAddingToWishlist}
            >
              {isAddingToWishlist && (
                <LuLoader2 className="w-5 h-5 animate-spin" />
              )}
              {!isAddingToWishlist && <FiHeart className="w-4 h-4" />}
            </Button>
          </Hint>
        )}
        {inWishlist && (
          <Hint label="Remove From Wishlist" side="right" align="start">
            <Button
              variant={"destructive"}
              size={"icon"}
              className="rounded-full"
              onClick={handleDeleteFromWishlist}
              disabled={isDeletingItem}
            >
              {isDeletingItem && <LuLoader2 className="w-5 h-5 animate-spin" />}
              {!isDeletingItem && <LuTrash2 className="w-4 h-4" />}
            </Button>
          </Hint>
        )}
        <Hint label="View Product" side="right" align="start">
          <Button
            variant={"outline"}
            size={"icon"}
            className="rounded-full"
            asChild
          >
            <Link href={`/product/${product.id}`}>
              <FiEye className="w-4 h-4" />
            </Link>
          </Button>
        </Hint>
      </div>
      <div className="flex items-start flex-col gap-2 absolute left-2 top-2">
        {product.discount && (
          <div
            className=" rounded-md bg-red text-white w-12 h-5 flex
           items-center justify-center text-xs font-thin"
          >
            -{product.discount}%
          </div>
        )}
        {isNewProduct(product.createdAt) && (
          <div
            className="rounded-md bg-[#00FF66] text-white w-12 h-5 
          flex items-center justify-center text-xs font-thin"
          >
            New
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
