// Productos disponibles con imágenes
const productos = [
    { id: 1, nombre: "Laptop", precio: 12000, imagen: "img/laptop.jpg" },
    { id: 2, nombre: "Teléfono", precio: 8000, imagen: "img/telefono.jpg" },
    { id: 3, nombre: "Auriculares", precio: 1500, imagen: "img/auriculares.jpg" }
];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalElement = document.getElementById("total");

let carrito = [];

// Mostrar productos en la página con imágenes
function mostrarProductos() {
    productos.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        listaProductos.appendChild(li);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    actualizarCarrito();
}

// Actualizar el carrito en la pantalla con imágenes
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad;
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <p>${producto.nombre} - $${producto.precio}</p>
            <input type="number" value="${producto.cantidad}" min="1" onchange="editarCantidad(${index}, this.value)">
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });

    totalElement.innerText = total.toFixed(2);
}

// Editar la cantidad de un producto en el carrito
function editarCantidad(index, cantidad) {
    if (cantidad < 1) cantidad = 1;
    carrito[index].cantidad = parseInt(cantidad);
    actualizarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Cargar los productos al iniciar
mostrarProductos();
