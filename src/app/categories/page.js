"use client";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";

const CategoriesPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setIsAdmin(data?.admin);
      });
    });
  }, []);

  if(!isAdmin) {
   return 'Not an admin'
  }


  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true}></UserTabs>
      <h1>Categories</h1>
    </section>
  );
};

export default CategoriesPage;
