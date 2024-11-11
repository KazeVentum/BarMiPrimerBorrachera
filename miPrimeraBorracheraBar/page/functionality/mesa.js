import * as sede from "./sede.js";

const BASE_URL = (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") 
? "http://localhost:8080" 
: "https://lonely-cackle-9pw6q9474r93wxr-8080.app.github.dev";

console.log(BASE_URL);

export function CrearMesas() {
    document.getElementById('titleSection').textContent = 'Modulo Mesas';
    const formContainer = document.getElementById('showData');

    formContainer.innerHTML = `
        <form id="tableCreateForm">

            <h2>Creación de Mesas</h2>

                <div class="main-form">
                    <label for="nombre">Nombre de la mesa:</label>
                    <input type="text" id="nombre" name="nombre" required>

                    <label for="num_sillas">Número de sillas:</label>
                    <input type="number" id="num_sillas" name="num_sillas" required>

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

    // Cargar campos dinámicamente
    sede.cargarSedes();



    document.getElementById("tableCreateForm").addEventListener("submit", function(event) {

        event.preventDefault(); // Evita el envío del formulario tradicional

        const nombre = document.getElementById('nombre').value;
        const estado = "Disponible"
        const numSillas = document.getElementById('num_sillas').value;
        const sedeId = document.getElementById('sede').value; // ID de la sede
    
        const tableData = {
            nombre: nombre,
            estado: estado,
            numSillas: numSillas,
            sede: {
                id: parseInt(sedeId) // Esto debe tomar el valor correcto de 'sede'
            }
        }
    
        // Validar si la sede no ha sido seleccionada
        if (sedeId === "") {
            alert("Por favor, selecciona una sede para continuar.");
            return; // Detiene el proceso si la sede no es válida
        }
    
        const token = sessionStorage.getItem('jwtToken');
    
        // Primero, crear la mesa
        fetch(`${BASE_URL}/mesa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(tableData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al crear la mesa");
            }
            return response.json(); // Retorna la información de la mesa recién creada
        })
        .then(mesaData => {
            console.log("Mesa creada con éxito:", mesaData);
        })
        .then(() => {
            alert("Mesa creada con éxito");
            document.getElementById('tableCreateForm').reset();
        })
        .catch(error => console.error("Error:", error));
    });

    document.getElementById("cancelar").addEventListener("click", function(event) {
        document.getElementById('tableCreateForm').reset();
        autoClickButton("Dashboard");
    })
}

// Función para mostrar mesas
export function MostrarMesasFilter() {
    document.getElementById('titleSection').textContent = 'Mesas Registradas';

    // Mostrar el filtro solo cuando se haga clic en "Mostrar Mesas"
    const auxilaryData = document.getElementById('AuxilaryData');
    auxilaryData.innerHTML = `
        <div id="filters">
            <label for="filterSede">Filtrar por Sede:</label>
            <select id="filterSede">
                <option value="">--Seleccione una Sede--</option>
                <!-- Aquí se llenarán las opciones de Sede dinámicamente -->
            </select>
            <label for="filterNumSillas">Filtrar por Número de Sillas:</label>
            <input type="number" id="filterNumSillas" placeholder="Número de sillas" min="1">
         <div id="buttons_filter">
            <button id="applyFilters">Aplicar Filtros</button>
            <button id="clearFilters">Limpiar Filtros</button>
        </div>
        </div>
    `;

    // Obtener el token JWT para la autorización
    const token = sessionStorage.getItem('jwtToken');

    fetch(`${BASE_URL}/mesa`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Llenar el filtro de Sede dinámicamente
        const sedeSelect = document.getElementById('filterSede');
        const sedes = [...new Set(data.map(mesa => mesa.sede ? mesa.sede.nombre : 'No disponible'))]; // Obtener las sedes únicas
        sedes.forEach(sede => {
            const option = document.createElement('option');
            option.value = sede;
            option.textContent = sede;
            sedeSelect.appendChild(option);
        });

        // Mostrar las mesas
        const clientCardsContainer = document.getElementById('showData');
        let html = '';

        const applyFilters = () => {
            const filterSede = document.getElementById('filterSede').value;
            const filterNumSillas = document.getElementById('filterNumSillas').value;

            const filteredData = data.filter(mesa => {
                const matchesSede = filterSede ? mesa.sede && mesa.sede.nombre === filterSede : true;
                const matchesNumSillas = filterNumSillas ? mesa.numSillas == filterNumSillas : true;
                return matchesSede && matchesNumSillas;
            });

            // Mostrar las mesas filtradas
            html = '';
            filteredData.forEach(mesa => {
                html += `
                    <div class="card">
                        <div class="head">
                            <div>
                                <h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                                    </svg>
                                    ${mesa.nombre}
                                </h1>
                                <h3>Numero de sillas: ${mesa.numSillas} </h3>
                                <h3>Estado: ${mesa.estado}</h3>
                                <h3>Sede: ${mesa.sede ? mesa.sede.nombre : 'No disponible'}</h3>
                            </div>
                        </div>
                        <div class="buttons">
                            <button class="edit-btn" id="edit-btn" onclick="editarMesa(${mesa.id})">Editar</button>
                            <button class="delete-btn" id="delete-btn" onclick="questionDeleteTable(${mesa.id})">Eliminar</button>
                        </div>
                    </div>
                `;
            });

            clientCardsContainer.innerHTML = html;
        };

        // Aplicar filtros al hacer clic en el botón "Aplicar Filtros"
        document.getElementById('applyFilters').addEventListener('click', () => {
            applyFilters();
        });

        // Limpiar filtros
        document.getElementById('clearFilters').addEventListener('click', () => {
            document.getElementById('filterSede').value = '';
            document.getElementById('filterNumSillas').value = '';
            applyFilters(); // Volver a mostrar todas las mesas
        });

        // Inicialmente mostrar todas las mesas
        applyFilters();
    })
    .catch(error => console.error('Error:', error));

    // Limpiar el contenido de AuxilaryData y esconder el filtro cuando se haga clic en otro botón
    const hideFilterOnOtherButtons = () => {
        // Aquí pones los botones que no deberían mostrar el filtro
        const buttonsToHideFilter = [
            'createEmployee_btn', 'showEmployee_btn', 'createSede_btn', 'showSede_btn','createProduct_btn','showProduct_btn','createTable_btn' // Añadir los botones que desees
        ];

        buttonsToHideFilter.forEach(buttonId => {
            document.getElementById(buttonId)?.addEventListener('click', () => {
                // Limpiar el contenido del filtro
                auxilaryData.innerHTML = ''; // Elimina el filtro
            });
        });
    };

    // Llamar a la función para limpiar el filtro en otros botones
    hideFilterOnOtherButtons();
}


export function MostrarMesas() {
    document.getElementById('titleSection').textContent = 'Mesas Registradas';

    const token = sessionStorage.getItem('jwtToken'); 
    fetch(`${BASE_URL}/mesa`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const clientCardsContainer = document.getElementById('showData');
        let html = '';
        data.forEach(data => {
            html += `
                <div class="card">
                    <div class="head">
                        <div>
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                                </svg>
                                ${data.nombre}
                            </h1>
                            <h3>Numero de sillas: ${data.numSillas} </h3>
                            <h3>Estado: ${data.estado}</h3>
                            <h3>Sede: ${data.sede ? data.sede.nombre : 'No disponible'}</h3>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="edit-btn" id="edit-btn" onclick="editarMesa(${data.id})">Editar</button>
                        <button class="delete-btn" id="delete-btn" onclick="questionDeleteTable(${data.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        clientCardsContainer.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
}

function editarMesa(id){
    console.log("ID recibido en editarMesa:", id);
    if (!id) {
        console.error("El ID no fue pasado correctamente a la función editarMesa.");
        return;
    }
    const token = sessionStorage.getItem('jwtToken'); 
    fetch(`${BASE_URL}/mesa/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => { 

        //Inyecta formulario para edicion
        const formContainer = document.getElementById('showData');
        formContainer.innerHTML = `
				<form id="tableEditForm">
					<div class="main-form">
						<label for="nombreEdit">Nombre nuevo de mesa: </label>
						<input type="text" id="nombreEdit" name="nombre" required>
			
                        <label for="num_sillasEdit">Número de sillas:</label>
                        <input type="number" id="num_sillasEdit" name="num_sillas" required>

                        <label for="estado">Estado:</label>
						<input type="text" id="estadoEdit" name="estado" required>

						<label for="sedeEdit">Sede:</label>
						<select id="sedeEdit" name="sedeEdit">
							<!-- Opciones serán insertadas dinámicamente -->
						</select>
			
					<div class="form-actions">
						<button type="button" id="cancelar">Cancelar</button>
						<button type="submit" id="guardar">Guardar</button>
					</div>
				</form>
        `;
        const mainContent = document.querySelector('main');
        mainContent.appendChild(formContainer);
        
        console.log(data.numSillas)
        // Rellenar el formulario con la información del empleado
        document.getElementById("nombreEdit").value = data.nombre;
        document.getElementById("num_sillasEdit").value = data.numSillas;
        document.getElementById("estadoEdit").value = data.estado;
        console.log(data.id);
        const selectedSedeId = data.sede.id

        sede.cargarSedesEdicion(selectedSedeId);

        document.getElementById("cancelar").addEventListener("click", function(event) {
            document.getElementById('tableEditForm').reset();
            autoClickButton("showEmployee_btn");
        })
        
        document.getElementById("tableEditForm").addEventListener("submit", async (e) => {
            e.preventDefault();
        
            const mesaEditada = {
                nombre: document.getElementById("nombreEdit").value,
                estado: document.getElementById("estadoEdit").value,
                numSillas: document.getElementById("num_sillasEdit").value,
                sede: { id: document.getElementById("sedeEdit").value },
            };
        
            console.log("Datos a enviar:", mesaEditada); // Depuración
        
            try {
                const token = sessionStorage.getItem('jwtToken');
                const response = await fetch(`${BASE_URL}/mesa/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(mesaEditada),
                });
        
                console.log("Respuesta del servidor (actualización):", response); // Depuración
        
                if (response.ok) {
                    autoClickButton('showTable_btn')
                } else {
                    console.error("Error al actualizar la mesa");
                }
            } catch (error) {
                console.error("Error en la solicitud de actualización:", error);
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

function questionDeleteTable(id) {
    if (confirm("¿Realmente quiere eliminar esta mesa?")) {
        eliminarMesa(id);
    }
}

function eliminarMesa(id) {
    const token = sessionStorage.getItem('jwtToken');
    
    fetch(`${BASE_URL}/mesa/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            alert("La mesa ha sido eliminada con exito.")
            autoClickButton('showTable_btn')
        } else {
            return Promise.reject("Error al eliminar la mesa");
        }
    })
}


// Función para hacer clic automáticamente en el botón
function autoClickButton(redirectButton) {
    const button = document.getElementById(redirectButton); // Cambia este selector según corresponda
    if (button) {
        button.click();
    }
}

window.editarMesa = editarMesa
window.questionDeleteTable = questionDeleteTable
