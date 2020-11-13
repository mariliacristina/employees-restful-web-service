const searchForm = document.getElementById("search-form");
//const searchDataForm = document.getElementById("search-data-form");

searchForm.addEventListener("submit", function(event) {
  //searchEmployee(searchFor.value, employeeData.value);
  
  const searchFor = document.getElementById("search-for");
  const employeeData = document.getElementById("employee-data");

  searchEmployee(searchFor.value, employeeData.value);

  switch(searchFor.value) {
    case "cpf":
      employeeData.mask = "000.000.000-00";  

      break;

  }

  /*
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Buscar";
  searchDataForm.appendChild(submit);
  */

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
  // getting the employees table
  const employeesTable = document.getElementById("employees-table");
  employeesTable.textContent = '';

  // creating the head of the table
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  const thName = document.createElement("th");
  thName.innerHTML = 'Nome';
  const thCpf = document.createElement("th");
  thCpf.innerHTML = 'CPF';
  const thPosition = document.createElement("th");
  thPosition.innerHTML = 'Cargo';
  const thDate = document.createElement("th");
  thDate.innerHTML = 'Data de Cadastro';
  const thUf = document.createElement("th");
  thUf.innerHTML = 'UF de Nascimento';
  const thSalary = document.createElement("th");
  thSalary.innerHTML = 'Salário';
  const thStatus = document.createElement("th");
  thStatus.innerHTML = 'Status';

  trHead.appendChild(thName);
  trHead.appendChild(thCpf);
  trHead.appendChild(thPosition);
  trHead.appendChild(thDate);
  trHead.appendChild(thUf);
  trHead.appendChild(thSalary);
  trHead.appendChild(thStatus);

  thead.appendChild(trHead);
  employeesTable.appendChild(thead);

  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");
  
  for(value of Object.values(employees)) {
    const td = document.createElement("td");
    td.innerHTML = value;
    tr.appendChild(td);
  }

  tbody.appendChild(tr);
  employeesTable.appendChild(tbody);
  /*
  const employeeItem = document.createElement("li");
  employeeItem.innerHTML = `Nome: ${employees.salary}`;
  employeesList.appendChild(employeeItem);

  employees.map((employee) => {
    const employeeItem = document.createElement("li");
    employeeItem.innerHTML = `Nome: ${employee.name}`;
    employeesList.appendChild(employeeItem);
  });
  */
};
