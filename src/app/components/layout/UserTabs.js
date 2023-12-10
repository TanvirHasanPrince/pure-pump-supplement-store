"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const UserTabs = ({ isAdmin }) => {
  const path = usePathname();

  return (
    <div className="flex justify-center  gap-2 tabs mb-5">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/category"}
            className={path === "/category" ? "active" : ""}
          >
            Categories
          </Link>
          <Link
            href={"/supplements"}
            className={/supplements/.test(path) ? "active" : ""}
            // className={path.includes("supplements") ? "active" : ""}-- Another method
          >
            Supplements
          </Link>

          <Link href={"/users"} className={path === "/users" ? "active" : ""}>
            Users
          </Link>
          <Link href={"/orders"} className={path === "/orders" ? "active" : ""}>
            Orders
          </Link>
        </>
      )}
    </div>
  );
};

export default UserTabs;
