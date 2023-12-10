import EditableImage from "./EditableImage";
import { useEffect, useState } from "react";
import StoreItemPriceProps from "../../components/layout/StoreItemProps";

const StoreItemForm = ({ onSubmit, storeItem }) => {
  const [image, setImage] = useState(storeItem?.image || "");
  const [name, setName] = useState(storeItem?.name || "");
  const [description, setDescription] = useState(storeItem?.description || "");
  const [category, setCategory] = useState(storeItem?.category || "");
  const [categories, setCategories] = useState([]);
  const [basePrice, setIBasePrice] = useState(storeItem?.basePrice || "");
  const [sizes, setSizes] = useState(storeItem?.sizes || []);
  const [flavour, setFlavour] = useState(storeItem?.flavour || []);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          category,
          basePrice,
          sizes,
          flavour,
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
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c, _id) => (
                <option key={_id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setIBasePrice(ev.target.value)}
          />
          <StoreItemPriceProps
            name={"Sizes"}
            addLabel={"Add Supplement Size"}
            props={sizes}
            setProps={setSizes}
          ></StoreItemPriceProps>
          <StoreItemPriceProps
            name={"Flavour"}
            addLabel={"Add Flavour"}
            props={flavour}
            setProps={setFlavour}
          ></StoreItemPriceProps>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default StoreItemForm;
