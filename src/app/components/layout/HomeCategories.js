"use client";

import { useEffect, useState } from "react";
import SupplementItem from "../supplements/SupplementItem";
import SectionHeaders from "./SectionHeaders";

const HomeCategories = () => {
  const [last8, setLast8] = useState([])
  useEffect(() => {
    fetch("/api/supplement-items").then((res) => {
      res.json().then((supplementItems) => {
        const last8 = supplementItems.slice(-8);
        setLast8(last8);
      });
    });
  }, []);

  return (
    <section className="mt-10">
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"Check Our"}
          mainHeader={"Supplements"}
        ></SectionHeaders>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {last8?.length > 0 &&
          last8.map((item) => <SupplementItem key={item._id} {...item}></SupplementItem>)}
      </div>
    </section>
  );
};

export default HomeCategories;
