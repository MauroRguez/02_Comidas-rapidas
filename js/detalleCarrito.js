// variables globales
let tablaCarrito = document.querySelector(".cart-table tbody");
let resumenSubTotal = document.querySelector(".res-sub-total");
let resumenDescuento = document.querySelector(".promo");
let resumenTotal = document.querySelector(".total");
let destino = document.querySelector(".destino");
let resumenDomicilio = document.querySelector(".valor-domi");
let btnResumen = document.querySelector(".btn-resumen");

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
    resumenCompra(); // Llamar a resumenCompra después de cargar los productos
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

    // Ejecutar resumen de compra después de actualizar el localStorage y el DOM
    resumenCompra();
}

//funcion para resumen de la compra
function resumenCompra(){
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];

    let subtotal = 0; // acumular el subtotal
    // recorrer todos los productos y acumulamos en subtotal
    todosProductos.forEach((producto) => {
        subtotal += producto.precio * producto.cantidad;
    });
    // calcular valor del domicilio
    let domicilio = 0;
    switch(destino.value){
        case "Medellin": default: domicilio; break;
        case "Bello": 
            domicilio = 10.000; 
            break;
        case "Copacabana":
        case "La Estrella": 
        case "Caldas":
            domicilio = 20.000; 
            break;
        case "Itagui":
        case "Envigado":
        case "Sabaneta": 
            domicilio = 15.000; 
            break;
    }
    //calcular descuento del 10% si la compra es mayor a 100000 pesos
    let descuento = (subtotal > 100.000)? subtotal * 0.1 : 0;

    let totalApagar = (subtotal - descuento)+ domicilio;

    resumenSubTotal.textContent = `$`+subtotal.toFixed(3);
    resumenDescuento.textContent =`$`+descuento.toFixed(3);
    resumenTotal.textContent = `$`+totalApagar.toFixed(3);
    resumenDomicilio.textContent = `$`+domicilio.toFixed(3);
}

destino.addEventListener("change", (e) => {
    resumenCompra();
});

//evento al boton pagar para guarda resumen en local storage
btnResumen.addEventListener("click", () => {
    //llamar los prodcuctos de local storage
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    let resumen = {
        //copia de todos los productos
        "productos": todosProductos,
    }
    //llenar la variable del resumen con el resumen de la compra
    resumen.subtotal = resumenSubTotal.textContent;
    resumen.descuento = resumenDescuento.textContent;
    resumen.destino = destino.value;
    resumen.domicilio = resumenDomicilio.textContent;
    resumen.totalApagar = resumenTotal.textContent;

    //guardar el resumen en local storage
    localStorage.setItem("pro-resumen", JSON.stringify(resumen));
    //redireccionar a la pagina de pago
    location.href = "checkout.html";
    //console.log(resumen); 
});