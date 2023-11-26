import React from "react";

const SectionHeaders = ({ subHeader, mainHeader }) => {
  return (
    <div >
      <h3 className="uppercase text-gray-500 font-bold italic">{subHeader}</h3>
      <h2 className="text-primary font-bold text-4xl mb-4">{mainHeader}</h2>
    </div>
  );
};

export default SectionHeaders;
