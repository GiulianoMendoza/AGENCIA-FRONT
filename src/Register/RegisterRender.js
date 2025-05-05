import { validations } from "../Complementos/validation.js";

function GenerateForm() {
  const formContainer = document.createElement('div');
  formContainer.className = 'form-container';
  formContainer.innerHTML = `
      <h2>Completa tus datos</h2>
      <p>Es rápido y fácil.</p>
      <form id="registro-form" novalidate>
        <div class="form-group">
          <input type="text" name="nombre" placeholder="Nombre" required>
          <span class="error-message" data-error-for="nombre"></span>
          
          <input type="text" name="apellido" placeholder="Apellido" required>
          <span class="error-message" data-error-for="apellido"></span>
          
          <input type="tel" name="telefono" placeholder="Teléfono" required>
          <span class="error-message" data-error-for="telefono"></span>
        </div>
        
        <div class="form-group">
          <input type="text" name="direccion" placeholder="Dirección" required>
          <span class="error-message" data-error-for="direccion"></span>

          <select name="localidad" required>
            <option value="">Localidad</option>
            <option value="1">Florencio Varela</option>
            <option value="2">Lomas de Zamora</option>
            <option value="3">CABA</option>
            <option value="4">La Plata</option>
          </select>
          <span class="error-message" data-error-for="localidad"></span>

          <select name="provincia" required>
            <option value="">Provincia</option>
            <option value="1">Buenos Aires</option>
          </select>
          <span class="error-message" data-error-for="provincia"></span>
        </div>
        
        <div class="form-group">
          <input type="email" name="email" placeholder="Correo Electrónico" required>
          <span class="error-message" data-error-for="email"></span>

          <input type="password" name="password" placeholder="Contraseña" required>
          <span class="error-message" data-error-for="password"></span>
        </div>
        
        <div class="form-group">
          <button type="submit">FINALIZAR</button>
        </div>

        <p class="terms">
          Al hacer clic en Registrarte, aceptas las <a href="#">Condiciones</a>, la <a href="#">Política de privacidad</a> y la <a href="#">Política de cookies</a>.
        </p>
      </form>
      <a href="#" class="login-link">¿Ya tienes una cuenta?</a>
  `;

  validations(formContainer);

  return formContainer;
}


const contenedor = document.getElementById('container');
const FormData = GenerateForm();
contenedor.appendChild(FormData);

