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
    "levelMin" INTEGER DEFAULT 0,
    "levelMax" INTEGER DEFAULT 9999999999,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Category_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("ageMax", "ageMin", "competitionId", "createdAt", "heightMax", "heightMin", "id", "levelMax", "levelMin", "title", "updatedAt", "weightMax", "weightMin") SELECT "ageMax", "ageMin", "competitionId", "createdAt", "heightMax", "heightMin", "id", "levelMax", "levelMin", "title", "updatedAt", "weightMax", "weightMin" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
