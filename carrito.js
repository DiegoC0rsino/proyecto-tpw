
const listaCarrito = document.getElementById("lista-carrito");
const subtotalCarrito = document.getElementById("subtotal-carrito");
const totalCarrito = document.getElementById("total-carrito");

// Obtener los productos guardados
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar los cambios del carrito
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar los productos en pantalla
function mostrarCarrito() {
    const carrito = obtenerCarrito();

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.textContent = "Tu carrito está vacío.";
        subtotalCarrito.textContent = "0.00";
        totalCarrito.textContent = "0.00";
        return;
    }

    let subtotal = 0;

    carrito.forEach(producto => {
        const contenedor = document.createElement("div");
        contenedor.className = "tarjeta-producto";

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = "Precio: S/ " + producto.precio.toFixed(2);

        const cantidad = document.createElement("p");
        cantidad.textContent = "Cantidad: " + producto.cantidad;

        const importe = document.createElement("p");
        importe.textContent = "Total: S/ " +
            (producto.precio * producto.cantidad).toFixed(2);

        const disminuir = document.createElement("button");
        disminuir.textContent = "-";
        disminuir.type = "button";

        disminuir.addEventListener("click", function () {
            cambiarCantidad(producto.id, -1);
        });

        const aumentar = document.createElement("button");
        aumentar.textContent = "+";
        aumentar.type = "button";

        aumentar.addEventListener("click", function () {
            cambiarCantidad(producto.id, 1);
        });

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.type = "button";

        eliminar.addEventListener("click", function () {
            eliminarProducto(producto.id);
        });

        contenedor.appendChild(nombre);
        contenedor.appendChild(precio);
        contenedor.appendChild(cantidad);
        contenedor.appendChild(importe);
        contenedor.appendChild(disminuir);
        contenedor.appendChild(aumentar);
        contenedor.appendChild(eliminar);

        listaCarrito.appendChild(contenedor);

        subtotal += producto.precio * producto.cantidad;
    });

    subtotalCarrito.textContent = subtotal.toFixed(2);
    totalCarrito.textContent = subtotal.toFixed(2);
}

// Aumentar o disminuir la cantidad
function cambiarCantidad(id, cambio) {
    const carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === id);

    if (!producto) return;

    const nuevaCantidad = producto.cantidad + cambio;

    if (nuevaCantidad < 1) {
        return;
    }

    if (nuevaCantidad > producto.stock) {
        alert("No hay más unidades disponibles de este producto.");
        return;
    }

    producto.cantidad = nuevaCantidad;

    guardarCarrito(carrito);
    mostrarCarrito();
}

// Eliminar un producto
function eliminarProducto(id) {
    let carrito = obtenerCarrito();

    carrito = carrito.filter(producto => producto.id !== id);

    guardarCarrito(carrito);
    mostrarCarrito();
}

// Vaciar todo el carrito
document.getElementById("vaciar-carrito").addEventListener("click", function () {
    localStorage.removeItem("carrito");
    mostrarCarrito();
});

// Finalizar compra
document.getElementById("finalizar-compra").addEventListener("click", function () {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    localStorage.removeItem("carrito");
    window.location.href = "gracias-compra.html";
});

// Mostrar el carrito al abrir la página
mostrarCarrito();
