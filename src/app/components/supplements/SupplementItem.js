import React from "react";

const SupplementItem = () => {
  return (
    <div className="bg-gray-200 rounded-lg text-center hover:bg-secondary/25 hover:shadow-lg hover:shadow-primary/20 transition-all">
      <div className="text-center">
        <img src="ON-whey-protein-png.png" alt="supplement" className="mt-5" />
      </div>

      <h4 className="font-semibold text-xl my-3">Whey Protein</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
        molestiae.
      </p>
      <button className="bg-primary mt-4 text-white rounded-full px-8 py-2 mb-5">
        Add to cart $12
      </button>
    </div>
  );
};

export default SupplementItem;
