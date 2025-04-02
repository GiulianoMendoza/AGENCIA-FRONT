import ApiLogin from "../Service/LoginApi.js";
function GenerateLogin() {
    const LoginContainer = document.createElement('div');
    LoginContainer.className = 'container-register';
    LoginContainer.innerHTML = `
        <div class="form-content">
            <h1 id="title">Iniciar Sesión</h1>
            <form id="loginForm">
                <div class="input-group">
                    <div class="input-field">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="text" id="email" placeholder="Email" required>
                        <span id="emailError" class="error"></span>
                    </div>
                    <div class="input-field">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" id="password" placeholder="Contraseña" required>
                        <span class="icon" id="togglePassword">
                            <i class="fa-solid fa-eye-slash" id="eyeIcon"></i>
                        </span>
                        <span id="passwordError" class="error"></span>
                    </div>
                    <div class="btn-field">
                        <button id="signIn" type="submit">Iniciar Sesión</button>
                    </div>
                </div>
            </form>
        </div>
    `;

    const loginForm = LoginContainer.querySelector('#loginForm');
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        resetErrors();

        let valid = true;

        if (!email) {
            document.getElementById('emailError').textContent = 'Por favor, ingrese su email.';
            valid = false;
        }
        if (!password) {
            document.getElementById('passwordError').textContent = 'Por favor, ingrese su contraseña.';
            valid = false;
        }

        if (valid) {
            try {
                const loginResponse = await ApiLogin.Post(email, password);
                if (loginResponse && loginResponse.status === 'OK' && loginResponse.result && loginResponse.result.token) {
                    sessionStorage.setItem("authToken", loginResponse.result.token);
                    sessionStorage.setItem("role", loginResponse.result.role);
                    switch (loginResponse.result.role) {
                        case 'admin':
                        case 'vendedor':
                        case 'tecnico':
                        case 'user':
                            window.location.href = '/index.html'; 
                            break;
                        default:
                            throw new Error('Rol no reconocido.');
                    }
                } else {
                    throw new Error('Mail y/o Usuario Incorrecto.');
                }
            } catch (error) {
                console.error('Mail y/o Usuario Incorrecto:', error);
                alert(error.message);
            }
        }
    });

    return LoginContainer;
}
function resetErrors() {
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
}
const contenedor = document.getElementById('login-container');
const loginData = GenerateLogin();
contenedor.appendChild(loginData);