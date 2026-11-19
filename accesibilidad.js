

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

// MODO OSCURO

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
    botonModoOscuro.addEventListener("click", () => {
        const activo = document.body.classList.toggle("modo-oscuro");
        localStorage.setItem("modo-oscuro", activo ? "activo" : "inactivo");
        actualizarBotonOscuro();
    });
}
actualizarBotonOscuro();

// --- CONTROL DEL MENÚ RESPONSIVO ---
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    document.querySelectorAll("#nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });
// aviso donacion

function elegirMonto(valor) {
    document.getElementById("monto").value = valor;
}

function confirmarDonacion() {
    const monto = document.getElementById("monto").value;
    return confirm("¿Deseas donar S/ " + monto + "?");
}
// preguntas frecuentes
function mostrarRespuesta(id) {
    const respuesta = document.getElementById(id);
    const estabaOculta = respuesta.hidden;

    // oculta las 4 respuestas
    for (let i = 1; i <= 4; i++) {
        document.getElementById("resp" + i).hidden = true;
    }

    // si la que presionaste estaba oculta, la muestra
    if (estabaOculta) {
        respuesta.hidden = false;
    }
}