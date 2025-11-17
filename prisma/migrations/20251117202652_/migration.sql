-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "membersNr" INTEGER NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StampCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "membersNr" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StampCard_membersNr_fkey" FOREIGN KEY ("membersNr") REFERENCES "Member" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stamp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "size" TEXT,
    "price" TEXT NOT NULL,
    "stampCardid" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Stamp_stampCardid_fkey" FOREIGN KEY ("stampCardid") REFERENCES "StampCard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PawStamp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stampCardid" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PawStamp_stampCardid_fkey" FOREIGN KEY ("stampCardid") REFERENCES "StampCard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Member_membersNr_key" ON "Member"("membersNr");

-- CreateIndex
CREATE INDEX "StampCard_membersNr_fkey" ON "StampCard"("membersNr");

-- CreateIndex
CREATE INDEX "Stamp_stampCardid_fkey" ON "Stamp"("stampCardid");

-- CreateIndex
CREATE INDEX "PawStamp_stampCardid_fkey" ON "PawStamp"("stampCardid");
