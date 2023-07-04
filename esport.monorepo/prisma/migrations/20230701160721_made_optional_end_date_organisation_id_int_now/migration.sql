/*
  Warnings:

  - You are about to alter the column `organisation` on the `Competition` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME,
    "organisation" INTEGER NOT NULL
);
INSERT INTO "new_Competition" ("dateEnd", "dateStart", "id", "organisation", "title") SELECT "dateEnd", "dateStart", "id", "organisation", "title" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
