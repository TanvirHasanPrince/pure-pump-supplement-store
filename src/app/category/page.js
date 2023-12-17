"use client";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/useProfile";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCateory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const data = { name: categoryName };
    if (editedCategory) {
      data._id = editedCategory._id;
    }
    const response = await fetch("/api/categories", {
      method: editedCategory ? "PUT" : "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchCategories();
    setCategoryName("");
    setEditedCateory("");

    if (response.ok && editedCategory) {
      toast.success("Category updated successfully!");
    } else if (response.ok) {
      toast.success("Category created successfully");
    } else toast.error("An Error Occured");
  }

  if (profileLoading) {
    return "loading user info....";
  }

  if (!profileData?.admin) {
    return "Not an idmin";
  }
  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      fetchCategories();
      if (response.ok) {
        resolve();
      } else reject();
    });

    toast.promise(promise, {
      loading: "Deleting..",
      success: "Deleted",
      error: "Error",
    });
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true}></UserTabs>
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label className="">
              {editedCategory ? "Update Category" : "New Category Name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2 ">
            {" "}
            <button type="submit" className="uppercase ">
              {editedCategory ? "Update" : "Create"}
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                setEditedCateory(null);
                setCategoryName("");
              }}
              className=" bg-secondary font-bold uppercase p-2 rounded-lg text-black"
            >
              Cancel
            </button>{" "}
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-primary font-bold text-center uppercase">
          Existing Categories
        </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              className="bg-gray-200 rounded-lg p-2 px-4 flex gap-1 items-center mb-4"
              key={c._id}
            >
              <div className="grow"> {c.name}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditedCateory(c);
                    setCategoryName(c.name);
                  }}
                  type="button"
                  className="bg-secondary font-bold uppercase p-2 mx-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(c._id)}
                  type="button"
                  className="bg-primary font-bold uppercase p-2 rounded-lg text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
