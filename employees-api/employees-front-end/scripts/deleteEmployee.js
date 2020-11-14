const deleteForm = document.getElementById("delete-form");

// when submitting the delete form, calls the delete function
deleteForm.addEventListener("submit", function (event) {
  const cpf = document.getElementById("cpf").value;

  deleteEmployee(cpf);

  event.preventDefault();
});

function deleteEmployee(cpf) {
  axios
    .delete("http://localhost:3000/api/employees/delete", {
      data: { cpf },
    })
    .then((response) => alert(response.data.status))
    .catch((error) => console.log(error));
}
