"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user?.name || "");
  const { status } = session;

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function handleProfileInfoUpdate (ev) {
   ev.preventDefault();
   const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify({name:userName})
   })
  }

  const userImage = session?.data?.user?.image;

  return (
    <section className="mt-10">
      <h1 className="text-center text-primary text-4xl font-bold mb-4">
        Profile
      </h1>
      <div className="max-w-lg mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className="relative p-2 rounded-lg">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={userImage}
                width={200}
                height={200}
                alt="User Profile Image"
              ></Image>
              <button className="bg-secondary text-black px-8 py-2 rounded-md font-bold">
                Edit
              </button>
            </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              disabled
              type="email"
              placeholder="Your Name"
              value={session?.data?.user?.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
