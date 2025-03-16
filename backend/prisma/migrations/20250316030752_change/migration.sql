/*
  Warnings:

  - You are about to drop the column `image_url` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attachment_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `image_url`,
    ADD COLUMN `attachment_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Attachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `table` VARCHAR(191) NOT NULL,
    `file_name` VARCHAR(100) NOT NULL,
    `extension` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_attachment_id_key` ON `Product`(`attachment_id`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_attachment_id_fkey` FOREIGN KEY (`attachment_id`) REFERENCES `Attachment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
