import React, { useState } from 'react';
import { X, Camera, CameraIcon } from 'lucide-react';

const Photos = ({ images = [], title = "CFS Facility" }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative mb-6">
        <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Camera className="h-12 w-12 mx-auto mb-2" />
            <p>No photos available</p>
          </div>
        </div>
      </div>
    );
  }

  const mainImage = images[0];
  const thumbnailImages = images.slice(1, 5);

  return (
    <div className="border bg-accent rounded-xl p-4 shadow-md shadow-foreground/40 relative overflow-hidden">
      <div className="bg-[#D4E6D2] rounded-lg p-3 mb-3 shadow-sm relative">
        <div className="bg-accent grid grid-cols-1 sm:grid-cols-4 gap-2 h-auto sm:h-160">
          {/* Main Image */}
          <div className="sm:col-span-2 relative h-48 sm:h-auto">
            <img
              src={mainImage}
              alt={`${title} - Main view`}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>

          {/* Thumbnails */}
          <div className="sm:col-span-2 grid grid-cols-2 gap-2">
            {thumbnailImages.map((image, index) => (
              <div key={index} className="relative h-24 sm:h-auto">
                <img
                  src={image}
                  alt={`${title} - View ${index + 2}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setShowAllPhotos(true)}
                />
                {index === 3 && images.length > 5 && (
                  <div
                    className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center cursor-pointer"
                    onClick={() => setShowAllPhotos(true)}
                  >
                    <span className="text-white font-semibold relative z-10">
                      +{images.length - 5} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Show all photos button */}
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-4 right-4 bg-green-800 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm sm:text-base"
        >
          <CameraIcon className="h-5 w-5" />
          Show all photos
        </button>
      </div>

      {/* Fullscreen Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-6xl w-full">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="text-black hover:text-gray-300 p-2"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            {/* Main Selected Image */}
            <div className="mb-6">
              <img
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                className="w-full max-h-[60vh] object-contain rounded-lg"
              />
            </div>

            {/* Thumbnail Navigator */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-32 overflow-y-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-green-700' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${title} - Thumbnail ${index + 1}`}
                    className="w-full h-16 object-cover hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
                className="px-4 py-2 bg-[#3C4D03] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-black py-2 px-4">
                {selectedImage + 1} of {images.length}
              </span>
              <button
                onClick={() =>
                  setSelectedImage(Math.min(images.length - 1, selectedImage + 1))
                }
                disabled={selectedImage === images.length - 1}
                className="px-4 py-2 bg-[#3C4D03] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
