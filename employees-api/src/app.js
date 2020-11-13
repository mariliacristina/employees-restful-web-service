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
  if (searchFor === "name") {
    return searchEmployeesByName(employeeData);
  }
  /*
    if(searchFor === 'cpf') searchEmployeesByCpf(employeeData);
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
    const line = lines[i].split(";");
    if (line[3] === employeeName) {
      return line[0];
    }
  }
}
