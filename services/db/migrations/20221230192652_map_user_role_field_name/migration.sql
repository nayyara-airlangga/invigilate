/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('PARTICIPANT', 'ADMIN');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "user_role" NOT NULL DEFAULT 'PARTICIPANT';

-- DropEnum
DROP TYPE "UserRole";
