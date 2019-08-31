A fullstack React/express blog using React hooks 

This Project was bootstrapped with create-react-app

download or git clone the project files.


## cd into both Project Directories in 2 different terminal windows and then install the dependencies

The "Client" directory contains the React code. The "Server" directory contains the code for the node.js express server. This project requries a PSQL database to run. This project also requires setting up an app on auth0. 

For intructions on installing PSQL visit the offical PSQL website:
<br />
https://www.postgresql.org/ 



#### 1st window
`cd Client`

#### 2nd window
`cd Server`

#### 1st window
`npm install` 

#### 2nd window
`npm install` 

<br />

### Run both the server and client at the same time

#### 1st window 
`npm start`
(runs react at localhost:3000)

#### 2nd window 
`npm run devstart` 
(devstart runs nodemon at localhost:5000)


### Set up PSQL

<ol>
  <li>Open the PSQL shell and login to PSQL</li>
  <li>Create a new PSQL database if you have not already done so. </li>
  <li>Simply copy the SQL code in the Server/main/schema.sql file and paste it in as commands into the PSQL shell.  </li> 
  <li> In the Server/main/db.js file replace the code with the login info for your own PSQL database. </li>
  <li> After setting up the PSQL database and making the required adjustments in the db.js file, the app will be fully functional. </li> 
</ol>




### (Optional) Set up auth0 
You can optionally create your own auth0 app and subsitute the credentials in the Client/utils/auth.js file. You can also just use the default credentials I have provided. 

