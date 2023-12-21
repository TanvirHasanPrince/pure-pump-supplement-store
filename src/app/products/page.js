"use client";

import { useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import SupplementItem from "../components/supplements/SupplementItem";

const SupplementPage = () => {
  const [categories, setCatgories] = useState([]);
  const [supplementItems, setSupplementItems] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProducts(true);
      const categoriesResponse = await fetch("/api/categories");
      const supplementItemsResponse = await fetch("/api/supplement-items");

      setCatgories(await categoriesResponse.json());
      setSupplementItems(await supplementItemsResponse.json());
      setLoadingProducts(false);
    };

    fetchData();
  }, []);

  return (
    <section className="mt-8">
      {loadingProducts && <div className="flex items-center justify-center text-primary font-bold">Loading products...</div>}
      {categories.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center ">
              <SectionHeaders subHeader={c.name} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 ml-2">
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
