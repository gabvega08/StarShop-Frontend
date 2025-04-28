import { useState, useEffect, useCallback, useRef } from "react";

// Type definitions
export type WebSocketHookOptions = {
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
};

/**
 * Enhanced TypeScript custom hook for managing WebSocket connections
 * @param url - The WebSocket server URL
 * @param options - Configuration options
 * @returns WebSocket methods and state
 */
const useWebSocket = <MessageType = any>(
  url: string,
  options: WebSocketHookOptions = {}
) => {
  const {
    autoReconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
  } = options;

  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<MessageType | string | null>(
    null
  );
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connectWebSocket = useCallback(() => {
    // Close existing connection if any
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }

    // Create a new WebSocket connection
    const socket = new WebSocket(url);
    socketRef.current = socket;
    setReadyState(WebSocket.CONNECTING);

    // Event handler for connection open
    const handleOpen = (): void => {
      setReadyState(WebSocket.OPEN);
      setIsConnected(true);
      reconnectAttemptsRef.current = 0; // Reset reconnect attempts
    };

    // Event handler for connection close
    const handleClose = (event: CloseEvent): void => {
      setReadyState(WebSocket.CLOSED);
      setIsConnected(false);

      // Attempt reconnection if enabled
      if (
        autoReconnect &&
        reconnectAttemptsRef.current < maxReconnectAttempts
      ) {
        reconnectAttemptsRef.current += 1;
        console.log(
          `WebSocket closed. Reconnecting attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts} in ${reconnectInterval}ms...`
        );

        reconnectTimeoutRef.current = window.setTimeout(() => {
          connectWebSocket();
        }, reconnectInterval);
      } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
        console.error(
          `WebSocket reconnection failed after ${maxReconnectAttempts} attempts.`
        );
      }
    };

    // Event handler for connection error
    const handleError = (error: Event): void => {
      console.error("WebSocket encountered an error:", error);
      setReadyState(WebSocket.CLOSED);
      setIsConnected(false);
    };

    // Event handler for receiving messages
    const handleMessage = (event: MessageEvent): void => {
      try {
        // Safely parse JSON if it's a JSON message
        if (typeof event.data === "string") {
          try {
            const parsedData = JSON.parse(event.data);

            setLastMessage(parsedData);
          } catch (e) {
            // If JSON parsing fails, use the original message
            setLastMessage(event.data);
          }
        } else {
          // For binary data or other formats
          setLastMessage(event.data);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    // Register event listeners
    socket.addEventListener("open", handleOpen);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);
    socket.addEventListener("message", handleMessage);

    // Store cleanup function
    const cleanup = (): void => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      socket.removeEventListener("message", handleMessage);

      // Close the connection if it's still open
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };

    return cleanup;
  }, [url, autoReconnect, reconnectInterval, maxReconnectAttempts]);

  // Effect to initialize and manage WebSocket connection
  useEffect(() => {
    const cleanup = connectWebSocket();

    // Cleanup function to handle component unmount
    return () => {
      cleanup();

      // Clear any pending reconnection timeouts
      if (reconnectTimeoutRef.current !== null) {
        window.clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [connectWebSocket]);

  // Function to send messages through the WebSocket with generic type support
  const send = useCallback(<T = any>(message: string | T): boolean => {
    if (!socketRef.current) {
      console.warn("WebSocket connection not initialized");
      return false;
    }

    if (socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn(
        `WebSocket not connected (state: ${socketRef.current.readyState}). Cannot send message.`
      );
      return false;
    }

    try {
      if (typeof message === "string") {
        socketRef.current.send(message);
      } else {
        socketRef.current.send(JSON.stringify(message));
      }
      return true;
    } catch (error) {
      console.error("Failed to send WebSocket message:", error);
      return false;
    }
  }, []);

  // Function to manually disconnect the WebSocket
  const disconnect = useCallback((): void => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }

    // Clear any pending reconnection timeouts
    if (reconnectTimeoutRef.current !== null) {
      window.clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Function to manually reconnect the WebSocket
  const reconnect = useCallback((): void => {
    disconnect();
    connectWebSocket();
  }, [disconnect, connectWebSocket]);

  return {
    send,
    lastMessage,
    readyState,
    isConnected,
    disconnect,
    reconnect,
  };
};

export default useWebSocket;
