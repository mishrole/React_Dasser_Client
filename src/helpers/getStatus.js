import { refreshToken } from "./refreshToken";

export const getStatus = async () => {

    const endpoint = 'http://localhost:9191/api/v1/status';

    const header = new Headers();
    header.append("Authorization", "Bearer" + localStorage.getItem('access_token'));
    header.append("Content-Type",  "application/x-www-form-urlencoded");
    
    const options = {
        method: 'GET',
        headers: header,
        redirect: 'follow'
    };
    
    const response = await fetch(endpoint, options);
    const data = await response.json();

    await refreshToken();

    return data;

}