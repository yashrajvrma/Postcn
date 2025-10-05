-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('FOLDER', 'FILE');

-- CreateTable
CREATE TABLE "collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_and_folder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "collectionId" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_and_folder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file_and_folder" ADD CONSTRAINT "file_and_folder_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_and_folder" ADD CONSTRAINT "file_and_folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "file_and_folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
