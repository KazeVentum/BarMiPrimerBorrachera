import * as empleado from "./empleado.js";
import * as sede from "./sede.js";
import * as producto from "./producto.js";
import * as mesa from "./mesa.js";
import * as inventario from "./inventario.js";

const formContainer = document.getElementById('showData');

window.onload = function() {
    fetch('./resources_page/Background.svg')
        .then(response => response.text())
        .then(svgContent => {
            formContainer.innerHTML = svgContent;
        })
        .catch(error => {
            console.error("Error al cargar el archivo SVG:", error);
        });
};
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

//Producto
document.getElementById('createProduct_btn').addEventListener("click", function() {
    producto.CrearProductos()
})

document.getElementById('showProduct_btn').addEventListener("click", function() {
    producto.MostrarProductos()
})


//Mesa
document.getElementById('createTable_btn').addEventListener("click", function() {
    mesa.CrearMesas()
})

document.getElementById('showTable_btn').addEventListener("click", function() {
    mesa.MostrarMesasFilter()
})

//Inventario
document.getElementById('createInventory_btn').addEventListener("click", function() {
    inventario.CrearInventario()
})

document.getElementById('showInventory_btn').addEventListener("click", function() {
    inventario.MostrarInventarioFilter()
})

