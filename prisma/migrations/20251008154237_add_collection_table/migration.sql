/*
  Warnings:

  - You are about to drop the column `isActive` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the `file_and_folder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."file_and_folder" DROP CONSTRAINT "file_and_folder_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."file_and_folder" DROP CONSTRAINT "file_and_folder_parentId_fkey";

-- AlterTable
ALTER TABLE "collection" DROP COLUMN "isActive",
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "type" "FileType" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."file_and_folder";

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
