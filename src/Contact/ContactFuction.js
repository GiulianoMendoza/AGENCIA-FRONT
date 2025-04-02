document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form');
    const inputs = document.querySelectorAll('#form input');
    const expresiones = { // objeto expresiones
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 números.
        mensaje: /^[a-zA-Z0-9,.!?¡¿\s]{1,200}$/
    };

    const campos = {
        nombre: false,
        mail: false,
        telefono: false,
        mensaje: false,
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarinputs(expresiones.nombre, e.target, 'nombre');
                break;
            case "mail":
                validarinputs(expresiones.mail, e.target, 'mail');
                break;
            case "telefono":
                validarinputs(expresiones.telefono, e.target, 'telefono');
                break;
            case "mensaje":
                validarinputs(expresiones.mensaje, e.target, 'mensaje');
                break;
        }
    };

    const validarinputs = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo_${campo}`).classList.remove('form__container-incorrecto');
            document.getElementById(`grupo_${campo}`).classList.add('form__container-correcto');
            document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo_${campo} .form__input-error`).classList.remove('form__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo_${campo}`).classList.add('form__container-incorrecto');
            document.getElementById(`grupo_${campo}`).classList.remove('form__container-correcto');
            document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo_${campo} .form__input-error`).classList.add('form__input-error-activo');
            campos[campo] = false;
        }
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    const $form = document.querySelector('#form');
    $form.addEventListener('submit', handleSubmit);

    async function handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(this);
        if (!form.get('nombre') || !form.get('mail') || !form.get('telefono') || !form.get('mensaje')) {
            document.getElementById('form_mensaje').classList.add('form_mensaje-activo');
            setTimeout(() => {
                document.getElementById('form_mensaje').classList.remove('form_mensaje-activo');
            }, 3000);
            return;
        }
        const response = await fetch(this.action, {
            method: this.method,
            body: form,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            this.reset();
            document.querySelectorAll('.form__container-correcto').forEach((icono) => {
                icono.classList.remove('form__container-correcto');
            });
            document.getElementById('form__mensaje-exito').classList.add('form__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('form__mensaje-exito').classList.remove('form__mensaje-exito-activo');
            }, 3000);
        }
    }
});