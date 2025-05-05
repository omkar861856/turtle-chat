const AppDownload = () => {
  return (
    <section className="py-16 bg-primary-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Download our mobile app</h2>
          <p className="text-gray-600">Take your language learning with you wherever you go</p>
        </div>
        
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
    </section>
  );
};

export default AppDownload;
