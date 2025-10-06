# 🚀 Panduan Deployment Sawit Harvest

Panduan lengkap untuk deploy aplikasi Sawit Harvest ke berbagai platform.

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Git
- Akun hosting (Vercel, Netlify, atau VPS)

## 🌐 Deployment Options

### 1. Vercel (Recommended)

Vercel adalah platform terbaik untuk Next.js applications.

#### Setup Vercel
1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login ke Vercel**
```bash
vercel login
```

3. **Deploy dari local**
```bash
vercel
```

4. **Atau deploy dari GitHub**
   - Push code ke GitHub repository
   - Connect repository di [vercel.com](https://vercel.com)
   - Set environment variables
   - Deploy otomatis

#### Environment Variables di Vercel
```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
```

#### Database Setup untuk Vercel
**Option 1: Vercel Postgres**
- Add Vercel Postgres addon di dashboard
- Otomatis dapat `DATABASE_URL`

**Option 2: External Database**
- Supabase (Free tier available)
- Railway PostgreSQL
- PlanetScale
- Neon

### 2. Netlify

#### Setup Netlify
1. **Build settings**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Deploy**
```bash
npm run build
netlify deploy --prod --dir=.next
```

### 3. Railway

#### Setup Railway
1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login dan deploy**
```bash
railway login
railway init
railway up
```

3. **Setup database**
```bash
railway add postgresql
railway run npx prisma db push
```

### 4. VPS/Server Manual

#### Setup di Ubuntu/Debian
1. **Install dependencies**
```bash
sudo apt update
sudo apt install nodejs npm postgresql nginx
```

2. **Clone repository**
```bash
git clone <your-repo>
cd sawit-harvest-saas
```

3. **Install dependencies**
```bash
npm install
npm run build
```

4. **Setup PostgreSQL**
```bash
sudo -u postgres createdb sawit_harvest
sudo -u postgres createuser sawit_user
sudo -u postgres psql -c "ALTER USER sawit_user PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE sawit_harvest TO sawit_user;"
```

5. **Setup environment**
```bash
cp env.example .env.local
# Edit .env.local dengan database credentials
```

6. **Run migrations**
```bash
npx prisma generate
npx prisma db push
```

7. **Setup PM2 untuk process management**
```bash
npm install -g pm2
pm2 start npm --name "sawit-harvest" -- start
pm2 startup
pm2 save
```

8. **Setup Nginx reverse proxy**
```nginx
# /etc/nginx/sites-available/sawit-harvest
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable site**
```bash
sudo ln -s /etc/nginx/sites-available/sawit-harvest /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔐 SSL Certificate

### Let's Encrypt (Free)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Cloudflare (Recommended)
1. Add domain ke Cloudflare
2. Update nameservers
3. Enable SSL/TLS encryption mode: Full (strict)

## 📊 Monitoring & Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

### Sentry Error Tracking
```bash
npm install @sentry/nextjs
```

### Uptime Monitoring
- UptimeRobot (Free)
- Pingdom
- StatusCake

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🗄️ Database Migration

### Production Database Setup
```bash
# Generate migration
npx prisma migrate dev --name init

# Apply to production
npx prisma migrate deploy

# Reset database (careful!)
npx prisma migrate reset
```

### Backup Database
```bash
# PostgreSQL backup
pg_dump -h localhost -U username -d sawit_harvest > backup.sql

# Restore
psql -h localhost -U username -d sawit_harvest < backup.sql
```

## 🔧 Environment Variables

### Required Variables
```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-nextauth-secret"

# Optional
NODE_ENV="production"
```

### Optional Variables
```env
# Email (untuk notifikasi)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# WhatsApp API
WHATSAPP_API_URL="https://api.whatsapp.com"
WHATSAPP_API_KEY="your-whatsapp-api-key"

# Payment Gateway
MIDTRANS_SERVER_KEY="your-midtrans-server-key"
MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
```

## 📈 Performance Optimization

### Next.js Optimization
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig
```

### Database Optimization
```sql
-- Add indexes untuk performance
CREATE INDEX idx_harvest_date ON harvests(date);
CREATE INDEX idx_harvest_worker_id ON harvests(worker_id);
CREATE INDEX idx_harvest_block_id ON harvests(block_id);
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### 2. Database Connection Issues
```bash
# Test connection
npx prisma db pull
npx prisma generate
```

#### 3. Environment Variables Not Loading
- Check file name: `.env.local` (not `.env`)
- Restart development server
- Check variable names (case sensitive)

#### 4. 500 Internal Server Error
- Check server logs
- Verify database connection
- Check environment variables
- Run `npm run build` locally first

### Logs & Debugging
```bash
# Vercel logs
vercel logs

# PM2 logs
pm2 logs sawit-harvest

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## 📞 Support

Jika mengalami masalah deployment:

1. **Check logs** terlebih dahulu
2. **Verify environment variables**
3. **Test locally** dengan `npm run build`
4. **Contact support** dengan detail error

---

**Happy Deploying! 🚀**