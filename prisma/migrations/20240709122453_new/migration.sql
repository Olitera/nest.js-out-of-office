-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "peoplePartner" INTEGER NOT NULL,
    "outOfOfficeBalance" INTEGER NOT NULL,
    CONSTRAINT "Employee_peoplePartner_fkey" FOREIGN KEY ("peoplePartner") REFERENCES "Employee" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employee" INTEGER NOT NULL,
    "absenceReason" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "LeaveRequest_employee_fkey" FOREIGN KEY ("employee") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ApprovalRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "approver" INTEGER NOT NULL,
    "leaveRequest" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "leaveRequestId" INTEGER NOT NULL,
    CONSTRAINT "ApprovalRequest_approver_fkey" FOREIGN KEY ("approver") REFERENCES "Employee" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "ApprovalRequest_leaveRequestId_fkey" FOREIGN KEY ("leaveRequestId") REFERENCES "LeaveRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectType" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "projectManager" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    CONSTRAINT "Project_projectManager_fkey" FOREIGN KEY ("projectManager") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_peoplePartner_key" ON "Employee"("peoplePartner");
