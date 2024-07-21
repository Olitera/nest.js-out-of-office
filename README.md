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

##### Description: HR_MANAGER or ADMIN registers in the system, and a corresponding employee is created. In this case, it turns out that HR_MANAGER is also employees, but since they subsequently create other employees, they cannot have a single choice from the "Employee" table with the "HR Manager" position in the PeoplePartner field. Instead, they have an array of Employees they have created. 

   Endpoints:
   - `POST /auth/signup/hr`
     Body:
```
{
   "login": "10",
   "password": "10",
   "fullname": "David",
   "subdivision": "mmb",
   "position": "HR_MANAGER",
   "status": "new",
   "outOfOfficeBalance": 0
}
```
   Response:
```
{
    "id": 6,
    "login": "10",
    "password": "10",
    "roles": "HR_MANAGER"
}

```
   - POST `/auth/signup/admin`
   Body:
```
{
   "login": "11",
   "password": "11",
   "fullname": "Sem",
   "subdivision": "mmb",
   "position": "ADMIN",
   "status": "new",
   "outOfOfficeBalance": 0
}
```
   Response:
```
{
    "id": 7,
    "login": "11",
    "password": "11",
    "roles": "ADMIN"
}

```

#### Login

##### Description: authenticates a user and returns tokens. 
   Endpoint:
   - `POST /auth/login`
   Body:
```
{
  "login": "string",
  "password": "string"
}
```
   Response: 
```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImxvZ2luIjoiMSIsImlhdCI6MTcyMTU2NDU3OSwiZXhwIjoxNzIxNjA3Nzc5fQ.i8iPfv4YncaBs0akeUV7B_yNQNwWEYl4HTVEkCxwT6s",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImxvZ2luIjoiMSIsImlhdCI6MTcyMTU2NDU3OSwiZXhwIjoxNzIxNjUwOTc5fQ.ZeBxGSzHoXTnz7eff7dI2SQvlB5Aic28ib4KWs8u5ZE"
}
```

## Employees

#### Create Employee: 
   - Endpoint: `POST /employees`
   - Roles: HR_MANAGER, ADMIN
   - Description: HR or admin can create a new employee and assign them the appropriate role, such as: HR_MANAGER, PROJECT_MANAGER, EMPLOYEE, ADMIN
   - Body:
```
{
   "login": "12",
   "password": "12",
   "roles": "EMPLOYEE",
   "fullname": "Lukas",
   "subdivision": "mmb",
   "status": "new",
   "outOfOfficeBalance": 0,
   "hrId": 1; //this is id HR_MANAGER or ADMIN, who create this employee
}
```
  - Response:
```
{
    "id": 8,
    "login": "12",
    "password": "12",
    "roles": "EMPLOYEE"
}
```

#### Get All Employees: 
   - Endpoint: `GET /employees`
   - Roles: HR_MANAGER, ADMIN, PROJECT_MANAGER
   - Query Params:
     - sortColumn (optional): column to sort by.
     - sortOrder (optional): sort order (asc or desc).
     - filter (optional): array of fields to include in the response.
     - search (optional): search string.
   - Sort table rows using sorting in the column headers, for example sort by fullname in asc order : `GET /employees?sortColumn=fullname&sortOrder=asc`
   - Filter for table rows, for example by such as fullname and status: `GET /employees?filter=fullname,status`
   - Search by name for table rows, for example by name Anna: `GET /employees?search=anna`

#### Get Employee by ID, open an employee:
   - Endpoint: `GET /employees/:id`
   - Roles: HR_MANAGER, ADMIN, PROJECT_MANAGER

#### Update Employee: 
   - Endpoint: `PUT /employees/:id`
   - Roles: HR_MANAGER, ADMIN
   - Body:
```
{
   "fullname": "Lukas",
   "subdivision": "mmb",
   "status": "new",
   "position": "PROJECT_MANAGER",
   "peoplePartner": 1,
   "outOfOfficeBalance": 0
}
```

#### Assign an employee to projects: 
   - Endpoint: `PUT /employees/:id/assign`
   - Roles: PROJECT_MANAGER, ADMIN
   - Body:
```
{
   "id": 2; //this is id of assigned project
}
```
   - Response:
```
{
    "id": 3,
    "fullname": "Kate",
    "subdivision": "mmb",
    "position": "EMPLOYEE",
    "status": "new",
    "peoplePartner": 1,
    "outOfOfficeBalance": 0,
    "user": 3,
    "Project": [
        {
            "id": 2,
            "projectType": "Doc",
            "startDate": "2024-07-09T00:00:00.000Z",
            "endDate": "2024-07-09T00:00:00.000Z",
            "projectManager": 3,
            "comment": "no",
            "status": "inactive"
        }
    ]
}
```
#### Deactivate Employee:
   - Endpoint: `PUT /employees/:id/status?status=inactive`
   - Roles: HR_MANAGER, ADMIN
   - Query Params: status (inactive for deactivate employee, another one for active)
   - Response:
```
{
    "id": 8,
    "fullname": "Lukas",
    "subdivision": "mmb",
    "position": "PROJECT_MANAGER",
    "status": "inactive",
    "peoplePartner": 1,
    "outOfOfficeBalance": 0,
    "user": 8
}
```

#### Delete Employee:
   - Endpoint: `DELETE /employees/:id`
   - Roles: ADMIN

## Leave requests

#### Create Leave request: 
   - Endpoint: `POST /leaverequests`
   - Roles: EMPLOYEE, ADMIN
   - Body:
```
{
   "absenceReason": "veryimportant",
   "startDate": "2024-07-09T00:00:00Z",
   "endDate": "2024-07-09T00:00:00Z",    
   "comment": "no",
   "status": "new",
   "employeeId": 3; // this is id Employee which create Leave request 
}
```
#### Get All Leave requests:
   - Endpoint: `GET /leaverequests`
   - Roles: EMPLOYEE, HR_MANAGER, PROJECT_MANAGER, ADMIN
     Query Params:
       - sortColumn (optional): column to sort by.
       - sortOrder (optional): sort order (asc or desc).
       - filter (optional): array of fields to include in the response.
       - search (optional): search string.
   - Sort table rows using sorting in the column headers, for example sort by id in desc order : `GET /leaverequests?sortColumn=id&sortOrder=desc`
   - Filter for table rows, for example by such as employee and startDate: `GET /leaverequests?filter=employee,startDate`
   - Search by id for table rows, for example 1 : `GET /leaverequests?search=1`

#### Get Leave request by ID, open a leave request:
   - Endpoint: `GET /leaverequests/:id`
   - Roles: EMPLOYEE, HR_MANAGER, PROJECT_MANAGER, ADMIN

#### Update Leave request: 
   - Endpoint: `PUT /leaverequests/:id`
   - Roles: EMPLOYEE, ADMIN
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

#### Submit Leave request: 
   - Endpoint: `PUT /leaverequests/:id/submit`
   - Roles: EMPLOYEE, ADMIN
   - Description: the status is updated to “submitted,” and a new approval request
     is created for the responsible HR Manager and Project Managers responsible for employee’s projects
   - Body:
```
{
   "absenceReason": "veryimportant",
   "startDate": "2024-07-09T00:00:00Z",
   "endDate": "2024-07-09T00:00:00Z",    
   "comment": "veryimportant",
   "status": "new",
   "approverId": 1 // this id for the responsible HR Manager and Project Managers responsible for employee’s projects
}

```
  - Response:
```
{
    "id": 5,
    "employee": 2,
    "absenceReason": "veryimportant",
    "startDate": "2024-07-09T00:00:00.000Z",
    "endDate": "2024-07-09T00:00:00.000Z",
    "comment": "veryimportant",
    "status": "submitted"
}

```
#### Cancel Leave request: 
   - Endpoint: `PUT /leaverequests/:id/cancel`
   - Roles: EMPLOYEE, ADMIN
   - Description: the status is updated to “canceled,” and approval requests are canceled if they already exist.
   - Response:
```
{
    "id": 6,
    "employee": 8,
    "absenceReason": "veryimportant",
    "startDate": "2024-07-09T00:00:00.000Z",
    "endDate": "2024-07-14T00:00:00.000Z",
    "comment": "no",
    "status": "cancelled"
}
```

#### Delete Leave request: 
   - Endpoint: `DELETE /leaverequests/:id`
   - Roles: ADMIN

### Approval requests
   Description: new approval request is created when EMPLOYEE submit Leave request

#### Get All Approval requests:
   - Endpoint: `GET /approvalrequests`
   - Roles: HR_MANAGER, PROJECT_MANAGER, ADMIN
   - Query Params:
       - sortColumn (optional): column to sort by.
       - sortOrder (optional): sort order (asc or desc).
       - filter (optional): array of fields to include in the response.
       - search (optional): search by request number.
   - Sort table rows using sorting in the column headers, for example sort by status in desc order: `GET /approvalrequests?
     sortColumn=status&sortOrder=desc`
   - Filter for table rows, for example by such as approver and leaveRequests: `GET /approvalrequests?filter=approver,leaveRequest`
   - Search by request number for table rows, for example 1: `GET /approvalrequests?search=1`


#### Get Approval request by ID, open a approval request: `GET /approvalrequests/:id`

#### Update Approval request: `PUT /approvalrequests/:id`
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


