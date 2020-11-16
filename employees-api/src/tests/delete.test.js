const app = require("../app");

// employee to be added and then deleted
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
test("the employee is successfully deleted and the message returned is the correct one", () => {
    // adds the employee
  let msg = app.addEmployee(employee);

  // verifies if the returned message is the expected one
  expect(msg).toEqual("Funcionário inserido com sucesso!");

  // deletes the employee
  msg = app.deleteEmployee(employee.cpf);

  // verifies if the returned message is the expected one
  expect(msg).toEqual(
    "Funcionário " + employee.name + " removido com sucesso!"
  );

  // searches the employee and verifies that he does not exists anymore
  const data = app.searchEmployeesByCpf(employee.cpf);
  expect(data['employees']).toBeUndefined();
  expect(data['msg']).toEqual("Nenhum funcionário encontrado!");
});

// testing if
test("the employee to be deleted does not exists and the message returned is the correct one", () => {
  // deletes the employee
  msg = app.deleteEmployee(employee.cpf);

  // verifies if the returned message is the expected one
  expect(msg).toEqual("Funcionário não existe!");
});
