# Dashboard Migration to Dynamic Data

## Overview
This document outlines the changes made to migrate the client dashboard from static data to dynamic data fetched from PocketBase.

## Changes Made

### 1. New Files Created

#### `src/hooks/useDashboardData.js`
- Custom React hook for fetching dashboard data from PocketBase
- Handles different user roles (Customer, Merchant, GOL Staff, Admin)
- Implements proper error handling and loading states
- Fetches data from multiple collections: `cfs_orders`, `cfs_job_order`, `cfs_service_requests`, `cfs_pricing_request`, `containers`, `service_provider`

#### `src/utils/dashboardHelpers.js`
- Utility functions for processing and transforming PocketBase data
- Functions include:
  - `calculateOrderStats()` - Calculate order statistics
  - `generateMonthlyTrends()` - Generate monthly trend data for charts
  - `generateServiceDistribution()` - Create service usage distribution
  - `getRecentRequests()` - Get recent requests for display
  - `transformOrderData()` - Transform PocketBase data to match expected format
  - `getStatusColor()` and `getStatusBadgeColor()` - Status styling helpers
  - `formatDisplayDate()` - Date formatting utility

### 2. Modified Files

#### `src/app/(software)/client/(after_login)/dashboard/page.jsx`
- **Before**: Used static data from `src/constants/orders.js`
- **After**: Uses `useDashboardData` hook to fetch real data
- Added loading and error states
- Improved button styling and functionality
- Enhanced empty state handling

#### `src/app/(software)/client/(after_login)/dashboard/components/Stats.jsx`
- **Before**: Used hardcoded static data for charts and statistics
- **After**: Uses dynamic data from PocketBase
- Calculates real statistics from order data
- Generates dynamic chart data based on actual orders and service requests
- Improved error handling for empty data states

#### `src/app/(software)/client/(after_login)/dashboard/components/columns.js`
- **Before**: Basic column definitions with limited data display
- **After**: Enhanced columns with:
  - Better data formatting
  - CFS information display
  - Improved status badges with borders
  - Last updated information
  - Proper null/undefined handling

#### `src/app/(software)/client/(after_login)/dashboard/components/MobileTable.jsx`
- **Before**: Used static orders data
- **After**: Accepts dynamic orders as props
- Enhanced search functionality across multiple fields
- Improved mobile card layout with better information display
- Added empty state handling

### 3. Dependencies Added
- `date-fns` - For date formatting and manipulation

## Data Flow

### User Role-Based Data Fetching

1. **Customer Role**:
   - Fetches only their own orders (`customer = user.id`)
   - Their service requests
   - Their pricing requests

2. **Merchant Role**:
   - Fetches orders they created (`createdBy = user.id`)
   - Job orders they created
   - All service requests (for processing)

3. **GOL Staff/Admin Roles**:
   - Fetches all orders
   - All job orders
   - All service requests
   - All pricing requests

### Data Transformation
- PocketBase data is transformed to match the existing component expectations
- Handles missing/null data gracefully
- Formats dates consistently
- Expands related data (CFS, customers, containers, etc.)

## Key Features

### Real-time Data
- Dashboard now displays actual data from PocketBase
- Statistics are calculated from real order data
- Charts show actual trends and distributions

### Role-based Access
- Different users see different data based on their role
- Proper filtering ensures data security

### Enhanced UI
- Loading states during data fetching
- Error handling with user-friendly messages
- Empty states when no data is available
- Improved mobile responsiveness

### Performance Optimizations
- Efficient data fetching with proper error handling
- Memoized calculations to prevent unnecessary re-renders
- Optimized PocketBase queries with proper expansions

## Usage

The dashboard will automatically fetch and display data based on the logged-in user's role. No additional configuration is required.

### For Development
1. Ensure PocketBase is running and accessible
2. Verify the `PB_URL` in `src/constants/url.js` is correct
3. Make sure the user is properly authenticated

### Error Handling
- Network errors are caught and displayed to the user
- Individual collection fetch failures don't break the entire dashboard
- Graceful degradation when data is unavailable

## Future Enhancements

1. **Real-time Updates**: Implement PocketBase real-time subscriptions
2. **Caching**: Add data caching to improve performance
3. **Pagination**: Implement pagination for large datasets
4. **Filters**: Add advanced filtering options
5. **Export**: Add data export functionality

## Testing

To test the implementation:
1. Log in with different user roles
2. Verify appropriate data is displayed for each role
3. Check loading states and error handling
4. Test mobile responsiveness
5. Verify chart data updates with real data changes
