const BASE_URL = (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") 
? "http://localhost:8080" 
: "https://lonely-cackle-9pw6q9474r93wxr-8080.app.github.dev";

console.log(BASE_URL);

export function CrearProductos() {
    document.getElementById('titleSection').textContent = 'Modulo Producto';
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

            // Limpieza de la vista de imagenes
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
        autoClickButton("Dashboard")
    });
}


export function MostrarProductos() {
    document.getElementById('titleSection').textContent = 'Productos Registrados';

    const token = sessionStorage.getItem('jwtToken'); 
    fetch(`${BASE_URL}/producto`, {
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
            const precio_distribuidor_co = parseFloat(data.precio_distribuidor).toLocaleString('es-CO');
            html += `
                <div class="card">
                    <div class="card-image">
                        <img src="${data.imagen}" alt="${data.nombre}" class="product-image"/>
                    </div>
                    <div class="card-content">
                        <h1>
                            ${data.nombre}
                        </h1>
                        <h3>Precio: $${precio_distribuidor_co}</h3>
                    </div>
                    <div class="buttons">
                        <button class="edit-btn" onclick="editarProducto(${data.id})">Editar</button>
                        <button class="delete-btn" onclick="questionDeleteProduct(${data.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        clientCardsContainer.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
}



let currentProductData;
function editarProducto(id){
    const IMGBB_API_KEY = '1a3d730813be69ae130ffcc8ea3da46c'; 
    const token = sessionStorage.getItem('jwtToken'); 
    fetch(`${BASE_URL}/producto/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => { 
        currentProductData = data;
        //Inyecta formulario para edicion
        const formContainer = document.getElementById('showData');
        formContainer.innerHTML = `
				<form id="productEditForm">
                    <h2>Edición del Producto: ${data.nombre}</h2>
                        <div class="main-form">
                            <label for="nombreEdit">Nombre del producto:</label>
                            <input type="text" id="nombreEdit" name="nombre" required>

                            <label for="precioDistribuidorEdit">Precio del distribuidor:</label>
                            <input type="number" id="precioDistribuidorEdit" name="precioDistribuidor" required>
                            
                            <label for="imagenEdit">Imagen del producto:</label>
                            <input type="file" id="imagenEdit" name="imagenEdit" accept="image/*">

                            <div id="imagenPreviewEdit" style="margin-top: 10px;">
                                <img id="previewImgEdit" src="" alt="Vista previa" style="display: none; max-width: 200px;">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" id="cancelar">Cancelar</button>
                            <button type="submit" id="guardar">Guardar</button>
                        </div>
				</form>
        `;
        
        // Rellenar el formulario con la información del producto
        document.getElementById("nombreEdit").value = data.nombre;
        document.getElementById("precioDistribuidorEdit").value = data.precio_distribuidor;
        document.getElementById("previewImgEdit").src = data.imagen;
        document.getElementById("previewImgEdit").style.display = "block";
        console.log(data.id);
        
        //ENVIO de FORMULARIO EDITADO

        document.getElementById("imagenEdit").addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                const previewImg = document.getElementById("previewImgEdit");
                previewImg.style.display = "block";
                previewImg.src = URL.createObjectURL(file);
            }
        });

        document.getElementById("cancelar").addEventListener("click", function(event) {
            document.getElementById('productEditForm').reset();
            autoClickButton("showProduct_btn")
        });

        document.getElementById("productEditForm").addEventListener("submit", async function(event) {
            event.preventDefault();
        
            try {
                const nombreEdit = document.getElementById('nombreEdit').value;
                const precioDistribuidorEdit = document.getElementById('precioDistribuidorEdit').value;
                const imagenInput = document.getElementById('imagenEdit');
                
                let imagenUrl = currentProductData.imagen; // Valor por defecto con la URL de la imagen existente
                
                // Verifica si se seleccionó una nueva imagen
                if (imagenInput.files && imagenInput.files[0]) {
                    // Subimos la nueva imagen a ImgBB
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
        
                    imagenUrl = imgbbData.data.url; // Actualizamos con la URL de la nueva imagen
                }
        
                // Creación del objeto para actualizar el producto
                const productEditData = {
                    nombre: nombreEdit,
                    precio_distribuidor: precioDistribuidorEdit,
                    imagen: imagenUrl // Usa la URL de la imagen, sea la nueva o la existente
                };
        
                const token = sessionStorage.getItem('jwtToken');
        
                const response = await fetch(`${BASE_URL}/producto/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(productEditData)
                });
        
                if (!response.ok) {
                    alert('Error al Editar el producto');
                    throw new Error('Error al Editar el producto');
                } else {
                    autoClickButton('showProduct_btn');
                }
        
                // Limpieza de la vista de imagenes
                const data = await response.json();
                console.log("Producto editado con éxito:", data);
                alert("Producto editado con éxito");
                document.getElementById('productEditForm').reset();
                document.getElementById('previewImgEdit').style.display = 'none';
        
            } catch (error) {
                console.error("Error:", error);
                alert(error.message || "Error al editar el producto");
            }
        });

    })

}


// Funcion de pregunta de si quiere continuar
function questionDeleteProduct(id) {
    if (confirm("¿Realmente quiere eliminar este producto?")) {
        //Le pasa el id a la funcion Eliminar sede para eliminarlo realmente
        eliminarProducto(id);

    }
}
// Función para eliminar el empleado usando el controlador
function eliminarProducto(id) {
    const token = sessionStorage.getItem('jwtToken');
    
    fetch(`${BASE_URL}/producto/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            alert("El producto ha sido eliminado con exito.")
            autoClickButton('showProduct_btn')
        } else {
            return Promise.reject("Error al eliminar el producto");
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

export function cargarProductos() {
    const token = sessionStorage.getItem('jwtToken');
    fetch(`${BASE_URL}/producto`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.text()))
    .then(productos => {
        const selectProducto = document.getElementById('producto');
        selectProducto.innerHTML = ''; // Limpiar opciones anteriores

        // Agregar una opción por defecto que no sea válida
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.text = "Selecciona un producto";
        defaultOption.disabled = true;
        defaultOption.selected = true; 
        selectProducto.appendChild(defaultOption);

        // Agregar productos dinámicamente
        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.id;
            option.text = producto.nombre;
            selectProducto.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
        alert("Ocurrió un error al cargar los productos. Revisa la consola para más detalles.");
    });
}

window.editarProducto = editarProducto
window.questionDeleteProduct = questionDeleteProduct