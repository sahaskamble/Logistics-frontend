import React from 'react';
import { Navigation, MapPin, ExternalLink } from 'lucide-react';

const Location = ({ location, address }) => {
  // Function to open Google Maps with directions
  const handleDirectionsClick = () => {
    const locationQuery = encodeURIComponent(address || location);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${locationQuery}`, '_blank');
  };

  // Function to open location in Google Maps
  const handleLocationClick = () => {
    const locationQuery = encodeURIComponent(address || location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${locationQuery}`, '_blank');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <Navigation className="h-6 w-6 mr-2 text-green-600" />
        <h3 className="text-xl font-semibold">Location</h3>
      </div>

      {/* Map Container */}
      <div className="h-64 bg-gray-200 rounded-lg relative mb-4 overflow-hidden">
        {/* OpenStreetMap Embed */}
        <iframe
          title="Location Map"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '0.5rem' }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(address || location)}&layer=mapnik&marker=1`}
          allowFullScreen
        ></iframe>
        
        {/* Fallback to Google Maps if OpenStreetMap doesn't work */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Map loading...</p>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="space-y-3">
        <div
          className="flex items-center text-gray-700 cursor-pointer hover:text-green-600 transition-colors"
          onClick={handleLocationClick}
        >
          <MapPin className="h-5 w-5 mr-2 text-green-600" />
          <span className="font-medium">{address || location}</span>
          <ExternalLink className="h-4 w-4 ml-2" />
        </div>

        {/* Directions Button */}
        <button
          onClick={handleDirectionsClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <Navigation className="h-5 w-5 mr-2" />
          Get Directions
        </button>
      </div>
    </div>
  );
};

export default Location;