-- CreateTable
CREATE TABLE "Fight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isProceed" BOOLEAN NOT NULL DEFAULT false,
    "fightNumber" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Competitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "fightId" INTEGER,
    "competitorType" TEXT NOT NULL,
    CONSTRAINT "Competitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Competitor_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
