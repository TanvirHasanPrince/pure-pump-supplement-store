"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "../appContext";
import ShoppingCart from "../../components/icons/ShoppingCart";

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  if (userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="flex items-center justify-between">
      <Link className="text-primary uppercase font-bold text-2xl" href="/">
        Pure Pump
      </Link>
      <nav className="flex items-center gap-6 text-gray-600 font-semibold">
        <Link href={"/"}>Home</Link>
        <Link href={"/products"}>Supplements</Link>
        <Link href={""}>Accesories</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>

      <nav className="flex items-center justify-between gap-4 font-bold">
        {status === "authenticated" && (
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
        )}

        {status === "unauthenticated" && (
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
          </>
        )}

        <Link href="/cart" className="relative">
          <ShoppingCart></ShoppingCart>
          <span className="absolute -top-2 -right-2 bg-primary text-white text-small p-1 rounded-full leading-3"> {cartProducts.length}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
