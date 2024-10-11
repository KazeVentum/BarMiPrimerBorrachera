import * as rol from "./rol.js";
import * as sede from "./sede.js";

export function crearEmpleados() {
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
            <input type="tel" id="telefono" name="telefono" required>

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

        fetch("http://localhost:8080/empleado", {
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

        fetch("http://localhost:8080/register", {
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
    const token = sessionStorage.getItem('jwtToken'); 
    fetch('http://localhost:8080/empleado', {
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
                        <button class="edit-btn" onclick="editEmployee(${data.id})">Editar</button>
                        <button class="delete-btn">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        clientCardsContainer.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
}

// Función para manejar el clic en el botón de editar
function editEmployee(id) {
    window.location.href = `editarEmpleado.html?id=${id}`;
}

// Asegúrate de que la función editEmployee sea accesible globalmente
window.editEmployee = editEmployee;

export function editarEmpleados(id) {
    window.location.href = `editarEmpleado.html?id=${id}`;
}

export function EliminarEmpleados(){
    console.log("eliminar")
}









