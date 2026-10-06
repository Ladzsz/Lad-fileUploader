-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedToken" TEXT,
ADD COLUMN     "tokenExpires" TIMESTAMP(3);
