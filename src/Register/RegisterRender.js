function GenerateForm() {
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    formContainer.innerHTML = `
        <h2>Completa tus datos</h2>
        <p>Es rápido y fácil.</p>
        <form>
          <div class="form-group">
            <input type="text" placeholder="Nombre" required>
            <input type="text" placeholder="Apellido" required>
            <input type="tel" placeholder="Teléfono" required>
          </div>
          <div class="form-group">
            <input type="text" placeholder="Dirección" required>
            <select required>
              <option value="">Localidad</option>
              <option value="1">Florencio Varela</option>
              <option value="2">Lomas de Zamora</option>
              <option value="3">CABA</option>
              <option value="4">La Plata</option>
            </select>
            <select required>
              <option value="">Provincia</option>
              <option value="1">Buenos Aires</option>
            </select>
          </div>
          <div class="form-group">
            <input type="email" placeholder="Correo Electrónico" required>
            <input type="password" placeholder="Contraseña" required>
          </div>
          
          <div class="form-group">
            <button type="submit">FINALIZAR</button>
          </div>
          <p class="terms">
            Al hacer clic en Registrarte, aceptas las <a href="#">Condiciones</a>, la <a href="#">Política de privacidad</a> y la <a href="#">Política de cookies</a>.
          </p>
        </form>
        <a href="/Login.html" class="login-link">¿Ya tienes una cuenta?</a>
    `;

    return formContainer;
}
const contenedor = document.getElementById('container');
const FormData = GenerateForm();
contenedor.appendChild(FormData);