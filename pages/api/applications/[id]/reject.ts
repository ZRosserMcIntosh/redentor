import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'POST') return res.status(405).end();

  await prisma.userApplication.update({
    where: { id: String(id) },
    data: { status: 'rejected' },
  });

  res.status(200).end();
}
