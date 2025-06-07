import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import pbclient from '@/lib/db';

export default function ProfileHeader({ user, onAvatarUpdate }) {
  const [isUploading, setIsUploading] = useState(false);
  const { user: authUser } = useAuth();

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const updatedUser = await pbclient.collection('users').update(user.id, formData);
      
      if (onAvatarUpdate) {
        onAvatarUpdate(updatedUser);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const getAvatarUrl = () => {
    if (user?.avatar) {
      return pbclient.files.getURL(user, user.avatar);
    }
    return null;
  };

  const getDisplayName = () => {
    if (user?.firstname && user?.lastname) {
      return `${user.firstname} ${user.lastname}`;
    }
    return user?.name || user?.username || 'User';
  };

  return (
    <div className="bg-[var(--accent)] rounded-xl p-8 border-2 border-gray-300 h-fit">
      <div className="flex flex-col items-center space-y-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-xl">
            {getAvatarUrl() ? (
              <img
                src={getAvatarUrl()}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
                {getDisplayName().charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Camera Icon Overlay */}
          <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200">
            <Camera size={18} className="text-gray-600" />
          </div>
        </div>

        {/* User Name */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {getDisplayName()}
          </h3>
          <p className="text-sm text-gray-600">Merchant User</p>
        </div>

        {/* Upload Button */}
        <div className="w-full">
          <label htmlFor="avatar-upload" className="cursor-pointer block">
            <Button
              variant="outline"
              title={isUploading ? "Uploading..." : "Upload / Change Photo"}
              icon={<Upload size={16} />}
              disabled={isUploading}
              className="w-full text-sm justify-center"
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
