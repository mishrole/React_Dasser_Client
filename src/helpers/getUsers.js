import { refreshToken } from "./refreshToken";

export const getUsers = async ({lastname = '', login = '', status = 1}) => {

    const endpoint = 'http://localhost:9191/api/v1/users/search';
    const URL = `${endpoint}?name=${lastname}&login=${login}&status=${status}`;
    
    const response = await fetch(URL);
    const data = await response.json();

    await refreshToken();
    
    return data;
}