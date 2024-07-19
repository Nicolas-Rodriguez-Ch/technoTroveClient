import Cookies from 'js-cookie';
export const token = 'token';
export const isLogged = () => (Cookies.get(token) ? true : false);
