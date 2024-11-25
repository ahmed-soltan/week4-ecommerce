"use client";

import Image from "next/image";
import Link from "next/link";
import { FiEye, FiHeart } from "react-icons/fi";
import { differenceInDays } from "date-fns";
import { LuLoader2 } from "react-icons/lu";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Rating from "./rating";

import { formatPrice } from "@/lib/format-price";
import { Product } from "@/types";

import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useWishlist } from "@/hooks/use-wishlist";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isAddingToCart } = useCart();
  const { addToWishlist, isAddingToWishlist } = useWishlist();
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  const isNewProduct = (createdAt: string | Date): boolean => {
    const createdDate = new Date(createdAt);
    const daysDifference = differenceInDays(new Date(), createdDate);
    return daysDifference <= 5;
  };

  const addProductToCart = () => {
    addToCart({ productId: product.id, quantity: 1 });
  };

  const hasOneImage = product.images.length === 1;

  console.log(hasOneImage);

  return (
    <Card className="w-full max-w-[270px] min-w-[200px] h-[350px] relative p-0 border-0 shadow-none cursor-pointer">
      <CardHeader className="p-0 group overflow-hidden space-y-0 bg-[#F5F5F5] mb-2">
        <Image
          src={currentImage.image}
          alt={product.name}
          width={270}
          height={250}
          className="w-full min-h-[200px] max-h-[200px]"
        />
        <div className="translate-y-10 group-hover:-translate-y-0 transition-all rounded-none">
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
              console.log(image.colorCode);
              return (
                <div
                  onClick={() => setCurrentImage(image)}
                  className={cn(
                    " rounded-full",
                    currentImage.colorCode === image.colorCode &&
                      "border-2 border-black",
                    image.colorCode === "#FFFFFF" &&
                      currentImage.colorCode !== image.colorCode &&
                      "border"
                  )}
                >
                  <div
                    key={index}
                    className={cn("h-4 w-4 rounded-full m-1")}
                    style={{ backgroundColor: image.colorCode }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      <div className="flex flex-col items-center gap-2 absolute top-2 right-2">
        <Button
          variant={"outline"}
          size={"icon"}
          className="rounded-full"
          onClick={() => addToWishlist({ productId: product.id })}
          disabled={isAddingToWishlist}
        >
          <FiHeart className="w-4 h-4" />
        </Button>
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
      </div>
      <div className="flex items-start flex-col gap-2 absolute left-2 top-2">
        {product.discount && (
          <div className=" rounded-md bg-red text-white w-12 h-5 flex items-center justify-center text-xs font-thin">
            -{product.discount}%
          </div>
        )}
        {isNewProduct(product.createdAt) && (
          <div className="rounded-md bg-[#00FF66] text-white w-12 h-5 flex items-center justify-center text-xs font-thin">
            New
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
