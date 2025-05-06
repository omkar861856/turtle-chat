import { Button } from "@/components/ui/button";
import SessionControls from "./SessionControlsMain";
import { ArrowRightCircle } from "lucide-react";
import WaveSurferRecorder from "./WaveSurferRecorder";

interface HeroSectionProps {
  startSession: () => Promise<void>;
  isSessionActive: boolean;
}

const HeroSection = ({
  startSession,
  isSessionActive,
  stopSession,
  sendClientEvent,
  events,
  dataChannel,
  audioElement,
}: HeroSectionProps) => {
  return (
    <section className="hero-bg py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Learn Spanish the easy way with{" "}
              <span className="text-primary">real-time AI conversation</span>
            </h1>
            <p className="text-lg text-gray-600">
              Practice your language skills with our AI powered conversation
              partner. Get instant feedback and improve faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
              <SessionControls
                startSession={startSession}
                stopSession={stopSession}
                sendClientEvent={sendClientEvent}
                events={events}
                isSessionActive={isSessionActive}
              />
              <Button
                variant="outline"
                className="border border-primary text-primary hover:text-green-600  py-3 rounded-lg text-center font-medium transition-colors"
              >
                <ArrowRightCircle className="w-4 h-4 " />
              </Button>
            </div>

            <div className="pt-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-4">iOS App</p>
                  <div className="border-2 border-primary rounded-xl p-4 bg-white">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://apps.apple.com/app/turtlechat"
                      alt="QR Code for iOS App"
                      className="w-40 h-40"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-4">Android App</p>
                  <div className="border-2 border-primary rounded-xl p-4 bg-white">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://play.google.com/store/apps/details?id=com.turtlechat"
                      alt="QR Code for Android App"
                      className="w-40 h-40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              <WaveSurferRecorder
                dataChannel={dataChannel}
                audioElement={audioElement}
                isSessionActive={isSessionActive}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
