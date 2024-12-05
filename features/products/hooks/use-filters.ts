import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useFilters = () => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string[] | null>>({});

  useEffect(() => {
    const filterObj: Record<string, string[] | null> = {};

    searchParams.forEach((value, key) => {
      if (filterObj[key]) {
        filterObj[key] = [...(filterObj[key] || []), value];
      } else {
        filterObj[key] = [value];
      }
    });

    setFilters(filterObj);
  }, [searchParams]);

  const updateFilter = (key: string, values: string[] | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: values,
    }));
  };

  const generateQueryString = () => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      if (values) {
        values.forEach((value) => {
          queryParams.append(key, value);
        });
      }
    });
    return queryParams.toString();
  };

  return {
    params: generateQueryString(),
    filters,
    updateFilter,
  };
};
