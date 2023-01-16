# LIFTER - Final project for GeeksHubs Academy

This is a React project using my own relational database and API. The project consists in a web application for people who enjoy going to the gym and want to track their routines and progress lifting weights.

## DEPLOY

The page is deployed [in AWS Amplify.](https://master.d3vose1xg6ck6v.amplifyapp.com)

## VIEWS

Landing page: fixed navbar with the name and slogan for the app, and buttons to register and login if the user already has an account. This page sets the design for the rest of the app, very squarish and bold.

<img src="./src/assets/landing.png">

Public exercise database: has two filtering options with dropdowns and a search bar with a 0,5sec debouncer. The filters can be used individually or at the same time and the search results are paginated. Each exercise has a detail view with a brief description indicating how to perform the movement and a .gif image demonstrating the muscles involved.

<img src="./src/assets/exercises.png">
<img src="./src/assets/exercisedetail.png">

Login and register forms: simple but effective, the user provides only a username, email address and a password and can edit the rest of their details in their profile page.

<img src="./src/assets/login.png">
<img src="./src/assets/register.png">
<img src="./src/assets/profile.png">


Routine views: Each user has access to a private section of routines. They can create, edit and delete routines, as well as add any sets of exercises with personalized reps and weights to their page.

<img src="./src/assets/routines.png">
<img src="./src/assets/routinedetail.png">

Admin view: The administrator of the page can see and delete users. There is a modal of confirmation before making the elimination definitive. Administrators cannot be deleted.

<img src="./src/assets/admin.png">
<img src="./src/assets/admindelete.png">


Every view is designed to be responsive and equally usable on mobile:


<img src="./src/assets/moblanding.png" height="400">
<img src="./src/assets/moblogin.png" height="400">
<img src="./src/assets/mobprofile.png" height="400">

## Local use

Clone this repository and install dependencies with: 

### `npm i`


You can then run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

