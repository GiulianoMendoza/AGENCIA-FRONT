const getTurn = async () => {
    let result = [];
    const url = `https://localhost:7158/api/Turn`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json', 
            }
        });

        if (response.ok) {
            result = await response.json(); 
        } else {
            console.error("Error en la respuesta del servidor", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error en la solicitud fetch", error);
    }

    return result;
};

const postTurn = async (date,typeService,status,clientid,techid,motoid,saleid) => {
    let postResult = null;
    const postUrl = 'https://localhost:7158/api/Turn';
    try {
        const postResponse = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                typeService:typeService,
                status:status,
                client:clientid,
                techn:techid,
                motoid:motoid,
                sale:saleid
            }),
        });

        if (postResponse.ok) {
            postResult = await postResponse.json();
        } else if (postResponse.status === 400) {
            postResult = 'Solicitud incorrecta';
        } else {
            throw new Error('Error en la solicitud POST');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

    return postResult;
};
const ApiTurn = {
    Get : getTurn,
    Post : postTurn
}
export default ApiTurn;