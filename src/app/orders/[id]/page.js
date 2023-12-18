'use client'
import { CartContext } from "@/app/components/appContext";
import SectionHeaders from "@/app/components/layout/SectionHeaders";
import React, { useContext, useEffect } from "react";

const OrderPage = () => {
 const {clearCart} = useContext(CartContext)
 useEffect(() => {
   if (typeof window !== "undefined") {
     if (window.location.href.includes("clear-cart=1")) {
       clearCart();
     }
   }
 }, []); 

 
  return (
    <section className="max-w-lg text-center mx-auto mt-8">
      <SectionHeaders mainHeader={"Your Order"}></SectionHeaders>

      <di className="my-4">
        <p>Thanks for your order</p>
        <p>We will call you when your order is on the way</p>
      </di>
    </section>
  );
};

export default OrderPage;
