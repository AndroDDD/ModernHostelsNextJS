"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const LoginButton: FC = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    const returnTo = window.location.pathname; // Save the current URL
    router.push(
      `/rest-api/authentication/login?returnTo=${encodeURIComponent(returnTo)}`
    );
  };

  return (
    !user && (
      <button onClick={handleLogin} style={{ color: "black" }}>
        Login
      </button>
    )
  );
};

export default LoginButton;
