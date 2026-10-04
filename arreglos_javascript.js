// ===== Configuración inicial =====
const CLAVE = "arregloNombres"; // clave con la que se guarda en localStorage
let nombres = []; // el arreglo (array) donde viven todos los nombres
// ===== Referencias a elementos del HTML =====
const inputNombre = document.getElementById("nombre");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const ul = document.getElementById("lista");
const codigo = document.getElementById("codigo");
// ===== Funciones de localStorage =====
// Lee el arreglo guardado (si existe) al abrir o refrescar la página
function cargarDatos() {
    try {
        const guardado = localStorage.getItem(CLAVE);
        if (guardado) nombres = JSON.parse(guardado); // convierte el texto en arreglo
    } catch (error) {
      nombres = []; // si algo falla, empieza con un arreglo vacío
    }
}
// Guarda el arreglo como texto en localStorage
function guardarDatos() {
    localStorage.setItem(CLAVE, JSON.stringify(nombres));
}
// ===== Función que dibuja todo en pantalla =====
function pintar() {
    ul.innerHTML = ""; // limpia la lista antes de dibujar
    // forEach recorre el arreglo; "posicion" es el índice de cada nombre
    nombres.forEach(function (nombre, posicion) {
        const li = document.createElement("li");
        const texto = document.createElement("span");
        texto.textContent = nombre; // textContent evita código malicioso
        // Botón para eliminar; guarda el índice en data-posicion
        const boton = document.createElement("button");
        boton.className = "btn-eliminar";
        boton.textContent = "Eliminar";
        boton.dataset.posicion = posicion;
        li.append(texto, boton);
        ul.appendChild(li);
    });
    contador.textContent = "Total de nombres: " + nombres.length; // length = tamaño
    codigo.textContent = "const nombres = " + JSON.stringify(nombres, null, 2) + ";";
}
// ===== Función que agrega un nombre al arreglo =====
function agregarNombre() {
    const nombre = inputNombre.value.trim();
    // Validación: el nombre no puede estar vacío
    if (!nombre) {
        mensaje.textContent = "Escribe un nombre antes de agregar.";
        return;
    }
    nombres.push(nombre); // push agrega el nombre al final del arreglo
    inputNombre.value = ""; // limpia el campo
    mensaje.textContent = "";
    guardarDatos();
    pintar();
    inputNombre.focus(); // deja el cursor listo para escribir otro
}
// ===== Eventos =====
// Cada evento actualiza el arreglo, lo guarda y redibuja
// Así lo que ves siempre coincide con lo guardado
// Los eventos solo reaccionan a lo que hace la persona
// Botón Agregar
document.getElementById("btnAgregar").addEventListener("click", agregarNombre);
// Tecla Enter dentro del campo de texto
inputNombre.addEventListener("keydown", function (e) {
    if (e.key === "Enter") agregarNombre();
});
// Eliminar: un solo evento en la lista detecta el botón pulsado
ul.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-eliminar")) {
        nombres.splice(Number(e.target.dataset.posicion), 1); // splice quita 1 elemento
        guardarDatos();
        pintar();
    }
});
// Vaciar la lista (pide confirmación)
document.getElementById("btnLimpiar").addEventListener("click", function () {
    if (nombres.length && confirm("¿Seguro que quieres vaciar la lista?")) {
        nombres = [];
        guardarDatos();
        pintar();
    }
});
// ===== Inicio de la app =====
cargarDatos(); // primero se lee lo guardado
pintar();      // luego se dibuja la pantalla