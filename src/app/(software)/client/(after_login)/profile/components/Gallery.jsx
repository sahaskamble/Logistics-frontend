import React, { useEffect, useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import Button from '@/components/ui/Button';
import pbclient from '@/lib/db';
import { toast } from 'sonner';

export default function Gallery({ serviceProvider, serviceType, isEditing = false }) {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (serviceProvider?.files) {
      // Convert PocketBase files to image URLs
      const imageUrls = serviceProvider.files.map(filename => 
        pbclient.files.getURL(serviceProvider, filename)
      );
      setImages(imageUrls);
    } else {
      // Default placeholder images based on service type
      const defaultImages = {
        CFS: [
          '/CFS/global-freight-logistics/1.jpg',
          '/CFS/global-freight-logistics/2.jpg',
          '/CFS/global-freight-logistics/3.jpg',
          '/CFS/global-freight-logistics/4.jpg'
        ],
        Transport: [
          '/transport/truck1.jpg',
          '/transport/truck2.jpg'
        ],
        '3PL': [
          '/3pl/warehouse1.jpeg',
          '/3pl/warehouse2.jpg'
        ],
        Warehouse: [
          '/warehouse/storage1.jpg',
          '/warehouse/storage2.jpg'
        ]
      };

      console.log(defaultImages)

      setImages(defaultImages[serviceType] || ["No Images uploaded"]);
    }
  }, [serviceProvider, serviceType]);

  console.log(images)

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      // TODO: Implement actual file upload to PocketBase
      // For now, just simulate the upload
      const newImageUrls = files.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImageUrls]);
      toast.success(`${files.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    toast.success('Image removed');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-semibold text-gray-800">Gallery</h4>
        {isEditing && (
          <label htmlFor="gallery-upload" className="cursor-pointer">
            <Button
              variant="outline"
              title={isUploading ? "Uploading..." : "Add Photos"}
              icon={<Upload size={16} />}
              disabled={isUploading}
              className="text-sm"
            />
            <input
              id="gallery-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 border-2 border-gray-300">
              <img
                src={image || image[serviceType]}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback for broken images
                  //
                }}
              />
            </div>
            
            {/* Remove button - only show when editing */}
            {isEditing && (
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}

        {/* Add Photo Placeholder - only show when editing */}
        {isEditing && (
          <label htmlFor="gallery-upload-placeholder" className="cursor-pointer">
            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-400 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
              <Plus size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500 text-center">Add Photo</span>
            </div>
            <input
              id="gallery-upload-placeholder"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-400 mb-4">
            <Upload size={48} className="mx-auto" />
          </div>
          <p className="text-gray-500 mb-4">No photos in gallery yet</p>
          {isEditing && (
            <label htmlFor="gallery-upload-empty" className="cursor-pointer">
              <Button
                variant="outline"
                title="Upload Photos"
                icon={<Upload size={16} />}
                disabled={isUploading}
              />
              <input
                id="gallery-upload-empty"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-700">Uploading images...</span>
          </div>
        </div>
      )}
    </div>
  );
}
