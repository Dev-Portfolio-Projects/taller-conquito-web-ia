const elementos = {
  formulario: document.getElementById("formulario-tareas"),
  nombre: document.getElementById("nombre"),
  prioridad: document.getElementById("prioridad"),
  fecha: document.getElementById("fecha"),
  mensaje: document.getElementById("mensaje"),
  lista: document.getElementById("lista-tareas"),
  total: document.getElementById("total"),
  pendientes: document.getElementById("pendientes"),
  completados: document.getElementById("completados"),
};

let tareas = [];

elementos.formulario.addEventListener("submit", agregarTarea);

function agregarTarea(evento) {
  evento.preventDefault();

  const nombre = elementos.nombre.value.trim();
  const fecha = elementos.fecha.value;
  const prioridad = elementos.prioridad.value;

  if (nombre === "" || fecha === "") {
    mostrarMensaje("Complete todos los campos.");
    return;
  }

  const tarea = {
    id: Date.now(),
    nombre,
    prioridad,
    fecha,
    completada: false,
  };

  tareas.push(tarea);

  elementos.formulario.reset();
  mostrarMensaje("Tarea agregada correctamente.");

  renderizarTareas();
  actualizarResumen();
}

function renderizarTareas() {
  elementos.lista.innerHTML = "";

  if (tareas.length === 0) {
    elementos.lista.innerHTML = `
      <li>
        No hay tareas registradas.
      </li>
    `;
    return;
  }

  tareas.forEach((tarea) => {
    const li = document.createElement("li");

    li.className = tarea.completada ? "completada" : "";

    li.innerHTML = `
      <div>
        <strong>${tarea.nombre}</strong>
        <p>Prioridad: ${tarea.prioridad}</p>
        <p>Fecha: ${tarea.fecha}</p>
      </div>

      <div>
        <button class="btn-completar" data-id="${tarea.id}">
          ${tarea.completada ? "Pendiente" : "Completar"}
        </button>

        <button class="btn-eliminar" data-id="${tarea.id}">
          Eliminar
        </button>
      </div>
    `;

    elementos.lista.appendChild(li);
  });

  agregarEventosBotones();
}

function agregarEventosBotones() {
  const botonesCompletar = document.querySelectorAll(".btn-completar");
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");

  botonesCompletar.forEach((boton) => {
    boton.addEventListener("click", () => {
      cambiarEstado(Number(boton.dataset.id));
    });
  });

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", () => {
      eliminarTarea(Number(boton.dataset.id));
    });
  });
}

function cambiarEstado(id) {
  tareas = tareas.map((tarea) => {
    if (tarea.id === id) {
      return {
        ...tarea,
        completada: !tarea.completada,
      };
    }

    return tarea;
  });

  renderizarTareas();
  actualizarResumen();
}

function eliminarTarea(id) {
  tareas = tareas.filter((tarea) => tarea.id !== id);

  renderizarTareas();
  actualizarResumen();
}

function actualizarResumen() {
  const totalTareas = tareas.length;

  const tareasCompletadas = tareas.filter(
    (tarea) => tarea.completada
  ).length;

  elementos.total.textContent = totalTareas;
  elementos.completados.textContent = tareasCompletadas;
  elementos.pendientes.textContent =
    totalTareas - tareasCompletadas;
}

function mostrarMensaje(texto) {
  elementos.mensaje.textContent = texto;

  setTimeout(() => {
    elementos.mensaje.textContent = "";
  }, 3000);
}

renderizarTareas();
actualizarResumen();