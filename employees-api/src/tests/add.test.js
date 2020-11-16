const app = require("../app");

// employee to be added
const newEmployee = {
  name: "Employee Name",
  cpf: "12345678911",
  position: "Dev Jr",
  date: "15/11/2020",
  uf: "CE",
  salary: "2500",
  status: "ATIVO",
};

// testing if
test("the new employee is successfully added and the message returned is the correct one", () => {
  // adds the new employee
  let msg = app.addEmployee(newEmployee);

  // verifies if the returned message is the expected one
  expect(msg).toEqual("Funcionário inserido com sucesso!");

  // searches by his cpf
  const returnedEmployee = app.searchEmployeesByCpf(newEmployee.cpf)['employees'];

  // verifies if the new employee is the returned one
  expect(returnedEmployee).toEqual(newEmployee);

  // deletes the employee
  msg = app.deleteEmployee(newEmployee.cpf);

  // verifies if the returned message is the expected one
  expect(msg).toEqual(
    "Funcionário " + newEmployee.name + " removido com sucesso!"
  );
});
