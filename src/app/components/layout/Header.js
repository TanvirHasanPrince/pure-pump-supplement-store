"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { CartContext } from "../appContext";
import ShoppingCart from "../../components/icons/ShoppingCart";
import MenuIconBars3 from "../../components/icons/MenuIconBars3";

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  function AuthLinks({ status, userName }) {
    if (status === "authenticated") {
      return (
        <>
          <Link
            href={"/profile"}
            className="bg-secondary text-black px-8 py-2 rounded-md font-bold"
          >
            {userName}
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-primary text-white px-8 py-2 rounded-md"
          >
            Logout
          </button>
        </>
      );
    }

    if (status === "unauthenticated") {
      <>
        <Link
          href={"/login"}
          className="bg-primary text-white px-8 py-2 rounded-md"
        >
          Login
        </Link>
        <Link
          href={"/register"}
          className="bg-secondary text-black px-8 py-2 rounded-md"
        >
          Register
        </Link>
      </>;
    }
  }

  return (
    <header className="">
      <div className="flex items-center justify-between md:hidden lg:hidden">
        <Link
          className="text-primary uppercase font-bold text-lg text-left"
          href="/"
        >
          Pure Pump
        </Link>

        <div className="flex gap-8 items-center">
          <Link href="/cart" className="relative">
            <ShoppingCart></ShoppingCart>
            <span className="absolute -top-2 -right-2 bg-primary text-white text-sm p-1 rounded-full leading-3">
              {" "}
              {cartProducts.length}
            </span>
          </Link>

          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <MenuIconBars3></MenuIconBars3>
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div className="md:hidden lg:hidden p-4 bg-gray-200 rounded-lg mt-2">
          <nav className="flex flex-col items-center gap-4 text-gray-600 font-semibold">
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Supplements</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={""}>Contact</Link>
            <AuthLinks status={status} userName={userName}></AuthLinks>
          </nav>
        </div>
      )}

      {/* Medium and Large sreen starts here */}

      <div className="hidden md:flex lg:flex items-center justify-between">
        <Link className="text-primary uppercase font-bold text-2xl" href="/">
          Pure Pump
        </Link>
        <nav className="flex items-center gap-6 text-gray-600 font-semibold">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Supplements</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={""}>Contact</Link>
        </nav>

        <nav className="flex items-center justify-between gap-4 font-bold">
          <AuthLinks status={status} userName={userName}></AuthLinks>

          <Link href="/cart" className="relative">
            <ShoppingCart></ShoppingCart>
            <span className="absolute -top-2 -right-2 bg-primary text-white text-sm p-1 rounded-full leading-3">
              {" "}
              {cartProducts.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
