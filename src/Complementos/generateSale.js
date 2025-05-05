document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("modalVenta");
    const btn = document.getElementById("generarVentaBtn");
    const span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
  
    document.getElementById("ventaForm").onsubmit = function(event) {
        event.preventDefault();
        alert('Venta generada exitosamente!');
        modal.style.display = "none";
    }
  });