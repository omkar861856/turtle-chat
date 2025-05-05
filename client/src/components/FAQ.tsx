import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the real-time conversation technology work?",
      answer: "TurtleChat uses OpenAI's GPT-4o Realtime API to process your speech in real-time. When you speak, your audio is securely transmitted to our servers, processed by the AI, and a response is generated immediately. This creates a natural back-and-forth conversation experience."
    },
    {
      question: "Which languages are supported?",
      answer: "TurtleChat currently supports Spanish, French, German, Italian, Portuguese, Japanese, Chinese (Mandarin), Korean, and Russian. We're constantly adding new languages based on user feedback."
    },
    {
      question: "Do I need to be connected to the internet?",
      answer: "Yes, TurtleChat requires an internet connection to function as it processes audio through our cloud-based AI system. We recommend a stable WiFi or cellular connection for the best experience."
    },
    {
      question: "How does the free trial work?",
      answer: "The free tier allows you to use TurtleChat for up to 5 minutes of conversation per day. You can try all the basic features without entering payment information. If you enjoy the experience, you can upgrade to a premium plan at any time."
    },
    {
      question: "Is my conversation data private?",
      answer: "We take privacy seriously. Your conversations are encrypted during transmission and we don't store audio recordings. We use conversation data only to improve the AI model's performance. You can delete your data at any time from your account settings."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions & Answers</h2>
          <p className="text-gray-600">Find answers to commonly asked questions</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full text-left p-4 font-medium flex justify-between items-center focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-gray-600 transform transition-transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
