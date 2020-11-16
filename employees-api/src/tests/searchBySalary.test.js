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
test("all the employees returned by the search have salary within the range", () => {
    const minSalary = 8000;
    const maxSalary = 9000;
  
    const data = app.searchEmployeesBySalary([minSalary, maxSalary]);
    const returnedEmployees = data['employees'];
    const msg = data['msg'];
  
    // verifies if all the employees returned by the search have salary within the range
    returnedEmployees.forEach((returnedEmployee) => {
      expect(parseFloat(returnedEmployee.salary)).toBeGreaterThanOrEqual(minSalary);
      expect(parseFloat(returnedEmployee.salary)).toBeLessThanOrEqual(maxSalary);
    });

    // verifies if the returned message is the expected one
    expect(msg).toEqual("Busca realizada com sucesso!");
  });
  
  // testing if
  test("the search returns all the employees with salary within the range", () => {
    const minSalary = 8000;
    const maxSalary = 9000;
  
    const data = app.searchEmployeesBySalary([minSalary, maxSalary]);
    const returnedEmployees = data['employees'];
    const msg = data['msg'];
  
    // verifies if the search returns all the employees with salary within the range
    expect(returnedEmployees).toContainEqual(employee);

    // verifies if the returned message is the expected one
    expect(msg).toEqual("Busca realizada com sucesso!");
  });
  
  // testing if
  test("the search does not include an employee with salary outside the range", () => {
    const minSalary = 1000;
    const maxSalary = 2000;
  
    const data = app.searchEmployeesBySalary([minSalary, maxSalary]);
    const returnedEmployees = data['employees'];
    const msg = data['msg'];
  
    // verifies if the search does not include an employee with salary outside the range
    expect(returnedEmployees).not.toContainEqual(employee);

    // verifies if the returned message is the expected one
    expect(msg).toEqual("Busca realizada com sucesso!");
  });

  // testing if
test("no employee is returned by the search", () => {
  const data = app.searchEmployeesBySalary([0, 0]);
  const returnedEmployee = data['employees'];
  const msg = data['msg'];

  // verifies if the employees array is empty and if the msg is the expected one
  expect(returnedEmployee.length).toEqual(0);
  expect(msg).toEqual("Nenhum funcionário encontrado!");
});