document.addEventListener("DOMContentLoaded", () => {
    // Recuperar los datos del local storage
    let resumen = JSON.parse(localStorage.getItem("pro-resumen")) || {};

    // Seleccionar los elementos del DOM donde se mostrarán los datos
    let resumenSubTotal = document.querySelector(".res-sub-total");
    let resumenDescuento = document.querySelector(".promo");
    let resumenTotal = document.querySelector(".total");
    let resumenDomicilio = document.querySelector(".valor-domi");
    let resumenDestino = document.querySelector(".destino");
    let resumenOrden = document.querySelector(".productos-resumen");

    // Mostrar los datos en los elementos correspondientes
    if (resumen) {
        resumenSubTotal.textContent = resumen.subtotal || "$0.000";
        resumenDescuento.textContent = resumen.descuento || "$0.000";
        resumenTotal.textContent = resumen.totalApagar || "$0.000";
        resumenDomicilio.textContent = resumen.domicilio || "$0.000";
        resumenDestino.textContent = resumen.destino || "";

        // Crear encabezados
        let encabezados = document.createElement("p");
        encabezados.innerHTML = `
            <span style="float: left;"><strong>Nombre</strong></span>
            <span style="text-align: center;"><strong>Cant.</strong></span>
            <span style="float: right;"><strong>V/R Uni</strong></span>
        `;
        resumenOrden.appendChild(encabezados);

        // Mostrar los productos en el resumen
        if (resumen.productos && resumen.productos.length > 0) {
            resumen.productos.forEach(producto => {
                let precio = parseFloat(producto.precio);
                let productoElemento = document.createElement("p");
                productoElemento.innerHTML = `
                    <span style="float: left;">${producto.nombre}</span>
                    <span style="text-align: center;">${producto.cantidad}</span>
                    <span style="float: right;">$${precio.toFixed(3)}</span>
                `;
                resumenOrden.appendChild(productoElemento);
            });
        }
    }
});