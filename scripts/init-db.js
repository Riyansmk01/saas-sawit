const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Initializing database...')
  
  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // You can add seed data here if needed
    console.log('📊 Database is ready to use!')
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.log('\n💡 Please check your DATABASE_URL in .env.local')
    console.log('   You can use a free PostgreSQL database from:')
    console.log('   - Railway: https://railway.app')
    console.log('   - Supabase: https://supabase.com')
    console.log('   - Neon: https://neon.tech')
  } finally {
    await prisma.$disconnect()
  }
}

main()
