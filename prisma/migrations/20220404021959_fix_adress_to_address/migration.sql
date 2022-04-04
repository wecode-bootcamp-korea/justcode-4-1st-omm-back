/*
  Warnings:

  - You are about to drop the `adress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detail_adress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `masters_adress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detail_adress` DROP FOREIGN KEY `detail_adress_adress_id_fkey`;

-- DropForeignKey
ALTER TABLE `masters_adress` DROP FOREIGN KEY `masters_adress_adress_id_fkey`;

-- DropForeignKey
ALTER TABLE `masters_adress` DROP FOREIGN KEY `masters_adress_detail_adress_id_fkey`;

-- DropForeignKey
ALTER TABLE `masters_adress` DROP FOREIGN KEY `masters_adress_master_id_fkey`;

-- DropTable
DROP TABLE `adress`;

-- DropTable
DROP TABLE `detail_adress`;

-- DropTable
DROP TABLE `masters_adress`;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `address_id`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masters_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `master_id` INTEGER NOT NULL,
    `address_id` INTEGER NOT NULL,
    `detail_address_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `master_id`(`master_id`),
    INDEX `address_id`(`address_id`),
    INDEX `detail_address_id`(`detail_address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_address` ADD CONSTRAINT `detail_address_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masters_address` ADD CONSTRAINT `masters_address_master_id_fkey` FOREIGN KEY (`master_id`) REFERENCES `masters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masters_address` ADD CONSTRAINT `masters_address_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masters_address` ADD CONSTRAINT `masters_address_detail_address_id_fkey` FOREIGN KEY (`detail_address_id`) REFERENCES `detail_address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
