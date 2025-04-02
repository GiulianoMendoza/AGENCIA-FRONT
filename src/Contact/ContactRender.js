function GenerateContactForm() {
    const formContainer = document.createElement('main');
    formContainer.innerHTML = `
        <form id="form" class="form" action="https://formspree.io/f/mbjebyqb" method="POST">
            <h2 class="form__title">Contactanos</h2>
            <h3>Contanos en que te podemos ayudar</h3>
            <div class="form__container" id="grupo_nombre">
                <label for="nombre" class="form_label">Nombre <span>*</span></label>
                <div class="form_grupo-input">
                    <input type="text" name="nombre" class="form__input" id="nombre" placeholder="Nombre:" pattern="^[a-zA-ZÀ-ÿ\s]{1,40}$" required>
                    <i class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
                <p class="form__input-error">El nombre solo acepta caracteres alfabeticos</p>
            </div>
            <div class="form__container" id="grupo_correo">
                <label for="mail" class="form_label">Correo Electronico <span>*</span></label>
                <div class="form_grupo-input">
                    <input type="email" name="mail" class="form__input" id="mail" placeholder="Correo@gmail.com" required>
                    <i class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
                <p class="form__input-error">El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.</p>
            </div>
            <div class="form__container" id="grupo_telefono">
                <label for="telefono" class="form_label">Telefono <span>*</span></label>
                <div class="form_grupo-input">
                    <input type="tel" name="telefono" class="form__input" id="telefono" placeholder="Telefono:" required>
                    <i class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
                <p class="form__input-error">El telefono solo puede contener numeros, un minimo de 7 digitos y maximo son 14 dígitos.</p>
            </div>
            <div class="form__container" id="grupo_mensaje">
                <label for="mensaje" class="form_label">Mensaje <span>*</span></label>
                <div class="form_grupo-input">
                    <input type="text" class="form__input form__input--message" name="mensaje" id="mensaje" placeholder="Mensaje" maxlength="200" required></input>
                    <i class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
                <p class="form__input-error">El mensaje puede tener un maximo de 200 caracteres</p>
            </div>
            <div class="form_mensaje" id="form_mensaje">
                <p><i class="fas fa-exclamation-triangle"></i> <b>Error:</b> Por favor rellena el formulario correctamente.</p>
            </div>
            <div class="form__container form_container-btn">
                <button type="submit" class="form__btn">Enviar</button>
                <p class="form__mensaje-exito" id="form__mensaje-exito">Mensaje enviado con éxito!</p>
            </div>
        </form>
    `;
    return formContainer;
}

const contenedor = document.getElementById('mainContainer'); 
const FormContacto = GenerateContactForm();
contenedor.appendChild(FormContacto);