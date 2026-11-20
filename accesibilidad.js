
// ==========================================================
//  CÓDIGO COMÚN A TODAS LAS PÁGINAS
//  1) Modo daltónico y modo oscuro
//  2) Menú hamburguesa
//  3) Botón "Ver carrito" (solo aparece si hay productos)
//  4) Ventanas emergentes (pop-ups): cerrar con ✕, Esc o clic afuera
// ==========================================================


// ---------- 1) MODO DALTÓNICO ----------

const botonDaltonismo = document.getElementById("boton-daltonismo");

const modoGuardado = localStorage.getItem("modo-daltonico") === "activo";

document.body.classList.toggle("modo-daltonico", modoGuardado);

function actualizarBoton() {
    if (!botonDaltonismo) return;

    const activo = document.body.classList.contains("modo-daltonico");

    botonDaltonismo.textContent = activo
        ? "Desactivar modo daltónico"
        : "Activar modo daltónico";

    botonDaltonismo.setAttribute("aria-pressed", activo);
}

actualizarBoton();

if (botonDaltonismo) {
    botonDaltonismo.addEventListener("click", function () {
        const activo = document.body.classList.toggle("modo-daltonico");

        localStorage.setItem(
            "modo-daltonico",
            activo ? "activo" : "inactivo"
        );

        actualizarBoton();
    });
}


// ---------- MODO OSCURO ----------

const botonModoOscuro = document.getElementById("boton-modo-oscuro");
const modoOscuroGuardado = localStorage.getItem("modo-oscuro") === "activo";

document.body.classList.toggle("modo-oscuro", modoOscuroGuardado);

function actualizarBotonOscuro() {
    if (!botonModoOscuro) return;
    const activo = document.body.classList.contains("modo-oscuro");
    botonModoOscuro.textContent = activo ? "Desactivar modo oscuro" : "Activar modo oscuro";
    botonModoOscuro.setAttribute("aria-pressed", activo);
}

if (botonModoOscuro) {
    botonModoOscuro.addEventListener("click", function () {
        const activo = document.body.classList.toggle("modo-oscuro");
        localStorage.setItem("modo-oscuro", activo ? "activo" : "inactivo");
        actualizarBotonOscuro();
    });
}

actualizarBotonOscuro();


// ---------- 2) MENÚ HAMBURGUESA ----------

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuCerrar = document.getElementById("menu-cerrar");

// capa oscura que tapa la página cuando el menú está abierto
const menuFondo = document.createElement("span");
menuFondo.className = "menu-fondo";
document.body.appendChild(menuFondo);

function abrirMenu() {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.add("open");
    document.body.classList.add("menu-abierto");
    menuBtn.setAttribute("aria-expanded", "true");
    if (menuCerrar) menuCerrar.focus();
}

function cerrarMenu() {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-abierto");
    menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", abrirMenu);
    menuFondo.addEventListener("click", cerrarMenu);

    if (menuCerrar) {
        menuCerrar.addEventListener("click", function () {
            cerrarMenu();
            menuBtn.focus();
        });
    }

    // al elegir una opción el menú se cierra
    navLinks.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", cerrarMenu);
    });

    // tecla Esc
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && navLinks.classList.contains("open")) {
            cerrarMenu();
            menuBtn.focus();
        }
    });
}


// ---------- 3) BOTÓN "VER CARRITO" ----------
// Solo se muestra cuando el usuario ya añadió algún producto
// (y no en la propia página del carrito).

function actualizarBotonCarrito() {
    const boton = document.getElementById("boton-carrito");
    if (!boton) return;

    let carrito = [];
    try {
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (error) {
        carrito = [];
    }

    const estaEnElCarrito = document.getElementById("lista-carrito") !== null;
    boton.hidden = !Array.isArray(carrito) || carrito.length === 0 || estaEnElCarrito;
}

actualizarBotonCarrito();
window.addEventListener("storage", actualizarBotonCarrito);   // cambios hechos en otra pestaña
window.addEventListener("pageshow", actualizarBotonCarrito);  // al volver con la flecha "atrás"


// ---------- 4) VENTANAS EMERGENTES (<dialog class="ventana-emergente">) ----------

document.addEventListener("click", function (evento) {
    // botones con data-cerrar-ventana cierran su ventana
    const botonCerrar = evento.target.closest("[data-cerrar-ventana]");
    if (botonCerrar) {
        const ventana = botonCerrar.closest("dialog");
        if (ventana) ventana.close();
        return;
    }

    // clic en la zona oscura de afuera
    if (evento.target.matches("dialog.ventana-emergente")) {
        evento.target.close();
    }
});