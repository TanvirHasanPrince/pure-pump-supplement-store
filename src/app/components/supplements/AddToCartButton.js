import React from "react";
import FlyingButton from "react-flying-item";

const AddToCartButton = ({ hasSizesAndFlavour, onClick, basePrice, image }) => {
  if (!hasSizesAndFlavour) {
    return (
      <div className="flying-button-parent  my-4">
        <FlyingButton targetTop={"5%"} targetLeft={"80%"} src={image}>
          <div onClick={onClick}>
            <span> Add to cart ৳ {basePrice}</span>
          </div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        className="bg-primary mt-4 text-white rounded-full px-8 py-2 mb-4"
      >
        <span>Starts From ৳ {basePrice} </span>
      </button>
    </div>
  );
};

export default AddToCartButton;
