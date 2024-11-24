import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Product } from "@/types";

export const useFetchDiscountProducts = () => {
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await axios.get("/api/products?hasDiscount=true");
    return res.data;
  };

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["discountProducts"],
    queryFn: fetchProducts,
    initialData: [],
  });

  return { discountProducts: data, isLoading };
};
