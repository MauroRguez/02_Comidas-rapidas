// variables globales
let tablaCarrito = document.querySelector(".cart-table tbody");

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

function cargarProductos() {
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    todosProductos.forEach((producto, i) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="d-flex justify-content-evenly align-items-center">
                <span onclick="borrarProducto(event)" class="btn btn-danger">X</span>
                <img src="${producto.imagen}" width="70px">
                ${producto.nombre}
            </td>
            <td>
                $<span>${producto.precio}</span>
            </td>
            <td>
                <div class="quantity quantity_wrap" style="display: flex; align-items: center;">
                    <div class="decrement" onclick="actualizarCantidad(${i}, -1)" style="cursor: pointer; padding: 0 5px;"> 
                        <i class="fa-solid fa-minus"></i> 
                    </div>
                    <input class="text" type="number" name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" readonly style="width: 40px; text-align: center;">
                    <div class="increment" onclick="actualizarCantidad(${i}, 1)" style="cursor: pointer; padding: 0 5px;"> 
                        <i class="fa-solid fa-plus"></i> 
                    </div>
                </div>
            </td>
            <td>
                $<span class="subtotal">${producto.precio * (producto.cantidad)}</span>
            </td>
        `;
        tablaCarrito.appendChild(fila);
    });
}

function borrarProducto(event) {
    let producto = event.target.parentElement.parentElement;
    let index = Array.from(tablaCarrito.children).indexOf(producto);
    producto.remove();

    // Eliminar del local storage
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    todosProductos.splice(index, 1);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
}

function actualizarCantidad(pos, cambio) {
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];

    if (todosProductos[pos]) {
        todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1) + cambio;
        if (todosProductos[pos].cantidad < 1) {
            todosProductos[pos].cantidad = 1;
        }
        localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
        actualizarSubtotal(pos, todosProductos[pos].cantidad, todosProductos[pos].precio);
    }
}

function actualizarSubtotal(pos, cantidad, precio) {
    let filas = tablaCarrito.querySelectorAll("tr");
    let fila = filas[pos];
    let subtotal = fila.querySelector(".subtotal");
    subtotal.textContent = cantidad * precio;

    let inputCantidad = fila.querySelector("input[name='quantity']");
    inputCantidad.value = cantidad;
}