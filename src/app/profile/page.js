"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated" && session?.data?.user?.name) {
      setUserName(session.data.user.name);
      setImage(session?.data?.user?.image);
    }
  }, [session, status]);

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, image}),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }

  async function handleFileChange(ev) {
    const files = ev?.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      console.log(data.file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link = await response.json();
      setImage(link);
    }
  }

  // const userImage = session?.data?.user?.image;

  return (
    <section className="mt-10">
      <h1 className="text-center text-primary text-4xl font-bold mb-4">
        Profile
      </h1>
      {saved && (
        <h2 className="text-center text-primary font-bold">Profile saved</h2>
      )}
      {isSaving && (
        <h2 className="text-center text-primary font-bold">Saving....</h2>
      )}

      <div className="max-w-lg mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className="relative p-2 rounded-lg max-w-[120px]">
              {image && (
                <Image
                  className="rounded-lg w-full h-full mb-4"
                  src={image}
                  width={200}
                  height={200}
                  alt="User Profile Image"
                ></Image>
              )}

              <label>
                <input type="file" hidden onChange={handleFileChange} />
                <span className="bg-secondary text-black px-8 py-2 rounded-md font-bold cursor-pointer">
                  Edit
                </span>
              </label>
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
