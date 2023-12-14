import Image from "next/image";
import React, { useContext } from "react";
import { CartContext } from "../appContext";


const SupplementItem = (supplementItem) => {
  const { image, name, description, basePrice, sizes, category, flavour } =
    supplementItem;

  const { addToCart } = useContext(CartContext);


  return (
    <div className="bg-gray-200 rounded-lg text-center hover:bg-secondary/25 hover:shadow-lg hover:shadow-primary/20 transition-all">
      <div className="text-center">
        <Image
          src={image}
          alt="supplement"
          className="mt-5 p-5 rounded-2xl"
          width={300}
          height={300}
        />
      </div>

      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm">{description.slice(0, 200)}..</p>
      <button
        onClick={() => addToCart(supplementItem)}
        className="bg-primary mt-4 text-white rounded-full px-8 py-2 mb-5"
      >
        Add to cart BDT. {basePrice}
      </button>
    </div>
  );
};

export default SupplementItem;
