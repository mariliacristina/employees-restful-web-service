// importing and instantiating express
const express = require("express");
const app = express();

const cors = require("cors");
const fs = require("fs");
const path = require("path");

/*
const employees = [
    {
      name: 'Aluno1',
      age: 12
    },
    {
      name: 'Aluno2',
      age: 13
    },
    {
      name: 'Aluno3',
      age: 14
    }
  ]
*/

app.use(cors());

app.get("/api/employees", (req, res) => {
  const searchFor = req.query.searchFor;
  const employeeData = req.query.employeeData;

  employees = searchEmployees(searchFor, employeeData);
  res.send(employees);
});

// server listening  on port 3000
app.listen(3000);

function searchEmployees(searchFor, employeeData) {
  if (searchFor === "name") return searchEmployeesByName(employeeData);
  if (searchFor === "cpf") return searchEmployeesByCpf(employeeData);
  if (searchFor === "position") return searchEmployeesByPosition(employeeData);
  if (searchFor === "date") return searchEmployeesByDate(employeeData);
  if (searchFor === 'uf') return searchEmployeesByUf(employeeData);
  if (searchFor === 'salary') return searchEmployeesBySalary(employeeData);
  if (searchFor === 'status') return searchEmployeesByStatus(employeeData);
}

function searchEmployeesByName(employeeName) {
  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

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

      return employee;
    }
  }
}

function searchEmployeesByCpf(employeeCpf) {
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
    if (cpf === employeeCpf) {
      // getting the other fields
      const date = line[0];
      const position = line[1];
      const name = line[3];
      const uf = line[4];
      const salary = line[5];
      const status = line[6];

      const employee = { name, cpf, position, date, uf, salary, status };

      return employee;
    }
  }
}

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

  return employees;
}

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

  return employees;
}

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

  return employees;
}

function searchEmployeesBySalary(employeeSalary) {
  data = fs.readFileSync(
    path.resolve(__dirname, "./fake-db/funcionarios.txt"),
    "utf-8"
  );

  const employees = [];

  const salarySplit = employeeSalary.split('-');
  const minSalary = salarySplit[0].split(' ')[0];
  const maxSalary = salarySplit[1].split(' ')[1];

  const lines = data.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(";"); // separating the fields of an employee

    // getting the salary of the current employee
    const salary = line[5];

    // checking if the current employee is the searched one
    if ((salary >= minSalary) && (salary <= maxSalary)) {
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

  return employees;
}

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

  return employees;
}

