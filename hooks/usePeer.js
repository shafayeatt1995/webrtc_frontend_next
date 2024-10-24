import React from "react";
import { PeerContext } from "@/providers/PeerProvider";

const usePeer = () => React.useContext(PeerContext);
export default usePeer;
