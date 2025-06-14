'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/contexts/SidebarProvider';
import { useCollection } from '@/hooks/useCollection';

import Photos from './components/Photos';
import Description from './components/Description';
import Location from './components/Location';
import Attachments from './components/Attachments';
import pbclient from '@/lib/db';
import { toast } from 'sonner';

export default function ViewDetails() {
  const { cfsId } = useParams();
  const { data: providers, loading } = useCollection('service_provider', { expand: 'service' });
  const [cfsDetails, setCfsDetails] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [images, setImages] = useState([]);

  const router = useRouter();

  const isMobile = useIsMobile();
  const { setTitle } = useSidebar();

  console.log(cfsId);
  console.log(providers);

  useEffect(() => {
    setTitle('View CFS Details');
  }, []);

  useEffect(() => {
    if (providers && cfsId) {
      const record = providers.find((item) => item.id === cfsId);
      setCfsDetails(record || null);
      // Getting Image URL's  
      const imgUrl = record?.files?.map(imgs=> pbclient.files.getURL(record, imgs));
      setImages(imgUrl)
    }
  }, [providers, cfsId]);

  const handleGoBack = () => router.back();

  const handleDeleteCFS = async () => {
    if (window.confirm("Are you sure you want to delete this CFS?")) {
      try {
        await pbclient.collection('service_provider').delete(cfsId);
        toast.success('CFS deleted successfully');
        router.push('/cfs-list');
      } catch (error) {
        toast.error('Failed to delete CFS: ' + error.message);
      }
    }
  };

  const handlePhotoUpload = async (files) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const record = await pbclient.collection('service_provider').update(cfsId, formData);
      const updatedUrls = record.files?.map(img => pbclient.files.getURL(record, img)) || [];
      setImages(updatedUrls);
      toast.success('Photos uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload photos: ' + error.message);
    }
  };

  const handleEdit = async (section, data) => {
    try {
      // Validate data based on section
      let validatedData = {};
      switch(section) {
        case 'description':
          validatedData.description = data.description;
          validatedData.features = data.facilities;
          validatedData.capacity = data.capacity;
          validatedData.operatingHours = data.operatingHours;
          break;
        case 'location':
          validatedData.location = data.location;
          validatedData.address = data.address;
          validatedData.coordinates = data.coordinates;
          validatedData.phone = data.contactInfo?.phone;
          validatedData.email = data.contactInfo?.email;
          validatedData.website = data.contactInfo?.website;
          break;
        default:
          validatedData = data;
      }

      const record = await pbclient.collection('service_provider').update(cfsId, validatedData);
      setCfsDetails(record);
      toast.success(`${section} updated successfully`);
    } catch (error) {
      toast.error(`Failed to update ${section}: ` + error.message);
    }
  };

  const handleAttachmentUpload = async (files) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const record = await pbclient.collection('service_provider').update(cfsId, formData);
      const updatedFiles = record.files || [];
      toast.success('Attachments uploaded successfully');
      return updatedFiles;
    } catch (error) {
      toast.error('Failed to upload attachments: ' + error.message);
      return [];
    }
  };

  if (loading || !providers) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading CFS details...</p>
      </div>
    );
  }

  if (!cfsDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600">CFS not found</p>
          <button onClick={handleGoBack} className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Photos */}
      <div className="mb-6">
        <Photos
          images={images || []}
          title={cfsDetails.title}
          providerId={cfsDetails.id}
          isEditable={true}
          userRole="system_administrator"
          onUpload={handlePhotoUpload}
        />
      </div>

      {/* Description + Location */}
      <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-2'} gap-6 mb-6`}>
        <Description
          description={cfsDetails.description}
          facilities={cfsDetails.features || []}
          capacity={cfsDetails.capacity}
          operatingHours={cfsDetails.operatingHours}
          cfsCode={cfsDetails.id}
          registeredDate={cfsDetails.created}
          isEditable={true}
          userRole="system_administrator"
          onEdit={(section, data) => handleEdit(section, data)}
        />
        <Location
          location={cfsDetails.location}
          address={cfsDetails.address}
          coordinates={cfsDetails.coordinates}
          contactInfo={{
            phone: cfsDetails.phone,
            email: cfsDetails.email,
            website: cfsDetails.website
          }}
          isEditable={true}
          userRole="system_administrator"
          onEdit={(section) => console.log('Edit section:', section)}
        />
      </div>

      {/* Attachments */}
      <Attachments
        attachments={cfsDetails.attachments || []}
        isEditable={true}
        userRole="system_administrator"
        onUpload={handleAttachmentUpload}
      />

      {/* Bottom Buttons */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={handleGoBack}
            className="flex items-center bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              onClick={handleDeleteCFS}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

