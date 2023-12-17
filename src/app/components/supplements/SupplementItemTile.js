import Image from "next/image";
import React from "react";
import AddToCartButton from "../../components/supplements/AddToCartButton";



const SupplementItemTile = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice, sizes, flavour } = item;

  const hasSizesAndFlavour = sizes?.length > 0 || flavour?.length > 0;

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
      <AddToCartButton
        hasSizesAndFlavour={hasSizesAndFlavour}
        onClick={onAddToCart}
        basePrice={basePrice}
        image={image}
      ></AddToCartButton>
    </div>
  );
};

export default SupplementItemTile;
