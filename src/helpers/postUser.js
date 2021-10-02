import { refreshToken } from "./refreshToken";

export const postUser = async ({lastnameValue, firstnameValue, emailValue, passwordValue, roleValue, statusValue}) => {

    let access_token = localStorage.getItem('access_token');

    if(access_token && access_token.length > 0) {
        const endpoint = 'https://dasserapi.herokuapp.com/api/v1/users';

        const header = new Headers();
        header.append("Authorization", "Bearer" + access_token);
        header.append("Content-Type",  "application/json");

        let raw = JSON.stringify({
            "lastname": lastnameValue,
            "firstname": firstnameValue,
            "login": emailValue,
            "password": passwordValue,
            "role_id": roleValue,
            "status": {
            "id": statusValue
            }
        });

        const options = {
            method: 'POST',
            headers: header,
            body: raw,
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
    } else {
        return {error: "Authorization failed"};
    }

}