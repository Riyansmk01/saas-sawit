# 🚀 Quick Start Guide - Sawit Harvest SaaS

## 📋 Prerequisites
- Node.js 18+ 
- npm atau yarn
- Git

## ⚡ Quick Start (Otomatis)

### Windows (PowerShell)
```powershell
# Jalankan script otomatis
powershell -ExecutionPolicy Bypass -File start-app.ps1
```

### Windows (Command Prompt)
```cmd
# Jalankan script otomatis
start-app.bat
```

### Manual Steps
```bash
# 1. Install dependencies
npm install

# 2. Build application
npm run build

# 3. Start development server
npm run dev
```

## 🌐 Access URLs

Setelah aplikasi berjalan, buka browser dan akses:

### 🏠 Main Pages
- **Homepage**: http://localhost:3000 (atau port yang tersedia)
- **Animation Demo**: http://localhost:3000/animations

### 🔐 Authentication
- **Register**: http://localhost:3000/auth/register
- **Login**: http://localhost:3000/auth/login

### 📊 Dashboard
- **Main Dashboard**: http://localhost:3000/dashboard
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## 🎨 Features Available

### ✨ Animations
- 🖱️ Custom Cursor - Magnetic effect
- 🔄 Logo Loop - Infinite scrolling text
- 🧲 Magnet Button - Mouse following buttons
- ⚡ Electric Border - Animated borders
- 📜 Scroll Velocity - Scroll-responsive text
- 🔄 Rotating Text - 3D rotating text
- 🧵 Animated Threads - Interactive background

### 🔧 Core Features
- 📊 Real-time Dashboard
- 📝 Harvest Input System
- 👥 Multi-user Management
- 📈 Reports & Analytics
- 🔔 Smart Notifications
- 💳 Payment System
- 🔒 Security Settings
- 📤 Export Functionality

## 🎯 Test Accounts

### Demo User
- **Email**: test@example.com
- **Password**: password123
- **Plan**: PRO

### Admin User
- **Email**: admin@example.com
- **Password**: admin123
- **Plan**: BUSINESS

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database

# Setup
npm run setup        # Initial setup
```

## 📁 Project Structure

```
sawit-harvest-saas/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── admin/             # Admin pages
│   ├── animations/        # Animation demo
│   └── api/               # API routes
├── components/            # React components
│   ├── animations/        # Animation components
│   └── ...               # Other components
├── lib/                   # Utility libraries
├── prisma/               # Database schema
├── public/               # Static assets
└── scripts/              # Setup scripts
```

## 🎨 Animation Components

Semua animasi tersedia di `components/animations/`:

- `CustomCursor.tsx` - Custom cursor dengan magnetic effect
- `LogoLoop.tsx` - Infinite scrolling logo
- `MagnetButton.tsx` - Button yang mengikuti mouse
- `ElectricBorder.tsx` - Border dengan efek listrik
- `ScrollVelocityText.tsx` - Text yang bereaksi terhadap scroll
- `RotatingText.tsx` - Text yang berotasi
- `AnimatedThreads.tsx` - Background threads yang interaktif

## 🔧 Troubleshooting

### Port Already in Use
Jika port 3000 sudah digunakan, Next.js akan otomatis mencari port yang tersedia (3001, 3002, 3003, dll).

### Build Errors
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Database Issues
```bash
# Reset database
npm run db:push
npm run db:seed
```

## 📱 Mobile Support

Aplikasi sudah responsive dan mendukung:
- 📱 Mobile devices
- 📟 Tablets
- 💻 Desktop
- 🖥️ Large screens

## ♿ Accessibility

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ High contrast mode
- ✅ Reduced motion support
- ✅ Focus indicators

## 🚀 Production Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build Docker image
docker build -t sawit-harvest-saas .

# Run container
docker run -p 3000:3000 sawit-harvest-saas
```

## 📞 Support

Jika mengalami masalah:
1. Check console untuk error messages
2. Pastikan semua dependencies terinstall
3. Restart development server
4. Check port availability

## 🎉 Success!

Jika semua berjalan dengan baik, Anda akan melihat:
- ✅ Build successful
- ✅ Server running on port 3000+
- ✅ No console errors
- ✅ All animations working
- ✅ Authentication flow working
- ✅ Dashboard accessible

**Selamat! Aplikasi Sawit Harvest SaaS siap digunakan!** 🎊
