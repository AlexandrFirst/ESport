/*
  Warnings:

  - Added the required column `level` to the `Competitor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "fightId" INTEGER,
    "competitorType" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT "Competitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Competitor_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Competitor" ("competitorType", "fightId", "id", "name", "userId") SELECT "competitorType", "fightId", "id", "name", "userId" FROM "Competitor";
DROP TABLE "Competitor";
ALTER TABLE "new_Competitor" RENAME TO "Competitor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
