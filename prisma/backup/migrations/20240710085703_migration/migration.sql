-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApprovalRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "approver" INTEGER NOT NULL,
    "leaveRequest" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "leaveRequestId" INTEGER NOT NULL,
    CONSTRAINT "ApprovalRequest_approver_fkey" FOREIGN KEY ("approver") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ApprovalRequest_leaveRequestId_fkey" FOREIGN KEY ("leaveRequestId") REFERENCES "LeaveRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ApprovalRequest" ("approver", "comment", "id", "leaveRequest", "leaveRequestId", "status") SELECT "approver", "comment", "id", "leaveRequest", "leaveRequestId", "status" FROM "ApprovalRequest";
DROP TABLE "ApprovalRequest";
ALTER TABLE "new_ApprovalRequest" RENAME TO "ApprovalRequest";
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "peoplePartner" INTEGER NOT NULL,
    "outOfOfficeBalance" INTEGER NOT NULL,
    CONSTRAINT "Employee_peoplePartner_fkey" FOREIGN KEY ("peoplePartner") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("fullname", "id", "outOfOfficeBalance", "peoplePartner", "position", "status", "subdivision") SELECT "fullname", "id", "outOfOfficeBalance", "peoplePartner", "position", "status", "subdivision" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_peoplePartner_key" ON "Employee"("peoplePartner");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
