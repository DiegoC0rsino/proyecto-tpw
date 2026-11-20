// Botones de monto rápido: escriben el valor en el recuadro
function elegirMonto(valor) {
    document.getElementById("monto").value = valor;
}

// Pregunta antes de enviar la donación
function confirmarDonacion() {
    const monto = document.getElementById("monto").value;
    return confirm("¿Deseas donar S/ " + monto + "?");
}