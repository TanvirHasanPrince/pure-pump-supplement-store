"use client";
import UserTabs from "../components/layout/UserTabs";
import useProfile from "../components/useProfile";
import EditableImage from "../components/layout/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import RightArrow from "../components/icons/RightArrow";

const SupplementsPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile();

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
    </section>
  );
};

export default SupplementsPage;
