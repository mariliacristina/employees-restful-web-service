// importing and instantiating express
const express = require("express");
const app = express();

// importing lib cors
const cors = require("cors");

// importing lib fs
const fs = require("fs");

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
    "/home/marilia/Documents/employees-api/src/fake-db/funcionarios.txt",
    "utf-8"
  );

  const linhas = data.split(/\r?\n/);
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].split(";");
    if (linha[3] === employeeName) {
      return linha[0];
    }
  }
}
