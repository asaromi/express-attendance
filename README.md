Express HRIS (Attendance) API
====

Introduction
----
The API is an API show case of simple clock in and clock out attendances. The API is built using NodeJS and ExpressJS as the framework, and using MongoDB as the database.

Requirements
----
- NodeJS (develop using Node14) - for more info or documentation you can access [here](https://nodejs.org)
- MongoDB - for more info or documentation you can access [here](https://www.mongodb.com)

How to Setup
----
**Project Setup**
- Download or clone this repository (and install all requirements if you haven't ever used it before)
- Open terminal (Linux/macOS) or Command Prompt/PowerShell (Windows), and execute command `npm install` or `yarn install` to install all required npm packages

**Database Setup**
- Create new database to your MongoDB server
- Copy `.env.example` as `.env` and change listed environment variable (the PORT and HOST are optional)
- To running the project, execute `npm run start` or `yarn start` and you can access running API in http://localhost:5000

List of API functionalities
----
| Endpoint           | Relative Path                | Method | Description                                                                        |
|--------------------|------------------------------|--------|------------------------------------------------------------------------------------|
| Get Auth User      | */api/auth*                  | GET    | Endpoint helper to get authenticated user                                          |
| Login Auth         | */api/auth/login*            | POST   | Auth Endpoint to login user                                                        |
| Register Auth      | */api/auth/register*         | POST   | Auth Endpoint to register user                                                     |
| Create Event       | */api/attendances*           | GET    | Attendances Endpoint to get my attendances (by authenticated user)                 |
| Create Location    | */api/attendances/clock-in*  | POST   | Attendances Endpoint to check-in/clock-in today attendance (by authenticated user) |
| Create Ticket      | */api/attendances/clock-out* | POST   | Endpoint to create new ticket type on one specific event                           |

For specific API testing example, you can open [here](https://documenter.getpostman.com/view/15820910/2s9Ykt3dTe)

