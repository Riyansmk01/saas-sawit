const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 Setting up Sawit Harvest SaaS Application...');
  console.log('================================================');

  try {
    // Check if .env file exists
    if (!fs.existsSync('.env')) {
      console.log('📝 Creating .env file...');
      const envContent = `# Database
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="sawit-harvest-super-secret-jwt-key-2024"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sawit-harvest-nextauth-secret-2024"

# Payment Gateway (Midtrans)
MIDTRANS_SERVER_KEY="SB-Mid-server-your-server-key"
MIDTRANS_CLIENT_KEY="SB-Mid-client-your-client-key"
MIDTRANS_IS_PRODUCTION="false"

# Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# WhatsApp API (for notifications)
WHATSAPP_API_URL="https://api.whatsapp.com/send"
WHATSAPP_API_TOKEN="your-whatsapp-api-token"

# App Configuration
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"`;

      fs.writeFileSync('.env', envContent);
      console.log('✅ .env file created');
    } else {
      console.log('✅ .env file already exists');
    }

    // Install dependencies
    console.log('\n📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');

    // Generate Prisma client
    console.log('\n🔧 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated');

    // Push database schema
    console.log('\n🗄️ Setting up database...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Database schema pushed');

    // Seed database with sample data
    console.log('\n🌱 Seeding database with sample data...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    console.log('✅ Database seeded');

    console.log('\n🎉 Setup completed successfully!');
    console.log('================================================');
    console.log('📋 Login Credentials:');
    console.log('Email: admin@sawitharvest.com');
    console.log('Password: admin123');
    console.log('\n🚀 Start the application with:');
    console.log('npm run dev');
    console.log('\n🌐 Then open: http://localhost:3000');
    console.log('================================================');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });