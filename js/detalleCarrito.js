// variables globales
let tablaCarrito = document.querySelector(".cart-table tbody");

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

function cargarProductos() {
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];

    tablaCarrito.innerHTML = "";

    if (todosProductos.length != 0) {
        todosProductos.forEach((producto, i) => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="d_flex" justify-content-between aling-items-center>
                    <span onclick="borrarProducto(event)" class="btn btn-danger">X</span>
                    <img src="${producto.imagen}" width="70px">
                    ${producto.nombre}
                </td>
                <td>
                    $${producto.precio}
                </td>
                <td>
                    <div class="quantity quantity-wrap">
                        <div class="decrement" onclick="actualizarCantidad(${i},-1)"> <i class="fa-solid fa-minus"></i></div>
                        <input class="number" type="number" name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" min="1" readonly style="width: 40px; text-align: center;">
                        <div class="increment" onclick="actualizarCantidad(${i},1)"> <i class="fa-solid fa-plus"></i></div>
                    </div>
                </td>
                <td>
                    $${((producto.precio*producto.cantidad).toFixed(3))}
                </td>
            `;
            tablaCarrito.appendChild(fila);
        });
    } else {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td colspan="4">
                <p class="text-center fs-3">No hay productos en el Carrito</p>
            </td>
        `;
        tablaCarrito.appendChild(fila); // Agregar la fila al tbody
    }
}

function actualizarCantidad(pos, cambio){
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];


    if(todosProductos[pos]){
        todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1) + cambio;
        if(todosProductos[pos].cantidad < 1){
            todosProductos[pos].cantidad = 1;
        }
        //calcula subtotal
        let subtotal = todosProductos[pos].precio * todosProductos[pos].cantidad;
    }
localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
cargarProductos();



}

function borrarProducto(event) {
    let producto = event.target.parentElement.parentElement;
    let index = Array.from(tablaCarrito.children).indexOf(producto);
    producto.remove();

    // Eliminar del local storage
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    todosProductos.splice(index, 1);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));

    // Actualizar el contador del carrito
    let contadorCarrito = document.querySelector(".contar-pro");
    let con = todosProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.textContent = con;
    localStorage.setItem('contador-carrito', con);

    // Mostrar mensaje si no hay productos
    if (todosProductos.length === 0) {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td colspan="4">
                <p class="text-center fs-3">No hay productos en el Carrito</p>
            </td>
        `;
        tablaCarrito.appendChild(fila);
    }
}