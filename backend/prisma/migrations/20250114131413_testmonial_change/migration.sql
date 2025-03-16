-- AlterTable
ALTER TABLE `testimonial` ADD COLUMN `testimonail_type` ENUM('general', 'forCounseling') NOT NULL DEFAULT 'general',
    ADD COLUMN `testimonial_giver_name` VARCHAR(255) NULL;
