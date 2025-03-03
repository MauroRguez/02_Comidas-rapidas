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
        con++;
        contadorCarrito.textContent = con;
        guardarContadorCarrito();
        infoProducto(i);
    });
});

//agregar producto al carrito
function agregarProducto(producto) {
    let fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${listadoCarrito.children.length + 1}</td>
        <td>
            <img src="${producto.imagen}" width="70px">
        </td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>
            <span onclick="borrarProducto(event)" class="btn btn-danger">X</span>
        </td>
    `;

    listadoCarrito.appendChild(fila);
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
    guardarProLocalStorage(infoPro);
}

function borrarProducto(event){
    let producto = event.target.parentElement.parentElement;
    let index = Array.from(listadoCarrito.children).indexOf(producto);
    producto.remove();
    con--;
    contadorCarrito.textContent = con;
    guardarContadorCarrito();

    // Actualizar los índices de los productos en el carrito
    let filas = listadoCarrito.querySelectorAll('tr');
    filas.forEach((fila, index) => {
        fila.querySelector('td').textContent = index + 1;
    });

    eliminarProLocalStorage(index);
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
    todosProductos.forEach(producto => {
        agregarProducto(producto);
    });
    con = todosProductos.length;
    contadorCarrito.textContent = con;
}

//guardar contador del carrito en local storage
function guardarContadorCarrito(){
    localStorage.setItem('contador-carrito', con);
}

//cargar contador del carrito desde local storage
function cargarContadorCarrito(){
    con = parseInt(localStorage.getItem('contador-carrito')) || 0;
    contadorCarrito.textContent = con;
}

contadorCarrito.parentElement.addEventListener('click', () => {
    listadoCarrito.parentElement.classList.toggle("ocultar")
});
