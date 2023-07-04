/*
  Warnings:

  - You are about to drop the column `organisation` on the `Competition` table. All the data in the column will be lost.
  - Added the required column `organisationId` to the `Competition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Organisation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME,
    "organisationId" INTEGER NOT NULL,
    CONSTRAINT "Competition_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("dateEnd", "dateStart", "id", "title") SELECT "dateEnd", "dateStart", "id", "title" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
