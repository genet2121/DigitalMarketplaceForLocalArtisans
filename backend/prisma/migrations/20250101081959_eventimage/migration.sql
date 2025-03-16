-- AlterTable
ALTER TABLE `event` ADD COLUMN `event_image_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_event_image_id_fkey` FOREIGN KEY (`event_image_id`) REFERENCES `attachment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
