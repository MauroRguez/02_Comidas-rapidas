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
    let metodoPagoInputs = document.querySelectorAll("input[name='increment']");

    // Mostrar los datos en los elementos correspondientes
    if (resumen) {
        resumenSubTotal.textContent = resumen.subtotal || "$0.000";
        resumenDescuento.textContent = resumen.descuento || "$0.000";
        resumenTotal.textContent = `$${(parseFloat(resumen.totalApagar.replace('$', '')) || 0).toFixed(3)}`;
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

    // Función para actualizar el total dependiendo del método de pago seleccionado
    const actualizarTotal = () => {
        let total = parseFloat(resumen.totalApagar.replace('$', ''));
        
        if (isNaN(total)) {
            total = 0;
        }

        let metodoSeleccionado = document.querySelector("input[name='increment']:checked");

        if (metodoSeleccionado) {
            switch (metodoSeleccionado.value) {
                case "1": // Contraentrega
                    total *= 1.05;
                    break;
                case "2": // PSE
                    total *= 1.03;
                    break;
                case "3": // Transferencia
                    // No hay cambio en el total
                    break;
                default:
                    break;
            }
        }

        resumenTotal.textContent = `$${total.toFixed(3)}`;
    };

    // Agregar evento a cada input de método de pago
    metodoPagoInputs.forEach(input => {
        input.addEventListener("change", actualizarTotal);
    });

    // Llamar a la función para establecer el total inicial
    actualizarTotal();
});

document.addEventListener('DOMContentLoaded', function() {
    const btnCheckout = document.getElementById('btn-checkout');
    const totalElement = document.querySelector('.total');
    const metodoPagoElements = document.getElementsByName('increment');

    const nombresInput = document.getElementById('nombres-input');
    const apellidosInput = document.getElementById('apellidos-input');
    const emailInput = document.getElementById('email-input');
    const celularInput = document.getElementById('celular-input');
    const direccionInput = document.getElementById('direccion-input');

    btnCheckout.addEventListener('click', function() {
        const total = totalElement.textContent;
        let metodoPago;

        metodoPagoElements.forEach(element => {
            if (element.checked) {
                metodoPago = element.value;
            }
        });

        // Validar que los campos obligatorios estén llenos
        if (!nombresInput.value) {
            alert('El campo "Nombres" es obligatorio');
            return;
        }
        if (!apellidosInput.value) {
            alert('El campo "Apellidos" es obligatorio');
            return;
        }
        if (!emailInput.value) {
            alert('El campo "Email" es obligatorio');
            return;
        }
        if (!celularInput.value) {
            alert('El campo "Celular" es obligatorio');
            return;
        }
        if (!direccionInput.value) {
            alert('El campo "Dirección" es obligatorio');
            return;
        }

        const datosEntrega = {
            nombres: nombresInput.value,
            apellidos: apellidosInput.value,
            email: emailInput.value,
            celular: celularInput.value,
            direccion: direccionInput.value,
            direccion2: document.getElementById('direccion-2-input').value,
            notas: document.getElementById('additiona-note').value
        };

        localStorage.setItem('datosEntrega', JSON.stringify(datosEntrega));

        const resumen = JSON.parse(localStorage.getItem('pro-resumen')) || {};
        resumen.totalApagar = total;
        resumen.metodoPago = metodoPago;

        localStorage.setItem('pro-resumen', JSON.stringify(resumen));

        // Redirigir a la página de agradecimiento
        window.location.href = 'thankyou.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkout-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let nombres = document.getElementById('nombres-input').value;
        let apellidos = document.getElementById('apellidos-input').value;
        let email = document.getElementById('email-input').value;
        let celular = document.getElementById('celular-input').value;
        let direccion = document.getElementById('direccion-input').value;
        let direccion2 = document.getElementById('direccion-2-input').value;
        let notas = document.getElementById('additiona-note').value;

        let datosEntrega = {
            nombres,
            apellidos,
            email,
            celular,
            direccion,
            direccion2,
            notas
        };

        localStorage.setItem('datosEntrega', JSON.stringify(datosEntrega));
        alert('Datos guardados en el Local Storage');
    });
});