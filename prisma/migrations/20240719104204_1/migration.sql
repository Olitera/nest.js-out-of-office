-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "peoplePartner" INTEGER,
    "outOfOfficeBalance" INTEGER NOT NULL,
    CONSTRAINT "Employee_peoplePartner_fkey" FOREIGN KEY ("peoplePartner") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employee" INTEGER,
    "absenceReason" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "LeaveRequest_employee_fkey" FOREIGN KEY ("employee") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ApprovalRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "approver" INTEGER NOT NULL,
    "leaveRequest" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT,
    CONSTRAINT "ApprovalRequest_approver_fkey" FOREIGN KEY ("approver") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ApprovalRequest_leaveRequest_fkey" FOREIGN KEY ("leaveRequest") REFERENCES "LeaveRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectType" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "projectManager" INTEGER,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Project_projectManager_fkey" FOREIGN KEY ("projectManager") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_peoplePartner_key" ON "Employee"("peoplePartner");
