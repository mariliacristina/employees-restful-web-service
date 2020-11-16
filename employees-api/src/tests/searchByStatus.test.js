const app = require("../app");

// employee to be searched
const employee = {
  name: "Aaron Aaberg",
  cpf: "85235708709",
  position: "Dev Jr",
  date: "15/04/2017",
  uf: "AP",
  salary: "8965.30",
  status: "ATIVO",
};

// testing if
test("all the employees returned by the search have the specified status", () => {
  const data = app.searchEmployeesByStatus(employee.status);
  const returnedEmployees = data['employees'];
  const msg = data['msg'];

  // verifies if all the employees returned by the search have the specified status
  returnedEmployees.forEach((returnedEmployee) => {
    expect(returnedEmployee.status).toEqual(employee.status);
  });

  // verifies if the returned message is the expected one
  expect(msg).toEqual("Busca realizada com sucesso!");
});

// testing if
test("the search returns all the employees with the specified status", () => {
  const data = app.searchEmployeesByStatus(employee.status);
  const returnedEmployees = data['employees'];
  const msg = data['msg'];

  // verifies if the search returns all the employees with the specified status
  expect(returnedEmployees).toContainEqual(employee);

  // verifies if the returned message is the expected one
  expect(msg).toEqual("Busca realizada com sucesso!");
});

// testing if
test("no employee is returned by the search", () => {
  const data = app.searchEmployeesByStatus("Not a Status");
  const returnedEmployee = data['employees'];
  const msg = data['msg'];
  
  // verifies if the employees array is empty and if the msg is the expected one
  expect(returnedEmployee.length).toEqual(0);
  expect(msg).toEqual("Nenhum funcionário encontrado!");
});