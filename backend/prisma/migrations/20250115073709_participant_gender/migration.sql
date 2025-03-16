-- AlterTable
ALTER TABLE `participant` ADD COLUMN `gender` ENUM('female', 'male', 'other') NOT NULL DEFAULT 'male';
