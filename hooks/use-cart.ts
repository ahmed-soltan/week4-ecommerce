"use client"

import { useState } from "react";

export const useCart = () =>{
    const [cart , setCart] = useState([]);
    const cartItemsLength = cart.length;

    return {
        cartItemsLength,
        cart
    }
}