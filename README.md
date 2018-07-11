# Name TBD Triva App

# Project Overview
The app will allow users to log in. Users will be able to play games of trivia with friends or random users, trivia games will be interactive including chat. Question will only be in mulitple choice format.

# Presentation and Demo
Slides: https://docs.google.com/presentation/d/1L6u_S4z8b-x_6oBC4NJC7Tuah9tnnZ2NvktnGiymGVI/edit?usp=sharing

# Environment Requirements
NPM must be installed. All other dependencies are installed through npm during set up.

# Set Up
1. Clone the repository from the master branch
2. Set up a SQL Database and modify the connection.js file to reflect your login/connection information
3. Run the SQL contained in the inject.sql file (/db/inject.sql) to create and populate the database with demo tables/data
4. Open a terminal in the cloned repository folder and run npm install 
5. After the dependancies have installed, run node server.js to start the server
6. By default, the app will listen for a browser connection at localhost:8080
7. You must have an internet connection to be able to sign in to the app. This application relies on a Google account for sign-in and session management. 

# Use
This application is intended to be used as a fun interactive trivia game. Users will log in and see their statistics based on their previous matches. They can start a new game, and enter their score data hole-by-hole, as they play. After a match is completed, users can visit the history page to see a condensed scorecard view of each of their previous matches. 

# Features 
Home Page
    - This is a simple title page that just serves to describe the application and to embellish the toggled sign in.
    
 Player View 
    - This page shows the player their statistics and allows them two choices: start a new match and view your match history. 
    
Hole view
    - Users are presented with a satellite picture of each hole along with the yardage for each tee.
    - Users have the ability to paginate through the holes.
    - Users have the ability to enter their score for each hole.
    - Users have the ability to enter the number of putts they made on that hole.
    - Users have the ability to take notes on each hole that will be captured for users to look at later in match history.
    - Users are able to see the scores they have posted previously for each hole when viewing the details of a historical match
    
Match History
    - Scores displayed with the Par score for the course, the score the user entered, and the date the match was played.
    - Matches are displayed as traditional golf scorecards on an infinitely-scrolling page.
    - Navigation in the footer can be used to return to other pages. 
