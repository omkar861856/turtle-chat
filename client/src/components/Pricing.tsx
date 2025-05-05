import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-primary-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">Choose the plan that works best for your language learning journey</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden lg:w-1/3">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-gray-600 mb-4">Try it out</p>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <Button className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 rounded-lg font-medium transition-colors">
                Get Started
              </Button>
            </div>
            <div className="p-6">
              <h4 className="font-semibold mb-4">What's included:</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">5 minutes of AI conversation daily</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">Basic pronunciation feedback</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">1 language of your choice</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border-2 border-primary overflow-hidden lg:w-1/3 lg:-mt-4 lg:mb-4 relative z-10">
            <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium">
              Most Popular
            </div>
            <div className="p-6 border-b mt-6">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-gray-600 mb-4">For regular learners</p>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">$7.50</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <Button className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-2 rounded-lg font-medium transition-colors">
                Get Started
              </Button>
            </div>
            <div className="p-6">
              <h4 className="font-semibold mb-4">Everything in Free, plus:</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">Unlimited AI conversations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">Advanced pronunciation analysis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">3 languages of your choice</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">Personalized learning plan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">Progress tracking and reports</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden lg:w-1/3">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <p className="text-gray-600 mb-4">For teams & businesses</p>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">$19.99</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <Button className="block w-full bg-gray-800 hover:bg-black text-white text-center py-2 rounded-lg font-medium transition-colors">
                Contact Sales
              </Button>
            </div>
            <div className="p-6">
              <h4 className="font-semibold mb-4">Everything in Premium, plus:</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">Team management dashboard</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">All languages available</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">Custom vocabulary training</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">Priority support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
