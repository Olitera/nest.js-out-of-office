/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectType" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "projectManager" INTEGER,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Project_projectManager_fkey" FOREIGN KEY ("projectManager") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("comment", "endDate", "id", "projectManager", "projectType", "startDate", "status") SELECT "comment", "endDate", "id", "projectManager", "projectType", "startDate", "status" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
