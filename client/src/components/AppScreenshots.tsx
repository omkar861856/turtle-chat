const AppScreenshots = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Language Learners</h2>
          <p className="text-gray-600">Our intuitive interface makes practicing language skills simple and enjoyable</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <img 
            src="https://placehold.co/300x500/E8F5E9/4CAF50?text=Screen+1"
            alt="TurtleChat App Screenshot" 
            className="rounded-xl shadow-md" 
          />
          <img 
            src="https://placehold.co/300x500/E8F5E9/4CAF50?text=Screen+2"
            alt="TurtleChat App Screenshot" 
            className="rounded-xl shadow-md" 
          />
          <img 
            src="https://placehold.co/300x500/E8F5E9/4CAF50?text=Screen+3"
            alt="TurtleChat App Screenshot" 
            className="rounded-xl shadow-md" 
          />
          <img 
            src="https://placehold.co/300x500/E8F5E9/4CAF50?text=Screen+4"
            alt="TurtleChat App Screenshot" 
            className="rounded-xl shadow-md" 
          />
          <img 
            src="https://placehold.co/300x500/E8F5E9/4CAF50?text=Screen+5"
            alt="TurtleChat App Screenshot" 
            className="rounded-xl shadow-md" 
          />
        </div>
      </div>
    </section>
  );
};

export default AppScreenshots;
