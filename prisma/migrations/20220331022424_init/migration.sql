/*
  Warnings:

  - You are about to drop the column `location` on the `masters` table. All the data in the column will be lost.
  - Added the required column `employee_number` to the `masters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `masters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `masters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `work_experience` to the `masters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `masters` DROP COLUMN `location`,
    ADD COLUMN `employee_number` INTEGER NOT NULL,
    ADD COLUMN `end_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `work_experience` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `adress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_adress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adress_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `adress_id`(`adress_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masters_adress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `master_id` INTEGER NOT NULL,
    `adress_id` INTEGER NOT NULL,
    `detail_adress_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `master_id`(`master_id`),
    INDEX `adress_id`(`adress_id`),
    INDEX `detail_adress_id`(`detail_adress_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_adress` ADD CONSTRAINT `detail_adress_adress_id_fkey` FOREIGN KEY (`adress_id`) REFERENCES `adress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masters_adress` ADD CONSTRAINT `masters_adress_master_id_fkey` FOREIGN KEY (`master_id`) REFERENCES `masters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masters_adress` ADD CONSTRAINT `masters_adress_adress_id_fkey` FOREIGN KEY (`adress_id`) REFERENCES `adress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masters_adress` ADD CONSTRAINT `masters_adress_detail_adress_id_fkey` FOREIGN KEY (`detail_adress_id`) REFERENCES `detail_adress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
