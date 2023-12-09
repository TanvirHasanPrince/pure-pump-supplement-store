"use client";
import UserTabs from "../../../components/layout/UserTabs";
import EditableImage from "../../../components/layout/EditableImage";
import Link from "next/link";
import LeftArrow from "@/app/components/icons/LeftArrow";
import useProfile from "../../../components/useProfile";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import StoreItemForm from "../../../components/layout/StoreItemForm";

const EditSupplementItemPage = () => {
  const { id } = useParams();
  const [supplementItem, setSupplementItem] = useState(null);
  const [redirectToSupplements, setRedirectToSupplements] = useState(false);

  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/supplement-items")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((items) => {
        const item = items.find((i) => i._id === id);
        setSupplementItem(item);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (profileLoading) {
    return "loading supplements....";
  }

  if (profileData?.admin) {
    return "Not an idmin";
  }

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/supplement-items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving supplement data...",
      success: "Saved!",
      error: "Something happended!",
    });

    setRedirectToSupplements(true);

    if (redirectToSupplements) {
      return redirect("/supplements");
    }
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true}></UserTabs>
      <div className="max-w-lg mx-auto mt-8 text-center text-sm">
        <Link
          className="bg-primary flex text-center justify-center items-center gap-2 text-white px-4 py-2 rounded-lg uppercase text-sm font-semibold"
          href={"/supplements"}
        >
          Show All Supplements <LeftArrow></LeftArrow>
        </Link>
      </div>
      <StoreItemForm
        onSubmit={handleFormSubmit}
        storeItem={supplementItem}
        className="mt-8 max-w-lg mx-auto"
      ></StoreItemForm>
    </section>
  );
};

export default EditSupplementItemPage;
