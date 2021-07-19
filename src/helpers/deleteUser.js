import { refreshToken } from "./refreshToken";

export const deletetUser = async (id) => {

    const endpoint = `http://localhost:9191/api/v1/users/${id}`;

    const header = new Headers();
    header.append("Authorization", "Bearer" + localStorage.getItem('access_token'));
    header.append("Content-Type",  "application/json");

    const options = {
        method: 'DELETE',
        headers: header,
        redirect: 'follow'
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    await refreshToken();

    return data;
}