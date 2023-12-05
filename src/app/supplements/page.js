"use client";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/useProfile";
import EditableImage from "../components/layout/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";

const SupplementsPage = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setIbasePrice] = useState("");

  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileLoading) {
    return "loading supplements....";
  }

  if (profileData?.admin) {
    return "Not an idmin";
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = { image, name, description, basePrice };
    console.log(image, name, description, basePrice);
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/supplement-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving supplement data...',
      success: 'Saved!',
      error: 'Something happended!'

    })
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true}></UserTabs>
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-lg mx-auto">
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
    </section>
  );
};

export default SupplementsPage;
