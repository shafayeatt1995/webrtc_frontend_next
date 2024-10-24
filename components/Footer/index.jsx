import React from "react";

export default function Footer() {
  return (
    <div className="border-t">
      <div className="container mx-auto py-5">
        <div className="flex justify-between items-center">
          <div className="">
            <img src="/images/logo.svg" className="h-10" alt="logo" />
          </div>
          <div className="flex">
            <p>Copyright © {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
