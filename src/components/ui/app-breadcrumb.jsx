'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from "react";

export default function AppBreadcrumb({ dashboard }) {
  const pathname = usePathname(); // e.g. "/service-requests/123"
  const segments = pathname.split('/').filter(Boolean); // ['service-requests', '123']

  const buildHref = (index) => '/' + segments.slice(0, index + 1).join('/');

  console.log("PathName",pathname)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            {""}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = buildHref(index);
          const isLast = index === segments.length - 1;

          // Optional: convert slug to title case or human-readable label
          const label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-muted-foreground">{label}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

