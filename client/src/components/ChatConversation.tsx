import { useEffect, useRef } from 'react';

interface ChatMessage {
  type: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isLoading?: boolean;
  isError?: boolean;
}

interface ChatConversationProps {
  conversations: ChatMessage[];
  isSessionActive: boolean;
}

const ChatConversation = ({ conversations, isSessionActive }: ChatConversationProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

  if (!isSessionActive) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Start a session to begin chatting</p>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Send a message to start the conversation</p>
      </div>
    );
  }

  // Reversing the order since the state stores most recent first
  const sortedConversations = [...conversations].reverse();

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto max-h-[400px]">
      {sortedConversations.map((message, index) => (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' 
              ? 'bg-primary text-white'
              : message.isError 
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-gray-100 text-gray-800'}`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold capitalize text-xs mb-1">
                {message.role === 'assistant' ? 'TurtleChat AI' : 'You'}
              </span>
              <span className="text-xs opacity-70 ml-2">{message.timestamp}</span>
            </div>

            {message.isLoading ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatConversation;
