import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SessionControlsProps {
  startSession: () => Promise<void>;
  stopSession: () => void;
  sendClientEvent: (message: any) => void;
  sendTextMessage: (message: string) => void;
  isSessionActive: boolean;
  events: any[];
}

const SessionControls = ({
  startSession,
  stopSession,
  sendTextMessage,
  isSessionActive,
}: SessionControlsProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isSessionActive) {
      sendTextMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        {isSessionActive ? (
          <Button onClick={stopSession} variant="destructive" className="mr-2">
            Stop Session
          </Button>
        ) : (
          <Button onClick={startSession} className="bg-primary text-white mr-2">
            Start Session
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type a message..."
          disabled={!isSessionActive}
        />
        <Button
          type="submit"
          className="bg-primary text-white"
          disabled={!isSessionActive || !message.trim()}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default SessionControls;
