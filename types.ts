export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  inStock: boolean;
  sizes: string[];
  discount: number | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
  images: {
    color: string;
    image: string;
    colorCode: string;
  }[];
  rating: number;
  reviewCount: number;
};
