const addForm = document.getElementById("add-form");

addForm.addEventListener("submit", function (event) {
    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const position = document.getElementById("position").value;
    const date = document.getElementById("date").value;
    const uf = document.getElementById("uf").value;
    const salary = document.getElementById("salary").value;
    const status = document.getElementById("status").value;

    const employee = { name, cpf, position, date, uf, salary, status };
    
    postEmployee(employee);
  
    event.preventDefault();
  });

  function postEmployee(employee) {
    axios.post('http://localhost:3000/api/employees/add', employee)
    .then((response) => alert(response.data.status))
    .catch((error) => console.log(error));
  }