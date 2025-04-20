import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create some base permissions
  const viewClients = await prisma.permission.upsert({
    where: { name: 'view_clients' },
    update: {},
    create: { name: 'view_clients', description: 'Can view client data' }
  });

  const editClients = await prisma.permission.upsert({
    where: { name: 'edit_clients' },
    update: {},
    create: { name: 'edit_clients', description: 'Can edit client profiles' }
  });

  // Create a partner user
  const partner = await prisma.user.upsert({
    where: { email: 'partner@boundless.io' },
    update: {},
    create: {
      fullName: 'Partner Admin',
      email: 'partner@boundless.io',
      passwordHash: 'hashed_pw_here',
      role: 'partner',
    }
  });

  // Create an employee with permissions
  const employee = await prisma.user.create({
    data: {
      fullName: 'Employee User',
      email: 'employee@boundless.io',
      passwordHash: 'hashed_pw_here',
      role: 'employee',
      permissions: {
        create: [
          { permission: { connect: { id: viewClients.id } } },
          { permission: { connect: { id: editClients.id } } }
        ]
      }
    }
  });

  console.log('Seed complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
