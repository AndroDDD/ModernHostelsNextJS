"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Simple() {
  const { user } = useUser();

  console.log({ user });
  return (
    <div style={{ color: "black" }}>
      {user && <p>Welcome, {user.name}!!</p>}
      {!user && <p>You are not logged in.</p>}
    </div>
  );
}
