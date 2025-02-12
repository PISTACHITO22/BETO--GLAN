document.addEventListener("DOMContentLoaded", () => {
    cargarComentarios();
    actualizarCarrito();
});

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });

    totalElemento.textContent = `$${total}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Sección de comentarios
const commentForm = document.getElementById("commentForm");
const commentsSection = document.getElementById("commentsSection");

commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;

    if (name && comment) {
        const comentario = { name, comment };
        guardarComentario(comentario);
        mostrarComentario(comentario);
        commentForm.reset();
    }
});

function guardarComentario(comentario) {
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentarios.push(comentario);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

function cargarComentarios() {
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentarios.forEach(mostrarComentario);
}

function mostrarComentario({ name, comment }) {
    const div = document.createElement("div");
    div.classList.add("comment");
    div.innerHTML = `<strong>${name}:</strong> <p>${comment}</p>`;
    commentsSection.appendChild(div);
}
