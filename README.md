# employees-restful-web-service
This project is a RESTful web service whose objective is to simulate a database, offering functions to search, insert, update and delete employees.

# Como fazer o setup
First, you need to install node and npm on your machine.

Then, inside the "employees-api" directory, open a terminal and install the dependencies with the following commands:
npm install express
npm install -save-dev nodemon
npm install cors
sudo npm install http-server -g
npm install --save body-parser
npm install swagger-autogen
npm install swagger-ui-express
npm install --save-dev jest

To run the http client, open a terminal in the "employees-api/employees-front-end" directory and run the following command:
http-server

To run the server, open a terminal in the "employees-api" directory and run the following command:
npm run dev

To generate the documentation via Swagger, open a terminal in the "employees-api" directory and run the following command:
npm run swagger-autogen

To see this documentation, type "http://localhost:3000/doc/" in a browser.

To run the unit tests, open a terminal in the "employees-api" directory and run the following command:
npm run test
