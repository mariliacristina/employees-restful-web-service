const app = require("../app");

// employee to be updated
const employee = {
  name: "Employee Name",
  cpf: "12345678911",
  position: "Dev Jr",
  date: "15/11/2020",
  uf: "CE",
  salary: "2500",
  status: "ATIVO",
};

// testing if
test("the employee is successfully updated and the message returned is the correct one", () => {
  // adds the employee
  let msg = app.addEmployee(employee);

  // verifies if the returned message is the expected one
  expect(msg).toEqual("Funcionário inserido com sucesso!");

  // updates his status to "BLOQUEADO"
  employee.status = "BLOQUEADO";

  // updates the employee informations
  msg = app.addEmployee(employee);

  // searches by his cpf
  const returnedEmployee = app.searchEmployeesByCpf(employee.cpf)['employees'];

  // verifies if the updated employee is the returned one
  expect(returnedEmployee).toEqual(employee);

  // verifies if the returned message is the expected one
  expect(msg).toEqual("Funcionário atualizado com sucesso!");

  // deletes the employee
  msg = app.deleteEmployee(employee.cpf);

  // verifies if the returned message is the expected one
  expect(msg).toEqual(
    "Funcionário " + employee.name + " removido com sucesso!"
  );
});
