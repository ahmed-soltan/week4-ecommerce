import { create } from "zustand";

type CheckoutStoreType = {
  firstName: string;
  email: string;
  streetAddress: string;
  city: string;
  companyName: string | null;
  apartment: string | null;
  phoneNumber: string | null;
  saveInfo: boolean;
  paymentMethod: "cash" | "card";
  cardNumber: string | null;
  cvv: string | null;
  expirationDate: Date | null;
  setCheckoutInfo: (info: Partial<CheckoutStoreType>) => void;
  clearCheckoutInfo: () => void;
  initializeCheckoutFromLocalStorage: () => void;
};

const useCheckoutStore = create<CheckoutStoreType>((set, get) => ({
  firstName: "",
  email: "",
  streetAddress: "",
  city: "",
  companyName: null,
  apartment: null,
  phoneNumber: null,
  saveInfo: false,
  paymentMethod: "cash",
  cardNumber: null,
  cvv: null,
  expirationDate: null,

  initializeCheckoutFromLocalStorage: () => {
    if (typeof window !== "undefined") {
      const savedInfo = localStorage.getItem("checkoutInfo");
      if (savedInfo) {
        set(JSON.parse(savedInfo));
      }
    }
  },

  setCheckoutInfo: (info: Partial<CheckoutStoreType>) => {
    set((state) => {
      const updatedState = { ...state, ...info };
      if (updatedState.saveInfo && typeof window !== "undefined") {
        localStorage.setItem("checkoutInfo", JSON.stringify(updatedState));
      }
      return updatedState;
    });
  },

  clearCheckoutInfo: () => {
    set({
      firstName: "",
      email: "",
      streetAddress: "",
      city: "",
      companyName: null,
      apartment: null,
      phoneNumber: null,
      saveInfo: false,
      paymentMethod: "cash",
      cardNumber: null,
      cvv: null,
      expirationDate: null,
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("checkoutInfo");
    }
  },
}));

if (typeof window !== "undefined") {
  useCheckoutStore.getState().initializeCheckoutFromLocalStorage();
}

export default useCheckoutStore;
