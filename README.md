# CET324 – Advanced CyberSecurity - Assignment 2
This comprehensive Readme file contains information on **how to initialize this project**, **project design/architecture** and the overall **flow of control**.


> **There are two ReadMe files in this project, README.md and README.txt, they have the same content, however, README.md is markdown file, hence can be previewed in an IDE like vs code for clearer visualization**


## Brief Description
As part of course assignment, this application is a user authentication system with several features. 

> It has a user interface that prompts users to create an account by providing a username (such as an email address) and password
> 
> The system algorithmically determines the strength of the password chosen by users and provides suitable feedback about the password strength based on research about password strength criteria.
> 
> In addition, the application includes a captcha function to ensure that registration requests are made by human users.
> 
> The application also includes a One Time Token (OTT) authentication. The system sends a token (via email) to a registered user forauthentication
>
>There is also a simple dashboard for users to make a text post.
>
>For extra bit of security, the system controls the user from performing manual routes by catching all routes that are not specified in the routes of the system.

### Tech Stack 
    MongoDB Express ReactJS NodeJS [M E R N]

> **N**odeJS & **E**xpress server were used to handle the backend.
> **M**ongoDB is the NoSQL database behind the bankend.
> **R**eact is the tool for the frontend ensuring easy routing.

## Initializing the auth-app
### Requirements
To successfully setup the working app,  with the copy of this project, you should have mongodb installed on your system as well as npm.

 1. Open the root directory of the app in terminal or IDE of your  choice.
 2. change directory into the server directory and run `npm install`
 3. Ensure that your mongodb server is running, on Linux use `systemctl start mongod`to start mongodb in the terminal
 on windows, locate the directory where mongodb server was installed and run the mongod file from the bin directory. Note the port number of the mongodb server, the default port number is 27017
 4.  At the end of execution of npm install in the server directory, all the dependencies for the server would have been installed.
 5. Open the .env file and provide the appropriate environment (security) values for the server.
 6. while in the server directory, execute `npm run dev` 
 7. `cd  ../client-app`
 8.  Run `npm install` to install all required npm packages or dependencies for the react app.
 9. In the .env file, ensure that the REACT_RECAPTCHA_SITE_KEY has an actual api key.
 10. Execute `npm start` to spin the react server.
 11. The system renders on the preferred port in the default browser.
 12. The system has a minimalist interface, for first time user, you can sign up, where your password strength would be printed, and also you would tested to know if you are human and not a robot using the google captcha api.
 13. After a successful signup, a user is redirected to the sign-in page to sign, this page also implements a 2 factor authentication through one time token via email.
 14. Once the user successfully logs in, a dashboard is presented where a user can log some message for it to be displayed, the user can log out safely and be sure that his/her credentials would not be used by another user to access the system 


# Project design and architcture

# Project flow

# Sources / References