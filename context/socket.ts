import React from "react";

import { io, Socket } from "socket.io-client";
import { chatConfig } from "@component/utills/config";

export const socket:any = io(chatConfig.Base_URL);

export const SocketContext = React.createContext(null);
