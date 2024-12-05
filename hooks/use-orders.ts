import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "./use-toast";
import { useCart } from "./use-cart";
import { Order, OrderItem } from "@prisma/client";

type OrderType = Order & {
  orderItems: {
    id: string;
    quantity: number;
    total: number;
    sizes: string[];
    orderId: string;
    productId: string;
    selectedImage: {
      color: string;
      image: string;
      colorCode: string;
    };
    product: {
      name: string;
    };
  }[];
};

const createOrderApi = async ({ data }: { data: any }) => {
  const response = await axios.post("/api/orders", data);
  return response.data;
};

const getOrdersApi = async (): Promise<Order[]> => {
  const response = await axios.get("/api/orders");
  return response.data;
};

const getRefundedOrdersApi = async (): Promise<Order[]> => {
  const response = await axios.get("/api/orders/refunded");
  return response.data;
};

const getCancelOrdersApi = async (): Promise<Order[]> => {
  const response = await axios.get("/api/orders/cancelled");
  return response.data;
};

const getOrderByIdApi = async (id: string): Promise<OrderType> => {
  const response = await axios.get(`/api/orders/${id}`);
  return response.data;
};

const returnOrderApi = async (id: string): Promise<OrderType> => {
  const response = await axios.post(`/api/orders/${id}/return`);
  return response.data;
};

const cancelOrderApi = async (id: string): Promise<OrderType> => {
  const response = await axios.post(`/api/orders/${id}/cancel`);
  return response.data;
};

export const useOrders = () => {
  const router = useRouter();
  const { deleteCart, cartData } = useCart();
  const params = useParams();

  const orderId = params.orderId as string;

  const { data: orders, isLoading: isLoadingOrders } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrdersApi,
  });
  const { data: returns, isLoading: isLoadingReturns } = useQuery<Order[]>({
    queryKey: ["returns"],
    queryFn: getRefundedOrdersApi,
  });
  const { data: cancellations, isLoading: isLoadingCancellation } = useQuery<
    Order[]
  >({
    queryKey: ["cancellations"],
    queryFn: getCancelOrdersApi,
  });

  const {
    data: order,
    isLoading: isLoadingOrderById,
    refetch,
  } = useQuery<OrderType>({
    queryKey: [`order/${orderId}`, orderId],
    queryFn: () => getOrderByIdApi(orderId),
    enabled: !!orderId,
  });

  const { mutate: createOrder, isPending: isCreatingOrder } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      deleteCart({ cartId: cartData?.cart.id! });
      router.push("/checkout/success");
      toast({
        variant: "success",
        title: "Order Created",
        description: "Your order has been placed successfully.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error Creating Order",
        description:
          "An error occurred while creating your order. Please try again later.",
      });
    },
  });

  const { mutate: returnOrder, isPending: isReturningOrder } = useMutation({
    mutationFn: returnOrderApi,
    onSuccess: () => {
      refetch();
      router.push("/profile/orders");
      toast({
        variant: "success",
        title: "Order Returned Successfully",
        description:
          "We Will Return your money and get back the order withing 2 days",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error Returning Order",
        description:
          "An error occurred while returning your order. Please try again later.",
      });
    },
  });

  const { mutate: cancelOrder, isPending: isCancellingOrder } = useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      refetch();
      router.push("/profile/orders");
      toast({
        variant: "success",
        title: "Order Cancel Successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error cancelling Order",
        description:
          "An error occurred while cancelling your order. Please try again later.",
      });
    },
  });

  return {
    createOrder,
    isCreatingOrder,
    orders,
    isLoadingOrders,
    order,
    isLoadingOrderById,
    returnOrder,
    isReturningOrder,
    cancelOrder,
    isCancellingOrder,
    deleteCart,
    cartData,
    returns,
    isLoadingReturns,
    cancellations,
    isLoadingCancellation,
  };
};
