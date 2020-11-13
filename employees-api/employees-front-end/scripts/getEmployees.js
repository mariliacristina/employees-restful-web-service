const searchForm = document.getElementById("search-form");
const searchFor = document.getElementById("search-for");
const employeeData = document.getElementById("employee-data");

searchForm.addEventListener("submit", function (event) {
  searchEmployee(searchFor.value, employeeData.value);
  event.preventDefault();
});

function searchEmployee(searchForValue, employeeDataValue) {
  axios
    .get("http://localhost:3000/api/employees", {
      params: {
        searchFor: searchForValue,
        employeeData: employeeDataValue,
      },
    })
    .then((response) => getEmployees(response.data))
    .catch((error) => console.log(error));
}

const getEmployees = (employees) => {
  const employeesList = document.getElementById("employees-list");
  const employeeItem = document.createElement("li");
  employeeItem.innerHTML = `Nome: ${employees}`;
  employeesList.appendChild(employeeItem);

  /*
  employees.map((employee) => {
    const employeeItem = document.createElement("li");
    employeeItem.innerHTML = `Nome: ${employee.name}`;
    employeesList.appendChild(employeeItem);
  });
  */
};
