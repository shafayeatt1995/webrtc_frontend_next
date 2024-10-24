"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { initLottie } from "@/utils";
import Button from "@/components/Button";

export default function NotFound() {
  const router = useRouter();
  const containerRef = useRef(null);
  const animationPath = "/lottie/404.json";

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (containerRef.current) {
      initLottie(containerRef.current, animationPath);
    }

    return () => {
      if (window.lottie) {
        window.lottie.stop();
        window.lottie.destroy();
      }
    };
  }, [animationPath]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container min-h-screen px-6 mx-auto flex lg:items-center flex-col-reverse lg:flex-row justify-end -mt-24">
        <div className="w-full lg:w-1/3 text-gray-700">
          <p className="text-sm font-medium text-indigo-600">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-700 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-white">
            Sorry, the page you are looking for doesn't exist. Here are some
            helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button onClick={goBack} className="border-transparent">
              <i className="fas fa-arrow-left-long"></i>
              <span>Go back</span>
            </button>

            <Button href="/">Take me home</Button>
          </div>
        </div>

        <div
          className="relative w-full mt-12 lg:w-2/3 lg:mt-0"
          ref={containerRef}
        ></div>
      </div>
    </section>
  );
}
