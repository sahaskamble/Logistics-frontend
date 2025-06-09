'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCollection } from '@/hooks/useCollection';
import pbclient from '@/lib/db';
import { useSidebar } from '@/contexts/SidebarProvider';
import AppBreadcrumb from '@/components/ui/app-breadcrumb';
import DetailCard from './components/DetailsCard';

export default function JobOrderDetailsPage() {
  const { jobOrderId } = useParams();
  const { setTitle } = useSidebar();

  const { data: jobs, isLoading } = useCollection('cfs_job_order', {
    filter: `id='${jobOrderId}'`,
    expand: 'order,order.merchantVerifiedBy,serviceType,containers,createdBy',
  });

  console.log(jobs)

  const job = jobs?.[0];
  const [images, setImages] = useState([]);

  useEffect(() => {
    setTitle('View Job Order Details');

    if (job?.files?.length > 0) {
      const urls = job.files.map((file) => pbclient.files.getURL(job, file));
      setImages(urls);
    }
  }, [job]);

  if (isLoading) return <div className="p-8 text-[color:var(--secondary)] text-center">Loading job details...</div>;
  if (!job) return <div className="p-8 text-red-600 text-center">Job order not found.</div>;

  return (
      <div className="max-w-container mx-auto px-6 py-10 space-y-8 bg-[color:var(--accent)]  rounded-lg shadow-lg">
      <header className="border-b border-[color:var(--secondary)] pb-4 mb-6 space-y-2">
        <AppBreadcrumb />
        <h1 className="text-3xl font-bold text-[color:var(--foreground)]">Job Order Details</h1>
        <p className="text-sm text-[color:var(--secondary)]">
          Job ID: <span className="font-mono text-[color:var(--primary)]">{job.id}</span>
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailCard label="Status" value={job.status} status color="primary" />
        <DetailCard label="From Date" value={new Date(job.fromDate).toLocaleDateString()} />
        <DetailCard label="To Date" value={new Date(job.toDate).toLocaleDateString()} />
        <DetailCard label="Remarks" value={job.remarks} full />
        <DetailCard label="Service Type" value={job.expand?.serviceType?.title || 'N/A'} />
        <DetailCard label="Created By" value={job.expand?.createdBy?.username || 'N/A'} />
        <DetailCard label="Created At" value={new Date(job.created).toLocaleString()} />
        <DetailCard label="Updated At" value={new Date(job.updated).toLocaleString()} />
      </section>

      {/* Order Info */}
      {job.expand?.order && (
        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)] mb-4">Order Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard label="Order ID" value={job.expand.order.id} />
            <DetailCard label="IGM No" value={job.expand.order.igmNo} />
            <DetailCard label="BL No" value={job.expand.order.blNo} />
            <DetailCard label="Consignee" value={job.expand.order.consigneeName} />
          </div>
        </section>
      )}

      {/* Containers */}
      {Array.isArray(job.expand?.containers) && job.expand.containers.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)] mb-4">Containers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {job.expand.containers.map((container) => (
              <div
                key={container.id}
                className="border border-[color:var(--primary)] p-4 rounded-lg shadow-sm bg-white hover:bg-[color:var(--accent)] transition"
              >
                <p className="font-semibold text-[color:var(--foreground)]">
                  Container No: <span className="text-[color:var(--light-primary)]">{container.containerNo}</span>
                </p>
                <p className="text-sm text-[color:var(--secondary)]">Size: {container.size}</p>
                <p className="text-sm text-[color:var(--secondary)]">Status: {container.status}</p>
                <p className="text-sm text-[color:var(--secondary)]">Cargo Type: {container.cargoType}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)] mb-4">Attached Files</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-md border border-[color:var(--primary)]"
              >
                <img
                  src={url}
                  alt={`Attachment ${index + 1}`}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute bottom-0 w-full bg-[color:var(--background-2)] text-[color:var(--foreground)] text-sm text-center py-1">
                  File {index + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

