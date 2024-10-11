export function cargarRoles() {
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

        // Agregar una opción por defecto que no sea válida
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.text = "Selecciona un rol";
        defaultOption.disabled = true; // Impide que sea seleccionable una vez que se elige otro
        defaultOption.selected = true; // Marcarla como seleccionada por defecto
        selectRol.appendChild(defaultOption);

        // Agregar las opciones de roles dinámicamente
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

// Validar la selección de rol en el envío del formulario

