# 🔧 Support System Integration Examples

This document provides examples of how to integrate the support system components into your existing application.

## 📱 Navigation Integration

### **Adding Support Button to Main Navigation**

```jsx
// In your main navigation component (e.g., Header.jsx, Navbar.jsx)
import SupportButton from '@/components/support/SupportButton';

export default function MainNavigation() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Other navigation items */}
          <div className="flex items-center space-x-4">
            <a href="/dashboard">Dashboard</a>
            <a href="/orders">Orders</a>
            
            {/* Add Support Button */}
            <SupportButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
```

### **Adding Support to Sidebar Navigation**

```jsx
// In your sidebar component
import { useAuth } from '@/contexts/AuthContext';
import { ROLES } from '@/constants/roles';
import { MessageCircle, Users } from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  const isAgent = user && [ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT].includes(user.role);

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <nav className="mt-8">
        {/* Other navigation items */}
        
        {/* Support Navigation */}
        {isAgent ? (
          <a 
            href="/gol/support" 
            className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Users className="w-5 h-5 mr-3" />
            Support Dashboard
          </a>
        ) : (
          <a 
            href="/support" 
            className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Get Support
          </a>
        )}
      </nav>
    </aside>
  );
}
```

## 🎈 Floating Widget Integration

### **Adding Support Widget to Main Layout**

```jsx
// In your main layout component (e.g., RootLayout.jsx, Layout.jsx)
import SupportWidget from '@/components/support/SupportWidget';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* Your existing layout */}
          <Header />
          <main>{children}</main>
          <Footer />
          
          {/* Add Support Widget */}
          <SupportWidget />
        </div>
      </body>
    </html>
  );
}
```

### **Conditional Widget Display**

```jsx
// Show widget only on specific pages
import { useRouter } from 'next/navigation';
import SupportWidget from '@/components/support/SupportWidget';

export default function ConditionalSupportWidget() {
  const router = useRouter();
  
  // Don't show on admin pages or support pages
  const shouldShowWidget = !router.pathname.startsWith('/admin') && 
                          !router.pathname.startsWith('/support');

  return shouldShowWidget ? <SupportWidget /> : null;
}
```

## 🔗 Route Integration

### **Adding Support Routes to Next.js App Router**

Your file structure should look like this:

```
src/app/(software)/
├── support/
│   ├── page.jsx                    # Main support center
│   └── chat/
│       └── [sessionId]/
│           └── page.jsx            # Individual chat session
└── gol/(after_login)/
    └── support/
        └── page.jsx                # Agent dashboard
```

### **Adding Support Links to Dashboard**

```jsx
// In customer dashboard
import { MessageCircle, Clock, CheckCircle } from 'lucide-react';

export default function CustomerDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Other dashboard cards */}
      
      {/* Support Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <MessageCircle className="w-8 h-8 text-blue-600" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
            <p className="text-gray-600">Chat with our support team</p>
          </div>
        </div>
        <div className="mt-4">
          <a 
            href="/support" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get Support
          </a>
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Role-Based Access Examples

### **Protecting Support Routes**

```jsx
// middleware.js or in your route protection
import { ROLES } from '@/constants/roles';

export function checkSupportAccess(user, path) {
  // Agent dashboard access
  if (path.startsWith('/gol/support')) {
    return [ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT].includes(user.role);
  }
  
  // Customer support access
  if (path.startsWith('/support')) {
    return [ROLES.CUSTOMER, ROLES.MERCHANT].includes(user.role);
  }
  
  return false;
}
```

### **Dynamic Navigation Based on Role**

```jsx
import { useAuth } from '@/contexts/AuthContext';
import { ROLES } from '@/constants/roles';

export default function DynamicNavigation() {
  const { user } = useAuth();

  const getSupportLink = () => {
    if (!user) return null;
    
    if ([ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT].includes(user.role)) {
      return {
        href: '/gol/support',
        label: 'Support Dashboard',
        icon: 'Users'
      };
    }
    
    if ([ROLES.CUSTOMER, ROLES.MERCHANT].includes(user.role)) {
      return {
        href: '/support',
        label: 'Get Support',
        icon: 'MessageCircle'
      };
    }
    
    return null;
  };

  const supportLink = getSupportLink();

  return (
    <nav>
      {/* Other navigation items */}
      {supportLink && (
        <a href={supportLink.href} className="nav-link">
          {supportLink.label}
        </a>
      )}
    </nav>
  );
}
```

## 📧 Email Notifications Integration

### **Notify Agents of New Chats**

```jsx
// In your chat service or when creating new sessions
import { sendEmail } from '@/services/emailService';

export async function notifyAgentsOfNewChat(session) {
  const agents = await getAvailableAgents();
  
  for (const agent of agents) {
    await sendEmail({
      to: agent.email,
      subject: 'New Support Chat Session',
      template: 'new-chat-notification',
      data: {
        sessionId: session.id,
        customerName: session.expand?.user?.username,
        chatUrl: `${process.env.NEXT_PUBLIC_APP_URL}/gol/support`
      }
    });
  }
}
```

## 🔔 Real-time Notifications

### **Browser Notifications for Agents**

```jsx
// In your agent dashboard
import { useEffect } from 'react';
import { useChat } from '@/hooks/useChat';

export default function AgentNotifications() {
  const { subscribeToNewSessions } = useChat();

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Subscribe to new chat sessions
    const unsubscribe = subscribeToNewSessions((session) => {
      if (Notification.permission === 'granted') {
        new Notification('New Support Chat', {
          body: `New chat from ${session.expand?.user?.username}`,
          icon: '/icons/support.png',
          tag: `chat-${session.id}`
        });
      }
    });

    return unsubscribe;
  }, []);

  return null; // This is a notification-only component
}
```

## 🎨 Styling Integration

### **Matching Your Design System**

```jsx
// Create a theme-aware support button
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemedSupportButton() {
  const { theme } = useTheme();
  
  const buttonClasses = theme === 'dark' 
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-blue-500 hover:bg-blue-600 text-white';

  return (
    <button className={`${buttonClasses} px-4 py-2 rounded-lg transition-colors`}>
      Get Support
    </button>
  );
}
```

### **Custom CSS Variables**

```css
/* In your global CSS */
:root {
  --support-primary: #2563eb;
  --support-primary-hover: #1d4ed8;
  --support-success: #10b981;
  --support-warning: #f59e0b;
  --support-error: #ef4444;
}

.support-widget {
  background-color: var(--support-primary);
}

.support-widget:hover {
  background-color: var(--support-primary-hover);
}
```

## 📱 Mobile Responsiveness

### **Mobile-First Support Widget**

```jsx
// Responsive support widget
export default function ResponsiveSupportWidget() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Mobile: Smaller button */}
      <button className="md:hidden bg-blue-600 text-white rounded-full p-3 shadow-lg">
        <MessageCircle className="w-5 h-5" />
      </button>
      
      {/* Desktop: Larger button with text */}
      <button className="hidden md:flex items-center bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg">
        <MessageCircle className="w-5 h-5 mr-2" />
        Need Help?
      </button>
    </div>
  );
}
```

These examples should help you integrate the support system seamlessly into your existing application architecture!
