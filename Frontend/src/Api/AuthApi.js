const BASE_URL = "http://localhost/url_shortener/Backend/Public"


export async function apiRequest(
    endpoint,
    method = "GET",
    body = null
) {

    const token = localStorage.getItem("token");


    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };


    if(token){
        options.headers.Authorization = 
            `Bearer ${token}`;
    }


    if(body){
        options.body = JSON.stringify(body);
    }


    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        options
    );


    return await response.json();
}