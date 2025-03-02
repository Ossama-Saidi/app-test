/*
  Warnings:

  - Made the column `carteEtudiantQr` on table `etudiant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `etudiant` MODIFY `carteEtudiantQr` VARCHAR(191) NOT NULL;
