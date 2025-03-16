/*
  Warnings:

  - You are about to drop the column `galleryId` on the `youtube_link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `youtube_link` DROP FOREIGN KEY `youtube_link_galleryId_fkey`;

-- AlterTable
ALTER TABLE `gallery_detail` ADD COLUMN `videoUrl` JSON NULL;

-- AlterTable
ALTER TABLE `youtube_link` DROP COLUMN `galleryId`;
