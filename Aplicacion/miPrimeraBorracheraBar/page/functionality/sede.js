export function cargarSedes() {
    const token = sessionStorage.getItem('jwtToken');
    fetch("http://localhost:8080/sede", {
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