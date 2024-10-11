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

}

export function editarEmpleados(){
    console.log("editar")
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
						
							<h1 style="color: blue;">Nombre Empleado: <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
                            <h3>${data.nombre} ${data.apellidos}</h3>
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
						    </svg></h1> 
                            <br>
							<li>Rol: ${data.rol.nombre} </li>
                            
							<br>
										
						</div>
					</div>
					</div>
				</div>
			`;
		});
		clientCardsContainer.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
}

export function EliminarEmpleados(){
    console.log("eliminar")
}







