import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

export const useHomeProducts = () => {
  const fetchProducts = async (): Promise<{
    products: Product[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> => {
    const res = await axios.get(`/api/products`);
    return res.data;
  };

  const { data, isLoading, isFetching } = useQuery<{
    products: Product[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    staleTime:Infinity,
    refetchInterval:Infinity,
  });

  return { products: data?.products, isLoading, isFetching };
};
