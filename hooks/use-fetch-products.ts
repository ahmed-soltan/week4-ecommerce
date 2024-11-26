import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Product } from "@/types";

export const useFetchProducts = () => {
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await axios.get("/api/products");
    return res.data;
  };

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: [],
    staleTime: 1000 * 60 * 20
  });

  return { products: data, isLoading };
};
