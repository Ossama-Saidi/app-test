-- AlterTable
ALTER TABLE `administrateur` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT 'admin_default_password';

-- AlterTable
ALTER TABLE `utilisateur` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT 'user_default_password';
