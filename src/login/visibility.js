document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#togglePassword').addEventListener('click', function() {
        const icon = document.getElementById('eyeIcon');
        const passwordField = document.getElementById('password');
        if (passwordField.type === 'text') {
            passwordField.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});