"use client";
import { CartContext, cartProductPrice } from "@/app/components/appContext";
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

    let subTotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subTotal += cartProductPrice(product);
    }
  }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-16 lg:gap-16">
          <div>
            {order.cartProducts.map((product, index) => (
              <CartProduct key={index} product={product}></CartProduct>
            ))}
            <div className="py-4 flex items-center justify-end text-primary font-bold">
              <div className="text-gray-500 ">
                Subtotal: <br />
                Delivery Fee:
                <br />
                Total:
              </div>
              <div className=" font-semibold pl-2 text-right">
                ৳ {subTotal} <br />৳ 50 <br></br> {subTotal + 50}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInput disabled={true} addressProps={{ ...order }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
