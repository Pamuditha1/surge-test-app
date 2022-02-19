-- Overview --

Application Architecture - MVC Architecture

Languages and Frameworks/Libraries - JavaScript, React, Node, Express, Mongoose



-- Configuration --

1.      Add .env file to the server folder with following keys

        JWT=<jwt key>
        
        MONGODB_URI=<database uri>
        
        TEST_DB=<testing database uri>
        

2.      Build the docker images from the docker-compose.yaml file

(command -> docker-compose build)

3.      Start the docker container using docker-compose.yaml file

(command -> docker-compose up)

4.      Then reach the address -> http://localhost:3000



-- Test Credentials --

username - testu

password - testuser
