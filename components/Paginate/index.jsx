"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Spinner from "../Spinner";

export default function Paginate({ posts }) {
  const [nextLoading, nextLoading_] = useState(false);
  const [prevLoading, prevLoading_] = useState(false);
  const { page } = useParams();
  const pathname = usePathname();
  const generateLink = (pageNumber) => {
    const newPage = Number(page) + pageNumber;
    return pathname.replace(`/${page}`, `/${newPage}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      {posts && posts.length > 0 ? (
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          {page === "1" ? (
            <button
              disabled
              className="relative flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <i className="fa-solid fa-angle-left text-xs"></i>
              <span>Previous</span>
            </button>
          ) : (
            <Link
              href={generateLink(-1)}
              title="Previous page"
              className={`relative flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 ${
                prevLoading ? "opacity-50" : ""
              }`}
              onClick={() => prevLoading_(true)}
            >
              {prevLoading && <Spinner />}
              <i className="fa-solid fa-angle-left text-xs"></i>
              <span>Previous</span>
            </Link>
          )}

          {posts && posts.length === 24 ? (
            <Link
              href={generateLink(1)}
              title="Next page"
              className={`relative flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 ${
                nextLoading ? "opacity-50" : ""
              }`}
              onClick={() => nextLoading_(true)}
            >
              <span>Next</span>
              <i className="fa-solid fa-angle-right text-xs"></i>
              {nextLoading && <Spinner />}
            </Link>
          ) : (
            <button
              disabled
              className="relative flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <span>Next</span>
              <i className="fa-solid fa-angle-right text-xs"></i>
            </button>
          )}
        </nav>
      ) : (
        <div className="flex justify-center items-center">
          No posts available
        </div>
      )}
    </div>
  );
}
