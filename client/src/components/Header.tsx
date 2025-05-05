import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.649 5.286L14 8.548V2.025h-4v6.523L4.351 5.286l-2 3.465 5.648 3.261-5.648 3.261 2 3.465L10 15.477V22h4v-6.523l5.649 3.261 2-3.465-5.648-3.261 5.648-3.261z" />
          </svg>
          <span className="font-bold text-xl text-gray-800">TurtleChat</span>
        </div>
        
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
          <a href="#faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
          <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="hidden sm:inline-block text-gray-600 hover:text-primary transition-colors">Login</a>
          <a href="#" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">Get Started</a>
        </div>
        
        <button className="md:hidden focus:outline-none" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-3 space-y-3 bg-white border-t">
          <a href="#features" className="block text-gray-600">Features</a>
          <a href="#pricing" className="block text-gray-600">Pricing</a>
          <a href="#faq" className="block text-gray-600">FAQ</a>
          <a href="#contact" className="block text-gray-600">Contact</a>
          <a href="#" className="block text-gray-600">Login</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
