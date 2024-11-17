const BASE_URL = (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") 
? "http://localhost:8080" 
: "https://lonely-cackle-9pw6q9474r93wxr-8080.app.github.dev";

console.log(BASE_URL);

export function CrearSedes() {
    document.getElementById('titleSection').textContent = 'Modulo Sedes';
    const formContainer = document.getElementById('showData');

    formContainer.innerHTML = `
        <form id="sedeCreateForm">
            <h2>Creación de Sedes</h2>
                <div class="main-form">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required>

                    <label for="Ciudad">Ciudad:</label>
                    <input type="text" id="ciudad" name="ciudad" required>

                    <label for="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" required>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancelar">Cancelar</button>
                    <button type="submit" id="guardar">Guardar</button>
                </div>
        </form>
    `;

    const mainContent = document.querySelector('main');
    mainContent.appendChild(formContainer);


    document.getElementById("sedeCreateForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario tradicional

        const nombre = document.getElementById('nombre').value;
        const ciudad = document.getElementById('ciudad').value;
        const direccion = document.getElementById('direccion').value;

        const sedeData = {
            nombre: nombre,
            ciudad: ciudad,
            direccion: direccion,
        }


        console.log(sedeData)

        const token = sessionStorage.getItem('jwtToken');

        fetch(`${BASE_URL}/sede`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(sedeData)
        })
        .then(response => response.ok ? response.json() : Promise.reject("Error al crear la sede"))
        .then(data => {
            console.log("Sede creada con éxito:", data);
            alert("Sede creada con éxito");
            document.getElementById('sedeCreateForm').reset();
        })
        .catch(error => console.error("Error al crear la Sede:", error));

    });

    document.getElementById("cancelar").addEventListener("click", function(event) {
        document.getElementById('sedeCreateForm').reset();
        autoClickButton("Dashboard")
    })
}

export function MostrarSedes(){
    document.getElementById('titleSection').textContent = 'Sedes Registradas';
    const token = sessionStorage.getItem('jwtToken'); 
    fetch(`${BASE_URL}/sede`, {
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
                            <h1 style="color: #244767;">
                            <i class='bx bxs-store' width="64" height="64" ></i>
                                ${data.nombre}
                            </h1>
                            <h3>Ciudad: ${data.ciudad}</h3>
                            <h3>Dirección: ${data.direccion}</h3>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="edit-btn" id="edit-btn" onclick="editarSede(${data.id})">Editar</button>
                        <button class="delete-btn" id="delete-btn" onclick="questionDeleteSede(${data.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        clientCardsContainer.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
}

function editarSede(id){
    const token = sessionStorage.getItem('jwtToken'); 
    fetch(`${BASE_URL}/sede/${id}`, {
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
				<form id="sedeEditForm">
                    <h2>Edición de la sede: ${data.nombre}</h2>
                        <div class="main-form">
                            <label for="nombreEdit">Nombre:</label>
                            <input type="text" id="nombreEdit" name="nombre" required>

                            <label for="ciudadEdit">Ciudad:</label>
                            <input type="text" id="ciudadEdit" name="ciudad" required>

                            <label for="direccionEdit">Dirección:</label>
                            <input type="text" id="direccionEdit" name="direccion" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" id="cancelar">Cancelar</button>
                            <button type="submit" id="guardar">Guardar</button>
                        </div>
				</form>
        `;
        const mainContent = document.querySelector('main');
        mainContent.appendChild(formContainer);
        
        // Rellenar el formulario con la información de la sede
        document.getElementById("nombreEdit").value = data.nombre;
        document.getElementById("ciudadEdit").value = data.ciudad;
        document.getElementById("direccionEdit").value = data.direccion;
        
        document.getElementById("cancelar").addEventListener("click", function(event) {
            document.getElementById('sedeEditForm').reset();
            autoClickButton("showSede_btn")
        })

        document.getElementById("sedeEditForm").addEventListener("submit", async (e) => {
            e.preventDefault();
        
            const sedeEditada = {
                nombre: document.getElementById("nombreEdit").value,
                ciudad: document.getElementById("ciudadEdit").value,
                direccion: document.getElementById("direccionEdit").value,
            };
        
            console.log("Datos a enviar:", sedeEditada); // Depuración
        
            try {
                const token = sessionStorage.getItem('jwtToken');
                const response = await fetch(`${BASE_URL}/sede/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(sedeEditada),
                });
        
                console.log("Respuesta del servidor (actualización):", response); // Depuración
        
                if (response.ok) {
                    autoClickButton('showSede_btn')
                } else {
                    console.error("Error al actualizar la sede");
                }
            } catch (error) {
                console.error("Error en la solicitud de actualización:", error);
            }
        });
    })
    .catch(error => console.error('Error:', error));
}


// Funcion de pregunta de si quiere continuar
function questionDeleteSede(id) {
    if (confirm("¿Realmente quiere eliminar esta sede?")) {
        //Le pasa el id a la funcion Eliminar sede para eliminarlo realmente
        eliminarSede(id);

    }
}
// Función para eliminar el empleado usando el controlador
function eliminarSede(id) {
    const token = sessionStorage.getItem('jwtToken');
    
    fetch(`${BASE_URL}/sede/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            alert("La sede ha sido eliminado con exito.")
            autoClickButton('showSede_btn')
        } else {
            return Promise.reject("Error al eliminar la sede");
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

// Logica para empleados
export function cargarSedes() {
    const token = sessionStorage.getItem('jwtToken');
    fetch(`${BASE_URL}/sede`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.text()))
    .then(sedes => {
        const selectSede = document.getElementById('sede');
        selectSede.innerHTML = ''; // Limpiar opciones anteriores

        // Agregar una opción por defecto que no sea válida
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.text = "Selecciona una sede";
        defaultOption.disabled = true;
        defaultOption.selected = true; // Marcarla como seleccionada por defecto
        selectSede.appendChild(defaultOption);

        // Agregar las sedes dinámicamente
        sedes.forEach(sede => {
            const option = document.createElement('option');
            option.value = sede.id;
            option.text = sede.nombre;
            selectSede.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al cargar sedes:", error);
        alert("Ocurrió un error al cargar las sedes. Revisa la consola para más detalles.");
    });
}
export function cargarSedesEdicion(selectedSedeId) {
    const token = sessionStorage.getItem('jwtToken');
    fetch(`${BASE_URL}/sede`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.text()))
    .then(sedes => {
        const selectSede = document.getElementById('sedeEdit');
        selectSede.innerHTML = ''; // Limpiar opciones anteriores

        // Agregar las sedes dinámicamente
        sedes.forEach(sede => {
            const option = document.createElement('option');
            option.value = sede.id;
            option.text = sede.nombre;
            if (sede.id === selectedSedeId) {
                option.selected = true; 
            }
            selectSede.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al cargar sedes:", error);
        alert("Ocurrió un error al cargar las sedes. Revisa la consola para más detalles.");
    });
}

window.editarSede = editarSede
window.questionDeleteSede = questionDeleteSede