// this creates only one instance of PrismaClient in the whole app
import { PrismaClient } from '@/generated/prisma/client'

console.log('Prisma Client Initializing...')

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma