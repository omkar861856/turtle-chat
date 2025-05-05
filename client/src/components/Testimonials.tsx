const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah T.",
      role: "Learning Spanish",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "TurtleChat has transformed my language learning journey. The AI conversations feel so natural, and I've improved my Spanish speaking skills faster than with any other app I've tried."
    },
    {
      name: "Michael L.",
      role: "Learning French",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "The real-time feedback on my pronunciation has been a game-changer. I can now confidently speak French in real-world situations thanks to my daily practice with TurtleChat."
    },
    {
      name: "Elena K.",
      role: "Learning Japanese",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "Learning Japanese seemed impossible until I found TurtleChat. The app adapts to my level and gradually introduces new vocabulary and grammar. I'm making progress every day!"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600">Join thousands of satisfied language learners</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.name} avatar`} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
