export const requestToken = async ({emailValue, passwordValue}) => {
    const endpoint = 'https://dasserapi.herokuapp.com/oauth/token';
    
    const header = new Headers();
    header.append("Authorization", "Basic ZGFzc2VyOjEyMzQ=");
    header.append("Content-Type",  "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", emailValue);
    urlencoded.append("password", passwordValue);
    urlencoded.append("grant_type", "password");

    const options = {
        method: 'POST',
        headers: header,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();
    data["status"] = response.status;
    
    return data;
}