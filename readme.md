# Plex Vote
A web app for voting on Plex media.

Requirements:
* Node JS
* MySQL

## Setup

### Configuration
After cloning the repository, copy the example config file as "config.js":

`cp config.example.js config.js`

You will need to specify the following:
* A port to run the app on
* Plex server settings
* MySQL connection settings
* A secret (Used for password hashing and JWT signatures)

To test your configuration, run:

`npm run test`

### Initialization

Once configuration is complete, run:

`npm run init`

This will:
* Install dependencies
* Build the project
* Create database tables

## Start

After completing all setup steps, the app can be started with:

`npm start`

Note, however, that this will require you to leave your terminal open to keep the app running. It is recommended that you use a process manager such as [pm2](https://www.npmjs.com/package/pm2) to manage your Node JS apps.
