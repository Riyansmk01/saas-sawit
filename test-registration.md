# 🧪 Test Registration - Sawit Harvest SaaS

## ✅ Masalah yang Diperbaiki

### 1. **Error Message Handling**
- **Masalah**: API mengembalikan `error.error` tapi frontend mencari `error.message`
- **Solusi**: Updated frontend untuk handle kedua format error message

### 2. **Plan Validation**
- **Masalah**: Form mengirim `plan` lowercase ('free', 'pro', 'business') tapi schema mengharapkan uppercase ('FREE', 'PRO', 'BUSINESS')
- **Solusi**: Added `.toUpperCase()` pada data yang dikirim ke API

### 3. **Error Response Format**
- **Masalah**: Error response tidak konsisten
- **Solusi**: Standardized error response format dengan `error` dan `message` fields

### 4. **Validation Error Details**
- **Masalah**: Validation error tidak ditampilkan dengan detail
- **Solusi**: Added detailed error handling untuk Zod validation errors

## 🧪 Test Cases

### Test Case 1: Valid Registration
```
Name: John Doe
Email: john@example.com
Company: Test Company
Phone: 085380702445
Password: password123
Confirm Password: password123
Plan: Pro
Captcha: Verified
Terms: Checked
```

**Expected Result**: ✅ Success → Redirect to login

### Test Case 2: Invalid Email
```
Name: John Doe
Email: invalid-email
Company: Test Company
Phone: 085380702445
Password: password123
Confirm Password: password123
Plan: Pro
Captcha: Verified
Terms: Checked
```

**Expected Result**: ❌ Error → "Email tidak valid"

### Test Case 3: Password Mismatch
```
Name: John Doe
Email: john@example.com
Company: Test Company
Phone: 085380702445
Password: password123
Confirm Password: different123
Plan: Pro
Captcha: Verified
Terms: Checked
```

**Expected Result**: ❌ Error → "Kata sandi tidak cocok!"

### Test Case 4: Short Password
```
Name: John Doe
Email: john@example.com
Company: Test Company
Phone: 085380702445
Password: 123
Confirm Password: 123
Plan: Pro
Captcha: Verified
Terms: Checked
```

**Expected Result**: ❌ Error → "Kata sandi minimal 8 karakter!"

### Test Case 5: Unverified Captcha
```
Name: John Doe
Email: john@example.com
Company: Test Company
Phone: 085380702445
Password: password123
Confirm Password: password123
Plan: Pro
Captcha: Not Verified
Terms: Checked
```

**Expected Result**: ❌ Error → "Silakan verifikasi captcha terlebih dahulu!"

### Test Case 6: Terms Not Agreed
```
Name: John Doe
Email: john@example.com
Company: Test Company
Phone: 085380702445
Password: password123
Confirm Password: password123
Plan: Pro
Captcha: Verified
Terms: Not Checked
```

**Expected Result**: ❌ Error → "Anda harus menyetujui syarat dan ketentuan!"

## 🔧 API Endpoint Details

### POST /api/auth/register

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Test Company",
  "phone": "085380702445",
  "password": "password123",
  "plan": "PRO"
}
```

**Success Response (201):**
```json
{
  "message": "Registrasi berhasil",
  "user": {
    "id": "user_1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Test Company",
    "phone": "085380702445",
    "role": "ADMIN",
    "plan": "PRO",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Data tidak valid",
  "message": "Data yang dimasukkan tidak sesuai format yang diminta",
  "details": [
    {
      "code": "invalid_string",
      "expected": "email",
      "received": "string",
      "path": ["email"],
      "message": "Email tidak valid"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "error": "Terjadi kesalahan server",
  "message": "Terjadi kesalahan saat memproses registrasi. Silakan coba lagi."
}
```

## 🎯 Validation Rules

### Name
- **Required**: Yes
- **Min Length**: 2 characters
- **Type**: String

### Email
- **Required**: Yes
- **Format**: Valid email format
- **Type**: String

### Company
- **Required**: Yes
- **Min Length**: 2 characters
- **Type**: String

### Phone
- **Required**: No
- **Type**: String (optional)

### Password
- **Required**: Yes
- **Min Length**: 8 characters
- **Type**: String

### Plan
- **Required**: Yes
- **Values**: "FREE", "PRO", "BUSINESS"
- **Default**: "FREE"

## 🚀 Testing Instructions

1. **Open Browser**: Go to http://localhost:3003/auth/register
2. **Fill Form**: Use test data from Test Case 1
3. **Verify Captcha**: Complete captcha verification
4. **Check Terms**: Agree to terms and conditions
5. **Submit**: Click "Mendaftar Sekarang" button
6. **Expected**: Success message → Redirect to login page

## 🔍 Debug Information

### Console Logs
- Registration request body
- Validated data
- Mock user created
- Error responses (if any)

### Network Tab
- Check API request/response
- Verify status codes
- Check response headers

## ✅ Success Criteria

- [x] Form validation works correctly
- [x] API endpoint responds properly
- [x] Error messages are user-friendly
- [x] Success flow redirects to login
- [x] All validation rules enforced
- [x] Captcha verification required
- [x] Terms agreement required

## 🎉 Registration is Now Fixed!

The registration process should now work correctly with proper error handling and user feedback.
