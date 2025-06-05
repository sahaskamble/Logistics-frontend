'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSidebar } from "@/contexts/SidebarProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import Button from "@/components/ui/Button";
import { ArrowLeft, Edit, Trash2, Pencil, Delete } from "lucide-react";
import Photos from './components/Photos';
import Description from './components/Description';
import Location from './components/Location';
import Attachments from './components/Attachments';
import { getMockCFSDetails } from './components/mockData';

export default function ViewDetailsPage() {
  const { setTitle } = useSidebar();
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const id = searchParams.get('id') || '1';
  
  const [cfsDetails, setCfsDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle("View Details");
    
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
  }, [id, setTitle]);

  const handleGoBack = () => {
    router.back();
  };

  const handleEditCFS = () => {
    router.push(`/gol/edit-cfs/${id}`);
  };

  const handleDeleteCFS = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this CFS? This action cannot be undone.');
    if (confirmDelete) {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/cfs/${id}`, {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
        
        // if (!response.ok) {
        //   throw new Error('Failed to delete CFS');
        // }
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('CFS deleted successfully:', id);
        
        // Show success message
        alert('CFS deleted successfully!');
        
        // Navigate back to CFS list
        router.push('/gol/cfs-list');
        
      } catch (error) {
        console.error('Error deleting CFS:', error);
        alert('Failed to delete CFS. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = async (files) => {
    try {
      console.log('Starting file upload for files:', files);
      
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // files.forEach((file, index) => {
      //   formData.append(`file${index}`, file);
      // });
      // formData.append('cfsId', id);
      
      // const response = await fetch('/api/cfs/upload-attachments', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to upload files');
      // }
      
      // const result = await response.json();
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const uploadedFiles = files.map(file => ({
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        type: file.type,
        url: `/documents/${file.name}` 
      }));
      
      setCfsDetails(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...uploadedFiles]
      }));
      
      console.log('Files uploaded successfully:', uploadedFiles);
      alert(`Successfully uploaded ${files.length} file(s)!`);
      
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files. Please try again.');
    }
  };

  if (loading) {
    return (
      <section className="grid gap-6 min-h-dvh p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading CFS details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!cfsDetails) {
    return (
      <section className="grid gap-6 min-h-dvh p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">CFS details not found</p>
            <Button
              onClick={handleGoBack}
              icon={<ArrowLeft size={18} />}
              title="Go Back"
              className="bg-green-600 hover:bg-green-700"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-6 min-h-dvh p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{cfsDetails.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span><strong>CFS Code:</strong> {cfsDetails.cfsCode}</span>
              <span><strong>Capacity:</strong> {cfsDetails.capacity}</span>
              <span><strong>Operating Hours:</strong> {cfsDetails.operatingHours}</span>
              <span><strong>Established:</strong> {cfsDetails.established}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleEditCFS}
              icon={<Edit className="text-white" size={18} />}
              title="Edit CFS"
              className="rounded-md bg-blue-600 hover:bg-blue-700"
            />
            <Button
              onClick={handleDeleteCFS}
              icon={<Trash2 className="text-white" size={18} />}
              title="Delete CFS"
              className="rounded-md bg-red-600 hover:bg-red-700"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Photos 
          images={cfsDetails.images} 
          title={cfsDetails.name} 
        />
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6`}>
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

      <div>
        <Attachments
          attachments={cfsDetails.attachments}
          onUpload={handleFileUpload}
          isEditable={true}
        />
      </div>

      <div className="fixed bottom-6 left-6">
        <Button
          onClick={handleGoBack}
          icon={<ArrowLeft className="text-white" size={18} />}
          title="Back"
          className="rounded-md bg-green-600 hover:bg-green-700 shadow-lg"
        />
      </div>

      <div className="fixed bottom-6 right-4">
        <Button
          onClick={handleEditCFS}
          icon={<Pencil className="text-[var(--background)] cursor-pointer" size={10} />}
          title="Edit"
          className="rounded-md bg-green-800 hover:bg-green-800 shadow-lg"
        />
      </div>

      <div className="fixed bottom-6 right-6">
        <Button
          onClick={handleDeleteCFS}
          icon={<Delete className="text-[var(--background)] cursor-pointer" size={10} />}
          title="Delete"
          className="rounded-md bg-red-800 hover:bg-red-800 shadow-lg"
        />
      </div>
    </section>
  );
}