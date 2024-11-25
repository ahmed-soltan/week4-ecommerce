"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Category } from "@prisma/client";

const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/api/categories");
  return response.data;
};

export const useCategories = () => {
  const { data, isLoading , isFetching , isPending} = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return { categories: data, isLoading , isFetching , isPending};
};
