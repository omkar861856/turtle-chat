import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ToolPanelProps {
  sendClientEvent: (message: any) => void;
  sendTextMessage: (message: string) => void;
  isSessionActive: boolean;
  events: any[];
}

const ToolPanel = ({
  sendClientEvent,
  sendTextMessage,
  isSessionActive,
}: ToolPanelProps) => {
  const [quickMessage, setQuickMessage] = useState("");

  const quickMessages = [
    "Hello, how are you?",
    "Can you help me practice Spanish?",
    "Tell me about the weather today",
    "What's your name?",
    "How do I say 'hello' in French?",
  ];

  const handleQuickMessage = (message) => {
    if (isSessionActive) {
      sendTextMessage(message);
    }
  };

  const handleCustomMessage = () => {
    if (quickMessage.trim() && isSessionActive) {
      sendTextMessage(quickMessage);
      setQuickMessage("");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 h-full">
      <h3 className="text-lg font-semibold mb-4">Tools</h3>

      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quick">Quick Messages</TabsTrigger>
          <TabsTrigger value="custom">Custom Events</TabsTrigger>
        </TabsList>
        <TabsContent value="quick" className="space-y-4 mt-4">
          <div className="space-y-2">
            {quickMessages.map((msg, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleQuickMessage(msg)}
                disabled={!isSessionActive}
              >
                {msg}
              </Button>
            ))}
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Custom Message</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type custom message..."
                disabled={!isSessionActive}
              />
              <Button
                onClick={handleCustomMessage}
                disabled={!isSessionActive || !quickMessage.trim()}
                className="bg-primary text-white"
              >
                Send
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4 mt-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium mb-2">Send Custom Event</h4>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => sendClientEvent({ type: "session.reset" })}
              disabled={!isSessionActive}
            >
              Reset Session
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => sendClientEvent({ type: "response.create" })}
              disabled={!isSessionActive}
            >
              Request Response
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToolPanel;
