"use client";
import { CartContext } from "@/app/components/appContext";
import AddressInput from "@/app/components/layout/AddressInput";
import SectionHeaders from "@/app/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import CartProduct from '../../components/layout/CartProduct'

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
    }
  }, []);

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Your Order"}></SectionHeaders>
        <div className="my-4">
          <p>Thanks for your order</p>
          <p>We will call you when your order is on the way</p>
        </div>
      </div>

      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>
            {order.cartProducts.map((product, index) => (
              <CartProduct key={index} product={product}></CartProduct>
            ))}
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInput disabled = {true} addressProps={{ ...order }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
