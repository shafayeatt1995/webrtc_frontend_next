"use client";
import React from "react";
import Button from "@/components/Button";
import { signOut } from "next-auth/react";
const submit = async () => {
  await signOut();
};

export default function Header() {
  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide  z-10 sticky top-0 ">
      <div className="flex justify-between w-full">
        <div>
          <img src="/images/logo.svg" className="h-10" />
        </div>
        <Button onClick={submit}>Log out</Button>
      </div>
    </header>
  );
}
