"use client";
import { SessionProvider } from "next-auth/react";

const AppProvider = ({ children }) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>;
    </div>
  );
};

export default AppProvider;
