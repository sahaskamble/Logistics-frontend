'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/contexts/SidebarProvider';
import { useCollection } from '@/hooks/useCollection';

import Photos from './components/Photos';
import Description from './components/Description';
import Location from './components/Location';
import Attachments from './components/Attachments';

export default function ViewDetails() {
  const { data: providers, loading } = useCollection('service_provider', { expand: 'service' });
  const [cfsDetails, setCfsDetails] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const isMobile = useIsMobile();
  const { setTitle } = useSidebar();

  useEffect(() => {
    setTitle('View CFS Details');
  }, []);

  useEffect(() => {
    if (providers && id) {
      const record = providers.find((item) => item.id === id);
      setCfsDetails(record || null);
    }
  }, [providers, id]);

  const handleGoBack = () => router.back();

  const handleDeleteCFS = () => {
    if (window.confirm("Are you sure you want to delete this CFS?")) {
      console.log("Delete logic here for:", id);
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
        <Photos images={cfsDetails.files || []} title={cfsDetails.title} id={cfsDetails.id} />
      </div>

      {/* Description + Location */}
      <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-2'} gap-6 mb-6`}>
        <Description description={cfsDetails.description} facilities={cfsDetails.features} />
        <Location location={cfsDetails.location} contact={cfsDetails.contact} />
      </div>

      {/* Attachments */}
      <Attachments
        attachments={cfsDetails.attachments || []}
        isEditable={true}
        userRole="system_administrator"
        onUpload={(files) => console.log('Upload logic:', files)}
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



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from "next/navigation";
// import { ArrowLeft, Edit, Trash2, X, Camera, FileText, MapPin, Paperclip } from "lucide-react";
// import Photos from './components/Photos';
// import Description from './components/Description';
// import Location from './components/Location';
// import Attachments from './components/Attachments';
// import { useIsMobile } from "@/hooks/use-mobile";
// import { useSidebar } from "@/contexts/SidebarProvider";
// import { getMockCFSDetails } from '@/constants/mockData';

// export default function ViewDetails({ id }) {
//   const [cfsDetails, setCfsDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [userRole, setUserRole] = useState('system_administrator'); // Mock user role
//   const router = useRouter();
//   const isMobile = useIsMobile();
//   const { setTitle } = useSidebar();

//   useEffect(() => {
//     setTitle('Balmer Inymix CFS');
//   }, []);

//   useEffect(() => {
//     const fetchCFSDetails = async () => {
//       try {
//         const mockDetails = getMockCFSDetails(id);
//         setCfsDetails(mockDetails);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching CFS details:', error);
//         setLoading(false);
//       }
//     };

//     fetchCFSDetails();
//   }, [id]);

//   const handleGoBack = () => {
//     router.back();
//   };

//   const handleEditCFS = () => {
//     setShowEditModal(true);
//   };

//   const handleDeleteCFS = () => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this CFS? This action cannot be undone.');
//     if (confirmDelete) {
//       console.log('Deleting CFS:', id);
//     }
//   };

//   const handleFileUpload = (files) => {
//     console.log('Uploading files:', files);
//   };

//   const handleEditSection = (section) => {
//     console.log(`Editing ${section} section`);
//     setShowEditModal(false);
//     // Navigate or show specific edit modal here
//   };

//   const EditModal = () => (
//     <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-[#D4E6D2] rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h3 className="text-lg font-semibold text-[var(--foreground)]">Edit CFS Details</h3>
//           <button
//             onClick={() => setShowEditModal(false)}
//             className="text-[var(--secondary)] hover:text-[var(--foreground)]"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="p-4 space-y-3">
//           <p className="text-sm text-[var(--secondary)] mb-4">
//             Select which section you want to edit:
//           </p>

//           <button
//             onClick={() => handleEditSection('photos')}
//             className="w-full flex items-center p-3 text-left bg-[var(--accent)] hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <Camera className="h-5 w-5 mr-3 text-[var(--primary)]" />
//             <div>
//               <p className="font-medium text-[var(--foreground)]">Photos</p>
//               <p className="text-sm text-[var(--secondary)]">Update facility images</p>
//             </div>
//           </button>

//           <button
//             onClick={() => handleEditSection('description')}
//             className="w-full flex items-center p-3 text-left bg-[var(--accent)] hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <FileText className="h-5 w-5 mr-3 text-[var(--primary)]" />
//             <div>
//               <p className="font-medium text-[var(--foreground)]">Description & Facilities</p>
//               <p className="text-sm text-[var(--secondary)]">Edit facility description and amenities</p>
//             </div>
//           </button>

//           <button
//             onClick={() => handleEditSection('location')}
//             className="w-full flex items-center p-3 text-left bg-[var(--accent)] hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <MapPin className="h-5 w-5 mr-3 text-[var(--primary)]" />
//             <div>
//               <p className="font-medium text-[var(--foreground)]">Location</p>
//               <p className="text-sm text-[var(--secondary)]">Update address and location details</p>
//             </div>
//           </button>

//           <button
//             onClick={() => handleEditSection('attachments')}
//             className="w-full flex items-center p-3 text-left bg-[var(--accent)] hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <Paperclip className="h-5 w-5 mr-3 text-[var(--primary)]" />
//             <div>
//               <p className="font-medium text-[var(--foreground)]">Attachments</p>
//               <p className="text-sm text-[var(--secondary)]">Manage documents and files</p>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
//           <p className="mt-4 text-[var(--secondary)]">Loading CFS details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!cfsDetails) {
//     return (
//       <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-[var(--secondary)]">CFS details not found</p>
//           <button
//             onClick={handleGoBack}
//             className="mt-4 bg-[var(--primary)] hover:bg-[var(--light-primary)] text-white px-4 py-2 rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--background)]">
//       {/* Photos Section */}
//       <div className="mb-6 md:mb-8">
//         <Photos images={cfsDetails.images} title={cfsDetails.name} />
//       </div>

//       {/* Description and Location Grid */}
//       <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-2'} gap-6 md:gap-8 mb-6 md:mb-8`}>
//         <div>
//           <Description description={cfsDetails.description} facilities={cfsDetails.facilities} />
//         </div>
//         <div>
//           <Location location={cfsDetails.location} address={cfsDetails.address} />
//         </div>
//       </div>

//       {/* Attachments Section */}
//       <Attachments
//         attachments={cfsDetails.attachments}
//         onUpload={handleFileUpload}
//         isEditable={true}
//         userRole={userRole}
//       />

//       {/* Edit Modal */}
//       {showEditModal && <EditModal />}

//       {/* Bottom Bar */}
//      
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <button
//               onClick={handleGoBack}
//               className="flex items-center bg-[#2E6F40] px-4 py-2 rounded-lg text-white hover:text-[var(--foreground)] transition-colors"
//             >
//               <ArrowLeft className="h-5 w-5 mr-2" />
//               Back
//             </button>

//             {userRole === 'system_administrator' && (
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
//                 <button
//                   onClick={handleEditCFS}
//                   className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//                 >
//                   <Edit className="h-4 w-4 mr-2" />
//                   Edit CFS
//                 </button>
//                 <button
//                   onClick={handleDeleteCFS}
//                   className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//                 >
//                   <Trash2 className="h-4 w-4 mr-2" />
//                   Delete CFS
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//   );
// }
