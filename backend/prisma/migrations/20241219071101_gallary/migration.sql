/*
  Warnings:

  - You are about to drop the column `category` on the `attachment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `attachment` table. All the data in the column will be lost.
  - You are about to drop the column `page_name` on the `attachment` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `participant` table. All the data in the column will be lost.
  - Added the required column `age` to the `participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attachment` DROP COLUMN `category`,
    DROP COLUMN `name`,
    DROP COLUMN `page_name`;

-- AlterTable
ALTER TABLE `participant` DROP COLUMN `transaction_id`,
    ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `full_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `phone` VARCHAR(15) NOT NULL,
    ADD COLUMN `receipt_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `gallery_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `introductionVideo` VARCHAR(255) NOT NULL,
    `introductionTitle` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `youtube_link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `galleryId` INTEGER NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `galleryId` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `image` VARCHAR(255) NULL,
    `attachment_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_profile_picture_id_fkey` FOREIGN KEY (`profile_picture_id`) REFERENCES `attachment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participant` ADD CONSTRAINT `participant_receipt_id_fkey` FOREIGN KEY (`receipt_id`) REFERENCES `attachment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `youtube_link` ADD CONSTRAINT `youtube_link_galleryId_fkey` FOREIGN KEY (`galleryId`) REFERENCES `gallery_detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `testimonial_galleryId_fkey` FOREIGN KEY (`galleryId`) REFERENCES `gallery_detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonial` ADD CONSTRAINT `testimonial_attachment_id_fkey` FOREIGN KEY (`attachment_id`) REFERENCES `attachment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
