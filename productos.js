
const productos = [
  {
    id: "raton", 
    nombre: "Raton de juguete",
    imagen: "https://wongfood.vtexassets.com/arquivos/ids/516950-800-auto?v=637789953707370000&width=800&height=auto&aspect=true",
    alt: "no carga",
    precio: 11.00,
    disponibilidad: "Disponibilidad en todo lima",
    stock: 7 
  },
  {
    id: "pelota",
    nombre: "Pelota para perro",
    imagen: "https://wongfood.vtexassets.com/arquivos/ids/516957/PELOTA-DE-COLORES-PARA-MASCOTAS-1-254617944.jpg?v=637789953726470000",
    alt: "no carga",
    precio: 8.00,
    disponibilidad: "Disponibilidad en todo lima",
    stock: 4
  },
  {
    id: "cuerda",
    nombre: "Cuerda para perro",
    imagen: "https://wongfood.vtexassets.com/arquivos/ids/516949-800-auto?v=637789953704570000&width=800&height=auto&aspect=true",
    alt: "no carga",
    precio: 15.00,
    disponibilidad: "Disponibilidad en Villa María",
    stock: 9
  },
  {
    id: "casa-gatos",
    nombre: "Casa para gatos",
    imagen: "https://oechsle.vteximg.com.br/arquivos/ids/19730117-1000-1000/image-0.jpg?v=638670758773630000",
    alt: "no carga",
    precio: 38.00,
    disponibilidad: "Disponibilidad en todo lima",
    stock: 8
  },
  {
    id: "plato",
    nombre: "Plato para perro",
    imagen: "https://promart.vteximg.com.br/arquivos/ids/6502134-1000-1000/image-c174d8318ad24aa69f9cb1af2ac9ed08.jpg?v=637975717810200000",
    alt: "no carga",
    precio: 5.00,
    disponibilidad: "Disponibilidad en todo Villa María",
    stock: 2
  },
  {
    id: "cuerda-2",
    nombre: "Cuerda para perro",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-lpBz2ZBpUA0ip2ckTLkzgiJEo0cxkDXKUJUo0xPr5P46efY2lFUtgE&s=10",
    alt: "no carga",
    precio: 15.00,
    disponibilidad: "Disponibilidad en Villa María",
    stock: 10
  }
];


function crear(etiqueta, clase, texto) {
  const e = document.createElement(etiqueta);
  if (clase) e.className = clase;
  if (texto !== undefined) e.textContent = texto;
  return e;
}


function formatearPrecio(valor) {
  return "S/ " + valor.toFixed(2);
}

// area de la página donde se dibujan las tarjetas de productos
const listaProductos = document.getElementById("lista-productos");
if (listaProductos) {
  productos.forEach(function (p) {
    const tarjeta = crear("article", "tarjeta-producto");
    const enlace = crear("a", "enlace-producto");
    enlace.href = "producto.html?id=" + encodeURIComponent(p.id);
    enlace.setAttribute("aria-label", "Ver " + p.nombre);

    const foto = crear("img", "foto-producto");
    foto.src = p.imagen;
    foto.alt = p.alt;

    const info = crear("div", "info-producto");
    info.append(
      crear("h2", null, p.nombre),
      crear("p", "precio", formatearPrecio(p.precio)),
      crear("p", "disponibilidad", p.disponibilidad)
    );

    enlace.append(foto, info);
    tarjeta.appendChild(enlace);
    listaProductos.appendChild(tarjeta);
  });
}

// producto.html: dibuja la ficha del producto y el botón para agregar al carrito
const contenedorProducto = document.getElementById("contenedor-producto");
if (contenedorProducto) {
  const id = new URLSearchParams(window.location.search).get("id");
  const p = productos.find(function (x) { return x.id === id; });

  if (!p) {
    // enlace incorrecto o sin producto elegido
    contenedorProducto.classList.add("contenedor-confirmacion");
    const caja = crear("section", "recuadro-confirmacion");
    const volver = crear("a", "btn-accion", "Ver artículos");
    volver.href = "articulos.html";
    caja.append(crear("h2", null, "No encontramos ese producto"), volver);
    contenedorProducto.appendChild(caja);
  } else {
    document.title = "Petsaving - " + p.nombre;

    const tarjeta = crear("article", "detalle-producto");

    // lado izquierdo: imagen
    const lado = crear("div", "foto-detalle");
    const foto = crear("img");
    foto.src = p.imagen;
    foto.alt = p.alt;
    lado.appendChild(foto);

    // lado derecho: información
    const info = crear("div", "info-detalle");
    const unidades = p.stock === 1 ? " unidad" : " unidades";

    // cantidad que quiere comprar (entre 1 y el stock)
    const cantidad = crear("div", "cantidad");
    const etiqueta = crear("label", null, "Cantidad:");
    etiqueta.htmlFor = "cantidad";
    const campo = crear("input");
    campo.type = "number";
    campo.id = "cantidad";
    campo.name = "cantidad";
    campo.min = 1;
    campo.max = p.stock;
    campo.value = 1;
    cantidad.append(etiqueta, campo);

    // no deja pasar del stock ni bajar de 1
    campo.addEventListener("input", function () {
      if (Number(campo.value) > p.stock) campo.value = p.stock;
    });
    campo.addEventListener("change", function () {
      if (campo.value === "" || Number(campo.value) < 1) campo.value = 1;
      campo.value = Math.floor(Number(campo.value));
    });

    // Botón para agregar productos al carrito
    const boton = crear("button", "btn-accion btn-agregar", "Agregar al carrito");
    boton.type = "button";

    boton.addEventListener("click", function () {
      const cantidadIngresada = Number(campo.value);

      if (!Number.isInteger(cantidadIngresada) || cantidadIngresada < 1) {
        alert("Ingresa una cantidad válida");
        return;
      }

      // el carrito se guarda en el navegador (localStorage)
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const productoExistente = carrito.find(function (item) { return item.id === p.id; });

      if (productoExistente) {
        if (productoExistente.cantidad + cantidadIngresada > p.stock) {
          alert("No hay suficiente stock disponible");
          return;
        }

        productoExistente.cantidad += cantidadIngresada;
      } else {
        if (cantidadIngresada > p.stock) {
          alert("No hay suficiente stock disponible");
          return;
        }

        carrito.push({
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          imagen: p.imagen,
          alt: p.alt,
          cantidad: cantidadIngresada,
          stock: p.stock
        });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarBotonCarrito();   // hace aparecer "Ver carrito" en el header
      alert("Se ha añadido " + p.nombre + " al carrito");
    });

    info.append(
        crear("h2", null, p.nombre),
        crear("p", "precio", formatearPrecio(p.precio)),
        crear("p", null, p.disponibilidad),
        crear("p", null, "Stock: " + p.stock + unidades),
        cantidad,
        boton
    );

    tarjeta.append(lado, info);
    contenedorProducto.appendChild(tarjeta);
  }
}