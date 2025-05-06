import { useState } from "react";
import { CloudLightning, CloudOff, MessageSquare } from "react-feather";
import Button from "./Button";

function SessionStopped({ startSession }) {
  const [isActivating, setIsActivating] = useState(false);

  function handleStartSession() {
    if (isActivating) return;

    setIsActivating(true);
    startSession();
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Button
        onClick={handleStartSession}
        className={isActivating ? "bg-yellow-600" : "bg-green-600"}
        icon={<CloudLightning height={16} />}
      >
        {isActivating ? "starting session..." : "start practicing"}
      </Button>
    </div>
  );
}

function SessionActive({ stopSession }) {
  const [message, setMessage] = useState("");

  function handleSendClientEvent() {
    setMessage("");
  }

  return (
    <div className="flex items-center justify-center w-full h-full gap-4">
      {/* <input
        onKeyDown={(e) => {
          if (e.key === "Enter" && message.trim()) {
            handleSendClientEvent();
          }
        }}
        type="text"
        placeholder="send a text message..."
        className="border border-gray-200 rounded-full p-4 flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      /> */}
      {/* <Button
        onClick={() => {
          if (message.trim()) {
            handleSendClientEvent();
          }
        }}
        icon={<MessageSquare height={16} />}
        className="bg-blue-400"
      >
        send text
      </Button> */}
      <Button
        className={"bg-red-600"}
        onClick={stopSession}
        icon={<CloudOff height={16} />}
      >
        disconnect
      </Button>
    </div>
  );
}

export default function SessionControls({
  startSession,
  stopSession,
  sendClientEvent,
  serverEvents,
  isSessionActive,
}) {
  return (
    <div className="flex h-full rounded-md">
      {isSessionActive ? (
        <SessionActive
          stopSession={stopSession}
          sendClientEvent={sendClientEvent}
          serverEvents={serverEvents}
        />
      ) : (
        <SessionStopped startSession={startSession} />
      )}
    </div>
  );
}
