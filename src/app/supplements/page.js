"use client";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/useProfile";
import EditableImage from "../components/layout/EditableImage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import RightArrow from "../components/icons/RightArrow";
import Image from "next/image";

const SupplementsPage = () => {
  const [supplementItems, setSupplementItems] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/supplement-items").then((res) => {
      res.json().then((supplementItems) => {
        setSupplementItems(supplementItems);
      });
    });
  }, []);

  if (profileLoading) {
    return "loading supplements....";
  }

  if (profileData?.admin) {
    return "Not an idmin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true}></UserTabs>
      <div className="max-w-lg mx-auto mt-8 text-center text-sm">
        <Link
          className="bg-primary flex justify-center items-center gap-2 text-white px-4 py-2 rounded-lg uppercase text-sm font-semibold"
          href={"/supplements/new"}
        >
          Create New Supplement Items <RightArrow />
        </Link>
      </div>
      <div>
        <h2 className="text-primary font-bold text-lg my-4">
          Edit Supplement Item
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3">
          {supplementItems.length > 0 &&
            supplementItems.map((item) => (
              <Link
                href={"/supplements/edit/" + item._id}
                className=" flex flex-col items-center rounded-lg text-center  hover:shadow-lg hover:shadow-primary/20 transition-all border px-1"
                key={item._id}
              >
                <div className="relative">
                  <Image
                  className="my-4 rounded-md"
                    src={item.image}
                    alt=""
                    width={200}
                    height={200}
                  ></Image>
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SupplementsPage;
