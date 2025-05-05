import ApiProduct from "../Service/ProductApi.js";
import ApiSale from "../Service/SaleApi.js";

async function GenerateStock() {
  const Products = await ApiProduct.Get(null, null, null, 10, 0); 

  if (!Products || Products.length === 0) {
      console.error("No se obtuvieron productos");
      return null;
  }

  const stockContainer = document.createElement('div');
  stockContainer.className = 'stock-container';
  stockContainer.innerHTML = `
      <div class="vendedor-info">
          <img src="../../Tarjetas/vendedor.png" alt="Foto del Vendedor" class="foto-vendedor">
          <div class="info">
              <h2>Giuliano Mendoza</h2>
              <p><strong>DNI:</strong> 41539440</p>
              <p><strong>Email:</strong> giulianovictorm98@gmail.com</p>
              <p><strong>Teléfono:</strong> 1141462757</p>
          </div>
      </div>
      <h2>Generar Venta</h2>
      <div class="generate-sale">
          <button id="generarVentaBtn">Generar Venta</button>
      </div>
      <br>
      <h3>Motos en Stock</h3>
      <div class="stock-grid"></div>  <!-- Contenedor para productos -->
      <div id="modalVenta" class="modal">
          <div class="modal-content">
              <span class="close">&times;</span>
              <h2>Datos del Cliente</h2>
              <form id="ventaForm">
                  <label for="clienteSelect">Cliente:</label>
                  <select id="clienteSelect" name="clienteSelect" required>
                      <option value="41539440" data-dni="41539440">
                          Giuliano Mendoza
                      </option>
                  </select>

                  <label for="clienteDNI">DNI del Cliente:</label>
                  <input type="text" id="clienteDNI" name="clienteDNI" readonly required>
                  
                  <h4>Moto Seleccionada:</h4>
                  <div id="motoContainer"></div>

                  <h4>Total: <span id="total">0.00</span></h4>
                  <div class="button-group">
                      <button type="submit" class="btn-submit">Generar Venta</button>
                  </div>
              </form>
          </div>
      </div>
  `;

  const clienteSelect = stockContainer.querySelector('#clienteSelect');
  const clienteDNI = stockContainer.querySelector('#clienteDNI');

  clienteSelect.addEventListener('change', function () {
    const selectedOption = clienteSelect.options[clienteSelect.selectedIndex];
    const dni = selectedOption.getAttribute('data-dni');
    clienteDNI.value = dni || ''; 
  });

  const stockGrid = stockContainer.querySelector('.stock-grid');
  Products.forEach(product => {
      const motoItem = document.createElement('div');
      motoItem.className = 'moto-item';
      motoItem.innerHTML = `
          <img src="${product.imageUrl}" alt="Moto">
          <p>${product.motoName}</p>
      `;
      stockGrid.appendChild(motoItem);
  });

  const motoContainer = stockContainer.querySelector('#motoContainer');
  const totalElement = stockContainer.querySelector('#total');

  const calculateTotal = () => {
      const selectedMoto = stockContainer.querySelector('.moto');
      const price = parseFloat(selectedMoto.options[selectedMoto.selectedIndex].getAttribute('data-price')); 
      const quantity = parseInt(stockContainer.querySelector('.cantidad').value) || 0;
      const total = price * quantity * 1.21; // Incluye IVA
      totalElement.textContent = total.toLocaleString('es-AR');
  };

  const motoField = document.createElement('div');
  motoField.className = 'moto-field';
  motoField.innerHTML = `
      <label for="moto">Moto:</label>
      <select class="moto" required>
          ${Products.map(product => `<option value="${product.motoId}" data-price="${product.price}">${product.motoName}</option>`).join('')}
      </select>

      <label for="cantidad">Cantidad:</label>
      <input type="number" class="cantidad" min="1" required>
  `;
  motoContainer.appendChild(motoField);

  motoField.querySelector('.cantidad').addEventListener('input', calculateTotal);
  motoField.querySelector('.moto').addEventListener('change', calculateTotal);

  return stockContainer;
}

document.addEventListener('DOMContentLoaded', async function () {
  const contenedor = document.getElementById('container');
  const StockMotos = await GenerateStock();

  if (StockMotos) {
    contenedor.appendChild(StockMotos);

    const modal = document.getElementById("modalVenta");
    const btn = document.getElementById("generarVentaBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
      modal.style.display = "block";
    };

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    document.getElementById("ventaForm").onsubmit = async function (event) {
      event.preventDefault();
      const ventaData = getVentaData();
      const motos = ventaData.motos.map(moto => ({
        motoId: moto.motoId,
        quantity: moto.quantity
      }));
      let totalPayed = ventaData.total;
      totalPayed = totalPayed * 1000;
      const resultado = await ApiSale.Post(motos, totalPayed);

      if (resultado) {
        alert('Venta generada exitosamente!');
        modal.style.display = "none";
      } else {
        alert('Error al generar la venta');
      }
    };
  } else {
    console.error("No se pudo generar el stock");
  }
});

function getVentaData() {
  const motoField = document.querySelector('.moto-field');
  const selectedMoto = motoField.querySelector('.moto');
  const motoId = selectedMoto.value;
  const motoName = selectedMoto.options[selectedMoto.selectedIndex].text;
  const quantity = parseInt(motoField.querySelector('.cantidad').value) || 0;

  return {
    motos: [{
      motoId: motoId,
      motoName: motoName,
      quantity: quantity
    }],
    total: parseFloat(document.getElementById('total').textContent.replace('.', '').replace(',', '.')) || 0
  };
}
