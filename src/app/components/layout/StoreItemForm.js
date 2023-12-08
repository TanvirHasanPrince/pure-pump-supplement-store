import EditableImage from "./EditableImage";
import { useState } from "react";
import { useParams } from "next/navigation";

const StoreItemForm = ({ onSubmit, storeItem }) => {
  const [image, setImage] = useState(storeItem?.image || "");
  const [name, setName] = useState(storeItem?.name || "");
  const [description, setDescription] = useState(storeItem?.description || "");
  const [basePrice, setIbasePrice] = useState(storeItem?.basePrice || "");
  return (
    <div>
      <form onSubmit={onSubmit} className="mt-8 max-w-lg mx-auto">
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
              onChange={(ev) => setIbasePrice(ev.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StoreItemForm;
