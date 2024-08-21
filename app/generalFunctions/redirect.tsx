"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default () => {
  useEffect(() => {
    const router = useRouter();
    const COOKIE_NAME: string = "lastPath";
    const cookies = document.cookie.split(";");

    let lastPath: string;

    cookies.forEach((cookie) => {
      if (
        (cookie.startsWith(COOKIE_NAME) ||
          cookie.startsWith(` ${COOKIE_NAME}`)) &&
        !lastPath
      ) {
        lastPath = cookie.replace(`${COOKIE_NAME}=`, "");
        router.push(`${lastPath}`);
      }
    });
  });

  return <></>;
};
