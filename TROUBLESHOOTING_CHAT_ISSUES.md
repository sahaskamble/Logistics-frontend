# 🔧 Troubleshooting Chat System Issues

## ❌ **Error: "Failed to create chat session invalid or missing context"**

This error typically occurs due to authentication or PocketBase configuration issues. Follow these steps to diagnose and fix the problem:

### **Step 1: Check Authentication State**

1. **Open the support page** (`/support`) in development mode
2. **Look for the Debug Panel** in the top-left corner (only visible in development)
3. **Check the authentication information**:
   - User: Should show ✅ Present
   - User ID: Should have a valid ID
   - PB Auth Valid: Should show ✅ Yes
   - PB Token: Should show ✅ Present

### **Step 2: Test PocketBase Connection**

1. **Click "Test PocketBase Connection"** in the debug panel
2. **Check the console** for detailed error messages
3. **Common issues**:
   - Network connectivity problems
   - Invalid PocketBase URL
   - Server not running

### **Step 3: Test Chat Session Creation**

1. **Click "Test Chat Session Creation"** in the debug panel
2. **Check the console** for detailed error information
3. **Common issues**:
   - Permission denied (migration not applied)
   - Invalid user data
   - Collection access issues

### **Step 4: Apply PocketBase Migration**

If you see permission errors, the migration likely hasn't been applied:

1. **Navigate to your PocketBase admin panel**
2. **Go to Settings > Import/Export**
3. **Apply the migration file**: `Backend/pb_migrations/1749900000_update_chat_collections_rules.js`

Or run the migration via PocketBase CLI:
```bash
# Navigate to your PocketBase directory
cd Backend

# Apply migrations
./pocketbase migrate up
```

### **Step 5: Verify Collection Rules**

Check that the following collections have proper rules:

#### **chat_session Collection**
- **Create Rule**: `@request.auth.id != ""`
- **List Rule**: `user.id = @request.auth.id || agent.id = @request.auth.id`
- **View Rule**: `user.id = @request.auth.id || agent.id = @request.auth.id`

#### **messages Collection**
- **Create Rule**: `@request.auth.id != "" && (chat.user.id = @request.auth.id || chat.agent.id = @request.auth.id)`
- **List Rule**: `chat.user.id = @request.auth.id || chat.agent.id = @request.auth.id`

### **Step 6: Check User Session**

If authentication looks correct but still fails:

1. **Log out and log back in**
2. **Clear browser storage**:
   ```javascript
   // In browser console
   localStorage.clear();
   sessionStorage.clear();
   ```
3. **Refresh the page**

### **Step 7: Verify PocketBase URL**

Check `src/constants/url.js`:
```javascript
export const PB_URL = 'https://api.linkmylogistics.com';
```

Make sure this URL is:
- ✅ Accessible from your browser
- ✅ Running PocketBase
- ✅ Has the correct collections

## 🔍 **Common Error Messages and Solutions**

### **"User must be authenticated to create chat session"**
- **Cause**: User is not logged in or session expired
- **Solution**: Log in again or refresh authentication

### **"User ID mismatch - authentication required"**
- **Cause**: Auth store user ID doesn't match the provided user ID
- **Solution**: Log out and log back in

### **"Cannot access chat_session collection"**
- **Cause**: Collection doesn't exist or migration not applied
- **Solution**: Apply the PocketBase migration

### **"Permission denied"**
- **Cause**: Collection rules not set up correctly
- **Solution**: Apply migration or manually set collection rules

### **"Invalid or missing context"**
- **Cause**: PocketBase client not properly initialized
- **Solution**: Check PocketBase URL and connection

## 🛠️ **Manual Debugging Steps**

### **1. Check PocketBase Admin Panel**

1. Go to `https://api.linkmylogistics.com/_/`
2. Log in to admin panel
3. Check Collections > chat_session
4. Verify the collection exists and has proper fields
5. Check the Rules tab for proper permissions

### **2. Test API Directly**

```javascript
// In browser console on your app
import pbclient from '@/lib/db';

// Check auth
console.log('Auth valid:', pbclient.authStore.isValid);
console.log('User:', pbclient.authStore.record);

// Test collection access
pbclient.collection('chat_session').getList(1, 1)
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

### **3. Check Network Tab**

1. Open browser DevTools > Network tab
2. Try to create a chat session
3. Look for failed requests to PocketBase
4. Check request headers and response details

## 📋 **Checklist for Setup**

- [ ] PocketBase server is running
- [ ] Migration has been applied
- [ ] Collections exist: `chat_session`, `messages`, `faqs`
- [ ] Collection rules are set correctly
- [ ] User is authenticated
- [ ] PocketBase URL is correct
- [ ] Support page layout includes `ProtectedRoutes`
- [ ] User has appropriate role (Customer, Merchant, GOL staff)

## 🔄 **Quick Fix Commands**

### **Reset Authentication**
```javascript
// In browser console
localStorage.removeItem('pocketbase_auth');
localStorage.removeItem('record');
localStorage.removeItem('role');
window.location.reload();
```

### **Test Chat Creation**
```javascript
// In browser console (after importing)
import { testChatSessionCreation } from '@/utils/testChatCreation';
import { useAuth } from '@/contexts/AuthContext';

// Get current user and test
const { user } = useAuth();
testChatSessionCreation(user);
```

## 📞 **Getting Help**

If you're still experiencing issues:

1. **Check the browser console** for detailed error messages
2. **Use the debug panel** on the support page
3. **Verify all checklist items** above
4. **Test with a fresh user session**
5. **Check PocketBase server logs** for backend errors

## 🎯 **Prevention**

To avoid these issues in the future:

1. **Always apply migrations** when updating the chat system
2. **Test authentication** before implementing new features
3. **Use the debug components** during development
4. **Keep PocketBase URL configuration** in environment variables
5. **Implement proper error handling** in production

Remember: The debug panel and test functions are only available in development mode for security reasons.
