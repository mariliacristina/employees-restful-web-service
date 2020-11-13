// importing and instantiating express
const express = require("express");
const app = express();

const cors = require("cors");
const fs = require("fs");
const path = require('path');

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
  if(searchFor === "name") return searchEmployeesByName(employeeData);
  if(searchFor === 'cpf') return searchEmployeesByCpf(employeeData);
  /*
  if(searchFor === 'position') searchEmployeesByPosition(employeeData);
    if(searchFor === 'date') searchEmployeesByDate(employeeData);
    if(searchFor === 'uf') searchEmployeesByUf(employeeData);
    if(searchFor === 'salary') searchEmployeesBySalary(employeeData);
    if(searchFor === 'status') searchEmployeesByStatus(employeeData);
    */
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

      const employee = {name, cpf, position, date, uf, salary, status};
    
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

      const employee = {name, cpf, position, date, uf, salary, status};
      
      return employee;
    }
  }
}
