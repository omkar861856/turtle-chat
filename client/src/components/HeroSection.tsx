import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  startSession: () => Promise<void>;
  isSessionActive: boolean;
}

const HeroSection = ({ startSession, isSessionActive }: HeroSectionProps) => {
  return (
    <section className="hero-bg py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Learn Spanish the easy way with <span className="text-primary">real-time AI conversation</span>
            </h1>
            <p className="text-lg text-gray-600">
              Practice your language skills with our AI powered conversation partner. Get instant feedback and improve faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-center font-medium transition-colors"
                onClick={startSession}
                disabled={isSessionActive}
              >
                Try for Free
              </Button>
              <Button variant="outline" className="border border-primary text-primary hover:bg-primary-light px-6 py-3 rounded-lg text-center font-medium transition-colors">
                Learn More
              </Button>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">Download our mobile app:</p>
              <div className="flex space-x-6">
                <div className="border border-gray-200 rounded-lg p-3 bg-white">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/app/ios" alt="QR Code for iOS App" className="w-24 h-24" />
                </div>
                <div className="border border-gray-200 rounded-lg p-3 bg-white">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/app/android" alt="QR Code for Android App" className="w-24 h-24" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              <img 
                src="https://placehold.co/600x400/E8F5E9/4CAF50?text=TurtleChat+App"
                alt="TurtleChat App Interface" 
                className="rounded-2xl shadow-xl mx-auto" 
              />
            </div>
            <div className="absolute -bottom-6 -right-6 z-0">
              <img 
                src="https://placehold.co/400x300/E8F5E9/4CAF50?text=TurtleChat+Demo"
                alt="TurtleChat App Interface" 
                className="rounded-2xl shadow-lg" 
              />
            </div>
            <div className="absolute top-1/4 -left-10 z-20 bg-white p-3 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2 bg-primary-light p-2 rounded">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm font-medium">Real-time feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
