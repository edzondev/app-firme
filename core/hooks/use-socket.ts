import {
  getIdToken as firebaseGetIdToken,
  getAuth,
} from "@react-native-firebase/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

const WS_URL = __DEV__
  ? "http://192.168.0.101:5000/tracking"
  : "https://tu-dominio-api.com/tracking";

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface UseSocketReturn {
  socket: Socket | null;
  status: ConnectionStatus;
  connect: () => Promise<Socket>;
  disconnect: () => void;
  emit: <T = unknown>(event: string, data: T) => void;
  isConnected: boolean;
}

export default function useSocket(): UseSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");

  const connect = useCallback(async () => {
    if (socketRef.current?.connected) return socketRef.current;

    setStatus("connecting");

    const user = getAuth().currentUser;
    if (!user) {
      setStatus("error");
      throw new Error("Usuario no autenticado para conexión de tracking");
    }

    const token = await firebaseGetIdToken(user);

    const newSocket = io(WS_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    const connectedSocket = await new Promise<Socket>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timeout conectando al socket de tracking"));
      }, 10000);

      newSocket.once("connect", () => {
        clearTimeout(timeout);
        resolve(newSocket);
      });

      newSocket.once("connect_error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });

    newSocket.on("connect", () => setStatus("connected"));
    newSocket.on("disconnect", () => setStatus("disconnected"));
    newSocket.on("connect_error", () => setStatus("error"));
    newSocket.on("reconnecting", () => setStatus("connecting"));

    socketRef.current = newSocket;
    setSocket(newSocket);
    setStatus("connected");
    return connectedSocket;
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
      setStatus("disconnected");
    }
  }, []);

  const emit = useCallback(<T = unknown>(event: string, data: T) => {
    socketRef.current?.emit(event, data);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    socket,
    status,
    connect,
    disconnect,
    emit,
    isConnected: status === "connected",
  };
}
