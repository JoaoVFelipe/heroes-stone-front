import axios from 'axios';
import Cookies from 'universal-cookie';

const api = axios.create();
const cookies = new Cookies(document.cookie);

api.defaults.baseURL = `${process.env.REACT_APP_NODE_API_URL}`;
api.defaults.headers.common.Authorization = `bearer ${cookies.get('jwt_auth', { path: '/' })}` || null;
  
export async function getAllFavoriteChars() {
    return await api.get(
        'chars'
    );
}

export async function getAllFavoriteComics() {
    return await api.get(
        `comics`
    );
}

export async function favoriteOneChar(id) {
    return await api.post(
        `chars/${id}`
    );
}

export async function favoriteOneComic(id) {
    return await api.post(
        `comics/${id}`
    );
}

export async function unfavoriteOneChar(id) {
    return await api.delete(
        `chars/${id}`
    );
}

export async function unfavoriteOneComic(id) {
    return await api.delete(
        `comics/${id}`
    );
}


