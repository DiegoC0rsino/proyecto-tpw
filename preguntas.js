const preguntas = [
  {
    pregunta: "¿Cómo puedo adoptar?",
    respuesta: "Entra a la sección Adoptar, elige a tu mascota y haz clic en su recuadro. Completa el formulario con tu nombre, edad, correo y el motivo por el que quieres adoptar, y presiona «Solicitar adopción». Nuestro equipo te contactará por correo para coordinar la entrega."
  },
  {
    pregunta: "¿Qué pasa después de enviar mi solicitud?",
    respuesta: "Revisaremos tu solicitud y te escribiremos al correo que ingresaste. Es posible que te hagamos algunas preguntas sobre tu hogar y tu experiencia con mascotas, para asegurarnos de que tú y tu nuevo amigo sean una buena pareja."
  },
  {
    pregunta: "¿Cómo puedo donar?",
    respuesta: "Ve a la sección Donar, elige un monto rápido (S/ 10, S/ 20 o S/ 50) o escribe el monto que prefieras. Luego selecciona tu método de pago (Yape, Plin o tarjeta de débito/crédito) y presiona «Donar». Antes de procesarla te pediremos confirmar el monto."
  },
  {
    pregunta: "¿En qué se usan las donaciones?",
    respuesta: "Todo lo que recibimos se destina a los animales del albergue: compra de alimentos, mejoras en nuestros equipos de veterinaria y medicamentos para su cuidado."
  },
  {
    pregunta: "¿Cómo compro un artículo?",
    respuesta: "En Comprar artículos elige un producto, indica la cantidad (hasta el stock disponible) y presiona «Agregar al carrito». Luego entra a «Ver carrito», revisa tu compra y presiona «Continuar proceso» para elegir tu método de pago y finalizar."
  },
  {
    pregunta: "¿Dónde se entregan los artículos?",
    respuesta: "Cada artículo indica su disponibilidad: algunos se entregan en todo Lima y otros solo en Villa María. Revisa la disponibilidad en la ficha del producto antes de comprar."
  }
];


const listaPreguntas = document.getElementById("lista-preguntas");
const ventanaPregunta = document.getElementById("ventana-pregunta");
const tituloPregunta = document.getElementById("titulo-pregunta");
const textoRespuesta = document.getElementById("texto-respuesta");

if (listaPreguntas && ventanaPregunta) {
  preguntas.forEach(function (p) {
    // un botón por pregunta
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-accion";
    boton.textContent = p.pregunta;

    // al hacer clic: se llena la ventana (pregunta arriba, respuesta abajo) y se abre
    boton.addEventListener("click", function () {
      tituloPregunta.textContent = p.pregunta;
      textoRespuesta.textContent = p.respuesta;
      ventanaPregunta.showModal();
    });

    listaPreguntas.appendChild(boton);
  });
}