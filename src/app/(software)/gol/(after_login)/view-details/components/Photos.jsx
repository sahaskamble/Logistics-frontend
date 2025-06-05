import React, { useState } from 'react';

const Photos = ({ images, title }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Extract the first 5 images for the gallery
  const featuredImages = images?.slice(0, 5) || [];
  const mainImage = featuredImages[0];
  const secondaryImages = featuredImages.slice(1);

  const handleShowAllPhotos = () => {
    setShowAllPhotos(true);
  };

  const handleCloseGallery = () => {
    setShowAllPhotos(false);
  };

  return (
    <>
      {/* Main Photo Gallery */}
      <div className="relative mb-8">
        <div className="grid grid-cols-4 gap-2 h-96 rounded-lg overflow-hidden">
          {/* Main large image */}
          <div className="col-span-2 row-span-2 relative">
            <img
              src={mainImage}
              alt={`${title} - Main Image`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Secondary images */}
          {secondaryImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`${title} - Image ${index + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Show all photos button */}
        <button
          onClick={handleShowAllPhotos}
          className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm font-medium"
        >
          View all photos
        </button>
      </div>

      {/* Full Screen Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="max-w-4xl max-h-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-semibold">All Photos</h3>
              <button
                onClick={handleCloseGallery}
                className="text-white hover:text-gray-300 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {images?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Photos;