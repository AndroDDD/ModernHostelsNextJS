"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const SaveCurrentPathnameToCookie = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.cookie = `lastPath=${pathname};expires=${new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    )};path=/`;
  });

  return <></>;
};
