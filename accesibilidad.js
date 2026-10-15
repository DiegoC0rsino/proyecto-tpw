

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
