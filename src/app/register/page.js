"use client";
import Image from "next/image";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(ev) {
    ev.preventDefault();
    fetch("api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  }
  return (
    <section className="mt-10">
      <h1 className="text-center text-primary text-4xl font-bold mb-4">
        Register
      </h1>
      <form className="block max-w-xs mx-auto " onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Register</button>
        <div className="my-4 text-center text-gray-500">OR</div>
        <button className="flex gap-1 w-full font-bold rounded-lg px-6 py-2 border border-gray-300 text-black justify-center ">
          <Image
            src={"/google-icon.png"}
            alt="Google logo"
            width={24}
            height={24}
          ></Image>{" "}
          Login with google
        </button>
      </form>
      <div></div>
    </section>
  );
};

export default RegisterPage;
