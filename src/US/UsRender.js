import { loadMap } from '../Service/geolocalizacionApi.js';

function GenerateMaps() {
  const sucursales = document.getElementsByClassName('map');
  Array.from(sucursales).forEach((sucursal) => {
    const sucursalId = sucursal.id;
    loadMap(sucursalId);
  });
}

function GenerateContent() {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.innerHTML = `
        <h1>NOSOTROS</h1>
        <p>En los últimos años la moto se ha convertido en uno de los medios de transporte más populares. Esto ha sido en parte por su comodidad y agilidad, y en otra medida porque la moto vino a subsanar las falencias que todos sufrimos día a día en el transporte público, cumpliendo una importantísima función social: ahorra tiempo y dinero a quien la conduce. Y esto sin mencionar los momentos que brinda de placer y diversión.</p>
        
        <p>En ese marco, ArgenMoto, con más de 35 años de trayectoria, se ha posicionado como una de las agencias líderes en el ramo, y no es por casualidad: no sólo presenta la más amplia gama de marcas, modelos, y disponibilidad de stock, además es la única agencia de la Argentina que financia sólo con DNI, sin anticipo, con entrega inmediata y, sobre todas las cosas, es la que brinda la mejor atención. Porque todos queremos ser bien atendidos y la calidad humana es lo más importante, ArgenMoto se posiciona primero en atención y servicio.</p>
        
        <p>Sucursales ubicadas en UNAJ (Av. Calchaqui y Av Belgrano), Lomas de Zamora, Adrogué, Quilmes Oeste, Solano, Capital Federal, La Paternal, Liniers, Gonnet  y San Justo.</p>
        
        <p>ArgenMoto se transformó a través de los años en un punto de referencia obligado no sólo para quienes andan en moto sino para todos los visitantes de todos los distritos que quieren acercarse al fascinante mundo de las motos.</p>
        
        <p>Esta página ha sido realizada para que usted tenga a su disposición la información necesaria de nuestra empresa y los servicios que le ofrecemos. Estamos a su disposición para cualquier consulta que nos desee plantear a través de nuestros números de contacto o a través del formulario que podrá encontrar en esta sección de nuestra página web. Por medio de nuestro catálogo ONLINE usted podrá consultar toda la información necesaria, a fin de poder hacer la selección correcta de la Moto que busca.</p>
        
        <p>También podrá definir su plan de pago y corroborar por medio del sistema el tipo de financiación con los intereses calculados.</p>
        <br>
        <br>
        <h2>Ubicaciones de Sucursales</h2>
        <div class="map-container">
            <div class="sucursal">
                <h3>UNAJ</h3>
                <div class="map" id="UNAJ"></div>
            </div>
            <div class="sucursal">
                <h3>Lomas de Zamora</h3>
                <div class="map" id="LomasdeZamora"></div>
            </div>
            <div class="sucursal">
                <h3>Adrogué</h3>
                <div class="map" id="Adrogué"></div>
            </div>
            <div class="sucursal">
                <h3>Quilmes Oeste</h3>
                <div class="map" id="QuilmesOeste"></div>
            </div>
            <div class="sucursal">
                <h3>Solano</h3>
                <div class="map" id="Solano"></div>
            </div>
            <div class="sucursal">
                <h3>Capital Federal</h3>
                <div class="map" id="CapitalFederal"></div>
            </div>
            <div class="sucursal">
                <h3>La Paternal</h3>
                <div class="map" id="LaPaternal"></div>
            </div>
            <div class="sucursal">
                <h3>Liniers</h3>
                <div class="map" id="Liniers"></div>
            </div>
            <div class="sucursal">
                <h3>Gonnet</h3>
                <div class="map" id="Gonnet"></div>
            </div>
            <div class="sucursal">
                <h3>San Justo</h3>
                <div class="map" id="SanJusto"></div>
            </div>
        </div>
        
        <p>Los esperamos para que puedan compartir con nosotros su pasión por las motos y el motociclismo.</p>
    `;
    return contentDiv; 
}

const contenedor = document.getElementById('content-container');
const Content2 = GenerateContent();
contenedor.appendChild(Content2);

GenerateMaps();