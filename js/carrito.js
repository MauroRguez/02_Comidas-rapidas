//variables globales
let btnProducts = document.querySelectorAll('.btn-product');
let contadorCarrito = document.querySelector(".contar-pro");
let con = 0;
let listadoCarrito = document.querySelector(".table.list-cart tbody");

document.addEventListener("DOMContentLoaded", () => {
    cargarProLocalStorage();
    cargarContadorCarrito();
});

btnProducts.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        infoProducto(i);
    });
});

//agregar producto al carrito
function agregarProducto(producto) {
    let todosProductos = JSON.parse(localStorage.getItem('pro-carrito')) || [];
    let productoExistente = todosProductos.find(p => p.nombre === producto.nombre);

    if (productoExistente) {
        productoExistente.cantidad += producto.cantidad;
    } else {
        todosProductos.push(producto);
    }

    localStorage.setItem('pro-carrito', JSON.stringify(todosProductos));
    cargarProLocalStorage();
    actualizarContadorCarrito();
}

//funcion para agregar la informacion del producto al carrito
function infoProducto(pos){
    let producto = btnProducts[pos].parentElement.parentElement.parentElement;
    let infoPro = {
        nombre: producto.querySelector('h3').textContent,
        imagen: producto.querySelector('img').src,
        precio: producto.querySelector('h5').textContent.split("$")[1],
        cantidad: 1
    }
    agregarProducto(infoPro);
}

function borrarProducto(event){
    let producto = event.target.parentElement.parentElement;
    let index = Array.from(listadoCarrito.children).indexOf(producto);
    producto.remove();

    // Eliminar del local storage
    let todosProductos = JSON.parse(localStorage.getItem('pro-carrito')) || [];
    todosProductos.splice(index, 1);
    localStorage.setItem('pro-carrito', JSON.stringify(todosProductos));

    // Actualizar el contador del carrito
    actualizarContadorCarrito();

    // Actualizar los índices de los productos en el carrito
    let filas = listadoCarrito.querySelectorAll('tr');
    filas.forEach((fila, index) => {
        fila.querySelector('td').textContent = index + 1;
    });
}

function guardarProLocalStorage(producto){
    let todosProductos = JSON.parse(localStorage.getItem('pro-carrito')) || [];
    todosProductos.push(producto);
    localStorage.setItem('pro-carrito', JSON.stringify(todosProductos));
}

function eliminarProLocalStorage(index){
    let todosProductos = JSON.parse(localStorage.getItem('pro-carrito')) || [];
    todosProductos.splice(index, 1);
    localStorage.setItem('pro-carrito', JSON.stringify(todosProductos));
}

//cargar productos del localstorage
function cargarProLocalStorage(){
    let todosProductos = JSON.parse(localStorage.getItem('pro-carrito')) || [];
    listadoCarrito.innerHTML = ''; // Limpiar el listado antes de cargar

    todosProductos.forEach((producto, index) => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${producto.imagen}" width="70px">
            </td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <span onclick="borrarProducto(event)" class="btn btn-danger">X</span>
            </td>
        `;
        listadoCarrito.appendChild(fila);
    });

    actualizarContadorCarrito();
}

//guardar contador del carrito en local storage
function guardarContadorCarrito(){
    localStorage.setItem('contador-carrito', con);
}

//cargar contador del carrito desde local storage
function cargarContadorCarrito(){
    let todosProductos = JSON.parse(localStorage.getItem('pro-carrito')) || [];
    con = todosProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.textContent = con;
}

//actualizar contador del carrito
function actualizarContadorCarrito(){
    let todosProductos = JSON.parse(localStorage.getItem('pro-carrito')) || [];
    con = todosProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.textContent = con;
    guardarContadorCarrito();
}

contadorCarrito.parentElement.addEventListener('click', () => {
    listadoCarrito.parentElement.classList.toggle("ocultar")
});
