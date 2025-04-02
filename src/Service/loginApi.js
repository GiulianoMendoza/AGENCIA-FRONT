const PostLogin = async (email, password) => {
    let postResult = null;
    const postUrl = `https://localhost:7096/api/v1/User/Login`;

    try {
        const postResponse = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        if (postResponse.ok) {
            postResult = await postResponse.json();
            if (postResult.statusCode === 200 && postResult.result && postResult.result.token) {
                localStorage.setItem('authToken', postResult.result.token);
            } else {
                postResult = { status: 'error', message: 'No se recibió un token válido' };
            }
        } else if (postResponse.status === 400) {
            postResult = { status: 'error', message: 'Solicitud incorrecta' };
        } else {
            postResult = { status: 'error', message: 'Error en la solicitud POST' };
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        postResult = { status: 'error', message: 'Error en la solicitud' };
    }

    return postResult;
};
const RegisterUser = async (email, password, rol) => {
    const postUrl = `https://localhost:7096/api/v1/User/Register`;
    const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            rol: rol
        }),
    });

    const responseData = await response.json();

    const metadata = {
        status: response.status,
        headers: response.headers
    };

    return {
        data: responseData,
        metadata: metadata
    };
};

const LoginApi = {
    Post: PostLogin,
    Register: RegisterUser
};

export default LoginApi;