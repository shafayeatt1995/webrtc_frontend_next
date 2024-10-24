"use client";
import React from "react";
import Link from "next/link";
import Spinner from "./Spinner";

export default function Button({
  loading,
  variant = "indigo",
  href,
  rounded,
  className,
  children,
  type = "button",
  onClick,
}) {
  const variantClass = getVariantClass(variant);
  const roundedClass = rounded
    ? "size-10 rounded-full"
    : "px-5 py-[10px] rounded-md text-sm";

  if (href) {
    return (
      <Link
        href={href}
        className={`flex justify-center items-center font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-md focus:outline-none focus:ring focus:ring-opacity-50 gap-1 ${variantClass} ${roundedClass} ${className}`}
        aria-disabled={loading}
      >
        {loading && <Spinner />}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`focus:ring-transparent flex justify-center items-center font-medium tracking-wide capitalize transform focus:outline-none focus:ring focus:ring-opacity-50 gap-1 transition-all duration-300 ${variantClass} ${roundedClass} ${className}`}
      aria-disabled={loading}
      disabled={loading}
      type={type ?? "button"}
      onClick={onClick}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

const getVariantClass = (variant) => {
  switch (variant) {
    case "green":
      return "text-white bg-green-500 hover:bg-green-600 focus:ring-green-300 disabled:hover:bg-green-300 disabled:bg-green-300";
    case "white":
      return "text-gray-800 border border-gray-200 hover:bg-gray-100 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300";
    case "gray":
      return "text-gray-800 bg-gray-500 hover:bg-gray-600 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300";
    case "lightGray":
      return "text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300";
    case "pink":
      return "text-white bg-pink-500 hover:bg-pink-600 focus:ring-pink-300 disabled:hover:bg-pink-300 disabled:bg-pink-300";
    case "rose":
      return "text-white bg-rose-500 hover:bg-rose-600 focus:ring-rose-300 disabled:hover:bg-rose-300 disabled:bg-rose-300";
    case "red":
      return "text-white bg-red-500 hover:bg-red-600 focus:ring-red-300 disabled:hover:bg-red-300 disabled:bg-red-300";
    case "transparent":
      return "text-gray-700 dark:text-gray-300 hover:text-sky-500 dark:hover:text-indigo-700 focus:ring-transparent disabled:hover:text-gray-400 disabled:text-gray-400";
    case "blue":
      return "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 disabled:hover:bg-blue-300 disabled:bg-blue-300";
    case "yellow":
      return "text-gray-800 bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 disabled:hover:bg-yellow-300 disabled:bg-yellow-300";
    case "purple":
      return "text-white bg-purple-500 hover:bg-purple-600 focus:ring-purple-300 disabled:hover:bg-purple-300 disabled:bg-purple-300";
    case "indigo":
      return "text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300 disabled:hover:bg-indigo-300 disabled:bg-indigo-300";
    case "lightIndigo":
      return "text-indigo-600 hover:text-white bg-indigo-100 hover:bg-indigo-700 focus:ring-indigo-300 disabled:hover:bg-indigo-300 disabled:bg-indigo-300 disabled:hover:text-gray-300 disabled:text-gray-300";
    case "amber":
      return "text-gray-800 bg-amber-500 hover:bg-amber-600 focus:ring-amber-300 disabled:hover:bg-amber-300 disabled:bg-amber-300";
    case "sky":
      return "text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-300 disabled:hover:bg-sky-300 disabled:bg-sky-300";
    case "dark":
      return "text-white bg-gray-900 hover:bg-gray-900 focus:ring-gray-900 disabled:hover:bg-gray-500 disabled:bg-gray-500 hover:shadow-gray-500 disabled:hover:shadow-transparent";
    case "black":
      return "text-white bg-black hover:bg-gray-900 focus:ring-gray-900 disabled:hover:bg-gray-300 disabled:bg-gray-300";
    default:
      return "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300 disabled:hover:bg-indigo-300 disabled:bg-indigo-300";
  }
};
