const getClient = async () => {
    let result = [];
    const url = `https://localhost:7158/api/Client/Me`;
    const authToken = sessionStorage.getItem("authToken"); 

    if (!authToken) {
        console.error("No se encontró un token de autenticación");
        return result;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
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
const getClientAll = async () => {
    let result = [];
    const url = `https://localhost:7158/api/Client`;

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


const ApiClient = {
    Get: getClient,
    GetAll: getClientAll
};

export default ApiClient;