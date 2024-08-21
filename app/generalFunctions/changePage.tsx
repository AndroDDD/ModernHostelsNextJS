"use server";
import { redirect } from "next/navigation";

export const changePage = (url: string) => {
  redirect(url);
};
