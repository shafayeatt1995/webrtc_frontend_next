"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";

export default function Home() {
  const { socket } = useSocket();
  const router = useRouter();
  const [email, setEmail] = useState("anik@gmail.com");
  const [roomID, setRoomID] = useState("1");
  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", { email, roomID });
  };

  const joinedRoom = useCallback(
    ({ roomID }) => {
      router.push(`/room/${roomID}`);
    },
    [router]
  );

  useEffect(() => {
    socket.on("joined-room", joinedRoom);
    return () => {
      socket.off("joined-room", joinedRoom);
    };
  }, [socket, joinedRoom]);

  return (
    <div className="bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <form className="w-1/2" onSubmit={handleJoinRoom}>
            <div className="relative flex items-center mt-4">
              <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px]">
                Email
              </label>

              <input
                type="email"
                placeholder="Type Email"
                className="pl-4 pr-12 py-3.5 bg-white w-full text-sm border-2 border-gray-300 focus:border-indigo-600 rounded outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative flex items-center mt-4">
              <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px]">
                Room ID
              </label>

              <input
                type="text"
                placeholder="Type Room ID"
                className="pl-4 pr-12 py-3.5 bg-white w-full text-sm border-2 border-gray-300 focus:border-indigo-600 rounded outline-none"
                value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
              />
            </div>

            <div className="flex items-center mt-4">
              <Button className="w-full" type="submit">
                Join Room
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
