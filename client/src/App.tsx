import { useEffect, useState, useRef } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { apiRequest } from "./lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Component imports
import ChatInterface from "@/components/ChatInterface";
import { getQueryFn } from "./lib/queryClient";

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

// Define types used across the app
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

// For Web Speech API - TypeScript compatibility
type SpeechRecognitionType = any;
type SpeechRecognitionEventType = any;

function App() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Initialize speech recognition and synthesis
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const recognition = useRef<SpeechRecognitionType | null>(null);

  // Set up speech recognition on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // @ts-ignore - browser compatibility for Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: SpeechRecognitionEventType) => {
        const transcript = event.results[0][0].transcript;
        sendTextMessage(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
        toast({
          title: 'Voice Recognition Error',
          description: 'There was an error with the speech recognition. Please try again.',
          variant: 'destructive',
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
      if (synth) {
        synth.cancel();
      }
    };
  }, [toast]);

  // Function to start voice recognition
  const startListening = () => {
    if (recognition.current && !isListening) {
      try {
        recognition.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      }
    }
  };

  // Function to speak a response
  const speakResponse = (text: string) => {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synth.speak(utterance);
    }
  };

  // Start a new chat session
  async function startSession() {
    try {
      setIsLoading(true);
      
      // Skip creating a session on the backend for now, mock it here
      // In a full implementation, we would use:
      // const sessionResponse = await apiRequest<{id: number}>('/api/sessions', {...});
      
      // Create a fake session ID for now
      const sessionId = Date.now();
      setSessionId(sessionId);
      setIsSessionActive(true);
      setEvents([]);
      setConversations([]);
      
      // Add initial greeting
      const greeting: Conversation = {
        type: 'conversation',
        role: 'assistant',
        content: 'Hello! I\'m TurtleChat AI assistant. How can I help you today?',
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setConversations(prev => [greeting, ...prev]);
      
      // Add a welcome event
      const welcomeEvent: Event = {
        type: 'session.created',
        session_id: sessionId,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setEvents(prev => [welcomeEvent, ...prev]);
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
      
      // For demo purposes, create a mock response instead of using the API
      // Simulating a network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - using simple patterns for demo purposes
      let responseText = '';
      
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        responseText = `Hello there! I'm TurtleChat AI, your language learning assistant. How can I help you today?`;
      } else if (message.toLowerCase().includes('language') || message.toLowerCase().includes('learn')) {
        responseText = `Learning a new language can be exciting! I can help with vocabulary, grammar, or conversation practice. What language are you interested in?`;
      } else if (message.toLowerCase().includes('spanish')) {
        responseText = `¡Hola! Spanish is a beautiful language. Some basic phrases to start with: 'Hola' (Hello), 'Gracias' (Thank you), 'Por favor' (Please). Would you like to learn more phrases?`;
      } else if (message.toLowerCase().includes('french')) {
        responseText = `Bonjour! French is a lovely language. Some basic phrases: 'Bonjour' (Hello), 'Merci' (Thank you), 'S'il vous plaît' (Please). Would you like to practice pronunciation?`;
      } else if (message.toLowerCase().includes('practice') || message.toLowerCase().includes('conversation')) {
        responseText = `Conversation practice is key to language learning! Let's have a simple exchange. Try responding to: "What did you do this weekend?"`;
      } else {
        responseText = `I understand you're asking about "${message}". As your AI language assistant, I'm here to help with any language learning questions or conversation practice you might need.`;
      }
      
      const mockResponse: ChatResponse = { response: responseText };
      
      // Remove loading message and add response
      setConversations(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        const aiMessage: Conversation = {
          type: 'conversation',
          role: 'assistant',
          content: mockResponse.response,
          timestamp: new Date().toLocaleTimeString(),
        };
        
        return [aiMessage, ...filtered];
      });
      
      // Speak the response if enabled
      speakResponse(mockResponse.response);
      
      // Record the response event
      sendClientEvent({
        type: 'message.received',
        length: mockResponse.response.length,
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
            
            {/* Add the ChatInterface section */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience TurtleChat AI</h2>
                  <p className="text-gray-600">Try our AI assistant and see how it can help with language learning</p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <ChatInterface 
                    startSession={startSession}
                    stopSession={stopSession}
                    sendClientEvent={sendClientEvent}
                    sendTextMessage={sendTextMessage}
                    isSessionActive={isSessionActive} 
                    isLoading={isLoading}
                    events={events}
                    conversations={conversations}
                  />
                </div>
              </div>
            </section>
            
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
