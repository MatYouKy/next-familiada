import { useEffect, useState, useRef } from 'react';

import { GameState } from '../types/game';

interface WebSocketHook {
  message: GameState | null;
  sendMessage: (message: string) => void;
}

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (error) {
    return false;
  }
  return true;
}

function useWebSocket(url: string): WebSocketHook {
  const [message, setMessage] = useState<GameState | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('Connected to ' + url);
    };

    ws.current.onmessage = (message) => {
      if (isJsonString(message.data)) {
        try {
          const data = JSON.parse(message.data);
          setMessage(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.warn('Received non-JSON data:', message.data);
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from ' + url);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (ws.current) {
      ws.current.send(message);
    }
  };

  return { message, sendMessage };
}

export default useWebSocket;
