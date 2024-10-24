"use client";
import { socket } from "@/utils/socket";
import React, { useEffect } from "react";

export default function SocketInit({ children }) {
  useEffect(() => {
    const connectHandler = () => console.log("Socket connected:", socket.id);
    socket.connected ? connectHandler() : socket.on("connect", connectHandler);
    return () => {
      socket.off("connect", connectHandler);
    };
  }, []);

  return <>{children}</>;
}
