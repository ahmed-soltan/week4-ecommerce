import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

export const useFetchProducts = (params: {
  page: number;
  limit: number;
  filters?: string;
}) => {
  const fetchProducts = async (): Promise<{
    products: Product[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> => {
    const res = await axios.get(`/api/products?${params.filters}`, {
      params: {
        page: params.page,
        limit: params.limit,
      },
    });
    return res.data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products", params],
    queryFn: fetchProducts,
    enabled: !!params,
    refetchOnWindowFocus: false,
  });

  return {
    products: data?.products || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.currentPage || 1,
    isLoading,
    isFetching,
  };
};
