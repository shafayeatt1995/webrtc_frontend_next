"use client";
import Button from "@/components/Button";
import { setItem } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function signin() {
  const socialLogin = (provider) => {
    setItem("socialLogin", window.location.href);
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/social-login/${provider}`,
      "_self"
    );
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8 relative">
            <Image
              src="/images/auth.svg"
              fill={true}
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Auth image"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-sm  max-md:mx-auto">
            <form className="space-y-4">
              <div className="mb-8">
                <h1 className="text-gray-800 text-3xl font-extrabold">
                  Sign in
                </h1>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities.
                  Your journey begins here.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-indigo-500"
                    placeholder="Enter user name"
                  />
                  <i className="far fa-envelope text-gray-400 absolute right-4"></i>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-indigo-500"
                    placeholder="Enter password"
                  />
                  <i className="fa-regular fa-eye text-gray-400 absolute right-4"></i>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <p className="text-indigo-500 hover:underline font-semibold cursor-pointer">
                    Forgot your password?
                  </p>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                >
                  Sign in
                </button>
              </div>

              <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
              </div>

              <Button
                variant="lightGray"
                className="w-full"
                onClick={() => socialLogin("google")}
              >
                <img src="/images/google.svg" /> Sign in with google
              </Button>

              <p className="text-sm !mt-8 text-center text-gray-800">
                Don't have an account?
                <Link
                  href="/signup"
                  className="text-indigo-500 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
