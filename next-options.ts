import NextAuth from "./auth.config";
import { auth, handlers } from "./auth";

export const authOptions = {
  ...handlers, 
};

export { auth, handlers };
