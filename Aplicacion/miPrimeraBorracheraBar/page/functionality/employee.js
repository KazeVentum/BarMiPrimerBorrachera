document.getElementById('createEmployee_btn').addEventListener("click", function() {
            // Crear el formulario dinámicamente
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
                    <option value="1">Administrador</option>
                    <option value="2">Cajero</option>
                    <option value="3">Mesero</option>
                </select>
            </div>
            <div class="auth-form">
                <label for="usuario">Usuario:</label>
                <input type="text" id="usuario" name="usuario" required>

                <label for="contrasena">Contraseña:</label>
                <input type="password" id="contrasena" name="contrasena" required>
            </div>
            <div class="form-actions">
                <button type="button" id="cancelar">Cancelar</button>
                <button type="submit" id="guardar">Guardar</button>
            </div>
        </form>

        `;
    

        // Insertar el formulario en el cuerpo del documento (o en la sección deseada)
        const mainContent = document.querySelector('main');
        mainContent.appendChild(formContainer);

        // Añadir un evento de escucha al formulario para recoger los datos cuando se guarden
        const employeeCreateForm = document.getElementById('employeeCreateForm');
        employeeCreateForm.addEventListener('submit', (event) => {
            event.preventDefault();  // Prevenir que se recargue la página

            // Recoger los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const direccion = document.getElementById('direccion').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const rol = document.getElementById('rol').value;
            const usuario = document.getElementById('usuario').value;
            const contrasena = document.getElementById('contrasena').value;

            // Crear el objeto JSON
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
                usuario: usuario,
                contrasena: contrasena,
                rol: {
                    id: parseInt(rol)
                }
            };

            // Mostrar el objeto JSON en la consola
            console.log(authData);
            console.log(customerData);
        });
});


// document.addEventListener('DOMContentLoaded', () => {
//     // Encuentra el botón "Employee" en el DOM
//     const employeeCreateButton = document.getElementById('createEmployee_btn');

//     // Añadir evento de escucha al botón de employee
//     employeeCreateButton.addEventListener('click', () => {
//         // Crear el formulario dinámicamente
//         const formContainer = document.createElement('div');
//         formContainer.innerHTML = `
//             <form id="employeeCreateForm">
//                 <label for="nombre">Nombre:</label>
//                 <input type="text" id="nombre" name="nombre" required><br>

//                 <label for="apellido">Apellido:</label>
//                 <input type="text" id="apellido" name="apellido" required><br>

//                 <label for="direccion">Dirección:</label>
//                 <input type="text" id="direccion" name="direccion" required><br>

//                 <label for="email">Email:</label>
//                 <input type="email" id="email" name="email" required><br>

//                 <label for="telefono">Teléfono:</label>
//                 <input type="tel" id="telefono" name="telefono" required><br>

//                 <label for="rol">Rol:</label>
//                 <select id="rol" name="rol">
//                     <option value="1">Administrador</option>
//                     <option value="2">Cajero</option>
//                     <option value="3">Mesero</option>
//                 </select><br>

//                 <button type="submit" id="guardar">Guardar</button>
//             </form>
//         `;

//         // Insertar el formulario en el cuerpo del documento (o en la sección deseada)
//         const mainContent = document.querySelector('main');
//         mainContent.appendChild(formContainer);

//         // Añadir un evento de escucha al formulario para recoger los datos cuando se guarden
//         const employeeCreateForm = document.getElementById('employeeCreateForm');
//         employeeCreateForm.addEventListener('submit', (event) => {
//             event.preventDefault();  // Prevenir que se recargue la página

//             // Recoger los valores del formulario
//             const nombre = document.getElementById('nombre').value;
//             const apellido = document.getElementById('apellido').value;
//             const direccion = document.getElementById('direccion').value;
//             const email = document.getElementById('email').value;
//             const telefono = document.getElementById('telefono').value;
//             const rol = document.getElementById('rol').value;

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

//             // Mostrar el objeto JSON en la consola
//             console.log(customerData);
//         });
//     });
// });
