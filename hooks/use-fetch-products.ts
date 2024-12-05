import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

export const useFetchProducts = (params?: string | null) => {
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await axios.get(`/api/products?${params}`);
    return res.data;
  };

  const { data, isLoading , isFetching} = useQuery<Product[]>({
    queryKey: ["products", params],
    queryFn: fetchProducts,
    enabled: !!params,
    initialData: [],
  });

  return { products: data, isLoading , isFetching };
};
