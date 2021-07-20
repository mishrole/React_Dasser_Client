import { refreshToken } from "./refreshToken";

export const getUsers = async ({lastname = '', login = '', status = 1}) => {

    let access_token = localStorage.getItem('access_token');

    if(access_token && access_token.length > 0) {
        const endpoint = 'http://localhost:9191/api/v1/users/search';
        const URL = `${endpoint}?name=${lastname}&login=${login}&status=${status}`;
        
        const header = new Headers();
        header.append("Authorization", "Bearer" + access_token);
    
        const options = {
            method: 'GET',
            headers: header,
            redirect: 'follow'
        };
    
        let response = await fetch(URL, options);
    
        if(response.status === 401) {
            await refreshToken();
            header.append("Authorization", "Bearer" + localStorage.getItem('access_token'));
            response = await fetch(endpoint, options);
        }
        
        const data = await response.json();
    
        return data;
    } else {
        return {error: "Authorization failed"};
    }
}