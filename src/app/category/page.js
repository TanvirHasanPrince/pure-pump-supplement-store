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

  if (profileData?.admin) {
    return "Not an idmin";
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
          <div className="pb-2">
            {" "}
            <button type="submit" className="">
              {editedCategory ? "Update" : "Create"}
            </button>{" "}
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-primary font-bold text-center uppercase">
          Edit Category
        </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              onClick={() => {
                setEditedCateory(c);
                setCategoryName(c.name);
              }}
              className="bg-gray-200 rounded-lg p-2 px-4 flex gap-1 cursor-pointer mb-4"
              key={c._id}
            >
              <span> {c.name}</span>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
