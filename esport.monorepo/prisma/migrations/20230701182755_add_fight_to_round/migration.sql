-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isProceed" BOOLEAN NOT NULL DEFAULT false,
    "fightNumber" INTEGER NOT NULL,
    "roundId" INTEGER,
    CONSTRAINT "Fight_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Fight" ("fightNumber", "id", "isProceed") SELECT "fightNumber", "id", "isProceed" FROM "Fight";
DROP TABLE "Fight";
ALTER TABLE "new_Fight" RENAME TO "Fight";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
