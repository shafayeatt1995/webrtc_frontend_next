"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/utils/socket";
import Button from "@/components/Button";
import { objToQuery } from "@/utils";

const JoinRoomForm = () => {
  const [form, setForm] = useState({
    email: "shafayetalanik@gmail.com",
    roomID: "1",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-user", form);
    router.push(`/room?${objToQuery(form)}`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <form className="w-1/2" onSubmit={joinRoom}>
            <div className="relative flex items-center mt-4">
              <label
                className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px]"
                htmlFor="email"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Type Email"
                className="pl-4 pr-12 py-3.5 bg-white w-full text-sm border-2 border-gray-300 focus:border-indigo-600 rounded outline-none"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative flex items-center mt-4">
              <label
                className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px]"
                htmlFor="room"
              >
                Room ID
              </label>

              <input
                id="room"
                name="roomID"
                type="text"
                placeholder="Type Room ID"
                className="pl-4 pr-12 py-3.5 bg-white w-full text-sm border-2 border-gray-300 focus:border-indigo-600 rounded outline-none"
                value={form.roomID}
                onChange={handleChange}
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
};

export default JoinRoomForm;
