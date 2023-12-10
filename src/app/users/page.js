"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/useProfile";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((response) =>
      response.json().then((users) => {
        setUsers(users);
      })
    );
    console.log(users);
  }, []);

  const { loading: profileLoading, data: profileData } = useProfile();
  if (profileLoading) {
    return "loading user info....";
  }
  if (profileData?.admin) {
    return "Not an idmin";
  }

  return (
    <section className="max-w-lg mx-auto ">
      <UserTabs isAdmin={true}></UserTabs>

      <h1>This is user page</h1>
      {users?.length > 0 &&
        users.map((user) => (
          <div key={user._id} className="bg-gray-300 rounded-lg mb-2 p-4 flex">
            <div>
              <span>{user?.name}</span>
              <span>{user?.email}</span>
            </div>
            <div>
              <button>Edit user</button>
            </div>
          </div>
        ))}
    </section>
  );
};

export default UserPage;
