import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'POST') return res.status(405).end();

  const app = await prisma.userApplication.findUnique({ where: { id: String(id) } });

  if (!app || app.status !== 'pending') {
    return res.status(404).json({ error: 'Application not found or already processed' });
  }

  // Create the user with placeholder password
  await prisma.user.create({
    data: {
      fullName: app.fullName,
      email: app.email,
      passwordHash: 'TEMP_PASSWORD', // Replace with hashed value or invite flow later
      role: 'client',
    },
  });

  await prisma.userApplication.update({
    where: { id: String(id) },
    data: { status: 'approved' },
  });

  res.status(200).end();
}
