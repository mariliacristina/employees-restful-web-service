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
test("the employee returned by the search have the specified cpf", () => {
  const data = app.searchEmployeesByCpf(employee.cpf);
  const returnedEmployee = data["employees"];
  const msg = data["msg"];

  // verifies if the employee is the returned one and if the msg is the expected one
  expect(returnedEmployee).toEqual(employee);
  expect(msg).toEqual("Busca realizada com sucesso!");
});

// testing if
test("no employee is returned by the search", () => {
  const data = app.searchEmployeesByCpf("00000000000");
  const returnedEmployee = data["employees"];
  const msg = data["msg"];

  // verifies if the employee is undefined and if the msg is the expected one
  expect(returnedEmployee).toBeUndefined();
  expect(msg).toEqual("Nenhum funcionário encontrado!");
});
