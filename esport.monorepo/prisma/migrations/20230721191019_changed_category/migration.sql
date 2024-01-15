/*
  Warnings:

  - You are about to drop the column `age` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Category` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "weightMin" INTEGER,
    "weightMax" INTEGER,
    "heightMin" INTEGER,
    "heightMax" INTEGER,
    "ageMin" INTEGER,
    "ageMax" INTEGER,
    "levelMin" INTEGER,
    "levelMax" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Category_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("competitionId", "createdAt", "id", "title", "updatedAt") SELECT "competitionId", "createdAt", "id", "title", "updatedAt" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
