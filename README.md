## Description

This project is built with NestJS and Prisma. It provides APIs for managing employees, leave requests, approval requests, projects, and 
user authentication. The project uses SQLite as its database.

## Installation

```bash
# clone the repository:
git clone <repository-url>

# install the dependencies:
$ npm install
```

## Running the app

```bash
# to start the app, use:
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# to build the app:
$ npm run build
```

## Auto-fix and format

```bash
$ npm run lint

$ npm run format
```

## Prisma
Prisma is used for database access. Make sure to generate the Prisma client after making any changes to the schema.

```bash
#to generate the Prisma client:
$ npm run prisma:generate

#to run migrations:
$ npm run prisma:migrate
```

## Modules

The project is divided into several modules:
 - AuthModule: Handles user authentication and registration.
 - EmployeeModule: Manages employee data.
 - ProjectModule: Manages project data.
 - LeaveRequestModule: Manages leave requests.
 - ApprovalRequestModule: Manages approval requests
 - UserModule: Manages user data.

## API Documentation

### Auth

#### Sign Up
   Description: Registers a new user.
   Endpoints:
   - POST `/auth/signup/hr`
   - POST `/auth/signup/manager`
   - POST `/auth/signup/admin`

   Body:
```
{
  "login": "string",
  "password": "string",
  "roles": "string"
}
```
#### Login
   Description: Authenticates a user and returns tokens.
   Endpoint:
   - `POST /auth/login`
   Body:
```
{
  "login": "string",
  "password": "string"
}

```

## Employees
   - Create Employee: `POST /employees`
   - Get All Employees: `GET /employees`

     Query Params:
     - sortColumn (optional): column to sort by.
     - sortOrder (optional): sort order (asc or desc).
     - filter (optional): array of fields to include in the response.
     - search (optional): search string.

   - Sort table rows using sorting in the column headers, for example sort by fullname in asc order : `GET /employees?
     sortColumn=fullname&sortOrder=asc`
   - Filter for table rows, for example by such as fullname and status: `GET /employees?filter=fullname,status`
   - Search by name for table rows, for example by name Anna: `GET /employees?search=anna`

   - Get Employee by ID, open an employee: `GET /employees/:id`
   - Update Employee: `PUT /employees/:id`
   - Assign an employee to projects: `PUT /employees/:id/assign`
     Body:
```
{
   "id": 2; //this is id of assigned project
}
```
   - Deactivate Employee: `PUT /employees/:id/status?status=inactive`
   - Delete Employee: `DELETE /employees/:id`

## Leave requests

   - Create Leave request: `POST /leaverequests`
     Body:
```
{
   "absenceReason": "veryimportant",
   "startDate": "2024-07-09T00:00:00Z",
   "endDate": "2024-07-09T00:00:00Z",    
   "comment": "no",
   "status": "new",
   "employeeId": 3 
}
```
   - Get All Leave requests: `GET /leaverequests`

     Query Params:
       - sortColumn (optional): column to sort by.
       - sortOrder (optional): sort order (asc or desc).
       - filter (optional): array of fields to include in the response.
       - search (optional): search string.

   - Sort table rows using sorting in the column headers, for example sort by id in desc order : `GET /leaverequests?
     sortColumn=id&sortOrder=desc`
   - Filter for table rows, for example by such as employee and startDate: `GET /leaverequests?filter=employee,startDate`
   - Search by id for table rows, for example 1 : `GET /leaverequests?searh=1`

   - Get Leave request by ID, open a leave request: `GET /leaverequests/:id`
   - Update Leave request: `PUT /leaverequests/:id`
     Body:
```
{
    "employee": 2,
    "absenceReason": "veryimportant",
    "startDate": "2024-07-09T00:00:00.000Z",
    "endDate": "2024-07-12T00:00:00.000Z",
    "comment": "veryimportant",
    "status": "approve"
}
```
   - Submit Leave request: `PUT /leaverequests/:id/submit`
     Body:
```
{
   "absenceReason": "veryimportant",
   "startDate": "2024-07-09T00:00:00Z",
   "endDate": "2024-07-09T00:00:00Z",    
   "comment": "veryimportant",
   "status": "new",
   "approverId": 1
}

```
   - Cancel Leave request:  `PUT /leaverequests/:id/cancel`
   - Delete Leave request: `DELETE /leaverequests/:id`

### Approval requests

   - Get All Approval requests: `GET /approvalrequests`

     Query Params:
       - sortColumn (optional): column to sort by.
       - sortOrder (optional): sort order (asc or desc).
       - filter (optional): array of fields to include in the response.
       - search (optional): search by request number.

   - Sort table rows using sorting in the column headers, for example sort by status in desc order : `GET /approvalrequests?
     sortColumn=status&sortOrder=desc`
   - Filter for table rows, for example by such as approver and leaveRequests: `GET /approvalrequests?filter=approver,leaveRequest`
   - Search by request number for table rows, for example 1 : `GET /approvalrequests?search=1`


   - Get Approval request by ID, open a approval request: `GET /approvalrequests/:id`
   - Update Approval request: `PUT /approvalrequests/:id`
     Body:
```{
   "approver": 1,
   "leaveRequest": 3,
   "status": "new",
   "comment": "no"
}    
```     
   - Approve the request `PUT /approvalrequests/:id/approve`
     Body:
```
{
   "leaveRequestId": 4
}
```
   - Reject the request: `PUT /approvalrequests/:id/reject`
     Body:
```
{
   "leaveRequestId": 4
}
```
   - Delete Approval request: `DELETE /approvalrequests/:id`

### Projects

- Create Project: `POST /projects`
- Get All Projects: `GET /projects`

  Query Params:
    - sortColumn (optional): column to sort by.
    - sortOrder (optional): sort order (asc or desc).
    - filter (optional): array of fields to include in the response.
    - search (optional): search string.

  - Sort table rows using sorting in the column headers, for example sort by comment in asc order : `GET /projects?sortColumn=comment&sortOrder=asc`
  - Filter for table rows, for example by such as fullname and status: `GET /projects?filter=projectType`
 

- Get Project by ID, open a project: `GET /projects/:id`
- Update Project: `PUT /projects/:id`
- Deactivate Project: `PUT /projects/:id/status?status=inactive`
- Delete Project: `DELETE /projects/:id`


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Volha Melayok]


