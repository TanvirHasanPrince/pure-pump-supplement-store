"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoText from "../components/layout/InfoText";
import toast from "react-hot-toast";
import { rejects } from "assert";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session?.data?.user?.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data?.phone);
          setHouseAddress(data?.houseAddress);
          setCity(data?.city);
          setPostalCode(data?.postCode);
          setCountry(data?.country);
        });
      });
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
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        image,
        phone,
        houseAddress,
        city,
        postCode,
        country,
      }),
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
      setImage(link);
      setIsUploading(false);
    }
  }

  // const userImage = session?.data?.user?.image;

  return (
    <section className="mt-10">
      <h1 className="text-center text-primary text-4xl font-bold mb-4">
        Profile
      </h1>

      {isSaving && <InfoText>Saving...</InfoText>}
      {isUploading && <InfoText>Uploading...</InfoText>}
      <div className="max-w-lg mx-auto">
        <div className="flex gap-4">
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
            <label> Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />

            <label>Email</label>
            <input
              disabled
              type="email"
              placeholder="Your Name"
              value={session?.data?.user?.email}
            />
            <label> Phone number</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label> House Address</label>
            <input
              type="text"
              placeholder="House address"
              value={houseAddress}
              onChange={(ev) => setHouseAddress(ev.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label> City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              <div>
                <label> Post Code</label>
                <input
                  type="text"
                  placeholder="Postal code"
                  value={postCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
            </div>
            <label> Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
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
