/*
  Warnings:

  - You are about to drop the column `userId` on the `Request` table. All the data in the column will be lost.
  - Added the required column `competitorId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    "fightId" INTEGER,
    "competitorType" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Competitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Competitor_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Competitor" ("competitorType", "createdAt", "fightId", "id", "level", "name", "updatedAt", "userId") SELECT "competitorType", "createdAt", "fightId", "id", "level", "name", "updatedAt", "userId" FROM "Competitor";
DROP TABLE "Competitor";
ALTER TABLE "new_Competitor" RENAME TO "Competitor";
CREATE TABLE "new_Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competitorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Request_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Request" ("createdAt", "id", "isAccepted", "updatedAt") SELECT "createdAt", "id", "isAccepted", "updatedAt" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
