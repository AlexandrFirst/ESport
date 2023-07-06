/*
  Warnings:

  - Added the required column `competitionId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competitorId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Request_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Request_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Request" ("competitorId", "createdAt", "id", "isAccepted", "updatedAt") SELECT "competitorId", "createdAt", "id", "isAccepted", "updatedAt" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
