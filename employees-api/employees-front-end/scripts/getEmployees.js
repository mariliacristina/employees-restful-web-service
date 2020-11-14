const nameForm = document.getElementById("name-form");
const cpfForm = document.getElementById("cpf-form");
const positionForm = document.getElementById("position-form");
const dateForm = document.getElementById("date-form");
const ufForm = document.getElementById("uf-form");
const salaryForm = document.getElementById("salary-form");
const statusForm = document.getElementById("status-form");

// when submiting the forms, calls the get function
nameForm.addEventListener("submit", function (event) {
  const inputName = document.getElementById("name");
  getEmployee("name", inputName.value);

  event.preventDefault();
});

cpfForm.addEventListener("submit", function (event) {
  const inputCpf = document.getElementById("cpf");
  getEmployee("cpf", inputCpf.value);

  event.preventDefault();
});

positionForm.addEventListener("submit", function (event) {
  const inputPosition = document.getElementById("position");
  getEmployee("position", inputPosition.value);

  event.preventDefault();
});

dateForm.addEventListener("submit", function (event) {
  const inputDate = document.getElementById("date");
  getEmployee("date", inputDate.value);

  event.preventDefault();
});

ufForm.addEventListener("submit", function (event) {
  const inputUf = document.getElementById("uf");
  getEmployee("uf", inputUf.value);

  event.preventDefault();
});

salaryForm.addEventListener("submit", function (event) {
  const inputMinSalary = document.getElementById("min-salary");
  const inputMaxSalary = document.getElementById("max-salary");

  getEmployee("salary", [inputMinSalary.value, inputMaxSalary.value]);

  event.preventDefault();
});

statusForm.addEventListener("submit", function (event) {
  const inputStatus = document.getElementById("status");
  getEmployee("status", inputStatus.value);

  event.preventDefault();
});


// only allows numbers to be entered in the cpf, date and salary range fields
$("#cpf").on("keypress", function (event) {
  var key = event.key; // key value

  if (isNaN(key)) return false;
});

$("#date").on("keypress", function (event) {
  var key = event.key; // key value

  if (isNaN(key)) return false;
});

$("#min-salary").on("keypress", function (event) {
  var key = event.key; // key value

  if (isNaN(key)) return false;
});

$("#max-salary").on("keypress", function (event) {
  var key = event.key; // key value

  if (isNaN(key)) return false;
});


function getEmployee(searchForValue, employeeDataValue) {
  axios
    .get("http://localhost:3000/api/employees", {
      params: {
        searchFor: searchForValue,
        employeeData: employeeDataValue,
      },
    })
    .then((response) => showEmployees(response.data))
    .catch((error) => console.log(error));
}

// shows the employees returned by the server
// employees can be of two types: an object or an array of objects
const showEmployees = (employees) => {
  // getting the employees table and cleaning it
  const employeesTable = document.getElementById("employees-table");
  employeesTable.textContent = "";

  // handling the case that no employee is returned
  if (Array.isArray(employees)) {
    if (employees.length == 0) {
      alert("Nenhum funcionário encontrado!");
      return;
    }
  } else {
    if (employees === "") {
      alert("Nenhum funcionário encontrado!");
      return;
    }
  }

  // creating the head of the table
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  const thName = document.createElement("th");
  thName.innerHTML = "Nome";
  const thCpf = document.createElement("th");
  thCpf.innerHTML = "CPF";
  const thPosition = document.createElement("th");
  thPosition.innerHTML = "Cargo";
  const thDate = document.createElement("th");
  thDate.innerHTML = "Data de Cadastro";
  const thUf = document.createElement("th");
  thUf.innerHTML = "UF de Nascimento";
  const thSalary = document.createElement("th");
  thSalary.innerHTML = "Salário";
  const thStatus = document.createElement("th");
  thStatus.innerHTML = "Status";

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

  // if it was returned just one employee
  if (!Array.isArray(employees)) {
    const tr = document.createElement("tr");

    for (value of Object.values(employees)) {
      const td = document.createElement("td");
      td.innerHTML = value;
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
    employeesTable.appendChild(tbody);
  } else {
    employees.map((employee) => {
      const tr = document.createElement("tr");

      for (value of Object.values(employee)) {
        const td = document.createElement("td");
        td.innerHTML = value;
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
      employeesTable.appendChild(tbody);
    });
  }
};
