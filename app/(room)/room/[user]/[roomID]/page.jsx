"use client";
import Tooltip from "@/components/Tooltip";
import { userApi } from "@/lib";
import { authUser } from "@/services/nextAuth";
import { randomKey } from "@/utils";
import {
  addRemoteIceCandidate,
  createAnswer,
  createOffer,
  peer,
  sendStream,
  setRemoteAnswer,
} from "@/utils/peer";
import { socket } from "@/utils/socket";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function roomPage() {
  const router = useRouter();
  const query = useSearchParams();
  const { roomID } = useParams();
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const [width, setWidth] = useState(420);
  const [isResizing, setIsResizing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const user = useRef(false);

  const resizing = (val) => {
    setIsResizing(val ?? !this.isResizing);
  };
  const resizePanel = (e) => {
    if (isResizing) setWidth(window.innerWidth - e.clientX);
  };

  const startCall = useCallback(
    async ({ sender, receiver }) => {
      const offer = await createOffer();
      socket.emit("local-offer", { offer, sender, receiver });
    },
    [createOffer]
  );
  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localStream.current.srcObject = stream;
      sendStream(stream);
    } catch (error) {}
  };
  const remoteOffer = useCallback(
    async ({ offer, sender, receiver }) => {
      const answer = await createAnswer(offer);
      socket.emit("local-answer", { answer, sender, receiver });
    },
    [createAnswer]
  );
  const remoteAnswer = useCallback(
    async ({ answer, sender, receiver }) => {
      await setRemoteAnswer(answer);
      icecandidate();
    },
    [setRemoteAnswer]
  );
  const remoteIcecandidate = useCallback(
    async (candidate) => {
      await addRemoteIceCandidate(candidate);
    },
    [addRemoteIceCandidate]
  );
  const endCall = () => {
    peer.close();
  };
  const setPeerTrackListener = () => {
    if (peer) {
      peer.ontrack = (event) => {
        const [stream] = event.streams;
        remoteStream.current.srcObject = stream;
      };
    }
  };
  const icecandidate = () => {
    if (peer) {
      peer.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("local-icecandidate", event.candidate);
        }
      };
    }
  };
  const copyUrl = async () => {
    try {
      toast.success("Link copied successfully");
      await navigator.clipboard.writeText(
        `${location.href}?receiver=${randomKey()}`
      );
    } catch (error) {}
  };

  useEffect(() => {
    const setupListeners = () => {
      socket.on("remote-offer", remoteOffer);
      socket.on("remote-answer", remoteAnswer);
      socket.on("remote-icecandidate", remoteIcecandidate);

      startLocalStream();
      icecandidate();
      setPeerTrackListener();
      setTimeout(() => {
        setIsDone(true);
      }, 2000);
    };

    if (socket.connected) {
      setupListeners();
    } else {
      socket.on("connect", () => {
        setupListeners();
        socket.off("connect");
      });
    }

    return () => {
      socket.off("remote-offer", remoteOffer);
      socket.off("remote-answer", remoteAnswer);
      socket.off("remote-icecandidate", remoteIcecandidate);
    };
  }, []);

  useEffect(() => {
    if (isDone) {
      const callRoom = async () => {
        try {
          const { email } = user.current;
          const { permission, message, sender, receiver } =
            await userApi.checkRoom({
              email,
              socketID: socket.id,
              roomID,
            });
          if (permission) {
            const caller = query.get("receiver");
            if (receiver && caller) {
              startCall({ sender, receiver });
            }
          } else {
            router.push("/profile");
            toast.success(message);
          }
        } catch (error) {
          console.error(error);
        }
      };
      const getUser = async () => {
        try {
          if (!user.current) user.current = await authUser();
          await callRoom();
        } catch (error) {}
      };
      getUser();
    }
  }, [isDone]);

  return (
    <div
      className="w-full h-full flex"
      onMouseMove={resizePanel}
      onMouseUp={() => resizing(false)}
    >
      <div className="flex-1"></div>

      <div className="flex w-[2px] bg-white items-center relative z-10">
        <div
          className="bg-white w-7 h-7 text-sm absolute flex justify-center items-center rounded-full translate-x-[calc(-50%_+_2px)] cursor-ew-resize"
          onMouseDown={() => resizing(true)}
          onMouseUp={() => resizing(false)}
          onDoubleClick={() => setWidth(420)}
        >
          <i className="fa-solid fa-caret-left"> </i>
          <i className="fa-solid fa-caret-right"> </i>
        </div>
      </div>

      <div
        className="bg-indigo-800 flex flex-col"
        style={{ width: `${width}px` }}
      >
        <div className=" bg-black flex justify-center items-center h-full overflow-hidden border">
          <video
            autoPlay
            playsInline
            ref={remoteStream}
            className="size-full object-contain"
          />
        </div>
        <div className="flex flex-col bg-black h-full overflow-hidden border">
          <div className="h-[calc(100%_-_65px)] flex justify-center items-center">
            <video
              autoPlay
              muted
              playsInline
              ref={localStream}
              className="max-w-full max-h-full object-cover"
            />
          </div>
          <div className="flex justify-around items-center w-full border p-2 text-white">
            <div>
              <Tooltip text="Camera on/off">
                <button className="size-10 rounded-full bg-transparent hover:bg-gray-700 flex justify-center items-center">
                  <i className="fa-solid fa-video"></i>
                  {/* <i className="fa-solid fa-video-slash"></i> */}
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip text="Mic mute/unmute">
                <button className="size-10 rounded-full bg-transparent hover:bg-gray-700 flex justify-center items-center">
                  <i className="fa-solid fa-volume-high"></i>
                  {/* <i className="fa-solid fa-volume-xmark"></i> */}
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip text="Screen share">
                <button className="size-10 rounded-full bg-transparent hover:bg-gray-700 flex justify-center items-center">
                  <i className="fa-solid fa-tv"></i>
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip text="Copy room url">
                <button
                  className="size-12 rounded-full bg-transparent hover:bg-gray-700 flex justify-center items-center text-xl"
                  onClick={copyUrl}
                >
                  <i className="fa-solid fa-link"></i>
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip text="End call">
                <button
                  className="size-10 rounded-full text-white bg-rose-600 hover:bg-rose-700 flex justify-center items-center transition-all duration-200"
                  onClick={endCall}
                >
                  <i className="fa-solid fa-phone-slash"></i>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
