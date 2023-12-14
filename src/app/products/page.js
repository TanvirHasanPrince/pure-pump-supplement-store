"use client";

import { useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import SupplementItem from "../components/supplements/SupplementItem";

const SupplementPage = () => {
  const [categories, setCatgories] = useState([]);
  const [supplementItems, setSupplementItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesResponse = await fetch("/api/categories");
      const supplementItemsResponse = await fetch("/api/supplement-items");

      setCatgories(await categoriesResponse.json());
      setSupplementItems(await supplementItemsResponse.json());
    };

    fetchData();
  }, []);

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
