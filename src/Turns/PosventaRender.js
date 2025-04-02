import TurnApi from '../Service/TurnApi.js'; 

async function renderTurns() {
    const turnsData = await TurnApi.Get(); 
    const container = document.getElementById('turnos-list'); 
    container.innerHTML = '';

    turnsData.forEach(turn => {
        const turnHTML = `
            <div class="turno" data-turn-id="${turn.turnId}">
                <p><strong>Fecha:</strong> ${new Date(turn.date).toLocaleString('es-AR')}</p>
                <p><strong>Servicio:</strong> ${turn.typeService}</p>
                <p><strong>Estado:</strong> ${turn.status}</p>
                <p><strong>Técnico:</strong> ${turn.techn}</p>
                <p><strong>Moto:</strong> ${turn.moto}</p>
                <p><strong>Cliente:</strong> ${turn.client}</p>
                <button class="details-button">
                    <p class="details-text"><strong>VER DETALLES</strong></p>
                </button>
            </div>
        `;
        container.innerHTML += turnHTML;
    });

    const detailButtons = document.querySelectorAll('.details-button');
    detailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const turnId = this.closest('.turno').getAttribute('data-turn-id');
            sessionStorage.setItem('selectedTurnId', turnId); 

        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    renderTurns();
});