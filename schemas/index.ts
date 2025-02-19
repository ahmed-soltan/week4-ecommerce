import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(5).max(500),
});

export const ProfileSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
});

export const AddressSchema = z.object({
  street: z.string().min(5).max(100).optional(),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  zipCode: z.string().min(5).max(10),
  country: z.string().min(2).max(50),
  isDefault: z.boolean(),
});

export const CheckoutFormSchema = z
  .object({
    firstName: z.string().min(3).max(50),
    companyName: z.string().optional(),
    streetAddress: z.string().min(3).max(100),
    apartment: z.string().optional(),
    city: z.string().min(2).max(50),
    phoneNumber: z.string().min(10),
    email: z.string().email(),
    saveInfo: z.boolean().optional(),
    paymentMethod: z.enum(["card", "cash"]),
    cardNumber: z.string().optional(),
    cvv: z.string().optional(),
    expirationDate: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "card") {
        return (
          data.cardNumber !== undefined &&
          data.cvv !== undefined &&
          data.expirationDate !== undefined
        );
      }
      return true;
    },
    {
      message: "Card details are required for card payment",
      path: ["paymentMethod"],
    }
  );
