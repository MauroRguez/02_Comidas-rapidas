document.addEventListener('DOMContentLoaded', function() {
    const datosEntrega = JSON.parse(localStorage.getItem('datosEntrega'));
    const resumen = JSON.parse(localStorage.getItem('pro-resumen')) || {};

    const clienteSpan = document.getElementById('cliente-span');
    const datosEnvio = document.querySelector('.datos_envio + .card-text');
    const productosComprados = document.querySelector('.prod_comprados');
    const btnOtraCompra = document.querySelector('.btn-gracias');

    if (datosEntrega) {
        if (datosEntrega.nombres) {
            clienteSpan.textContent = `${datosEntrega.nombres}, `;
        }

        datosEnvio.innerHTML = `
            <p><strong>Nombre completo:</strong> ${datosEntrega.nombres} ${datosEntrega.apellidos}</p>
            <p><strong>Celular:</strong> ${datosEntrega.celular}</p>
            <p><strong>Correo:</strong> ${datosEntrega.email}</p>
            <p><strong>Dirección:</strong> ${datosEntrega.direccion}</p>
            <p><strong>Dirección opcional:</strong> ${datosEntrega.direccion2}</p>
            <p><strong>Nota adicional:</strong> ${datosEntrega.notas}</p>
        `;

        let productosHTML = '<p><strong>Productos:</strong></p>';
        if (resumen.productos && Array.isArray(resumen.productos)) {
            resumen.productos.forEach(producto => {
                productosHTML += `<p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: ${producto.precio}</p>`;
            });
        }

        productosComprados.innerHTML = `
            ${productosHTML}
            <p><strong>Ciudad:</strong> ${resumen.destino}</p>
            <p><strong>Domicilio:</strong> ${resumen.domicilio}</p>
            <p><strong>Promoción:</strong> ${resumen.descuento}</p>
            <p><strong>Método de pago:</strong> ${resumen.metodoPago == 1 ? 'Contra Entrega' : resumen.metodoPago == 2 ? 'PSE' : 'Transferencia'}</p>
            <p><strong>Total a pagar:</strong> ${resumen.totalApagar}</p>
        `;
    }

    btnOtraCompra.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'index.html';
    });
});

