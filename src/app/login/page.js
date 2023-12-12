"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";

// issues with google signin
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }

  return (
    <section className="mt-10">
      <h1 className="text-center text-primary text-4xl font-bold mb-4">
        Login
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={loginInProgress}
        />
        <input
          disabled={loginInProgress}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="my-4 text-center text-gray-500">OR</div>
        <button
          className="flex gap-1 w-full font-bold rounded-lg px-6 py-2 border border-gray-300 text-black justify-center "
          onClick={() => signIn("google", { callbackUrl: "/" })}
          type="button"
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
          Don&apos;t have an account?{" "}
          <Link className="text-primary font-bold" href={"/register"}>
            Register Here
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
