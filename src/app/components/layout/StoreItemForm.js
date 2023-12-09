import EditableImage from "./EditableImage";
import { useState } from "react";
import StoreItemPriceProps from "../../components/layout/StoreItemProps";

const StoreItemForm = ({ onSubmit, storeItem }) => {
  const [image, setImage] = useState(storeItem?.image || "");
  const [name, setName] = useState(storeItem?.name || "");
  const [description, setDescription] = useState(storeItem?.description || "");
  const [basePrice, setIBasePrice] = useState(storeItem?.basePrice || "");

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
          <StoreItemPriceProps></StoreItemPriceProps>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default StoreItemForm;
