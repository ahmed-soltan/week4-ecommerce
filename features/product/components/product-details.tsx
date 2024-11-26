"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaShippingFast,
} from "react-icons/fa";
import { GrCycle } from "react-icons/gr";
import { FiTruck } from "react-icons/fi";

import Rating from "@/components/rating";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";

import { useFetchProductById } from "@/features/product/hooks/use-fetch-product-by-id";

export type CartProductType = {
  productId: string;
  name: string;
  quantity: number;
  selectedImage: {
    image: string;
    color: string;
    colorCode: string;
  } | null;
  category: string;
  priceAfterDiscount: number;
  sizes: string[];
};

export const ProductDetails = ({ productId }: { productId: string }) => {
  const { product, isLoading } = useFetchProductById({ productId });
  const [cartProduct, setCartProduct] = useState<CartProductType | null>(null);
  const [chars, setChars] = useState(235);

  useEffect(() => {
    if (product) {
      setCartProduct({
        productId: product.id,
        name: product.name,
        selectedImage: { ...product.images[0] },
        quantity: 1,
        category: product.category.name,
        priceAfterDiscount:
          product.price -
          (product.price * (product?.discount || 0 * 100)) / 100,
        sizes: [],
      });
    }
  }, [product]);

  if (isLoading) {
    return <div className="w-full h-full grid "></div>;
  }

  if (!product) return null;

  const handleColor = (image: {
    color: string;
    image: string;
    colorCode: string;
  }) => {
    setCartProduct((prev: any) => {
      return { ...prev, selectedImage: image };
    });
  };

  const increaseLength = () => {
    setChars(product.description.length);
  };

  const decreaseLength = () => {
    setChars(200);
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

  return (
    <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full gap-6 col-span-1 lg:col-span-2">
        <div className="flex flex-col items-center gap-6 h-full">
          {product.images.map((image, index) => (
            <div
              className={cn(
                "w-full h-[120px] relative bg-[#F5F5F5] p-2 rounded-md border-2",
                cartProduct?.selectedImage?.image === image.image &&
                  "border-red"
              )}
              key={index}
              onClick={() => handleColor(image)}
            >
              <Image
                src={image.image}
                alt={product.name}
                width={100}
                height={100}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
        <div className="cols-span-1 md:col-span-4">
          <div className="w-full h-[550px] relative">
            <Image
              src={cartProduct?.selectedImage?.image || ""}
              alt={product.name}
              fill
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-5">
        <h1 className="text-xl font-semibold text-black">{product.name}</h1>
        <div className="flex items-center gap-2">
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
          {product.description.slice(0, chars)}{" "}
          {chars < product.description.split(" ").join("").length && (
            <span
              className="text-red hover:underline cursor-pointer"
              onClick={increaseLength}
            >
              ...Read More <FaAngleDown className="inline" />
            </span>
          )}
          {chars === product.description.length && (
            <span
              className="text-red hover:underline cursor-pointer ml-1"
              onClick={decreaseLength}
            >
              Read Less <FaAngleUp className="inline" />
            </span>
          )}
        </p>
        <Separator className="h-1 bg-gray-200" />
        {hasMultipleColor() && (
          <div className="flex items-center gap-2">
            <h1 className="text-2xl text-black font-medium mr-4">Colors: </h1>
            {product.images.map((image, index) => {
              return (
                <div
                  onClick={() => handleColor(image)}
                  className={cn(
                    "cursor-pointer rounded-full",
                    cartProduct?.selectedImage?.colorCode === image.colorCode &&
                      "border-2 border-black",
                    image.colorCode === "#FFFFFF" &&
                      cartProduct?.selectedImage?.colorCode !==
                        image.colorCode &&
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
        {!hasMultipleColor && (
          <p className="text-sm ">Color: {cartProduct?.selectedImage?.color}</p>
        )}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-2">
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
          </div>
        )}
        <div className="flex items-center gap-2 w-full flex-wrap">
          <div className="flex items-center">
            <Button
              variant={"outline"}
              size={"sm"}
              className="rounded-r-none h-10"
            >
              <FaMinus className="w-4 h-4" />
            </Button>
            <Input
              type="number"
              value={cartProduct?.quantity || 1}
              min={1}
              className="w-full max-w-20 h-10 text-center font-bold rounded-none p-0"
            />
            <Button
              variant={"destructive"}
              size={"sm"}
              className="rounded-l-none h-10"
            >
              <FaPlus className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant={"destructive"}
            size={"lg"}
            className="rounded-sm w-full max-w-40"
          >
            Buy Now
          </Button>
          <Button variant={"outline"} size={"sm"} className="rounded-sm h-10">
            <FaRegHeart className="w-6 h-6" />
          </Button>
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
              <p className="text-sm">
                Free 30 Days Delivery Returns. Details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
