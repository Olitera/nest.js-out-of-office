-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "peoplePartner" INTEGER,
    "outOfOfficeBalance" INTEGER NOT NULL,
    CONSTRAINT "Employee_peoplePartner_fkey" FOREIGN KEY ("peoplePartner") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE SET NULL
);
INSERT INTO "new_Employee" ("fullname", "id", "outOfOfficeBalance", "peoplePartner", "position", "status", "subdivision") SELECT "fullname", "id", "outOfOfficeBalance", "peoplePartner", "position", "status", "subdivision" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_peoplePartner_key" ON "Employee"("peoplePartner");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
