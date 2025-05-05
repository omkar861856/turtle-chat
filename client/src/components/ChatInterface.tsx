import { useState } from 'react';
import ChatConversation from './ChatConversation';
import EventLog from './EventLog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface ChatInterfaceProps {
  startSession: () => Promise<void>;
  stopSession: () => void;
  sendClientEvent: (message: any) => void;
  sendTextMessage: (message: string) => void;
  isSessionActive: boolean;
  isLoading: boolean;
  events: any[];
  conversations: any[];
  startListening?: () => void;
  isListening?: boolean;
  isSpeaking?: boolean;
}

const ChatInterface = ({
  startSession,
  stopSession,
  sendTextMessage,
  sendClientEvent,
  isSessionActive,
  isLoading,
  events,
  conversations,
  startListening,
  isListening = false,
  isSpeaking = false,
}: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isSessionActive) {
      sendTextMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Header with session controls */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">TurtleChat AI Assistant</h3>
          {isSessionActive ? (
            <Button onClick={stopSession} variant="destructive" size="sm">
              End Session
            </Button>
          ) : (
            <Button onClick={startSession} className="bg-primary text-white" size="sm" disabled={isLoading}>
              {isLoading ? 'Starting...' : 'Start Session'}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs for Conversation and Event Log */}
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Conversation</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="chat" className="h-full flex flex-col">
            <ChatConversation conversations={conversations} isSessionActive={isSessionActive} />
          </TabsContent>

          <TabsContent value="events" className="h-full p-4 overflow-y-auto">
            <EventLog events={events} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Message input */}
      <div className="p-4 border-t">
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
    </div>
  );
};

export default ChatInterface;
