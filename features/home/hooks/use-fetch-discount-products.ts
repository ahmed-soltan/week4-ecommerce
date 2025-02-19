import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Product } from "@/types";

export const useFetchDiscountProducts = () => {
  const fetchProducts = async (): Promise<{
    products: Product[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> => {
    const res = await axios.get("/api/products?hasDiscount=true");
    return res.data;
  };

  const { data, isLoading } = useQuery<{
    products: Product[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }>({
    queryKey: ["discountProducts"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
  });

  return { discountProducts: data?.products, isLoading };
};
