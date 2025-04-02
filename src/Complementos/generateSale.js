document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("modalVenta");
    const btn = document.getElementById("generarVentaBtn");
    const span = document.getElementsByClassName("close")[0];
  
    // Abrir el modal
    btn.onclick = function() {
        modal.style.display = "block";
    }
  
    // Cerrar el modal
    span.onclick = function() {
        modal.style.display = "none";
    }
  
    // Cerrar el modal si se hace clic fuera del contenido
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
  
    // Manejar el envío del formulario
    document.getElementById("ventaForm").onsubmit = function(event) {
        event.preventDefault();
        alert('Venta generada exitosamente!');
        modal.style.display = "none";
    }
  });