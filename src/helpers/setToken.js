export const setToken = (access_token, refresh_token, expires_in) => {
    if(access_token && refresh_token && expires_in) {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_in', expires_in);
    }
}