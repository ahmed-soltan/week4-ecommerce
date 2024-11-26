import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRelatedProducts = async (productId: string) => {
  const res = await axios.get(`/api/product/${productId}/related-products`);
  return res.data;
};

export const useRelatedProducts = ({
  productId,
}: {
  productId: string;
}) => {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: [`relatedProducts/${productId}`],
    queryFn: () => fetchRelatedProducts(productId),
    initialData: [],
  });

  return {
    relatedProducts: data,
    isLoading,
  };
};
