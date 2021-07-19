import { refreshToken } from "./refreshToken";

export const deletetUser = async (id) => {

    // await refreshToken();
    const endpoint = `http://localhost:9191/api/v1/users/${id}`;

    const header = new Headers();
    header.append("Authorization", "Bearer" + localStorage.getItem('access_token'));
    header.append("Content-Type",  "application/json");

    const options = {
        method: 'DELETE',
        headers: header,
        redirect: 'follow'
    };

    let response = await fetch(endpoint, options);

    if(response.status === 401) {
        await refreshToken();
        header.append("Authorization", "Bearer" + localStorage.getItem('access_token'));
        response = await fetch(endpoint, options);
    }
    
    const data = await response.json();

    return data;
}