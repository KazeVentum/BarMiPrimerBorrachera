// document.getElementById('createEmployee_btn').addEventListener("click", function() {
//             // Crear el formulario dinámicamente
//         const formContainer = document.getElementById('showData');
    
//         formContainer.innerHTML = `
//             <form id="employeeCreateForm">
//             <h2>Creación de Empleado</h2>
//             <div class="main-form">
//                 <label for="nombre">Nombre:</label>
//                 <input type="text" id="nombre" name="nombre" required>

//                 <label for="apellido">Apellido:</label>
//                 <input type="text" id="apellido" name="apellido" required>

//                 <label for="direccion">Dirección:</label>
//                 <input type="text" id="direccion" name="direccion" required>

//                 <label for="email">Email:</label>
//                 <input type="email" id="email" name="email" required>

//                 <label for="telefono">Teléfono:</label>
//                 <input type="tel" id="telefono" name="telefono" required>

//                 <label for="rol">Rol:</label>
//                 <select id="rol" name="rol">
//                     <option value="1">Administrador</option>
//                     <option value="2">Cajero</option>
//                     <option value="3">Mesero</option>
//                 </select>
//             </div>
//             <div class="auth-form">
//                 <label for="usuario">Usuario:</label>
//                 <input type="text" id="usuario" name="usuario" required>

//                 <label for="contrasena">Contraseña:</label>
//                 <input type="password" id="contrasena" name="contrasena" required>

//                 <div class="form-actions">
//                     <button type="button" id="cancelar">Cancelar</button>
//                     <button type="submit" id="guardar">Guardar</button>
//                 </div>
//             </div>

//         </form>

//         `;
    
//         // Insertar el formulario en el cuerpo del documento (o en la sección deseada)
//         const mainContent = document.querySelector('main');
//         mainContent.appendChild(formContainer);

//         document.getElementById("employeeCreateForm").addEventListener("submit",  function (event) {
//             event.preventDefault(); // Evita el envío del formulario tradicional
        
//             // Recoger los valores del formulario
//             const nombre = document.getElementById('nombre').value;
//             const apellido = document.getElementById('apellido').value;
//             const direccion = document.getElementById('direccion').value;
//             const email = document.getElementById('email').value;
//             const telefono = document.getElementById('telefono').value;
//             const rol = document.getElementById('rol').value;
//             const usuario = document.getElementById('usuario').value;
//             const contrasena = document.getElementById('contrasena').value;

//             // Crear el objeto JSON
//             const customerData = {
//                 nombre: nombre,
//                 apellidos: apellido,
//                 direccion: direccion,
//                 telefono: telefono,
//                 email: email,
//                 rol: {
//                     id: parseInt(rol)
//                 }
//             };

//             const authData = {
//                 username: usuario,
//                 password: contrasena,
//                 rol: {
//                     id: parseInt(rol)
//                 }
//             };


        
//             // Obtiene el token JWT desde sessionStorage
//             const token = sessionStorage.getItem('jwtToken');
        
//             // Realiza la petición POST al backend usando fetch, incluyendo el token en los headers
//             fetch("http://localhost:8080/empleado", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` // Agrega el token JWT en el encabezado Authorization
//                 },
//                 body: JSON.stringify(customerData) // Envía los datos del empleado como JSON
//             })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error("Error al crear el empleado");
//                 }
//             })
//             .then(data => {

//                 console.log("Empleado creado con éxito:", data);
//                 alert("Empleado creado con éxito"); // Muestra una alerta de éxito
//                 document.getElementById('employeeCreateForm').reset();
//             })
//             .catch(error => {
//                 console.error("Error al crear el empleado:", error);
//             });


//             fetch("http://localhost:8080/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` // Agrega el token JWT en el encabezado Authorization
//                 },
//                 body: JSON.stringify(authData) // Envía los datos del empleado como JSON
//             })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error("Error al crear el registro");
//                 }
//             })
//             .then(data => {
//                 console.log("registro creado con éxito:", data);
//                 document.getElementById('employeeCreateForm').reset();
//             })
//             .catch(error => {
//                 console.error("Error al crear el registro:", error);
//             });
//             // Mostrar el objeto JSON enviado en la consola
//             console.log(authData);
//             console.log(customerData);
//         });
// });


document.getElementById('createEmployee_btn').addEventListener("click", function() {
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
    cargarRoles();

    document.getElementById("employeeCreateForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario tradicional

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const direccion = document.getElementById('direccion').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const rol = document.getElementById('rol').value;
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
            }
        };

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
});

function cargarRoles() {
    const token = sessionStorage.getItem('jwtToken');
    console.log("Token JWT:", token); // Verifica si el token está presente
    fetch("http://localhost:8080/rol", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(text => Promise.reject(text)); // Devuelve el error en texto
        }
    })
    .then(roles => {
        const selectRol = document.getElementById('rol');
        selectRol.innerHTML = ''; // Limpiar opciones anteriores
        roles.forEach(rol => {
            const option = document.createElement('option');
            option.value = rol.id;
            option.text = rol.nombre;
            selectRol.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al cargar roles:", error);
        alert("Ocurrió un error al cargar los roles. Revisa la consola para más detalles.");
    });
}



