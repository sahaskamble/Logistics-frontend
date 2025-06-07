import React, { useState } from 'react';
import { Edit, Plus, Trash2, Check, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Gallery from './Gallery';
import { toast } from 'sonner';
import { useCollection } from '@/hooks/useCollection';

export default function ServiceDetails({ serviceType, serviceProviders = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([]);
  const [newfeatures, setNewFeatures] = useState('');
  const { createItem: create, updateItem: update, deleteItem } = useCollection('service_provider');

  // Get the first service provider for this service type (assuming one per type for now)
  const serviceProvider = serviceProviders[0];

  React.useEffect(() => {
    if (serviceProvider) {
      setDescription(serviceProvider.description || '');
      // Parse facilities from features JSON or create default
      const features = serviceProvider.features || [];
      setFeatures(Array.isArray(features) ? features : []);
    } else {
      // Default description and facilities based on service type
      const defaultData = {
        CFS: {
          description: "Handles cargo movement and value-added services.",
          facilities: ["Forklift", "Reefer Plug"]
        },
        Transport: {
          description: "Provides transportation and logistics solutions.",
          facilities: ["GPS Tracking", "24/7 Support", "Multi-modal Transport"]
        },
        "3PL": {
          description: "Third-party logistics and supply chain management.",
          facilities: ["Inventory Management", "Order Fulfillment", "Distribution"]
        },
        Warehouse: {
          description: "Storage and distribution services.",
          facilities: ["Climate Control", "Security Systems", "Loading Docks"]
        }
      };

      const serviceData = defaultData[serviceType] || {
        description: "Service description not available.",
        facilities: []
      };

      setDescription(serviceData.description);
      setFeatures(serviceData.facilities);
    }
  }, [serviceProvider, serviceType]);

  const handleAddFacility = async () => {
    if (!newFacility.trim()) {
      toast.error('Please enter a valid feature name');
      return;
    }

    try {
      setFeatures(prev => [...prev, newFacility.trim()]);
      setNewFacility('');
    } catch (err) {
      toast.error('Error Adding Features')
      console.error(err);
    }
  };

  const handleRemoveFacility = async (index) => {
    try {
      setFeatures(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      toast.error('Error Deleting Feature From List');
      console.error(err);
    }
  };

  const handleEditDescription = async () => {
    try {
      const res = await updateItem(id, description);
      if (!res) {
        toast.error('Error Updating Description');
        return;
      }
      toast.success('Successfully Updated the Description');
    } catch (err) {
      toast.error('Error Updating The Edited Description'); 
    }
  };

  const handleSaveChanges = () => {
    // TODO: Implement API call to save changes
    setIsEditing(false);
    toast.success('Changes saved successfully');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    if (serviceProvider) {
      setDescription(serviceProvider.description || '');
      const features = serviceProvider.features || [];
      setFeatures(Array.isArray(features) ? features : []);
    }
  };

  return (
    <div className="bg-[var(--accent)] rounded-xl p-6 border-2 border-gray-300 mt-4">
      {/* Service Details Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{serviceType} Service Details</h3>
        {!isEditing ? (
          <Button
            variant="outline"
            title="Edit Description"
            icon={<Edit size={16} />}
            onClick={() => setIsEditing(true)}
            className="text-sm"
          />
        ) : (
          <div className="flex gap-2">
            <Button
              variant="default"
              title="Save"
              icon={<Check size={16} />}
              onClick={handleSaveChanges}
              className="text-sm"
            />
            <Button
              variant="outline"
              title="Cancel"
              icon={<X size={16} />}
              onClick={handleCancel}
              className="text-sm"
            />
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="mb-6">
        <Label title="Description:" className="mb-2 block" />
        {isEditing ? (
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter service description..."
            className="w-full"
            rows={3}
          />
        ) : (
          <p className="text-gray-700 bg-white p-3 rounded-md border">
            "{description}"
          </p>
        )}
        {isEditing && (
          <Button
            variant="link"
            title="Edit Description"
            onClick={handleEditDescription}
            className="text-sm mt-2"
          />
        )}
      </div>

      {/* Facilities Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Label title="Facility & Services Offered:" className="text-gray-800" />
          {isEditing && (
            <Button
              variant="outline"
              title="Add New Service"
              icon={<Plus size={16} />}
              onClick={() => {
                // Focus on the input field
                document.getElementById('new-facility-input')?.focus();
              }}
              className="text-sm"
            />
          )}
        </div>

        {/* Facilities List */}
        <div className="space-y-2">
          {features.map((facility, index) => (
            <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{facility}</span>
              </div>
              <div className="ml-auto flex gap-2">
                {isEditing && (
                  <>
                    <Button
                      variant="none"
                      icon={<Edit size={14} />}
                      onClick={() => {
                        // TODO: Implement inline editing
                        toast.info('Inline editing coming soon');
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50"
                    />
                    <Button
                      variant="none"
                      icon={<Trash2 size={14} />}
                      onClick={() => handleRemoveFacility(index)}
                      className="p-1 text-red-600 hover:bg-red-50"
                    />
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Add New Facility Input */}
          {isEditing && (
            <div className="flex gap-2 bg-white p-3 rounded-md border border-dashed border-gray-300">
              <Input
                id="new-facility-input"
                value={newfeatures}
                onChange={(e) => setNewFeatures(e.target.value)}
                placeholder="Enter new facility or service..."
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFacility();
                  }
                }}
              />
              <Button
                variant="default"
                title="Add"
                icon={<Plus size={16} />}
                onClick={handleAddFacility}
                disabled={!newfeatures.trim()}
                className="text-sm"
              />
            </div>
          )}
        </div>

        {features.length === 0 && !isEditing && (
          <div className="text-center py-8 text-gray-500">
            <p>No facilities listed yet.</p>
            <Button
              variant="outline"
              title="Add Services"
              icon={<Plus size={16} />}
              onClick={() => setIsEditing(true)}
              className="mt-2"
            />
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <Gallery
        serviceProvider={serviceProvider}
        serviceType={serviceType}
        isEditing={isEditing}
      />
    </div>
  );
}
