/*
  Warnings:

  - You are about to drop the column `thumbnaiUrl` on the `Content` table. All the data in the column will be lost.
  - You are about to alter the column `videoTitle` on the `Content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `comment` on the `Content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `creatorName` on the `Content` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `registerAt` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `thumbnailUrl` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "thumbnaiUrl",
ADD COLUMN     "thumbnailUrl" VARCHAR NOT NULL,
ALTER COLUMN "videoTitle" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "videoUrl" SET DATA TYPE VARCHAR,
ALTER COLUMN "comment" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "creatorName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "creatorUrl" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "registerAt",
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "BlackListToken" (
    "token" VARCHAR NOT NULL,
    "expire_epoch_timestamp" BIGINT NOT NULL,

    CONSTRAINT "BlackListToken_pkey" PRIMARY KEY ("token")
);
