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

#### Front-end

There are 3 HTML pages: "index.html", "add-employee.html" and "delete-employee.html".
The "index.html" page searches for employees. Searches can be performed by: name, CPF, job position, registration date, birthday UF,
salary range or status.
The "add-employee.html" page inserts a new employee or updates an existing one.
The "delete-employee.html" page deletes an employee by CPF.

Each page has its javascript, where there are listerners for the search, insertion/update and delete forms.
When these forms are submitted, the data is passed to the server using the corresponding HTTP methods (get, post and delete). In the case of a search operation, the passed data is the search type chosen (Ex: name, CPF...) and the corresponding employee data.
In the case of a insertion/update operation, the passed data is the employee to be added or updated.
In the case of a delete operation, the passed data is the employee's CPF to be deleted.

When the server responds, the response data is displayed to the user. In the case of a successful search, the data of the returned employees is displayed on the "index.html" page. Otherwise, a message is displayed stating that there are no employees that match the provided data. In the case of insertion, update and delete, a message is displayed informing whether the operation was successful or not.

#### RESTful Web Services with JSON formatting

The server is responsible for receiving the data through the HTTP methods (get, post and delete). Then, it performs the search, insertion/update and delete operations in the "funcionarios.txt" file. 

In the get operation, the server receives the search type chosen by the user and the corresponding employee data. Then, he goes through the file looking for employees who match the passed data. In the case of a successful search, a array containing the employees are returned. Otherwise, a empty array is returned. In both cases, a message is returned stating whether the search was successful or not. 

In the post operation, an employee is received. The server calls the function that searches for an employee by CPF in order to check if the employee already exists. If it exists, this function returns the employee object and its line number. This line is deleted in the file and then its new line is appended to the end of the file. If it is a new employee, a line with his information is appended to the end of the file. Also, a message is returned stating whether an insert or update operation has been performed.

In the delete operation, a CPF is received. The server calls the function that searches for an employee by CPF in order to check if this employee exists. If it exists, this function returns the employee object and its line number in "funcionarios.txt". Then, this line is deleted from the file. In both cases, a message is returned stating wheter the employee was deleted or if it does not exist.

#### Unit Tests

The Unit Tests are in "src/tests". The files "search-by-[field].test.js" tests the search functions for the specified field ("field").
In these files, an object is created with the data of an existing employee. Then, the search function is called with its corresponding data and it is verified if the returned employees are the expected one. In addition, the case where there are no employees with the passed data is also verified. The search function is called with a data that does not correspond to any employee and then it is checked whether "undefined" is returned. In both cases, it is verified if the returned message is the expected one.

The file "add.test.js" tests the function of adding an employee.  An employee object is created and then the add function is perfomed with it. Then, a search is called with this employee's CPF to verify that he was actually added. Also, it is verified if the returned messages are the expected one. This employee is deleted in the end.

The file "update.test.js" tests the function of updating an employee. An employee object is created and then the add function is perfomed with it. Then, a field of this employee is changed	("status", in this test) and the add function is perfomed again with the updated employee. After, a search is called with this employee's CPF to verify that he was actually updated. Also, it is verified if the returned messages are the expected one. This employee is deleted in the end. 

The file "delete.test.js" tests the function of deleting an employee. An employee object is created and then the add function is perfomed with it. Then, the delete function is called with this employee's CPF. The search function by this CPF is called to verify that this employee was actually deleted. Also, it is verified if the returned messages are the expected one. This file also tests if the employee to be deleted does not exists and if the returned message states this.

