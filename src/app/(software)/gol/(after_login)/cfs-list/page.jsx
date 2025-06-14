'use client';

import RenderRatings from '@/components/ui/renderRatings';
import { PB_URL } from '@/constants/url';
import { useSidebar } from '@/contexts/SidebarProvider';
import { useCollection } from '@/hooks/useCollection';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function CfsShow() {
  const { setTitle } = useSidebar();
  const { data: providers } = useCollection('service_provider', {
    expand: 'service'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    setTitle('CFS List');
  }, [])

  const filteredProviders = providers?.filter((p) =>
    p.title.toLowerCase().includes(searchQuery) ||
    p.location.toLowerCase().includes(searchQuery)
  );

  return (
    <section>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search CFS by name or location..."
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          className="border border-foreground bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-md px-4 py-3 min-w-[88%]"
        />
        <button
          onClick={openDialog}
          className="bg-primary hover:bg-primary-700 text-white px-4 py-3 rounded-md"
        >
          + Add CFS Service
        </button>
      </div>

      {/* Service Provider Card */}
      {
        filteredProviders?.map((provider) => (
          <ServiceCard
            key={provider.id}
            title={provider.title}
            location={provider.location}
            rating={provider?.rating || 0}
            tags={provider?.tags.tags}
            description={provider?.description}
            images={provider?.files || []}
            id={provider.id}
          />
        ))
      }

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add CFS Service</h2>
              <button onClick={closeDialog} className="text-gray-500 hover:text-black text-xl">&times;</button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Submit logic here");
                closeDialog();
              }}
            >
              <input name="agent" placeholder="Agent Name" className="w-full border px-4 py-2 rounded-md" />
              <input name="receiptNo" placeholder="Receipt No" className="w-full border px-4 py-2 rounded-md" />
              <input name="date" type="date" className="w-full border px-4 py-2 rounded-md" />
              <textarea name="remarks" placeholder="Remarks" className="w-full border px-4 py-2 rounded-md" />

              <select name="status" className="w-full border px-4 py-2 rounded-md">
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <label className="block text-sm text-gray-600">Upload Files</label>
              <input name="files" type="file" multiple className="w-full border px-4 py-2 rounded-md" />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

const ServiceCard = ({ title, location, rating, tags, description, images, id }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row border border-foreground rounded-xl shadow-lg shadow-foreground/40 overflow-hidden bg-accent p-4 md:p-6 mb-6">
      {/* Image Slider */}
      <div className="relative w-full md:w-2/5 h-64 md:h-80 rounded-xl overflow-hidden">
        {images?.length > 0 && (
          <Image
            src={`${PB_URL}/api/files/service_provider/${id}/${images[currentImageIndex]}`}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            width={5000}
            height={5000}
            className="w-full h-full object-cover"
          />
        )}

        {/* Navigation buttons */}
        <div className="absolute inset-0 bg-black/20" />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-white/70 text-xs font-semibold px-2 py-1 rounded-full">
          {currentImageIndex + 1}/{images.length}
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-full md:w-3/5 mt-4 md:mt-0 md:pl-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="w-5 h-5 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center mt-4 text-yellow-500">
            <RenderRatings rating={rating.toFixed(1)} />
            <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
          <p className="mt-4 text-gray-700 text-sm">{description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={`/gol/cfs-list/view/${id}`}
            className="bg-primary hover:bg-green-700 text-white px-4 py-3 text-sm rounded-md inline-flex justify-center items-center"
          >
            View Details
          </Link>
          <Link
            href={`/gol/cfs-list/edit/${id}`}
            className="bg-background text-foreground px-4 py-2 border-2 border-foreground text-sm rounded-md inline-flex justify-center items-center"
          >
            Edit Details
          </Link>
          <Link
            href={`/gol/cfs-list//${id}`}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-3 text-sm rounded-md inline-flex justify-center items-center"
          >
            Blacklist CFS
          </Link>
        </div>
      </div>
    </div>
  );
};
