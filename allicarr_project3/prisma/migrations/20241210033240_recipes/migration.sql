-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `cookingMethodId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_cookingMethodId_fkey` FOREIGN KEY (`cookingMethodId`) REFERENCES `CookingMethod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
