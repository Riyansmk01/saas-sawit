# 🔐 Login Test Data - Sawit Harvest SaaS

## 📋 Test Credentials

### Valid Test Account
```
Email: perdhanariyan@gmail.com
Password: password123
Plan: PRO
Features: All PRO features available
```

### Alternative Test Account
```
Email: test@example.com
Password: password123
Plan: PRO
Features: All PRO features available
```

## 🧪 Test Scenarios

### Scenario 1: Successful Login
1. **Input**: Valid email and password
2. **Expected**: Redirect to dashboard
3. **Result**: ✅ Should work

### Scenario 2: Invalid Email Format
1. **Input**: `invalid-email`
2. **Expected**: Error message
3. **Result**: ❌ "Email tidak valid"

### Scenario 3: Empty Password
1. **Input**: Email + empty password
2. **Expected**: Error message
3. **Result**: ❌ "Password harus diisi"

### Scenario 4: Wrong Password
1. **Input**: Valid email + wrong password
2. **Expected**: Error message
3. **Result**: ❌ "Email atau password salah"

## 🔍 Debug Steps

### Step 1: Open Developer Tools
1. Press F12 or right-click → Inspect
2. Go to Console tab
3. Go to Network tab (optional)

### Step 2: Test Login
1. Go to http://localhost:3003/auth/login
2. Enter test credentials
3. Click "Masuk" button
4. Watch console for debug messages

### Step 3: Check Console Output
```
Expected Console Output:
Login request body: {email: "perdhanariyan@gmail.com", password: "password123"}
Validated login data: {email: "perdhanariyan@gmail.com", password: "password123"}
Mock login successful for: perdhanariyan@gmail.com
Login successful, data: {message: "Login berhasil", token: "...", user: {...}}
Token and user saved to localStorage
Redirecting to dashboard...
AuthGuard: Checking authentication...
AuthGuard: Token exists: true
AuthGuard: User exists: true
AuthGuard: User data: {id: "user_123456789", name: "Test User", ...}
AuthGuard: Authentication successful
```

### Step 4: Verify Dashboard Access
1. Should redirect to http://localhost:3003/dashboard
2. Should see dashboard with user data
3. Should see PRO plan features

## 🎯 Expected Dashboard Features

### PRO Plan Features:
- ✅ Real-time Dashboard
- ✅ Harvest Input
- ✅ Reports & Analytics
- ✅ User Management
- ✅ Notifications
- ✅ Productivity Analysis
- ✅ Payment System
- ✅ Security Settings
- ✅ Export Functionality

### FREE Plan Features (if downgraded):
- ✅ Basic Dashboard
- ✅ Limited Harvest Input
- ✅ Basic Reports
- ❌ Advanced Analytics
- ❌ Export Functionality
- ❌ Multiple Users

## 🚨 Troubleshooting

### If Login Doesn't Work:

#### 1. Check Network Tab
- Look for failed requests to `/api/auth/login`
- Check response status (should be 200)
- Check response body for error messages

#### 2. Check Console Errors
- Look for JavaScript errors
- Look for API error responses
- Check if localStorage is working

#### 3. Check localStorage
```javascript
// In browser console:
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
```

#### 4. Clear localStorage (if needed)
```javascript
// In browser console:
localStorage.clear();
// Then try login again
```

### Common Issues:

#### Issue 1: "Email atau password salah"
- **Cause**: API returns error response
- **Solution**: Check if email/password is correct
- **Debug**: Check Network tab for API response

#### Issue 2: Login stays on login page
- **Cause**: Redirect not working
- **Solution**: Check console for redirect messages
- **Debug**: Check if router.push is called

#### Issue 3: Dashboard shows loading forever
- **Cause**: AuthGuard not working
- **Solution**: Check AuthGuard console logs
- **Debug**: Check if token/user exists in localStorage

## 🎉 Success Indicators

### Login Success:
- ✅ Console shows "Login successful, data:"
- ✅ Console shows "Token and user saved to localStorage"
- ✅ Console shows "Redirecting to dashboard..."
- ✅ Page redirects to /dashboard
- ✅ Dashboard loads with user data

### Dashboard Success:
- ✅ AuthGuard shows "Authentication successful"
- ✅ Dashboard shows user information
- ✅ Plan-specific features are visible
- ✅ No error messages in console

## 📱 Test on Different Browsers

### Chrome
- ✅ Should work perfectly
- ✅ localStorage support
- ✅ Console debugging available

### Firefox
- ✅ Should work perfectly
- ✅ localStorage support
- ✅ Console debugging available

### Safari
- ✅ Should work perfectly
- ✅ localStorage support
- ✅ Console debugging available

### Edge
- ✅ Should work perfectly
- ✅ localStorage support
- ✅ Console debugging available

## 🔧 Manual Testing Commands

### Test localStorage:
```javascript
// Check if data exists
localStorage.getItem('token');
localStorage.getItem('user');

// Clear data
localStorage.clear();

// Set test data manually
localStorage.setItem('token', 'test-token');
localStorage.setItem('user', JSON.stringify({id: 'test', name: 'Test User'}));
```

### Test API directly:
```javascript
// Test login API
fetch('/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'perdhanariyan@gmail.com',
    password: 'password123'
  })
}).then(r => r.json()).then(console.log);
```

## 🎊 Login is Ready for Testing!

Use the test credentials above to verify that login works correctly and redirects to dashboard with proper plan features.
