import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import history from '../services/history';

export const api = axios.create();
const cookies = new Cookies(document.cookie);

api.defaults.baseURL = `${process.env.REACT_APP_NODE_API_URL}`;
api.defaults.headers.common.Authorization = `bearer ${cookies.get('jwt_auth', { path: '/' })}` || null;

api.interceptors.response.use((response) => response, (error) => {
    if (error.response !== undefined) {
        let fullMessage = "";

        if(error.response.data?.errors) {
            fullMessage = error.response.data.errors;
        }

        if (error.response.status === 401) {
            cookies.remove('jwt_auth', { path: '/' });
            api.defaults.headers.common.Authorization = '';
            localStorage.removeItem('currentUser');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your session expired! Please login.',
            })
            history.push('/login');
           
            return Promise.reject(error);
        }

        if(fullMessage != '') {
            if (Array.isArray(fullMessage)) {
                let stringError = '';
                fullMessage.forEach((error) => {
                    stringError = `${error.message}\n`;
                });
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: stringError,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: fullMessage,
                })
            }
        } 
    } 

    return Promise.reject(error);
});

export async function login(email, password) {
    return await api.post('login', {email, password});
}

export async function createProfile(data) {
    return await api.post('user', {
        email: data.email, 
        name:data.name, 
        pass: data.password
    });
}

export async function updateProfile(data) {
    const dataToUpdate = {};

    if(data.email) dataToUpdate.email = data.email;
    if(data.name) dataToUpdate.name = data.name;
    if(data.bio) dataToUpdate.bio = data.bio;
    if(data.password) dataToUpdate.pass = data.password;

    return await api.put('user', dataToUpdate);
}





