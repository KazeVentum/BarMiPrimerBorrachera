import * as empleado from "./empleado.js";

document.getElementById('createEmployee_btn').addEventListener("click", function() {
    empleado.crearEmpleados()
})

document.getElementById('showEmployee_btn').addEventListener("click", function() {
    empleado.MostrarEmpleados()
})

document.getElementById('edit-btn').addEventListener("click", function() {
    empleado.editEmployee()
})

document.getElementById('deleteEmployee_btn').addEventListener("click", function() {
    empleado.EliminarEmpleados()
})