import { Button } from "@/components/ui/button";

interface AppDemoProps {
  startSession: () => Promise<void>;
  stopSession: () => void;
  isSessionActive: boolean;
}

const AppDemo = ({
  startSession,
  stopSession,
  isSessionActive,
}: AppDemoProps) => {
  return (
    <section className="py-16 bg-primary-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See TurtleChat in Action
          </h2>
          <p className="text-gray-600">
            Experience how our AI-powered platform makes language learning
            interactive
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="bg-gray-600 rounded-xl aspect-video flex items-center justify-center h-full">
              {isSessionActive ? (
                <Button
                  onClick={stopSession}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Stop Demo Session
                </Button>
              ) : (
                <Button
                  onClick={startSession}
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Start Demo
                </Button>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-bold">
              Powered by OpenAI's GPT-4o Realtime API
            </h3>
            <p className="text-gray-600">
              Our application leverages cutting-edge AI technology to provide
              natural, human-like conversations for language practice.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-primary rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Real-time audio processing</p>
                  <p className="text-sm text-gray-600">
                    Immediate response to your spoken language input
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-primary rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Natural conversation flow</p>
                  <p className="text-sm text-gray-600">
                    Context-aware responses that feel like talking to a native
                    speaker
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-primary rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Intelligent error correction</p>
                  <p className="text-sm text-gray-600">
                    Grammar and pronunciation feedback without disrupting
                    conversation
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={startSession}
              disabled={isSessionActive}
              className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-center font-medium transition-colors mt-4"
            >
              Try it yourself
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDemo;
