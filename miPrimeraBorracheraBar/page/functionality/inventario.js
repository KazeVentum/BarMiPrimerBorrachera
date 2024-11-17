import * as producto from "./producto.js";
import * as sede from "./sede.js";

const BASE_URL = (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") 
? "http://localhost:8080" 
: "https://lonely-cackle-9pw6q9474r93wxr-8080.app.github.dev";

console.log(BASE_URL);

export function CrearInventario() {
    document.getElementById('titleSection').textContent = 'Modulo Inventario';
    const formContainer = document.getElementById('showData');

    formContainer.innerHTML = `
        <form id="inventoryCreateForm">
            <h2>Inventario</h2>
                <div class="main-form">

                    <label for="producto">Producto:</label>
                    <select id="producto" name="Producto">
                        <!-- Opciones serán insertadas dinámicamente -->
                    </select>

                    <label for="precio_venta">Precio de venta:</label>
                    <input type="number" id="precio_venta" name="precio_venta" required>
                    
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" id="cantidad" name="cantidad" required>

                    <label for="sede">Sede:</label>
                    <select id="sede" name="sede">
                        <!-- Opciones serán insertadas dinámicamente -->
                    </select>

                </div>
                <div class="form-actions">
                    <button type="button" id="cancelar">Cancelar</button>
                    <button type="submit" id="guardar">Guardar</button>
                </div>
        </form>
    `;

    const mainContent = document.querySelector('main');
    mainContent.appendChild(formContainer);

    sede.cargarSedes();
    producto.cargarProductos();
    

    document.getElementById("inventoryCreateForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const cantidad = document.getElementById('cantidad').value;
        const precio_venta = document.getElementById('precio_venta').value;
        const producto_id = document.getElementById('producto').value;
        const sede_id = document.getElementById('sede').value;

        const inventarioData = {
            cantidad: cantidad,
            precio_venta: precio_venta,
            producto: {
                id: parseInt(producto_id) 
            },
            sede: {
                id: parseInt(sede_id) 
            }
        }

        if (sede_id === "") {
            alert("Por favor, selecciona una sede para continuar.");
            return; 
        }

        if (producto_id === "") {
            alert("Por favor, selecciona un producto para continuar.");
            return; 
        }

        console.log(inventarioData)

        const token = sessionStorage.getItem('jwtToken');

        fetch(`${BASE_URL}/inventario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(inventarioData)
        })
        .then(response => response.ok ? response.json() : Promise.reject("Error al crear el inventario"))
        .then(data => {
            console.log("Inventario creado con éxito:", data);
            alert("Inventario creado con éxito");
            document.getElementById('inventoryCreateForm').reset();
        })
        .catch(error => console.error("Error al crear el inventario:", error));

    });

    document.getElementById("cancelar").addEventListener("click", function(event) {
        document.getElementById('inventoryCreateForm').reset();
        autoClickButton("Dashboard")
    })
}






function autoClickButton(redirectButton) {
    const button = document.getElementById(redirectButton); 
    if (button) {
        button.click();
    }
}