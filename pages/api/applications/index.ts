import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const apps = await prisma.userApplication.findMany({
    where: { status: 'pending' },
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json(apps);
}
