/*
  Warnings:

  - You are about to drop the column `statut` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ResumeCommande` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Produit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Commande` DROP COLUMN `statut`;

-- AlterTable
ALTER TABLE `Produit` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ResumeCommande` DROP COLUMN `status`,
    ADD COLUMN `isRead` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Statistiques` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Produit_slug_key` ON `Produit`(`slug`);

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
