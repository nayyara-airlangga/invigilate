import { PrismaClient, UserRole } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Participant 0',
        email: 'participant0@email.com',
        passwordHash: (await argon2.hash('password123@')).toString(),
        role: UserRole.PARTICIPANT,
      },
      {
        name: 'Admin 0',
        email: 'admin0@email.com',
        passwordHash: (await argon2.hash('password123@')).toString(),
        role: UserRole.ADMIN,
      },
    ],
  })
  const admin0 = await prisma.user.findUnique({
    where: {
      email: 'admin0@email.com',
    },
    select: {
      id: true,
    },
  })

  await prisma.room.createMany({
    data: [
      {
        adminId: admin0.id,
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
