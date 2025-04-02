import ApiSeller from "../Service/VendedorApi.js";
import ApiProduct from "../Service/ProductApi.js";
import ApiSale from "../Service/SaleApi.js";
import ApiClient from "../Service/ClientApi.js";
async function GenerateStock() {
  const clients = await ApiClient.GetAll();
  const Seller = await ApiSeller.Get();
  const Products = await ApiProduct.Get(null, null, null, 10, 0); 
  if (!Seller || !Products || Products.length === 0 || !clients || clients.length === 0) {
      console.error("No se obtuvieron datos del vendedor, productos o clientes");
      return null;
  }

  const stockContainer = document.createElement('div');
  stockContainer.className = 'stock-container';
  stockContainer.innerHTML = `
      <div class="vendedor-info">
          <img src="../../Tarjetas/vendedor.png" alt="Foto del Vendedor" class="foto-vendedor">
          <div class="info">
              <h2>${Seller.name} ${Seller.surname}</h2>
              <p><strong>DNI:</strong> ${Seller.dni}</p>
              <p><strong>Email:</strong> ${Seller.email}</p>
              <p><strong>Teléfono:</strong> ${Seller.phone}</p>
          </div>
      </div>
      <h2>Generar Venta</h2>
      <div class="generate-sale">
          <button id="generarVentaBtn">+</button>
      </div>
      <br>
      <h3>Motos en Stock</h3>
      <div class="stock-grid"></div>  <!-- Contenedor para productos -->
      <div id="modalVenta" class="modal">
          <div class="modal-content">
              <span class="close">&times;</span>
              <h2>Datos del Cliente</h2>
              <form id="ventaForm">
                  <label for="clienteSelect">Seleccionar Cliente:</label>
                  <select id="clienteSelect" name="clienteSelect" required>
                      <option value="">Seleccione un cliente</option>
                      ${clients.map(client => `
                          <option value="${client.clientId}" data-dni="${client.dni}">
                              ${client.name} ${client.surname}
                          </option>
                      `).join('')}
                  </select>

                  <label for="clienteDNI">DNI del Cliente:</label>
                  <input type="text" id="clienteDNI" name="clienteDNI" readonly required>
                  
                  <div id="motoContainer"></div>
                  <h4>Total: <span id="total">0.00</span></h4> 
                  <div class="button-group">
                      <button type="button" id="addMotoBtn">Agregar otra moto</button>
                      <button type="submit" class="btn-submit">Generar Venta</button>
                  </div>
              </form>
          </div>
      </div>
  `;

  // Lógica para actualizar el DNI automáticamente cuando se selecciona un cliente
  const clienteSelect = stockContainer.querySelector('#clienteSelect');
  const clienteDNI = stockContainer.querySelector('#clienteDNI');

  clienteSelect.addEventListener('change', function () {
    const selectedOption = clienteSelect.options[clienteSelect.selectedIndex];
    const dni = selectedOption.getAttribute('data-dni');
    clienteDNI.value = dni || ''; // Actualiza el campo de DNI basado en la opción seleccionada
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

  // Lógica para agregar motos y calcular total (se mantiene igual)
  const motoContainer = stockContainer.querySelector('#motoContainer');
  const totalElement = stockContainer.querySelector('#total');
  
  const addMotoField = () => {
      const motoField = document.createElement('div');
      motoField.className = 'moto-field';
      motoField.innerHTML = `
          <label for="moto">Moto:</label>
          <select class="moto" required>
              ${Products.map(product => `<option value="${product.motoId}" data-price="${product.price}">${product.motoName}</option>`).join('')}
          </select>

          <label for="cantidad">Cantidad:</label>
          <input type="number" class="cantidad" min="1" required>
          <button type="button" class="remove-moto-btn">Eliminar moto</button>
      `;
      
      motoContainer.appendChild(motoField);
      
      const removeMotoBtn = motoField.querySelector('.remove-moto-btn');
      removeMotoBtn.addEventListener('click', () => {
          motoField.remove();
          calculateTotal(); 
      });
      
      const calculateTotal = () => {
          let total = 0;
          const motoFields = document.querySelectorAll('.moto-field');

          motoFields.forEach(field => {
              const selectedOption = field.querySelector('.moto').options[field.querySelector('.moto').selectedIndex];
              const price = parseFloat(selectedOption.getAttribute('data-price')); 
              const quantity = parseInt(field.querySelector('.cantidad').value) || 0; 
              
              total += price * quantity * 1.21; // Incluye el IVA
          });

          totalElement.textContent = total.toLocaleString('es-AR'); 
      };
      
      motoField.querySelector('.cantidad').addEventListener('input', calculateTotal);
      motoField.querySelector('.moto').addEventListener('change', calculateTotal);
      calculateTotal();
  };

  const addMotoBtn = stockContainer.querySelector('#addMotoBtn');
  addMotoBtn.addEventListener('click', addMotoField);
  addMotoField(); 

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
  const motoFields = document.querySelectorAll('.moto-field');
  const ventaData = {
    motos: [],
    total: parseFloat(document.getElementById('total').textContent.replace('.', '').replace(',', '.')) || 0
  };

  motoFields.forEach(field => {
    const selectedMoto = field.querySelector('.moto');
    const motoId = selectedMoto.value;
    const motoName = selectedMoto.options[selectedMoto.selectedIndex].text;
    const quantity = parseInt(field.querySelector('.cantidad').value) || 0;
    
    if (quantity > 0) {
      ventaData.motos.push({
        motoId: motoId,
        motoName: motoName,
        quantity: quantity
      });
    }
  });

  return ventaData;
}