"use client";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoText from "../components/layout/InfoText";
import toast from "react-hot-toast";
import UserTabs from "../components/layout/UserTabs";
import UserForm from "../components/layout/UserForm";

const ProfilePage = () => {
  const session = useSession();

  const [user, setUser] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data?.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setIsSaving(false);
    if (response.ok) {
      toast.success("Profile Saved Successfully!");
    } else {
      toast.error("Profile could not be updated");
    }
  }

  async function handleFileChange(ev) {
    const files = ev?.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      console.log(data.file);
      setIsUploading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link = await response.json();
      setLink(link);
      setIsUploading(false);
    }
  }
  // const userImage = session?.data?.user?.image;

  return (
    <section className="mt-10">
      <UserTabs isAdmin={isAdmin}></UserTabs>

      {isSaving && <InfoText>Saving...</InfoText>}
      {isUploading && <InfoText>Uploading...</InfoText>}
      <div className="max-w-lg mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate}></UserForm>
      </div>
    </section>
  );
};

export default ProfilePage;

// Another way to use the react hot toast---- with promise
// const savingPromise = new Promise(asynch(resolve, reject)=> {
//   const response = await fetch('/api/profile', {
//     method: "PUT",
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({name: userName, image})
//   }),
//   if(response.ok){
//     resolve()
//   } else {
//     reject()
//   }
// })

// await toast.promise(savingPromise, {
//   loading: 'Saving...',
//   success: 'Profile saved!',
//   error: 'Error'
// })
