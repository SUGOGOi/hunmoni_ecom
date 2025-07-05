-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubId" TEXT,
ADD COLUMN     "googoleId" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
