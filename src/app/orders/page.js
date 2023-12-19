"use client";
import { useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/useProfile";

const OrdersPage = () => {
  const { loading, data: profile } = useProfile();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders);
      });
    });
  }, []);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin}></UserTabs>
      <div className="text-center">
        <SectionHeaders subHeader={"Orders"}></SectionHeaders>
      </div>
      <div className="mt-2">
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              className="bg-gray-100 mb-2 p-4 rounded-lg grid grid-cols-3 "
              key={order._id}
            >
              <div>{order.userEmail}</div>
              <div>{order.paid ? "Paid" : "Not paid"}</div>
              <div>{order.createdAt}</div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrdersPage;
