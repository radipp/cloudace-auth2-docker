//cloudace-auth2 v1.0
//Program that give API services to sign up and login, the lgon data is 
//Created by Radifan Cahya Pradana for Cloud Ace Cloud Developer Employment Test


//Imports, express is used to create URL-route based app, devDB is for database connection, 
const express = require('express');
const app = express();
const devDBConnection = require('./database');

//Funtions to create hash for password, create user ID, and checking wether the requests send from API client fullfil the requirements
let createHash = require('./createHash');
let createID = require('./createID');
let checkRequest = require('./checkRequest')

//JSON body parser embedded in express package
app.use(express.json());

//Testing API, to check if the app works or not
app.get('/api/test', (request, response) => response.send("You're Accessing API, this is a test API"));

//API for signup, POST email and password to this URL to signup to the database
app.post('/api/signup', function(request,response) {

    //Check if the request fullfil the format or not
    if(checkRequest(request.body.email,request.body.password) == false) {

        response.send("There's an error in processing your request, make sure that the email and password are filled out")
    } else {
        //Check if Email is taken or not
        devDBConnection.query("SELECT email FROM `user_table` WHERE email = ?",request.body.email,function(error, results) {
            
            if (error) throw error;

            if (!Object.keys(results).length) {
                //if The Email is Available, hash password, create ID, and insert to database
                var hashedPassword = createHash(request.body.password);
                var userID = createID(request.body.email);
                var insertSQLSyntax = "INSERT INTO user_table(id, email, password) VALUES(?,?,?)";
                var userSQLEntry = [userID, request.body.email, hashedPassword];
                console.log(userSQLEntry);

                devDBConnection.query(insertSQLSyntax, userSQLEntry ,function(insertError, insertResults) {
                    if (insertError) throw insertError;
                    console.log("Succesfully Added Row:" +insertResults.affectedRows);
                })

                response.send("Account Created!");

            } else {
                //If the email is already taken
                response.send("This Email is already registered, please use other email");
            }

        });
    }
    
});

//API for signin, POST email and password
app.post('/api/signin', function(request,response) {

    //Check if the request meets the format
    if(checkRequest(request.body.email,request.body.password) == false) {
        response.send("There's an error in processing your request, make sure that the email and password are filled out")
    } else {

        //Hash password from request
        hashedPassword = createHash(request.body.password);

        //Check if the email is registered, if it's regsitered, check if the hashed password is the same as the request password
        devDBConnection.query("SELECT email,password FROM `user_table` WHERE email = ?",request.body.email,function(error, results) {
            if (!Object.keys(results).length) {
                response.send("The Email is not registered");

            } else {
                if (results[0].password.trim() === hashedPassword.trim()) {
                    response.send("Logged In...");
                } else {
                    response.send("Wrong Password");
                }

            }
            
        });
    }
});

//Api uses Port 4200 
app.listen(4199, () => console.log('The Server is Up and Listening'));