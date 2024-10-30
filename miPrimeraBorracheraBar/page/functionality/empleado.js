import * as rol from "./rol.js";
import * as sede from "./sede.js";

const BASE_URL = (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") 
? "http://localhost:8080" 
: "https://lonely-cackle-9pw6q9474r93wxr-8080.app.github.dev";

console.log(BASE_URL);


export function crearEmpleados() {
    document.getElementById('titleSection').textContent = 'Modulo Empleados';
    const formContainer = document.getElementById('showData');

    formContainer.innerHTML = `
        <form id="employeeCreateForm">
            <h2>Creación de Empleado</h2>
        <div class="main-form">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>

            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required>

            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="telefono">Teléfono:</label>
            <input type="number" id="telefono" name="telefono" required>

            <label for="sede">Sede:</label>
            <select id="sede" name="sede">
                <!-- Opciones serán insertadas dinámicamente -->
            </select>

            <label for="rol">Rol:</label>
            <select id="rol" name="rol">
                <!-- Opciones serán insertadas dinámicamente -->
            </select>
        </div>
        <div class="auth-form">
            <label for="usuario">Usuario:</label>
            <input type="text" id="usuario" name="usuario" required>

            <label for="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" required>

            <div class="form-actions">
                <button type="button" id="cancelar">Cancelar</button>
                <button type="submit" id="guardar">Guardar</button>
            </div>
        </div>
        </form>
    `;

    const mainContent = document.querySelector('main');
    mainContent.appendChild(formContainer);

    // Cargar roles dinámicamente
    rol.cargarRoles();

    sede.cargarSedes();

    document.getElementById("employeeCreateForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario tradicional

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const direccion = document.getElementById('direccion').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const rol = document.getElementById('rol').value;
        const sede = document.getElementById('sede').value; 
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;

 

        const customerData = {
            nombre: nombre,
            apellidos: apellido,
            direccion: direccion,
            telefono: telefono,
            email: email,
            rol: {
                id: parseInt(rol)
            },
            sede: {
                id: parseInt(sede) // Esto debe tomar el valor correcto de 'sede'
            }
        }

        

    // Validar si el rol no ha sido seleccionado
        if (rol === "") {
            alert("Por favor, selecciona un rol para continuar.");
            return; // Detiene el proceso si el rol no es válido
        }

        if (sede === "") {
            alert("Por favor, selecciona una sede para continuar.");
            return; // Detiene el proceso si el rol no es válido
        }

        console.log(customerData)

        const authData = {
            username: usuario,
            password: contrasena,
            rol: {
                id: parseInt(rol)
            }
        };
        

        const token = sessionStorage.getItem('jwtToken');

        fetch(`${BASE_URL}/empleado`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(customerData)
        })
        .then(response => response.ok ? response.json() : Promise.reject("Error al crear el empleado"))
        .then(data => {
            console.log("Empleado creado con éxito:", data);
            alert("Empleado creado con éxito");
            document.getElementById('employeeCreateForm').reset();
        })
        .catch(error => console.error("Error al crear el empleado:", error));

        fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(authData)
        })
        .then(response => response.ok ? response.json() : Promise.reject("Error al crear el registro"))
        .then(data => console.log("Registro creado con éxito:", data))
        .catch(error => console.error("Error al crear el registro:", error));
    });

    document.getElementById("cancelar").addEventListener("click", function(event) {
        document.getElementById('employeeCreateForm').reset();
    })
}

export function MostrarEmpleados(){
    document.getElementById('titleSection').textContent = 'Empleados Registrados';
    const token = sessionStorage.getItem('jwtToken'); 
    fetch(`${BASE_URL}/empleado`, {
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                                </svg>
                                ${data.nombre} ${data.apellidos}
                            </h1>
                            <h3>Rol: ${data.rol.nombre}</h3>
                            <h3>Sede: ${data.sede.nombre}</h3>
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
    })
    .catch(error => console.error('Error:', error));
}

function editarEmpleado(id){
    const token = sessionStorage.getItem('jwtToken'); 
    fetch(`${BASE_URL}/empleado/${id}`, {
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
				<form id="employeeEditForm">
					<div class="main-form">
						<label for="nombreEdit">Nombre Nuevo:</label>
						<input type="text" id="nombreEdit" name="nombre" required>
			
						<label for="apellidoEdit">Apellido:</label>
						<input type="text" id="apellidoEdit" name="apellido" required>
			
						<label for="direccionEdit">Dirección:</label>
						<input type="text" id="direccionEdit" name="direccion" required>
			
						<label for="emailEdit">Email:</label>
						<input type="email" id="emailEdit" name="email" required>
			
						<label for="telefonoEdit">Teléfono:</label>
						<input type="tel" id="telefonoEdit" name="telefono" required>
			
						<label for="sedeEdit">Sede:</label>
						<select id="sedeEdit" name="sedeEdit">
							<!-- Opciones serán insertadas dinámicamente -->
						</select>
			
						<label for="rolEdit">Rol:</label>
						<select id="rolEdit" name="rolEdit">
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
        
        // Rellenar el formulario con la información del empleado
        document.getElementById("nombreEdit").value = data.nombre;
        document.getElementById("apellidoEdit").value = data.apellidos;
        document.getElementById("direccionEdit").value = data.direccion;
        document.getElementById("emailEdit").value = data.email;
        document.getElementById("telefonoEdit").value = data.telefono;
        

        const selectedSedeId = data.sede.id
        const selectedRolId = data.rol.id

        sede.cargarSedesEdicion(selectedSedeId);
        rol.cargarRolesEdicion(selectedRolId)
        
        document.getElementById("employeeEditForm").addEventListener("submit", async (e) => {
            e.preventDefault();
        
            const empleadoEditado = {
                nombre: document.getElementById("nombreEdit").value,
                apellidos: document.getElementById("apellidoEdit").value,
                direccion: document.getElementById("direccionEdit").value,
                email: document.getElementById("emailEdit").value,
                telefono: document.getElementById("telefonoEdit").value,
                sede: { id: document.getElementById("sedeEdit").value },
                rol: { id: document.getElementById("rolEdit").value },
            };
        
            console.log("Datos a enviar:", empleadoEditado); // Depuración
        
            try {
                const token = sessionStorage.getItem('jwtToken');
                const response = await fetch(`${BASE_URL}/empleado/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(empleadoEditado),
                });
        
                console.log("Respuesta del servidor (actualización):", response); // Depuración
        
                if (response.ok) {
                    autoClickButton('showEmployee_btn')
                } else {
                    console.error("Error al actualizar el empleado");
                }
            } catch (error) {
                console.error("Error en la solicitud de actualización:", error);
            }
        });
    })
    .catch(error => console.error('Error:', error));

    
}

// Funcion de pregunta de si quiere continuar
function questionDeleteEmployee(id) {
    if (confirm("¿Realmente quiere eliminar este usuario?")) {
        // Llamar al controlador para eliminar el usuario
        eliminarEmpleado(id);
    }
}
// Función para eliminar el empleado usando el controlador
function eliminarEmpleado(id) {
    const token = sessionStorage.getItem('jwtToken');
    
    fetch(`${BASE_URL}/empleado/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            alert("El empleado ha sido eliminado con exito.")
            autoClickButton('showEmployee_btn')
        } else {
            return Promise.reject("Error al eliminar el empleado");
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


window.editarEmpleado = editarEmpleado
window.questionDeleteEmployee = questionDeleteEmployee












