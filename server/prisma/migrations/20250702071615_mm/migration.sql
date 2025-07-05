/*
  Warnings:

  - You are about to drop the column `googoleId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "googoleId",
ADD COLUMN     "googleId" TEXT;
