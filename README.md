# 🌴 Sawit Harvest SaaS

Sistem manajemen panen sawit berbasis web yang komprehensif dengan fitur real-time monitoring, laporan otomatis, dan sistem multi-user.

## 🚀 Fitur Utama

### 📊 Dashboard Real-time
- Monitoring panen secara real-time
- Grafik produktivitas harian/mingguan/bulanan
- Statistik kinerja pekerja dan blok lahan
- Notifikasi otomatis

### 👥 Multi-User System
- **Admin**: Akses penuh ke semua fitur
- **Mandor**: Manajemen pekerja dan input data panen
- **Pekerja**: Input data panen harian

### 📈 Input Data Panen
- Form input data panen yang user-friendly
- Validasi data real-time
- Upload foto hasil panen (opsional)
- Tracking kualitas buah (A, B, C)

### 📋 Laporan Otomatis
- Laporan harian, mingguan, dan bulanan
- Export ke Excel dan PDF
- Analisis produktivitas per pekerja/blok
- Grafik tren panen

### 🔔 Smart Notifications
- Reminder panen harian
- Notifikasi via email dan WhatsApp
- Alert cuaca buruk
- Pemberitahuan laporan siap

### 💳 Sistem Pembayaran
- Paket FREE, PRO, dan BUSINESS
- Integrasi payment gateway (Midtrans/Xendit)
- Manajemen subscription otomatis

### 🔒 Keamanan
- Autentikasi JWT
- Enkripsi password dengan bcrypt
- Validasi input dengan Zod
- Rate limiting

## 🛠️ Teknologi

### Frontend
- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Backend
- **Next.js API Routes** - Serverless API
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation

### Tools & Services
- **Vercel** - Deployment platform
- **Midtrans/Xendit** - Payment gateway
- **Twilio** - WhatsApp notifications
- **OpenWeather API** - Weather data

## 📦 Instalasi

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd sawit-harvest-saas
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sawit_harvest_db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Payment Gateway (Midtrans)
MIDTRANS_SERVER_KEY="your-midtrans-server-key"
MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
MIDTRANS_IS_PRODUCTION=false

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# WhatsApp API (Twilio)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_WHATSAPP_NUMBER="+14155238886"

# Weather API
OPENWEATHER_API_KEY="your-openweather-api-key"
```

### 4. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run setup
```

### 5. Run Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📱 Paket Langganan

### 🆓 FREE
- 1 kebun
- 3 pekerja
- 100 data panen/bulan
- Laporan dasar
- Support email

### ⭐ PRO (Rp149.000/bulan)
- Unlimited data
- Export laporan
- Notifikasi WhatsApp
- Support prioritas
- Analisis produktivitas

### 🏢 BUSINESS (Rp499.000/bulan)
- Multi kebun
- API access
- Integrasi mobile app
- White-label
- Support 24/7

## 🗂️ Struktur Project

```
sawit-harvest-saas/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   └── animations/       # Animation components
├── lib/                  # Utility libraries
├── prisma/               # Database schema
├── scripts/              # Setup scripts
└── public/               # Static assets
```

## 🔧 Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:studio       # Open Prisma Studio
npm run setup           # Setup database with sample data
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables
4. Deploy

### Manual Deployment
```bash
npm run build
npm run start
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/change-password` - Change password

### Harvest Data
- `GET /api/harvest` - Get harvest data
- `POST /api/harvest` - Create harvest record

### Payment
- `POST /api/payment/process` - Process payment

### Workers & Blocks
- `GET /api/workers` - Get workers
- `GET /api/blocks` - Get blocks

## 🔒 Keamanan

- Password di-hash dengan bcrypt
- JWT token untuk autentikasi
- Validasi input dengan Zod
- Rate limiting pada API
- HTTPS di production
- CORS configuration

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Support

- Email: support@sawitharvest.com
- WhatsApp: +62-xxx-xxx-xxxx
- Documentation: [docs.sawitharvest.com](https://docs.sawitharvest.com)

## 🎯 Roadmap

### Q1 2024
- [ ] Mobile app (React Native)
- [ ] IoT sensor integration
- [ ] Advanced analytics
- [ ] Multi-language support

### Q2 2024
- [ ] AI-powered insights
- [ ] Weather integration
- [ ] Market price tracking
- [ ] Inventory management

---

**Dibuat dengan ❤️ untuk industri sawit Indonesia**