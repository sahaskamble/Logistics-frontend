'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCollection } from '@/hooks/useCollection';
import pbclient from '@/lib/db';
import { useSidebar } from '@/contexts/SidebarProvider';

export default function PriorityDetailsPage() {
  const { priorityId } = useParams();
  const { setTitle } = useSidebar();
  const [images, setImages] = useState([]);

  const { data: details, isLoading } = useCollection('cfs_service_details', {
    expand: 'order,jobOrder,type,container',
    filter: `id="${priorityId}"`,
  });

  const detail = details?.[0];

  useEffect(() => {
    setTitle('Priority Details');

    if (detail?.files?.length > 0) {
      const urls = detail.files.map((file) => pbclient.files.getURL(detail, file));
      setImages(urls);
    } else {
      setImages([]);
    }
  }, [detail]);

  if (isLoading)
    return <div className="p-6 text-center text-[color:var(--secondary)]">Loading...</div>;

  if (!detail)
    return <div className="p-6 text-center text-red-600">Priority record not found.</div>;

  return (
    <div className="max-w-container mx-auto px-6 py-10 space-y-8 bg-[color:var(--accent)] rounded-lg shadow-lg">
      <header className="border-b border-[color:var(--secondary)] pb-4 mb-6">
        <h1 className="text-3xl font-bold text-[color:var(--foreground)]">Priority Record</h1>
        <p className="text-sm text-[color:var(--secondary)]">
          ID: <span className="font-mono text-[color:var(--primary)]">{detail.id}</span>
        </p>
      </header>

      {/* Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailCard label="Agent" value={detail.agent} />
        <DetailCard label="Status" value={detail.status} status color="primary" />
        <DetailCard label="Date" value={new Date(detail.date).toLocaleDateString()} />
        <DetailCard label="Receipt No" value={detail.receiptNo} />
        <DetailCard label="Remarks" value={detail.remarks} full />
      </section>

      {/* Type */}
      {detail.expand?.type && (
        <section>
          <h2 className="text-xl font-semibold text-[color:var(--foreground)] mb-2">Service Type</h2>
          <p className="text-[color:var(--primary)]">{detail.expand.type.title}</p>
        </section>
      )}

      {/* Container Info */}
      {detail.expand?.container && (
        <section>
          <h2 className="text-xl font-semibold text-[color:var(--foreground)] mb-2">Container Info</h2>
          <div className="bg-[color:var(--background-2)] p-5 rounded-md border border-[color:var(--primary)] space-y-2">
            <DetailCard label="Container No" value={detail.expand.container.containerNo} />
            <DetailCard label="Size" value={detail.expand.container.size} />
            <DetailCard label="Cargo Type" value={detail.expand.container.cargoType} />
            <DetailCard label="Status" value={detail.expand.container.status} />
          </div>
        </section>
      )}

      {/* Order Info */}
      {detail.expand?.order && (
        <section>
          <h2 className="text-xl font-semibold text-[color:var(--foreground)] mb-2">Order Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <DetailCard label="IGM No" value={detail.expand.order.igmNo} />
            <DetailCard label="BL No" value={detail.expand.order.blNo} />
            <DetailCard label="BOE No" value={detail.expand.order.boeNo} />
            <DetailCard label="Consignee Name" value={detail.expand.order.consigneeName} />
          </div>
        </section>
      )}

      {/* Job Order Info */}
      {detail.expand?.jobOrder && (
        <section>
          <h2 className="text-xl font-semibold text-[color:var(--foreground)] mb-2">Job Order Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <DetailCard label="Job Order ID" value={detail.expand.jobOrder.id} />
            <DetailCard label="Remarks" value={detail.expand.jobOrder.remarks} />
            <DetailCard label="From Date" value={new Date(detail.expand.jobOrder.fromDate).toLocaleDateString()} />
            <DetailCard label="To Date" value={new Date(detail.expand.jobOrder.toDate).toLocaleDateString()} />
          </div>
        </section>
      )}

      {/* Images */}
      {images.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)] mb-4">Attached Files</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-md border border-[color:var(--primary)]">
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

// DetailCard Reusable Component
function DetailCard({ label, value, full = false, color = 'foreground', status = false }) {
  if (!value) return null;
  const colorMap = {
    foreground: 'text-[color:var(--foreground)]',
    primary: 'text-[color:var(--primary)]',
    secondary: 'text-[color:var(--secondary)]',
  };
  return (
    <div className={`space-y-1 ${full ? 'col-span-1 md:col-span-2' : ''}`}>
      <p className="text-sm text-[color:var(--secondary)]">{label}</p>
      <p className={`text-base font-medium ${colorMap[color]}`}>
        <span className={`${status ? 'bg-[var(--primary)] text-accent px-2 py-1 rounded-lg' : ''}`}>{value}</span>
      </p>
    </div>
  );
}
