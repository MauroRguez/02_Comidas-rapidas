//variables globales
let btnProducts = document.querySelectorAll('.btn-product');
let contadorCarrito = document.querySelector(".contar-pro");
let con = 0;
let listadoCarrito = document.querySelector(".table.list-cart tbody");

btnProducts.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        con++;
        contadorCarrito.textContent = con;
        
        infoProducto(i);
    });
});

//agregar producto al carrito
function agregarProducto(producto) {
    let fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${con}</td>
        <td>
            <img src="${producto.imagen}" width="70px">
        </td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>
            <button class="btn btn-danger">X</button>
        </td>
    `;

    listadoCarrito.appendChild(fila);
}

//funcion para agregar la imnformacion del producto al carrito
function infoProducto(pos){
    let producto = btnProducts[pos].parentElement.parentElement.parentElement;
    let infoPro = {
        nombre: producto.querySelector('h3').textContent,
        imagen: producto.querySelector('img').src,
        precio: producto.querySelector('h5').textContent
    }
    agregarProducto(infoPro);
}

