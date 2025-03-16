-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `business_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `passwrd` VARCHAR(255) NOT NULL,
    `image` LONGBLOB NULL,
    `verified` BOOLEAN NULL,
    `user_type` ENUM('buyer', 'seller') NOT NULL,
    `verificationToken` VARCHAR(191) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `table` VARCHAR(191) NULL,
    `record` VARCHAR(191) NULL,
    `file_name` VARCHAR(100) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoryAttribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `attribute_name` VARCHAR(255) NOT NULL,
    `attribute_value` VARCHAR(255) NOT NULL,

    INDEX `fk_category_attributes_categories`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `c_name` VARCHAR(255) NOT NULL,
    `image` LONGBLOB NOT NULL,
    `parent_id` INTEGER NULL,

    UNIQUE INDEX `category_c_name_key`(`c_name`),
    INDEX `c_name`(`c_name`),
    INDEX `category_parent_id_idx`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `p_name` VARCHAR(255) NOT NULL,
    `des` VARCHAR(1000) NOT NULL,
    `price` DOUBLE NOT NULL,
    `cat_attr_id` INTEGER NOT NULL,
    `seller_id` INTEGER NOT NULL,

    INDEX `fk_products_category_attributes`(`cat_attr_id`),
    INDEX `fk_products_users`(`seller_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categoryAttribute` ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `cat_attr_id` FOREIGN KEY (`cat_attr_id`) REFERENCES `categoryAttribute`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `seller_id` FOREIGN KEY (`seller_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
