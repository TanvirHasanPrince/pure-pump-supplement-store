"use client";
import { useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then(orders => {
       setOrders(orders)
      });
    });
  }, []);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <div className="text-center">
        <SectionHeaders mainHeader={"Orders"}></SectionHeaders>
      </div>
      {
       orders?.length > 0 && orders.map((order)=> (
        <div key={order._id}>{order.createdAt}</div>
       ))
      }
    </section>
  );
};

export default OrdersPage;
