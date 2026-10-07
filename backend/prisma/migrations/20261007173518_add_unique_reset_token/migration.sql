/*
  Warnings:

  - A unique constraint covering the columns `[hashedToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_hashedToken_key" ON "User"("hashedToken");
