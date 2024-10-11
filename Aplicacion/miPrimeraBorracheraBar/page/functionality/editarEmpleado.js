document.addEventListener("DOMContentLoaded", async () => {
    // Obtener el ID del empleado de la URL
    const params = new URLSearchParams(window.location.search);
    const empleadoId = params.get("id");

    console.log("ID del empleado:", empleadoId); // Depuración

    if (empleadoId) {
        try {
            const token = sessionStorage.getItem('jwtToken');
            console.log("Token:", token); // Depuración

            const response = await fetch(`http://localhost:8080/empleado/${empleadoId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log("Respuesta del servidor:", response); // Depuración

            if (response.ok) {
                const empleado = await response.json();
                console.log("Datos del empleado:", empleado); // Depuración
                
                // Rellenar el formulario con la información del empleado
                document.getElementById("nombreEdit").value = empleado.nombre;
                document.getElementById("apellidoEdit").value = empleado.apellidos;
                document.getElementById("direccionEdit").value = empleado.direccion;
                document.getElementById("emailEdit").value = empleado.email;
                document.getElementById("telefonoEdit").value = empleado.telefono;
                
                // Cargar roles y sedes
                await cargarRoles();
                await cargarSedes();
                
                // Seleccionar la sede correcta
                const sedeSelect = document.getElementById("sedeEdit");
                if (sedeSelect) {
                    sedeSelect.value = empleado.sede.id;
                }

                // Seleccionar el rol correcto
                const rolSelect = document.getElementById("rolEdit");
                if (rolSelect) {
                    rolSelect.value = empleado.rol.id;
                }


            } else {
                console.error("Error al cargar los datos del empleado");
            }


        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }
});

async function cargarRoles() {
    try {
        const token = sessionStorage.getItem('jwtToken');
        const response = await fetch('http://localhost:8080/rol', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const roles = await response.json();
            const rolSelect = document.getElementById("rolEdit");
            roles.forEach(rol => {
                const option = document.createElement('option');
                option.value = rol.id;
                option.textContent = rol.nombre;
                rolSelect.appendChild(option);
            });
        } else {
            console.error("Error al cargar los roles");
        }
    } catch (error) {
        console.error("Error en la solicitud de roles:", error);
    }
}

async function cargarSedes() {
    try {
        const token = sessionStorage.getItem('jwtToken');
        const response = await fetch('http://localhost:8080/sede', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const sedes = await response.json();
            const sedeSelect = document.getElementById("sedeEdit");
            sedes.forEach(sede => {
                const option = document.createElement('option');
                option.value = sede.id;
                option.textContent = sede.nombre;
                sedeSelect.appendChild(option);
            });
        } else {
            console.error("Error al cargar las sedes");
        }
    } catch (error) {
        console.error("Error en la solicitud de sedes:", error);
    }
}

// Manejar la actualización del formulario
document.getElementById("employeeEditForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const empleadoId = new URLSearchParams(window.location.search).get("id");

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
        const response = await fetch(`http://localhost:8080/empleado/${empleadoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(empleadoEditado),
        });

        console.log("Respuesta del servidor (actualización):", response); // Depuración

        if (response.ok) {
            alert("Empleado actualizado con éxito");
            window.location.href = "index.html"; // Redirigir a la página principal
        } else {
            console.error("Error al actualizar el empleado");
        }
    } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
    }
});