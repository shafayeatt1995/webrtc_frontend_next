"use client";
import React, { useEffect, useRef } from "react";
import { randomKey } from "@/utils";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { authUser } from "@/services/nextAuth";

export default function CreateRoom() {
  const route = useRouter();
  const user = useRef(null);

  useEffect(() => {
    (async () => {
      user.current = await authUser();
    })();
  }, []);
  const createRoom = async () => {
    try {
      const [userID] = user.current.email.split("@");
      const id = `${randomKey()}-${randomKey()}-${randomKey()}`;
      route.push(`/room/${userID}/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={createRoom}>
      <i className="fas fa-add mr-2"></i> Create new room
    </Button>
  );
}
