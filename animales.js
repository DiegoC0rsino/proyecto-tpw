// ==========================================================
//  ANIMALES EN ADOPCIÓN
//  Para agregar o editar una mascota, solo toca esta lista.
//  Cada animal es un bloque { ... } separado por coma.
// ==========================================================
const animales = [
  {
    id: "milo", // sin espacios ni tildes, único para cada animal
    nombre: "Milo",
    imagen: "https://i.postimg.cc/Bn2p58Gf/milo-jpg.jpg",
    alt: "No cargo la foto-perro",
    edad: "1 año",
    categoria: "Criado en el albergue",
    sexo: "Macho",
    raza: "Husky",
    historia: "Llego al albergue por medio de una familia cuyo husky tuvo crias. Fue criado en el albergue con mucho cariño",
    destacado: "¡Ahora busca una familia la cual llenar de felicidad!" // sale en negrita al final
  },
  {
    id: "maya",
    nombre: "Maya",
    imagen: "https://i.postimg.cc/qv2wctdf/maya-jpg.jpg",
    alt: "No cargo la foto-perro",
    edad: "1 año",
    categoria: "Rescatado",
    sexo: "Hembra",
    raza: "Mestizo de Boyero de Appenzell y Pinscher",
    historia: "Maya fue rescatada de las calles de Chorrillos. Llego con mucha hambre y varias lesiones; fue cuidada y tratada para que pueda a ser un perra feliz",
    destacado: "¡Ahora busca una familia la cual llenar de felicidad!"
  },
  {
    id: "tom",
    nombre: "Tom",
    imagen: "https://i.postimg.cc/YSk3dptV/tom-jpg.jpg",
    alt: "No carga la foto-gato",
    edad: "8 meses",
    categoria: "Rescatado",
    sexo: "Macho",
    raza: "Siberiano",
    historia: "Tom fue rescatado de un cumulo de basura en villa el salvador. En el albergue lo trataron para que puede ser un gato feliz",
    destacado: "¡Ahora busca una familia la cual llenar de felicidad!"
  },
  {
    id: "milton",
    nombre: "Milton",
    imagen: "https://i.postimg.cc/tgy5BX9m/milton-jpg.jpg",
    alt: "No carga la foto-perro",
    edad: "5 meses",
    categoria: "Criado en el albergue",
    sexo: "Macho",
    raza: "Schnauzer",
    historia: "Milton nacio en el albergue, su madre es una mascota de uno de nuestros voluntarios.",
    destacado: "¡Esta en busca de una familia la cual llenar de felicidad!"
  },
  {
    id: "michi",
    nombre: "Michi",
    imagen: "https://i.postimg.cc/mg7j3cWv/michi-jpg.jpg",
    alt: "No cargo el foto-gato",
    edad: "3 años",
    categoria: "Criado en el albergue",
    sexo: "Hembra",
    raza: "Mestiza-Naranja",
    historia: "Michi nacio en el albergue, su madre es una mascota de uno de nuestros voluntarios.",
    destacado: "¡Esta en busca de una familia la cual llenar de felicidad!"
  }, {
    id: "luna",                      // único, en minúsculas, sin espacios ni tildes
    nombre: "Luna",
    imagen: "https://i.postimg.cc/YSk3dptJ/luna-jpg.jpg",
    alt: "Foto de Luna",
    edad: "2 años",
    categoria: "Rescatada",
    sexo: "Hembra",
    raza: "Mestiza",
    historia: "Luna fue rescatada de las calles de Lima. Llegó con mucha hambre y varias lesiones; fue cuidada y tratada para que pueda ser una perra feliz",
    destacado: "¡Ahora busca una familia la cual llenar de felicidad!"
  }
];

// ==========================================================
//  A partir de aquí no necesitas tocar nada
// ==========================================================

// Crea un elemento: crear("p", "clase", "texto")
function crear(etiqueta, clase, texto) {
  const e = document.createElement(etiqueta);
  if (clase) e.className = clase;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

// Bloque con nombre, edad, categoría, sexo, raza e historia
function crearDescripcion(a) {
  const d = crear("div", "descripcion");
  d.appendChild(crear("h2", null, a.nombre));

  [["Edad", a.edad], ["Categoria", a.categoria], ["Sexo", a.sexo], ["Raza", a.raza]].forEach(function (par) {
    const p = crear("p");
    p.append(crear("strong", null, par[0] + ":"), " " + par[1]);
    d.appendChild(p);
  });

  const historia = crear("p");
  historia.append(crear("strong", null, "Historia:"), " " + a.historia + " ", crear("strong", null, a.destacado));
  d.appendChild(historia);
  return d;
}

// Campo del formulario: etiqueta + input (o textarea)
function crearCampo(form, id, texto, tipo, extra) {
  const label = crear("label", null, texto);
  label.htmlFor = id;
  const campo = tipo === "textarea" ? crear("textarea") : crear("input");
  if (tipo !== "textarea") campo.type = tipo;
  campo.id = id;
  campo.name = id;
  campo.required = true;
  if (extra) Object.assign(campo, extra);
  form.append(label, campo);
}

// ---------- INDEX: dibuja las tarjetas ----------
const lista = document.getElementById("lista-animales");
if (lista) {
  animales.forEach(function (a) {
    const tarjeta = crear("article", "tarjeta-animal");
    const enlace = crear("a", "enlace-tarjeta");
    enlace.href = "adoptar.html?id=" + encodeURIComponent(a.id);
    enlace.setAttribute("aria-label", "Adoptar a " + a.nombre);

    const foto = crear("img", "foto-animal");
    foto.src = a.imagen;
    foto.alt = a.alt;

    enlace.append(foto, crearDescripcion(a));
    tarjeta.appendChild(enlace);
    lista.appendChild(tarjeta);
  });
}

// ---------- ADOPTAR: dibuja la info + el formulario del animal elegido ----------
const contenedor = document.getElementById("contenedor-adopcion");
if (contenedor) {
  const id = new URLSearchParams(window.location.search).get("id");
  const a = animales.find(function (x) { return x.id === id; });

  if (!a) {
    // enlace incorrecto o sin animal elegido
    contenedor.classList.add("contenedor-confirmacion");
    const caja = crear("section", "recuadro-confirmacion");
    const volver = crear("a", "btn-accion", "Ver animales en adopción");
    volver.href = "index.html";
    caja.append(crear("h2", null, "No encontramos a ese animal"), volver);
    contenedor.appendChild(caja);
  } else {
    document.title = "Petsaving - Adoptar a " + a.nombre;

    const tarjeta = crear("article", "tarjeta-perro");

    // lado izquierdo: foto + descripción
    const info = crear("div", "info-perro");
    const foto = crear("img", "foto-perro");
    foto.src = a.imagen;
    foto.alt = a.alt;
    info.append(foto, crearDescripcion(a));

    // lado derecho: formulario
    const form = crear("form", "formulario-adopcion");
    form.appendChild(crear("h3", null, "Formulario de Adopción"));
    crearCampo(form, "nombre", "Ingrese su nombre y apellidos:", "text");
    crearCampo(form, "edad", "Ingrese su edad:", "number", { min: 1, max: 120 });
    crearCampo(form, "correo", "Ingrese su correo:", "email");
    //
    crearCampo(form, "historia", "Ingrese su motivo de adopción:", "textarea", { maxLength: 250 });
    const motivo = form.querySelector("#historia");
    const caja = crear("span", "caja-motivo");
    const contador = crear("span", "contador", "0/250");
    form.insertBefore(caja, motivo);
    caja.append(motivo, contador);
    motivo.oninput = function () {
      contador.textContent = motivo.value.length + "/250";
    };
    //
    const boton = crear("button", null, "Solicitar adopción");
    boton.type = "submit";
    form.appendChild(boton);

    // al enviar: en vez de cambiar de página se abre la ventana emergente
    // (el botón ya está bloqueado por CSS mientras falte algún dato)
    const ventana = document.getElementById("ventana-adopcion");
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();
      ventana.showModal();
    });
    // al cerrar la ventana (Aceptar, Esc o clic afuera) se vuelve a los animales
    ventana.addEventListener("close", function () {
      window.location.href = "index.html";
    });
    tarjeta.append(info, form);
    contenedor.appendChild(tarjeta);
  }
}