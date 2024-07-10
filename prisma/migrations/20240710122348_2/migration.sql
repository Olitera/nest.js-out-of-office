/*
  Warnings:

  - You are about to drop the column `leaveRequestId` on the `ApprovalRequest` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApprovalRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "approver" INTEGER,
    "leaveRequest" INTEGER,
    "status" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "ApprovalRequest_approver_fkey" FOREIGN KEY ("approver") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ApprovalRequest_leaveRequest_fkey" FOREIGN KEY ("leaveRequest") REFERENCES "LeaveRequest" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ApprovalRequest" ("approver", "comment", "id", "leaveRequest", "status") SELECT "approver", "comment", "id", "leaveRequest", "status" FROM "ApprovalRequest";
DROP TABLE "ApprovalRequest";
ALTER TABLE "new_ApprovalRequest" RENAME TO "ApprovalRequest";
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "peoplePartner" INTEGER,
    "outOfOfficeBalance" INTEGER NOT NULL,
    CONSTRAINT "Employee_peoplePartner_fkey" FOREIGN KEY ("peoplePartner") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("fullname", "id", "outOfOfficeBalance", "peoplePartner", "position", "status", "subdivision") SELECT "fullname", "id", "outOfOfficeBalance", "peoplePartner", "position", "status", "subdivision" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_peoplePartner_key" ON "Employee"("peoplePartner");
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectType" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "projectManager" INTEGER,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    CONSTRAINT "Project_projectManager_fkey" FOREIGN KEY ("projectManager") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("comment", "employeeId", "endDate", "id", "projectManager", "projectType", "startDate", "status") SELECT "comment", "employeeId", "endDate", "id", "projectManager", "projectType", "startDate", "status" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
