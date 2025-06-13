import React from 'react';
import {
  MapPin, Box, Clock, Hash, Calendar, Edit, Package
} from 'lucide-react';

const Description = ({
  description,
  facilities = [],
  isEditable = false,
  onEdit,
  userRole = 'user',
}) => {
  const canEdit = isEditable && userRole === 'admin';

  const handleEditClick = () => {
    if (onEdit) onEdit('description');
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Facilities Grid */}
      <div className="bg-accent rounded-lg shadow-sm border p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center border p-3 rounded-md bg-background">
              <Package className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Capacity</div>
                <div className="text-sm font-medium text-gray-800">1200 containers</div>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md bg-background">
              <Clock className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Operating Hours</div>
                <div className="text-sm font-medium text-gray-800">8 AM - 8 PM</div>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md bg-background">
              <Hash className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">CFS Code</div>
                <div className="text-sm font-medium text-gray-800">GOL-CFS-001</div>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md bg-[#D4E6D2]">
              <Calendar className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Registered Since</div>
                <div className="text-sm font-medium text-gray-800">Jan 2023</div>
              </div>
            </div>
          </div>

          {/* Right: Facility Tags */}
          <div className="border p-6 rounded-md h-full">
            <div className="text-xl  font-medium text-gray-500 mb-2">Facilities</div>
            <div className="flex flex-wrap gap-2">
              {facilities.length ? (
                facilities.map((facility, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-background text-gray-700 rounded-full"
                  >
                    {facility}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-600">No facilities listed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-accent rounded-lg shadow-sm border p-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Box className="h-6 w-6 mr-3 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-800">About this facility</h3>
          </div>
          {canEdit && (
            <button
              onClick={handleEditClick}
              className="p-2 rounded hover:bg-gray-100"
              title="Edit Description"
            >
              <Edit className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>
        <p className="text-gray-700">
          {description || 'No description available for this facility.'}
        </p>
      </div>
    </div>
  );
};

export default Description;
