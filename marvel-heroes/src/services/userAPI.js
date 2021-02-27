import axios from 'axios';

export const api = axios.create();
api.defaults.baseURL = `${process.env.REACT_APP_NODE_API_URL}`;

  
export async function login(email, password) {
    return await api.post('login', {email, password});
}



