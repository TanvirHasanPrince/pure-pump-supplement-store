"use client";

import { useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import SupplementItem from "../components/supplements/SupplementItem";

const SupplementPage = () => {
  const [categories, setCatgories] = useState([]);
  const [supplementItems, setSupplementItems] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCatgories(categories));
    });
    fetch("/api/supplement-items").then((res) => {
      res.json().then((supplementItems) => setSupplementItems(supplementItems));
    });
  });
  return (
    <section className="mt-8">
      {categories.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center ">
              <SectionHeaders subHeader={c.name} />
            </div>
            <div className="grid grid-cols-4 gap-4 mg-6 mb-12">
              {supplementItems
                .filter((m) => m.category === c._id)
                .map((item) => (
                  <SupplementItem key={item._id} {...item}></SupplementItem>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default SupplementPage;
