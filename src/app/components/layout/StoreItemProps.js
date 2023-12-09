import { useState } from "react";
import TrashIcon from "../../components/icons/TrashIcon";

const StoreItemPriceProps = () => {
  const [sizes, setSizes] = useState([]);

  function addSize() {
    setSizes((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }

  function editSize(ev, index, prop) {
    const newValue = ev.target.value;
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeSize(indexToRemove) {
    setSizes((prev) => prev.filter((v, i) => i !== indexToRemove));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <label>Sizes</label>
      {sizes.length > 0 &&
        sizes.map((size, index) => (
          <div className="flex items-end gap-2" key={index}>
            <div>
              <labe>Size Name</labe>
              <input
                type="text"
                placeholder="Size Name"
                value={size?.name}
                onChange={(ev) => editSize(ev, index, "name")}
              />
            </div>
            <div>
              <labe>Extra Price</labe>
              <input
                type="text"
                placeholder="Extra Price"
                value={size?.price}
                onChange={(ev) => editSize(ev, index, "price")}
              />
            </div>
            <div>
              <button
                type="button"
                className="bg-white p-2 mb-2 rounded-lg font-bold text-black w-full"
                onClick={() => removeSize(index)}
              >
                <TrashIcon></TrashIcon>
              </button>
            </div>
          </div>
        ))}

      <button
        type="button"
        onClick={addSize}
        className="bg-white p-2 rounded-lg font-bold text-black w-full "
      >
        <span>Add Size</span>
      </button>
    </div>
  );
};

export default StoreItemPriceProps;
