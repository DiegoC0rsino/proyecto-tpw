

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