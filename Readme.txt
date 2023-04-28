CET324 – Advanced CyberSecurity - Assignment 2
This comprehensive Readme file contains information on how to initialize this project, project design/architecture and the overall flow of control.

There are two ReadMe files in this project, README.md and README.txt, they have the same content, however, README.md is markdown file, hence
can be previewed in an IDE like vs code for clearer visualization

Brief Description
As part of course assignment, this application is a user authentication system with several features.

It has a user interface that prompts users to create an account by providing a username (such as an email address) and password

The system algorithmically determines the strength of the password chosen by users and provides suitable feedback about the password strength based on research about password strength criteria.

In addition, the application includes a captcha function to ensure that registration requests are made by human users.

The application also includes a One Time Token (OTT) authentication. The system sends a token (via email) to a registered user forauthentication

There is also a simple dashboard for users to make a text post.

For extra bit of security, the system controls the user from performing manual routes by catching all routes that are not specified in the routes of the system.

Tech Stack
MongoDB Express ReactJS NodeJS [M E R N]
NodeJS & Express server were used to handle the backend. MongoDB is the NoSQL database behind the bankend. React is the tool for the frontend ensuring easy routing.

Initializing the auth-app
Requirements
To successfully setup the working app, with the copy of this project, you should have mongodb installed on your system as well as npm.

Open the root directory of the app in terminal or IDE of your choice.
change directory into the server directory and run npm install
Ensure that your mongodb server is running, on Linux use systemctl start mongodto start mongodb in the terminal on windows, locate the directory where mongodb server was installed and run the mongod file from the bin directory. Note the port number of the mongodb server, the default port number is 27017
At the end of execution of npm install in the server directory, all the dependencies for the server would have been installed.
Open the .env file and provide the appropriate environment (security) values for the server.
while in the server directory, execute npm run dev
cd ../client-app
Run npm install to install all required npm packages or dependencies for the react app.
In the .env file, ensure that the REACT_RECAPTCHA_SITE_KEY has an actual api key.
Execute npm start to spin the react server.
The system renders on the preferred port in the default browser.
The system has a minimalist interface, for first time user, you can sign up, where your password strength would be printed, and also you would tested to know if you are human and not a robot using the google captcha api.
After a successful signup, a user is redirected to the sign-in page to sign, this page also implements a 2 factor authentication through one time token via email.
Once the user successfully logs in, a dashboard is presented where a user can log some message for it to be displayed, the user can log out safely and be sure that his/her credentials would not be used by another user to access the system

Project architcture

User Interface
The user interface is the part of the app that users interact with. It is responsible for displaying the login and registration forms, as well as the dashboard. The user interface is written with ReactJS.

Authentication Service
The authentication service is responsible for verifying the identity of users. It does this by validating the username and password that the user enters. The authentication service can also be used to generate one-time tokens (OTTs) for authentication. The authentication service is written in NodeJS.

Database
The database is used to store user data such as usernames, passwords, and OTTs. The database is typically a NoSQL db, MongoDB.

Captcha Service
The captcha service is used to prevent automated bots from registering for accounts. The captcha service typically displays a challenge that is difficult for bots to solve, but easy for humans to solve. In the implementation, google captcha is used.

Dashboard
The dashboard is a simple page that allows users to make text posts.

The app takes steps to secure user data. This includes using strong encryption for storing passwords and it signals useres about their password strength.

Project Flow
Here is the flow of usage of your simple authentication app:

The user visits the app's website.

The user clicks on the "Sign Up" button.

The user enters their username, email address, and password.

The app checks the strength of the password. If the password is not strong enough, the app provides feedback to the user.

The app sends a captcha challenge to the user.

The user solves the captcha challenge.

The user clicks on the "Create Account" button.

The app creates a new account for the user.

The user is redirected to the login page to login for the first time.

On successful login, the user can now make text posts on the dashboard.

If the user wants to log out, they can click on the "Log Out" button.


Sources / References

