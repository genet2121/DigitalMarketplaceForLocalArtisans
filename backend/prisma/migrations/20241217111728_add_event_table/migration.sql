-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_name` VARCHAR(191) NOT NULL,
    `event_description` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `event_start_time` DATETIME(3) NOT NULL,
    `event_type` ENUM('paid', 'free') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
