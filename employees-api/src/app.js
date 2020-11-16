const express = require("express");
const app = express();

const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");

app.use(bodyParser.json());
app.use(cors());

// server listening  on port 3000
if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "swagger") {
  app.listen(3000);
}

// swagger graphical interface
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// get function
app.get("/api/employees", (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.description = 'Endpoint to get an employee.'
  */

  /* #swagger.parameters['searchFor'] = {
               description: 'Search type used. Ex: name, cpf, job position...',
               type: 'string'
        } 
      #swagger.parameters['employeeData'] = {
               description: 'Employee data.',
               type: 'string or array'
        }
  */

  const searchFor = req.query.searchFor;
  const employeeData = req.query.employeeData;

  data = searchEmployees(searchFor, employeeData);

  /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/Employee" },
               description: 'Employee found!' 
        } 
  */
  res.status(200).send(data);
});

// post function
app.post("/api/employees/post", (req, res) => {
  /* #swagger.tags = ['Employees']
     #swagger.description = 'Endpoint to add an employee or update if it already exists.' 
  */

  /* #swagger.parameters['employee'] = {
               in: 'body',
               description: 'Employee informations.',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/AddEmployee" }
        } 
  */

  const employee = req.body;
  const msg = addEmployee(employee);

  // #swagger.responses[201] = { description: 'Employee added or updated successfully!' }
  res.status(201).json({ status: msg });
});

// delete function
app.delete("/api/employees/delete", (req, res) => {
  /* #swagger.tags = ['Employees']
     #swagger.description = 'Endpoint to delete an employee.' 
  */

  /* #swagger.parameters['cpf'] = {
               in: 'body.cpf',
               description: 'Employee cpf.',
               required: true,
               type: 'string',
               schema: { $ref: "#/definitions/DeleteEmployee" }
        } 
  */

  const cpf = req.body.cpf;
  const msg = deleteEmployee(cpf);

  // #swagger.responses[200] = { description: 'Employee successfully removed!' }
  res.status(200).json({ status: msg });
});

// searchs the employees based on the searchFor option
function searchEmployees(searchFor, employeeData) {
  if (searchFor === "name") return searchEmployeesByName(employeeData);
  if (searchFor === "cpf") return searchEmployeesByCpf(employeeData);
  if (searchFor === "position") return searchEmployeesByPosition(employeeData);
  if (searchFor === "date") return searchEmployeesByDate(employeeData);
  if (searchFor === "uf") return searchEmployeesByUf(employeeData);
  if (searchFor === "salary") return searchEmployeesBySalary(employeeData);
  if (searchFor === "status") return searchEmployeesByStatus(employeeData);
}

// search employees by name
function searchEmployeesByName(employeeName) {
  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

  const employees = [];

  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(";"); // separating the fields of an employee

    // getting the name of the current employee
    const name = line[3];

    // checking if the current employee is the searched one
    if (name === employeeName) {
      // getting the other fields
      const date = line[0];
      const position = line[1];
      const cpf = line[2];
      const uf = line[4];
      const salary = line[5];
      const status = line[6];

      const employee = { name, cpf, position, date, uf, salary, status };

      employees.push(employee);
    }
  }

  let msg;
  if (employees.length == 0) {
    msg = "Nenhum funcionário encontrado!";
  } else {
    msg = "Busca realizada com sucesso!";
  }

  return { employees, msg };
}

// search employees by cpf
// returns also the employee line number in funcionarios.txt
// (line number is used in the updating and deleting functions)
function searchEmployeesByCpf(employeeCpf) {
  // removes "." and "-" from employee.cpf
  let cpfFormated = employeeCpf.replace(/[^0-9]/g, "");

  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(";"); // separating the fields of an employee

    // getting the cpf of the current employee
    const cpf = line[2];

    // checking if the current employee is the searched one
    if (cpf === cpfFormated) {
      // getting the other fields
      const date = line[0];
      const position = line[1];
      const name = line[3];
      const uf = line[4];
      const salary = line[5];
      const status = line[6];

      const employee = { name, cpf, position, date, uf, salary, status };

      let msg = "Busca realizada com sucesso!";
      return { employees: employee, i, msg };
    }
  }

  return {employees: undefined, i: -1, msg: "Nenhum funcionário encontrado!"};
}

// search employees by position
function searchEmployeesByPosition(employeePosition) {
  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

  const employees = [];

  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(";"); // separating the fields of an employee

    // getting the position of the current employee
    const position = line[1];

    // checking if the current employee is the searched one
    if (position === employeePosition) {
      // getting the other fields
      const date = line[0];
      const cpf = line[2];
      const name = line[3];
      const uf = line[4];
      const salary = line[5];
      const status = line[6];

      const employee = { name, cpf, position, date, uf, salary, status };

      employees.push(employee);
    }
  }

  let msg;
  if (employees.length == 0) {
    msg = "Nenhum funcionário encontrado!";
  } else {
    msg = "Busca realizada com sucesso!";
  }

  return { employees, msg };
}

// search employees by date
function searchEmployeesByDate(employeeDate) {
  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

  const employees = [];

  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(";"); // separating the fields of an employee

    // getting the date of the current employee
    const date = line[0];

    // checking if the current employee is the searched one
    if (date === employeeDate) {
      // getting the other fields
      const position = line[1];
      const cpf = line[2];
      const name = line[3];
      const uf = line[4];
      const salary = line[5];
      const status = line[6];

      const employee = { name, cpf, position, date, uf, salary, status };

      employees.push(employee);
    }
  }

  let msg;
  if (employees.length == 0) {
    msg = "Nenhum funcionário encontrado!";
  } else {
    msg = "Busca realizada com sucesso!";
  }

  return { employees, msg };
}

// search employees by birthday uf
function searchEmployeesByUf(employeeUf) {
  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

  const employees = [];

  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(";"); // separating the fields of an employee

    // getting the uf of the current employee
    const uf = line[4];

    // checking if the current employee is the searched one
    if (uf === employeeUf) {
      // getting the other fields
      const date = line[0];
      const position = line[1];
      const cpf = line[2];
      const name = line[3];
      const salary = line[5];
      const status = line[6];

      const employee = { name, cpf, position, date, uf, salary, status };

      employees.push(employee);
    }
  }

  let msg;
  if (employees.length == 0) {
    msg = "Nenhum funcionário encontrado!";
  } else {
    msg = "Busca realizada com sucesso!";
  }

  return { employees, msg };
}

// search employees by salary range
function searchEmployeesBySalary(employeeSalary) {
  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

  const employees = [];

  const minSalary = parseFloat(employeeSalary[0]);
  const maxSalary = parseFloat(employeeSalary[1]);

  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(";"); // separating the fields of an employee

    // getting the salary of the current employee
    const salary = line[5];

    // checking if the current employee is the searched one
    if (salary >= minSalary && salary <= maxSalary) {
      // getting the other fields
      const date = line[0];
      const position = line[1];
      const cpf = line[2];
      const name = line[3];
      const uf = line[4];
      const status = line[6];

      const employee = { name, cpf, position, date, uf, salary, status };

      employees.push(employee);
    }
  }

  let msg;
  if (employees.length == 0) {
    msg = "Nenhum funcionário encontrado!";
  } else {
    msg = "Busca realizada com sucesso!";
  }

  return { employees, msg };
}

// search employees by status
function searchEmployeesByStatus(employeeStatus) {
  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

  const employees = [];

  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(";"); // separating the fields of an employee

    // getting the status of the current employee
    const status = line[6];

    // checking if the current employee is the searched one
    if (status === employeeStatus) {
      // getting the other fields
      const date = line[0];
      const position = line[1];
      const cpf = line[2];
      const name = line[3];
      const uf = line[4];
      const salary = line[5];

      const employee = { name, cpf, position, date, uf, salary, status };

      employees.push(employee);
    }
  }

  let msg;
  if (employees.length == 0) {
    msg = "Nenhum funcionário encontrado!";
  } else {
    msg = "Busca realizada com sucesso!";
  }

  return { employees, msg };
}

// removes the line "employeeLine" from the funcionarios.txt
function removeLine(employeeLine) {
  const fileData = fs
    .readFileSync(
      path.resolve(__dirname, "./fake-db/funcionarios.txt"),
      "utf-8"
    )
    .split(/\r?\n/);

  // removes the line and the one above it (because its a blank line)
  const firstPart = fileData.slice(0, employeeLine - 1);
  const secondPart = fileData.slice(employeeLine + 1, fileData.length);
  const newData = firstPart.concat(secondPart);

  // deletes the content of the file
  fs.writeFileSync(path.resolve(__dirname, "./fake-db/funcionarios.txt"), "");

  // writes the new content
  newData.forEach((line, index) => {
    if (index !== newData.length - 1) line += "\r\n";

    fs.writeFileSync(
      path.resolve(__dirname, "./fake-db/funcionarios.txt"),
      line,
      { flag: "a+" }
    );
  });
}

// adds an employee to the end of the file funcionarios.txt
function addEmployee(employee) {
  // returned message stating if it was an insert or update operation
  let msg = "Funcionário inserido com sucesso!";

  // removes "." and "-" from employee.cpf
  let cpfFormated = employee.cpf.replace(/[^0-9]/g, "");

  // search the employee. If it exists, delete its line and add a new one after
  const employeeInfo = searchEmployeesByCpf(cpfFormated);

  // update operation
  if (employeeInfo['employees'] !== undefined) {
    const employeeLine = employeeInfo['i'];

    removeLine(employeeLine);

    msg = "Funcionário atualizado com sucesso!";
  }

  let data = "\n";

  data +=
    employee.date +
    ";" +
    employee.position +
    ";" +
    cpfFormated +
    ";" +
    employee.name +
    ";" +
    employee.uf +
    ";" +
    employee.salary +
    ";" +
    employee.status +
    "\n";

  // writes the data about the employee
  fs.writeFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    data,
    { flag: "a+" }
  );

  return msg;
}

// deletes the employee with the "employeeCpf"
function deleteEmployee(employeeCpf) {
  // returned message
  let msg;

  // removes "." and "-" from employee.cpf
  let cpfFormated = employeeCpf.replace(/[^0-9]/g, "");

  // search the employee. If it exists, delete its line
  const employeeInfo = searchEmployeesByCpf(cpfFormated);

  // delete operation
  if (employeeInfo['employees'] !== undefined) {
    const employeeName = employeeInfo['employees'].name;
    const employeeLine = employeeInfo['i'];

    removeLine(employeeLine);

    msg = "Funcionário " + employeeName + " removido com sucesso!";
    return msg;
  }

  msg = "Funcionário não existe!";
  return msg;
}

// exporting functions to be tested
module.exports = {
  searchEmployeesByName,
  searchEmployeesByCpf,
  searchEmployeesByPosition,
  searchEmployeesByDate,
  searchEmployeesByUf,
  searchEmployeesBySalary,
  searchEmployeesByStatus,
  addEmployee,
  deleteEmployee,
};
