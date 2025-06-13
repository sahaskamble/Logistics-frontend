import React from 'react';
import { Navigation, MapPin, ExternalLink, Edit } from 'lucide-react';

const Location = ({ 
  location, 
  address, 
  coordinates,
  isEditable = false, 
  onEdit,
  userRole = 'user'
}) => {
  const canEdit = isEditable && userRole === 'admin';
  const fullAddress = address || location || 'Location not specified';

  const handleEditClick = () => onEdit && onEdit('location');

  const handleDirectionsClick = () => {
    const locationQuery = encodeURIComponent(fullAddress);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${locationQuery}`, '_blank');
  };

  const handleLocationClick = () => {
    const locationQuery = encodeURIComponent(fullAddress);
    window.open(`https://www.google.com/maps/search/?api=1&query=${locationQuery}`, '_blank');
  };

  const getMapEmbedUrl = () => {
    if (coordinates?.lat && coordinates?.lng) {
      const { lat, lng } = coordinates;
      const bbox = `${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}`;
      return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
    }
    return `https://www.openstreetmap.org/export/embed.html?bbox=72.8777,19.0760,72.8777,19.0760&layer=mapnik&marker=19.0760%2C72.8777`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200"
      style={{ backgroundColor: 'var(--accent)' }}
    >
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Navigation 
              className="h-6 w-6 mr-2" 
              style={{ color: 'var(--primary)' }} 
            />
            <h3 
              className="text-lg font-semibold" 
              style={{ color: 'var(--foreground)' }}
            >
              Location
            </h3>
          </div>
          {canEdit && (
            <button
              onClick={handleEditClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Edit Location"
            >
              <Edit className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Map */}
        <div className="h-48 sm:h-64 bg-gray-200 rounded-lg relative mb-5 overflow-hidden border">
          <iframe
            title="Location Map"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '0.5rem' }}
            src={getMapEmbedUrl()}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Location Info */}
        <div className="space-y-3">
          <div
            className="flex items-start cursor-pointer hover:text-blue-600 transition-colors p-3 rounded-lg"
            onClick={handleLocationClick}
            style={{ backgroundColor: 'var(--background)' }}
          >
            <MapPin 
              className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" 
              style={{ color: 'var(--primary)' }} 
            />
            <div className="flex-1">
              <span 
                className="font-medium text-sm block"
                style={{ color: 'var(--foreground)' }}
              >
                {fullAddress}
              </span>
              {location && address && location !== address && (
                <span 
                  className="text-xs mt-1 block"
                  style={{ color: 'var(--secondary)' }}
                >
                  {location}
                </span>
              )}
            </div>
            <ExternalLink className="h-4 w-4 ml-2 flex-shrink-0" />
          </div>

          {/* Button */}
          <button
            onClick={handleDirectionsClick}
            className="w-full text-white py-3 px-4 rounded-lg bg-[#2E6F40] font-medium flex items-center justify-center hover:opacity-90 transition-colors"
          >
            <Navigation className="h-5 w-5 mr-2" />
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Location;
