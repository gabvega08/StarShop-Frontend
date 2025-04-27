"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for managing WebSocket connections
 * @param {string} url - The WebSocket server URL
 * @returns {Object} WebSocket methods and state
 */
const useWebSocket = (url: any) => {
  const [readyState, setReadyState] = useState<any>(WebSocket.CONNECTING);
  const [lastMessage, setLastMessage] = useState(null);
  const socketRef = useRef<any>(null);

  // Effect to initialize and manage WebSocket connection
  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket(url);
    if (!WebSocket) return;
    socketRef.current = socket;

    // Event handler for connection open
    const handleOpen = () => {
      setReadyState(WebSocket.OPEN);
    };

    // Event handler for connection close
    const handleClose = () => {
      setReadyState(WebSocket.CLOSED);
    };

    // Event handler for connection error
    const handleError = () => {
      setReadyState(WebSocket.CLOSED);
    };

    // Event handler for receiving messages
    const handleMessage = (event: any) => {
      setLastMessage(event);
    };

    // Register event listeners
    socket.addEventListener("open", handleOpen);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);
    socket.addEventListener("message", handleMessage);

    // Cleanup function to close socket and remove event listeners when component unmounts
    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      socket.removeEventListener("message", handleMessage);

      // Close the connection if it's still open
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [url]);

  // Function to send messages through the WebSocket
  const send = useCallback((message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket is not connected");
    }
  }, []);

  return {
    send,
    lastMessage,
    readyState,
  };
};

export default useWebSocket;
