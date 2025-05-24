const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');

    // Create a test user
    const testUser = await prisma.user.create({
      data: {
        id: 'test-user-1',
        xp: 0
      }
    });
    console.log('✅ Successfully created test user:', testUser);

    // Clean up
    await prisma.user.delete({
      where: { id: 'test-user-1' }
    });
    console.log('✅ Successfully cleaned up test data');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 