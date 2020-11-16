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
test("all the employees returned by the search have the specified registration date", () => {
  const data = app.searchEmployeesByDate(employee.date);
  const returnedEmployees = data["employees"];
  const msg = data["msg"];

  // verifies if all the employees returned by the search have the specified registration date
  returnedEmployees.forEach((returnedEmployee) => {
    expect(returnedEmployee.date).toEqual(employee.date);
  });

  // verifies if the returned msg is the expected one
  expect(msg).toEqual("Busca realizada com sucesso!");
});

// testing if
test("the search returns all the employees with the specified registration date", () => {
  const data = app.searchEmployeesByDate(employee.date);
  const returnedEmployees = data["employees"];
  const msg = data["msg"];

  // verifies if the search returns all the employees with the specified registration date
  expect(returnedEmployees).toContainEqual(employee);

  // verifies if the returned msg is the expected one
  expect(msg).toEqual("Busca realizada com sucesso!");
});

// testing if
test("no employee is returned by the search", () => {
  const data = app.searchEmployeesByDate("00/00/0000");
  const returnedEmployee = data["employees"];
  const msg = data["msg"];

  // verifies if the employees array is empty and if the msg is the expected one
  expect(returnedEmployee.length).toEqual(0);
  expect(msg).toEqual("Nenhum funcionário encontrado!");
});
