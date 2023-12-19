"use client";
import { useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/useProfile";
import { dbStandardTime } from "../../libs/DataTime";

const OrdersPage = () => {
  const { loading: profileLoading, data: profile } = useProfile();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
      })
      .then((orders) => {
        setOrders(orders);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (profileLoading) {
    return "loading orders....Please wait";
  }

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
              <div className="text-center">
                <span
                  className={
                    order?.paid
                      ? "bg-secondary font-bold text-black p-2 rounded-lg"
                      : "bg-primary text-white font-bold  p-2 rounded-lg"
                  }
                >
                  {" "}
                  {order.paid ? "Paid" : "Not paid"}
                </span>
              </div>
              <div>{dbStandardTime(order.createdAt)}</div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrdersPage;
