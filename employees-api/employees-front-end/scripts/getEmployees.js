const searchForm = document.getElementById("search-form");
const searchFor = document.getElementById("search-for");
const employeeData = document.getElementById("employee-data");

searchForm.addEventListener("submit", function (event) {
  getEmployee(searchFor.value, employeeData.value);

  event.preventDefault();
});

employeeData.addEventListener("keypress", function (event) {
  /**
nonInput: elements we consider nonInput
dataMask: we mask data-mask elements by default
watchInputs: watch for dynamically added inputs by default
watchDataMask: by default we disabled the watcher for dynamically
added data-mask elements by default (performance reasons)
**/

  $.jMaskGlobals = {
    maskElements: "input,td,span,div",
    dataMaskAttr: "*[data-mask]",
    dataMask: true,
    watchInterval: 300,
    watchInputs: true,
    watchDataMask: false,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
      0: { pattern: /\d/ },
      9: { pattern: /\d/, optional: true },
      "#": { pattern: /\d/, recursive: true },
      A: { pattern: /[a-zA-Z0-9]/ },
      S: { pattern: /[a-zA-Z]/ },
    },
  };

  var controlKeys = [
    8, // backspace
    16, // shift
    17, // ctrl
    35, // end
    36, // home
    37, // ←
    39, // →
    46, // delete
    13, // enter
    32, // space
  ];

  switch (searchFor.value) {
    case "name":
    case "position":
      employeeData.placeholder = "Digite aqui...";

      // name mask
      //$("#employee-data").mask('Z',{translation: {'Z': {pattern: /[a-zA-Z ]/, recursive: true}}});
      break;

    case "cpf":
      employeeData.placeholder = "Ex.: 000.000.000-00";

      // cpf mask
      /*
      $("#employee-data")
        .mask("999.999.999-99")
        .on("keydown", function (event) {
          var key = event.key; // key value
          var keyCode = event.keyCode || event.which; // key code

          if (isNaN(key) && !~controlKeys.indexOf(keyCode)) return false;
        });
      */
      break;

    case "date":
      employeeData.placeholder = "dd/mm/yyyy";
      break;

    case "salary":
      employeeData.placeholder = "min - max";
      break;

    case "status":
      employeeData.placeholder = "ATIVO, INATIVO ou BLOQUEADO";
      break;
  }
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

// showing the employees returned by the server
// employees can be of two types: an object or an array of objects
const showEmployees = (employees) => {
  // handling the case that no employee is returned
  if (Array.isArray(employees)) {
    if (employees.length == 0) {
      // getting the employees table
      const employeesTable = document.getElementById("employees-table");
      employeesTable.textContent = "";
      alert("Nenhum funcionário encontrado!");
      return;
    }
  } else {
    if (employees === "") {
      // getting the employees table
      const employeesTable = document.getElementById("employees-table");
      employeesTable.textContent = "";
      alert("Nenhum funcionário encontrado!");
      return;
    }
  }

  // getting the employees table
  const employeesTable = document.getElementById("employees-table");
  employeesTable.textContent = "";

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
