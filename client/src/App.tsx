import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { apiRequest } from "./lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Component imports
import ChatInterface from "@/components/ChatInterface";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import AppDemo from "@/components/AppDemo";
import AppScreenshots from "@/components/AppScreenshots";
import AppDownload from "@/components/AppDownload";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Define types for state
type Event = {
  type: string;
  event_id?: string;
  timestamp?: string;
  [key: string]: any;
};

type Conversation = {
  type: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isLoading?: boolean;
  isError?: boolean;
};

function App() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check if the OpenAI API key is configured when the component mounts
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/openai/status');
        const data = await response.json();
        
        if (data.status !== 'configured') {
          toast({
            title: 'OpenAI API Key',
            description: 'Missing or invalid OpenAI API key. Some features might not work properly.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error checking API status:', error);
      }
    };
    
    checkApiStatus();
  }, [toast]);

  // Start a new chat session
  async function startSession() {
    try {
      setIsLoading(true);
      
      // Create a new session
      const sessionResponse = await apiRequest('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'en', // Default language
        }),
      });
      
      if (sessionResponse) {
        setSessionId(sessionResponse.id);
        setIsSessionActive(true);
        setEvents([]);
        setConversations([]);
        
        // Add initial greeting
        const greeting = {
          type: 'conversation',
          role: 'assistant',
          content: 'Hello! I\'m TurtleChat AI assistant. How can I help you today?',
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setConversations(prev => [greeting, ...prev]);
        
        // Add a welcome event
        const welcomeEvent = {
          type: 'session.created',
          session_id: sessionResponse.id,
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setEvents(prev => [welcomeEvent, ...prev]);
      }
    } catch (error) {
      console.error('Error starting session:', error);
      toast({
        title: 'Session Error',
        description: 'Failed to start a new chat session. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // End the current session
  function stopSession() {
    setIsSessionActive(false);
    setSessionId(null);
    
    // Add session end event
    const endEvent = {
      type: 'session.ended',
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setEvents(prev => [endEvent, ...prev]);
    
    toast({
      title: 'Session Ended',
      description: 'Your chat session has been ended.',
    });
  }

  // Record a client event
  function sendClientEvent(message: Event) {
    if (isSessionActive) {
      const timestamp = new Date().toLocaleTimeString();
      const eventId = crypto.randomUUID();
      
      const newEvent: Event = {
        ...message,
        event_id: message.event_id || eventId,
        timestamp: message.timestamp || timestamp,
      };
      
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } else {
      console.error('Failed to record event - no active session');
      return null;
    }
  }

  // Send a text message to the AI
  async function sendTextMessage(message: string) {
    if (!isSessionActive || !message.trim()) {
      return;
    }
    
    try {
      // Add user message to conversations
      const userMessage: Conversation = {
        type: 'conversation',
        role: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setConversations(prev => [userMessage, ...prev]);
      
      // Record the event
      sendClientEvent({
        type: 'message.sent',
        content: message,
      });
      
      // Show loading indicator
      const loadingMessage: Conversation = {
        type: 'conversation',
        role: 'assistant',
        content: '...',
        isLoading: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setConversations(prev => [loadingMessage, ...prev]);
      
      // Send to OpenAI API
      interface ChatResponse {
        response: string;
      }
      
      const response = await apiRequest<ChatResponse>('/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      });
      
      // Remove loading message and add response
      setConversations(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        const aiMessage: Conversation = {
          type: 'conversation',
          role: 'assistant',
          content: response.response || 'I\'m having trouble responding right now.',
          timestamp: new Date().toLocaleTimeString(),
        };
        
        return [aiMessage, ...filtered];
      });
      
      // Record the response event
      sendClientEvent({
        type: 'message.received',
        length: response.response?.length || 0,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove loading message and add error message
      setConversations(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        const errorMessage: Conversation = {
          type: 'conversation',
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request.',
          isError: true,
          timestamp: new Date().toLocaleTimeString(),
        };
        
        return [errorMessage, ...filtered];
      });
      
      toast({
        title: 'Message Error',
        description: 'Failed to send your message. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen font-sans antialiased">
          <Header />
          <main>
            <HeroSection
              startSession={startSession}
              isSessionActive={isSessionActive}
            />
            <Features />
            <AppDemo
              startSession={startSession}
              stopSession={stopSession}
              isSessionActive={isSessionActive}
            />
            <AppScreenshots />
            <AppDownload />
            <Testimonials />
            <Pricing />
            <FAQ />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
