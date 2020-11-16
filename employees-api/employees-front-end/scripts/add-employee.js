const addForm = document.getElementById("add-form");

// when submitting the insertion form, calls the post function
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
  axios
    .post("http://localhost:3000/api/employees/post", employee)
    .then((response) => {
      alert(response.data.status);
      addForm.reset();
    })
    .catch((error) => console.log(error));
}

// only allows numbers to be entered in the cpf, date and salary fields
$("#cpf").on("keypress", function (event) {
  var key = event.key; // key value

  if (isNaN(key)) return false;
});

$("#date").on("keypress", function (event) {
  var key = event.key; // key value

  if (isNaN(key)) return false;
});

$("#salary").on("keypress", function (event) {
  var key = event.key; // key value

  if (isNaN(key)) return false;
});
