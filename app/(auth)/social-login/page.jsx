"use client";
import { getItem, initLottie, removeItem } from "@/utils";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function SocialLogin() {
  const query = Object.fromEntries(useSearchParams().entries());
  const loadingRef = useRef(null);
  const animationPath = "/lottie/social-login.json";

  const getDetails = async () => {
    const socialLogin = `${getItem("socialLogin")}`;
    try {
      if (socialLogin) removeItem("socialLogin");
      const { c, e } = query;
      if (e) {
        window.open(socialLogin || location.origin, "_self");
      } else if (c) {
        const { email, id, provider } = JSON.parse(atob(c));

        await signIn("credentials", {
          email,
          id,
          provider,
          password: "f*#k you",
          redirect: false,
        });
        window.open("/profile", "_self");
      } else {
        window.open(socialLogin || location.origin, "_self");
      }
    } catch (error) {
      window.open(socialLogin || location.origin, "_self");
    }
  };

  useEffect(() => {
    const init = async () => {
      if (loadingRef.current) {
        await initLottie(loadingRef.current, animationPath);
      }
      await getDetails();
    };

    init();

    return () => {
      if (window.lottie) {
        window.lottie.stop();
        window.lottie.destroy();
      }
    };
  }, [animationPath]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div ref={loadingRef} className="max-h-80"></div>
      <div className="flex justify-center">
        <p className="text-gray-700">We are verifying your information</p>
      </div>
    </div>
  );
}
