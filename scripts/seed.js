const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@sawitharvest.com' },
      update: {},
      create: {
        email: 'admin@sawitharvest.com',
        name: 'Admin Sawit Harvest',
        company: 'PT. Sawit Maju Jaya',
        phone: '081234567890',
        password: hashedPassword,
        role: 'ADMIN',
        plan: 'PRO'
      }
    });

    console.log('✅ Admin user created:', adminUser.email);

    // Create sample workers
    const workers = await Promise.all([
      prisma.worker.upsert({
        where: { id: 'worker-1' },
        update: {},
        create: {
          id: 'worker-1',
          name: 'Ahmad Mandor',
          phone: '081234567891',
          address: 'Jl. Sawit No. 1, Medan',
          userId: adminUser.id,
          isActive: true
        }
      }),
      prisma.worker.upsert({
        where: { id: 'worker-2' },
        update: {},
        create: {
          id: 'worker-2',
          name: 'Budi Pekerja',
          phone: '081234567892',
          address: 'Jl. Sawit No. 2, Medan',
          userId: adminUser.id,
          isActive: true
        }
      }),
      prisma.worker.upsert({
        where: { id: 'worker-3' },
        update: {},
        create: {
          id: 'worker-3',
          name: 'Siti Pekerja',
          phone: '081234567893',
          address: 'Jl. Sawit No. 3, Medan',
          userId: adminUser.id,
          isActive: true
        }
      })
    ]);

    console.log('✅ Workers created:', workers.length);

    // Create sample blocks
    const blocks = await Promise.all([
      prisma.block.upsert({
        where: { id: 'block-1' },
        update: {},
        create: {
          id: 'block-1',
          name: 'Blok A',
          area: 10.5,
          location: 'Sektor Utara',
          userId: adminUser.id,
          isActive: true
        }
      }),
      prisma.block.upsert({
        where: { id: 'block-2' },
        update: {},
        create: {
          id: 'block-2',
          name: 'Blok B',
          area: 15.2,
          location: 'Sektor Selatan',
          userId: adminUser.id,
          isActive: true
        }
      }),
      prisma.block.upsert({
        where: { id: 'block-3' },
        update: {},
        create: {
          id: 'block-3',
          name: 'Blok C',
          area: 12.8,
          location: 'Sektor Timur',
          userId: adminUser.id,
          isActive: true
        }
      })
    ]);

    console.log('✅ Blocks created:', blocks.length);

    // Create sample harvest data for the last 30 days
    const harvestData = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Create 2-4 harvest records per day
      const recordsPerDay = Math.floor(Math.random() * 3) + 2;
      
      for (let j = 0; j < recordsPerDay; j++) {
        const worker = workers[Math.floor(Math.random() * workers.length)];
        const block = blocks[Math.floor(Math.random() * blocks.length)];
        const tbsCount = Math.floor(Math.random() * 50) + 20; // 20-70 TBS
        const weight = tbsCount * (Math.random() * 2 + 6); // 6-8 kg per TBS
        const quality = ['A', 'B', 'C'][Math.floor(Math.random() * 3)];
        
        harvestData.push({
          date: date,
          tbsCount: tbsCount,
          weight: weight,
          quality: quality,
          notes: `Panen ${quality === 'A' ? 'kualitas baik' : quality === 'B' ? 'kualitas sedang' : 'kualitas cukup'}`,
          userId: adminUser.id,
          workerId: worker.id,
          blockId: block.id
        });
      }
    }

    // Insert harvest data in batches
    const batchSize = 10;
    for (let i = 0; i < harvestData.length; i += batchSize) {
      const batch = harvestData.slice(i, i + batchSize);
      await prisma.harvest.createMany({
        data: batch
      });
    }

    console.log('✅ Harvest data created:', harvestData.length, 'records');

    // Create subscription for admin user
    await prisma.subscription.upsert({
      where: { userId: adminUser.id },
      update: {},
      create: {
        userId: adminUser.id,
        plan: 'PRO',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        amount: 149000,
        status: 'ACTIVE'
      }
    });

    console.log('✅ Subscription created');

    // Create sample notifications
    const notifications = [
      {
        type: 'HARVEST_REMINDER',
        title: 'Reminder Panen Harian',
        message: 'Jangan lupa untuk mencatat hasil panen hari ini',
        userId: adminUser.id
      },
      {
        type: 'REPORT_READY',
        title: 'Laporan Bulanan Siap',
        message: 'Laporan panen bulan ini sudah siap untuk diunduh',
        userId: adminUser.id
      },
      {
        type: 'SYSTEM_UPDATE',
        title: 'Update Sistem',
        message: 'Sistem telah diperbarui dengan fitur-fitur baru',
        userId: adminUser.id
      }
    ];

    await prisma.notification.createMany({
      data: notifications
    });

    console.log('✅ Notifications created:', notifications.length);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Email: admin@sawitharvest.com');
    console.log('Password: admin123');
    console.log('\n🚀 You can now start the application with: npm run dev');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
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
