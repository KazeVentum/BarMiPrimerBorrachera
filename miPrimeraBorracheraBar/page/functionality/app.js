import * as empleado from "./empleado.js";
import * as sede from "./sede.js";

//Empleado
document.getElementById('createEmployee_btn').addEventListener("click", function() {
    empleado.crearEmpleados()
})

document.getElementById('showEmployee_btn').addEventListener("click", function() {
    empleado.MostrarEmpleados()
})


//Sede
document.getElementById('createSede_btn').addEventListener("click", function() {
    sede.CrearSedes()
})

document.getElementById('showSede_btn').addEventListener("click", function() {
    sede.MostrarSedes()
})

