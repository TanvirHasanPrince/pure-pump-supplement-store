"use client";
import useProfile from "../../components/useProfile";
import UserTabs from "../../components/layout/UserTabs";
import UserForm from "../../components/layout/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const EditUserPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _id: id }),
    });
  }

  if (profileLoading) {
    return "loading user info....";
  }
  if (profileData?.admin) {
    return "Not an idmin";
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
      <UserTabs isAdmin={true}></UserTabs>
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick}></UserForm>
      </div>
    </section>
  );
};

export default EditUserPage;
