-- AlterTable
ALTER TABLE `masters_categories` ADD COLUMN `is_main` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `request_form` ADD COLUMN `ended_at` DATETIME(3) NULL;
