// ==========================================================
//  CARRITO DE COMPRAS
//  Cuando el usuario pulsa "Agregar al carrito" (producto.html),
//  el producto se guarda en el navegador (localStorage) con la
//  clave "carrito". Aquí se leen, se dibujan como fichas y se
//  pueden cambiar (+ / -), eliminar o vaciar. Con "Continuar
//  proceso" se abre la ventana del método de pago y, al
//  finalizar, se muestra la página de gracias.
//
//  Este archivo usa la lista "productos" de productos.js para
//  tomar la foto, el precio y el stock actualizados.
// ==========================================================

const listaCarrito = document.getElementById("lista-carrito");
const subtotalCarrito = document.getElementById("subtotal-carrito");
const totalCarrito = document.getElementById("total-carrito");
const unidadesCarrito = document.getElementById("unidades-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");
const botonContinuar = document.getElementById("continuar-proceso");
const ventanaPago = document.getElementById("ventana-pago");
const formPago = document.getElementById("form-pago");
const montoPago = document.getElementById("monto-pago");

// Crea un elemento: crear("p", "clase", "texto")
function crear(etiqueta, clase, texto) {
    const e = document.createElement(etiqueta);
    if (clase) e.className = clase;
    if (texto !== undefined) e.textContent = texto;
    return e;
}

// Obtener los productos guardados
function obtenerCarrito() {
    try {
        const datos = JSON.parse(localStorage.getItem("carrito"));
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        return []; // si el dato está dañado, empezamos con el carrito vacío
    }
}

// Guardar los cambios del carrito
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Junta lo guardado en el carrito con los datos actuales del catálogo
// (así la foto, el precio y el stock siempre están al día)
function completarProducto(item) {
    const catalogo = (typeof productos !== "undefined")
        ? productos.find(function (p) { return p.id === item.id; })
        : null;

    const stock = catalogo ? catalogo.stock : item.stock;

    return {
        id: item.id,
        nombre: catalogo ? catalogo.nombre : item.nombre,
        precio: catalogo ? catalogo.precio : item.precio,
        imagen: catalogo ? catalogo.imagen : item.imagen,
        alt: catalogo ? catalogo.alt : (item.alt || item.nombre),
        stock: stock,
        cantidad: Math.min(item.cantidad, stock)
    };
}

// Botón con estilo: crearBoton("+", "btn-cantidad", funcion, "Aumentar cantidad")
function crearBoton(texto, clases, alHacerClick, etiquetaAccesible) {
    const boton = crear("button", "btn-accion " + clases, texto);
    boton.type = "button";
    if (etiquetaAccesible) boton.setAttribute("aria-label", etiquetaAccesible);
    boton.addEventListener("click", alHacerClick);
    return boton;
}

// Dibuja la ficha de un producto: info | cantidad | total | foto
function crearFicha(producto) {
    const ficha = crear("article", "ficha-carrito");

    // --- información ---
    const info = crear("div", "ficha-info");
    info.append(
        crear("h3", null, producto.nombre),
        crear("p", null, "Precio unitario: S/ " + producto.precio.toFixed(2)),
        crear("p", "ficha-stock", "Stock disponible: " + producto.stock)
    );

    // --- control de cantidad  [-]  2  [+] ---
    const control = crear("div", "control-cantidad");
    control.setAttribute("role", "group");
    control.setAttribute("aria-label", "Cantidad de " + producto.nombre);

    const disminuir = crearBoton("−", "btn-cantidad", function () {
        cambiarCantidad(producto.id, -1);
    }, "Disminuir cantidad");
    disminuir.disabled = producto.cantidad <= 1;              // no baja de 1

    const aumentar = crearBoton("+", "btn-cantidad", function () {
        cambiarCantidad(producto.id, 1);
    }, "Aumentar cantidad");
    aumentar.disabled = producto.cantidad >= producto.stock;  // no pasa del stock

    control.append(disminuir, crear("span", "cantidad-valor", String(producto.cantidad)), aumentar);

    // --- total de la ficha y botón eliminar ---
    const lado = crear("div", "ficha-total");
    lado.append(
        crear("p", "ficha-etiqueta", "Total"),
        crear("p", "ficha-importe", "S/ " + (producto.precio * producto.cantidad).toFixed(2)),
        crearBoton("Eliminar", "btn-eliminar", function () {
            eliminarProducto(producto.id);
        }, "Eliminar " + producto.nombre + " del carrito")
    );

    // --- foto del producto (a la derecha) ---
    const foto = crear("img", "ficha-foto");
    foto.src = producto.imagen;
    foto.alt = producto.alt;

    ficha.append(info, control, lado, foto);
    return ficha;
}

// Mensaje cuando no hay productos
function crearCarritoVacio() {
    const caja = crear("div", "carrito-vacio");
    const enlace = crear("a", "btn-accion", "Ver artículos");
    enlace.href = "articulos.html";
    caja.append(
        crear("h3", null, "Tu carrito está vacío"),
        crear("p", null, "Agrega productos para tus mascotas y aparecerán aquí."),
        enlace
    );
    return caja;
}

// Calcula el total de todo el carrito
function calcularTotal() {
    return obtenerCarrito().map(completarProducto).reduce(function (suma, p) {
        return suma + p.precio * p.cantidad;
    }, 0);
}

// Mostrar los productos en pantalla
function mostrarCarrito() {
    const carrito = obtenerCarrito().map(completarProducto);

    listaCarrito.innerHTML = "";

    let subtotal = 0;
    let unidades = 0;

    if (carrito.length === 0) {
        listaCarrito.appendChild(crearCarritoVacio());
    } else {
        carrito.forEach(function (producto) {
            listaCarrito.appendChild(crearFicha(producto));
            subtotal += producto.precio * producto.cantidad;
            unidades += producto.cantidad;
        });
    }

    unidadesCarrito.textContent = unidades;
    subtotalCarrito.textContent = subtotal.toFixed(2);
    totalCarrito.textContent = subtotal.toFixed(2);

    // con el carrito vacío los botones del resumen se bloquean
    botonVaciar.disabled = carrito.length === 0;
    botonContinuar.disabled = carrito.length === 0;
}

// Aumentar o disminuir la cantidad
function cambiarCantidad(id, cambio) {
    const carrito = obtenerCarrito();
    const item = carrito.find(function (producto) { return producto.id === id; });

    if (!item) return;

    const producto = completarProducto(item);
    const nuevaCantidad = producto.cantidad + cambio;

    if (nuevaCantidad < 1 || nuevaCantidad > producto.stock) {
        return;
    }

    item.cantidad = nuevaCantidad;

    guardarCarrito(carrito);
    mostrarCarrito();
}

// Eliminar un producto
function eliminarProducto(id) {
    const carrito = obtenerCarrito().filter(function (producto) {
        return producto.id !== id;
    });

    guardarCarrito(carrito);
    mostrarCarrito();
}

// Vaciar todo el carrito (pide confirmación para no borrar por error)
botonVaciar.addEventListener("click", function () {
    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        mostrarCarrito();
    }
});

// "Continuar proceso": abre la ventana del método de pago con el monto acumulado
botonContinuar.addEventListener("click", function () {
    if (obtenerCarrito().length === 0) return;

    montoPago.textContent = calcularTotal().toFixed(2);
    formPago.reset();               // sin método de pago elegido al abrir
    ventanaPago.showModal();
});

// "Finalizar compra": vacía el carrito y muestra la página de gracias
formPago.addEventListener("submit", function (evento) {
    evento.preventDefault();

    localStorage.removeItem("carrito");
    window.location.href = "gracias-compra.html";
});

// Mostrar el carrito al abrir la página
mostrarCarrito();