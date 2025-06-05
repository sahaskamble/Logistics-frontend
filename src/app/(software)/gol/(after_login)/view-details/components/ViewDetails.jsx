 'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import Photos from './components/Photos';
import Description from './components/Description';
import Location from './components/Location';
import Attachments from './components/Attachments';
import { getMockCFSDetails } from './mockData';

export default function ViewDetails({ id }) {
  const [cfsDetails, setCfsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCFSDetails = async () => {
      try {
      
        const mockDetails = getMockCFSDetails(id);
        
        setCfsDetails(mockDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CFS details:', error);
        setLoading(false);
      }
    };

    fetchCFSDetails();
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleEditCFS = () => {
    router.push(`/admin/cfs/edit/${id}`);
  };

  const handleDeleteCFS = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this CFS? This action cannot be undone.');
    if (confirmDelete) {
  
      console.log('Deleting CFS:', id);
     
    }
  };

  const handleFileUpload = (files) => {
   
    console.log('Uploading files:', files);
    
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CFS details...</p>
        </div>
      </div>
    );
  }

  if (!cfsDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">CFS details not found</p>
          <button
            onClick={handleGoBack}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
          
            <button
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>

           
            <div className="flex items-center space-x-3">
              <button
                onClick={handleEditCFS}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit CFS
              </button>
              <button
                onClick={handleDeleteCFS}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete CFS
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="container mx-auto px-4 py-8">
       
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{cfsDetails.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span><strong>CFS Code:</strong> {cfsDetails.cfsCode}</span>
            <span><strong>Capacity:</strong> {cfsDetails.capacity}</span>
            <span><strong>Operating Hours:</strong> {cfsDetails.operatingHours}</span>
            <span><strong>Established:</strong> {cfsDetails.established}</span>
          </div>
        </div>

        
        <Photos
          images={cfsDetails.images} 
          title={cfsDetails.name} 
        />

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
         
          <div>
            <Description
              description={cfsDetails.description}
              facilities={cfsDetails.facilities}
            />
          </div>

    
          <div>
            <Location
              location={cfsDetails.location}
              address={cfsDetails.address}
            />
          </div>
        </div>

      
        <Attachments
          attachments={cfsDetails.attachments}
          onUpload={handleFileUpload}
          isEditable={true}
        />
      </div>
    </div>
  );
}