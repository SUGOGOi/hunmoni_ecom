/*
  Warnings:

  - You are about to drop the column `isActive` on the `Brand` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BrandStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "isActive",
ADD COLUMN     "status" "BrandStatus" NOT NULL DEFAULT 'ACTIVE';
