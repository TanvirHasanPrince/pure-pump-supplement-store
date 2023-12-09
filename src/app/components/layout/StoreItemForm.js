import EditableImage from "./EditableImage";
import { useState } from "react";

const StoreItemForm = ({ onSubmit, storeItem }) => {
  const [image, setImage] = useState(storeItem?.image || "");
  const [name, setName] = useState(storeItem?.name || "");
  const [description, setDescription] = useState(storeItem?.description || "");
  const [basePrice, setIBasePrice] = useState(storeItem?.basePrice || "");
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

  function removeSize(index) {
    setSizes(prev => prev.filter((v,i)=> i !== index))
  }

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
        })
      }
      className="mt-8 max-w-lg mx-auto"
    >
      <div
        className="grid items-start gap-2"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="">
          <EditableImage link={image} setLink={setImage}></EditableImage>
        </div>
        <div className="grow">
          <label>Supplement Name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setIBasePrice(ev.target.value)}
          />
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
                      className="bg-white p-2 mb-2  font-bold text-black w-full"
                      onClick={() => removeSize(index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}

            <button
              type="button"
              onClick={addSize}
              className="bg-white p-2 rounded-lg font-bold text-black w-full"
            >
              Add Size (like 2lb or 5lb){" "}
            </button>
          </div>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default StoreItemForm;
