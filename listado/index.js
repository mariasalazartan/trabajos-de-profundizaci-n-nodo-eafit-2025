// Obtener elementos del DOM
const inputTarea = document.querySelector("#Tarea");
const botonAgregar = document.querySelector("#Agregar");
const listaTareas = document.querySelector("#lista");

// Event listeners
botonAgregar.addEventListener("click", agregarTarea);
listaTareas.addEventListener("click", manejarAcciones);

// Función para agregar una nueva tarea
function agregarTarea() {
  const tareaTexto = inputTarea.value.trim();
  if (tareaTexto === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  // Crear nuevo elemento de lista
  const itemTarea = document.createElement("li");
  itemTarea.textContent = tareaTexto;

  // Crear botón para eliminar tarea
  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.classList.add("btnEliminar");

  // Añadir botón al item
  itemTarea.appendChild(botonEliminar);
  listaTareas.appendChild(itemTarea); // Agregar item a la lista

  inputTarea.value = ""; // Limpiar campo de texto
}

// Función para gestionar acciones de la lista (marcar o eliminar)
function manejarAcciones(evento) {
  const elemento = evento.target;
  if (elemento.classList.contains("btnEliminar")) {
    // Eliminar tarea
    elemento.parentElement.remove();
  } else {
    // Marcar tarea como completada
    elemento.classList.toggle("tarea-completada");
  }
}
