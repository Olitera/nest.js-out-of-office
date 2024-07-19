-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LeaveRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employee" INTEGER,
    "absenceReason" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "LeaveRequest_employee_fkey" FOREIGN KEY ("employee") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_LeaveRequest" ("absenceReason", "comment", "employee", "endDate", "id", "startDate", "status") SELECT "absenceReason", "comment", "employee", "endDate", "id", "startDate", "status" FROM "LeaveRequest";
DROP TABLE "LeaveRequest";
ALTER TABLE "new_LeaveRequest" RENAME TO "LeaveRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
