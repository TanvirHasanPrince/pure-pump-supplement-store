"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/useProfile";
import Link from "next/link";

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
    <section className="max-w-2xl  mx-auto mt-8 ">
      <UserTabs isAdmin={true}></UserTabs>

      <h1>This is user page</h1>
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-4 flex justify-between items-center"
            >
              <div className="grid grid-cols-2 gap-4  text-gray-900 grow">
                {!!user.name && <span>{user?.name}</span>}
                {!user.name && <span className="italic">No Name</span>}

                <div>
                  <span className="flex gap-4 text-gray-600">
                    {user?.email}
                  </span>
                </div>
              </div>
              <div>
                <Link
                  href={"users/" + user._id}
                  className="bg-secondary uppercase text-black px-8 py-2 rounded-md font-bold"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UserPage;
