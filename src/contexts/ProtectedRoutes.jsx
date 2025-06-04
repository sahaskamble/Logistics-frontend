'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoutes({ children, allowedRoles = [] }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      // Redirect to login page based on the current path
      if (pathname.includes('/customer/')) {
        router.push('/customer/login');
      } else if (pathname.includes('/client/')) {
        router.push('/client/login');
      } else if (pathname.includes('/gol/')) {
        router.push('/gol/login');
      } else {
        router.push('/');
      }
      return;
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      switch (user.role) {
        case 'Customer':
          router.push('/customer/dashboard');
          break;
        case 'Client':
          router.push('/client/dashboard');
          break;
        case 'Gol':
          router.push('/gol/dashboard');
          break;
        default:
          router.push('/');
      }
      return;
    }

    setAuthorized(true);
  }, [user, router, pathname, allowedRoles]);

  // Show loading or nothing while checking authorization
  if (!authorized) {
    return null;
  }

  return children;
}
