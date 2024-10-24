import React from "react";
import { authUser } from "@/services/nextAuth";
import Button from "@/components/Button";
import Link from "next/link";
import CreateRoom from "@/components/CreateRoom";

export default async function ProfileMenu() {
  const user = (await authUser()) || {};
  return (
    <div className="container mx-auto mt-10">
      <div className="border p-5 rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              className="size-20 object-cover rounded-full"
            />
            <div>
              <h1 className="text-3xl font-black">
                <span className="font-normal">Hi</span> {user.name}
              </h1>
              <p>{user.email}</p>
            </div>
          </div>
          <div>
            <CreateRoom />
          </div>
        </div>
        <div className="mt-7">
          <ul className="flex gap-5">
            <li>
              <Link href="/profile">
                <i className="far fa-user mr-1"></i> Profile
              </Link>
            </li>
            <li>
              <Link href="/profile">activities</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
