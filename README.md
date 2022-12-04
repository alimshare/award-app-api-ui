# Award App

### Folder Structure
- backend-api 
- award-ui

### Backend API
- Laravel Framework, PHP
- MySQL Database 

|method|path|Query Param|
|---|---|---|
|GET|/api/email|email|
|GET|/api/award|type, min, max, limit|

*How to Setup and Run*
```
cd backend-api
composer install
php artisan migrate
php artisan serve
```
*note*
_before `php artisan migrate` make sure you already setup the database config on `.env` file_

*having problem on running database migration ?*
no problem, use script `ddl.sql` and execute it manually on your MySQL database

### Award UI
- React JS, Javascript Framework
- Material UI, CSS Framework

*How to Setup and Run*
```
cd award-ui
npm install
npm start
```
