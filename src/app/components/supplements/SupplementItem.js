"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "../appContext";
import toast from "react-hot-toast";
import SupplementItemTile from "../supplements/SupplementItemTile";
import Image from "next/image";

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
          <div className="my-8 bg-white p-2 rounded-lg max-w-md">
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                width={200}
                height={200}
                className="mx-auto"
                alt="Supplement Image"
              ></Image>
              <h1 className="text-lg font-bold text-center mb-2">{name}</h1>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>

              {sizes?.length > 0 && (
                <div className="rounded-md p-2">
                  <h3 className="text-center text-gray-500 mb-2">Pick Size</h3>
                  {sizes.map((size, i) => (
                    <label
                      className="flex items-center gap-2 p-4 rounded-md mb-1 border"
                      key={i}
                    >
                      <input type="radio" name={size.name} /> {size.name} BDT{" "}
                      {basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}

              {flavour?.length > 0 && (
                <div className="rounded-md p-2">
                  <h3 className="text-center text-gray-500 mb-2">
                    Pick Flavour
                  </h3>
                  {flavour.map((flavor, i) => (
                    <label
                      className="flex items-center gap-2 p-4 rounded-md mb-1 border"
                      key={i}
                    >
                      <input type="radio" name={flavor.name} /> {flavor.name}{" "}
                      BDT {flavor.price}
                    </label>
                  ))}
                </div>
              )}
              <button className="primary" type="button">
                {" "}
                Add to cart selected price{" "}
              </button>
            </div>
          </div>
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
