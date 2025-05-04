export function validations(formContainer){
    const form = formContainer.querySelector('#registro-form');
  
    function setError(fieldName, message) {
        const input = form.querySelector(`[name="${fieldName}"]`);
        const errorSpan = form.querySelector(`[data-error-for="${fieldName}"]`);
        if (input) input.classList.add("invalid");
        if (errorSpan) errorSpan.textContent = message;
    }
  
    function clearError(fieldName) {
        const input = form.querySelector(`[name="${fieldName}"]`);
        const errorSpan = form.querySelector(`[data-error-for="${fieldName}"]`);
        if (input) input.classList.remove("invalid");
        if (errorSpan) errorSpan.textContent = "";
    }
  
    function validateField(field) {
        const value = field.value.trim();
        const name = field.name;
  
        clearError(name);
  
        switch (name) {
            case 'nombre':
            case 'apellido':
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                    setError(name, "Solo letras. No puede estar vacío.");
                }
                break;
            case 'telefono':
                if (!/^\d{8,15}$/.test(value)) {
                    setError(name, "Debe tener entre 8 y 15 números.");
                }
                break;
            case 'direccion':
                if (value.length < 5) {
                    setError(name, "Dirección demasiado corta.");
                }
                break;
            case 'localidad':
            case 'provincia':
                if (value === "") {
                    setError(name, "Selecciona una opción.");
                }
                break;
            case 'email':
                if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
                    setError(name, "Correo inválido.");
                }
                break;
            case 'password':
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
                    setError(name, "Mínimo 6 caracteres, letra y número.");
                }
                break;
        }
    }
  
    // validacion al perder el foco
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });
  
    // validacion final
    form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        let hayErrores = false;
        form.querySelectorAll('input, select').forEach(field => {
            validateField(field);
            if (field.classList.contains("invalid")) {
                hayErrores = true;
            }
        });
  
        if (!hayErrores) {
            console.log("Formulario enviado correctamente");
        }
    });
  }
  