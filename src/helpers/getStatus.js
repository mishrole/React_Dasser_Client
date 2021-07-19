import { refreshToken } from "./refreshToken";

export const getStatus = async () => {

    await refreshToken();

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

    // if(response.ok) {

    //     const refresh = await refreshToken();
    //     console.log(refresh);

    //     return data;

        
    // } else {
    //     const refresh = await refreshToken();
    //     const status = await getStatus();
    //     console.log(refresh);
    //     console.log(status);
    // }

    return data;

}