"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Product } from "@/types";

const getProductApi = async (productId: string) => {
  const res = await axios.get(`/api/product/${productId}`);
  return res.data;
};

export const useFetchProductById = ({ productId }: { productId: string }) => {
  const { data, isLoading , refetch:refetchProduct } = useQuery<Product>({
    queryKey: [`/product/${productId}`],
    queryFn: () => getProductApi(productId),
    staleTime: 1000 * 60 * 20,
  });

  return { product: data, isLoading , refetchProduct};
};
