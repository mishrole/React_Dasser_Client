import { refreshToken } from "./refreshToken";

export const getRoles = async () => {

    const endpoint = 'http://localhost:9191/api/v1/roles';

    const header = new Headers();
    header.append("Authorization", "Bearer" + localStorage.getItem('access_token'));
    header.append("Content-Type",  "application/x-www-form-urlencoded");

    const options = {
        method: 'GET',
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