import React from "react";
import { SocketContext } from "@/providers/SocketProvider";

const useSocket = () => React.useContext(SocketContext);
export default useSocket;
