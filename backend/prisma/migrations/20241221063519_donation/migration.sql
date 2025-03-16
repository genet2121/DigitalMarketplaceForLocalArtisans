-- CreateTable
CREATE TABLE `counseling` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('individual', 'group', 'family', 'couple') NOT NULL,
    `number_of_participant` INTEGER NOT NULL DEFAULT 1,
    `full_name` VARCHAR(255) NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `marital_status` VARCHAR(50) NOT NULL,
    `occupation_status` VARCHAR(255) NOT NULL,
    `reason` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(255) NOT NULL,
    `answer` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contactUs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `donater_name` VARCHAR(255) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `receipt_id` INTEGER NOT NULL,
    `is_paid` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `donation` ADD CONSTRAINT `donation_receipt_id_fkey` FOREIGN KEY (`receipt_id`) REFERENCES `attachment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
