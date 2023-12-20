"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "../appContext";
import toast from "react-hot-toast";
import SupplementItemTile from "../supplements/SupplementItemTile";
import Image from "next/image";

const SupplementItem = (supplementItem) => {
  const { image, name, description, basePrice, sizes, category, flavour } =
    supplementItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedFlavour, setSelectedFlavour] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || flavour.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(supplementItem, selectedSize, selectedFlavour);
    setShowPopup(false);
    toast.success("Added to cart!");
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className=" fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
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
                      <input
                        checked={selectedSize?.name === size.name}
                        type="radio"
                        name={size.name}
                        onClick={() => setSelectedSize(size)}
                      />{" "}
                      {size.name} BDT {basePrice + size.price}
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
                      <input
                        checked={selectedFlavour?.name === flavor.name}
                        type="radio"
                        name={flavor.name}
                        onClick={() => setSelectedFlavour(flavor)}
                      />{" "}
                      {flavor.name}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={handleAddToCartButtonClick}
                className="primary sticky bottom-2"
                type="button"
              >
                Add to cart $ {selectedPrice}
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
