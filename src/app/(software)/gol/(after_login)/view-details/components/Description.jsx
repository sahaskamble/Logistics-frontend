import React from 'react';
import { Package, CheckCircle } from 'lucide-react';

const Description = ({ description, facilities }) => {
  return (
    <div className="space-y-6">
      {/* Description Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Package className="h-6 w-6 mr-2 text-green-600" />
          <h3 className="text-xl font-semibold">About this facility</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Facilities Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
          <h3 className="text-xl font-semibold">Facilities</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilities?.map((facility, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">{facility}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;