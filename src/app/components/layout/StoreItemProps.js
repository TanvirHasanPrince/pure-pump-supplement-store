import { useState } from "react";
import TrashIcon from "../../components/icons/TrashIcon";
import ChevronDown from "../../components/icons/ChevronDown";
import ChevronUp from "../../components/icons/ChevronUp";

const StoreItemPriceProps = ({ name, props, setProps, addLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, i) => i !== indexToRemove));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="inline-flex p-1 border-0  justify-start"
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span>
        <span> ({props?.length})</span>

 
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props.length > 0 &&
          props.map((size, index) => (
            <div className="flex items-end gap-2" key={index}>
              <div>
                <labe>{name}</labe>
                <input
                  type="text"
                  placeholder="Size Name"
                  value={size?.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>
              <div>
                <labe>Extra Price</labe>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={size?.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-white p-2 mb-2 rounded-lg font-bold text-black w-full"
                  onClick={() => removeProp(index)}
                >
                  <TrashIcon></TrashIcon>
                </button>
              </div>
            </div>
          ))}

        <button
          type="button"
          onClick={addProp}
          className="bg-white p-2 rounded-lg font-bold text-black w-full "
        >
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default StoreItemPriceProps;
