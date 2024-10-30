const BASE_URL = (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") 
? "http://localhost:8080" 
: "https://lonely-cackle-9pw6q9474r93wxr-8080.app.github.dev";

console.log(BASE_URL);

// Función para convertir la imagen a Base64
function convertirBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}



export function CrearProductos() {
    const formContainer = document.getElementById('showData');
    const IMGBB_API_KEY = '1a3d730813be69ae130ffcc8ea3da46c'; 

    formContainer.innerHTML = `
        <form id="productoCreateForm">
            <h2 class="glow-text">Creación de Productos</h2>
                <div class="main-form">
                    <label for="nombre">Nombre del producto:</label>
                    <input type="text" id="nombre" name="nombre" required>

                    <label for="precioDistribuidor">Precio del distribuidor:</label>
                    <input type="number" id="precioDistribuidor" name="precioDistribuidor" required>
                    
                    <label for="imagen">Imagen del producto:</label>
                    <input type="file" id="imagen" name="imagen" accept="image/*">
                    <div id="imagenPreview" style="margin-top: 10px;">
                        <img id="previewImg" src="" alt="Vista previa" style="display: none; max-width: 200px;">
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" id="cancelar">Cancelar</button>
                    <button type="submit" id="guardar">Guardar</button>
                </div>
        </form>
    `;
    
    const mainContent = document.querySelector('main');
    mainContent.appendChild(formContainer);

    // Mostrar vista previa de la imagen
    document.getElementById("imagen").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const previewImg = document.getElementById("previewImg");
            previewImg.style.display = "block";
            previewImg.src = URL.createObjectURL(file);
        }
    });

    document.getElementById("productoCreateForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        try {
            const nombre = document.getElementById('nombre').value;
            const precioDistribuidor = document.getElementById('precioDistribuidor').value;
            const imagenInput = document.getElementById('imagen');
            
            if (!imagenInput.files || !imagenInput.files[0]) {
                throw new Error('Por favor seleccione una imagen');
            }

            // Primero subimos la imagen a ImgBB
            const formData = new FormData();
            formData.append('image', imagenInput.files[0]);

            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });

            const imgbbData = await imgbbResponse.json();
            
            if (!imgbbData.success) {
                throw new Error('Error al subir la imagen');
            }

            // Ahora creamos el producto con el link de la imagen
            const productData = {
                nombre: nombre,
                precio_distribuidor: precioDistribuidor,
                imagen: imgbbData.data.url // URL directa de la imagen
            };

            const token = sessionStorage.getItem('jwtToken');

            const response = await fetch(`${BASE_URL}/producto`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            const data = await response.json();
            console.log("Producto creado con éxito:", data);
            alert("Producto creado con éxito");
            document.getElementById('productoCreateForm').reset();
            document.getElementById('previewImg').style.display = 'none';

        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Error al crear el producto");
        }
    });

    document.getElementById("cancelar").addEventListener("click", function(event) {
        document.getElementById('productoCreateForm').reset();
        document.getElementById('previewImg').style.display = 'none';
    });
}

export function MostrarProductos(){
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
        
        // Rellenar el formulario con la información del empleado
        document.getElementById("nombreEdit").value = data.nombre;
        document.getElementById("ciudadEdit").value = data.ciudad;
        document.getElementById("direccionEdit").value = data.direccion;
        
        
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
export function cargarProductos() {
    const token = sessionStorage.getItem('jwtToken');
    fetch(`${BASE_URL}/sede`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.text()))
    .then(Productos => {
        const selectSede = document.getElementById('sede');
        selectSede.innerHTML = ''; // Limpiar opciones anteriores

        // Agregar una opción por defecto que no sea válida
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.text = "Selecciona una sede";
        defaultOption.disabled = true;
        defaultOption.selected = true; // Marcarla como seleccionada por defecto
        selectSede.appendChild(defaultOption);

        // Agregar las Productos dinámicamente
        Productos.forEach(sede => {
            const option = document.createElement('option');
            option.value = sede.id;
            option.text = sede.nombre;
            selectSede.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al cargar Productos:", error);
        alert("Ocurrió un error al cargar las Productos. Revisa la consola para más detalles.");
    });
}
export function cargarProductosEdicion(selectedSedeId) {
    const token = sessionStorage.getItem('jwtToken');
    fetch(`${BASE_URL}/sede`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.text()))
    .then(Productos => {
        const selectSede = document.getElementById('sedeEdit');
        selectSede.innerHTML = ''; // Limpiar opciones anteriores

        // Agregar las Productos dinámicamente
        Productos.forEach(sede => {
            const option = document.createElement('option');
            option.value = sede.id;
            option.text = sede.nombre;
            if (sede.id === selectedSedeId) {
                option.selected = true; // Marcar la sede correspondiente como seleccionada por defecto
            }
            selectSede.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al cargar Productos:", error);
        alert("Ocurrió un error al cargar las Productos. Revisa la consola para más detalles.");
    });
}

window.editarSede = editarSede
window.questionDeleteSede = questionDeleteSede