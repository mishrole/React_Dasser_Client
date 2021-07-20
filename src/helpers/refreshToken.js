import { setToken } from "./setToken";

export const refreshToken = async () => {

    const endpoint = 'http://localhost:9191/oauth/token';

    const refresh_token = localStorage.getItem('refresh_token');

    if(refresh_token && refreshToken.length > 0) {
        const header = new Headers();
        header.append("Authorization", "Basic ZGFzc2VyOjEyMzQ=");
        header.append("Content-Type",  "application/x-www-form-urlencoded");
    
        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "refresh_token");
        urlencoded.append("refresh_token", refresh_token);
    
        const options = {
            method: 'POST',
            headers: header,
            body: urlencoded,
            redirect: 'follow'
        };
    
        const response = await fetch(endpoint, options);
        const data = await response.json();
    
        if(response.status === 200) {
            setToken(data.access_token, data.refresh_token);
        }
    
        return ({"access_token": data.access_token, "refresh_token": data.refresh_token});
    
    } else {
        return {error: "Get refresh token failed"};
    }
    
}