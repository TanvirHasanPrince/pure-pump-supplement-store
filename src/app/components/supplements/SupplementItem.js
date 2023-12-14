"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "../appContext";
import toast from "react-hot-toast";
import SupplementItemTile from "../supplements/SupplementItemTile";

const SupplementItem = (supplementItem) => {
  const { image, name, description, basePrice, sizes, category, flavour } =
    supplementItem;
  const [showPopup, setShowPopus] = useState(false);

  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if (sizes.length === 0 && flavour.length === 0) {
      addToCart(supplementItem);
      toast.success("Added to cart!");
    } else {
      setShowPopus(true);
    }
  }

  return (
    <>
      {showPopup && (
        <div className=" fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">Test</div>
        </div>
      )}
      <SupplementItemTile
        onAddToCart={handleAddToCartButtonClick}
        {...supplementItem}
      ></SupplementItemTile>
    </>
  );
};

export default SupplementItem;
