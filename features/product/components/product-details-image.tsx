import Image from "next/image";

import {
  CartProductType,
  useProductAction,
} from "../hooks/use-product-actions";

import { cn } from "@/lib/utils";

import { Product } from "@/types";
import { Image as ImageType } from "@prisma/client";

interface ProductDetailsImageProps {
  product: Product;
  cartProduct: CartProductType | null;
  handleColor: (image: ImageType) => void;
}

const ProductDetailsImage = ({
  product,
  cartProduct,
  handleColor,
}: ProductDetailsImageProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-full gap-6 col-span-1 lg:col-span-2">
      <div className="flex flex-col items-center gap-6 h-full">
        {product.images.map((image, index) => (
          <div
            className={cn(
              "w-full h-[120px] relative bg-[#F5F5F5] p-2 rounded-md border-2",
              cartProduct?.selectedImage?.image === image.image && "border-red"
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
  );
};

export default ProductDetailsImage;
