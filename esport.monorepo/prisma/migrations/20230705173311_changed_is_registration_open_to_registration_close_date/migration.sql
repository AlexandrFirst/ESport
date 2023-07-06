/*
  Warnings:

  - You are about to drop the column `isRegistrationOpen` on the `Competition` table. All the data in the column will be lost.
  - Added the required column `registrationCloseDate` to the `Competition` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME,
    "organisationId" INTEGER NOT NULL,
    "registrationCloseDate" DATETIME NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Competition_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Competition_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("createdAt", "createdBy", "dateEnd", "dateStart", "id", "organisationId", "title", "updatedAt") SELECT "createdAt", "createdBy", "dateEnd", "dateStart", "id", "organisationId", "title", "updatedAt" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
