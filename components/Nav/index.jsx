"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Button from "../Button";
import { authUser } from "@/services/nextAuth";
import Print from "../Print";

export default function Nav() {
  const [user, user_] = useState(false);
  const [showMenu, showMenu_] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      user_(await authUser());
    })();
  }, []);

  useEffect(() => {
    showMenu_(false);
  }, [router]);

  const links = [{ name: "Home", href: "/" }];

  return (
    <div className="sticky top-0 z-20 lg:h-20 h-16">
      <div className="w-full backdrop-blur-md bg-white/30 dark:bg-black/70 h-full absolute left-0 top-0 right-0 z-10 shadow-lg"></div>
      <div className="container mx-auto absolute top-0 left-0 right-0 z-20 lg:px-5 xl:px-0 px-2 lg:h-20 h-16">
        <div className="flex justify-between items-center h-full">
          <Link
            href="/"
            className="font-kaushan text-4xl text-indigo-900 flex items-center"
          >
            <img src="/images/logo.svg" className="h-10" alt="logo" />
          </Link>
          <div className="flex items-center gap-4 overflow-x-hidden">
            <div className="flex lg:hidden items-center gap-4">
              <i
                className="fa-solid fa-bars text-3xl"
                onClick={() => showMenu_(!showMenu)}
              ></i>
            </div>
            <div
              className={`hidden lg:flex lg:items-center gap-3 flex-col lg:flex-row absolute lg:relative max-h-96 top-[64px] lg:top-auto bg-white/30 dark:bg-black/30 backdrop-blur-md lg:backdrop-blur-none lg:bg-transparent lg:dark:bg-transparent pb-5 lg:pb-0 transition-all duration-300 left-0 right-0 ${
                showMenu ? "" : "-top-[200%]"
              }`}
            >
              {links.map((val, i) => (
                <Link
                  key={i}
                  href={val.href}
                  className="px-3 py-2 text-sm font-medium text-gray-800 dark:text-white hover:text-indigo-600 transition-all duration-200"
                >
                  {val.name}
                </Link>
              ))}
              {user ? (
                <Button href="/profile">Profile</Button>
              ) : (
                <Button href="signin">Sign in</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
