export const setToken = (access_token, refresh_token) => {
    if(access_token && refresh_token) {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    }
}