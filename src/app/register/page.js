"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }

    setCreatingUser(false);
  }

  return (
    <section className="mt-10 ">
      <h1 className="text-center text-primary text-4xl font-bold mb-4">
        Register
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          Registration Successfull! <br /> Now you can{" "}
          <Link className="text-primary font-bold" href={"/login"}>
            Login
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-red-700">
          An error has occurred 😔
          <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto " onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={creatingUser}
        />
        <input
          disabled={creatingUser}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">OR</div>
        <button
          type="button"
          className="flex gap-1 w-full font-bold rounded-lg px-6 py-2 border border-gray-300 text-black justify-center "
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image
            src={"/google-icon.png"}
            alt="Google logo"
            width={24}
            height={24}
          ></Image>{" "}
          Login with google
        </button>
        <div className="text center my-4">
          Already have an account?{" "}
          <Link className="text-primary font-bold" href={"/login"}>
            Login Here
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
