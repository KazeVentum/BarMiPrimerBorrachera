import * as empleado from "./empleado.js";

document.getElementById('createEmployee_btn').addEventListener("click", function() {
    empleado.crearEmpleados()
})

document.getElementById('editEmployee_btn').addEventListener("click", function() {
    empleado.editarEmpleados()
})

document.getElementById('deleteEmployee_btn').addEventListener("click", function() {
    empleado.EliminarEmpleados()
})