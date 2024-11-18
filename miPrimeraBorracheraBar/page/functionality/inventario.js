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
            <h2>Creación de Inventario</h2>
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



// Función para mostrar inventarios con filtros
export function MostrarInventarioFilter() {
    document.getElementById('titleSection').textContent = 'Inventarios';

    const auxilaryData = document.getElementById('AuxilaryData');
    auxilaryData.innerHTML = `
        <div id="inventoryFilters" class="filters">
            <label for="filterSede">Filtrar por Sede:</label>
            <select id="filterSede">
                <option value="">--Seleccione una Sede--</option>
            </select>
            
            <label for="filterProducto">Filtrar por Producto:</label>
            <select id="filterProducto">
                <option value="">--Seleccione un Producto--</option>
            </select>

            <label for="filterPrecioVenta">Filtrar por Precio de Venta menor:</label>
            <input type="number" id="filterPrecioVenta" placeholder="Precio de venta" min="1">

            <div id="buttons_filter">
                <button id="applyFilters">Aplicar Filtros</button>
                <button id="clearFilters">Limpiar Filtros</button>
            </div>
        </div>
    `;

    // Obtener el token JWT para la autorización
    const token = sessionStorage.getItem('jwtToken');

    fetch(`${BASE_URL}/inventario`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Llenar el filtro de Sede y Producto dinámicamente
        const sedeSelect = document.getElementById('filterSede');
        const productoSelect = document.getElementById('filterProducto');

        if (sedeSelect) {
            const sedes = [...new Set(data.map(item => item.sede ? item.sede.nombre : 'No disponible'))];
            sedes.forEach(sede => {
                const option = document.createElement('option');
                option.value = sede;
                option.textContent = sede;
                sedeSelect.appendChild(option);
            });
        }

        if (productoSelect) {
            const productos = [...new Set(data.map(item => item.producto ? item.producto.nombre : 'No disponible'))];
            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto;
                option.textContent = producto;
                productoSelect.appendChild(option);
            });
        }

        // Mostrar los inventarios
        const clientCardsContainer = document.getElementById('showData');
        let html = '';

        const applyFilters = () => {
            const filterSede = document.getElementById('filterSede')?.value || '';
            const filterProducto = document.getElementById('filterProducto')?.value || '';
            const filterPrecioVenta = document.getElementById('filterPrecioVenta')?.value || '';

            const filteredData = data.filter(item => {
                const matchesSede = filterSede ? item.sede && item.sede.nombre === filterSede : true;
                const matchesProducto = filterProducto ? item.producto && item.producto.nombre === filterProducto : true;
                const matchesPrecioVenta = filterPrecioVenta ? item.precio_venta  <= filterPrecioVenta : true;
                return matchesSede && matchesProducto && matchesPrecioVenta;
            });

            // Mostrar los inventarios filtrados
            html = '';
            filteredData.forEach(item => {
                const precio_venta_co = parseFloat(item.precio_venta).toLocaleString('es-CO');
                html += `
                <div class="card">
                    <div class="head">
                        <div>
                            <h1>
                                Producto:
                                ${item.producto ? item.producto.nombre : 'Producto desconocido'}</h1>
                            </h1>
                            <h3>Cantidad: ${item.cantidad}</h3>
                            <h3>Precio de venta: $${precio_venta_co}</h3>
                            <h3>Sede: ${item.sede ? item.sede.nombre : 'No disponible'}</h3>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="edit-btn" id="edit-btn" onclick="editarEmpleado(${data.id})">Editar</button>
                        <button class="delete-btn" id="delete-btn" onclick="questionDeleteEmployee(${data.id})">Eliminar</button>
                    </div>
                </div>
                `;
            });

            clientCardsContainer.innerHTML = html;
        };

        // Aplicar filtros al hacer clic en el botón "Aplicar Filtros"
        document.getElementById('applyFilters')?.addEventListener('click', () => {
            applyFilters();
        });

        // Limpiar filtros
        document.getElementById('clearFilters')?.addEventListener('click', () => {
            if (document.getElementById('filterSede')) document.getElementById('filterSede').value = '';
            if (document.getElementById('filterProducto')) document.getElementById('filterProducto').value = '';
            if (document.getElementById('filterPrecioVenta')) document.getElementById('filterPrecioVenta').value = '';
            applyFilters(); // Volver a mostrar todos los inventarios
        });

        // Inicialmente mostrar todos los inventarios
        applyFilters();
    })
    .catch(error => console.error('Error:', error));
}

// Función genérica para manejar el cambio de sección y limpiar filtros
function handleSectionChange(buttonsToHideFilter) {
    buttonsToHideFilter.forEach(buttonId => {
        document.getElementById(buttonId)?.addEventListener('click', () => {
            const auxilaryData = document.getElementById('AuxilaryData');
            if (auxilaryData) {
                auxilaryData.innerHTML = ''; // Limpiar contenido al cambiar de sección
            }
        });
    });
}

// Llamar a la función para manejar el cambio de sección
handleSectionChange([
    'createEmployee_btn', 'showEmployee_btn', 'createSede_btn', 'showSede_btn',
    'createProduct_btn', 'showProduct_btn', 'createTable_btn','showTable_btn',
    'createInventory_btn', 'showInventory_btn',
]);






function autoClickButton(redirectButton) {
    const button = document.getElementById(redirectButton); 
    if (button) {
        button.click();
    }
}