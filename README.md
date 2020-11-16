# employees-restful-web-service
This project is a RESTful web service whose objective is to simulate a database, offering functions to search, insert, update and delete employees in a file.

# How to setup
First, you need to install node and npm on your machine.


Then, inside the "employees-api" directory, open a terminal and install the dependencies with the following commands:

$npm install express

$npm install -save-dev nodemon

$npm install cors

$sudo npm install http-server -g

$npm install --save body-parser

$npm install swagger-autogen

$npm install swagger-ui-express

$npm install --save-dev jest


To run the server, open a terminal in the "employees-api" directory and run the following command:

$npm run dev


To run the HTTP client, open a terminal in the "employees-api/employees-front-end" directory and run the following command:

$http-server


To use the front-end aplication, type "http://localhost:8080/" in a browser.


To generate the documentation via Swagger, open a terminal in the "employees-api" directory and run the following command:

$npm run swagger-autogen


To see this documentation, type "http://localhost:3000/doc/" in a browser.


To run the unit tests, open a terminal in the "employees-api" directory and run the following command:

$npm run test

# Proposed solution

This project uses HTML, CSS, JavaScript and Node.js. 

There are 3 HTML pages: index.html, add-employee.html and delete-employee.html.
The index.html page searches for employees. Searches can be performed by: name, cpf, job position, registration date, birthday uf,
salary range or status.
The add-employee.html page inserts a new employee or updates an existing one.
The delete-employee.html page deletes an employee by cpf.
Each page has its javascript, where there are listerners for the search, insertion/update and delete forms.
When these forms are submitted, the data is passed to the server using the corresponding HTTP methods (get, post and delete).
When the server responds, the response data is displayed to the user. In the case of a successful search, the data of the returned employees is displayed on the index.html page. Otherwise, a message is displayed stating that there are no employees that match the provided data. In the case of insertion, update and delete, a message is displayed informing whether the operation was successful or not.





