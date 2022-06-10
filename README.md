# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend. 

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation Instructions
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`npm install`

### Packages

Here are some of the few packages that were installed.

#### express
`npm i -S express`
`npm i -D @types/express`

#### typescript
`npm i -D typescript`

#### db-migrate
`npm install -g db-migrate`

#### cors
`npm install --save cors`

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### morgan 
`npm install --save morgan`
`npm -i -D @types/morgan`

#### jsonwebtoken
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### cross-env
`npm install --save-dev cross-env`

#### jasmine
`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`


## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER postgres WITH PASSWORD 'Sheta';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefront;`
    - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c storefront`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
    - Grant for test database
        - `\c storefront_test`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`db-migrate up`


## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in developement and testing but not in production. 
```
POSTGRES_HOST=localhost
POSTGRES_DB=storefront
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Sheta
POSTGRES_PORT=5550
BCRYPT_PASSWORD=speak-friend-and-enter
SALT_ROUNDS=10
TOKEN=MAHMOUD-SHETA
ENV=dev

```

## Start App
`npm run start`


### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 


## Important Notes 

### Changing Enviroment to testing 
I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database. 

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command` will set this variable to `testing` in the package.json. Here is the complete command.
`npm run test-up && cross-env ENV=test jasmine- && npm run test-down`

The first command migrates all tables then the second command changes the enviroment variable `ENVI` to testing, then the jasmine is run and then after testing, the database is reset. 

Note the `cross-env` in command above. Since this may have some issues in Windows, I had to use this pakcage [cross-env](https://www.npmjs.com/package/cross-env) to take care of it. This permits the changing of environment variable this way to work for all platforms