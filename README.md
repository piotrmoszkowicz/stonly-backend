# stonly-backend [![Build Status](https://travis-ci.com/piotrmoszkowicz/stonly-backend.svg?token=xekqxJ6rqHWZ9UVWqDYR&branch=master)](https://travis-ci.com/piotrmoszkowicz/stonly-backend)

Recruitment task for Stonly.

## Requirements

Following stuff must be installed in order to make app work correctly:

* [Node.js](https://nodejs.org) version 10.15.3

## Tasks

Task                     | Description
-----                    | -----------
`dev`                    | Serves develop version of the app (via nodemon + adds debugger params)
`check`                  | `npm run style && npm test`
`eslint`                 | Fixes styling by ESLint
`start`                  | Serves app
`style`                  | Reformats and checks for code style rules
`prettier`               | Fixes styling by Prettier
`reformat`               | `npm run prettier && npm run eslint`
`test`                   | Runs unit tests

## Config

To run locally, first of all you need to add local-development.js file in /config. Use development.js file as a template for it. You need to fill out database credentials etc.

I suggest running MySQL 5.7 via docker (`docker run -d -p 3306:3306 --name mysql mysql:5.7`), than creating the database.

Migration should be done by itself.

WHen you occur problems with migrations - you can use forceMigrate parameter in config.
