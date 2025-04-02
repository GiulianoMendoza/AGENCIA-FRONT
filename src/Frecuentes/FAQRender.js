function GenerateFAQ() {
    const FAQ = document.createElement('div');
    FAQ.className = 'faq-container';
    FAQ.innerHTML = `
        <h1>Preguntas Frecuentes</h1>

            <div class="faq-item">
                <h2 onclick="toggleAnswer(this)">¿Cómo compro mi moto?
                    <span class="faq-arrow">▼</span>
                </h2>
                <div class="faq-answer">
                    En ArgenMoto, solo con tu DNI podés acceder y financiar el 100% en cuotas fijas y en pesos. O escríbenos por WhatsApp y
                     a la brevedad nuestros vendedores se estarán contactando contigo para asesorarte.
                </div>
            </div>
            <br><br><br>
            <div class="faq-item">
                <h2 onclick="toggleAnswer(this)">¿Puedo pagar mi moto en cuotas?
                    <span class="faq-arrow">▼</span>
                </h2>
                <div class="faq-answer">
                    Sí, contamos con créditos personales sin anticipo, solo con DNI, y las cuotas son fijas y en pesos.
                    También aceptamos tarjetas de crédito y tenemos activo el Plan Cuota Simple en 3 y 6. ¡La entrega de
                    unidad es en el día! En ArgenMoto, consultas online, te acercas y retiras ya. O déjanos tu consulta por WhatsApp y a la brevedad estaremos en contacto.
                </div>
            </div>
            <br><br><br>
            <div class="faq-item">
                <h2 onclick="toggleAnswer(this)">¿Cómo aseguro mi moto?
                    <span class="faq-arrow">▼</span>
                </h2>
                <div class="faq-answer">
                    Todos los vehículos se entregan asegurados con compañías de primera línea. Podrás optar por
                    diferentes coberturas según tu conveniencia. También se pueden contratar en la agencia otros tipos
                    de seguros.
                </div>
            </div>
            <br><br><br>
            <div class="faq-item">
                <h2 onclick="toggleAnswer(this)">¿Dónde realizo los services?
                    <span class="faq-arrow">▼</span>
                </h2>
                <div class="faq-answer">
                    Los servicios se realizan en cualquiera de los talleres autorizados por la agencia para eso en el
                    postventa podras solicitar tu turno y que nuestros tecnicos realicen el services.
                </div>
            </div>
            <br><br><br>
            <div class="faq-item">
                <h2 onclick="toggleAnswer(this)">¿Hay que patentar las motos?
                    <span class="faq-arrow">▼</span>
                </h2>
                <div class="faq-answer">
                    A partir del 5 de abril de 2010, rige para todo el país la nueva ley de patentamiento obligatorio.
                    Todos los vehículos deben salir de la agencia con el trámite iniciado o deben ser retirados con la
                    patente definitiva. Si compraste el vehículo en nuestra agencia antes de esa fecha, de todas formas
                    puedes realizar el patentamiento presentando: factura de compra, certificado de aduana, DNI y
                    constancia del CUIL. Si no eres cliente y deseas realizar el trámite, deberás adjuntar además de la
                    documentación solicitada: verificación policial. Los costos son de acuerdo al año, modelo del
                    vehículo y localidad.
                </div>
            </div>
            <br><br><br>
            <div class="faq-item">
                <h2 onclick="toggleAnswer(this)">¿Cómo se realiza la transferencia?
                    <span class="faq-arrow">▼</span>
                </h2>
                <div class="faq-answer">
                    Los requisitos para realizar una transferencia son: título y cédula del vehículo, verificación
                    policial y el formulario 08 firmado por el/los titular/es. Los costos son de acuerdo al año, modelo
                    del vehículo y localidad.
                </div>
            </div>`;
            
return FAQ;
}
const contenedor = document.getElementById('faq-container2');
const FAQ2 = GenerateFAQ();
contenedor.appendChild(FAQ2);