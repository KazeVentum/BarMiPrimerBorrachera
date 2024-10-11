import * as empleado from "./empleado.js";

document.getElementById('createEmployee_btn').addEventListener("click", function() {
    empleado.crearEmpleados()
})

document.getElementById('showEmployee_btn').addEventListener("click", function() {
    empleado.MostrarEmpleados()
})

